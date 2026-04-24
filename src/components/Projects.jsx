import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import FadeInSection from "./FadeInSection";
import Carousel from "react-bootstrap/Carousel";
import ExternalLinks from "./ExternalLinks";
import { spotlightProjects, projects } from "../data/projectsData";

const Projects = () => {
  return (
    <div id="projects">
      <div className="section-header ">
        <span className="section-title">/ projects</span>
      </div>
      <Carousel>
        {spotlightProjects.map((project, i) => (
          <Carousel.Item key={i}>
            <img
              className="d-block w-100"
              src={project.image}
              alt={project.name}
              loading="lazy"
            />
            <div className="caption-bg">
              <Carousel.Caption>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="techStack">{project.techStack}</div>
                <ExternalLinks
                  githubLink={project.link}
                />
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="project-container">
        <ul className="projects-grid">
          {projects.map((project, i) => (
            <FadeInSection key={i} delay={`${i + 1}00ms`}>
              <li className="projects-card">
                <div className="card-header">
                  <div className="folder-icon">
                    <FolderOpenRoundedIcon style={{ fontSize: 35 }} />
                  </div>
                  <ExternalLinks githubLink={project.link} />
                </div>
                <div className="card-title">{project.name}</div>
                <div className="card-desc">{project.desc}</div>
                <div className="card-tech">{project.techStack}</div>
              </li>
            </FadeInSection>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
