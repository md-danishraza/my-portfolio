import React, { useState, useEffect } from "react";
import {
  FaGithubSquare,
  FaLinkedin,
  FaInstagramSquare,
  FaTimes,
  FaBars,
} from "./icons";

import Theme from "./Theme/Theme";
import GlowingCircleTheme from "./Theme/GlowingCircleTheme";

function Navbar() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="links">
        <a
          href="https://github.com/md-danishraza"
          title="github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithubSquare className="icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/md-danish-raza-2039b5276/"
          title="linkedin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="icon" />
        </a>
        <a
          href="https://www.instagram.com/renderstic/"
          title="instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagramSquare className="icon" />
        </a>
      </div>

      <div className={menu ? "navigations active" : "navigations"}>
        <a href="#" className="navlinks" onClick={() => setMenu(false)}>
          HOME
        </a>
        <a href="#projects" className="navlinks" onClick={() => setMenu(false)}>
          PROJECTS
        </a>
        <a href="#github" className="navlinks" onClick={() => setMenu(false)}>
          STATS
        </a>
        <a
          href="#experience"
          className="navlinks"
          onClick={() => setMenu(false)}
        >
          EXPERIENCE
        </a>
        <a href="#contact" className="navlinks" onClick={() => setMenu(false)}>
          CONTACT
        </a>
      </div>

      <div className="menu-theme">
        {/* <Theme /> */}
        <GlowingCircleTheme />

        <button
          className="menu-toggle"
          onClick={() => setMenu(!menu)}
          aria-label="Toggle menu"
        >
          {menu ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
