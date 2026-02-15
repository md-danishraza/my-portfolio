import React, { useState, useEffect } from "react";

function Item({ project }) {
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const imgUrl = project.image.fields.file.url;

  return (
    <div className={`project ${isVisible ? "show" : "hide"}`}>
      <img
        className={`project-img ${loaded ? "loaded" : "loading"}`}
        src={`${imgUrl}?w=600&q=70`}
        srcSet={`
          ${imgUrl}?w=400&q=70 400w,
          ${imgUrl}?w=800&q=70 800w,
          ${imgUrl}?w=1200&q=70 1200w
        `}
        sizes="(max-width: 768px) 100vw, 33vw"
        alt={project.image.fields.title}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
      />

      <h2 className="title">{project.title}</h2>

      <div className="info">
        <a href={project.url} target="_blank" rel="noopener noreferrer">
          Live
        </a>
        {project?.code && (
          <a href={project.code} target="_blank" rel="noopener noreferrer">
            Code
          </a>
        )}
      </div>
    </div>
  );
}

export default Item;
