import axios from "axios";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Contact from "./Contact";
import Hero from "./Hero";
import Project from "./Project";
import { useEffect } from "react";
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
      <Contact />
      <Footer />
    </main>
  );
};
export default App;
