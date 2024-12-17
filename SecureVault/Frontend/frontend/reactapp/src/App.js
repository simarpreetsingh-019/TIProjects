import React, { useState } from 'react';
import axios from 'axios';
import './App.css';



// Login Component
const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });
      setToken(response.data.token); // Store the token
      setError(''); // Clear any previous error
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

// Register Component
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/auth/register', {
        username,
        password,
      });
      setMessage('User registered successfully');
    } catch (error) {
      setMessage('Error registering user');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

function App() {
  const [file, setFile] = useState(null);
  const [extractedData, setExtractedData] = useState({});
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a PDF file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Include the token in the request
        },
      });
      setExtractedData(response.data);
      console.log(response.data);
      setError('');
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error uploading file. Please try again.');
    }
  };

  return (
    <div id='outermost'>
      
      <h1>SECURE VAULT</h1>
      {/* <img src={`${process.env.PUBLIC_URL}/favicon.png`} id="logo" alt="logo"/> */}
      {!token ? (
        <>
          <Register />
          <Login setToken={setToken} />
        </>
      ) : (
        <div id='outer'>
          <h2>Upload PDF</h2>
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {extractedData.cleaned_text && (
            <div id='inner'>
              <h2>Extracted Data:</h2>
              <pre>{extractedData.cleaned_text}</pre>
              <h3>Answer:</h3>
              <pre>{extractedData.name}</pre>
              <pre>{extractedData.dob}</pre>
              <button id='passinfo'>Provide to 'XXX' app</button>
            </div>
            
          )}
        </div>
      )}
    </div>
  );
}

export default App;




