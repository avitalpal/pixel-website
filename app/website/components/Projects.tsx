import React from "react";

type Project = {
  title: string;
  description: string;
  toolsUsed?: string;
  image?: string;
  link?: string;
};

type ProjectsProps = {
  title: string;
  subtitle: string;
  project1: Project;
  project2: Project;
  project3: Project;
  githubLinkText: string;
};

export default function Projects({ data }: { data: ProjectsProps }) {
  const projects = [data.project1, data.project2, data.project3];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-4 text-blue-600">{data.title}</h2>
      <p className="mb-8 text-stone-700">
        {data.subtitle}{" "}
        <a
          href="https://github.com/avitalpal"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600 group hover:text-blue-800 font-medium transition-colors"
        >
          {data.githubLinkText}
          <span className="group-hover:translate-x-1 transition-transform inline-block">
            &nbsp;→
          </span>
        </a>
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((proj, idx) => (
          <ProjectCard key={idx} project={proj} colorIndex={idx} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, colorIndex }: { project: Project; colorIndex: number }) {
  // Color palette for project cards
  const colors = [
    { accent: "text-teal-600", border: "border-teal-200", tag: "bg-teal-100 text-teal-800" },
    { accent: "text-pink-600", border: "border-pink-200", tag: "bg-pink-100 text-pink-800" },
    { accent: "text-yellow-600", border: "border-yellow-200", tag: "bg-yellow-100 text-yellow-800" },
  ];

  const colorScheme = colors[colorIndex % colors.length];

  return (
    <a
      href={project.link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-stone-50 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 bg-stone-200">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Container */}
      <div className="p-6">
        {/* Title */}
        <h3 className={`text-xl font-bold mb-3 flex items-center gap-2 ${colorScheme.accent}`}>
          {project.title}
          <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
            ↗
          </span>
        </h3>

        {/* Description */}
        <p className="text-stone-700 mb-4 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Tools Used */}
        {project.toolsUsed && (
          <div className="pt-4 border-t border-stone-300">
            <p className="text-xs font-semibold text-stone-600 mb-2 uppercase tracking-wide">
              ⚙️ Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.toolsUsed.split(",").map((tool, i) => (
                <span
                  key={i}
                  className={`text-xs px-3 py-1 rounded-full font-medium ${colorScheme.tag}`}
                >
                  {tool.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </a>
  );
}