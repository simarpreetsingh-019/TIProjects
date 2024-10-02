import axios from 'axios';
import { useState } from 'react';
import { useWeb3Context } from "../context/useweb3Context";
import toast from "react-hot-toast";
import { ImageUp } from 'lucide-react';

const UploadImage = ({reloadEffect}) => {

    const [file, setFile] = useState(null);
    const {web3State} = useWeb3Context();
    const {selectedAccount, contractInstance} = web3State;
    const [ loading, setLoading  ] = useState(false);

    const uploadImageHash = async(ipfsHash) => {
        await toast.promise(contractInstance.uploadFile(selectedAccount,ipfsHash),{
            loading:"Transaction is pending",
            success:"Transaction is successful",
            error:"Transaction failed"
        });
    };
    const handleImageUpload = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('file', file);
            const url = `http://localhost:3000/api/uploadImage`;
            const token = localStorage.getItem("token");
            const config= {
                headers : {
                    "x-access-token ": token
                }
            }
            const res = await axios.post(url, formData, config);
            toast.success("image uploaded successfully");
            await uploadImageHash(res.data.ipfsHash);
            setLoading(false);
            reloadEffect();

        }
        catch(error) {
            console.log(error);
            toast.error("image upload faild");
        } finally {
            setLoading(false);
        
        }
    }
    return ( 
        <div className="h-full w-screen flex flex-col justify-center items-center gap-6">
        <p className="font-semibold md:text-[24px]">
        Make everything safe with 'Web3 Security' by Anurag Kaushik
        </p>
        <div className="w-full flex justify-center items-center">
        <input
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-[200px] md:w-[210px]"
        />
        </div>
        {file ? (
        <button
            onClick={handleImageUpload}
            disabled={loading}
            className="border-sky-400 border-dotted p-2 border-2 rounded-md flex flex-col justify-center items-center hover:bg-sky-200"
        >
            <ImageUp />
        {loading ? "Uploading..." : "Upload"}
    </button>
    ) : (
    <p className="text-[20px] font-semibold text-red-500">
        Choose a File To Upload
    </p>
    )}

    <br />
</div>);
}

export default UploadImage;