"use client";
import { Canvas, useFrame } from "@react-three/fiber";
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
} from "@icons-pack/react-simple-icons";
import Projects from "./projects";

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

function AnimatedFish() {
    const { position } = useSpring({
        from: { position: [-6, -4, 7] as [number, number, number] },
        to: { position: [-6, -4.5, 7] as [number, number, number] },
        config: { tension: 100 },
    });

    return (
        <animated.group position={position}>
            <Fish
                position={[0, 0, 0]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={0.5}
            />
        </animated.group>
    );
}

function AnimatedText({ onComplete }: { onComplete?: () => void }) {
    const textRef = useRef<Group>(null);
    const [start, setStart] = useState(false);

    const springs = useSpring({
        position: start
            ? ([0, 1, 0] as [number, number, number])
            : ([-7, 1, 0] as [number, number, number]),
        config: { duration: 800 },
        onRest: onComplete,
    });

    useEffect(() => {
        const timer = setTimeout(() => setStart(true), 200);
        return () => clearTimeout(timer);
    }, []);

    const clippingPlane = useMemo(
        () => new Plane(new Vector3(1, 0, 0), 0.5),
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
                        mat.clippingPlanes = [clippingPlane];
                        mat.clipIntersection = false;
                    });
                }
            });
        }
    }, [clippingPlane]);

    return (
        <animated.group ref={textRef} position={springs.position}>
            <Text fontSize={0.35} color="#ffffff" anchorX="left">
                FULL STACK LUAU{"\n"}DEVELOPER
            </Text>
        </animated.group>
    );
}

function AnimatedSecondText({ start }: { start: boolean }) {
    const { position, opacity } = useSpring({
        position: start
            ? ([-2.8, -2, 0] as [number, number, number])
            : ([-2.8, -3, 0] as [number, number, number]),
        opacity: start ? 0.5 : 0,
        config: { duration: 800 },
    });

    return (
        <animated.group position={position}>
            <animated.mesh>
                <Text
                    position={[0, 0, 0.01]}
                    fontSize={0.4}
                    color="#ffffff"
                    anchorX="left"
                >
                    <animated.meshBasicMaterial transparent opacity={opacity} />
                    Azerothxx
                </Text>
            </animated.mesh>
            <Html position={[-0.35, 0, 0]} center>
                <animatedWeb.div style={{ opacity }}>
                    <HardHat className="text-white" size={40} />
                </animatedWeb.div>
            </Html>
        </animated.group>
    );
}

function AnimatedCommIcons({ start }: { start: boolean }) {
    const { position, opacity } = useSpring({
        position: start
            ? ([2.3, -2, 0] as [number, number, number])
            : ([2.3, -3, 0] as [number, number, number]),
        opacity: start ? 0.8 : 0,
        config: { duration: 800, delay: 10000 },
    });

    return (
        <animated.group position={position}>
            <Html position={[0, 0, 0]} center>
                <animatedWeb.div style={{ opacity }} className="flex flex-row">
                    {socialLinks.map(({ icon: Icon, href, hoverColor }) => (
                        <a
                            key={href}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${hoverColor} hover:scale-110 transition-all duration-200 m-3`}
                        >
                            <Icon size={40} />
                        </a>
                    ))}
                </animatedWeb.div>
            </Html>
        </animated.group>
    );
}

function AnimatedListItems({ listItemsStart }: { listItemsStart: boolean }) {
    return (
        <div className="flex flex-row gap-6 max-w-4xl">
            {toolsData.map((data, sectionIndex) => (
                <div
                    key={data[0]}
                    className="flex flex-col items-center flex-1"
                >
                    <h2
                        className="text-2xl font-bold text-white mb-3"
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
                                className="text-white/80 border border-white/10 rounded px-3 py-2"
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

    const handleFirstTextComplete = () => {
        setSecondTextStart(true);
        setTimeout(() => setListItemsStart(true), 500);
    };

    return (
        <div className="home-section h-full items-center" id="title">
            <div className="h-2/3 w-2/3">
                <Canvas
                    camera={{ position: [0, 0, 4], fov: 75 }}
                    gl={{ localClippingEnabled: true }}
                >
                    <Environment preset="city" />

                    <AnimatedFish />
                    <AnimatedText onComplete={handleFirstTextComplete} />
                    <AnimatedSecondText start={secondTextStart} />
                    <AnimatedCommIcons start={secondTextStart} />
                </Canvas>
            </div>
            <div className="h-1/3 w-full p-8 flex justify-around">
                <AnimatedListItems listItemsStart={listItemsStart} />
            </div>
        </div>
    );
}
