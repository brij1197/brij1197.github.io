import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import FadeInSection from "./FadeInSection";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "react-bootstrap/Carousel";
import ExternalLinks from "./ExternalLinks";

class Projects extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1"
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }
  render() {
    const spotlightProjects = {
      "Project and Client Management System": {
        title: "project and client management system",
        desc:
          "A management system for projects and clients created using GraphQL.",
        techStack: "Node.js, GraphQL, React.JS, MongoDB",
        link: "https://github.com/brij1197/Project-and-Client-Management-POC",
        image: "/assets/management.png"
      },
      "Path Find Algorithm": {
        title: "path finding algorithm",
        desc:
          "An interactive python application to demonstrate how path finding algorithms work.",
        techStack: "Python (Pygame)",
        link: "https://github.com/brij1197/Path-Finding-Algorithm",
        image: "/assets/pygame.png"
      },
      "Rent Tracking Web Application": {
        title: "rent tracking web application",
        desc:
          "A full-stack web application to manage tenant information, rental payments, and maintenance requests.",
        techStack: "Typescript, Angular, Firebase, Postman, MySQL",
        link: "https://github.com/brij1197/RentTrackingWebApplication",
        image: "/assets/rent-tracking.png"
      },
      "Augmented Reality for Education": {
        title: "augmented reality for education",
        desc:
          "An application aimed for kindergarten students to aid in their education using Augmented Reality.",
        techStack: "C# (Unity), VoiceRSS TTS, Vuforia",
        link: "https://github.com/brij1197/Augmented-Reality-for-Education",
        image: "/assets/eduar.png"
      }
    };
    const projects = {
      "Encrypted Filesystem": {
        desc:
          "A middleware solution designed to enhance file security within a host file system. It prioritizes confidentiality and security, ensuring that users cannot extract any information about the stored data or associated users.",
        techStack: "C++",
        link: "https://github.com/brij1197/cmpt785-g5-secure-filesystem",
      },
      "Virtual Private Cloud": {
        desc:
          "An application that creates a VPC (Virtual Private Cloud) and all the associated resources in AWS.",
        techStack: "Terraform",
        link: "https://github.com/brij1197/VirtualPrivateCloud-Terraform",
      },
      "Torplay": {
        desc:
          "A web based player to stream or download a torrent file.",
        techStack: "Node.js (Express.js), Python",
        link:
          "https://github.com/brij1197/Project_TorPlay"
      },
      "ENIGMA": {
        desc:
          "An Implementation of how the working of the Enigma Machine.",
        techStack: "Python",
        link: "https://github.com/brij1197/ENIGMA",
      },
      "Sudoku Solver": {
        desc:
          "A project that shows the implementation of Backtracking Algorithm on a Sudoku Puzzle",
        techStack: "Python",
        link: "https://github.com/brij1197/Backtracking-Algorithm",
      },
      "Image Compression": {
        desc:
          "Compress images using either the K-Means Method or using Tinify",
        techStack: "Python",
        link: "https://github.com/brij1197/Image-Compression",
      }
    };

    return (
      <div id="projects">
        <div className="section-header ">
          <span className="section-title">/ projects</span>
        </div>
        <Carousel>
          {Object.keys(spotlightProjects).map((key, i) => (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={spotlightProjects[key]["image"]}
                alt={key}
              />
              <div className="caption-bg">
                <Carousel.Caption>
                  <h3>{spotlightProjects[key]["title"]}</h3>
                  <p>
                    {spotlightProjects[key]["desc"]}
                    <p className="techStack">
                      {spotlightProjects[key]["techStack"]}
                    </p>
                  </p>
                  <ExternalLinks
                    githubLink={spotlightProjects[key]["link"]}
                  ></ExternalLinks>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="project-container">
          <ul className="projects-grid">
            {Object.keys(projects).map((key, i) => (
              <FadeInSection delay={`${i + 1}00ms`}>
                <li className="projects-card">
                  <div className="card-header">
                    <div className="folder-icon">
                      <FolderOpenRoundedIcon
                        style={{ fontSize: 35 }}
                      ></FolderOpenRoundedIcon>
                    </div>
                    <ExternalLinks
                      githubLink={projects[key]["link"]}
                    ></ExternalLinks>
                  </div>

                  <div className="card-title">{key}</div>
                  <div className="card-desc">{projects[key]["desc"]}</div>
                  <div className="card-tech">{projects[key]["techStack"]}</div>
                </li>
              </FadeInSection>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Projects;
