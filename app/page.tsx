import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/*
          Próximas secciones (Hito 2 en curso):
          <Services />
          <Process />
          <Products />
          <TechStack />
          <Contact />
        */}
      </main>
      <Footer />
    </>
  );
}
