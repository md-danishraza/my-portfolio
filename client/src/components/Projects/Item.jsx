import React, { useState, useEffect, useRef, memo } from "react";
import styles from "./Project.module.css";

// 1. Wrap the component in React.memo to prevent unnecessary re-renders from the parent
const Item = memo(({ project, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Create a ref to track the card in the DOM
  const cardRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 425);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true }); // passive: true improves scroll perf
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 2. Use IntersectionObserver instead of a blind setTimeout
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger the animation if the card enters the screen
        if (entry.isIntersecting) {
          // Modulo 10 prevents massive delays if you have 30+ projects
          setTimeout(() => setIsVisible(true), (index % 10) * 50);

          // CRITICAL: Disconnect the observer immediately so it never triggers or calculates again
          observer.disconnect();
        }
      },
      { rootMargin: "50px", threshold: 0.1 } // Start loading slightly before it enters the screen
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const imgUrl = project.image.fields.file.url;

  const handleCardClick = () => {
    if (isMobile) setIsHovered(!isHovered);
  };

  return (
    <div
      ref={cardRef}
      className={`${styles["project-card"]} ${
        isVisible ? styles.show : styles.hide
      } ${isMobile ? styles.mobile : ""}`}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className={styles["card-image-wrapper"]}>
        {/* 3. Keep the placeholder in the DOM, but hide it via CSS opacity when loaded */}
        <div
          className={styles["image-placeholder"]}
          style={{ opacity: loaded ? 0 : 1, transition: "opacity 0.3s ease" }}
        />

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
                {/* SVG code omitted for brevity, keep your original SVG here */}
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
                  {/* SVG code omitted for brevity, keep your original SVG here */}
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
                {/* SVG code omitted for brevity, keep your original SVG here */}
              </button>
            )}
          </div>
        </div>

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
            {/* SVG code omitted for brevity, keep your original SVG here */}
          </div>
        )}
      </div>
    </div>
  );
});

export default Item;
