import React, { useEffect, useState } from "react";
import { ChevronLeft, Shield, Info, UserPen } from "lucide-react";
import { useSelector } from "react-redux";
import { CONTRACT_ADDRESS } from "../helpers/contansts";
import { Link, useParams } from "react-router-dom";
export default function TezTunesBuyPage() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const wallet = useSelector((state) => state.wallet);
  const { songs } = useSelector((state) => state.songs);
  const song = songs[params.id];

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="max-w-2xl mx-auto flex items-center">
          <Link to="/explore">
            <button className="flex items-center text-purple-400 hover:text-purple-300">
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          </Link>
          <h1 className="text-xl font-semibold mx-auto">Buy Royalty Shares</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Balance Display */}
        <div className="flex justify-end">
          <div className="bg-gray-800 rounded-lg px-6 py-3">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Balance:</span>
              <span className="text-xl font-semibold">{wallet.balance} ꜩ</span>
            </div>
          </div>
        </div>

        {/* Song Card */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
              <img src={song.image} alt="Song artwork" className="rounded-lg" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold  from-purple-400 ">
                {song.title}
              </h2>
              <p className="text-gray-400">{song.artist_name}</p>
              <div className="flex items-center mt-2">
                <Shield className="w-4 h-4 text-purple-400 mr-2" />
                <span className="text-sm text-gray-400">Verified Rights</span>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Details */}
        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
          <h3 className="text-xl font-semibold text-purple-400">
            Purchase Details
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Price per Share</span>
              <span className="font-semibold">{song.price} ꜩ</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Quantity</span>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleDecrement}
                  className="w-8 h-8 rounded-full bg-purple-500 hover:bg-purple-400 flex items-center justify-center"
                >
                  -
                </button>
                <span className="font-semibold">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="w-8 h-8 rounded-full bg-purple-500 hover:bg-purple-400 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-purple-400">
                  {quantity * parseInt(song.price)} ꜩ
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gray-800/50 rounded-lg p-4 flex items-start space-x-3">
          <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
          <p className="text-sm text-gray-400">
            By purchasing shares, you're acquiring rights to future royalty
            earnings from this track. Earnings will be automatically distributed
            to your wallet.
          </p>
        </div>

        {/* Purchase Button */}
        <button className="w-full py-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-opacity font-semibold">
          Confirm Purchase
        </button>
      </main>

      {/* Footer */}
      <footer className="max-w-2xl mx-auto p-4 mt-8">
        <div className="flex justify-center space-x-6 text-sm text-gray-400">
          <a href="#" className="hover:text-purple-400">
            Terms
          </a>
          <a href="#" className="hover:text-purple-400">
            Privacy
          </a>
          <a href="#" className="hover:text-purple-400">
            Support
          </a>
        </div>
      </footer>
    </div>
  );
}
