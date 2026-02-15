// src/hooks/useScrollReveal.js
import { useEffect } from "react";
import ScrollReveal from "scrollreveal";

export default function useScrollReveal(selector, options = {}) {
  useEffect(() => {
    const sr = ScrollReveal();

    const timeout = setTimeout(() => {
      sr.reveal(selector, {
        duration: 1000,
        delay: 200,
        distance: "40px",
        easing: "ease-in-out",
        reset: false,
        viewFactor: 0.2,
        ...options, // allow override
      });
    }, 100); // give time for DOM to paint

    return () => {
      clearTimeout(timeout);
      sr.clean(selector); // cleanup on unmount
    };
  }, []);
}
