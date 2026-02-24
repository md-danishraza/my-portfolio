import axios from "axios";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact/Contact";
import Hero from "./components/Hero/Hero";
import Project from "./components/Projects/Project";
import { useEffect } from "react";
import GitHubStats from "./components/GitHubStats/GitHubStats";
import Experience from "./components/Experience/Experience";
const App = () => {
  // pinging backend on initial load
  useEffect(() => {
    const pingBackend = async () => {
      const url = import.meta.env.VITE_FORM;
      try {
        await axios.get(url);
        console.log("pinged backend");
      } catch (error) {
        console.log(error);
      }
    };
    pingBackend();
  }, []);
  return (
    <main>
      <Navbar />
      <Hero />
      <Project />
      <GitHubStats />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
};
export default App;
