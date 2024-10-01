import React, { useEffect, useState } from "react";
// import Header from "./components/Header";
import Navbar from "../components/Navbar";
import LoginRegister from "../components/LoginRegsiter";
import UserInfo from "../components/UserInfo";
import UserDiagnosis from "../components/UserDiagnosis";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import NewDiagnosisForm from "../components/AddDiagnosis";
import AddAppointment from "../components/AddAppointment";

export default function Patients() {
  // const [loggedIn, setLoggedIn] = useState(true);

  const [loggedIn, setLoggedIn] = useState(false);
  const [diagnosisElements, setDiagnosisElements] = useState([]);
  const [viewState, setViewState] = useState(3);
  const [form, setForm] = useState({
    aadhar: "",
    name: "",
    sex: "",
    age: "",
    secretKey: ""
  });

  const diagnosisList = async () => {
    if (loggedIn === true) {
      try {
        const response = await axios.post("http://localhost:4000/api/getDiagnostic", {
          aadhar: form.aadhar,
        });

        const { message, data } = response.data;
        
        const newDiagnosisElements = data.map((item) => (
          <UserDiagnosis
            key={item._id}
            symptoms={item.symptoms}
            docName={item.doctorName}
            diagnosis={item.diagnosis}
            document={item.document}
            patientName={item.patientName}
            docType={item.docType}
          />
        ));

        setDiagnosisElements(newDiagnosisElements);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          console.log("Error Occurred");
        }
      }
    }
  };

  useEffect(() => {
    diagnosisList();
  }, [loggedIn, form.aadhar, viewState]);

  const appStyle = {
    display: "flex" as "flex",
    flexDirection: "row" as "row",
    height: "100vh" as "100vh",
  };

  const sidebarStyle = {
    width: "250px",
    flexShrink: 0, // Prevent sidebar from shrinking
    background: "#f0f0f0",
    padding: "20px",
  };

  const diagnosisSectionStyle = {
    flexGrow: 1, // Allow diagnosis section to expand
    overflow: "auto", // Add scrollbar if content overflows
    padding: "20px",
  };

  const style = {
    height: "100px",
  };

  return (
    <div>
      <Navbar />
      <div style={style}></div>
      {loggedIn === false ? (
        <LoginRegister loggedIn={loggedIn} setLog={setLoggedIn} form={form} setForm={setForm} />
      ) : (
        <div style={appStyle}>
          <div style={sidebarStyle}>
            <Sidebar setViewState={setViewState} viewState={viewState}/>
          </div>
          <div style={diagnosisSectionStyle}>
            <UserInfo form={form} />
            {viewState === 1 && (
              <>
                <div className="card-header text-center " style={{ width: "100%" }}>
                  <h4>Medical Records</h4>
                </div>
                {diagnosisElements}
                {/* <UserDiagnosis
            key="5"
            symptoms="SYMPTOMS"
            docName="Doc name"
            diagnosis="Diagnoistiv"
            document="document"
            patientName="patientNae"
            docType="doctype"
          /> */}
              </>
            )}
            {viewState === 2 && (
              <NewDiagnosisForm form={form} />
            )}
            {viewState === 3 && <AddAppointment userAadhar={form.aadhar}/>}
          </div>
        </div>
      )}
    </div>
  );
}
