import Image from "next/image";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/LandingPage/Landing";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white items-center p-2">
      <Navbar />
      <Landing />
    </main>
  );
}
