import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, BookOpen, Target, Lightbulb, Beaker, Terminal, CheckCircle2, ChevronRight, Eye, ShieldAlert, Sparkles, BookCheck, Download, Copy } from 'lucide-react';
import { lessonsData, Lesson } from '../data/lessonsData';
import { CodeBlock } from './CodeBlock';
import { MathRenderer } from './MathRenderer';
import { 
  WelcomeSimulator, 
  BitSimulator, 
  ClassicalLimitsSimulator, 
  QubitVisualizer, 
  BlochSphereExplorer, 
  SuperpositionPlayground, 
  MeasurementSimulator, 
  GatePlayground, 
  CircuitSimulator, 
  EntanglementExplorer, 
  VqeOptimizer, 
  QmlDecisionBoundary 
} from './Simulators';

interface MissionViewProps {
  activeLessonId: string;
  setActiveLessonId: (id: string) => void;
  completedLessons: string[];
  setCompletedLessons: React.Dispatch<React.SetStateAction<string[]>>;
  mathLensActive: boolean;
  onBack: () => void;
  onGraduate?: () => void;
}

export function MissionView({ 
  activeLessonId, 
  setActiveLessonId, 
  completedLessons, 
  setCompletedLessons, 
  mathLensActive, 
  onBack,
  onGraduate
}: MissionViewProps) {
  const lessonIndex = lessonsData.findIndex(l => l.id === activeLessonId);
  const lesson = lessonsData[lessonIndex] || lessonsData[0];

  // States
  const [widgetState, setWidgetState] = useState<any>({});
  const [challengeSuccess, setChallengeSuccess] = useState(false);
  const [notebookRunning, setNotebookRunning] = useState(false);
  const [notebookRan, setNotebookRan] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  
  const [codeText, setCodeText] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [executionOutput, setExecutionOutput] = useState('');
  const [executionError, setExecutionError] = useState(false);

  // Reset states when changing lesson
  useEffect(() => {
    setWidgetState({});
    setChallengeSuccess(false);
    setNotebookRunning(false);
    setNotebookRan(false);
    setSelectedAnswers({});
    setShowExplanation({});
    
    setCodeText(lesson.code.notebookCode || '');
    setShowHint(false);
    setShowSolution(false);
    setExecutionOutput('');
    setExecutionError(false);
  }, [activeLessonId]);

  // Check challenge verification on widget state change
  useEffect(() => {
    if (lesson.challenge.check(widgetState)) {
      setChallengeSuccess(true);
    }
  }, [widgetState, lesson]);

  const handleRunNotebook = () => {
    setNotebookRunning(true);
    setNotebookRan(false);
    
    setTimeout(() => {
      setNotebookRunning(false);
      setNotebookRan(true);
      
      const checkCode = lesson.code.checkCode;
      if (checkCode) {
        const passed = checkCode(codeText);
        if (passed) {
          setChallengeSuccess(true);
          setExecutionError(false);
          setExecutionOutput(lesson.code.simulatedOutput);
        } else {
          setExecutionError(true);
          setExecutionOutput("Qiskit Verification Error:\n--------------------------\nYour Qiskit code does not meet the mission specifications.\nMake sure you have implemented all requested quantum gates (e.g. qc.h(0), qc.cx(0,1)) or parameters.\n\nClick 'Get Hint' or 'Show Solution' if you get stuck.");
        }
      } else {
        // Fallback for welcoming/informational code
        setChallengeSuccess(true);
        setExecutionError(false);
        setExecutionOutput(lesson.code.simulatedOutput);
      }
    }, 1200);
  };

  const handleAnswerSelect = (qIdx: number, optIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    setShowExplanation(prev => ({ ...prev, [qIdx]: true }));
  };

  const markComplete = () => {
    if (!completedLessons.includes(lesson.id)) {
      setCompletedLessons(prev => [...prev, lesson.id]);
    }
  };

  const handleNext = () => {
    markComplete();
    if (lessonIndex < lessonsData.length - 1) {
      setActiveLessonId(lessonsData[lessonIndex + 1].id);
    } else if (onGraduate) {
      onGraduate();
    } else {
      onBack();
    }
  };

  const handlePrev = () => {
    if (lessonIndex > 0) {
      setActiveLessonId(lessonsData[lessonIndex - 1].id);
    }
  };

  // Render the appropriate widget
  const renderWidget = () => {
    switch (lesson.widgetType) {
      case 'welcome':
        return <WelcomeSimulator onStateChange={setWidgetState} />;
      case 'bit':
        return <BitSimulator onStateChange={setWidgetState} />;
      case 'classical-limits':
        return <ClassicalLimitsSimulator onStateChange={setWidgetState} />;
      case 'qubit':
        return <QubitVisualizer onStateChange={setWidgetState} />;
      case 'bloch':
        return <BlochSphereExplorer onStateChange={setWidgetState} />;
      case 'superposition':
        return <SuperpositionPlayground onStateChange={setWidgetState} />;
      case 'measurement':
        return <MeasurementSimulator onStateChange={setWidgetState} />;
      case 'gate':
        return <GatePlayground onStateChange={setWidgetState} />;
      case 'circuit':
        return <CircuitSimulator onStateChange={setWidgetState} />;
      case 'entanglement':
        return <EntanglementExplorer onStateChange={setWidgetState} />;
      case 'vqe':
        return <VqeOptimizer onStateChange={setWidgetState} activeLessonId={activeLessonId} />;
      case 'qml':
        return <QmlDecisionBoundary onStateChange={setWidgetState} />;
      default:
        return <div className="text-quantum-dim">Widget placeholder</div>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-24 pt-4">
      {/* Back button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[11px] text-quantum-muted hover:text-quantum-text self-start transition-colors font-mono tracking-wider"
      >
        <ArrowLeft size={12} />
        RETURN TO MISSION LOG
      </button>

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-quantum-border pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-[10px] text-quantum-blue font-medium tracking-widest uppercase">
            <span>Module {lesson.phaseId}</span>
            <span className="w-1 h-1 rounded-full bg-quantum-blue/50" />
            <span>Mission {lesson.id.replace('l', '').padStart(2, '0')}</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-light text-quantum-text tracking-tight">
            {lesson.title}
          </h1>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handlePrev}
            disabled={lessonIndex === 0}
            className="px-3 py-1.5 border border-quantum-border rounded text-[11px] text-quantum-muted hover:text-quantum-text disabled:opacity-30 transition-colors"
          >
            PREV MISSION
          </button>
          <button 
            onClick={handleNext}
            disabled={!challengeSuccess}
            className="px-3 py-1.5 border border-quantum-blue/20 bg-quantum-blue/5 hover:bg-quantum-blue/10 rounded text-[11px] text-quantum-blue hover:text-white disabled:opacity-30 transition-colors"
          >
            SKIP/NEXT
          </button>
        </div>
      </div>

      {/* Core Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: 8-Step Lesson content */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* STEP 1: STORY BRIEFING */}
          <section className="space-y-4">
            <h2 className="text-[12px] uppercase font-bold tracking-widest text-quantum-blue flex items-center gap-2">
              <Terminal size={13} />
              AI Story Log
            </h2>
            <div className="p-5 border border-quantum-border/80 bg-quantum-card/30 rounded-[14px] leading-relaxed text-[12px] italic text-quantum-text/90 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-quantum-blue" />
              <MathRenderer text={lesson.story} />
            </div>
          </section>

          {/* STEP 2: INTUITION */}
          <section className="space-y-4">
            <h2 className="text-[12px] uppercase font-bold tracking-widest text-quantum-text border-b border-quantum-border/40 pb-2 flex items-center gap-2">
              <BookOpen size={13} className="text-quantum-muted" />
              Intuition & Visual Concept
            </h2>
            <div className="text-[13px] text-quantum-muted space-y-4 leading-relaxed">
              {lesson.intuition.map((para, i) => (
                <p key={i}><MathRenderer text={para} /></p>
              ))}
            </div>
          </section>

          {/* STEP 3: PLAYGROUND SIMULATOR */}
          <section className="space-y-4">
            <h2 className="text-[12px] uppercase font-bold tracking-widest text-quantum-text border-b border-quantum-border/40 pb-2 flex items-center gap-2">
              <Beaker size={13} className="text-quantum-muted" />
              Interactive Playground
            </h2>
            <div>{renderWidget()}</div>
          </section>

          {/* STEP 4: CHALLENGE VERIFICATION */}
          <section className="space-y-4">
            <div className="p-5 rounded-[14px] border border-quantum-border bg-quantum-card/45 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex gap-4">
                <div className={`p-2.5 rounded-lg border shrink-0 ${challengeSuccess ? 'bg-quantum-green/10 border-quantum-green/30 text-quantum-green shadow-[0_0_10px_rgba(72,213,151,0.2)]' : 'bg-quantum-blue/10 border-quantum-blue/30 text-quantum-blue'}`}>
                  {challengeSuccess ? <CheckCircle2 size={18} /> : <Target size={18} />}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-quantum-text tracking-wide uppercase">Cadet Challenge Task</span>
                  <p className="text-[12px] text-quantum-muted leading-normal"><MathRenderer text={lesson.challenge.prompt} /></p>
                </div>
              </div>
              
              <div className="w-full sm:w-auto shrink-0 flex justify-end">
                {challengeSuccess ? (
                  <span className="text-[11px] text-quantum-green font-bold tracking-widest uppercase">VERIFIED</span>
                ) : (
                  <span className="text-[11px] text-quantum-dim tracking-widest uppercase">Awaiting solution</span>
                )}
              </div>
            </div>

            {challengeSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border border-quantum-green/30 bg-quantum-green/10 text-quantum-green rounded-lg text-[12px] leading-relaxed"
              >
                <Sparkles size={14} className="inline mr-2" />
                {lesson.challenge.successMessage}
              </motion.div>
            )}
          </section>

          {/* STEP 5: MATHEMATICS LAYER (Collapsible / Math Lens Mode) */}
          <section className="space-y-4">
            <h2 className="text-[12px] uppercase font-bold tracking-widest text-quantum-text border-b border-quantum-border/40 pb-2 flex items-center gap-2">
              <Eye size={13} className="text-quantum-muted" />
              Mathematical Derivation
            </h2>
            
            {mathLensActive ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-5 border border-quantum-blue/20 bg-quantum-blue/[0.02] rounded-[14px] space-y-4 font-mono text-[12px]"
              >
                {lesson.mathLens.dirac && (
                  <div className="flex items-center gap-3 border-b border-quantum-border/40 pb-2">
                    <span className="text-quantum-dim text-[10px] uppercase">Dirac Notation:</span>
                    <span className="text-quantum-blue font-bold text-[13px]"><MathRenderer text={lesson.mathLens.dirac} /></span>
                  </div>
                )}
                {lesson.mathLens.matrix && (
                  <div className="flex items-center gap-3 border-b border-quantum-border/40 pb-2">
                    <span className="text-quantum-dim text-[10px] uppercase">Matrix representation:</span>
                    <span className="text-quantum-green font-bold text-[13px]"><MathRenderer text={lesson.mathLens.matrix} /></span>
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <span className="text-quantum-dim text-[10px] uppercase block mb-1">Key Equations:</span>
                  {lesson.mathLens.equations.map((eq, i) => (
                    <div key={i} className="bg-quantum-card/40 border border-quantum-border p-2 rounded text-quantum-text">
                      <MathRenderer text={eq} />
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="p-4 border border-quantum-border rounded-[14px] bg-quantum-card/20 flex gap-3 text-[12px] text-quantum-dim items-center">
                <ShieldAlert size={14} className="shrink-0" />
                <span>Math Lens is disabled. Enable "Math Lens" in the top bar to inspect formal proofs, complex notations, and matrix representations.</span>
              </div>
            )}
          </section>

          {/* STEP 6: CODE NOTEBOOK */}
          <section className="space-y-4">
            <h2 className="text-[12px] uppercase font-bold tracking-widest text-quantum-text border-b border-quantum-border/40 pb-2 flex items-center gap-2">
              <Terminal size={13} className="text-quantum-muted" />
              Qiskit Code Sandbox
            </h2>

            <div className="border border-quantum-border rounded-[14px] overflow-hidden bg-[#0A0B0D]">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-quantum-border/60 bg-quantum-card/60">
                <span className="text-[10px] text-quantum-dim font-mono tracking-wider">JUPYTER NOTEBOOK CELL [1]</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const blob = new Blob([codeText], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `mission_${lesson.id}_qiskit.py`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="p-1.5 rounded bg-quantum-bg hover:bg-quantum-border text-quantum-muted hover:text-quantum-text transition-colors cursor-pointer"
                    title="Download Code"
                  >
                    <Download size={13} />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(codeText);
                      alert("Code copied to clipboard!");
                    }}
                    className="p-1.5 rounded bg-quantum-bg hover:bg-quantum-border text-quantum-muted hover:text-quantum-text transition-colors cursor-pointer"
                    title="Copy Code"
                  >
                    <Copy size={13} />
                  </button>
                  <div className="w-px h-4 bg-quantum-border mx-1" />
                  <button
                    onClick={handleRunNotebook}
                    disabled={notebookRunning}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-quantum-blue/10 border border-quantum-blue/30 text-quantum-blue text-[10px] hover:bg-quantum-blue/20 transition-all font-semibold cursor-pointer"
                  >
                    {notebookRunning ? 'Running...' : 'Run Cell'}
                  </button>
                </div>
              </div>

              <div className="p-4">
                <textarea
                  value={codeText}
                  onChange={(e) => setCodeText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Tab') {
                      e.preventDefault();
                      const start = e.currentTarget.selectionStart;
                      const end = e.currentTarget.selectionEnd;
                      const val = e.currentTarget.value;
                      const newVal = val.substring(0, start) + '    ' + val.substring(end);
                      setCodeText(newVal);
                      setTimeout(() => {
                        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 4;
                      }, 0);
                    }
                  }}
                  className="w-full h-44 bg-[#070809] border border-quantum-border/50 text-quantum-green font-mono text-[12px] p-4 rounded-lg focus:outline-none focus:border-quantum-blue/50 focus:ring-1 focus:ring-quantum-blue/20 leading-relaxed resize-y"
                  placeholder="# Write your Qiskit code here..."
                />
              </div>

              {/* Hints & Answers Section */}
              {(lesson.code.hint || lesson.code.solution) && (
                <div className="flex items-center gap-4 px-4 py-2 border-t border-quantum-border/40 bg-quantum-card/25 text-[11px] font-mono">
                  {lesson.code.hint && (
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="text-quantum-blue hover:text-quantum-blue/80 transition-colors font-medium flex items-center gap-1 cursor-pointer"
                    >
                      {showHint ? 'Hide Hint' : 'Get Hint'}
                    </button>
                  )}
                  {lesson.code.solution && (
                    <button
                      onClick={() => setShowSolution(!showSolution)}
                      className="text-quantum-dim hover:text-quantum-text transition-colors font-medium flex items-center gap-1 cursor-pointer"
                    >
                      {showSolution ? 'Hide Answer' : 'Show Answer'}
                    </button>
                  )}
                </div>
              )}

              {showHint && lesson.code.hint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-3.5 bg-quantum-blue/5 border-t border-quantum-blue/10 text-quantum-blue text-[11px] leading-relaxed flex gap-2 font-mono"
                >
                  <Lightbulb size={13} className="shrink-0 mt-0.5" />
                  <span><strong>Hint:</strong> {lesson.code.hint}</span>
                </motion.div>
              )}

              {showSolution && lesson.code.solution && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-3.5 bg-quantum-dim/5 border-t border-quantum-border/20 text-quantum-muted text-[11px] leading-relaxed font-mono"
                >
                  <span className="font-bold text-quantum-text uppercase block mb-1.5 text-[9px] tracking-wider">Correct Code Solution:</span>
                  <pre className="bg-[#050607] border border-quantum-border p-2.5 rounded font-mono text-[11px] text-quantum-text overflow-x-auto select-all leading-normal whitespace-pre">
                    {lesson.code.solution}
                  </pre>
                  <button
                    onClick={() => {
                      setCodeText(lesson.code.solution || '');
                      setShowSolution(false);
                    }}
                    className="mt-2 text-[10px] px-2.5 py-1 bg-quantum-blue/10 border border-quantum-blue/30 text-quantum-blue rounded hover:bg-quantum-blue/20 transition-all font-semibold cursor-pointer"
                  >
                    Paste Solution Into Editor
                  </button>
                </motion.div>
              )}

              {(notebookRunning || notebookRan) && (
                <div className="border-t border-quantum-border p-4 bg-[#050607] font-mono text-[11px]">
                  <span className="text-[9px] text-quantum-dim uppercase block mb-1.5 tracking-wider">Execution Console</span>
                  {notebookRunning ? (
                    <span className="text-quantum-blue animate-pulse">Processing quantum matrix states...</span>
                  ) : (
                    <pre className={`whitespace-pre-wrap leading-relaxed ${executionError ? 'text-red-400' : 'text-quantum-green'}`}>
                      {executionOutput}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* STEP 7: REFLECTIONS */}
          <section className="space-y-6">
            <h2 className="text-[12px] uppercase font-bold tracking-widest text-quantum-text border-b border-quantum-border/40 pb-2 flex items-center gap-2">
              <BookCheck size={13} className="text-quantum-muted" />
              Reflection Review
            </h2>

            <div className="flex flex-col gap-6">
              {lesson.reflections.map((q, qIdx) => {
                const selected = selectedAnswers[qIdx];
                const isChecked = showExplanation[qIdx];
                
                return (
                  <div key={qIdx} className="p-5 border border-quantum-border bg-quantum-card/20 rounded-[14px] flex flex-col gap-4">
                    <span className="text-[12px] text-quantum-text font-medium leading-relaxed">
                      Question {qIdx + 1}: <MathRenderer text={q.question} />
                    </span>
                    <div className="flex flex-col gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selected === optIdx;
                        const isCorrect = optIdx === q.answerIndex;
                        
                        let btnStyle = 'border-quantum-border hover:border-quantum-dim hover:bg-quantum-card-hover text-quantum-muted';
                        if (isSelected) {
                          btnStyle = isCorrect 
                            ? 'border-quantum-green text-quantum-green bg-quantum-green/5' 
                            : 'border-quantum-blue text-quantum-blue bg-quantum-blue/5';
                        } else if (isChecked && isCorrect) {
                          btnStyle = 'border-quantum-green text-quantum-green bg-quantum-green/5';
                        }
                        
                        return (
                          <button
                            key={optIdx}
                            onClick={() => !isChecked && handleAnswerSelect(qIdx, optIdx)}
                            className={`p-3 text-left rounded-lg border text-[12px] transition-all font-mono ${btnStyle}`}
                          >
                            <MathRenderer text={opt} />
                          </button>
                        );
                      })}
                    </div>

                    {isChecked && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 border rounded-lg text-[11px] leading-relaxed flex gap-3 ${selected === q.answerIndex ? 'border-quantum-green/30 bg-quantum-green/10 text-quantum-green' : 'border-quantum-blue/30 bg-quantum-blue/10 text-quantum-blue'}`}
                      >
                        <Lightbulb size={16} className="shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <span className="font-bold block uppercase tracking-wider text-[9px]">
                            {selected === q.answerIndex ? 'Correct Answer' : 'Review Explanation'}
                          </span>
                          <p className="text-quantum-text/90"><MathRenderer text={q.explanation} /></p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* STEP 8: SUMMARY */}
          <section className="space-y-4">
            <h2 className="text-[12px] uppercase font-bold tracking-widest text-quantum-text border-b border-quantum-border/40 pb-2 flex items-center gap-2">
              <CheckCircle2 size={13} className="text-quantum-muted" />
              Lesson Summary
            </h2>
            <ul className="space-y-2.5 text-[12px] text-quantum-muted pl-4 list-disc marker:text-quantum-blue">
              {lesson.summary.map((point, i) => (
                <li key={i} className="leading-relaxed"><MathRenderer text={point} /></li>
              ))}
            </ul>
          </section>

          {/* PROCEED PANEL */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-quantum-border">
            <span className="text-[11px] text-quantum-dim">
              {challengeSuccess ? '✓ Challenge solved successfully.' : '⚠ Solve the challenge to unlock graduation progression.'}
            </span>
            <button
              onClick={handleNext}
              disabled={!challengeSuccess}
              className="flex items-center gap-3 px-6 py-3 rounded-[12px] bg-quantum-text text-quantum-bg text-[12px] font-semibold hover:bg-white transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              Complete & Proceed
              <ChevronRight size={14} />
            </button>
          </div>

        </div>

        {/* Right Column: Objectives & Instrument panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-[14px] border border-quantum-border bg-quantum-card space-y-5">
            <h3 className="text-[11px] font-semibold text-quantum-text flex items-center gap-2 tracking-widest uppercase">
              <Target size={13} className="text-quantum-blue" />
              Objectives
            </h3>
            <ul className="space-y-4 text-[12px] text-quantum-muted">
              {lesson.intuition.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="text-quantum-dim mt-0.5 text-[9px] font-mono tracking-widest">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <span className="line-clamp-2"><MathRenderer text={item.replace(/\.$/, '')} /></span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-[14px] border border-quantum-border bg-quantum-card space-y-5">
            <h3 className="text-[11px] font-semibold text-quantum-text tracking-widest uppercase">Instrument Panel</h3>
            <div className="aspect-square w-full rounded-[10px] bg-[#0D0F11] border border-quantum-border flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(92,184,255,0.08),transparent_70%)]" />
              
              <div className="absolute inset-0 opacity-[0.04]">
                <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              </div>

              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 rounded-full border border-quantum-blue/20 border-dashed absolute"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full border border-quantum-green/15 absolute"
              />
              <div className="w-12 h-12 rounded-full bg-quantum-blue/10 flex items-center justify-center absolute backdrop-blur-md border border-quantum-blue/30 shadow-[0_0_20px_var(--color-quantum-blue)]">
                <span className="text-quantum-text text-[12px] font-medium font-mono">|ψ⟩</span>
              </div>
              <div className="absolute bottom-4 right-4 text-[9px] text-quantum-dim tracking-widest font-bold font-mono">
                CADET STATUS: READY
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
