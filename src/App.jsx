import Header from "./components/Header.jsx";
import Banner from "./components/Banner.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Portfolio from "./components/Portfolio.jsx";
import ContactInfo from "./components/ContactInfo.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Footer from "./components/Footer.jsx";
import Copyright from "./components/Copyright.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import SocialBar from "./components/SocialBar.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <About />
        <Services />
        <Portfolio />
        <ContactInfo />
        <ContactForm />
      </main>
      <Footer />
      <Copyright />
      <SocialBar />
      <ScrollToTop />
    </>
  );
}
