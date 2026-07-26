import { Terminal, Book, Cpu, Orbit, Database, Info, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

export type ViewType = 'home' | 'mission' | 'playground' | 'notebook' | 'resources' | 'about' | 'graduation';

interface NavbarProps {
  setView: (v: ViewType) => void;
  introDone?: boolean;
  mathLensActive: boolean;
  setMathLensActive: (active: boolean) => void;
}

export function Navbar({ setView, introDone = true, mathLensActive, setMathLensActive }: NavbarProps) {
  const navItems = [
    { label: 'Home', icon: <Terminal size={13} />, action: () => setView('home') },
    { label: 'Journey', icon: <Orbit size={13} />, action: () => setView('mission') },
    { label: 'Playground', icon: <Cpu size={13} />, action: () => setView('playground') },
    { label: 'Quantum Labs', icon: <Database size={13} />, action: () => setView('notebook') },
    { label: 'Resources', icon: <Book size={13} />, action: () => setView('resources') },
    { label: 'About', icon: <Info size={13} />, action: () => setView('about') },
  ];

  return (
    <motion.nav 
      initial={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : -20 }}
      animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : -20 }}
      transition={{ duration: 1.5 }}
      className="sticky top-0 z-50 w-full border-b border-quantum-border bg-quantum-bg/80 backdrop-blur-md"
    >
      <div className="container max-w-7xl mx-auto px-4 lg:px-6 h-auto min-h-16 py-3 lg:py-0 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setView('home')}
          >
            <div className="w-6 h-6 rounded-full border border-quantum-blue/30 flex items-center justify-center bg-quantum-blue/10 group-hover:bg-quantum-blue/20 transition-colors">
              <div className="w-2 h-2 rounded-full bg-quantum-blue shadow-[0_0_8px_var(--color-quantum-blue)]" />
            </div>
            <span className="font-semibold text-[12px] tracking-wider text-quantum-text">Ode to Quantum</span>
          </div>
          
          <div className="flex lg:hidden items-center gap-2 px-3 py-1 rounded-full border border-quantum-border bg-quantum-card text-[10px]">
            <div className="w-1.5 h-1.5 rounded-full bg-quantum-green shadow-[0_0_5px_var(--color-quantum-green)] animate-pulse" />
            <span className="text-quantum-muted">Telemetry Active</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-[12px] text-quantum-muted overflow-x-auto custom-scrollbar pb-1 lg:pb-0 whitespace-nowrap">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className="flex items-center gap-2 hover:text-quantum-text transition-colors"
            >
              <span className="opacity-50">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          {/* Math Lens Mode Toggle */}
          <button
            onClick={() => setMathLensActive(!mathLensActive)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${mathLensActive ? 'bg-quantum-blue/10 border-quantum-blue/30 text-quantum-blue' : 'bg-quantum-card border-quantum-border text-quantum-muted hover:border-quantum-dim'}`}
          >
            {mathLensActive ? <Eye size={12} /> : <EyeOff size={12} />}
            <span>{mathLensActive ? 'Math Lens Active' : 'Explorer Mode'}</span>
          </button>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-quantum-border bg-quantum-card">
            <div className="w-1.5 h-1.5 rounded-full bg-quantum-green shadow-[0_0_5px_var(--color-quantum-green)] animate-pulse" />
            <span className="text-quantum-muted">Telemetry Active</span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
