import { useEffect, useState } from "react";

const WalletNav = ({ walletType, wallets, connect, disconnect }: walletInterfaceProps) => {
    const [addr, setAddr] = useState("");
    useEffect(() => {
        setAddr(wallets[walletType]);
    }, [wallets, walletType]);
    return (
        <>
            <button
                className="connect-button"
                onClick={async () => {
                    setAddr((await connect(walletType)) || "");
                }}
            >
                {addr || `CONNECT WALLET`}
            </button>
            <br />
            {addr ? (
                <button
                    className="disconnect-button"
                    onClick={async () => {
                        setAddr((await disconnect(walletType)) || "");
                    }}
                >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
            ) : (
                <></>
            )}
        </>
    );
};

export default WalletNav;
