import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";

class About extends React.Component {
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
    const one = (
      <p>
        I am a recent graduate from <a href="https://www.sfu.ca/about">Simon Fraser University</a>{" "}
        with a Masters in Professional Computer Science. With over 3 years of experience, 
        I have worked at renowned companies such as <a href="https://www.hp.com/us-en/hp-information.html">HP</a> and <a href="https://www.ibm.com/ca-en/about">IBM</a>.
        I am also a <a href="https://www.credly.com/badges/00b58604-e7d9-4100-8fd9-c7993371880d/linked_in_profile">AWS Certified Solutions Architect </a>
      </p>
    );
    const two = (
      <p>
        Besides work, I'm also interested in playing video games and making personal projects. And, I do play Chess.
      </p>
    );

    const tech_stack = [
      "Python",
      "Javascript",
      "Typescript",
      "Java",
      "C++",
    ];

    return (
      <div id="about">
        <FadeInSection>
          <div className="section-header ">
            <span className="section-title">/ about me</span>
          </div>
          <div className="about-content">
            <div className="about-description">
              {[one]}
              {"Here are some technologies I have been working with:"}
              <ul className="tech-stack">
                {tech_stack.map(function (tech_item, i) {
                  return (
                    <FadeInSection delay={`${i + 1}00ms`}>
                      <li>{tech_item}</li>
                    </FadeInSection>
                  );
                })}
              </ul>
              {[two]}
            </div>
            <div className="about-image">
              <img alt="Brij Bhatia" src={"/assets/me2.jpg"} />
            </div>
          </div>
        </FadeInSection>
      </div>
    );
  }
}

export default About;
