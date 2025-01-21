import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

function UserHome() {
  const [file, setFile] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleWalletChange = (e) => {
    setWalletAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !walletAddress) {
      setMessage('Please select a file and enter a wallet address');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('walletAddress', walletAddress);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred during upload');
    }
    setIsUploading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-between relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzFmMjkzNyI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9IiMzNzQxNTEiPjwvY2lyY2xlPgo8L3N2Zz4=')] opacity-30 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-xy"></div>
      </div>

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors mb-6 inline-block">
          &larr; Back to Home
        </Link>
        <div className="max-w-md mx-auto bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl border border-gray-700">
          <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Upload Certificate
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-2">
                PDF File
              </label>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">PDF (MAX. 10MB)</p>
                  </div>
                  <input id="file" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="wallet" className="block text-sm font-medium text-gray-300 mb-2">
                Wallet Address
              </label>
              <div className="relative">
                <Wallet className="absolute top-3 left-3 text-gray-400" size={20} />
                <input
                  id="wallet"
                  name="wallet"
                  type="text"
                  required
                  value={walletAddress}
                  onChange={handleWalletChange}
                  className="bg-gray-700 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="Enter wallet address"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isUploading}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {isUploading ? 'Uploading...' : 'Upload Certificate'}
            </button>
          </form>
          {message && (
            <div className="mt-4 p-3 bg-gray-700 bg-opacity-50 text-white rounded-md border border-gray-600">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserHome;