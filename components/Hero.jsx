import { Fragment } from "react";
import { profile } from "@/content/portfolio";
import TypedName from "./TypedName";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1 aria-label={`${profile.greetingPrefix}${profile.typedName}`}>
          <span className="intro-prefix" aria-hidden="true">
            {profile.greetingPrefix}
          </span>
          <TypedName name={profile.typedName} />
        </h1>
        <p className="hero-description">
          {profile.tagline.map((line, index) => (
            <Fragment key={line}>
              {index > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </p>
        <p className="hero-intro">{profile.intro}</p>
        <p className="current-role">
          Currently a {profile.role} at{" "}
          <a href={profile.companyUrl} target="_blank" rel="noopener">
            {profile.company}
          </a>
        </p>
        <div className="hero-actions">
          <a className="button" href="#projects">
            Explore my work
          </a>
          <a className="quiet-link" href={`mailto:${profile.email}`}>
            {profile.contactLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div className="hero-bottom wrap">
        <div className="social-links">
          <a href={profile.github} target="_blank" rel="noopener">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
      </div>
    </section>
  );
}
