// src/components/GlowingCircleTheme/GlowingCircleTheme.jsx
import React, { useRef, useState } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";
import { useTheme } from "../DotGrid/AnimatedBackground"; // Import the theme hook
import styles from "./GlowingCircleTheme.module.css";

function GlowingCircleTheme() {
  // Use theme from the context provider
  const { isDark, setIsDark } = useTheme();

  const [isAnimating, setIsAnimating] = useState(false);
  const [circleStyle, setCircleStyle] = useState({});
  const buttonRef = useRef(null);

  const toggleTheme = (e) => {
    if (isAnimating) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();

    // Calculate circle position
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxRadius = Math.hypot(
      Math.max(centerX, window.innerWidth - centerX),
      Math.max(centerY, window.innerHeight - centerY)
    );

    // Set initial circle style (starting point)
    setCircleStyle({
      left: centerX,
      top: centerY,
      width: "0px",
      height: "0px",
      opacity: 1,
      transform: "translate(-50%, -50%)",
    });

    // Start animation
    setIsAnimating(true);

    // Expand circle after a tiny delay (to trigger transition)
    setTimeout(() => {
      setCircleStyle({
        left: centerX,
        top: centerY,
        width: `${maxRadius * 2}px`,
        height: `${maxRadius * 2}px`,
        opacity: 1,
        transform: "translate(-50%, -50%)",
      });
    }, 10);

    // Toggle theme mid-animation using the context setter
    setTimeout(() => {
      setIsDark(!isDark);
    }, 250);

    // End animation
    setTimeout(() => {
      setCircleStyle({ opacity: 0 });
      setTimeout(() => {
        setIsAnimating(false);
        setCircleStyle({});
      }, 100);
    }, 600);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleTheme}
        className={`${styles.themeToggle} ${
          isDark ? styles.dark : styles.light
        }`}
        aria-label="Toggle theme"
        disabled={isAnimating}
      >
        <div className={styles.glowingCircle}>
          <div className={styles.circleInner}>
            {isDark ? (
              <IoMoon className={styles.icon} />
            ) : (
              <IoSunny className={styles.icon} />
            )}
          </div>
        </div>
      </button>

      {/* Growing circle overlay - SIMPLE DIV APPROACH */}
      {isAnimating && (
        <div
          className={`${styles.growingCircle} ${
            isDark ? styles.toLight : styles.toDark
          }`}
          style={circleStyle}
        />
      )}
    </>
  );
}

export default GlowingCircleTheme;
