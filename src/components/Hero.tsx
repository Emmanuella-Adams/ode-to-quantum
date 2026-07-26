import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Database } from 'lucide-react';
import { BlochSphere } from './BlochSphere';
import { ViewType } from './Navbar';

export function Hero({ setView, introDone = true }: { setView: (v: ViewType) => void, introDone?: boolean }) {
  return (
    <section className="flex flex-col items-center text-center pt-24 pb-16 relative min-h-[60vh] justify-center">
      <BlochSphere />
      
      <motion.div className="max-w-3xl flex flex-col items-center relative z-10 w-full">
        <motion.div 
          initial={{ opacity: introDone ? 1 : 0 }}
          animate={{ opacity: introDone ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="h-8 mb-6 flex items-center justify-center"
        >
          <div className="px-4 py-1.5 rounded-full border border-quantum-border bg-quantum-card/50 backdrop-blur-sm text-[11px] text-quantum-blue inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-quantum-blue shadow-[0_0_8px_var(--color-quantum-blue)] animate-pulse" />
            MISSION CONTROL INITIALIZED
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, filter: 'blur(12px)', scale: 0.95 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-quantum-text mb-8 leading-tight"
        >
          Ode to Quantum
        </motion.h1>
        
        <motion.div
          initial={{ opacity: introDone ? 1 : 0 }}
          animate={{ opacity: introDone ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center w-full"
        >
          <p className="text-[13px] text-quantum-muted max-w-xl mb-12 leading-relaxed">
            An Interactive Journey from Classical Computing to Quantum Machine Learning. Step onto the research vessel and explore the fundamentals of quantum mechanics through code and experimentation.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => setView('mission')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-quantum-text text-quantum-bg text-[12px] font-medium hover:bg-white transition-colors"
            >
              Begin Mission
              <ArrowRight size={13} />
            </button>
            
            <button 
              onClick={() => {
                document.getElementById('curriculum-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] border border-quantum-border bg-transparent text-quantum-text text-[12px] hover:bg-quantum-card transition-colors"
            >
              <BookOpen size={13} className="text-quantum-muted" />
              Explore Curriculum
            </button>

            <button 
              onClick={() => setView('notebook')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] border border-quantum-border bg-transparent text-quantum-text text-[12px] hover:bg-quantum-card transition-colors animate-none"
            >
              <Database size={13} className="text-quantum-muted" />
              Quantum Labs
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
