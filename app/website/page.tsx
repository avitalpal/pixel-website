import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import FunFacts from "./components/FunFacts";
import Footer from "./components/Footer";
import websiteData from "../shared-components/WebsiteText.json";

export default function WebsitePage() {
  return (
    <div className="monaco-font bg-stone-200 text-stone-800 min-h-screen">
      <Navbar data={websiteData.navigation} />
      <section id="home" className="pt-32 text-center">
        <h1 className="text-4xl font-bold">{websiteData.landingSection.title}</h1>
        <h2 className="text-xl mt-2">{websiteData.landingSection.subtitle1}</h2>
        <h3 className="text-md mt-1">{websiteData.landingSection.subtitle2}</h3>
      </section>

      <section id="about" className="py-12">
        <About data={websiteData.aboutSection} />
      </section>

      <section id="projects" className="py-12 bg-stone-300">
        <Projects data={websiteData.projectsSection} />
      </section>

      <section id="funFacts" className="py-12">
        <FunFacts data={websiteData.funFactsSection} />
      </section>

      <section id="contact" className="pt-12">
        <Footer data={websiteData.contactSection} />
      </section>
    </div>
  );
}