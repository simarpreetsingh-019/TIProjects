import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';

//components
import Navbar from "./components/Navbar";
import NewSidebar from './components/NewSidebar';
// pages
import Patients from "./pages/Patients";
import RegistrationForm from "./pages/Register";
import Login from './pages/Login';
import DoctorLogin from "./pages/DoctorLogin";
import DoctorView from "./pages/DoctorView";
import DoctorRegister from "./pages/DoctorRegister";
import Sidebar from "./components/Sidebar";
import DoctorSidebar from "./components/DoctorSidebar";
import PatientHome from './pages/PatientHome';
import PatientAddDiag from "./pages/PatientAddDiag";
import PatientAppointment from "./pages/PatientAppointment";
import Error from './pages/Error';
import HospitalInfo from "./pages/Hospital";

import {useSessionStorage} from './utils/useSessionStorage'
import PatientProfile from "./pages/PatientProfile";
import Welcome from "./pages/Welcome";

const App: React.FC = () => {

  const [loggedIn,setLoggedIn] = useState(false);

  const [token,setToken] = useSessionStorage('token','');
  const [user,setUser] = useSessionStorage('user',JSON.stringify({}));
  const [login,setLogin] = useSessionStorage('login',false);

  let User={}
  
  if(login==="true")
  { User = JSON.parse(user);}

  useEffect(()=>{
    if(login==="true") setLoggedIn(true);
    else setLoggedIn(false);
  },[login])


  return (
    <div className="h-100">
      <Navbar />
      {/*<Chatbot />*/}
      {loggedIn && login==="true" && token.length && (User as any).speciality===undefined &&<NewSidebar /> }
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor_login" element={<DoctorLogin />} />
        <Route path="/doctor_view" element={(login==="true" && token.length)?<DoctorView/> :""} />
        <Route path="/doctor_register" element={<DoctorRegister />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient_home" element={(login==="true" && token.length) ? <PatientHome />:<Error />} />
        <Route path="/patient_profile" element={(login==="true" && token.length) ? <PatientProfile />:<Error />} />
        <Route path="/patient_adddiag" element={(login==="true" && token.length) ? <PatientAddDiag />:<Error />} />
        <Route path="/patient_appointment" element={(login==="true" && token.length) ? <PatientAppointment />:<Error />} />        
        <Route path="/hospital" element={<HospitalInfo/>} />
      </Routes>
    </div>
  );

};

export default App;
