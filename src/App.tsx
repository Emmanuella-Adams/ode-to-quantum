/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar, ViewType } from './components/Navbar';
import { ParticleBackground } from './components/ParticleBackground';
import { Hero } from './components/Hero';
import { SystemStatus } from './components/SystemStatus';
import { Curriculum } from './components/Curriculum';
import { MissionView } from './components/MissionView';
import { PlaygroundView } from './components/PlaygroundView';
import { NotebookView } from './components/NotebookView';
import { ResourcesView } from './components/ResourcesView';
import { AboutView } from './components/AboutView';

export default function App() {
  const [view, setView] = useState<ViewType>('home');
  const [introDone, setIntroDone] = useState(false);

  // Persistence for Cadet Progress
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('otq_completed_lessons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [mathLensActive, setMathLensActive] = useState<boolean>(() => {
    return localStorage.getItem('otq_math_lens_active') === 'true';
  });

  const [activeLessonId, setActiveLessonId] = useState<string>(() => {
    return localStorage.getItem('otq_active_lesson_id') || 'l1';
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroDone(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('otq_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('otq_math_lens_active', String(mathLensActive));
  }, [mathLensActive]);

  useEffect(() => {
    localStorage.setItem('otq_active_lesson_id', activeLessonId);
  }, [activeLessonId]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-quantum-bg text-quantum-text font-mono selection:bg-quantum-blue/30 selection:text-quantum-blue">
      <ParticleBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar 
          setView={setView} 
          introDone={introDone} 
          mathLensActive={mathLensActive}
          setMathLensActive={setMathLensActive}
        />
        <main className="flex-grow container max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12 flex flex-col gap-16 lg:gap-24">
          <AnimatePresence mode="wait">
            {view === 'home' && (
              <motion.div 
                key="home"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Hero setView={setView} introDone={introDone} />
                <motion.div 
                  initial={{ opacity: introDone ? 1 : 0 }}
                  animate={{ opacity: introDone ? 1 : 0 }}
                  transition={{ duration: 1.5 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12"
                >
                  <div className="lg:col-span-4">
                    <SystemStatus completedLessons={completedLessons} />
                  </div>
                  <div className="lg:col-span-8">
                    <Curriculum 
                      completedLessons={completedLessons} 
                      setActiveLessonId={setActiveLessonId}
                      setView={setView} 
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
            {view === 'mission' && (
              <motion.div
                key="mission"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <MissionView 
                  activeLessonId={activeLessonId}
                  setActiveLessonId={setActiveLessonId}
                  completedLessons={completedLessons}
                  setCompletedLessons={setCompletedLessons}
                  mathLensActive={mathLensActive}
                  onBack={() => setView('home')} 
                />
              </motion.div>
            )}
            {view === 'playground' && (
              <motion.div
                key="playground"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <PlaygroundView />
              </motion.div>
            )}
            {view === 'notebook' && (
              <motion.div
                key="notebook"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <NotebookView />
              </motion.div>
            )}
            {view === 'resources' && (
              <motion.div
                key="resources"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <ResourcesView />
              </motion.div>
            )}
            {view === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <AboutView />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
