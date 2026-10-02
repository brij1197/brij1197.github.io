import { profile } from "@/content/portfolio";
import { assetUrl } from "@/lib/assets";
import SectionTitle from "./SectionTitle";

function Paragraph({ parts }) {
  return (
    <p>
      {parts.map((part, index) =>
        typeof part === "string" ? (
          part
        ) : (
          <a key={index} href={part.url} target="_blank" rel="noopener">
            {part.text}
          </a>
        ),
      )}
    </p>
  );
}

export default function About() {
  return (
    <section className="about wrap" id="about">
      <figure className="portrait">
        <img
          src={assetUrl(profile.portrait)}
          alt="Brij Bhatia smiling outdoors"
          loading="lazy"
          width="1303"
          height="1920"
        />
      </figure>
      <div className="about-copy">
        <SectionTitle>about me</SectionTitle>
        {profile.about.map((parts, index) => (
          <Paragraph key={index} parts={parts} />
        ))}
        <p className="skills-intro">{profile.skillsIntro}</p>
        <div className="skills">
          {profile.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
        {profile.aboutOutro.map((parts, index) => (
          <Paragraph key={index} parts={parts} />
        ))}
      </div>
    </section>
  );
}
