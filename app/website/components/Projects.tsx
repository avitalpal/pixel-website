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
      <h2 className="text-3xl font-bold mb-2">{data.title}</h2>
      <p className="mb-8">{data.subtitle}</p>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((proj, idx) => (
          <a
            key={idx}
            href={proj.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stone-100 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform block"
          >
            <img
              src={proj.image}
              alt={proj.title}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
            <p className="mb-2">{proj.description}</p>
            {proj.toolsUsed && (
              <p className="text-sm italic text-stone-600">Tools: {proj.toolsUsed}</p>
            )}
          </a>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://github.com/avitalpal"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-400 hover:text-blue-200"
        >
          {data.githubLinkText}
        </a>
      </div>
    </div>
  );
}
