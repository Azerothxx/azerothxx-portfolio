"use client";
import { useInView } from "../components/hooks/useInView";

const tosItems = [
    [
        "Payment",
        "50% upfront payment is required before work begins. The remaining 50% is due upon completion before delivery of the final product.",
    ],
    [
        "Revisions",
        "Small scaled revisions are allowed. Medium to complete rewrites are not allowed, upon start of an order it is expected that the system design is finalized.",
    ],
    [
        "Delivery",
        "Estimated delivery times will be provided after discussing project scope. Delays may occur for complex projects or during high-demand periods.",
    ],
    [
        "Refunds",
        "Refunds are available only if work has not yet begun. Once development starts, refunds are not available.",
    ],
    [
        "Ownership",
        "Upon full payment, you receive full ownership of the delivered code. I retain the right to showcase the work in my portfolio unless otherwise agreed.",
    ],
    [
        "Communication",
        "Primary communication is through Discord. Please allow 24-48 hours for responses. Urgent matters should be clearly marked.",
    ],
    [
        "Scope Changes",
        "Changes to the project scope after work has begun may affect pricing and delivery time. Significant changes will require a new quote.",
    ],
    [
        "Confidentiality",
        "I will keep all project details confidential unless given permission to share. NDAs can be signed upon request.",
    ],
];

interface TOSItemProps {
    title: string;
    content: string;
    index: number;
}

function TOSItem(props: TOSItemProps) {
    const { ref, inView } = useInView(0.2);
    const fromLeft = props.index % 2 === 0;

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${(props.index % 4) * 80}ms` }}
            className={`p-5 bg-(--foreground2)/5 border border-(--foreground2)/10 rounded-xl transition-all duration-500 ease-out
                ${inView ? "opacity-100 translate-x-0" : `opacity-0 ${fromLeft ? "-translate-x-8" : "translate-x-8"}`}`}
        >
            <h3 className="text-lg font-semibold text-(--foreground2) mb-2">
                {props.title}
            </h3>
            <p className="text-(--foreground2)/70 text-sm leading-relaxed">
                {props.content}
            </p>
        </div>
    );
}

export default function TOS() {
    return (
        <div className="home-section items-center py-20" id="tos">
            <h2 className="text-4xl font-bold text-(--foreground2) text-center mb-4">
                Terms of Service
            </h2>
            <p className="text-(--foreground2)/60 text-center mb-12 max-w-xl">
                Please review the following terms before commissioning work.
            </p>

            <div className="grid grid-cols-2 gap-4 w-4/5 max-w-4xl">
                {tosItems.map((item, index) => (
                    <TOSItem
                        key={item[0]}
                        title={item[0]}
                        content={item[1]}
                        index={index}
                    />
                ))}
            </div>

            <p className="text-(--foreground2)/40 text-sm text-center mt-12 max-w-xl">
                By commissioning work, you agree to these terms. If you have any
                questions, please contact me before placing an order.
            </p>
        </div>
    );
}
