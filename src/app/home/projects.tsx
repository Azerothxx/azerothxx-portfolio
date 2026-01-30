"use client";
import { useEffect, useState } from "react";
import { useInView } from "@react-spring/core";

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

function VideoSectionBackground({
    inView,
    fromLeft,
}: {
    inView: boolean;
    fromLeft: boolean;
}) {
    return (
        <div
            className={`absolute top-4 bottom-4 bg-(--background1) rounded-2xl -z-10
                    transition-all duration-500 ease-out
                    left-2 right-2
                    sm:left-1/2 sm:-translate-x-1/2 sm:w-[92%]
                    lg:translate-x-0 lg:w-[88%]
                    ${fromLeft ? "lg:left-0 lg:right-auto" : "lg:left-auto lg:right-0"}
                    ${inView ? "opacity-100" : `opacity-0`}`}
        />
    );
}

function VideoSection(props: VideoSectionProps) {
    const [ref, inView] = useInView({ amount: 0.2 });
    const [slideComplete, setSlideComplete] = useState(false);

    useEffect(() => {
        if (inView) {
            const timer = setTimeout(() => setSlideComplete(true), 500);
            return () => clearTimeout(timer);
        }
    }, [inView]);

    return (
        <div
            ref={ref}
            className="relative py-6 sm:py-10 lg:py-16 overflow-hidden w-full max-w-full"
        >
            <VideoSectionBackground inView={inView} fromLeft={props.fromLeft} />

            <div
                className={`flex flex-col transition-all duration-500 ease-out
                    px-4 items-center w-full
                    sm:w-[92%] sm:px-8 sm:mx-auto sm:items-center
                    lg:w-[88%] lg:px-20 lg:mx-0
                    ${props.fromLeft ? "lg:ml-0 lg:mr-auto lg:items-start" : "lg:ml-auto lg:mr-0 lg:items-end"}
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
                    className={`text-2xl sm:text-3xl font-extrabold text-(--foreground) mb-3 sm:mb-4 w-full text-center
                        ${props.fromLeft ? "lg:text-left" : "lg:text-right"}`}
                >
                    {props.title}
                </h3>

                {/* Tech Stack - shown on tablet and desktop, below title */}
                <div className="hidden sm:block lg:hidden w-full mb-4">
                    <ul className="flex flex-wrap gap-2 justify-center">
                        {props.techStack.map((tech, i) => (
                            <li
                                key={tech}
                                style={{
                                    transitionDelay: `${i * 75}ms`,
                                }}
                                className={`px-2 py-1 bg-(--foreground2)/10 border border-(--foreground2)/20 rounded-lg text-(--foreground2)/90 text-xs
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

                <div
                    className={`flex flex-col lg:flex-row gap-4 sm:gap-5 lg:gap-8 w-full
                        sm:max-w-4xl lg:max-w-5xl
                        ${props.fromLeft ? "" : "lg:flex-row-reverse"}`}
                >
                    <div className="flex-1 rounded-xl overflow-hidden bg-(--background)/30 min-w-0 max-w-full">
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
                            <div className="w-full aspect-video flex items-center justify-center bg-(--foreground1)/5 text-(--foreground1)/40">
                                Video coming soon
                            </div>
                        )}
                    </div>

                    <div
                        className={`flex-1 flex-col gap-3 sm:gap-4 hidden lg:flex min-w-0 max-w-full overflow-hidden ${
                            props.fromLeft ? "text-left" : "text-right"
                        }`}
                    >
                        <p className="text-(--foreground2)/80 text-sm lg:text-base leading-relaxed wrap-break-word overflow-wrap-anywhere">
                            {props.description}
                        </p>

                        <div>
                            <h4 className="text-(--foreground2)/60 text-xs uppercase tracking-wider mb-2">
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
                                        className={`px-2.5 py-1 bg-(--foreground2)/10 border border-(--foreground2)/20 rounded-lg text-(--foreground2)/90 text-xs
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
            <h2 className="text-4xl font-bold text-(--foreground2) rounded-2xl text-center mb-8">
                Projects
            </h2>

            <p className="text-(--foreground2)/60 text-center mb-6 max-w-xl">
                Projects made across my years of development. (5+ years of
                development.)
            </p>

            <div className="flex flex-col gap-6 sm:gap-8 w-full sm:w-[98%] lg:w-[80%]">
                {projectVideos.map((project, index) => (
                    <VideoSection
                        key={project.title}
                        title={project.title}
                        videoSrc={project.videoSrc}
                        description={project.description}
                        techStack={project.techStack}
                        fromLeft={index % 2 === 0}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}
