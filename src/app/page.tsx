import Home from "./pages/home";
import Dashboard from "./components/dashboard";
import Projects from "./pages/projects";

export default function Page() {
    return (
        <div className="flex min-h-screen items-center bg-zinc-50 font-sans dark:bg-black">
            <Dashboard />
            <main className="flex flex-col justify-center w-full px-50">
                <Home />
                <Projects />
            </main>
        </div>
    );
}
