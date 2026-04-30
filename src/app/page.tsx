import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Qualification from "@/components/sections/Qualification";
import Skills from "@/components/sections/Skills";
import TechStack from "@/components/sections/TechStack";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Skills />
        <Qualification />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}