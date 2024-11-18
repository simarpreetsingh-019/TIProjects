"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import React from "react";
import Image from "next/image";
export function TypewriterEffectSmoothDemo() {
    const words = [
        {
            text: "Join",
        },
        {
            text: "GitFund",
            className: "text-blue-500 dark:text-blue-500",
        },
        {
            text: " & Start Earning",
        },
        {
            text: "Today",
        },

    ];
    return (
        <>
            <div className="dark:bg-black pb-20 flex flex-col items-center justify-center   ">
                <button className="  py-30 p-4 rounded-3xl bg-gray-100 dark:bg-[#171717]  ">
                    The road to freedom starts from here
                </button>
                <TypewriterEffectSmooth  words={words}/>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">

                    <button
                        className="relative mx-0  inline-flex h-12 w-60  overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                        <span
                            className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"/>
                        <span
                            className="inline-flex text-xl h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1  font-medium text-white backdrop-blur-3xl">
                            SignIn / SignUp
                        </span>
                    </button>
                </div>

            </div>


        </>


    );
}