import React, { useState } from "react";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTimes, FaBars } from "react-icons/fa";
import Theme from "../Theme";

function Navbar() {
  const [menu, setMenu] = useState(false);

  return (
    <div className="navbar">
      <div className="links">
        <a
          href="https://github.com/md-danishraza"
          title="github"
          target="_blank"
        >
          <FaGithubSquare className="icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/md-danish-raza-2039b5276/"
          title="linkedin"
          target="_blank"
        >
          <FaLinkedin className="icon" />
        </a>
        <a
          href="https://www.instagram.com/renderstic/"
          title="instagram"
          target="_blank"
        >
          <FaInstagramSquare className="icon" />
        </a>
      </div>
      <div className={menu ? "navigations active" : "navigations"}>
        <a href="#" className="navlinks" onClick={() => setMenu(false)}>
          Home
        </a>
        <a href="#projects" className="navlinks" onClick={() => setMenu(false)}>
          Project
        </a>
        <a href="#contact" className="navlinks" onClick={() => setMenu(false)}>
          Contact
        </a>
      </div>
      <div className="menu-theme">
        <Theme />
        <span className="menu" onClick={() => setMenu(!menu)}>
          {menu ? <FaTimes /> : <FaBars />}
        </span>
      </div>
    </div>
  );
}

export default Navbar;
