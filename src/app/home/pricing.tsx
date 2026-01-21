"use client";
import { Check } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { SiPaypal } from "@icons-pack/react-simple-icons";

interface PricingCardProps {
    name: string;
    price: string;
    description: string;
    features: string[];
    highlighted?: boolean;
    delay: number;
}

const pricingPlans = [
    {
        name: "Basic",
        price: "$50",
        description: "Simple scripts and small features",
        features: [
            "Basic scripting",
            "Simple UI functionality",
            "Minor Bug fixes",
        ],
    },
    {
        name: "Standard",
        price: "$150",
        description: "Medium-sized projects",
        features: [
            "Complex game systems",
            "Multi-layered UI/UX functionality",
            "Extensive code debugging",
        ],
        highlighted: true,
    },
    {
        name: "Complex",
        price: "$300+",
        description: "Large-scale projects and full games",
        features: [
            "Interdependant systems",
            "Advanced systems (Combat, AI, etc.)",
            "Optimization & performance",
            "Data persistence",
        ],
    },
];

function PricingCard(props: PricingCardProps) {
    const { ref, inView } = useInView(0.2);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${props.delay}ms` }}
            className={`flex flex-col p-6 rounded-2xl border transition-all duration-500 ease-out
                ${
                    props.highlighted
                        ? "bg-white/10 border-white/30 scale-105"
                        : "bg-white/5 border-white/10"
                }
                ${
                    inView
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-12"
                }`}
        >
            {props.highlighted && (
                <span className="text-xs uppercase tracking-wider text-white/60 mb-2">
                    Most Popular
                </span>
            )}
            <h3 className="text-2xl font-bold text-white">{props.name}</h3>
            <div className="mt-4">
                <span className="text-4xl font-bold text-white">
                    {props.price}
                </span>
            </div>
            <p className="mt-2 text-white/60 text-sm">{props.description}</p>

            <ul className="mt-6 flex flex-col gap-3 flex-1">
                {props.features.map((feature) => (
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
                    props.highlighted
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-white/10 text-white hover:bg-white/20"
                }`}
            >
                Contact Me
            </a>
        </div>
    );
}

export default function Pricing() {
    return (
        <div className="home-section items-center py-20" id="pricing">
            <h2 className="text-4xl font-bold text-white text-center mb-4">
                Pricing
            </h2>
            <p className="text-white/60 text-center mb-6 max-w-xl">
                Flexible pricing for projects of all sizes. Contact me for a
                custom quote.
            </p>

            <div className="flex items-center gap-2 text-white/50 text-sm mb-12">
                <SiPaypal />
                <span>PayPal only. Fees covered by sender.</span>
            </div>

            <div className="grid grid-cols-3 gap-6 w-4/5 max-w-5xl">
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
