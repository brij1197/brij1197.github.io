import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <Navbar fixed="top" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">Brij Bhatia</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#intro">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#experience">Experience</Nav.Link>
            <Nav.Link href="#projects">Projects</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="mailto:brijbhatia997@gmail.com" target="_blank" rel="noopener noreferrer">
              <EmailRoundedIcon style={{ fontSize: 20 }} aria-label="Email"></EmailRoundedIcon>
            </Nav.Link>
            <Nav.Link href="https://github.com/brij1197" target="_blank" rel="noopener noreferrer">
              <GitHubIcon style={{ fontSize: 19 }} aria-label="Github"></GitHubIcon>
            </Nav.Link>
            <Nav.Link href="https://www.linkedin.com/in/brijbhatia/" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon style={{ fontSize: 21 }} aria-label="LinkedIn"></LinkedInIcon>
            </Nav.Link>
            <Nav.Link href="/assets/Resume_Brij.pdf" target="_blank" rel="noopener noreferrer">
              <GetAppRoundedIcon style={{ fontSize: 21 }} aria-label="Download Resume"></GetAppRoundedIcon>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default NavBar;
