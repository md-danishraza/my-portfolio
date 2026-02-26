import { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader";

// 1. Standard imports for "above the fold" content (loads instantly)
import Navbar from "./components/Navbar";
import Hero from "./components/Hero/Hero";

// 2. Lazy load "below the fold" components
const Project = lazy(() => import("./components/Projects/Project"));
const GitHubStats = lazy(() => import("./components/GitHubStats/GitHubStats"));
const Experience = lazy(() => import("./components/Experience/Experience"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const Footer = lazy(() => import("./components/Footer"));

const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* 3. Wrap lazy components in a Suspense boundary */}
      <Suspense fallback={<Loader />}>
        <Project />
        <GitHubStats />
        <Experience />
        <Contact />
        <Footer />
      </Suspense>
    </main>
  );
};

export default App;
