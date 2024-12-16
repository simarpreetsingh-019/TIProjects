"use client";
import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import card1 from "@images/card1.png";
// import card2 from "../../public/images/card2.png";
// import card3 from "../../public/images/card3.png";
import Image from "next/image";

let interval: any;

type Card = {
    id: number;
    name: string;
    designation: string;
    content: React.ReactNode;
    img: any;
};

const CardStack = ({
    items,
    offset,
    scaleFactor,
}: {
    items: Card[];
    offset?: number;
    scaleFactor?: number;
}) => {
    const CARD_OFFSET = offset || 30;
    const SCALE_FACTOR = scaleFactor || 0.06;
    const [cards, setCards] = useState<Card[]>(items);

    useEffect(() => {
        startFlipping();

        return () => clearInterval(interval);
    }, []);
    const startFlipping = () => {
        interval = setInterval(() => {
            setCards((prevCards: Card[]) => {
                const newArray = [...prevCards]; // create a copy of the array
                newArray.unshift(newArray.pop()!); // move the last element to the front
                return newArray;
            });
        }, 3000);
    };

    return (
        <div className="relative h-[25rem] w-[25rem]">
            {cards.map((card, index) => {
                return (
                    <motion.div
                        key={card.id}
                        className="absolute  bg-white h-full w-full rounded-3xl p-4 shadow-xl shadow-black/[0.1]  flex flex-col justify-between text-white"
                        style={{
                            transformOrigin: "top center",
                        }}
                        animate={{
                            right: index * -CARD_OFFSET,
                            top: index * -CARD_OFFSET,
                            scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
                            zIndex: cards.length - index, //  decrease z-index for the cards that are behind
                        }}
                    >
                        <div className="absolute top-0 left-0 h-full w-full z-[-10]">
                            <Image
                                src={card.img}
                                alt="card"
                                className="h-full w-full object-fill"
                            ></Image>
                        </div>

                        <div></div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default CardStack;
