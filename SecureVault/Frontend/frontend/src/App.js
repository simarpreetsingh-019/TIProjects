import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [extractedData, setExtractedData] = useState({});
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== 'application/pdf') {
      setError('Please select a valid PDF file.');
      return;
    }
    setFile(selectedFile);
    setExtractedData({});
    setError(''); // Clear error if a valid file is selected
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
        },
      });
      setExtractedData(response.data); // Set the response data
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error uploading file:', error);
      const serverError = error.response ? error.response.data : 'Error uploading file. Please try again.';
      setError(serverError);
    }
  };

  return (
    <div>
      <h1>PDF Upload</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {extractedData.cleaned_text && (
        <div>
        <h2>Extracted Data:</h2>
        <pre>{extractedData.cleaned_text}</pre>
        <h3>Answer:</h3>
        <div>
          <strong>Name:</strong>{extractedData.name}
        </div>
        <div>
          <strong>Date of Birth:</strong> {extractedData.dob}
        </div>
      </div>
      )}
    </div>
  );
}

export default App;
