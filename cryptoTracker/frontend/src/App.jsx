// import React from 'react'
import "./index.css";
import Dashboard from "./component/Dashboard";
import { useState, useEffect } from "react";
import SignInForm from "./component/Signin";
import SignUpForm from "./component/Signup";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);


  const handleAuthSuccess = (token) => {
    localStorage.setItem("token", token); // Store the token in localStorage
    setIsAuthenticated(true); // Update state to reflect that user is authenticated
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    setIsAuthenticated(false); // Set back to unauthenticated
  };
  return (
    <div>
      <div >
        {/* Conditional rendering based on authentication */}
        {isAuthenticated ? (
          <Dashboard onLogout={handleLogout} /> // Render Home if authenticated
        ) : (
          <div className="bg-black min-h-screen">

            {/* Render both SignInForm and SignUpForm */}
            {isSignUp ? (
              <SignUpForm onAuthSuccess={handleAuthSuccess} />
            ) : (
              <SignInForm onAuthSuccess={handleAuthSuccess} />
            )}
            <button className="bg-blue-500 mx-[45%] px-10 py-2 rounded-sm border font-semibold border-white hover:bg-blue-700"  onClick={handleToggle}>{isSignUp ? "Already have account" : "SignUp here"}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
