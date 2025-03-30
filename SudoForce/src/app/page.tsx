"use client";
import { useState, useEffect, useCallback } from "react";
import CardStack from "../components/ui/card-stack";
import card1 from "@images/card1.png";
import card2 from "@images/card2.png";
import card3 from "@images/card3.png";

const DummyStats = [
    {
        id: 0,
        name: "Data Items",
        value: "100",
        unit: "k",
    },
    {
        id: 1,
        name: "Transactions",
        value: "100",
        unit: "k",
    },
    {
        id: 2,
        name: "Users",
        value: "100",
        unit: "k",
    },
];

const Stats = (dummyStat: any) => {
    return (
        <div className="w-1/3 h-full">
            <div className="h-[90%] w-full flex">
                <span className=" text-5xl font-integralcfBold tracking-tighter ">
                    <span className="font-bold">{dummyStat.value}</span>
                    <span className="font-medium">{dummyStat.unit}</span>
                </span>
                <div className="font-bold text-4xl h-full flex items-center">
                    +
                </div>
            </div>
            <div className="h-[10%] w-full pl-3 text-[#565656] text-xl text-left">
                {dummyStat.name}
            </div>
        </div>
    );
};

const MouseFollower: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e: MouseEvent) => {
        requestAnimationFrame(() => {
            setPosition({ x: e.clientX, y: e.clientY });
        });
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [handleMouseMove]);

    return (
        <div
            className="mouse-follower absolute rounded-[50%] h-[20rem] w-[20rem] z-[-5]"
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
            }}
        >
            <div
                className="h-full -translate-x-[50%] -translate-y-[50%] rounded-[50%] w-full border top-[50%] left-[50%] bg-gradient-to-r"
                style={{
                    background:
                        "linear-gradient(to right, aquamarine, #3D00B770)",
                    filter: "blur(100px)",
                }}
                id="blobl"
            ></div>
        </div>
    );
};

export default function Home() {
    return (
        <div className="h-screen w-screen  overflow-hidden">
            <MouseFollower />
            <div className="w-full flex h-full border-b">
                <div className="h-full w-3/5 flex items-center justify-end">
                    <div className="h-[70%] flex flex-col w-[80%] text-left items-start justify-evenly  ">
                        <span className="text-4xl  font-integralHeavy font-bold text-left tracking-tighter">
                            OWN, CONTROL AND MONETIZE
                            <br />
                            YOUR DATA
                        </span>
                        <span className="text-xl font-dmsans text-left text-[#565656] tracking-wide">
                            One stop digital marketplace for data.
                            <br />
                            Store, sell, gain insights and
                            <br />
                            train models securely.
                        </span>
                        <button
                            className="h-[10%] w-1/4 rounded-[2rem] hover:border-2 bg-[#3D00B7] text-white hover:text-[#3D00B7] hover:bg-white hover:border-[#3D00B7] font-semibold text-xl"
                            onClick={() => {
                                window.location.href = "/market";
                            }}
                        >
                            Explore now
                        </button>
                        <div className="h-[10%] w-[50%]  flex justify-around">
                            {DummyStats.map((stat) => (
                                <Stats key={stat.id} {...stat} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="h-full w-2/5 flex items-center justify-start">
                    <div className="h-[50%] w-[80%] flex items-center">
                        <CardStack items={CARDS} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const CARDS = [
    {
        id: 0,
        name: "Akshay",
        designation: "",
        content: (
            <p>
                Data Force changed the way I think about data ownership. I can
                sell my data securely or let others use it for AI training, all
                while keeping it encrypted.
            </p>
        ),
        img: card1,
    },
    {
        id: 1,
        name: "Kavin",
        designation: "",
        content: (
            <p>
                Data Force made it easy for me to monetize my data without
                compromising privacy. The integration with IPFS and smart
                contracts is seamless!
            </p>
        ),
        img: card2,
    },
    {
        id: 2,
        name: "Tyler Joseph",
        designation: "",
        content: (
            <p>
                I love the transparency and control! With Data Force, I’m in
                charge of who accesses my data and how it’s used—no middlemen
                involved.
            </p>
        ),
        img: card3,
    },
];
