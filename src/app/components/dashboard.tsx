"use client";

import Link from "next/link";

export default function Dashboard() {
    const items = [
        { text: "Home", link: "#title" },
        { text: "Projects", link: "#projects" },
        { text: "Pricing", link: "#pricing" },
        { text: "TOS", link: "#tos" },
    ];

    return (
        <div id="dashboard" className="fixed top-0 left-0 w-1/12 z-50">
            <div className="flex flex-row mt-5 h-1/5">
                <div
                    id="dashboard-space-left"
                    className="flex flex-col w-1/3 items-end"
                ></div>
                <div id="dashboard-buttons" className="flex flex-col">
                    {items.map((item) => (
                        <Link
                            href={item.link}
                            key={item.text}
                            className="text-(--foreground2) py-2 transition-all duration-0.1s ease-out hover:text-(--foreground) hover:text-3xl hover:py-6 hover:font-bold"
                        >
                            {item.text}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
