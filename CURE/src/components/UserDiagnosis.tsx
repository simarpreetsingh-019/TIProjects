import React from "react";

export default function UserDiagnosis(props) {
  const style = {
    fontFamily: "Mulish",
    fontSize: "32px",
    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "normal",
    letterSpacing: "5.36px",
  };

  const textStyle = {
    color: "#384D6C",
    fontFamily: "Montserrat",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
  };

  return (
    <div className="container mt-6">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <p style={textStyle}>
                <strong style={style}>Diagnosis:</strong> {props.diagnosis}
              </p>
              <p style={textStyle}>
                <strong style={style}>Document Type:</strong> {props.docType}
              </p>
              <p style={textStyle}>
                <strong style={style}>Document Name:</strong> {props.document}
              </p>
              <p style={textStyle}>
                <strong style={style}>Doctor Name:</strong> {props.docName}
              </p>
              <p style={textStyle}>
                <strong style={style}>Patient Name:</strong> {props.patientName}
              </p>
              <p style={textStyle}>
                <strong style={style}>Symptoms:</strong> {props.symptoms}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
