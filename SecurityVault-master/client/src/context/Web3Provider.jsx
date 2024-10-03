import { useState } from "react";
import { Web3Context } from "./createweb3Context";

const Web3Provider = ({children}) => {
    const [web3State, setWeb3State] = useState({
        contractInstance:null,
        selectedAccount:null,
    });

    const updateWeb3State = (newState) => {
        setWeb3State(prevState => ({
            ...prevState,
            ...newState
        }));
    
    }
    return ( <Web3Context.Provider value={{web3State, updateWeb3State}} >
        {children}
    </Web3Context.Provider> );
}

export default Web3Provider;