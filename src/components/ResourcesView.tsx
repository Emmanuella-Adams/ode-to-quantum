import { motion } from 'motion/react';
import { Book, Link2, Download, Video, ExternalLink } from 'lucide-react';

export function ResourcesView() {
  const resources = [
    { 
      title: "Quantum Computation and Quantum Information", 
      type: "Textbook", 
      icon: <Book size={16}/>,
      url: "https://profmcruz.wordpress.com/wp-content/uploads/2017/08/quantum-computation-and-quantum-information-nielsen-chuang.pdf"
    },
    { 
      title: "Qiskit Documentation Archive", 
      type: "Documentation", 
      icon: <Link2 size={16}/>,
      url: "https://quantum.cloud.ibm.com/docs/en/guides"
    },
    { 
      title: "Essence of linear algebra", 
      type: "Video Series", 
      icon: <Video size={16}/>,
      url: "https://youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab&si=7DSzJss7D3AOsd8h"
    },
    { 
      title: "Bloch Sphere visual simulator", 
      type: "Simulator", 
      icon: <Download size={16}/>,
      url: "https://bloch.kherb.io/"
    },
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
          <motion.a
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            key={i}
            whileHover={{ x: 4 }}
            className="flex items-center justify-between p-5 bg-quantum-card border border-quantum-border hover:border-quantum-border-hover hover:bg-quantum-card-hover rounded-[12px] cursor-pointer transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="text-quantum-muted p-2 bg-quantum-bg border border-quantum-border rounded group-hover:text-quantum-green group-hover:border-quantum-green/30 transition-colors">
                {res.icon}
              </div>
              <h3 className="text-[13px] text-quantum-text group-hover:text-quantum-green transition-colors">{res.title}</h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-widest text-quantum-dim px-2 py-1 bg-quantum-bg border border-quantum-border rounded">
                {res.type}
              </span>
              <ExternalLink size={12} className="text-quantum-dim opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
