import { profile } from "@/content/portfolio";

export default function Footer() {
  return (
    <footer className="wrap">
      <span>{profile.credit}</span>
      <div>
        <a href={profile.github} target="_blank" rel="noopener">
          GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener">
          LinkedIn
        </a>
        <a href={`mailto:${profile.email}`}>Email</a>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}
