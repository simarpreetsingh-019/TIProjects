import ConnectedAccount from "./ConnectedAccount";

const Navbar = () => {
    return (  
        <div className=" w-full h-[80px] bg-sky-300 flex justify-center items-center border-b-2 border-gray-700">
            <ConnectedAccount />
        </div> 
    );
};

export default Navbar;