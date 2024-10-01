import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import abi from '../contractJson/Upload.json'
import { useNavigate, Link } from "react-router-dom";
import ConnectButton from '../miniComponents/ConnectButton'
import fox from '../assets/images/fox.jpeg'
import fox2 from '../assets/images/fox2.jpeg'

const Home = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("Not Connected");
  const [contract, setContract] = useState('');
  const [modelOpen, setModelOpen] = useState(false);
  const [connected, setConnected] = useState(false);

  const connectWithMetaMask = async () => {
    const contractAddr = "0xEB7049cE2792a2F5796492dBB61B5Ef5f0D84310"; 
    const contractABI = abi.abi;

    console.log(contractABI, contractAddr);

    try {
      const { ethereum } = window;

      let signer = null;
      let provider;

      if (ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults");
        provider = ethers.getDefaultProvider();
      } else {
        const ChosenAccount = await ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setAccount(ChosenAccount);
        provider = new ethers.BrowserProvider(ethereum);
        signer = await provider.getSigner();
      }

      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });

      const contract = new ethers.Contract(
        contractAddr, 
        contractABI, 
        signer
      );
      setContract(contract);
      setInfo({ provider, signer, contract });
      setConnected(true);
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='w-full h-full justify-center items-center mx-auto bg-[#030014] max-w-7xl overflow-y-hidden overflow-x-hidden'>
      {!connected ? (
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='text-3xl text-white mt-20'>Connect to the Blockchain</h1>
          <img src={fox} alt='per' border='0' className='mt-10 w-[30%] h-[30%]' />
          <ConnectButton onClick={connectWithMetaMask} disabled={connected} text={connected ? 'Connected' : 'Connect with MetaMask'} />
        </div>
        
      ) : (
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='text-3xl text-white mt-20'>Connected to: {account} </h1>
          <img src={fox2} alt='per' border='0' className='mt-10 w-[30%] h-[30%]' />
          <button onClick={() => {navigate('/upload', {state:{info}})}} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Add new Case</button>
          <button onClick={() => {navigate('/display', {replace: true})}} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">View Cases</button>
          
          <div className='bg-black text-white'>
            <Link to={{
              pathname: '/upload/parameter-data',
              state: {stateParam: info}
            }} >Go to Upload</Link>
          </div>
        </div>
      )
      }
  </div>
  )
}

export default Home
