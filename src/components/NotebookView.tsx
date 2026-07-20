import { motion } from 'motion/react';
import { Database, Search, FileText } from 'lucide-react';

export function NotebookView() {
  const notebooks = [
    { title: "Quantum Teleportation Protocol", tags: ["Qiskit", "Entanglement"], date: "Stardate 452.1" },
    { title: "Grover's Search Algorithm", tags: ["Search", "Oracle"], date: "Stardate 453.8" },
    { title: "Variational Quantum Eigensolver", tags: ["VQE", "Chemistry"], date: "Stardate 455.2" },
    { title: "Shor's Factoring", tags: ["Cryptography", "QFT"], date: "Stardate 458.9" },
    { title: "Quantum Error Correction", tags: ["Surface Code", "Fidelity"], date: "Stardate 461.3" },
    { title: "Quantum Random Number Generation", tags: ["Superposition", "Hardware"], date: "Stardate 465.0" },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full pt-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-quantum-border pb-4">
        <h1 className="text-2xl font-light tracking-tight flex items-center gap-3">
          <Database className="text-quantum-blue" size={24} />
          Notebook Library
        </h1>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-quantum-dim" />
          <input 
            type="text" 
            placeholder="Search archives..." 
            className="bg-quantum-bg border border-quantum-border rounded-full pl-9 pr-4 py-1.5 text-[12px] text-quantum-text focus:outline-none focus:border-quantum-blue/50 w-full md:w-64 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notebooks.map((nb, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            key={i}
            className="p-5 bg-quantum-card border border-quantum-border hover:border-quantum-border-hover hover:bg-quantum-card-hover hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] rounded-[14px] cursor-pointer group transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-quantum-bg border border-quantum-border rounded text-quantum-muted group-hover:text-quantum-blue group-hover:border-quantum-blue/30 transition-colors">
                <FileText size={16} />
              </div>
              <span className="text-[10px] text-quantum-dim tracking-widest">{nb.date}</span>
            </div>
            <h3 className="text-[14px] text-quantum-text mb-3 group-hover:text-quantum-blue transition-colors">{nb.title}</h3>
            <div className="flex gap-2">
              {nb.tags.map(tag => (
                <span key={tag} className="text-[10px] px-2 py-0.5 border border-quantum-border rounded bg-quantum-bg text-quantum-muted">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
