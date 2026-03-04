import React from "react";
import "./About.css";

const TECH_LIST = [
  "JavaScript (ES6+)",
  "React",
  "Node.js",
  "Python",
  "TypeScript",
  "SQL / NoSQL",
];

function About() {
  return (
    <section id="about" className="section section--dark">
      <div className="section__inner">
        <h2 className="section__title">About Me</h2>
        <div className="about__grid">
          <div className="about__text">
            <p>
              Hello! I'm <strong>Your Name</strong>, a software developer based
              in your city. I enjoy creating things that live on the internet —
              whether that's websites, applications, or anything in between.
            </p>
            <p>
              My interest in web development started when I discovered the power
              of turning ideas into interactive experiences. Since then, I've
              had the privilege of working on projects ranging from small
              personal tools to larger-scale applications.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open source, or finding inspiration in music and
              design.
            </p>
            <p className="about__tech-heading">
              Technologies I've been working with recently:
            </p>
            <ul className="about__tech-list">
              {TECH_LIST.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="about__image-col">
            <div className="about__image-frame">
              <div className="about__image-placeholder">
                <span>Photo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
