import { useCallback, useEffect, useState } from "react";
import { useGarden, useMetaMaskStore, useSignStore } from "./store";
import { Contract, formatUnits } from "ethers";
import { ERC20ABI } from "./erc20";
import React from "react";

const Balances: React.FC = () => {
  const { bitcoin } = useGarden();
  const { evmProvider } = useMetaMaskStore();
  const [bitcoinBalance, setBitcoinBalance] = useState("0");
  const [wbtcBalance, setWBTCBalance] = useState("0");
  const { isMMPopupOpen, isSigned, setIsSigned, setIsMMPopupOpen } =
    useSignStore();

  const fetchBalance = useCallback(async () => {
    if (!bitcoin || !evmProvider) return;
    if (isMMPopupOpen && !isSigned) return;

    let balance = 0;
    try {
      if (!isSigned) setIsMMPopupOpen(true);
      balance = await bitcoin.getBalance();
      setIsSigned(true);
      setIsMMPopupOpen(false);
      setBitcoinBalance(Number(formatUnits(balance, 8)).toFixed(6));

      const erc20 = new Contract(
        "0xaD9d14CA82d9BF97fFf745fFC7d48172A1c0969E",
        ERC20ABI,
        evmProvider
      );
      const signer = await evmProvider.getSigner();
      const address = await signer.getAddress();
      const wbtcBalance = await erc20.balanceOf(address);
      setWBTCBalance(Number(formatUnits(wbtcBalance, 8)).toFixed(6));
    } catch (err) {
      setIsSigned(false);
      setIsMMPopupOpen(false);
    }
  }, [
    bitcoin,
    evmProvider,
    isMMPopupOpen,
    isSigned,
    setIsSigned,
    setIsMMPopupOpen,
  ]);

  useEffect(() => {
    const id = setInterval(() => {
      fetchBalance();
    }, 10000);

    return () => {
      clearInterval(id);
    };
  }, [fetchBalance]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return (
    <div className="balances">
      <p>Bitcoin: {bitcoinBalance}</p>
      <p>WBTC: {wbtcBalance}</p>
    </div>
  );
};

export default Balances;
