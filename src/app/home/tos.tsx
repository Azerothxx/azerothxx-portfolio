"use client";
import { useSpring, animated } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

const tosItems = [
    {
        title: "Payment",
        content:
            "50% upfront payment is required before work begins. The remaining 50% is due upon completion before delivery of the final product.",
    },
    {
        title: "Revisions",
        content:
            "Revisions are included based on your selected plan. Additional revisions beyond the plan limit may incur extra charges.",
    },
    {
        title: "Delivery",
        content:
            "Estimated delivery times will be provided after discussing project scope. Delays may occur for complex projects or during high-demand periods.",
    },
    {
        title: "Refunds",
        content:
            "Refunds are available only if work has not yet begun. Once development starts, refunds are not available. Partial refunds may be considered on a case-by-case basis.",
    },
    {
        title: "Ownership",
        content:
            "Upon full payment, you receive full ownership of the delivered code. I retain the right to showcase the work in my portfolio unless otherwise agreed.",
    },
    {
        title: "Communication",
        content:
            "Primary communication is through Discord. Please allow 24-48 hours for responses. Urgent matters should be clearly marked.",
    },
    {
        title: "Scope Changes",
        content:
            "Changes to the project scope after work has begun may affect pricing and delivery time. Significant changes will require a new quote.",
    },
    {
        title: "Confidentiality",
        content:
            "I will keep all project details confidential unless given permission to share. NDAs can be signed upon request.",
    },
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
            { threshold }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, inView };
}

interface TOSItemProps {
    title: string;
    content: string;
    index: number;
}

function TOSItem({ title, content, index }: TOSItemProps) {
    const { ref, inView } = useInView(0.2);

    const spring = useSpring({
        from: { x: index % 2 === 0 ? -30 : 30, opacity: 0 },
        to: {
            x: inView ? 0 : index % 2 === 0 ? -30 : 30,
            opacity: inView ? 1 : 0,
        },
        delay: inView ? (index % 4) * 80 : 0,
        config: { tension: 120, friction: 20 },
    });

    return (
        <animated.div
            ref={ref}
            style={{
                transform: spring.x.to((x) => `translateX(${x}px)`),
                opacity: spring.opacity,
            }}
            className="p-5 bg-white/5 border border-white/10 rounded-xl"
        >
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{content}</p>
        </animated.div>
    );
}

export default function TOS() {
    return (
        <div className="home-section items-center py-20" id="tos">
            <h2 className="text-4xl font-bold text-white text-center mb-4">
                Terms of Service
            </h2>
            <p className="text-white/60 text-center mb-12 max-w-xl">
                Please review the following terms before commissioning work.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 max-w-4xl">
                {tosItems.map((item, index) => (
                    <TOSItem
                        key={item.title}
                        title={item.title}
                        content={item.content}
                        index={index}
                    />
                ))}
            </div>

            <p className="text-white/40 text-sm text-center mt-12 max-w-xl">
                By commissioning work, you agree to these terms. If you have any
                questions, please contact me before placing an order.
            </p>
        </div>
    );
}
