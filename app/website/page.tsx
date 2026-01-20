import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import FunFacts from "./components/FunFacts";
import Footer from "./components/Footer";
import websiteData from "../shared-components/WebsiteText.json";

export default function WebsitePage() {
  return (
    <div className="monaco-font bg-stone-50 text-stone-800 min-h-screen divide-y divide-stone-300">
      <Navbar data={websiteData.navigation} />
      <section id="home" className="flex flex-col w-full h-full pt-32 md:pt-36 text-center items-center md:pb-20">
        <img
          src="/home-photo.png"
          alt="Avatar"
          className="mx-auto w-48 h-48 md:w-72 md:h-72 p-2 mb-8 rounded-full bg-blue-50 border-2 border-blue-300 outline-4 outline-offset-4 md:outline-offset-8 outline-blue-600"
        />
        <h1 className="text-4xl md:text-6xl font-bold">{websiteData.landingSection.title}</h1>
        <h2 className="text-xl md:text-3xl mt-2 md:mt-6">{websiteData.landingSection.subtitle1}</h2>
        <h3 className="text-md md:text-2xl mt-1 md:mt-4 md:mb-8">{websiteData.landingSection.subtitle2}</h3>

        {/* Resume Download Button */}
        <a
          href="/AvitalPalchikResumeJan2026.pdf"
          download
          className="inline-flex items-center gap-2 outline-2 outline-offset-4 outline-blue-600 bg-blue-100 hover:bg-blue-500 text-stone-800 font-semibold px-6 py-3 rounded-lg transition-colors duration-300 mt-8 md:mt-0 md:mb-12"
        >
          <span>📥</span>
          Download Resume
        </a>

        {/* Summary Section */}
        <div className="max-w-3xl px-8 md:mx-auto mt-12 md:mt-16 space-y-6 text-left">
          {/* Part 1 & 2 */}
          <div className="space-y-4">
            <p className="text-stone-700 leading-relaxed text-sm md:text-base">
              {websiteData.landingSection.summary.part1}
            </p>
            <p className="text-stone-700 leading-relaxed text-sm md:text-base border-l-4 border-blue-600 pl-4 italic">
              {websiteData.landingSection.summary.part2}
            </p>
          </div>

          {/* Experience Section */}
          <div>
            <p className="font-semibold text-stone-800 mb-3">
              {websiteData.landingSection.summary.part3}
            </p>
            <ul className="space-y-3">
              {websiteData.landingSection.summary.experience.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-stone-700 text-sm md:text-base">
                  <span className="text-blue-600 font-bold mt-1">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="about" className="py-12">
        <About data={websiteData.aboutSection} />
      </section>

      <section id="projects" className="py-12">
        <Projects data={websiteData.projectsSection} />
      </section>

      <section id="funFacts" className="py-12">
        <FunFacts data={websiteData.funFactsSection} />
      </section>

      <section id="contact">
        <Footer data={websiteData.contactSection} />
      </section>
    </div>
  );
}