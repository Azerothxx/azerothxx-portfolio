"use client";
import { useEffect, useState } from "react";

export type Breakpoint = "mobile" | "tablet" | "desktop";

export interface WindowSize {
    width: number;
    height: number;
    breakpoint: Breakpoint;
}

export function useWindowSize(): WindowSize {
    function getBreakpoint(width: number): Breakpoint {
        if (width < 640) return "mobile";
        if (width < 1024) return "tablet";
        return "desktop";
    }

    const [windowSize, setWindowSize] = useState<WindowSize>(() => {
        const width = typeof window !== "undefined" ? window.innerWidth : 1024;
        const height = typeof window !== "undefined" ? window.innerHeight : 768;
        return {
            width,
            height,
            breakpoint: getBreakpoint(width),
        };
    });

    useEffect(() => {

        function handleResize() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setWindowSize({
                width,
                height,
                breakpoint: getBreakpoint(width),
            });
        }

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}
