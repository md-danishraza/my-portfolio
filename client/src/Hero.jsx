import React from "react";
import profile from "./assets/profile.jpg";

import ProfileImage from "./components/ProfileImg";
import { FaGithub, FaLinkedin, FaInstagram, FaArrowDown } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Hero() {
  const socialLinks = [
    {
      icon: <FaGithub />,
      url: "https://github.com/md-danishraza",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/md-danish-raza-2039b5276/",
      label: "LinkedIn",
    },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/renderstic/",
      label: "Instagram",
    },
    {
      icon: <MdEmail />,
      url: "mailto:danish.raza@example.com",
      label: "Email",
    },
  ];

  return (
    <section className="hero-section">
      {/* Background decoration */}
      <div className="hero-bg-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          {/* Left Column - Info */}
          <div className="info">
            <div className="info-badge">
              <span className="badge-text">
                Welcome to my portfolio
                <br /> A showcase of creativity and craft
              </span>
              <span className="badge-dot"></span>
            </div>

            <h1 className="hero-title">
              <span className="title-greeting">Hi, I'm</span>
              <span className="title-name">Md. Danish Raza</span>
              <span className="title-role">
                Software <span className="role-highlight">Developer</span>
              </span>
            </h1>

            <p className="hero-description">
              B.Voc. SDE at Ramanujan College, DU • Full Stack Developer •
              Tenacity to learn anything • JS/TS Enthusiast
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">2+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">20+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10+</span>
                <span className="stat-label">Technologies</span>
              </div>
            </div>

            <div className="hero-cta">
              <a href="#projects" className="cta-primary">
                View My Work
                <svg
                  className="cta-arrow"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </a>
              <a href="#contact" className="cta-secondary">
                Let's Talk
              </a>
            </div>

            <div className="hero-social">
              <span className="social-label">Connect with me:</span>
              <div className="social-links">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="image-wrapper">
            <div className="image-container">
              <div className="image-backdrop"></div>
              <div className="image-frame">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="-25 -25 250 250"
                  className="profile-svg"
                >
                  <defs>
                    <pattern
                      id="image-fill"
                      patternUnits="userSpaceOnUse"
                      width="250"
                      height="250"
                    >
                      <ProfileImage profile={profile} />
                    </pattern>

                    {/* Gradient for glow effect */}
                    <linearGradient
                      id="svg-glow"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="var(--highlight)"
                        stopOpacity="0.3"
                      >
                        <animate
                          attributeName="stop-color"
                          values="var(--highlight); var(--highlight-secondary); var(--highlight)"
                          dur="8s"
                          repeatCount="indefinite"
                        />
                      </stop>
                      <stop
                        offset="100%"
                        stopColor="var(--main-color)"
                        stopOpacity="0.1"
                      />
                    </linearGradient>
                  </defs>

                  <path
                    d="M170.99154033856684 29.571304141297347 C155.42555057995793 14.024133687482989 109.78106582288127 -0.9613879852840548 87.84671966320828 0.7412584350609848 C69.96542445713018 2.1292881056119572 35.721964818209656 20.428448060280175 24.504375335873462 34.42248360471916 C11.018347357639174 51.24641491169771 -2.6300234864073717 96.40857118271006 1.553962116860646 117.56068407299355 C6.063393004245198 140.35808354931754 37.67835228721116 180.762295060149 58.54058266616977 191.00064128531898 C77.08587549911653 200.10192745759593 121.68538089702841 197.9848580249006 141.17328737542314 191.13045817234115 C153.0089453822394 186.96755167508314 172.8268094830557 169.7601938339719 180.25952035202755 159.65240475339178 C187.9847373645806 149.14683477480375 199.11661675709703 124.15992413480996 199.37953542778473 111.12240703075011 C199.81479127973176 89.53909535661587 186.26557976129882 44.826877227625566 170.99154033856684 29.571304141297347Z"
                    stroke="none"
                    fill="url(#image-fill)"
                  />
                </svg>
              </div>

              {/* Floating elements */}
              <div className="floating-element element-1">
                <span>React</span>
              </div>
              <div className="floating-element element-2">
                <span>Node.js</span>
              </div>
              <div className="floating-element element-3">
                <span>JS/TS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <a href="#projects" className="scroll-link">
            <span className="scroll-text">Scroll Down</span>
            <FaArrowDown className="scroll-icon" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
