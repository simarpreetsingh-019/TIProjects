import React from "react"

export default function UserInfo(props){
    const style = {
        size: "12px",
        fontSize: "20px"
    }
    const pageStyle = {
        borderRadius: "24px",
        background: "#FBF7F4"
    }
    const NameStyle = {
        color: "#384D6C",
        fontFamily: "Montserrat",
        fontSize: "20px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "normal"
    }
    const AgeStyle = {
        color: "#384D6C",
        fontFamily: "Montserrat",
        fontSize: "20px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "normal"
    }

    const aadharStyle = {
        color: "#6B7280",
        fontFamily: "Montserrat",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "normal"
    }
    return (
        <div style={pageStyle}>
            <div className=" text-center" style={style} >User Details</div>
            <div className="row" style={NameStyle}>
                <div className="col-md-4"/>{props.form.name}</div>

            <div className="row" style={AgeStyle}>
                <div className="col-md-4"/>{props.form.sex}
                <div className="col-md-4"/>{props.form.age}</div>

            <div className="row" style={aadharStyle}>
                <div className="col-md-4"/>{props.form.aadhar}</div>
        </div>
    )
}