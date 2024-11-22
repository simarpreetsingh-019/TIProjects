import React, { useState, useEffect } from "react";

const LoadingScreen = ({ text }) => {
  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ backgroundColor: "#101424", color: "whitesmoke" }}
    >
      <div className="text-4xl font-bold mb-8">{text}</div>
    </div>
  );
};

export default LoadingScreen;
