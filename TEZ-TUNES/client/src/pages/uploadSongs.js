import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Upload, Music2, Tag, ImagePlus, Wallet, File } from "lucide-react";
import { pinata } from "../helpers/upload";
import { useDispatch, useSelector } from "react-redux";
import { CONTRACT_ADDRESS } from "../helpers/contansts";
import Navbar from "../components/navbar";
import LoadingScreen from "../components/loadingScreen";

const UploadForm = () => {
  const navigate = useNavigate();
  const wallet = useSelector((state) => state.wallet);
  const { tezos } = useSelector((state) => state.tezos);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    artistName: "",
    songName: "",
    songGenre: "",
    coverArtLink: "",
    price: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const [songFile, setSongFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "coverArtLink" && value) {
      setPreviewImage(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("audio/")) {
      setSongFile(file);
    } else {
      alert("Please upload a valid audio file");
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setLoading(true);

    let { IpfsHash, Timestamp } = await pinata.upload.file(songFile);
    console.log("Form submitted:", {
      ...formData,
      songFile,
      IpfsHash: "432483275",
      Timestamp: "78943",
    });
    uploadSongMetadata(IpfsHash, Timestamp);
  };

  const uploadSongMetadata = async (ipfsCID, timestamp) => {
    try {
      const contractAddress = CONTRACT_ADDRESS;
      const contract = await tezos.wallet.at(contractAddress);
      // title , artist, artist_name, timestamp, genre, ipfs_hash, image , price
      const params = {
        title: formData.songName,
        artist: `${wallet.address}`,
        artist_name: `${formData.artistName}`,
        image: `${formData.coverArtLink}`,
        genre: `${formData.songGenre}`,
        ipfs_hash: `${ipfsCID}`,
        price: formData.price,
        timestamp,
      };

      const operation = await contract.methods
        .addSong(
          params.artist,
          params.artist_name,
          params.genre,
          params.image,
          params.ipfs_hash,
          params.price,
          params.title
        )
        .send();
      await operation.confirmation();
      alert("Song got uploaded!");
      navigate("/");
    } catch (error) {
      console.error("Error uploading song:", error);
    }
  };
  if (loading) return <LoadingScreen text={"Uploading...."} />;
  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-slate-900 text-gray-100 p-6">
        {/* Top Balance Bar */}
        <div className="max-w-4xl mx-auto flex justify-end mb-8 gap-11">
          <Link to={"/"} className="text-2xl font-bold text-purple-400">
            TezTunes
          </Link>
          <Link to="/explore">
            <button className="bg-pink-500 hover:bg-pink-600 text-white rounded-md px-4 py-2">
              Explore
            </button>
          </Link>
          <div className="bg-purple-900/50 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-2">
            <Wallet className="text-purple-400" size={20} />

            <span className="text-purple-300">Balance:</span>
            <span className="font-bold">{wallet.balance} ꜩ</span>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <h1
            style={{ color: "#dc2b7b " }}
            className="text-4xl font-bold text-center bg-clip-text text-transparent mb-8"
          >
            Upload Your Music
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Song File Upload Section */}
            <div className="w-full p-6 border-2 border-dashed border-slate-600 rounded-lg hover:border-purple-500 transition-colors">
              <div className="space-y-4">
                <label className="flex items-center justify-center text-purple-300 font-medium gap-2">
                  <File size={18} />
                  Upload Song File
                </label>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="song-file"
                  />
                  <label
                    htmlFor="song-file"
                    className="flex flex-col items-center justify-center w-full cursor-pointer"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload size={32} className="text-purple-400 mb-2" />
                      <p className="mb-2 text-sm text-purple-300">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">
                        MP3, WAV, FLAC (max 50MB)
                      </p>
                    </div>
                  </label>
                  {songFile && (
                    <div className="flex items-center gap-2 text-sm text-purple-300">
                      <Music2 size={16} />
                      <span>{songFile.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Artist Name Input */}
                <div className="space-y-2">
                  <label className="flex items-center text-purple-300 font-medium gap-2">
                    <Music2 size={18} />
                    Artist Name
                  </label>
                  <input
                    type="text"
                    name="artistName"
                    value={formData.artistName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                    placeholder="Enter artist name"
                  />
                </div>

                {/* Song Name Input */}
                <div className="space-y-2">
                  <label className="flex items-center text-purple-300 font-medium gap-2">
                    <Music2 size={18} />
                    Song Name
                  </label>
                  <input
                    type="text"
                    name="songName"
                    value={formData.songName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                    placeholder="Enter song name"
                  />
                </div>

                {/* Genre Selection */}
                <div className="space-y-2">
                  <label className="flex items-center text-purple-300 font-medium gap-2">
                    <Tag size={18} />
                    Genre
                  </label>
                  <select
                    name="songGenre"
                    value={formData.songGenre}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                  >
                    <option value="">Select Genre</option>
                    <option value="pop">Pop</option>
                    <option value="rock">Rock</option>
                    <option value="hiphop">Hip Hop</option>
                    <option value="electronic">Electronic</option>
                    <option value="jazz">Jazz</option>
                    <option value="classical">Classical</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Cover Art Preview */}
                <div className="space-y-2">
                  <label className="flex items-center text-purple-300 font-medium gap-2">
                    <ImagePlus size={18} />
                    Cover Art Link
                  </label>
                  <input
                    type="url"
                    name="coverArtLink"
                    value={formData.coverArtLink}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                    placeholder="Enter cover art URL"
                  />
                  <div className="aspect-square rounded-lg bg-slate-700/50 border border-slate-600 overflow-hidden flex items-center justify-center">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Cover Art Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImagePlus size={48} className="text-slate-500" />
                    )}
                  </div>
                </div>

                {/* Price Input */}
                <div className="space-y-2">
                  <label className="flex items-center text-purple-300 font-medium gap-2">
                    <Wallet size={18} />
                    Price (ꜩ)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                    placeholder="Enter price in Mutez"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <Upload size={20} />
              Upload Song
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadForm;
