import { motion } from 'motion/react';
import { Info, Mail, Github, ExternalLink } from 'lucide-react';

export function AboutView() {
  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto w-full pt-4 pb-20">
      <div className="border-b border-quantum-border pb-4">
        <h1 className="text-2xl font-light tracking-tight flex items-center gap-3">
          <Info className="text-quantum-blue" size={24} />
          About the Mission
        </h1>
      </div>

      <div className="flex flex-col gap-8">
        <div className="p-6 md:p-8 bg-quantum-card border border-quantum-border rounded-[14px] leading-relaxed text-[13px] text-quantum-muted space-y-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <p>
            <strong className="text-quantum-text font-medium">Ode to Quantum</strong> is an interactive educational platform designed to bridge the gap between classical programming and quantum mechanics.
          </p>
          <p>
            Structured as a deep-space research vessel, the curriculum assumes no prior knowledge of quantum physics. Explorers begin their journey by understanding the fundamental limitations of classical bits before diving into the probabilistic nature of qubits, entanglement, and quantum interference.
          </p>
          <p>
            This platform integrates live simulations, allowing you to manipulate quantum circuits and visualize state vectors in real-time. Our mission is to make quantum machine learning accessible, intuitive, and mathematically rigorous.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => {
              // Scroll to curriculum
              document.getElementById('curriculum-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="p-4 border border-quantum-border bg-quantum-card hover:bg-quantum-border hover:text-quantum-text transition-all duration-300 rounded-[12px] flex items-center gap-3 cursor-pointer text-[12px] text-quantum-muted text-left w-full"
          >
            <Info size={14} />
            <span className="flex-grow">Mission Log Archive</span>
            <ExternalLink size={12} className="opacity-50" />
          </button>

          <a 
            href="https://github.com/Emmanuella-Adams/ode-to-quantum"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border border-quantum-border bg-quantum-card hover:bg-quantum-border hover:text-quantum-text transition-all duration-300 rounded-[12px] flex items-center gap-3 cursor-pointer text-[12px] text-quantum-muted"
          >
            <Github size={14} />
            <span className="flex-grow">Source Code Repository</span>
            <ExternalLink size={12} className="opacity-50" />
          </a>

          <a 
            href="mailto:emmanuellaadams5@gmail.com"
            className="p-4 border border-quantum-border bg-quantum-card hover:bg-quantum-border hover:text-quantum-text transition-all duration-300 rounded-[12px] flex items-center gap-3 cursor-pointer text-[12px] text-quantum-muted"
          >
            <Mail size={14} />
            <span className="flex-grow">Comms Channel</span>
            <ExternalLink size={12} className="opacity-50" />
          </a>
        </div>
      </div>
    </div>
  );
}
