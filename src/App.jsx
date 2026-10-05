import { useRef } from "react";
import usePortfolioMotion from "./hooks/usePortfolioMotion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import IntroGallery from "./components/IntroGallery";
import Projects from "./components/Projects";
import Craft from "./components/Craft";
import About from "./components/About";
import Archive from "./components/Archive";
import Contact from "./components/Contact";
import Loader from "./components/Loader";
import Pointer from "./components/Pointer";
import Navigation from "./components/Navigation";
export default function App() {
  const root = useRef(null);
  usePortfolioMotion(root);
  return (
    <div ref={root}>
      <a className="skip-link" href="#projects">
        Skip to projects
      </a>
      <Loader />
      <Header />
      <main>
        <Hero />
        <IntroGallery />
        <Projects />
        <Craft />
        <About />
        <Archive />
        <Contact />
      </main>
      <Pointer />
      <Navigation />
    </div>
  );
}
