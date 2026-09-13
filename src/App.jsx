import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Services from "./components/Services.jsx";
import Work from "./components/Work.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import SocialBar from "./components/SocialBar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Chatbot from "./components/Chatbot.jsx";
import "./styles/overlays.css";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Services />
        <Work />
        <Contact />
      </main>
      <Footer />
      {/* Fixed chrome, outside <main> so it is not part of the document flow. */}
      <SocialBar />
      <ScrollToTop />
      <Chatbot />
    </>
  );
}
