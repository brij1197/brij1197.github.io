import { experience, profile } from "@/content/portfolio";
import { assetUrl } from "@/lib/assets";
import SectionTitle from "./SectionTitle";

export default function Experience() {
  return (
    <section className="experience wrap" id="experience">
      <div className="section-heading">
        <SectionTitle>experience</SectionTitle>
        <a
          className="quiet-link"
          href={assetUrl(profile.resume)}
          target="_blank"
          rel="noopener"
        >
          View résumé <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="job-list">
        {experience.map((job, index) => (
          <details
            className="job"
            key={`${job.company}-${job.role}`}
            open={index === 0}
          >
            <summary>
              <span className="company">{job.company}</span>
              <span className="job-role">{job.role}</span>
              <span className="job-date">{job.dates}</span>
              <span className="expand-icon" aria-hidden="true" />
            </summary>
            <div className="job-detail">
              <ul>
                {job.bullets.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
