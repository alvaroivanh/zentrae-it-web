import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Products } from "@/components/sections/Products";
import { Verticals } from "@/components/sections/Verticals";
import { TechStack } from "@/components/sections/TechStack";
import { Contact } from "@/components/sections/Contact";
import { ChatWidget } from "@/components/chat/ChatWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Products />
        <Verticals />
        <TechStack />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
