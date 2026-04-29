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
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="techstack"><TechStack /></section>
        <section id="skills"><Skills /></section>
        <section id="qualification"><Qualification /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </>
  );
}