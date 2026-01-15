"use client";

import { Circle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
    const [isHovered, setIsHovered] = useState(false);
    const items = [
        { text: "Home", link: "/" },
        { text: "Projects", link: "/projects" },
        { text: "Pricing", link: "/pricing" },
        { text: "TOS", link: "/tos" },
    ];

    return (
        <div
            id="dashboard"
            className="w-1/12 h-screen bg-background dark:bg-black"
        >
            <div className="flex flex-row mt-5 h-1/5">
                <div
                    id="dashboard-space-left"
                    className="flex flex-col w-1/3 items-end"
                ></div>
                <div id="dashboard-buttons" className="flex flex-col">
                    {items.map((item) => (
                        <Link
                            className=""
                            onMouseEnter={() => {
                                setIsHovered(true);
                            }}
                            onMouseLeave={() => {
                                setIsHovered(false);
                            }}
                            href={item.link}
                            key={item.text}
                        >
                            {item.text}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
