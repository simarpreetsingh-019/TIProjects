import React from "react";
import { makeAppointment } from "../utils/operation";
import axios from "axios"

export default function AddAppointment(props) {
    let form = props.form
    const [newDiagnosis, setNewDiagnosis] = React.useState({
        doctorAadhar: "",
        symptoms: "",
    })

    const handleChange = (event) => {
        const {name, value} = event.target
        setNewDiagnosis(prevValue => (
               { ...prevValue,
                [name]: value
               })
        )
    }

    const submitBut = async (event) => {
        event.preventDefault()

        let data = {
          "aadhar": form.aadhar,
          "privateKey":  form.secretKey,
          "symptoms": newDiagnosis.symptoms,
          "doctorAadhar": newDiagnosis.doctorAadhar,
        };
  
        console.log(data)
        
        const url =  'https://efficacious-writing-production.up.railway.app/api/makeAppointment'
        let config = {
          maxBodyLength: Infinity,
          headers: { 
            'Content-Type': 'application/json'
          }
        };
        console.log("Making the call")
        axios.post(url, data, config)
        .then(async (response) => {
          console.log(response.data)
          console.log(JSON.stringify(response.data));
        
          await makeAppointment(response.data.hashedAadhar,response.data.symptoms , newDiagnosis.doctorAadhar,
            response.data.AESencryptForDoctor, response.data.rsa,response.data.encryptedDoctorName).
            then(res=>{
              console.log(res);
              
            }).catch(err=>{
            console.log(err);
            
            })
        })
        .catch((error) => {
          if ("response" in error){
            if ("data" in error.response){
                alert(error.response.data.message)
            }
            console.log(error.response.data.message)
          }
          else{
          console.log("Error Occured");
          }
        });

        // await makeAppointment(props.userAadhar, newDiagnosis.symptoms,  newDiagnosis.doctorAadhar )
        // console.log("added appointment" ,newDiagnosis)
        // alert("added appointment")
    }
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form>
            <div className="mb-3">
              <label htmlFor="doctorName" className="form-label">
                Doctor Aadhar
              </label>
              <input
                type="text"
                className="form-control"
                id="doctorAadhar"
                name="doctorAadhar"
                value={newDiagnosis.doctorAadhar}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="symptoms" className="form-label">
                Symptoms
              </label>
              <input
                type="text"
                className="form-control"
                id="symptoms"
                name="symptoms"
                value={newDiagnosis.symptoms}
                onChange={handleChange}
              />
            </div>
            
            <button className="btn btn-primary" onClick={submitBut}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}