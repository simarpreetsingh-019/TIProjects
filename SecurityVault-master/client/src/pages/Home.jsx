import { useWeb3Context } from "../context/useweb3Context";
import UploadImage from "../components/UploadImage";
import GetImage from "../components/GetImage";
import { useState } from "react";

const Home = () => {

    const [reload, setReload] = useState(false);
    // const {web3State} = useWeb3Context();
    // const {selectedAccount} = web3State;
    const reloadEffect = () => {
        setReload(!reload);
    }

    return (
        <div className="relative h-full w-screen flex flex-col justify-center items-center mt-8 px-4 ">
            <UploadImage reloadEffect={reloadEffect} />
            <GetImage reload={reload} />
        </div>
        );
}
export default Home;