import React, { useState, useEffect, useRef } from "react";

function Item({ project, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 425);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100 + index * 50);
    return () => clearTimeout(timeout);
  }, [index]);

  const imgUrl = project.image.fields.file.url;

  // For mobile, we want overlay to appear on click instead of hover
  const handleCardClick = () => {
    if (isMobile) {
      setIsHovered(!isHovered);
    }
  };

  return (
    <div
      className={`project-card ${isVisible ? "show" : "hide"} ${
        isMobile ? "mobile" : ""
      }`}
      ref={itemRef}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="card-image-wrapper">
        <img
          className={`project-image ${loaded ? "loaded" : "loading"}`}
          src={`${imgUrl}?w=600&q=80&fm=webp`}
          srcSet={`
            ${imgUrl}?w=400&q=80&fm=webp 400w,
            ${imgUrl}?w=800&q=80&fm=webp 800w,
            ${imgUrl}?w=1200&q=80&fm=webp 1200w
          `}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={project.image.fields.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
        />

        <div className={`card-overlay ${isHovered ? "active" : ""}`}>
          <div className="overlay-content">
            <h3 className="overlay-title">{project.title}</h3>
            <div className="overlay-links">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="overlay-link live"
                onClick={(e) => e.stopPropagation()} // Prevent card click when clicking link
              >
                <span>Live Preview</span>
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M15 3h6v6"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M10 14L21 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </a>
              {project?.code && (
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="overlay-link code"
                  onClick={(e) => e.stopPropagation()} // Prevent card click when clicking link
                >
                  <span>View Code</span>
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path
                      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </a>
              )}
            </div>
            {/* Mobile close button */}
            {isMobile && isHovered && (
              <button
                className="overlay-close"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsHovered(false);
                }}
              >
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {!loaded && <div className="image-placeholder"></div>}

        <div className="card-badge">
          <span className="stack-tag">{project.stack || "Web"}</span>
        </div>
      </div>

      <div className="card-content">
        <h2 className="card-title">{project.title}</h2>
        <p className="card-description">
          {project.description ||
            "A modern web application built with cutting-edge technologies."}
        </p>
        {/* Mobile indicator */}
        {isMobile && (
          <div className="mobile-tap-indicator">
            <span>Tap for details</span>
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default Item;
