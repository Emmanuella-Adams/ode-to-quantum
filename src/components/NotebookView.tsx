import { useState } from 'react';
import { motion } from 'motion/react';
import { Database, Search, Download, Copy, Check, Play, Clock, Award, ExternalLink, Lock } from 'lucide-react';

interface Lab {
  number: string;
  title: string;
  description: string;
  stardate: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  time: string;
  status: 'Active' | 'Coming Soon';
  tech: string[];
  skills: string[];
  colabUrl: string;
  fileName: string;
}

export function NotebookView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const labs: Lab[] = [
    {
      number: "00",
      title: "Welcome to the Quantum Lab",
      description: "Get familiar with the Jupyter notebook environment, verify library installations, and run your first quantum circuit.",
      stardate: "Stardate 410.2",
      difficulty: "Easy",
      time: "15 mins",
      status: "Active",
      tech: ["Qiskit", "Python", "Jupyter"],
      skills: ["Env Setup", "Circuit Execution"],
      colabUrl: "https://colab.research.google.com/drive/1px09m6wY2UgRQ0f0bqi3DTMW-hqfENfg",
      fileName: "00_welcome_to_the_quantum_lab.ipynb"
    },
    {
      number: "01",
      title: "Bits, Qubits, and Quantum Language",
      description: "Programmatically compare classical operations with quantum state representations using Qiskit statevector simulators.",
      stardate: "Stardate 412.5",
      difficulty: "Easy",
      time: "30 mins",
      status: "Active",
      tech: ["Qiskit", "Python", "NumPy"],
      skills: ["Statevector Simulation", "Qubit Representation"],
      colabUrl: "https://colab.research.google.com/drive/1gvNIOtvOQbyASPif-DcO6S9mEhGZ8mHh",
      fileName: "01_bits_qubits_and_the_language_of_quantum.ipynb"
    },
    {
      number: "02",
      title: "Gates and Measurement",
      description: "Apply single-qubit rotation gates and study the probabilistic outcomes of measurements on the Bloch sphere.",
      stardate: "Stardate 415.8",
      difficulty: "Medium",
      time: "45 mins",
      status: "Active",
      tech: ["Qiskit", "Matplotlib"],
      skills: ["Quantum Gates (X, Y, Z, H)", "Measurement Operators"],
      colabUrl: "https://colab.research.google.com/drive/1Pxf0-z1D_o7AHf69vRH2RuJ75OI9DUiL",
      fileName: "02_gates_and_measurement.ipynb"
    },
    {
      number: "03",
      title: "Superposition",
      description: "Generate true quantum superposition, compute state vectors, and verify the Born rule mathematically.",
      stardate: "Stardate 418.1",
      difficulty: "Medium",
      time: "40 mins",
      status: "Active",
      tech: ["Qiskit", "NumPy"],
      skills: ["Hadamard Gate", "Probability Amplitude"],
      colabUrl: "https://colab.research.google.com/drive/1kY_qu4G4ToAK2u8JRPcMu-f5F8a5tVWU",
      fileName: "03_superposition.ipynb"
    },
    {
      number: "04",
      title: "Multi-Qubit Systems",
      description: "Build multi-qubit systems, analyze tensor products, and run circuits on simulated quantum registers.",
      stardate: "Stardate 421.4",
      difficulty: "Medium",
      time: "50 mins",
      status: "Active",
      tech: ["Qiskit", "Python"],
      skills: ["Tensor Products", "Multi-Qubit Gates"],
      colabUrl: "https://colab.research.google.com/drive/15wN2EhcxFgWNhtBmKxmJGR04G_ggc2Aw",
      fileName: "04_multi_qubit_systems.ipynb"
    },
    {
      number: "05",
      title: "Entanglement",
      description: "Create Bell states and verify Einstein-Podolsky-Rosen (EPR) correlation by measuring entangled pairs.",
      stardate: "Stardate 424.9",
      difficulty: "Hard",
      time: "55 mins",
      status: "Active",
      tech: ["Qiskit", "Matplotlib"],
      skills: ["Bell States", "CNOT Gate", "Entanglement Proof"],
      colabUrl: "https://colab.research.google.com/drive/1qTgxYdqN2HKxuh_-BZsnrgLPPZRRse34",
      fileName: "05_entanglement.ipynb"
    },
    {
      number: "06",
      title: "Quantum Teleportation",
      description: "Implement the three-qubit quantum teleportation protocol to transmit quantum states across registers.",
      stardate: "Stardate 428.3",
      difficulty: "Hard",
      time: "60 mins",
      status: "Active",
      tech: ["Qiskit", "NumPy"],
      skills: ["State Teleportation", "Deferred Measurement", "Bell Measurement"],
      colabUrl: "https://colab.research.google.com/drive/1wPpXzPG33O1YC6oOBuI5niJRRUdhs-ft",
      fileName: "06_quantum_teleportation.ipynb"
    },
    {
      number: "07",
      title: "Introduction to Quantum ML",
      description: "Encode classical datasets into quantum states and build your first variational quantum classifier.",
      stardate: "Stardate 432.0",
      difficulty: "Expert",
      time: "75 mins",
      status: "Active",
      tech: ["Qiskit", "QML", "PyTorch"],
      skills: ["Data Encoding", "Parameterized Circuits", "Hybrid Learning"],
      colabUrl: "https://colab.research.google.com/drive/1KpuvoCaRMFN18yrJJTTAIcjUpa3cyx4x?",
      fileName: "07_intro_to_quantum_machine_learning.ipynb"
    },
    {
      number: "08",
      title: "Quantum Phase Estimation",
      description: "Measure the eigenvalue phase of a unitary operator, the foundation for Shor's factoring algorithm.",
      stardate: "Stardate 435.6",
      difficulty: "Hard",
      time: "60 mins",
      status: "Coming Soon",
      tech: ["Qiskit", "NumPy"],
      skills: ["Phase Estimation", "Quantum Fourier Transform"],
      colabUrl: "",
      fileName: ""
    },
    {
      number: "09",
      title: "Grover's Search Algorithm",
      description: "Implement the quantum database search algorithm with quadratic speedup over classical search.",
      stardate: "Stardate 439.1",
      difficulty: "Hard",
      time: "75 mins",
      status: "Coming Soon",
      tech: ["Qiskit", "Python"],
      skills: ["Oracle Design", "Amplitude Amplification", "Phase Inversion"],
      colabUrl: "",
      fileName: ""
    },
    {
      number: "10",
      title: "Variational Quantum Eigensolver (VQE)",
      description: "Find the ground state energy of simple molecules using parameterized circuits and classical optimizers.",
      stardate: "Stardate 442.5",
      difficulty: "Expert",
      time: "90 mins",
      status: "Coming Soon",
      tech: ["Qiskit", "SciPy", "Chemistry"],
      skills: ["Hamiltonian Mapping", "Ansatz Optimization", "Expectation Values"],
      colabUrl: "",
      fileName: ""
    },
    {
      number: "11",
      title: "Quantum Convolutional Neural Networks",
      description: "Construct a quantum convolutional classifier (QCNN) to detect quantum phases of matter.",
      stardate: "Stardate 446.8",
      difficulty: "Expert",
      time: "120 mins",
      status: "Coming Soon",
      tech: ["Qiskit", "TensorFlow Quantum"],
      skills: ["Quantum Convolution", "Pooling Layers", "State Classification"],
      colabUrl: "",
      fileName: ""
    }
  ];

  const handleCopyLink = (url: string, index: number) => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 1500);
  };

  const filteredLabs = labs.filter(lab => 
    lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lab.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lab.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
    lab.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full pt-4 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-quantum-border pb-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-light tracking-tight flex items-center gap-3">
            <Database className="text-quantum-blue animate-pulse" size={24} />
            Quantum Labs
          </h1>
          <p className="text-[11px] text-quantum-dim">
            APPLY MISSION CONCEPTS THROUGH PRACTICAL CODING LABORATORY EXPERIMENTS.
          </p>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-quantum-dim" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter lab archives..." 
            className="bg-quantum-bg border border-quantum-border rounded-full pl-9 pr-4 py-1.5 text-[11px] text-quantum-text focus:outline-none focus:border-quantum-blue/50 w-full md:w-64 transition-colors font-mono"
          />
        </div>
      </div>

      {/* Labs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLabs.map((lab, i) => {
          const isActive = lab.status === 'Active';
          const isCopied = copiedIndex === i;
          
          return (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={isActive ? { y: -4 } : {}}
              key={i}
              className={`p-5 bg-quantum-card border border-quantum-border rounded-[16px] flex flex-col justify-between transition-all duration-300 relative ${isActive ? 'hover:border-quantum-blue/30 hover:bg-[#15171a] hover:shadow-[0_0_15px_rgba(0,180,216,0.08)]' : 'opacity-60'}`}
            >
              {/* Top Meta info */}
              <div>
                <div className="flex items-center justify-between mb-4 text-[10px] text-quantum-dim tracking-widest font-mono">
                  <span>{lab.stardate}</span>
                  <div className="flex items-center gap-2">
                    {/* Status Badge */}
                    <span className={`px-2 py-0.5 border rounded-full text-[9px] font-semibold tracking-wider ${isActive ? 'bg-quantum-green/10 border-quantum-green/30 text-quantum-green shadow-[0_0_5px_rgba(72,213,151,0.1)]' : 'bg-quantum-blue/5 border-quantum-border text-quantum-dim'}`}>
                      {lab.status.toUpperCase()}
                    </span>
                    <span className="text-quantum-blue font-bold">LAB {lab.number}</span>
                  </div>
                </div>

                {/* Lab Title */}
                <h3 className={`text-[14px] font-medium mb-3 tracking-wide transition-colors ${isActive ? 'text-quantum-text group-hover:text-quantum-blue' : 'text-quantum-muted'}`}>
                  {lab.title}
                </h3>

                {/* Info Pills */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-[10px] text-quantum-muted font-mono">
                  <div className="flex items-center gap-1.5">
                    <Award size={11} className="text-quantum-blue/70" />
                    <span>{lab.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={11} className="text-quantum-green/70" />
                    <span>{lab.time}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[12px] text-quantum-muted leading-relaxed mb-5 font-mono">
                  {lab.description}
                </p>

                {/* Skills Practiced */}
                <div className="mb-4">
                  <span className="text-[9px] uppercase tracking-wider text-quantum-dim block mb-1.5">Skills Practiced:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {lab.skills.map((skill, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded border border-quantum-border/60 bg-[#0d0f11] text-quantum-muted">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <span className="text-[9px] uppercase tracking-wider text-quantum-dim block mb-1.5">Technologies:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {lab.tech.map((t, idx) => (
                      <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-quantum-blue/5 border border-quantum-blue/20 text-quantum-blue font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-quantum-border/40">
                {isActive ? (
                  <>
                    {/* Launch in Colab */}
                    <a
                      href={lab.colabUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-[10px] bg-quantum-blue/10 hover:bg-quantum-blue/20 border border-quantum-blue/30 text-quantum-blue hover:text-white text-[11px] font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                    >
                      <Play size={11} />
                      Launch in Google Colab
                    </a>

                    <div className="grid grid-cols-2 gap-2">
                      {/* Download */}
                      <a
                        href={`/notebooks/${lab.fileName}`}
                        download={lab.fileName}
                        className="py-1.5 px-3 rounded-[8px] bg-quantum-card border border-quantum-border hover:border-quantum-dim text-quantum-muted hover:text-quantum-text text-[10px] flex items-center justify-center gap-1.5 transition-colors duration-200"
                      >
                        <Download size={11} />
                        Download
                      </a>

                      {/* Copy Link */}
                      <button
                        onClick={() => handleCopyLink(lab.colabUrl, i)}
                        className={`py-1.5 px-3 rounded-[8px] border text-[10px] flex items-center justify-center gap-1.5 transition-all duration-200 ${isCopied ? 'bg-quantum-green/10 border-quantum-green/30 text-quantum-green' : 'bg-quantum-card border-quantum-border hover:border-quantum-dim text-quantum-muted hover:text-quantum-text'}`}
                      >
                        {isCopied ? (
                          <>
                            <Check size={11} />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            Copy Link
                          </>
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="w-full py-3 rounded-[10px] bg-quantum-card border border-quantum-border/50 text-[10px] text-quantum-dim flex items-center justify-center gap-2 font-mono select-none">
                    <Lock size={11} />
                    LAB DETAILS CLASSIFIED (COMING SOON)
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
