"use client";
import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

interface VideoSectionProps {
    title: string;
    videoSrc?: string;
    description: string;
    techStack: string[];
    fromLeft: boolean;
    index: number;
}

const projectVideos: {
    title: string;
    videoSrc?: string; // Optional - will show placeholder if not provided
    description: string;
    techStack: string[];
}[] = [
    {
        title: "Extensive Gun System",
        videoSrc: "videos/gun-system.mp4",
        description:
            "Compability between R6 and R15 that allows for full customization for each individual gun. " +
            "Also comes with a simple movement system of rolling left and right.",
        techStack: ["Knit", "FastCast", "Trove", "Signal"],
    },
    {
        title: "Snowy Mountain Ambience",
        videoSrc: "videos/ambience-system.mp4",
        description:
            "Ambience system with complete zone detection that smoothly transitions effects of adjacent zones.",
        techStack: ["Knit", "Trove", "Signal"],
    },
    // Add more:
    // {
    //     title: "New Project",
    //     videoSrc: "/videos/project.mp4", // Add when ready
    //     description: "Description here",
    //     techStack: ["Tech1", "Tech2"],
    // },
];

function VideoSection(props: VideoSectionProps) {
    const { ref, inView } = useInView(0.2);
    const [slideComplete, setSlideComplete] = useState(false);

    useEffect(() => {
        if (inView) {
            const timer = setTimeout(() => setSlideComplete(true), 500);
            return () => clearTimeout(timer);
        }
    }, [inView]);

    return (
        <div ref={ref} className="relative py-16 overflow-hidden">
            {/* Background panel */}
            <div
                className={`absolute top-4 bottom-4 w-[90%] bg-white/5 rounded-2xl -z-10
                    transition-all duration-500 ease-out
                    ${props.fromLeft ? "left-0 -ml-20" : "right-0 -mr-20"}
                    ${
                        inView
                            ? "opacity-100 translate-x-0"
                            : `opacity-0 ${
                                  props.fromLeft
                                      ? "-translate-x-1/2"
                                      : "translate-x-1/2"
                              }`
                    }`}
            />

            {/* Content */}
            <div
                className={`flex flex-col px-8 transition-all duration-500 ease-out
                    ${props.fromLeft ? "items-start" : "items-end"}
                    ${
                        inView
                            ? "opacity-100 translate-x-0"
                            : `opacity-0 ${
                                  props.fromLeft
                                      ? "-translate-x-24"
                                      : "translate-x-24"
                              }`
                    }`}
            >
                <h3
                    className={`text-3xl font-bold text-white mb-6 ${
                        props.fromLeft ? "text-left" : "text-right"
                    }`}
                >
                    {props.title}
                </h3>

                <div
                    className={`flex flex-row gap-8 w-full max-w-5xl ${
                        props.fromLeft ? "" : "flex-row-reverse"
                    }`}
                >
                    <div className="flex-1 rounded-xl overflow-hidden bg-black/30">
                        {props.videoSrc ? (
                            <video
                                src={props.videoSrc}
                                className="w-full aspect-video object-cover"
                                controls
                                playsInline
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
                            props.fromLeft ? "text-left" : "text-right"
                        }`}
                    >
                        <p className="text-white/80 text-lg leading-relaxed">
                            {props.description}
                        </p>

                        <div>
                            <h4 className="text-white/60 text-sm uppercase tracking-wider mb-3">
                                Tech Stack
                            </h4>
                            <ul
                                className={`flex flex-wrap gap-2 ${
                                    props.fromLeft
                                        ? "justify-start"
                                        : "justify-end"
                                }`}
                            >
                                {props.techStack.map((tech, i) => (
                                    <li
                                        key={tech}
                                        style={{
                                            transitionDelay: `${i * 75}ms`,
                                        }}
                                        className={`px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white/90 text-sm
                                            transition-all duration-300 ease-out
                                            ${
                                                slideComplete
                                                    ? "opacity-100 translate-y-0"
                                                    : "opacity-0 translate-y-5"
                                            }`}
                                    >
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
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
