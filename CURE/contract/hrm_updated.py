import smartpy as sp

@sp.module
def main():
    
    class Contract(sp.Contract):
        def __init__(self):
            self.data.medical_diagnosis_len = 0
            self.data.diagnosis_list = {}
            self.data.patient_diagnosis = {}
            self.data.diagnosis_visibility = {}
            self.data.patient_visibility = {}
            self.data.doc_visibility = {}
            self.data.patient_info = {}
            self.data.doc_info = {}
            self.data.hospital = {}
            self.data.public_keys = {}
        
        @sp.entrypoint
        def addPatient(self, param):
            assert self.data.patient_info.contains(param.userAadhar)==False, "User Already Exists"
            self.data.patient_info[param.userAadhar] = {
                "name": param.name,
                "sex" : param.sex,
                "age" : param.age
            }
            self.data.public_keys[param.userAadhar] = param.publicKey
            
        @sp.entrypoint
        def addRecord(self, param):
            self.data.diagnosis_list[self.data.medical_diagnosis_len] = {
                "patientName" : param.patientName ,
                "doctorName" : param.doctorName,
                "symptoms": param.symptoms,
                "diagnosis": param.diagnosis,
                "document": param.document,
                "docType": param.docType
            }
            currentNum = self.data.medical_diagnosis_len
            self.data.medical_diagnosis_len = currentNum + 1
            if (self.data.patient_diagnosis.contains(param.userAadhar)):   
                self.data.patient_diagnosis[param.userAadhar].push(currentNum)
            else:
                self.data.patient_diagnosis[param.userAadhar] = [currentNum]
            self.data.diagnosis_visibility[currentNum] = param.userAadhar 

        @sp.entrypoint
        def addDoctor(self, param):
            assert (self.data.doc_info.contains(param.userAadhar)==False), "Doctor Already exists"
            self.data.doc_info[param.userAadhar] = {
                "name": param.name, 
                "sex" : param.sex,
                "age" : param.age,
                "speciality" : param.speciality,
                "hospital": param.hospital
            }
            if (self.data.hospital.contains(param.hospital)):
                self.data.hospital[param.hospital].push(param.userAadhar)
            else:
                self.data.hospital[param.hospital] = [param.userAadhar]
            self.data.public_keys[param.userAadhar] = param.publicKey

        @sp.entrypoint
        def makeAppointment(self, param):
            assert self.data.patient_info.contains(param.patientAadhar), "No Patient found with the specifications"
            assert self.data.doc_info.contains(param.doctorAadhar), "No doctor found with the provided specifications"
            self.data.diagnosis_list[self.data.medical_diagnosis_len]  = {
                "patientName" : self.data.patient_info[param.patientAadhar]["name"],
                "doctorName" : param.docName,
                "symptoms": param.symptoms,
                "diagnosis": "",
                "document": "",
                "docType": ""
            }
            currentNum = self.data.medical_diagnosis_len
            self.data.medical_diagnosis_len = currentNum + 1
            if (self.data.patient_diagnosis.contains(param.patientAadhar)):   
                self.data.patient_diagnosis[param.patientAadhar].push(currentNum)
            else:
                self.data.patient_diagnosis[param.patientAadhar] = [currentNum]

            self.data.diagnosis_visibility[currentNum]  = param.patientAadhar
            
            if (self.data.doc_visibility.contains(param.doctorAadhar)):
                self.data.doc_visibility[param.doctorAadhar][param.patientAadhar] = param.doctorEncryptionMessage
            else:
                self.data.doc_visibility[param.doctorAadhar] = {param.patientAadhar : param.doctorEncryptionMessage} 

            if (self.data.patient_visibility.contains(param.patientAadhar)):
                self.data.patient_visibility[param.patientAadhar][param.doctorAadhar] = "1"
            else:
                self.data.patient_visibility[param.patientAadhar] = {param.doctorAadhar: "1"}

        @sp.entrypoint
        def shareDiagnosis(self, param):

            if (self.data.doc_visibility.contains(param.doctorAadhar)):
                self.data.doc_visibility[param.doctorAadhar][param.patientAadhar] = param.newDoctorEncyptedMessage
            else:
                self.data.doc_visibility[param.doctorAadhar] = {param.patientAadhar: param.newDoctorEncyptedMessage}

            if (self.data.patient_visibility.contains(param.patientAadhar)):
                self.data.patient_visibility[param.patientAadhar][param.doctorAadhar] = "1"
            else:
                self.data.patient_visibility[param.patientAadhar] = {param.doctorAadhar: "1"}

        @sp.entrypoint
        def controlVisibility(self, param):
            assert self.data.patient_info.contains(param.patientAadhar), "No patient found"
            assert self.data.doc_info.contains(param.doctorAadhar), "No doctor found"
            assert self.data.doc_visibility.contains(param.doctorAadhar), "Doctor does not have access"
            # assert self.data.doc_visibility.contains[param.doctorAadhar].contains(param.patientAadhar), "Doctor does not have access"
            # assert self.data.doc_visibility.contains[param.doctorAadhar][param.patientAadhar]!="", "Doctor does not have access"

            self.data.doc_visibility[param.doctorAadhar][param.patientAadhar] =""

            self.data.patient_visibility[param.patientAadhar][param.doctorAadhar] = "0"
            
        @sp.entrypoint
        def updateDiagnosis(self, param):
            assert self.data.patient_info.contains(param.patientAadhar), "No Patient found with the specifications"
            assert self.data.doc_info.contains(param.doctorAadhar), "No doctor found with the provided specifications"
            assert self.data.medical_diagnosis_len>param.diagnosisIndex, "No diagnosis found in the store"
            assert self.data.diagnosis_visibility.contains(param.diagnosisIndex), "No diagnosis found in the store"
            assert self.data.doc_visibility[param.doctorAadhar].contains(param.patientAadhar), "You do not have the permission to view this diagnosis"
            assert self.data.doc_visibility[param.doctorAadhar][param.patientAadhar]!="", "You do not have the permission to view this diagnosis"

            
            patientName = self.data.patient_info[param.patientAadhar]["name"]
            doctorName = self.data.diagnosis_list[param.diagnosisIndex]["doctorName"]
            symptoms = self.data.diagnosis_list[param.diagnosisIndex]["symptoms"]
            
            self.data.diagnosis_list[param.diagnosisIndex]  = {
                "patientName" : patientName,
                "doctorName" : doctorName,
                "symptoms": symptoms,
                "diagnosis": param.diagnosis,
                "document": param.document,
                "docType": param.docType
            }
            

@sp.add_test("new_test_cases")
def test_new_cases():
    scenario = sp.test_scenario(main)
    scenario.h1("New Test Cases")

    # Initialize contract
    tester = sp.test_account("user1")
    c1 = main.Contract()
    scenario += c1

    # Add patients and doctors
    c1.addPatient(userAadhar="123", name="Patient1", sex="M", age="30", publicKey="public_key_patient1").run(sender=tester)
    c1.addDoctor(userAadhar="435", name="Doctor1", sex="M", age="40", speciality="ENT", hospital="Hospital1", publicKey="public_key_doctor1").run(sender=tester)
    c1.addDoctor(userAadhar="483", name="Doctor2", sex="F", age="35", speciality="Cardiology", hospital="Hospital2", publicKey="public_key_doctor2").run(sender=tester)

    # Make appointments
    c1.makeAppointment(patientAadhar="123", doctorAadhar="435", symptoms="Fever", patientEncryptionMessage="patient_encryption", doctorEncryptionMessage="doctor_encryption", docName="encryptedDoc").run(sender=tester)
    c1.makeAppointment(patientAadhar="123", doctorAadhar="483", symptoms="Chest pain", patientEncryptionMessage="patient_encryption2", doctorEncryptionMessage="doctor_encryption2", docName="encyptedDoc2").run(sender=tester)

    # Add medical records
    c1.addRecord(userAadhar="123", patientName="Patient1", doctorName="Doctor1", symptoms="Headache", diagnosis="Migraine", document="doc_hash", docType="pdf").run(sender=tester)
    c1.addRecord(userAadhar="123", patientName="Patient1", doctorName="Doctor2", symptoms="Fatigue", diagnosis="Anemia", document="doc_hash2", docType="pdf").run(sender=tester)

    # Share diagnosis
    c1.shareDiagnosis(doctorAadhar="483", patientAadhar="123", newDoctorEncyptedMessage="new_doctor_encryption").run(sender=tester)

    # Control visibility
    # c1.controlVisibility(patientAadhar="123", doctorAadhar="483").run(sender=tester)

    # Update diagnosis
    c1.updateDiagnosis(patientAadhar="123", doctorAadhar="483", diagnosisIndex=1, diagnosis="Updated Diagnosis", document="updated_doc", docType="pdf").run(sender=tester)

    # Attempt to add an existing patient
    c1.addPatient(userAadhar="123", name="DuplicatePatient", sex="F", age="25", publicKey="public_key_duplicate").run(sender=tester, valid=False)

    # Attempt to add an existing doctor
    c1.addDoctor(userAadhar="435", name="DuplicateDoctor", sex="M", age="28", speciality="Pediatrics", hospital="Hospital3", publicKey="public_key_duplicate").run(sender=tester, valid=False)

    # update diagnosis
    c1.updateDiagnosis(patientAadhar="123", doctorAadhar="435", diagnosisIndex=0, diagnosis="UpdatedDiagnosis", document="updated_doc", docType="pdf").run(sender=tester)

    # share diagnosis 
    c1.shareDiagnosis(doctorAadhar="435", patientAadhar="123", newDoctorEncyptedMessage="doctor_encryption_invalid").run(sender=tester)

    # control visibility 
    c1.controlVisibility(patientAadhar="123", doctorAadhar="435").run(sender=tester)

    # Show contract data
    scenario.show(c1.data)



        