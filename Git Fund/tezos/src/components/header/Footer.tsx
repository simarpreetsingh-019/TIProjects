import Image from "next/image";
import React from "react";

export default function Footer() {
    return(
        <>
            <div className=" w-screen dark:bg-black ">


                <footer
                    className=" p-4 flex items-center justify-between bg-gray-200 dark:bg-[#1f1f1f] rounded-lg">
                    <div className="mx-20 flex items-center">
                        <Image src={"/image(1).webp"} alt={"Logo"} width={200} height={50}/>
                    </div>
                    <nav>
                        <ul className="flex mx-20 space-x-4">
                            <li>
                                <a href="https://github.com/your-github-username" target="_blank"
                                   rel="noopener noreferrer"
                                   className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank"
                                   rel="noopener noreferrer"
                                   className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </nav>
                </footer>
            </div>
        </>
    )
}