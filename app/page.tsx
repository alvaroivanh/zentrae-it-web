import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Products } from "@/components/sections/Products";
import { TechStack } from "@/components/sections/TechStack";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Products />
        <TechStack />
        {/* Hito 3:
          <Contact />
        */}
      </main>
      <Footer />
    </>
  );
}
