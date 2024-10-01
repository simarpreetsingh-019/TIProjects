import React from "react";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

const SwapMain = () => {
  const account = useAccount();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent text-white px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-extrabold tracking-tight leading-none text-center mb-6 md:text-6xl lg:text-7xl">
        briXchange Swap
      </h1>
      <p className="max-w-3xl text-center mb-10 text-xl font-normal lg:text-2xl leading-relaxed">
        Swap your tokens effortlessly on the Polygon blockchain using XTZ. 
        Our platform enables secure and transparent transactions for your real estate investments.
      </p>
      <p className="max-w-3xl text-center mb-10 text-xl font-normal lg:text-2xl leading-relaxed">
        Ethereum Sepolia investors, you're covered! We leverage the{" "}
        <a
          href="https://docs.garden.finance/home/basics/"
          className="font-semibold text-indigo-400 hover:text-indigo-300"
        >
          Garden Finance SDK
        </a>{" "}
        to seamlessly swap your wBTC to BTC and vice-versa, allowing you to invest confidently in our tokenized real estate assets.
      </p>
      <p className="max-w-3xl text-center text-white mb-10 text-xl font-normal lg:text-3xl leading-relaxed">
        XTZ swaps are coming soon to further enhance your investment options and provide greater flexibility.
      </p>
      <ConnectKitButton />
      {account.isConnected && (
        <div className="pt-12">
          <a
            href="/tokenize"
            className="rounded-md bg-[#00a3ff] px-6 py-4 text-xxl font-semibold text-white shadow-sm hover:bg-[#008bdb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a2be2]"
          >
            Swap your tokens!
          </a>
        </div>
      )}
    </div>
  );
};

export default SwapMain;
