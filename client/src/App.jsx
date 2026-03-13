// App.jsx
import { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader";

// 1. Standard imports for "above the fold" content (loads instantly)
import Navbar from "./components/Navbar";
import Hero from "./components/Hero/Hero";

// 2. Lazy load "below the fold" components
const Projects = lazy(() => import("./components/Projects/Project"));
const GitHubStats = lazy(() => import("./components/GitHubStats/GitHubStats"));
const Experience = lazy(() => import("./components/Experience/Experience"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const Footer = lazy(() => import("./components/Footer"));

// 3. Theme imports
import AnimatedBackground, {
  ThemeProvider,
  useTheme,
} from "./components/DotGrid/AnimatedBackground";

// App content that uses theme
const AppContent = () => {
  const { isDark } = useTheme(); // Now this works because it's inside ThemeProvider

  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <Hero />

      {/* Wrap lazy components in Suspense boundary */}
      <Suspense fallback={<Loader />}>
        <Projects />
        <GitHubStats />
        <Experience />
        <Contact />
        <Footer />
      </Suspense>
    </>
  );
};

// Main App with ThemeProvider wrapper
const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
