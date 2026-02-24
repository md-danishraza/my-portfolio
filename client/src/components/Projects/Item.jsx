// Item.jsx
import React, { useState, useEffect } from "react";
import styles from "./Project.module.css"; // Import the same CSS module

function Item({ project, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
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

  const handleCardClick = () => {
    if (isMobile) {
      setIsHovered(!isHovered);
    }
  };

  return (
    <div
      className={`${styles["project-card"]} ${
        isVisible ? styles.show : styles.hide
      } ${isMobile ? styles.mobile : ""}`}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className={styles["card-image-wrapper"]}>
        <img
          className={`${styles["project-image"]} ${
            loaded ? styles.loaded : styles.loading
          }`}
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

        <div
          className={`${styles["card-overlay"]} ${
            isHovered ? styles.active : ""
          }`}
        >
          <div className={styles["overlay-content"]}>
            <h3 className={styles["overlay-title"]}>{project.title}</h3>
            <div className={styles["overlay-links"]}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles["overlay-link"]} ${styles.live}`}
                onClick={(e) => e.stopPropagation()}
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
                  className={`${styles["overlay-link"]} ${styles.code}`}
                  onClick={(e) => e.stopPropagation()}
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
            {isMobile && isHovered && (
              <button
                className={styles["overlay-close"]}
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

        {!loaded && <div className={styles["image-placeholder"]}></div>}

        <div className={styles["card-badge"]}>
          <span className={styles["stack-tag"]}>{project.stack || "Web"}</span>
        </div>
      </div>

      <div className={styles["card-content"]}>
        <h2 className={styles["card-title"]}>{project.title}</h2>
        <p className={styles["card-description"]}>
          {project.description ||
            "A modern web application built with cutting-edge technologies."}
        </p>
        {isMobile && (
          <div className={styles["mobile-tap-indicator"]}>
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
