import React, { useState } from 'react';
import {addPatient} from '../utils/operation';
import axios from "axios";

const LoginRegister = (props)=>{

    let form = props.form;
    let setForm = props.setForm;

    
    const [type, setType] = React.useState(false)
    const [msg, setMsg] = useState("")

    function change(event){
      const {name, value} = event.target
      setForm((prev) => {
          let newForm = {
            ...prev, 
            [name]: value
          } 
          return newForm
      })
    }

    const styles = {
      width: "450px",
      marginTop: "20px"
    }

    function redirect(){
      props.setLog(true)
    }

    function login(){
      // console.log("private key = ", form.secretKey)
      // const formattedPrivateKey = String(form.secretKey).replace(/\n/g, '\\n');
      // const privateKeyBase64 = btoa(form.privateKey);
      // console.log(form)
      setForm(prev=>({
        ...prev, 
        secretKey: form.secretKey.replace(/\\n/g, '\n')
    }))
      let data = {
        "aadhar": String(form.aadhar),
        "privateKey":  form.secretKey
      };

      console.log(data)
      
      const url =  'https://efficacious-writing-production.up.railway.app/api/login'
      let config = {
        maxBodyLength: Infinity,
        headers: { 
          'Content-Type': 'application/json'
        }
      };
      console.log("Making the call")
      axios.post(url, data, config)
      .then((response) => {
        console.log(response.data)
        console.log(JSON.stringify(response.data));
        let {message, ...rest} = response.data
        setForm(prev=>(
          {
            ...prev,
            name: response.data.name,
            age: response.data.dob, 
            sex: response.data.sex,
          }))
        console.log("form is as follows")
        console.log(form);
        // console.log("rest is as follows")
        // setForm(rest)
        redirect()
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
      // 
    }

    async function register(){
      let data = JSON.stringify({
        "aadhar": form.aadhar,
        "name": form.name,
        "sex": form.sex,
        "dob": form.age
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://efficacious-writing-production.up.railway.app/api/register',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios.request(config as any)
      .then(async (response) => {
        const res = response.data
        setMsg(JSON.stringify(res.privateKey))
        const reg = await addPatient(res.sex, res.aadhar, res.publicKey,  res.name, res.dob).
              then((con) => {
                      console.log(con)
                      console.log("secretKey is as follows")
                      console.log(res.privateKey)
                      alert("Your secretKey is " + res.privateKey)
                      setForm(prev=>(
                        {
                          ...prev,
                          secretKey: res.privateKey
                        }))
                      console.log("form is as follows")
                      console.log(form)
                      // redirect()
              }).
                    catch((err) => {
                      console.log(err)
                    })
        // console.log(reg)
        // console.log("registered ")
        // redirect()
      })
      .catch((error) => {
        console.log(error);
      });

      
    
  }

    return (
      <>
        {type ? (
          <div className='form-group form'>
            <center>Login</center>
            <div className='text-center'>
              <input 
                type="text" 
                style={styles}
                className='form-control mx-auto textbox' 
                placeholder='secretKey' 
                value={form.secretKey}
                name="secretKey"
                onChange={change}
              />
              {/* <textarea
                style={styles}
                className='form-control mx-auto textbox'
                placeholder='secretKey'
                value={form.secretKey}
                name="secretKey"
                onChange={change}
              /> */}
              <input 
                type="text" 
                style={styles}
                className='form-control mx-auto textbox' 
                placeholder='Aadhar' 
                value={form.aadhar}
                name="aadhar"
                onChange={change}
              />
              <div className='text-center'>
                <button className='btn btn-primary' onClick={login}>
                  Login
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='form-group form'>
            <center>Register</center>
            <div className='text-center'>
              <input 
                type="text" 
                style={styles}
                className='form-control mx-auto textbox' 
                placeholder='Sex' 
                value={form.sex}
                name="sex"
                onChange={change}
              />
              <input 
                type="text" 
                style={styles}
                className='form-control mx-auto textbox' 
                placeholder='User Aadhar' 
                value={form.aadhar}
                name="aadhar"
                onChange={change}
              />
              <input 
                type="text" 
                style={styles}
                className='form-control mx-auto textbox' 
                placeholder='Name' 
                value={form.name}
                name="name"
                onChange={change}
              />
              <input 
                type="text" 
                style={styles}
                className='form-control mx-auto textbox' 
                placeholder='Age' 
                value={form.age}
                name="age"
                onChange={change}
              />
              <div className='text-center'>
                <button className='btn btn-primary' onClick={register}>
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
        <div className='text-center'>
          <div className='btn' onClick={()=>setType(!type)} >
            {type ? "Not Registered?" : "Already Registered"}
          </div>
        </div>
        {msg.length ? msg : ""}
      </>
    );
    
}

export default LoginRegister;
