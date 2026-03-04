import React from "react";
import "./Skills.css";

const SKILL_GROUPS = [
  {
    category: "Frontend",
    skills: [
      "React",
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5",
      "CSS3 / SASS",
      "Tailwind CSS",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "Express",
      "Python",
      "REST APIs",
      "GraphQL",
      "PostgreSQL",
    ],
  },
  {
    category: "Tools & Platforms",
    skills: ["Git & GitHub", "Docker", "AWS", "Vercel", "Linux", "CI/CD"],
  },
];

function Skills() {
  return (
    <section id="skills" className="section section--dark">
      <div className="section__inner">
        <h2 className="section__title">Skills</h2>
        <div className="skills__grid">
          {SKILL_GROUPS.map(({ category, skills }) => (
            <div key={category} className="skills__card glass-card">
              <h3 className="skills__category">{category}</h3>
              <div className="skills__tags">
                {skills.map((skill) => (
                  <span key={skill} className="skills__tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
