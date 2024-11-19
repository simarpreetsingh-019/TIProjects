// import React from 'react';

function StatCards() {
  return (
    <div className="max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
          <div className="flex shrink-0 max-w-full h-[134px] w-[350px]" />
        </div>
        <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
          <div className="flex relative flex-col items-start py-6 pr-16 pl-6 text-xs aspect-[2.829] text-zinc-500 max-md:px-5">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7f3b1296272db04a1073265217be93f29f82403c8d93c0ba5ff7fe38c134c63a?placeholderIfAbsent=true&apiKey=9825bd02a58246fc9d930bec7baef96a" className="object-cover absolute inset-0 size-full" alt="" />
            <div className="relative">Suspicious Transaction</div>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8574ec486518be3bf04b3a0f9a93e4dc320cb4a670f754d121821aeb6dd8ce9f?placeholderIfAbsent=true&apiKey=9825bd02a58246fc9d930bec7baef96a" className="object-contain mt-12 aspect-[2.39] w-[43px] max-md:mt-10" alt="" />
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
          <div className="flex relative flex-col items-start py-5 pr-16 pl-7 aspect-[2.966] max-md:px-5">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a7a3a6c06353e5c1b31e452d731a47c7e1896d2d9e66c5c4fa4212361816f81?placeholderIfAbsent=true&apiKey=9825bd02a58246fc9d930bec7baef96a" className="object-cover absolute inset-0 size-full" alt="" />
            <div className="flex relative shrink-0 h-3.5 border-solid border-[5px] border-zinc-900 w-[85px]" />
            <div className="flex relative shrink-0 mt-12 border-solid border-[5px] border-zinc-900 h-[17px] w-[49px] max-md:mt-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCards;