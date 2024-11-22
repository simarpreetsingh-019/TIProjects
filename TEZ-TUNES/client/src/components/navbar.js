import React from "react";
import { useSelector } from "react-redux";
import { Search, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const wallet = useSelector((state) => state.wallet);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-4 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-2xl font-bold text-purple-400">TezTunes</h1>
        <div className="flex items-center gap-4">
          {/* Upload Button */}
          <Link
            to="/upload"
            className="text-white bg-purple-500 hover:bg-purple-700 rounded-lg px-4 py-2 transition"
          >
            Upload
          </Link>

          {/* Explore Button */}
          <Link
            to="/explore"
            className="text-white bg-purple-500 hover:bg-purple-700 rounded-lg px-4 py-2 transition"
          >
            Explore
          </Link>
          <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2">
            <Wallet className="text-purple-400 mr-2" size={20} />
            <span>{wallet.balance} ꜩ</span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
