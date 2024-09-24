import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AadhaarVerification from "./anon-aadhar/verification";

const Index = () => {
  const [status, setStatus] = useState(null); // Start with null to indicate that the status is not yet checked
  const router = useRouter();

  useEffect(() => {
    const storedStatus = localStorage.getItem("status");
    if (storedStatus === "logged-in") {
      router.push("/home"); // Redirect to Home page if already logged in
    } else {
      setStatus("not-logged-in"); // Set status to "not-logged-in" if not logged in
    }
  }, [router]);

  // Show nothing until the status is checked
  if (status === null) {
    return null; // Return null or a loading spinner if you want to show a loading indicator
  }

  return (
    <AadhaarVerification
      onVerified={() => {
        setStatus("logged-in");
        localStorage.setItem("status", "logged-in"); // Save status to localStorage
        router.push("/home"); // Redirect to Home page once verified
      }}
    />
  );
};

export default Index;
