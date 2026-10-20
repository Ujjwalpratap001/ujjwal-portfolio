import LeetCodeActivity from "./components/LeetCodeActivity";
import MonkeytypeCard from "./components/MonkeytypeCard";
import { useState } from 'react';
import Nav from './components/Nav';
import Intro from './components/Intro';
import Cursor from './components/Cursor';
import Hero from './sections/Hero';
import About from './sections/About';
import GitHubActivity from './sections/GitHubActivity';
//import LeetCodeProgress from './sections/LeetCodeProgress';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Journey from './sections/Journey';
import Certificates from './sections/Certificates';
import LinkedInCard from './sections/LinkedInCard';
import Contact from './sections/Contact';
import { prefersReducedMotion } from './lib/motion';
import { useScrollReveals } from './lib/useScrollReveals';

const INTRO_KEY = 'portfolio:intro-seen';
type Phase = 'intro' | 'reveal' | 'done';

function initialPhase(): Phase {
  if (prefersReducedMotion()) return 'done';
  try {
    return localStorage.getItem(INTRO_KEY) === '1' ? 'done' : 'intro';
  } catch {
    return 'intro';
  }
}

export default function App() {
  const [phase, setPhase] = useState<Phase>(initialPhase);
  useScrollReveals();

  const markSeen = () => {
    try {
      localStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* private mode: the intro simply plays again next time */
    }
  };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      {phase !== 'done' && (
        <Intro
          onReveal={() => setPhase((p) => (p === 'intro' ? 'reveal' : p))}
          onDone={() => {
            markSeen();
            setPhase('done');
          }}
        />
      )}
      <Cursor />
      <Nav />
      <main id="main">
        <Hero play={phase !== 'intro'} />
        <About />
        <Projects />
        <Skills />
        <GitHubActivity />
        <LeetCodeActivity />
        <MonkeytypeCard />
        <Journey />
        <Certificates />
        <LinkedInCard />
        <Contact />
      </main>
    </>
  );
}
