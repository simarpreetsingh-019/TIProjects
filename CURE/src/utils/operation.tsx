// TODO 6 - Call buy_ticket entrypoint in the Lottery contract by completing buyTicketOperation

import {tezos} from "./tezos";
import axios from "axios";
import internal from "stream";

// const CONTRACTADDRESS = "KT1J6DYrKbMomK6zs9uYqD6Cn92s8uRy5NCM" // have the updateDiagnosis problem
const CONTRACTADDRESS = "KT1KKknhpn1iiBqB315okxm7iiscPtpRWgwy" 
export const addPatient = async (sex:string , userAadhar: string, publicKey: string, 
    name:string , age:string ) => {
        try{
            const contract = await tezos.wallet.at(CONTRACTADDRESS);
    
            const op = await contract.methods.addPatient(age, name, publicKey, sex, 
                 userAadhar).send();
    
            await op.confirmation(1);
            
        }
        catch (error){
            throw error;
        }
};

export const addDoctor = async(speciality:string, userAadhar:string, sex:string, 
    publicKey:string, name:string, hospital: string, age:string) => {
        try{
            const contract = await tezos.wallet.at(CONTRACTADDRESS);
            
            const op = await contract.methods.addDoctor(age, hospital, name, publicKey, sex ,
                speciality, userAadhar).send();
    
            await op.confirmation(1);
        }
        catch (error){
            throw error;
        }
};

export const addRecord = async (symptoms:string, diagnosis:string, patientName:string, document:string, 
    doctorName:string, docType:string, userAadhar:string, keyEncrypted:string) => {
        try{
            const contract = await tezos.wallet.at(CONTRACTADDRESS);
            
            const op = await contract.methods.addRecord(diagnosis, docType, doctorName, document, 
            patientName, symptoms, userAadhar).send();
    
            await op.confirmation(1);
            
        }
        catch (error){
            throw error;
        }
};

export const controlVisibility = async (doctorAadhar:string, patientAadhar:string) => {
    try{
        const contract = await tezos.wallet.at(CONTRACTADDRESS);
        
        const op = await contract.methods.controlVisibility(doctorAadhar,patientAadhar
              ).send();

        await op.confirmation(1);
        
    }
    catch (error){
        console.log(error.message)

        throw error;
    }
};

export const makeAppointment = async(patientAadhar:string, symptoms:string, doctorAadhar:string,
    doctorEncryptionMessage:string, patientEncryptionMessage:string, docName:string) => {
    try{
        const contract = await tezos.wallet.at(CONTRACTADDRESS);
        
        const op = await contract.methods.makeAppointment( docName,   doctorAadhar , doctorEncryptionMessage, patientAadhar, 
            patientEncryptionMessage, symptoms ).send();

        await op.confirmation(1);
        
    }
    catch (error){
        throw error;
    }
};

export const shareDiagnosis = async (docAadhar:string, doctorEncryptionMessage:string, patientAadhar:string) => {
        try{
            const contract = await tezos.wallet.at(CONTRACTADDRESS);
            
            const op = await contract.methods.shareDiagnosis(docAadhar, doctorEncryptionMessage, 
                    patientAadhar ).send();
    
            await op.confirmation(1);
            
        }
        catch (error){
            throw error;
        }
};

export const updateDiagnosis = async (document:string , patientAadhar:string, 
    doctorAadhar:string, docType:string, diagnosisIndex:string, diagnosis:string) => {
        try{
            const contract = await tezos.wallet.at(CONTRACTADDRESS);
            
            const op = await contract.methods.updateDiagnosis(diagnosis, diagnosisIndex, docType, 
                doctorAadhar, document, patientAadhar).send();
    
            await op.confirmation(1);
            
        }
        catch (error){
            throw error;
        }

};



export const addTransaction = async (docLink:string, docName:string, hosName:string, 
    userName:string) => {
    try{
        let operation = await tezos.wallet.transfer({ 
            to: 'KT1G83zKWfv3ZoqhB4av3Vaq9kNQqrBySwuZ',
                amount: 0, 
                parameter: { 
                  entrypoint: 'default', 
                  value: {
                    prim: 'Pair',
                    args: [{
                      prim: 'Pair',
                      args: [
                        {string: docLink},
                        {string: docName},
                        {string: hosName},
                      ],
                      }, 
                      { string: userName}
                    ],
                  }
                }
              }).send();
        await operation.confirmation(1);

        // const stream = fs.createReadStream('./wallet.tsx');
        // const res = await pinata.pinFileToIPFS(stream)
    }
    catch (error){
        alert(error.message);
        throw error;

    }
};

export const setname = async () => {
    try{
        const contract = await tezos.wallet.at("KT1E8nSeznAvcq6kWFe36nPuduzSWhpeRekg");

        const op = await contract.methods.set_name("userParzival").send();

        await op.confirmation(1);
        
    }
    catch (error){
        throw error;
    }
};

export const set_both_name_age = async () => {
    try{
        const contract = await tezos.wallet.at("KT1E8nSeznAvcq6kWFe36nPuduzSWhpeRekg");

        const op = await contract.methods.set_name_age(105, "userMe").send();

        await op.confirmation(1);
    }
    catch (error){
        throw error;
    }
};
// TODO 10 - Call end_game entrypoint in the Lottery contract by completing endGameOperation

export const endGameOperation = async () => {
   
};