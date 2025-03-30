/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Loader } from '@mantine/core';
import axios from 'axios';
import { Buffer } from 'buffer';

const pinataApiKey = 'd61dd22ec8928187a5f3';
const pinataSecretApiKey =
  'd49a4844a11d1a745558056a37504e92ebfc10ad2a4f0f7f94ce6a19212f8cfe';

export default function UploadPage() {
  const [buf, setBuf] = useState<Buffer | undefined>(undefined);
  const [hash, setHash] = useState('');
  const [loader, setLoader] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [decryptionKey, setDecryptionKey] = useState('');

  const generateKey = async () => {
    const key = await window.crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256,
      },
      true,
      ['encrypt', 'decrypt']
    );
    const exportedKey = await window.crypto.subtle.exportKey('raw', key);
    setDecryptionKey(Buffer.from(exportedKey).toString('hex'));
    return key;
  };

  const encryptBuffer = async (buffer: BufferSource, key: CryptoKey) => {
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Generate a random IV
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      key,
      buffer
    );
    return { encryptedBuffer: new Uint8Array(encrypted), iv };
  };

  const captureFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const files = event.target.files;
    if (!files) {
      alert('No file selected');
      return;
    }
    const file = files[0];

    const validTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      alert('Invalid file type');
      return;
    }

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader);
  };

  const convertToBuffer = async (reader: FileReader) => {
    if (reader.result) {
      const buffer = Buffer.from(reader.result as ArrayBuffer);
      setBuf(buffer);
    } else {
      alert('File reading failed');
    }
  };

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoader(true);

    const buffer = buf;
    if (!buffer) {
      alert('No file selected');
      setLoader(false);
      return;
    }

    try {
      const key = await generateKey();

      const { encryptedBuffer, iv } = await encryptBuffer(buffer, key);

      const data = new FormData();
      const encryptedBlob = new Blob([iv, encryptedBuffer]);
      data.append('file', encryptedBlob, 'encryptedFile');

      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
      const headers = {
        pinata_api_key: String(pinataApiKey),
        pinata_secret_api_key: String(pinataSecretApiKey),
      };

      const response = await axios.post(url, data, { headers });
      const ipfsId = response.data.IpfsHash;
      console.log('Generated IPFS Hash: ', ipfsId);
      setHash(ipfsId);
      setShowLinks(true);
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please check the console');
      setShowLinks(false);
    }

    setLoader(false);
  };

  //   if (loader) {
  //     return (
  //       <>
  //         <div className='h-screen w-screen'>
  //           <div className='h-[10%]'></div>
  //           <div className='h-[90%]'>
  //             <Loader />
  //           </div>
  //         </div>
  //       </>
  //     );
  //   }

  return (
    <div className='h-screen w-screen'>
      <div className='h-[10%]'></div>
      <div className='h-[90%]'>
        {loader ? (
          <Loader />
        ) : (
          <>
            <h1>Upload and Encrypt Files to IPFS</h1>
            <h5>Choose file to encrypt and upload to IPFS</h5>
            <Form onSubmit={onSubmit}>
              <input type='file' onChange={captureFile} required />
              <Button type='submit'>Upload</Button>
            </Form>
            {showLinks ? (
              <div className='flex flex-col'>
                <h6>IPFS Hash: {hash}</h6>
                <p>Decryption Key: {decryptionKey}</p>
                <p>Non-clickable Link: https://ipfs.io/ipfs/{hash}</p>
                <a href={'https://ipfs.io/ipfs/' + hash}>
                  Clickable Link to view file on IPFS (encrypted)
                </a>
              </div>
            ) : (
              <p></p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
