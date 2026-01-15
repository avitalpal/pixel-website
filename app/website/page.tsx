import About from "./components/About";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function WebsitePage() {
  return (
    <div className="pixel-font">
      <section id="about">
        <About />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <Footer />
    </div>
  );
}