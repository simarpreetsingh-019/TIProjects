
# Assured Contract Farming Platform on Tezos

This repository contains the codebase for the **Assured Contract Farming Platform**, a decentralized application (DApp) built on the Tezos blockchain using Next.js. The project was developed as part of the **Hack7Days** hackathon and aims to provide a secure, transparent, and automated platform for contract-based transactions between farmers and buyers.

Have a look at our contract deployed in tezos blockchain:
 Contract_address - KT1TZjQAC2AK2CJQPGPEhQCmaXhWP84S9oss
 
 Contract deployed link from better-call.dev - https://better-call.dev/ghostnet/KT1TZjQAC2AK2CJQPGPEhQCmaXhWP84S9oss

 We have deployed our smartcontract in Tezos Ghostnet blockchain Network through smartpyIDE (https://ghostnet.smartpy.io/)

## Table of Contents

- [Project Overview](#project-overview)
- [Key Objectives](#key-objectives)
- [Features](#features)
- [Architecture](#architecture)
  - [Smart Contract: `smrtcntrct.py`](#smart-contract-smrtcntrctpy)
  - [Frontend: Next.js](#frontend-nextjs)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Smart Contract Overview](#smart-contract-overview)
  - [Entry Points](#entry-points)
  - [How It Works](#how-it-works)
- [License](#license)

---

## Project Overview

The **Assured Contract Farming Platform** aims to bring transparency, fairness, and trust to agricultural transactions through the use of blockchain technology. By leveraging smart contracts on the Tezos blockchain, the platform ensures that both farmers and buyers are protected during transactions. The system automates payment processing, delivery confirmations, and contract enforcement, eliminating the need for intermediaries.

## Key Objectives

- **Transparency**: Build trust in agricultural transactions by recording them on an immutable blockchain ledger.
- **Security**: Ensure that payments are only made when goods are confirmed as delivered.
- **Automation**: Automate the payment and delivery processes using smart contracts.
- **Decentralization**: Remove intermediaries, giving farmers more control over their products and pricing.

## Features

- **Contract-based Farming**: Buyers can purchase goods under predefined contracts that ensure transparency and fairness.
- **Product Catalog**: Farmers can list a variety of agricultural products (such as rice, wheat, onions, etc.) with prices defined in the smart contract.
- **Automated Payment Processing**: Payments are securely processed via the Tezos blockchain, ensuring trust between farmers and buyers.
- **Delivery Confirmation**: Payments are only released once the buyer confirms receipt of goods.
- **Decentralized System**: Operates entirely on the blockchain, with no need for central authorities or intermediaries.

## Architecture

The platform is built on a combination of smart contract technology and a user-friendly Next.js frontend.

### Smart Contract: `smrtcntrct.py`

The core of the platform is a SmartPy smart contract that handles the transaction logic between the farmer and the buyer. The contract is designed to ensure transparency, security, and automation in every step of the buying process.

### Frontend: Next.js

The frontend is built using **Next.js**, providing a modern and responsive interface for users to interact with the blockchain. The interface allows users to browse products, select items for purchase, and confirm deliveries, all while interacting with the Tezos blockchain.

## Technology Stack

- **Blockchain**: [Tezos](https://tezos.com/)
- **Smart Contracts**: [SmartPy](https://smartpy.io/)
- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [Next.js](https://nextjs.org/)
- **Wallet Integration**: Tezos wallet for handling transactions

---

## Getting Started

### Prerequisites

Ensure you have the following tools installed:

- [Node.js](https://nodejs.org/): To run the Next.js application.
- [SmartPy CLI](https://smartpy.io/): For compiling and testing smart contracts.
- [Tezos Wallet](https://templewallet.com/): For managing Tezos accounts and interacting with the blockchain.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/https://github.com/Navin-Lakshman-S/D-Brains.git/tezos-farming-platform.git
   cd tezos-farming-platform


## Install Dependencies

To get the Next.js application running, first, install the necessary dependencies:

```bash
npm install
```
Install SmartPy
Download and install SmartPy to compile and test the smart contracts. SmartPy is required for running the Tezos smart contracts in this project.

Running the Project
1. Start the Next.js Development Server
To start the development server, run the following command:
```bash
npm run dev
```
This will start the development server on your local machine. You can access the project by navigating to http://localhost:3000 in your browser.

3. Deploy the Smart Contract
Compile and deploy the smrtcntrct.py contract to the Tezos testnet or mainnet using the SmartPy CLI or IDE.

## Smart Contract Overview

The **Assured Contract** smart contract ensures that payments between farmers and buyers are securely processed. The contract automatically verifies the delivery of goods before transferring funds, ensuring trust and transparency in transactions.

### Entry Points:

1. **`buy(byls)`**: Allows buyers to purchase agricultural goods by selecting items from the product list.
2. **`sendm(price, byls)`**: Manages the transfer of payment to the farmer once delivery is confirmed.
3. **`deliver(pr)`**: Handles the delivery process and triggers payment upon successful receipt of goods.
4. **`confrim_payment()`**: Confirms that the payment has been made before goods are dispatched.

## How It Works

1. **Buy**: The buyer selects goods from the available list and invokes the `buy` entry point.
2. **Delivery Confirmation**: Once the goods are delivered, the `deliver` entry point is triggered, verifying the total price.
3. **Payment Transfer**: The contract automatically transfers the agreed-upon payment to the farmer's address after confirmation of delivery.


How It Works
Buy: The buyer selects goods from the available list and invokes the buy entry point.
Delivery Confirmation: Once the goods are delivered, the deliver entry point is triggered, verifying the total price.
Payment Transfer: The contract automatically transfers the agreed-upon payment to the farmer's address after confirmation of delivery.

## License

This project is licensed under the MIT License.
