import React, { useEffect, useState } from "react";
import { Search, Wallet } from "lucide-react";

import { useSelector } from "react-redux";
import { CONTRACT_ADDRESS } from "../helpers/contansts";
import { Link, useNavigate } from "react-router-dom";

const MusicExplorer = () => {
  const { tezos } = useSelector((state) => state.tezos);
  const wallet = useSelector((state) => state.wallet);
  const { songs } = useSelector((state) => state.songs);

  const MusicCard = ({ image, title, artist, price, id }) => (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-image" />
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <p className="text-gray-400">{artist}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-purple-400">{price} ꜩ</span>
          <Link to={`/buy/${id}`}>
            {" "}
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Buy
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-gray-800">
        <Link to={"/"} className="text-2xl font-bold text-purple-400">
          TezTunes
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/upload">
            <button className="bg-pink-500 hover:bg-pink-600 text-white rounded-md px-4 py-2">
              Upload
            </button>
          </Link>
          <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2">
            <Wallet className="text-purple-400 mr-2" size={20} />
            <span>{wallet.balance} ꜩ</span>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search for artists, songs..."
            className="w-full bg-gray-800 rounded-lg py-3 px-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        {/* Featured Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-purple-400">
            Music Madness
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {songs.map((song, index) => {
              return <MusicCard key={index} {...song} id={index} />;
            })}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-purple-400">
            Browse by Genre
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Pop", "Rock", "Jazz", "Electronic"].map((genre) => (
              <button
                key={genre}
                className="bg-gray-800 p-4 rounded-lg text-center hover:bg-purple-600 transition-colors"
              >
                {genre}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MusicExplorer;
