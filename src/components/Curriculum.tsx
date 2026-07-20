import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronDown, CheckCircle2, Lock, PlayCircle, Network, BookOpen, Activity, Cpu, Sparkles } from 'lucide-react';
import { lessonsData, Lesson } from '../data/lessonsData';
import { ViewType } from './Navbar';

interface CurriculumProps {
  completedLessons: string[];
  setActiveLessonId: (id: string) => void;
  setView: (v: ViewType) => void;
}

export function Curriculum({ completedLessons, setActiveLessonId, setView }: CurriculumProps) {
  const [expandedPhase, setExpandedPhase] = useState<string | null>('01');

  // Group lessons by phase
  const phases = [
    { id: '01', title: 'Phase I: Foundations', desc: 'Limitations of classical bits and introduction of qubits', icon: <BookOpen size={16} />, lessonIds: ['l1', 'l2', 'l3'] },
    { id: '02', title: 'Phase II: The Quantum World', desc: 'Superposition, measurement, gates, and entanglement', icon: <Cpu size={16} />, lessonIds: ['l4', 'l5', 'l6', 'l7', 'l8', 'l9', 'l10'] },
    { id: '03', title: 'Phase III: Algorithms', desc: 'Variational circuits, energy landscapes, QAOA, and VQE', icon: <Activity size={16} />, lessonIds: ['l11', 'l12', 'l13', 'l14'] },
    { id: '04', title: 'Phase IV: Quantum ML', desc: 'Feature maps, variational classifiers, kernels, and hybrids', icon: <Network size={16} />, lessonIds: ['l15', 'l16', 'l17', 'l18', 'l19', 'l20'] },
  ];

  const getLessonIndex = (id: string) => lessonsData.findIndex(l => l.id === id);

  const isLessonUnlocked = (id: string) => {
    const idx = getLessonIndex(id);
    if (idx === 0) return true;
    const prevLesson = lessonsData[idx - 1];
    return completedLessons.includes(prevLesson.id);
  };

  const handleLessonClick = (lesson: Lesson) => {
    if (isLessonUnlocked(lesson.id)) {
      setActiveLessonId(lesson.id);
      setView('mission');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="flex flex-col gap-6"
    >
      <div className="flex items-center justify-between border-b border-quantum-border pb-4">
        <h2 className="text-[13px] text-quantum-text font-medium flex items-center gap-2">
          Mission Curriculum Log
        </h2>
        <span className="text-[11px] text-quantum-dim tracking-wide font-mono">
          {completedLessons.length} / {lessonsData.length} COMPLETE
        </span>
      </div>

      {completedLessons.includes('l20') && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 border border-quantum-blue/40 bg-quantum-blue/5 rounded-[14px] flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left font-mono"
        >
          <div className="space-y-1">
            <h4 className="text-quantum-blue text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 justify-center sm:justify-start">
              <Sparkles size={13} className="animate-pulse" /> SPACE CADET COMMISSION READY
            </h4>
            <p className="text-[11px] text-quantum-muted">
              You have completed all mission objectives! Access fleet command and print your graduation certificate.
            </p>
          </div>
          <button
            onClick={() => setView('graduation')}
            className="px-4 py-2 bg-quantum-blue/15 hover:bg-quantum-blue/25 border border-quantum-blue/40 text-quantum-blue rounded-[10px] text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1"
          >
            Claim Certificate <ChevronRight size={12} />
          </button>
        </motion.div>
      )}

      <div className="flex flex-col gap-4">
        {phases.map((phase) => {
          const isExpanded = expandedPhase === phase.id;
          const completedInPhase = phase.lessonIds.filter(id => completedLessons.includes(id)).length;
          const totalInPhase = phase.lessonIds.length;
          
          return (
            <div 
              key={phase.id} 
              className={`border rounded-[14px] overflow-hidden transition-all duration-300 ${isExpanded ? 'border-quantum-border bg-quantum-card' : 'border-quantum-border/50 bg-quantum-card/40 hover:border-quantum-border'}`}
            >
              {/* Phase Header */}
              <div
                onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                className="p-5 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-[10px] bg-quantum-bg border border-quantum-border text-quantum-blue shrink-0">
                    {phase.icon}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[13px] text-quantum-text font-medium">{phase.title}</h3>
                    <p className="text-[12px] text-quantum-muted line-clamp-1">{phase.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-[10px] font-mono text-quantum-dim">
                    {completedInPhase}/{totalInPhase}
                  </span>
                  <div className="text-quantum-dim">
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </div>
                </div>
              </div>

              {/* Collapsible Lesson List */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-quantum-border/30 bg-[#0d0f11]/30 overflow-hidden"
                  >
                    <div className="p-4 flex flex-col gap-2">
                      {phase.lessonIds.map(id => {
                        const lesson = lessonsData.find(l => l.id === id)!;
                        const isCompleted = completedLessons.includes(id);
                        const isUnlocked = isLessonUnlocked(id);
                        
                        return (
                          <div
                            key={id}
                            onClick={() => handleLessonClick(lesson)}
                            className={`p-3 rounded-lg flex items-center justify-between border transition-all ${isUnlocked ? 'cursor-pointer border-quantum-border bg-quantum-card hover:bg-quantum-card-hover hover:border-quantum-border-hover' : 'opacity-40 cursor-not-allowed border-transparent bg-transparent'}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-mono text-quantum-blue uppercase min-w-[50px] shrink-0">
                                {lesson.id === 'l20' ? 'FINAL' : `L${lesson.id.replace('l', '').padStart(2, '0')}`}
                              </span>
                              <span className="text-[12px] text-quantum-text line-clamp-1">{lesson.title}</span>
                            </div>
                            
                            <div className="shrink-0 font-mono text-[10px]">
                              {isCompleted ? (
                                <span className="text-quantum-green flex items-center gap-1.5 font-semibold">
                                  <CheckCircle2 size={11} /> COMPLETED
                                </span>
                              ) : isUnlocked ? (
                                <span className="text-quantum-blue flex items-center gap-1.5 font-semibold">
                                  <PlayCircle size={11} /> START
                                </span>
                              ) : (
                                <span className="text-quantum-dim flex items-center gap-1.5">
                                  <Lock size={11} /> LOCKED
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
