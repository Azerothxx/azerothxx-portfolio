import Pricing from "./pricing";
import Projects from "./projects";
import Title from "./title";
import TOS from "./tos";

export default function Page() {
    return (
        <div className="h-screen">
            <Title />
            <Projects />
            <Pricing />
            <TOS />
        </div>
    );
}
