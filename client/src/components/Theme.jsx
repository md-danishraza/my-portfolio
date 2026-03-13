// src/components/Theme.jsx - Updated
import React from "react";
import { IoInvertMode } from "react-icons/io5";
import { useTheme } from "./DotGrid/AnimatedBackground";

function Theme() {
  const { isDark, setIsDark } = useTheme();

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="theme-toggle"
      aria-label="Toggle theme"
      title="Toggle dark/light mode"
    >
      <IoInvertMode className="theme-icon" />
    </button>
  );
}

export default Theme;
