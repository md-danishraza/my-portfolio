// Theme.jsx - Optimized version
import React, { useState, useEffect } from "react";
import { IoInvertMode } from "react-icons/io5";

function Theme() {
  const [isDarkTheme, setDarkTheme] = useState(() => {
    // Check local storage first
    const savedTheme = localStorage.getItem("darkTheme");
    // Also check system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Use saved theme or system preference
    return savedTheme ? savedTheme === "true" : prefersDark;
  });

  useEffect(() => {
    // Use requestAnimationFrame to avoid jank
    requestAnimationFrame(() => {
      if (isDarkTheme) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    });

    // Save to localStorage
    localStorage.setItem("darkTheme", String(isDarkTheme));
  }, [isDarkTheme]);

  return (
    <button
      onClick={() => setDarkTheme(!isDarkTheme)}
      className="theme-toggle"
      aria-label="Toggle theme"
      title="Toggle dark/light mode"
    >
      <IoInvertMode className="theme-icon" />
    </button>
  );
}

export default Theme;
