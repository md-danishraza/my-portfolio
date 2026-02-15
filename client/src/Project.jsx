import React, { useEffect, useState } from "react";
import useFetchProjects from "./useFetchProjects";
import Item from "./Item";
import useScrollReveal from "./utils/useScrollReveal";

function Project() {
  const { loading, projects } = useFetchProjects();
  const [visibleCount, setVisibleCount] = useState(6);

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
    setMenu(
      menus.map((item) =>
        item.stack === menuItem.stack ? { ...item, status: true } : item
      )
    );
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
      <h1>PROJECTS</h1>
      <p>Resourced using CMS</p>
      <div className="menus">
        {menu.map((menuItem, i) => (
          <button
            key={i}
            onClick={() => handleMenu(menuItem)}
            className={menuItem.status ? "active" : undefined}
          >
            {menuItem.stack}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="loading"></div>
      ) : (
        <div className="projects">
          {filteredProjects
            .reverse()
            .slice(0, visibleCount)
            .map((project, i) => (
              <Item key={i} project={project.fields} />
            ))}
        </div>
      )}
      {!loading && (
        <div className="pagination-buttons">
          {filteredProjects.length > visibleCount && menus.length >= 6 && (
            <button onClick={handleLoadMore} className="load-more">
              Load More
            </button>
          )}
          {visibleCount >= filteredProjects.length &&
            filteredProjects.length > 6 &&
            menus.length >= 6 && (
              <button onClick={handleCollapse} className="collapse">
                Collapse
              </button>
            )}
        </div>
      )}
    </div>
  );
}

export default Project;
