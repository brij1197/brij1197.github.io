import { profile } from "@/content/portfolio";
import { assetUrl } from "@/lib/assets";

export default function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home">
        {profile.name}
      </a>
      <nav aria-label="Main navigation">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a
          className="resume-link"
          href={assetUrl(profile.resume)}
          target="_blank"
          rel="noopener"
        >
          Résumé <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
