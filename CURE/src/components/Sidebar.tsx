import React from "react";

export default function Sidebar(props) {
  const darkStyle = {
    backgroundColor: "black",
    color: "#fff",
    cursor: "pointer", // Add cursor style
    width: "200px",
    height: "50px",
    margin: "20px",
    borderRadius: "10px"
  };

  const lightStyle = {
    backgroundColor: "#fff",
    color: "#000",
    cursor: "pointer", // Add cursor style
    width: "200px",
    height: "50px",
    margin: "20px",
    borderRadius: "10px"
  };

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        {/* Header content */}
      </div>
      <div
        className="option selected-option"
        onClick={() => {
          props.setViewState(1);
        }}
        style={props.viewState === 1 ? darkStyle : lightStyle}
      >
        <h4 className="option-label">My Diagnosis</h4>
      </div>
      <div
        className="option"
        onClick={() => {
          props.setViewState(2);
        }}
        style={props.viewState === 2 ? darkStyle : lightStyle}
      >
        <h4 className="option-label">Add Diagnosis</h4>
      </div>
      <div
        className="option"
        onClick={() => {
          props.setViewState(3);
        }}
        style={props.viewState === 3 ? darkStyle : lightStyle}
      >
        <h4 className="option-label">Add Appointment</h4>
      </div>
    </section>
  );
}
