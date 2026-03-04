import React from "react";
import "./Projects.css";

const PROJECTS = [
  {
    title: "Project One",
    description:
      "A full-stack web application built with React and Node.js. Features user authentication, real-time updates, and a fully responsive UI.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    github: "https://github.com/Soodkr3",
    live: "#",
  },
  {
    title: "Project Two",
    description:
      "A command-line tool that automates repetitive development tasks. Written in Python with an intuitive interface and cross-platform support.",
    tech: ["Python", "Click", "Docker"],
    github: "https://github.com/Soodkr3",
    live: null,
  },
  {
    title: "Project Three",
    description:
      "An interactive data visualization dashboard that displays complex datasets using dynamic charts and filtering capabilities.",
    tech: ["React", "D3.js", "REST API", "TypeScript"],
    github: "https://github.com/Soodkr3",
    live: "#",
  },
];

const FolderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="42"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

function Projects() {
  return (
    <section id="projects" className="section section--dark">
      <div className="section__inner">
        <h2 className="section__title">Projects</h2>
        <div className="projects__grid">
          {PROJECTS.map((project) => (
            <article key={project.title} className="project-card glass-card">
              <div className="project-card__top">
                <div className="project-card__folder">
                  <FolderIcon />
                </div>
                <div className="project-card__links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.title} GitHub repository`}
                  >
                    <GitHubIcon />
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} live site`}
                    >
                      <ExternalLinkIcon />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__desc">{project.description}</p>

              <ul className="project-card__tech" aria-label="Technologies used">
                {project.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
