import { IconFilter } from "@tabler/icons-react";
export default function page() {
    const marketIteams = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    return (
        <div className="h-screen w-screen overflow-auto">
            <div className="h-[10%]"></div>
            <div className="h-[90%] w-screen flex flex-col items-center">
                <div className="h-[7%] w-[83%] mt-2 flex items-center justify-between">
                    <div className="h-full w-[40%] flex items-center justify-around font-dmsans">
                        <button className="h-[75%] pl-10 pr-10 rounded-3xl hover:border-2 bg-[#3D00B7] text-white hover:text-[#3D00B7] hover:bg-white hover:border-[#3D00B7]">
                            All Categories
                        </button>
                        <button className="h-[75%] pl-10 pr-10 rounded-3xl border-2 hover:bg-[#3D00B7] hover:text-white">
                            Datasets
                        </button>
                        <button className="h-[75%] pl-10 pr-10 rounded-3xl border-2 hover:bg-[#3D00B7] hover:text-white">
                            StockMarket
                        </button>
                    </div>
                    <div className="h-full w-[20%] flex items-center">
                        <button className="h-[75%] pl-10 pr-10 rounded-3xl border-2 hover:bg-[#3D00B7] hover:text-white flex items-center justify-evenly">
                            All Filters
                            <IconFilter className="ml-2 " />
                        </button>
                    </div>
                </div>
                <div className="w-[83%] h-[93%] grid grid-cols-4 justify-between overflow-y-auto">
                    {marketIteams.map((item, index) => (
                        <div key={index} className="w-full h-64 border"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
