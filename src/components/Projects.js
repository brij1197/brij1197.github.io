import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import FadeInSection from "./FadeInSection";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
        {Object.keys(spotlightProjects).map((key) => (
          <Carousel.Item key={key}>
            <img
              className="d-block w-100"
              src={spotlightProjects[key].image}
              alt={key}
              loading="lazy"
            />
            <div className="caption-bg">
              <Carousel.Caption>
                <h3>{spotlightProjects[key].title}</h3>
                <p>{spotlightProjects[key].desc}</p>
                <div className="techStack">{spotlightProjects[key].techStack}</div>
                <ExternalLinks
                  githubLink={spotlightProjects[key].link}
                />
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="project-container">
        <ul className="projects-grid">
          {Object.keys(projects).map((key, i) => (
            <FadeInSection key={key} delay={`${i + 1}00ms`}>
              <li className="projects-card">
                <div className="card-header">
                  <div className="folder-icon">
                    <FolderOpenRoundedIcon style={{ fontSize: 35 }} />
                  </div>
                  <ExternalLinks githubLink={projects[key].link} />
                </div>
                <div className="card-title">{key}</div>
                <div className="card-desc">{projects[key].desc}</div>
                <div className="card-tech">{projects[key].techStack}</div>
              </li>
            </FadeInSection>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
