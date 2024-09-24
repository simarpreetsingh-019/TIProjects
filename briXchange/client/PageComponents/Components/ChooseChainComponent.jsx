import { Button, Label, Radio } from "flowbite-react";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { ConnectKitButton } from "connectkit";
import { useSwitchChain } from "wagmi";

export const CHAIN_IDS = [
    { chainID: 11155111, chainName: 'Ethereum Sepolia', currency: 'wBTC', explorer: 'https://sepolia.etherscan.io/address' },
    { chainID: 1115, chainName: 'Core DAO Testnet', currency: 'tCoRE', explorer: 'https://scan.test.btcs.network/address' },
];

export default function ChooseChainComponent() {
    const account = useAccount();
    const { chains, switchChain } = useSwitchChain();
    const [selectedChain, setSelectedChain] = useState(11155111); // Default to Sepolia

    useEffect(() => {
        // If the account is connected and its chainId is one of the available options, use that
        if (account?.chainId && CHAIN_IDS.some(chain => chain.chainID === account.chainId)) {
            setSelectedChain(account.chainId);
        }
    }, [account?.chainId]);

    const handleChainChange = (event) => {
        setSelectedChain(Number(event.target.value));
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Choose Your Chain
                </h2>
            </div>

            <fieldset className="mt-4 flex max-w-md flex-col gap-4">
                {CHAIN_IDS.map((chain, index) => (
                    <div key={chain.chainID} className="flex items-center gap-2">
                        <Radio
                            id={`chain-${index}`}
                            name="chain"
                            value={chain.chainID}
                            checked={selectedChain === chain.chainID}
                            onChange={handleChainChange}
                        />
                        <Label className="text-lg" htmlFor={`chain-${index}`}>
                            {chain.chainName}
                        </Label>
                    </div>
                ))}
            </fieldset>

            {selectedChain !== account?.chainId && (
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center justify-between">
                    <h4 className="mt-1 text-center text-md font-bold leading-9 tracking-tight text-white">
                        Change Your Chain Here
                    </h4>
                    <div className="mt-4"> {/* Add margin-top here */}
                        <Button className="bg-[#00a3ff] font-semibold" onClick={() => switchChain({ chainId: Number(selectedChain) })}>
                            Change Chain
                        </Button>
                    </div>
                    {/* <ConnectKitButton /> */}
                </div>
            )}
        </div>
    );
}
