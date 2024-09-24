import React, { useState } from "react";
import CryptoJS from "crypto-js";
import "./global.js";
import toast from "react-hot-toast";
import {
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";

const UploadCase = ({ state }) => {
  const { account, contract } = state;

  const [caseName, setCaseName] = useState("");
  const [numFiles, setNumFiles] = useState(1);
  const [fileArray, setFileArray] = useState([]);
  const [uniqueCaseID, setUniqueCaseID] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileInputChange = (index, event) => {
    if (index < 10) {
      const files = event.target.files;
      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const fileData = reader.result.split(",")[1];
        setFileArray((prevFileArray) => {
          const updatedFileArray = [...prevFileArray];
          updatedFileArray[index] = {
            name: file.name,
            data: fileData,
          };
          return updatedFileArray;
        });
      };

      reader.readAsDataURL(file);
    } else {
      toast.error("You can upload a maximum of 10 files.");
      console.log("You can upload a maximum of 10 files.");
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!account || !caseName || numFiles === 0 || fileArray.length !== numFiles) {
      console.log("Please fill in all the details and upload the specified number of files.");
      return toast.error("Please fill in all the details and upload the specified number of files.");
    }

    setLoading(true);

    const hash = CryptoJS.SHA256(caseName);
    const hashedCaseID = hash.toString(CryptoJS.enc.Hex);
    setUniqueCaseID(hashedCaseID);

    const filesData = {
      files: fileArray,
      uniqueCaseID: caseName + hashedCaseID,
    };

    const userPrivateKey = "f423a224907d18a0f6d60989b37562d6c0d14cbbea52898a2cd94786cee0deae";
    const IPFS_Key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkMzE0OTYzZC02MzUzLTQ4Y2QtOTRlMC1lODdiOTM3NjUwZGIiLCJlbWFpbCI6ImpheWFyYWp2aXN3YW5hdGhhbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiOTk5OTUxNDdhYjRlNjA5MjQ0ZDUiLCJzY29wZWRLZXlTZWNyZXQiOiJiODYxYjBiOWM5MGZhZmY4MzVjMjJiZDBjMzhkYmNmNmU3ZGZkYjgzNDBkYjFhMGYxNWU4OTU1YjNmZjc0YzdkIiwiaWF0IjoxNzA4OTUxMTQwfQ.P-4aV38dousYXc1rjTBTqjRg7WxgYZxMrlXKfv47ZPc";

    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + IPFS_Key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pinataContent: {
          filesData,
        },
        pinataMetadata: {
          name: caseName + ".json",
        },
        pinataOptions: {
          cidVersion: 1,
        },
      }),
    };

    try {
      const response = await fetch(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        options
      );
      const data = await response.json();

      if (data && data.IpfsHash) {
        const encryptedCID = CryptoJS.AES.encrypt(
          data.IpfsHash,
          userPrivateKey
        ).toString();
        console.log(data.IpfsHash);
        console.log(encryptedCID);

        const transaction = await contract.addCase(caseName, encryptedCID);
        const receipt = await transaction.wait();

        if (receipt.status === 1) {
          toast.success("Transaction Successful");
          console.log("Transaction Successful");
        } else {
          toast.error("Transaction failed"); 
          console.log("Transaction failed");
        }

        // const logData = {
        //   address: account,
        //   caseName: caseName,
        //   event: "Add case",
        //   timestamp: new Date().toISOString(),
        //   result: receipt.status === 1 ? "success" : "failed",
        // };
        // await sendLogToServer(logData);
      } else {
        console.log("Invalid CID received from IPFS");
      }
    } catch (err) {
      console.log(err);
      // const logData = {
      //   address: account,
      //   caseName: caseName,
      //   event: "Add case",
      //   timestamp: new Date().toISOString(),
      //   result: "error - " + err.message.toString(),
      // };
      // await sendLogToServer(logData);
    } finally {
      setLoading(false);
    }
  };

  // const sendLogToServer = async (logData) => {
  //   try {
  //     console.log("Log Data:", logData);
  //     const response = await fetch("http://192.168.3.1:5000/logs", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(logData),
  //     });
  //     const data = await response.json();
  //     console.log("Log sent successfully:", data);
  //   } catch (error) {
  //     console.error("Error sending log:", error);
  //   }
  // };

  const handleNumFilesChange = (e) => {
    try{
      const newNumFiles = parseInt(e.target.value);
      if (newNumFiles > 10) {
        alert("You can upload a maximum of 10 files.");
        toast.error("You can only upload a maximum of 10 files.");
        setNumFiles(10);
      } else {
        setNumFiles(newNumFiles);
      }
      setFileArray([]);
    }
    catch(err){
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen py-5 justify-center items-center mx-auto bg-[#030014] max-w-7xl overflow-x-hidden overflow-y-hidden">
      <form className="w-full mx-auto px-5 py-3 flex gap-10 justify-between">
        <div className="w-1/2 flex flex-col">
          <div className="mb-5">
            <label
              htmlFor="account"
              className="block mb-2 text-sm font-medium text-white"
            >
              Connected Account
            </label>
            <input
              type="text"
              id="account"
              className="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light"
              value={account || ""}
              readOnly
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="caseName"
              className="block mb-2 text-sm font-medium text-white"
            >
              Unique Case Name
            </label>
            <input
              type="text"
              id="caseName"
              className="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light"
              value={caseName}
              onChange={(e) => setCaseName(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="numFiles"
              className="block mb-2 text-sm font-medium text-white"
            >
              Number of Files
            </label>
            <input
              type="number"
              id="numFiles"
              className="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light"
              value={numFiles || 1}
              onChange={handleNumFilesChange}
              min="1"
              max="10"
              required
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-row items-center justify-start gap-2 w-full">
              <button
                type="submit"
                onClick={handleUpload}
                disabled={loading}
                className="w-2/3 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Upload Case
              </button>
              <button
                type="reset"
                className="w-1/3 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => {
                  setCaseName("");
                  setNumFiles(1);
                  setFileArray([]);
                  setUniqueCaseID("");
                }}
              >
                Reset
              </button>
            </div>
            {loading && (
              <div className="flex items-center justify-center gap-2 text-blue-300">
                <IoIosCheckmarkCircleOutline size={20} />
                Uploading files, please wait...
              </div>
            )}
            {uniqueCaseID && (
              <div className="text-green-400 mt-4">
                Case ID generated: {uniqueCaseID}
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2 flex flex-col">
          {Array.from({ length: numFiles }).map((_, index) => (
            <div
              key={index}
              className="mb-5 flex flex-row gap-x-10 items-center justify-between"
            >
              <div className="flex gap-5 items-center">
                {fileArray[index]?.name ? (
                  <IoIosCheckmarkCircle className="text-green-500 w-6 h-6" />
                ) : (
                  <IoIosCheckmarkCircleOutline className="text-gray-400 w-6 h-6" />
                )}
                <label
                  htmlFor={`file-${index}`}
                  className="block text-sm font-medium text-white"
                >{`File ${index + 1}`}</label>
                {fileArray[index]?.name && (
                  <span className="text-sm text-gray-300">
                    {fileArray[index].name}
                  </span>
                )}
              </div>
              <input
                type="file"
                id={`file-${index}`}
                className="hidden"
                onChange={(e) => handleFileInputChange(index, e)}
              />
              <label
                htmlFor={`file-${index}`}
                className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Choose File
              </label>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default UploadCase;
