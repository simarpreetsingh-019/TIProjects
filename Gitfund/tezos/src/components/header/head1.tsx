'use client'
import {SparklesCore} from "@/components/ui/sparkles";
import { useState, useEffect } from "react";




export function CoverDemo() {

    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light';
        setTheme(storedTheme);

        const handleStorageChange = () => {
            setTheme(localStorage.getItem('theme') || 'light');
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
    return (
        <div className="bg-white dark:bg-black">
            <div className={`text-center `}>
                <button className={` mt-20 p-4 rounded-3xl bg-gray-100 dark:bg-[#171717]`}>On-Chain Rewards for Dev
                    Contributions
                </button>
            </div>
            <h1 className="text-4xl w-screen h lg:text-6xl font-semibold  mx-auto text-center mt-6 relative   bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                Earn Crypto by Solving
            </h1>
            <div
                className=" flex flex-col items-center justify-center overflow-hidden rounded-md">
                <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-black dark:text-white relative z-20">
                    Github Issues
                </h1>
                <div className="w-[40rem] h-40 relative">
                    {/* Gradients */}
                    <div
                        className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm"/>
                    <div
                        className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4"/>
                    <div
                        className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm"/>
                    <div
                        className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4"/>

                    {/* Core component */}
                    <SparklesCore
                        background="transparent"
                        minSize={0.4}
                        maxSize={1}
                        particleDensity={1200}
                        className="w-full h-full"
                        particleColor={`${theme ? '#FFFFFF' : '#000000'}`}
                    />

                    {/* Radial Gradient to prevent sharp edges */}
                    <div
                        className="absolute inset-0 w-full h-full bg-white dark:bg-black  [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                </div>
            </div>

        </div>

    );
}





