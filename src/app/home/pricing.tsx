"use client";
import { useSpring, animated } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const pricingPlans = [
    {
        name: "Basic",
        price: "$50",
        description: "Simple scripts and small features",
        features: [
            "Basic Luau scripting",
            "Simple UI elements",
            "Bug fixes",
            "1 revision",
        ],
    },
    {
        name: "Standard",
        price: "$150",
        description: "Full systems and medium-sized projects",
        features: [
            "Complex game systems",
            "Custom UI/UX",
            "Data persistence",
            "3 revisions",
            "Source code included",
        ],
        highlighted: true,
    },
    {
        name: "Premium",
        price: "$300+",
        description: "Large-scale projects and full games",
        features: [
            "Full game development",
            "Advanced systems (Combat, AI, etc.)",
            "Optimization & performance",
            "Unlimited revisions",
            "Ongoing support",
            "Priority communication",
        ],
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

interface PricingCardProps {
    name: string;
    price: string;
    description: string;
    features: string[];
    highlighted?: boolean;
    delay: number;
}

function PricingCard({
    name,
    price,
    description,
    features,
    highlighted,
    delay,
}: PricingCardProps) {
    const { ref, inView } = useInView(0.2);

    const spring = useSpring({
        from: { y: 50, opacity: 0 },
        to: { y: inView ? 0 : 50, opacity: inView ? 1 : 0 },
        delay: inView ? delay : 0,
        config: { tension: 100, friction: 20 },
    });

    return (
        <animated.div
            ref={ref}
            style={{
                transform: spring.y.to((y) => `translateY(${y}px)`),
                opacity: spring.opacity,
            }}
            className={`flex flex-col p-6 rounded-2xl border ${
                highlighted
                    ? "bg-white/10 border-white/30 scale-105"
                    : "bg-white/5 border-white/10"
            }`}
        >
            {highlighted && (
                <span className="text-xs uppercase tracking-wider text-white/60 mb-2">
                    Most Popular
                </span>
            )}
            <h3 className="text-2xl font-bold text-white">{name}</h3>
            <div className="mt-4">
                <span className="text-4xl font-bold text-white">{price}</span>
            </div>
            <p className="mt-2 text-white/60 text-sm">{description}</p>

            <ul className="mt-6 flex flex-col gap-3 flex-1">
                {features.map((feature) => (
                    <li
                        key={feature}
                        className="flex items-center gap-2 text-white/80 text-sm"
                    >
                        <Check size={16} className="text-green-400 shrink-0" />
                        {feature}
                    </li>
                ))}
            </ul>

            <a
                href="https://discordapp.com/users/592596673692434453"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 py-3 px-6 rounded-lg text-center font-medium transition-all duration-200 ${
                    highlighted
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-white/10 text-white hover:bg-white/20"
                }`}
            >
                Contact Me
            </a>
        </animated.div>
    );
}

export default function Pricing() {
    return (
        <div className="home-section items-center py-20" id="pricing">
            <h2 className="text-4xl font-bold text-white text-center mb-4">
                Pricing
            </h2>
            <p className="text-white/60 text-center mb-12 max-w-xl">
                Flexible pricing for projects of all sizes. Contact me for a
                custom quote.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-4/5 max-w-5xl">
                {pricingPlans.map((plan, index) => (
                    <PricingCard
                        key={plan.name}
                        name={plan.name}
                        price={plan.price}
                        description={plan.description}
                        features={plan.features}
                        highlighted={plan.highlighted}
                        delay={index * 100}
                    />
                ))}
            </div>
        </div>
    );
}
