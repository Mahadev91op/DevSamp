import Hero from "@/sections/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      {/* Hero Section sabse upar */}
      <Hero />
      
      {/* Baaki sections future mein yahan aayenge */}
      {/* <Services /> */}
      {/* <Portfolio /> */}
    </main>
  );
}