import React from "react";
import "../styles/Intro.css";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import FadeInSection from "./FadeInSection";
import FractalTree from "./FractalTree";

const Intro = () => {
  return (
    <div id="intro">
      <FractalTree />
      <Typist avgTypingDelay={120}>
        <span className="intro-title">
          {"hi, it's "}
          <span className="intro-name">{"brij"}</span>
        </span>
      </Typist>
      <FadeInSection>
        <div className="intro-subtitle">I often code.</div>
        <div className="intro-desc">
          I'm a full-stack software developer from Vancouver, Canada. I'm intrigued by new technologies and constantly seek opportunities to learn and integrate them into my projects. I am also interested in cybersecurity and networking.
        </div>
        <a href="mailto:brijbhatia997@gmail.com" className="intro-contact">
          <EmailRoundedIcon />
          {" Hello! "}
        </a>
      </FadeInSection>
    </div>
  );
};

export default Intro;
