import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Skills from "@/components/sections/Skills";
import Qualification from "@/components/sections/Qualification";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

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
