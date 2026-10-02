import { featuredProjects, otherProjects, profile } from "@/content/portfolio";
import { assetUrl } from "@/lib/assets";
import SectionTitle from "./SectionTitle";

function ProjectCard({ project }) {
  const positions = ["left", "middle", "right"];
  return (
    <article className={`project project-${project.animationIndex}`}>
      <div
        className="project-visual"
        data-particle-project={project.animationIndex}
        role="img"
        aria-label={`Animated workflow sketch for ${project.title}`}
      >
        <a
          className="project-image-link"
          href={assetUrl(project.image)}
          target="_blank"
          rel="noopener"
          aria-label={`Open original image for ${project.title}`}
        >
          <img
            src={assetUrl(project.image)}
            alt={`${project.title} project image`}
            loading="lazy"
            width="720"
            height="440"
          />
        </a>
        <div
          className={`diagram-labels diagram-${project.animationIndex}`}
          aria-hidden="true"
        >
          {project.diagram.nodes.map((label, index) => (
            <span key={label} className={`node-label node-${positions[index]}`}>
              {label}
            </span>
          ))}
          <span className="diagram-caption">{project.diagram.caption}</span>
        </div>
      </div>
      <div className="project-copy">
        <p className="project-stack">{project.stack}</p>
        <h3>
          <a href={project.url} target="_blank" rel="noopener">
            {project.title}
          </a>
        </h3>
        <p>{project.description}</p>
        <a
          className="source-link"
          href={project.url}
          target="_blank"
          rel="noopener"
        >
          View project <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
export default function Projects() {
  return (
    <section className="work wrap" id="projects">
      <div className="section-heading">
        <SectionTitle>projects</SectionTitle>
        <p>A few projects, and how they work.</p>
      </div>
      <div className="project-grid">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div className="archive">
        <SectionTitle>more projects</SectionTitle>
        <div className="archive-list">
          {otherProjects.map((project) => (
            <a
              key={project.url}
              className="archive-project"
              href={project.url}
              target="_blank"
              rel="noopener"
            >
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <span className="archive-tech">{project.stack}</span>
              <span aria-hidden="true" className="link-arrow">
                ↗
              </span>
            </a>
          ))}
        </div>
        <a
          className="quiet-link all-repos"
          href={`${profile.github}?tab=repositories`}
          target="_blank"
          rel="noopener"
        >
          All repositories on GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
