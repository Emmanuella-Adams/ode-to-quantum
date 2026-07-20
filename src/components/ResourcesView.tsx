import { motion } from 'motion/react';
import { Book, Link2, Download, Video } from 'lucide-react';

export function ResourcesView() {
  const resources = [
    { title: "Quantum Computation and Quantum Information", type: "textbook", icon: <Book size={16}/> },
    { title: "Qiskit Documentation Archive", type: "link", icon: <Link2 size={16}/> },
    { title: "Linear Algebra Refresher", type: "video", icon: <Video size={16}/> },
    { title: "Bloch Sphere Simulator Offline", type: "download", icon: <Download size={16}/> },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full pt-4">
      <div className="border-b border-quantum-border pb-4">
        <h1 className="text-2xl font-light tracking-tight flex items-center gap-3">
          <Book className="text-quantum-green" size={24} />
          Mission Resources
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {resources.map((res, i) => (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            key={i}
            whileHover={{ x: 4 }}
            className="flex items-center justify-between p-5 bg-quantum-card border border-quantum-border hover:border-quantum-border-hover hover:bg-quantum-card-hover rounded-[12px] cursor-pointer transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="text-quantum-muted p-2 bg-quantum-bg border border-quantum-border rounded">
                {res.icon}
              </div>
              <h3 className="text-[13px] text-quantum-text">{res.title}</h3>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-quantum-dim px-2 py-1 bg-quantum-bg border border-quantum-border rounded">
              {res.type}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
