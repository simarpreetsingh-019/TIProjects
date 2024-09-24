import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import Webcam from 'react-webcam';

const OCRUpload = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [parsedText, setParsedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const webcamRef = useRef(null);

  // Capture image from webcam
  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc); // This base64 string already includes the MIME type
    }
  }, [webcamRef]);

  const handleExtractText = async () => {
    if (!capturedImage) {
      alert('Please capture an image first.');
      return;
    }

    setIsLoading(true);

    try {
      // Convert base64 to blob
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append('image', blob, 'captured_image.jpg');

      const res = await axios.post('http://localhost:5000/ocr', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setParsedText(res.data.parsedText);
    } catch (error) {
      console.error('Error during OCR processing:', error);
      setParsedText('Error extracting text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([parsedText], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'extracted_text.txt');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">OCR Text Extraction</h1>

      {/* Webcam component */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="mb-4 border border-gray-300"
      />

      {/* Button to capture image */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4"
        onClick={captureImage}
      >
        Capture Image
      </button>

      {capturedImage && (
        <img src={capturedImage} alt="Captured" className="mb-4 w-full max-w-sm" />
      )}

      {/* Button to extract text using OCR */}
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        onClick={handleExtractText}
        disabled={isLoading}
      >
        {isLoading ? 'Extracting...' : 'Extract Text'}
      </button>

      {parsedText && (
        <div className="mt-8 bg-white p-6 rounded-md shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">Extracted Text:</h2>
          <textarea
            className="w-full h-64 border border-gray-300 rounded-md p-2 text-gray-700"
            value={parsedText}
            readOnly
          />
          <button
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            onClick={handleDownload}
          >
            Download as .txt
          </button>
        </div>
      )}
    </div>
  );
};

export default OCRUpload;
