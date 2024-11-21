import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import LoginScreen from './components/LoginScreen';
import ConnectWallet from './components/ConnectWallet';
import Dashboard from './components/Dashboard';
import Answers from './components/Answers'; 

// Initialize Firebase app only if it hasn't been initialized
const firebaseConfig = {
  apiKey: "AIzaSyDxWTmBsslJZ80e7mEbDBtCi7FNlrMSuJE",
  authDomain: "ecanteen-4ab1b.firebaseapp.com",
  projectId: "ecanteen-4ab1b",
  storageBucket: "65494167458",
  messagingSenderId: "65494167458",
  appId: "P52Q86NJ83"
};

let app;
if (!getAuth().app) {
  app = initializeApp(firebaseConfig);
}
const auth = getAuth(app);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      if (user) {
        if (isWalletConnected) {
          navigate('/dashboard');
        } else {
          navigate('/connect-wallet');
        }
      } else {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [isWalletConnected, navigate]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/connect-wallet');
  };

  const handleWalletConnect = () => {
    setIsWalletConnected(true);
    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #45B7D1)',
      fontFamily: 'Arial, sans-serif',
    }}>
      <Routes>
        <Route path="/" element={
          !isLoggedIn ? <LoginScreen onLogin={handleLogin} /> :
          !isWalletConnected ? <Navigate to="/connect-wallet" /> :
          <Navigate to="/dashboard" />
        } />
        <Route path="/connect-wallet" element={
          isLoggedIn && !isWalletConnected ? 
          <ConnectWallet onWalletConnect={handleWalletConnect} /> :
          <Navigate to={isLoggedIn ? "/dashboard" : "/"} />
        } />
        <Route path="/dashboard" element={
          isLoggedIn && isWalletConnected ? 
          <Dashboard /> :
          <Navigate to={!isLoggedIn ? "/" : "/connect-wallet"} />
        } />
        <Route path="/answers" element={
          isLoggedIn && isWalletConnected ? 
          <Answers /> :  // Use capitalized Answers
          <Navigate to={!isLoggedIn ? "/" : "/connect-wallet"} />
        } />
      </Routes>
    </div>
  );
};

export default App;
