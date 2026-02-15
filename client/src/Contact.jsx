import React, { useState } from "react";
import js from "./assets/logos/js.png";

import mongo from "./assets/logos/mongo.png";
import express from "./assets/logos/express.png";
import react from "./assets/logos/react.png";
import node from "./assets/logos/node.png";

import python from "./assets/logos/python.png";
import git from "./assets/logos/git.png";
import java from "./assets/logos/java.png";
import postgres from "./assets/logos/postgres.png";

import docker from "./assets/logos/docker.png";
import kubernetes from "./assets/logos/kubernetes.png";
import aws from "./assets/logos/aws.png";

import { toast } from "react-toastify";
import useScrollReveal from "./utils/useScrollReveal";
import Form from "./Form";
import axios from "axios";

function Contact() {
  const [inputs, setInuputs] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInuputs((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const url = import.meta.env.VITE_FORM + "/send-email";

    try {
      const response = await axios.post(url, inputs);

      if (response.data) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
        });
      }

      setInuputs({ name: "", email: "", message: "" });
    } catch (error) {
      let errorMessage = "An unknown error occurred.";

      if (error.response) {
        // Server responded with a status code (4xx, 5xx)
        if (error.response.data.errors) {
          // This is a validation error array from express-validator
          errorMessage = error.response.data.errors
            .map((err) => err.msg)
            .join(" ");
        } else if (error.response.data.message) {
          // This is a rate limit or 500 error message
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        // Request was made but no response received (e.g., server is down)
        errorMessage =
          "Could not connect to the server. Please try again later.";
      }

      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useScrollReveal("#contactHeading", { origin: "top", delay: 200 });
  useScrollReveal(".content .about", { origin: "left", delay: 200 });
  useScrollReveal(".content .about h1", { origin: "top", delay: 1000 });
  useScrollReveal(".content .about p", { origin: "top", delay: 1200 });
  useScrollReveal(".content .about h2", { origin: "top", delay: 1400 });
  useScrollReveal(".content .form", { origin: "right", delay: 300 });
  useScrollReveal(".content .form h1", { origin: "right", delay: 1000 });
  useScrollReveal(".content .form p", { origin: "right", delay: 1200 });
  useScrollReveal(".skills .img img", {
    origin: "bottom",
    interval: 150,
    viewFactor: "0.1",
  });

  return (
    <div className="contact" id="contact">
      <h1 id="contactHeading">CONTACT</h1>
      <div className="content">
        <div className="about" id="about">
          <h1>About Me.</h1>
          <p>Full Stack Developer</p>
          <h2>
            Ambitious full-stack Javascript developer with a solid background in
            web development, data analysis, and backend systems. Currently
            studying for a Bachelor in Vocation Studies SDE at DU. Keen to be
            part of energetic development teams while constantly developing
            scalable web applications and user-focused solutions.
          </h2>
          <div className="skills">
            <div className="img">
              <img src={js} alt="" />
            </div>
            <div className="img">
              <img src={mongo} alt="" />
            </div>
            <div className="img">
              <img src={express} alt="" />
            </div>

            <div className="img">
              <img src={react} alt="" />
            </div>

            <div className="img">
              <img src={node} alt="" />
            </div>

            <div className="img">
              <img src={python} alt="" />
            </div>
            <div className="img">
              <img src={java} alt="" />
            </div>
            <div className="img">
              <img src={postgres} alt="" />
            </div>
            <div className="img">
              <img src={git} alt="" />
            </div>
            <div className="img">
              <img src={docker} alt="" />
            </div>
            <div className="img">
              <img src={kubernetes} alt="" />
            </div>
            <div className="img">
              <img src={aws} alt="" />
            </div>
          </div>
        </div>
        <div className="form" id="form">
          <Form
            inputs={inputs}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
