# CURE---CENTRALIZED-USER-REGISTRY-FOR-EXPERTS using Tezos Blockchain

![Project Logo](https://raw.githubusercontent.com/Tharaniesh3/CURE---Centralized-User-Registry-for-Experts/main/src/assets/cure1.png)

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Project Overview
**CURE (Centralized User Registry for Experts)** is a health record management system built on the **Tezos blockchain**. It ensures secure and decentralized storage of health records, enabling patients to securely share their personal data with doctors. The system incorporates **AES** and **RSA encryption** for security and uses **IPFS** for decentralized file storage. The focus is on privacy, transparency, and interoperability of health data.

## Features
- **Tezos Blockchain Integration**: Ensures decentralized and immutable storage of patient and doctor data.
- **AES and RSA Encryption**: Secure data storage and key sharing using industry-standard encryption algorithms.
- **IPFS Storage**: Utilizes decentralized file storage for handling large medical documents.
- **Secure Data Sharing**: Patients can securely share health records with authorized doctors using public/private key pairs.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Blockchain**: Tezos Blockchain
- **Encryption**: AES & RSA
- **Decentralized Storage**: IPFS (InterPlanetary File System)
- **Frontend**: React.js
- **Authentication**: JWT, bcrypt (optional for user authentication)

## Usage
- **Registration**: Patients and doctors can register on the platform.
- **Login**: After registration, users can log in to manage or access health records.
- **Data Encryption**: Health data is encrypted using AES, and the AES key is securely shared using RSA encryption.
- **Document Storage**: Diagnosis documents are stored in IPFS and linked to the blockchain.

## API Endpoints
Here are some of the key API routes available in the project:

- **POST /api/register**: Register a new patient or doctor.
- **POST /api/login**: Authenticate a user.
- **POST /api/storeDiagnosis**: Store diagnosis information for a patient (encrypted).
- **GET /api/viewDiagnosis**: Retrieve diagnosis information for a patient (decrypted).

### Example Request for Registration:
```bash
POST /api/register
{
  "name": "Tharaniesh P R",
  "aadhar": "123456789012",
  "age": 20,
  "sex": "Male"
}
