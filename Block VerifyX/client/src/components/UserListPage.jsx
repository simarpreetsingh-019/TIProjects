import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Download, Copy } from 'lucide-react';

const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

   const handleNavigateHome = () => {
     window.location.href = "/";
   };
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Wallet address copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-between relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzFmMjkzNyI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9IiMzNzQxNTEiPjwvY2lyY2xlPgo8L3N2Zz4=')] opacity-30 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-xy"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <Link
          to="/admin"
          className="text-blue-400 hover:text-blue-300 transition-colors mb-6 inline-block"
        >
          &larr; Back to Admin Dashboard
        </Link>
        <div className="max-w-4xl mx-auto bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl border border-gray-700">
          <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            User List
          </h1>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-gray-700 bg-opacity-50 p-4 rounded-lg flex items-center justify-between hover:bg-opacity-70 transition-all duration-300"
              >
                <div className="flex items-center">
                  <User className="text-blue-400 mr-4" size={24} />
                  <div>
                    <p className="text-lg font-semibold">
                      {user.walletAddress}
                    </p>
                    <p className="text-sm text-gray-400">
                      Uploaded on: {new Date(user.uploadDate).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => copyToClipboard(user.walletAddress)}
                    className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-500 transition-colors"
                    title="Copy wallet address"
                  >
                    <Copy size={20} />
                  </button>
                  <a
                    href={`${import.meta.env.VITE_BACKEND_URL}/download/${
                      user._id
                    }`}
                    className="inline-block p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Download PDF"
                  >
                    <Download size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListPage;