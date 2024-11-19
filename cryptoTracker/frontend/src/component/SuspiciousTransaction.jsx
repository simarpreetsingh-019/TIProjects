// import React from 'react';

const walletAddresses = ['4sAF6Bo...', 'LcH3Kgb...', 'MNp1Tcs...'];

function SuspiciousTransactions({ risk }) {
  return (
    <div className="flex flex-col mt-6 w-full  leading-snug text-white">
      <div className="flex flex-col bg-neutral-700 rounded pt-2.5 pr-9 pb-6 pl-4 w-full max-md:pr-5">
        <h3 className="self-start">Suspicious Transactions</h3>
        {walletAddresses.map((address, index) => (
          <div key={index} className={`mt-${index === 0 ? '6' : '3.5'} ${index === 0 ? 'border border-solid border-neutral-800 border-opacity-0 text-stone-400' : 'text-zinc-300'}`}>
            • wallet address : {address}
          </div>
        ))}
        <div className="self-start mt-6">Risk : {risk}%</div>
      </div>
    </div>
  );
}

export default SuspiciousTransactions;