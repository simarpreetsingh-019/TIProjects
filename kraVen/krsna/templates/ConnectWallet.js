ConnectWallet.js

import React, { useState } from 'react';
import icon1 from './icon1.png';
import icon2 from './icon2.png';
import icon3 from './icon3.png';

const ConnectWallet = ({ onWalletConnect }) => {
  const [error, setError] = useState('');

  const handleConnectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        onWalletConnect();
      } catch (err) {
        setError('Failed to connect wallet. Please try again.');
      }
    } else {
      setError('MetaMask is not installed. Please install it to connect your wallet.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <h1 style={{
        fontSize: '3rem',
        color: '#fff',
        marginBottom: '30px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
      }}>kraVen</h1>
      <button onClick={handleConnectWallet} style={{
        padding: '15px 30px',
        fontSize: '1.2rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      }}>
        Connect MetaMask
      </button>
      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -1,
      }}>
        {[icon1, icon2, icon3].map((icon, index) => (
          <img key={index} src={icon} alt={`icon${index + 1}`} style={{
            position: 'absolute',
            width: '50px',
            height: '50px',
            animation: `float ${5 + index}s ease-in-out infinite`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }} />
        ))}
      </div>
    </div>
  );
};

export default ConnectWallet;