"use client";
import Image from "next/image";
import React from "react";

export function AppleCardsCarouselDemo() {
    return (
        <>
            <div id="features" className="dark:bg-black flex flex-col items-center">
                <h1 className="text-4xl mt-20 mb-10 lg:text-6xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                    Key Features
                </h1>
                <div className="flex flex-col lg:flex-row lg:flex-wrap justify-center items-center gap-6 px-4">
                    {data.map((item, index) => (
                        <div key={index} className="bg-white dark:bg-[#171717] text-slate-800 dark:text-white flex flex-col my-6 shadow-sm border border-slate-200 dark:border-neutral-800 rounded-lg w-full sm:w-80">
                            <div className="p-4">
                                <h6 className="mb-2 text-xl font-semibold">
                                    {item.category}
                                </h6>
                                <p className="text-slate-600 dark:text-slate-300 leading-normal font-light">
                                    {item.title}
                                </p>
                            </div>
                            <div className="relative h-56 m-2.5 overflow-hidden rounded-md">
                                <img src={item.src} alt={item.category} className="w-full h-full object-cover"/>
                            </div>
                        </div>
                    ))}
                </div>
                <h1 id="how" className="text-4xl mt-20 mb-10 lg:text-6xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                    How It Works
                </h1>
                <div className="pb-40 grid mx-auto gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl">
                    {[
                        { number: 1, title: "Browse Bounties", description: "Explore available bounties from various open-source projects." },
                        { number: 2, title: "Claim & Solve", description: "Claim a bounty and submit link to your pull request." },
                        { number: 3, title: "Get Rewarded", description: "Once accepted, unlock the reward and receive crypto payment." }
                    ].map((item, index) => (
                        <div key={index} className="flex flex-col h-full dark:bg-[#171717] dark:border-0 rounded-lg border text-card-foreground shadow-sm border-gray-200 bg-white">
                            <div className="flex flex-col space-y-1.5 p-6 flex-grow">
                                <div className="inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 mb-4 h-8 w-8 bg-gray-200 text-lg text-gray-700">
                                    {item.number}
                                </div>
                                <h3 className="text-2xl dark:text-white font-semibold leading-none tracking-tight text-gray-900">
                                    {item.title}
                                </h3>
                            </div>
                            <div className="p-6 pt-0 mt-auto">
                                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

const data = [
    {
        category: "Github Integration",
        title: "Seamlessly connect with GitHub repositories and issues.",
        src: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    },
    {
        category: "Tezos Rewards",
        title: "Earn crypto for your contributions to open-source projects.",
        src: "/tezos.jpg",
    },
    {
        category: "Streamlined Process",
        title: "Easy-to-use platform for creating, finding, claiming, and submitting bounties.",
        src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    },


];
