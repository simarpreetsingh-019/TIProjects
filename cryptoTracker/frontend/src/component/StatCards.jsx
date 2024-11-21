import React from "react";
import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";

function StatCards() {
  return (
    <div className="max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
          <div className="flex shrink-0 max-w-full h-[134px] w-[350px]" />
        </div>
        <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
          <div className="flex relative flex-col items-start py-6 pr-16 pl-6 text-xs aspect-[2.829] text-zinc-500 max-md:px-5">
            <img
              loading="lazy"
              src={image1}
              className="object-cover absolute inset-0 size-full"
              alt=""
            />
            <div className="relative">Suspicious Transaction</div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
          <div className="flex relative flex-col items-start py-5 pr-16 pl-7 aspect-[2.966] max-md:px-5">
            <img
              loading="lazy"
              src={image2}
              className="object-cover absolute inset-0 size-full"
              alt=""
            />
            <div className="flex relative shrink-0 h-3.5 border-solid border-[5px] border-zinc-900 w-[85px]" />
            <div className="flex relative shrink-0 mt-12 border-solid border-[5px] border-zinc-900 h-[17px] w-[49px] max-md:mt-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCards;
