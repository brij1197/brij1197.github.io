import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";

const ExternalLinks = ({ githubLink, openLink }) => {
  return (
    <span className="external-links">
      <a className="github-icon" href={githubLink} target="_blank" rel="noopener noreferrer">
        <GitHubIcon
          style={{
            fontSize: 20,
            color: "var(--lightest-slate)"
          }}
        ></GitHubIcon>
      </a>
      {openLink && (
        <a className="open-icon" href={openLink} target="_blank" rel="noopener noreferrer">
          <OpenInBrowserIcon
            style={{
              fontSize: 25,
              color: "var(--lightest-slate)"
            }}
          ></OpenInBrowserIcon>
        </a>
      )}
    </span>
  );
}

export default ExternalLinks;
