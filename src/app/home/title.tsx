"use client";
import { Canvas } from "@react-three/fiber";
import { Fish } from "../components/3d/fish";
import { Text, Environment, Html } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { animated as animatedWeb } from "@react-spring/web";
import { useState, useRef, useEffect, useMemo } from "react";
import { Group, Mesh, Plane, Vector3, Material, Object3D } from "three";
import { HardHat } from "lucide-react";
import {
    SiDiscord,
    SiGithub,
    SiPaypal,
    SiRoblox,
    SiWise,
} from "@icons-pack/react-simple-icons";
import {
    useWindowSize,
    type Breakpoint,
} from "../components/hooks/useWindowSize";

const socialLinks = [
    {
        icon: SiGithub,
        href: "https://github.com/azerothxx",
        hoverColor: "hover:text-gray-400",
    },
    {
        icon: SiRoblox,
        href: "https://roblox.com/users/2052015528",
        hoverColor: "hover:text-red-500",
    },
    {
        icon: SiDiscord,
        href: "https://discordapp.com/users/592596673692434453",
        hoverColor: "hover:text-indigo-500",
    },
    {
        icon: SiPaypal,
        href: "https://paypal.me/azerothxx",
        hoverColor: "hover:text-blue-500",
    },

    {
        icon: SiWise,
        href: "https://wise.com/pay/me/francexygeldingdingc",
        hoverColor: "hover:text-green-500",
    },
];

const toolsData = [
    [
        "Roblox Tools",
        "Roblox-TS",
        "Knit",
        "Rojo",
        "Git",
        "Luau Language Server",
    ],
    [
        "Packages",
        "Promise",
        "Zap",
        "Trove",
        "Signal",
        "ProfileService",
        "FastCast",
        "BT-Trees",
    ],
];

const getCSSColor = (variable: string) => {
    if (typeof window !== "undefined")
        return getComputedStyle(document.documentElement)
            .getPropertyValue(variable)
            .trim();

    return "#ffffff";
};

function Fish3D({ breakpoint }: { breakpoint: Breakpoint }) {
    const scaleValue =
        breakpoint === "mobile" ? 0.3 : breakpoint === "tablet" ? 0.4 : 0.5;
    const xPos = breakpoint === "mobile" ? -4 : -6;
    const yStart = breakpoint === "mobile" ? -3 : -4;
    const yEnd = breakpoint === "mobile" ? -3.5 : -4.5;

    const { position } = useSpring({
        from: { position: [xPos, yStart, 7] as [number, number, number] },
        to: { position: [xPos, yEnd, 7] as [number, number, number] },
        config: { tension: 100 },
    });

    return (
        <animated.group position={position}>
            <Fish
                position={[0, 0, 0]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={scaleValue}
            />
        </animated.group>
    );
}

function DeveloperText({
    onComplete,
    breakpoint,
}: {
    onComplete?: () => void;
    breakpoint: Breakpoint;
}) {
    const textRef = useRef<Group>(null);
    const [start, setStart] = useState(false);

    const fontSize =
        breakpoint === "mobile" ? 0.22 : breakpoint === "tablet" ? 0.28 : 0.35;
    const startX =
        breakpoint === "mobile" ? -5 : breakpoint === "tablet" ? -6 : -7;
    const endX = breakpoint === "desktop" ? 0 : 0;
    const yPos = breakpoint === "mobile" ? 1 : 1;
    const anchorX = breakpoint === "desktop" ? "left" : "center";

    const { position } = useSpring({
        position: start
            ? ([endX, yPos, 0] as [number, number, number])
            : ([startX, yPos, 0] as [number, number, number]),
        config: { duration: 800 },
        onRest: onComplete,
    });

    useEffect(() => {
        const timer = setTimeout(() => setStart(true), 200);
        return () => clearTimeout(timer);
    }, []);

    const clippingPlane = useMemo(
        () => new Plane(new Vector3(1, 0, 0), 0.8),
        [],
    );

    useEffect(() => {
        if (textRef.current) {
            textRef.current.traverse((child: Object3D) => {
                if ((child as Mesh).isMesh) {
                    const mesh = child as Mesh;
                    const materials = Array.isArray(mesh.material)
                        ? mesh.material
                        : [mesh.material];
                    materials.forEach((mat: Material) => {
                        // Only apply clipping on desktop, clear it otherwise
                        if (breakpoint === "desktop") {
                            mat.clippingPlanes = [clippingPlane];
                            mat.clipIntersection = false;
                        } else {
                            mat.clippingPlanes = null;
                        }
                    });
                }
            });
        }
    }, [clippingPlane, breakpoint]);

    return (
        <animated.group ref={textRef} position={position}>
            <Text
                fontSize={fontSize}
                color={getCSSColor("--foreground2")}
                anchorX={anchorX}
            >
                {`FULL STACK LUAU ${breakpoint === "desktop" ? "\n" : ""}DEVELOPER`}
            </Text>
        </animated.group>
    );
}

function NameText({
    start,
    breakpoint,
}: {
    start: boolean;
    breakpoint: Breakpoint;
}) {
    const fontSize =
        breakpoint === "mobile" ? 0.3 : breakpoint === "tablet" ? 0.32 : 0.4;
    const xPos =
        breakpoint === "mobile" ? 0 : breakpoint === "tablet" ? -2.2 : -2.4;
    const yStart = breakpoint === "mobile" ? -1 : -3;
    const yEnd = breakpoint === "mobile" ? -0.3 : -2;
    const iconSize =
        breakpoint === "mobile" ? 32 : breakpoint === "tablet" ? 34 : 40;
    const iconXOffset = breakpoint === "mobile" ? 0 : -0.35;
    const iconYOffset = breakpoint === "mobile" ? 0.35 : 0;
    const anchorX = breakpoint === "mobile" ? "center" : "left";

    const { position, opacity } = useSpring({
        position: start
            ? ([xPos, yEnd, 0] as [number, number, number])
            : ([xPos, yStart, 0] as [number, number, number]),
        opacity: start ? 0.5 : 0,
        config: { duration: 800 },
    });

    return (
        <animated.group position={position}>
            <animated.mesh>
                <Text
                    position={[0, 0, 0.01]}
                    fontSize={fontSize}
                    color={getCSSColor("--foreground2")}
                    anchorX={anchorX}
                >
                    <animated.meshBasicMaterial transparent opacity={opacity} />
                    Azerothxx
                </Text>
            </animated.mesh>
            <Html position={[iconXOffset, iconYOffset, 0]} center>
                <animatedWeb.div style={{ opacity }}>
                    <HardHat className="text-(--foreground2)" size={iconSize} />
                </animatedWeb.div>
            </Html>
        </animated.group>
    );
}

function CommIcons({
    start,
    breakpoint,
}: {
    start: boolean;
    breakpoint: Breakpoint;
}) {
    const xPos =
        breakpoint === "mobile" ? 0 : breakpoint === "tablet" ? 1.6 : 2.0;
    const yStart = breakpoint === "mobile" ? -2 : -3;
    const yEnd = breakpoint === "mobile" ? -1.2 : -2;
    const iconSize =
        breakpoint === "mobile" ? 28 : breakpoint === "tablet" ? 32 : 40;
    const margin =
        breakpoint === "mobile"
            ? "m-2"
            : breakpoint === "tablet"
              ? "m-2"
              : "m-3";

    const { position, opacity } = useSpring({
        position: start
            ? ([xPos, yEnd, 0] as [number, number, number])
            : ([xPos, yStart, 0] as [number, number, number]),
        opacity: start ? 0.8 : 0,
        config: { duration: 800, delay: 10000 },
    });

    return (
        <animated.group position={position}>
            <Html position={[0, 0, 0]} center>
                <animatedWeb.div
                    style={{ opacity }}
                    className="flex flex-row bg-(--background1) rounded-2xl sm:rounded-3xl p-0.5"
                >
                    {socialLinks.map(({ icon: Icon, href, hoverColor }) => (
                        <a
                            key={href}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${hoverColor} text-(--foreground) hover:scale-110 transition-all duration-200 ${margin}`}
                        >
                            <Icon size={iconSize} />
                        </a>
                    ))}
                </animatedWeb.div>
            </Html>
        </animated.group>
    );
}

function ListItems({ listItemsStart }: { listItemsStart: boolean }) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 max-w-4xl w-full px-4 sm:px-0">
            {toolsData.map((data, sectionIndex) => (
                <div
                    key={data[0]}
                    className="flex flex-col items-center flex-1"
                >
                    <h2
                        className="text-xl sm:text-2xl font-bold text-(--foreground2) mb-2 sm:mb-3"
                        style={{
                            opacity: listItemsStart ? 1 : 0,
                            transform: listItemsStart
                                ? "translateY(0px)"
                                : "translateY(20px)",
                            transition: `all 0.6s ease ${sectionIndex * 0.2}s`,
                        }}
                    >
                        {data[0]}
                    </h2>
                    <ul className="flex flex-wrap gap-2 justify-center">
                        {data.slice(1).map((item, itemIndex) => (
                            <li
                                key={item}
                                className="text-sm sm:text-base text-(--foreground2) border border-(--foreground1)/40 rounded px-2 py-1 sm:px-3 sm:py-2"
                                style={{
                                    opacity: listItemsStart ? 1 : 0,
                                    transform: listItemsStart
                                        ? "translateY(0px)"
                                        : "translateY(20px)",
                                    transition: `all 0.6s ease ${
                                        sectionIndex * 0.2 +
                                        0.3 +
                                        itemIndex * 0.1
                                    }s`,
                                }}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default function Title() {
    const [secondTextStart, setSecondTextStart] = useState(false);
    const [listItemsStart, setListItemsStart] = useState(false);
    const { breakpoint } = useWindowSize();

    const handleFirstTextComplete = () => {
        setSecondTextStart(true);
        setTimeout(() => setListItemsStart(true), 500);
    };

    const fov =
        breakpoint === "mobile" ? 85 : breakpoint === "tablet" ? 80 : 75;

    const showList = breakpoint === "desktop";

    return (
        <div className="home-section h-full items-center" id="title">
            <div
                className={`w-full ${breakpoint === "mobile" ? "h-full" : "sm:h-2/3 sm:w-5/6 lg:w-2/3"}`}
            >
                <Canvas
                    camera={{ position: [0, 0, 4], fov }}
                    gl={{ localClippingEnabled: true }}
                >
                    <Environment preset="city" />

                    {breakpoint === "desktop" && (
                        <Fish3D breakpoint={breakpoint} />
                    )}
                    <DeveloperText
                        onComplete={handleFirstTextComplete}
                        breakpoint={breakpoint}
                    />
                    <NameText start={secondTextStart} breakpoint={breakpoint} />
                    <CommIcons
                        start={secondTextStart}
                        breakpoint={breakpoint}
                    />
                </Canvas>
            </div>
            {showList && (
                <div className="h-1/3 w-full p-8 flex justify-around">
                    <ListItems listItemsStart={listItemsStart} />
                </div>
            )}
        </div>
    );
}
