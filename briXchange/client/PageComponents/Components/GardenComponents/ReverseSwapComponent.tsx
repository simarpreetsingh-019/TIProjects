import { useEffect, useState } from "react";
import { useMetaMaskStore, useGarden, useSignStore } from "./store";
import { Assets } from "@gardenfi/orderbook";
import { useSwitchChain } from "wagmi";
import React from "react";
// import "../../../styles/assets/css/GardenStyles.css";

type AmountState = {
  btcAmount: string | null;
  wbtcAmount: string | null;
};

const ReverseSwapComponent: React.FC = () => {
  const [amount, setAmount] = useState<AmountState>({
    btcAmount: null,
    wbtcAmount: null,
  });

  const changeAmount = (of: "WBTC" | "BTC", value: string) => {
    if (of === "BTC") {
      handleBTCChange(value);
    }
  };

  const handleBTCChange = (value: string) => {
    const newAmount: AmountState = { btcAmount: value, wbtcAmount: null };
    if (Number(value) > 0) {
      const wbtcAmount = (Number(value) * (1 - 0.3 / 100)).toFixed(8).toString();
      newAmount.wbtcAmount = wbtcAmount;
    }
    setAmount(newAmount);
  };

  return (
    <div className="swap-component text-white border border-white rounded-lg p-4">
      <WalletConnect />
      <hr className="border-white my-4"></hr>
      <SwapAmount amount={amount} changeAmount={changeAmount} />
      <hr className="border-white my-4"></hr>
      <Swap amount={amount} changeAmount={changeAmount} />
    </div>
  );
};

const WalletConnect: React.FC = () => {
  const { connectMetaMask, metaMaskIsConnected } = useMetaMaskStore();
  const { switchChain } = useSwitchChain();

  const handleConnect = async () => {
    await switchChain({ chainId: 11155111 }); //Ethereum Sepolia testnet
    connectMetaMask();
  };

  return (
    <div className="swap-component-top-section">
      <span className="swap-title text-white">Swap</span>
      <MetaMaskButton
        isConnected={metaMaskIsConnected}
        onClick={handleConnect}
      />
    </div>
  );
};

type MetaMaskButtonProps = {
  isConnected: boolean;
  onClick: () => void;
};

const MetaMaskButton: React.FC<MetaMaskButtonProps> = ({
  isConnected,
  onClick,
}) => {
  const buttonClass = `ml-2 mr-2 mb-2 bg-[#00a3ff] text-white connect-metamask button-${isConnected ? "transparent p-2" : "transparent p-2"
    }`;
  const buttonText = isConnected ? "Connected" : "Connect to MetaMask";

  return (
    <button className={buttonClass} onClick={onClick}>
      {buttonText}
    </button>
  );
};

type TransactionAmountComponentProps = {
  amount: AmountState;
  changeAmount: (of: "WBTC" | "BTC", value: string) => void;
};

const SwapAmount: React.FC<TransactionAmountComponentProps> = ({
  amount,
  changeAmount,
}) => {
  const { btcAmount, wbtcAmount } = amount;

  return (
    <div className="swap-component-middle-section mt-2s">
      <InputField
        id="btc"
        label="Send BTC"
        value={btcAmount}
        onChange={(value) => changeAmount("BTC", value)}
      />
      <InputField id="wbtc" label="Receive WBTC" value={wbtcAmount} readOnly />
    </div>
  );
};

type InputFieldProps = {
  id: string;
  label: string;
  value: string | null;
  readOnly?: boolean;
  onChange?: (value: string) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  readOnly,
  onChange,
}) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <div className="input-component">
      <input
        id={id}
        placeholder="0"
        value={value ? value : ""}
        type="number"
        readOnly={readOnly}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="text-white bg-transparent border rounded"
      />
      <button className="text-white">{id.toUpperCase()}</button>
    </div>
  </div>
);

type SwapAndAddressComponentProps = {
  amount: AmountState;
  changeAmount: (of: "WBTC" | "BTC", value: string) => void;
};

const Swap: React.FC<SwapAndAddressComponentProps> = ({
  amount,
  changeAmount,
}) => {
  const { garden, bitcoin, ethereum } = useGarden();
  const [btcAddress, setBtcAddress] = useState<string>();
  const [ethAddress, setEthAddress] = useState<string>();
  const { metaMaskIsConnected } = useMetaMaskStore();
  const { btcAmount, wbtcAmount } = amount;

  const { isSigned } = useSignStore();

  useEffect(() => {
    if (!bitcoin) return;
    const getAddress = async () => {
      if (isSigned) {
        const address = await bitcoin.getAddress();
        setBtcAddress(address);
      }
    };
    getAddress();
  }, [bitcoin, isSigned]);

  useEffect(() => {
    if (!ethereum) return;
    const getAddress = async () => {
      if (isSigned) {
        const address = await ethereum.getAddress();
        setEthAddress(address);
      }
    };
    getAddress();
  }, [ethereum, isSigned]);

  const handleSwap = async () => {
    if (
      !garden ||
      typeof Number(btcAmount) !== "number" ||
      typeof Number(wbtcAmount) !== "number"
    )
      return;

    const sendAmount = Number(btcAmount) * 1e8;
    const receiveAmount = Number(wbtcAmount) * 1e8;

    changeAmount("BTC", "");

    await garden.swap(
      Assets.bitcoin_testnet.BTC,
      Assets.ethereum_sepolia.WBTC,
      sendAmount,
      receiveAmount
    );
  };

  return (
    <div className="swap-component-bottom-section">
      <div>
        <label htmlFor="receive-address" className="text-white">Receive address</label>
        <div className="input-component">
          <input
            id="receive-address"
            placeholder="Enter Address to receive WBTC"
            value={ethAddress ? ethAddress : ""}
            onChange={(e) => setEthAddress(e.target.value)}
            className="text-white bg-transparent border rounded"
          />
        </div>
      </div>

      <div>
        <label htmlFor="receive-address" className="text-white">Bitcoin Wallet Address</label>
        <div className="input-component">
          <input
            id="bitcoin-address"
            placeholder="Bitcoin Wallet Address"
            value={btcAddress ? btcAddress : ""}
            disabled
            // onChange={(e) => setEthAddress(e.target.value)}
            className="text-white bg-transparent border rounded"
          />
        </div>
      </div>

      <button
        className={`bg-[#00a3ff] hover:bg-[#0082cc] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#00a3ff] focus:ring-opacity-50 ${metaMaskIsConnected ? "opacity-100" : "opacity-50 cursor-not-allowed"
          }`}
        onClick={handleSwap}
        disabled={!metaMaskIsConnected}
      >
        Swap
      </button>
    </div>
  );
};

export default ReverseSwapComponent;
