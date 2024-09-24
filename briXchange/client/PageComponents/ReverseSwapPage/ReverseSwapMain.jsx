import React from "react";
import TransactionsComponent from "../Components/GardenComponents/TransactionComponent";
import Balances from "../Components/GardenComponents/Balances";
import { useGardenSetup } from "../Components/GardenComponents/store";
// import "../styles/GardenStyles.css";
import SwapComponent from "../Components/GardenComponents/SwapComponent";

const ReverseSwap = () => {
  useGardenSetup();
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center py-12 lg:px-8">
      <div className="lg:w-full sm:mx-auto sm:w-full sm:max-w-sm p-4 rounded-lg">
        <h2 className="mt-4 text-center text-2xl font-bold leading-tight tracking-tight text-white">
          Swap your wBTC to BTC via Ethereum Sepolia
        </h2>
        <hr className="my-4 border-gray-600" />
        <h2 className="text-center text-md leading-snug tracking-normal text-gray-300">
          Account Balances
        </h2>
      </div>

      <Balances />
      <div id="container">
        <SwapComponent />
        <TransactionsComponent></TransactionsComponent>
      </div>
    </div>
  );
};

export default ReverseSwap;
