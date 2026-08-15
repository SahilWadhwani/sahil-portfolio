import { lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import EducationCredentials from './components/EducationCredentials';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TechBackground from './components/TechBackground';

const GlassLab = lazy(() => import('./dev/GlassLab'));

function App() {
  if (new URLSearchParams(window.location.search).get('glasslab') === '1') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#05070c]" />}>
        <GlassLab />
      </Suspense>
    );
  }

  return (
    <div className="site-shell relative min-h-screen overflow-x-hidden text-white">
      <TechBackground />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <EducationCredentials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
