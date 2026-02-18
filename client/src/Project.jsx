import React, { useEffect, useState } from "react";
import useFetchProjects from "./hooks/useFetchProjects";
import Item from "./components/Item";
import useScrollReveal from "./utils/useScrollReveal";

function Project() {
  const { loading, projects } = useFetchProjects();
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeFilter, setActiveFilter] = useState("All");

  const menus = [
    { stack: "All", status: false },
    { stack: "Vanilla", status: false },
    { stack: "CssLib", status: false },
    { stack: "React", status: false },
    { stack: "Next", status: false },
    { stack: "FullStack", status: false },
  ];

  const [menu, setMenu] = useState(menus);

  useEffect(() => {
    setMenu((prev) => {
      const copy = [...prev];
      copy[0].status = true;
      return copy;
    });
  }, []);

  const handleMenu = (menuItem) => {
    setActiveFilter(menuItem.stack);
    setMenu(
      menus.map((item) =>
        item.stack === menuItem.stack
          ? { ...item, status: true }
          : { ...item, status: false }
      )
    );
    setVisibleCount(6); // Reset visible count when filtering
  };

  const handleLoadMore = () => {
    const targetCount = visibleCount + 6;
    const increment = 1;
    const interval = 200;
    let count = visibleCount;

    const increase = () => {
      if (count < targetCount) {
        count += increment;
        setVisibleCount(count);
        setTimeout(increase, interval);
      }
    };

    increase();
  };

  const handleCollapse = () => {
    const targetCount = 6;
    const decrement = 1;
    const interval = 200;
    let count = visibleCount;

    const collapse = () => {
      if (count > targetCount) {
        count -= decrement;
        setVisibleCount(count);
        setTimeout(collapse, interval);
      }
    };

    collapse();
  };

  useScrollReveal("#projects > h1", { origin: "top", delay: 200 });
  useScrollReveal("#projects > p", { origin: "top", delay: 300 });
  useScrollReveal("#projects .menus button", {
    origin: "bottom",
    interval: 150,
  });

  // Calculate the filtered projects based on current menu
  const filteredProjects = (projects || []).filter((project) => {
    const currentStack = menu.find((item) => item.status)?.stack;
    if (currentStack === "All") {
      return true;
    }
    return project.fields.stack === currentStack;
  });

  return (
    <div className="project-section" id="projects">
      <div className="project-container">
        <div className="section-header">
          <h1 className="section-title">
            <span className="title-highlight">My</span> Projects
          </h1>
          <p className="section-subtitle">
            Resourced using CMS • Showcasing my best work
          </p>
        </div>

        <div className="filter-wrapper">
          <div className="menus">
            {menu.map((menuItem, i) => (
              <button
                key={i}
                onClick={() => handleMenu(menuItem)}
                className={`filter-btn ${menuItem.status ? "active" : ""}`}
              >
                {menuItem.stack}
                {menuItem.status && <span className="active-indicator"></span>}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Fetching projects...</p>
          </div>
        ) : (
          <>
            <div className="projects-grid">
              {filteredProjects
                .reverse()
                .slice(0, visibleCount)
                .map((project, i) => (
                  <Item key={i} project={project.fields} index={i} />
                ))}
            </div>

            {!loading && filteredProjects.length > 0 && (
              <div className="pagination-wrapper">
                <div className="pagination-buttons">
                  {filteredProjects.length > visibleCount && (
                    <button onClick={handleLoadMore} className="load-more">
                      <span>Load More</span>
                      <svg
                        className="arrow-icon"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                      >
                        <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
                      </svg>
                    </button>
                  )}
                  {visibleCount >= filteredProjects.length &&
                    filteredProjects.length > 6 && (
                      <button onClick={handleCollapse} className="collapse">
                        <span>Collapse</span>
                        <svg
                          className="arrow-icon"
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                        >
                          <path d="M7 14l5-5 5 5H7z" fill="currentColor" />
                        </svg>
                      </button>
                    )}
                </div>
                <div className="projects-count">
                  Showing {Math.min(visibleCount, filteredProjects.length)} of{" "}
                  {filteredProjects.length} projects
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Project;
