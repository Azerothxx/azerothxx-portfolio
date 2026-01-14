import Image from "next/image";
import Home from "./pages/home";
import Dashboard from "./components/dashboard";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center bg-zinc-50 font-sans dark:bg-black">
      <Dashboard />
      <main className="flex justify-center w-full">
        <Home />
      </main>
    </div>
  );
}
