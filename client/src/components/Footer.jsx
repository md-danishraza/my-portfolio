import React from "react";
import useScrollReveal from "../utils/useScrollReveal";

function Footer() {
  useScrollReveal(".footer p", { origin: "top", delay: 200, viewFactor: 0 });
  return (
    <div className="footer">
      <p>
        &copy;2026
        <br />
        Developed By Md. Danish Raza
      </p>
    </div>
  );
}

export default Footer;
