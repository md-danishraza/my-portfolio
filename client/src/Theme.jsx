import React, { useState, useEffect } from "react";
import { IoInvertMode } from "react-icons/io5";
import { IoInvertModeOutline } from "react-icons/io5";
function Theme() {
  const [isDarkTheme, setDarkTheme] = useState(() => {
    // initializing the state with local storage
    // check local storage first
    let initialTheme = localStorage.getItem("darkTheme");
    if (initialTheme == "true") {
      return true;
    } else {
      return false;
    }
  });
  useEffect(() => {
    // "dark-theme" class based on the current theme
    if (isDarkTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    // Saving the current theme to localStorage
    localStorage.setItem("darkTheme", String(isDarkTheme));
  }, [isDarkTheme]);

  return (
    <span
      onClick={() => setDarkTheme(!isDarkTheme)}
      className="toggle-icon"
      title="theme"
    >
      {isDarkTheme ? <IoInvertMode /> : <IoInvertMode />}
    </span>
  );
}

export default Theme;
