"use client";
import { useSpring, animated, useTrail } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

const projectVideos: {
    title: string;
    videoSrc?: string; // Optional - will show placeholder if not provided
    description: string;
    techStack: string[];
}[] = [
    {
        title: "Project Title 1",
        description:
            "Description of the project. Explain what the project does, its purpose, and any notable features.",
        techStack: ["Roblox-TS", "Knit", "FastCast", "Promise"],
    },
    {
        title: "Project Title 2",
        description:
            "Another project description. This section slides in from the right side.",
        techStack: ["Luau", "ProfileService", "Zap", "BT-Trees"],
    },
    // Add more:
    // {
    //     title: "New Project",
    //     videoSrc: "/videos/project.mp4", // Add when ready
    //     description: "Description here",
    //     techStack: ["Tech1", "Tech2"],
    // },
];

function useInView(threshold = 0.3) {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            },
            { threshold },
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, inView };
}

interface VideoSectionProps {
    title: string;
    videoSrc?: string;
    description: string;
    techStack: string[];
    fromLeft: boolean;
    index: number;
}

function VideoSection({
    title,
    videoSrc,
    description,
    techStack,
    fromLeft,
}: VideoSectionProps) {
    const { ref, inView } = useInView(0.2);
    const [slideComplete, setSlideComplete] = useState(false);

    const slideSpring = useSpring({
        from: { x: fromLeft ? -100 : 100, opacity: 0 },
        to: { x: inView ? 0 : fromLeft ? -100 : 100, opacity: inView ? 1 : 0 },
        config: { tension: 80, friction: 20 },
        onRest: () => {
            if (inView) setSlideComplete(true);
        },
    });

    const techTrail = useTrail(techStack.length, {
        from: { y: 20, opacity: 0 },
        to: {
            y: slideComplete ? 0 : 20,
            opacity: slideComplete ? 1 : 0,
        },
        config: { tension: 120, friction: 14 },
    });

    return (
        <div ref={ref} className="relative py-16 overflow-hidden">
            <animated.div
                style={{
                    transform: slideSpring.x.to(
                        (x) => `translateX(${x * 0.5}%)`,
                    ),
                    opacity: slideSpring.opacity,
                }}
                className={`absolute top-4 bottom-4 w-[90%] bg-white/5 rounded-2xl -z-10 ${
                    fromLeft ? "left-0 -ml-20" : "right-0 -mr-20"
                }`}
            />

            <animated.div
                style={{
                    transform: slideSpring.x.to((x) => `translateX(${x}px)`),
                    opacity: slideSpring.opacity,
                }}
                className={`flex flex-col ${
                    fromLeft ? "items-start" : "items-end"
                } px-8 md:px-16`}
            >
                <h3
                    className={`text-3xl font-bold text-white mb-6 ${
                        fromLeft ? "text-left" : "text-right"
                    }`}
                >
                    {title}
                </h3>

                <div
                    className={`flex flex-col md:flex-row gap-8 w-full max-w-5xl ${
                        fromLeft ? "" : "md:flex-row-reverse"
                    }`}
                >
                    <div className="flex-1 rounded-xl overflow-hidden bg-black/30">
                        {videoSrc ? (
                            <video
                                src={videoSrc}
                                className="w-full aspect-video object-cover"
                                controls
                                playsInline
                                preload="metadata"
                            >
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <div className="w-full aspect-video flex items-center justify-center bg-white/5 text-white/40">
                                Video coming soon
                            </div>
                        )}
                    </div>

                    <div
                        className={`flex-1 flex flex-col gap-6 ${
                            fromLeft ? "text-left" : "text-right"
                        }`}
                    >
                        <p className="text-white/80 text-lg leading-relaxed">
                            {description}
                        </p>

                        <div>
                            <h4 className="text-white/60 text-sm uppercase tracking-wider mb-3">
                                Tech Stack
                            </h4>
                            <ul
                                className={`flex flex-wrap gap-2 ${
                                    fromLeft ? "justify-start" : "justify-end"
                                }`}
                            >
                                {techTrail.map((style, i) => (
                                    <animated.li
                                        key={techStack[i]}
                                        style={{
                                            transform: style.y.to(
                                                (y) => `translateY(${y}px)`,
                                            ),
                                            opacity: style.opacity,
                                        }}
                                        className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white/90 text-sm"
                                    >
                                        {techStack[i]}
                                    </animated.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </animated.div>
        </div>
    );
}

export default function Projects() {
    return (
        <div className="home-section items-center" id="projects">
            <h2 className="text-4xl font-bold text-white text-center mb-16">
                Projects
            </h2>

            <div className="flex flex-col gap-8 w-4/5">
                {projectVideos.map((project, index) => (
                    <VideoSection
                        key={project.title}
                        title={project.title}
                        videoSrc={project.videoSrc}
                        description={project.description}
                        techStack={project.techStack}
                        fromLeft={index % 2 === 0} // Alternates: left, right, left, right...
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}
