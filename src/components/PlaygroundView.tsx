import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cpu, RotateCcw, Activity, Trash2, HelpCircle, Download, Copy, Play } from 'lucide-react';

type GateType = 'H' | 'X' | 'Y' | 'Z' | 'CX' | 'M' | null;

interface Complex {
  r: number;
  i: number;
}

export function PlaygroundView() {
  const [numQubits, setNumQubits] = useState(3);
  const numSlots = 8;
  
  // 2D grid: wires (qubits) x slots (time steps)
  const [grid, setGrid] = useState<GateType[][]>(() => 
    Array(3).fill(null).map(() => Array(numSlots).fill(null))
  );
  
  const [selectedGate, setSelectedGate] = useState<GateType>('H');
  const [probabilities, setProbabilities] = useState<number[]>(() => {
    const arr = Array(1 << 3).fill(0);
    arr[0] = 1;
    return arr;
  });
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Sandbox States
  const [sandboxCode, setSandboxCode] = useState(`# Qiskit Live Sandbox
from qiskit import QuantumCircuit
import numpy as np

# Create a 2-qubit Quantum Circuit
qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0, 1)

print("Circuit Representation:")
print(qc)`);
  const [sandboxConsole, setSandboxConsole] = useState('');
  const [sandboxRunning, setSandboxRunning] = useState(false);
  const [sandboxProbs, setSandboxProbs] = useState<number[]>([]);
  const [sandboxQubits, setSandboxQubits] = useState(0);

  // Safeguard Brush
  useEffect(() => {
    if (numQubits === 1 && selectedGate === 'CX') {
      setSelectedGate('H');
    }
  }, [numQubits]);

  // Initialize a state vector to |0...0>
  const initStateVector = (): Complex[] => {
    const size = 1 << numQubits;
    const sv: Complex[] = Array(size).fill(null).map(() => ({ r: 0, i: 0 }));
    sv[0].r = 1.0;
    return sv;
  };

  // Complex arithmetic helpers
  const add = (a: Complex, b: Complex): Complex => ({ r: a.r + b.r, i: a.i + b.i });
  const sub = (a: Complex, b: Complex): Complex => ({ r: a.r - b.r, i: a.i - b.i });
  const scale = (a: Complex, s: number): Complex => ({ r: a.r * s, i: a.i * s });

  // Apply single qubit gate
  const applySingleQubitGate = (sv: Complex[], gate: GateType, qubit: number): Complex[] => {
    if (!gate || gate === 'M' || gate === 'CX') return sv;
    
    const nextSv = [...sv.map(c => ({ ...c }))];
    const mask = 1 << qubit;
    const size = 1 << numQubits;

    for (let i = 0; i < size; i++) {
      if ((i & mask) === 0) {
        const idx0 = i;
        const idx1 = i | mask;
        const v0 = sv[idx0];
        const v1 = sv[idx1];

        if (gate === 'H') {
          nextSv[idx0] = scale(add(v0, v1), 1 / Math.sqrt(2));
          nextSv[idx1] = scale(sub(v0, v1), 1 / Math.sqrt(2));
        } else if (gate === 'X') {
          nextSv[idx0] = v1;
          nextSv[idx1] = v0;
        } else if (gate === 'Y') {
          nextSv[idx0] = { r: v1.i, i: -v1.r };
          nextSv[idx1] = { r: -v0.i, i: v0.r };
        } else if (gate === 'Z') {
          nextSv[idx0] = v0;
          nextSv[idx1] = scale(v1, -1);
        }
      }
    }
    return nextSv;
  };

  // Apply CX gate
  const applyCXGate = (sv: Complex[], controlQubit: number): Complex[] => {
    if (numQubits < 2) return sv;
    const nextSv = [...sv.map(c => ({ ...c }))];
    const targetQubit = (controlQubit + 1) % numQubits;
    
    const controlMask = 1 << controlQubit;
    const targetMask = 1 << targetQubit;
    const size = 1 << numQubits;

    for (let i = 0; i < size; i++) {
      if ((i & controlMask) !== 0 && (i & targetMask) === 0) {
        const idx0 = i;
        const idx1 = i | targetMask;
        
        const tmp = nextSv[idx0];
        nextSv[idx0] = nextSv[idx1];
        nextSv[idx1] = tmp;
      }
    }
    return nextSv;
  };

  // Run the full simulation of the grid
  const simulate = () => {
    let sv = initStateVector();

    // Iterate column by column (time steps)
    for (let col = 0; col < numSlots; col++) {
      // 1. Apply single qubit gates first
      for (let row = 0; row < numQubits; row++) {
        const gate = grid[row]?.[col];
        if (gate && gate !== 'CX' && gate !== 'M') {
          sv = applySingleQubitGate(sv, gate, row);
        }
      }

      // 2. Apply CX gates second
      for (let row = 0; row < numQubits; row++) {
        const gate = grid[row]?.[col];
        if (gate === 'CX') {
          sv = applyCXGate(sv, row);
        }
      }
    }

    // Calculate probabilities
    const probs = sv.map(c => c.r * c.r + c.i * c.i);
    setProbabilities(probs);
  };

  // Run simulation on grid modifications
  useEffect(() => {
    simulate();
  }, [grid, numQubits]);

  const handleCellClick = (row: number, col: number) => {
    const nextGrid = grid.map(r => [...r]);
    nextGrid[row][col] = nextGrid[row][col] === selectedGate ? null : selectedGate;
    setGrid(nextGrid);
  };

  const handleQubitsCountChange = (n: number) => {
    setNumQubits(n);
    setGrid(Array(n).fill(null).map(() => Array(numSlots).fill(null)));
  };

  const clearGrid = () => {
    setGrid(Array(numQubits).fill(null).map(() => Array(numSlots).fill(null)));
  };

  const handleRunSandbox = () => {
    setSandboxRunning(true);
    setSandboxConsole("Running simulation...");
    setTimeout(() => {
      try {
        const result = runMiniQiskitInterpreter(sandboxCode);
        setSandboxConsole(`${result.ascii}\n\nCounts:\n${JSON.stringify(result.counts, null, 2)}`);
        setSandboxProbs(result.probs);
        setSandboxQubits(result.numQubits);
      } catch (e: any) {
        setSandboxConsole(`Error: ${e.message}`);
      } finally {
        setSandboxRunning(false);
      }
    }, 600);
  };

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full pt-4 pb-20 font-mono">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-quantum-border pb-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-light tracking-tight flex items-center gap-3">
            <Cpu className="text-quantum-blue" size={24} />
            Quantum Circuit Builder & Live Sandbox
          </h1>
          <p className="text-[12px] text-quantum-muted">
            Select a gate, then click on the grid nodes to place gates on the wires. Select qubit counts from 1 to 4.
          </p>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-quantum-dim">
          <span className="flex items-center gap-1">
            <Activity size={12} className="text-quantum-green animate-pulse"/> SIMULATOR ACTIVE
          </span>
          <div className="flex items-center gap-2 border border-quantum-border px-3 py-1 rounded bg-quantum-bg/50">
            <span>Qubits:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(n => (
                <button
                  key={n}
                  onClick={() => handleQubitsCountChange(n)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${numQubits === n ? 'bg-quantum-blue/15 border border-quantum-blue/40 text-quantum-blue' : 'bg-quantum-card border border-quantum-border/60 text-quantum-dim hover:text-quantum-text hover:border-quantum-dim'}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Circuit Editor Grid */}
        <div className="lg:col-span-3 bg-quantum-card border border-quantum-border rounded-[14px] p-6 min-h-[380px] flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-quantum-border-hover">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="relative z-10 flex justify-between items-center mb-6">
            <h2 className="text-[10px] text-quantum-muted tracking-widest uppercase font-mono">Quantum Wire Canvas</h2>
            <button 
              onClick={clearGrid}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-quantum-border hover:border-quantum-blue hover:text-quantum-blue text-quantum-muted text-[11px] font-semibold transition-colors cursor-pointer"
            >
              <Trash2 size={12} /> Clear Canvas
            </button>
          </div>
          
          {/* Grid wires */}
          <div className="relative z-10 flex-grow flex flex-col justify-center gap-14 py-8">
             {grid.map((wire, rowIdx) => (
                <div key={rowIdx} className="flex items-center gap-4 w-full">
                  <div className="w-10 text-[11px] text-quantum-dim font-mono font-bold text-right pr-2">q[{rowIdx}]</div>
                  
                  <div className="h-px bg-quantum-border/80 flex-grow relative flex justify-around items-center">
                     {wire.map((gate, colIdx) => (
                       <div 
                         key={colIdx} 
                         onClick={() => handleCellClick(rowIdx, colIdx)}
                         className="w-10 h-10 flex items-center justify-center relative cursor-pointer group"
                       >
                         <div className="absolute w-8 h-8 rounded border border-dashed border-quantum-border/40 group-hover:border-quantum-blue/50 bg-[#0a0b0d]/50 transition-colors z-0" />
                         
                         {gate === 'CX' && (
                           <div className="absolute top-10 w-2 h-10 bg-quantum-blue/20 z-0 pointer-events-none" />
                         )}

                         {gate && (
                           <motion.div 
                             initial={{ scale: 0.8, opacity: 0 }}
                             animate={{ scale: 1, opacity: 1 }}
                             className={`w-9 h-9 border font-bold text-xs flex items-center justify-center rounded-sm z-10 shadow-[0_0_8px_rgba(0,0,0,0.3)] transition-all ${
                               gate === 'H' ? 'bg-quantum-blue/15 border-quantum-blue text-quantum-blue' :
                               gate === 'X' ? 'bg-quantum-green/15 border-quantum-green text-quantum-green' :
                               gate === 'CX' ? 'bg-[#7c3aed]/15 border-[#7c3aed] text-purple-400' :
                               gate === 'M' ? 'bg-quantum-dim/15 border-quantum-dim text-quantum-muted' :
                               'bg-quantum-card border-quantum-border text-quantum-text'
                             }`}
                           >
                             {gate}
                           </motion.div>
                         )}
                       </div>
                     ))}
                  </div>
                </div>
             ))}
          </div>

          <div className="text-[10px] text-quantum-dim flex gap-2 items-center bg-[#0d0f11]/30 p-2.5 rounded border border-quantum-border/30">
            <HelpCircle size={12} className="text-quantum-blue shrink-0" />
            <span>Note: CX acts as a controlled-NOT gate. The control qubit is the wire placed on, targeting the wire below (wraps around).</span>
          </div>
        </div>

        {/* Right Column: Tool Palette */}
        <div className="lg:col-span-1">
          <div className="bg-quantum-card border border-quantum-border rounded-[14px] p-5 flex flex-col gap-4 h-full transition-all duration-300 hover:border-quantum-border-hover">
            <h3 className="text-[10px] text-quantum-muted tracking-widest uppercase border-b border-quantum-border pb-2 font-mono">Gate Palette</h3>
            
            <div className="grid grid-cols-2 gap-3">
               {(['H', 'X', 'Y', 'Z', 'CX', 'M'] as const).map(gate => {
                 const isDisabled = gate === 'CX' && numQubits === 1;
                 return (
                   <button 
                     key={gate} 
                     disabled={isDisabled}
                     onClick={() => !isDisabled && setSelectedGate(gate)}
                     className={`h-11 border flex flex-col items-center justify-center rounded font-semibold text-[11px] transition-all cursor-pointer ${
                       isDisabled 
                         ? 'opacity-30 cursor-not-allowed border-quantum-border/20 bg-quantum-card/50 text-quantum-dim' 
                         : selectedGate === gate 
                           ? 'border-quantum-blue bg-quantum-blue/10 text-quantum-blue shadow-[0_0_8px_rgba(92,184,255,0.15)] font-bold' 
                           : 'border-quantum-border/60 bg-quantum-bg text-quantum-muted hover:border-quantum-dim hover:text-quantum-text'
                     }`}
                   >
                     <span className="text-[12px]">{gate}</span>
                     <span className="text-[8px] text-quantum-dim uppercase font-light">
                       {gate === 'H' && 'Superpos'}
                       {gate === 'X' && 'Not'}
                       {gate === 'Y' && 'Y-Flip'}
                       {gate === 'Z' && 'Phase'}
                       {gate === 'CX' && 'CNOT'}
                       {gate === 'M' && 'Measure'}
                     </span>
                   </button>
                 );
               })}
            </div>
            
            <div className="p-3 border border-quantum-border rounded bg-quantum-bg text-[11px] leading-relaxed text-quantum-muted mt-2">
              <span className="font-bold text-quantum-text block mb-1">Active Brush: {selectedGate}</span>
              {selectedGate === 'H' && 'Hadamard: Creates a superposition state.'}
              {selectedGate === 'X' && 'Pauli-X: Flips state bits (0 ↔ 1).'}
              {selectedGate === 'Y' && 'Pauli-Y: Flips state bits and relative phase.'}
              {selectedGate === 'Z' && 'Pauli-Z: Inverts phase of state |1⟩.'}
              {selectedGate === 'CX' && 'CNOT: Entangles wires control-target.'}
              {selectedGate === 'M' && 'Measurement: Collapses superposition.'}
            </div>
          </div>
        </div>

      </div>
      
      {/* Probabilities Output Panel */}
      <div className="bg-[#0D0F11] border border-quantum-border rounded-[14px] p-6 transition-all duration-300 hover:border-quantum-border-hover">
         <div className="flex justify-between items-center mb-6">
           <h3 className="text-[10px] text-quantum-muted tracking-widest uppercase font-mono">State Probabilities Distribution</h3>
           <span className="text-[10px] text-quantum-dim">Showing {1 << numQubits} Computational States ($|q_{numQubits-1}...q_0\rangle$)</span>
         </div>

         <div className="h-44 flex items-end gap-2 border-b border-l border-quantum-border/60 p-4 relative bg-[#070809]/40 rounded-sm overflow-x-auto custom-scrollbar">
             <div className="absolute -left-7 bottom-1/2 text-[9px] text-quantum-dim -rotate-90 tracking-widest">PROB</div>
             {probabilities.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-center gap-3 group h-full min-w-[30px]">
                   <div 
                     className={`w-full max-w-[40px] rounded-t-sm transition-all duration-500 relative ${
                       val > 0.01 
                         ? 'bg-quantum-blue shadow-[0_0_15px_var(--color-quantum-blue)] h-full' 
                         : 'bg-quantum-border/40 h-[4%]'
                     }`}
                     style={{ height: val > 0.01 ? `${val * 85}%` : '4%' }}
                   >
                      {val > 0.01 && (
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-quantum-blue font-mono">
                          {val.toFixed(2)}
                        </span>
                      )}
                   </div>
                   <span className="text-[10px] text-quantum-dim font-mono">
                     |{i.toString(2).padStart(numQubits, '0')}⟩
                   </span>
                </div>
             ))}
         </div>
      </div>

      {/* DEDICATED QISKIT CODE COMMAND SANDBOX */}
      <div className="bg-[#0D0F11] border border-quantum-border rounded-[14px] p-6 transition-all duration-300 hover:border-quantum-border-hover flex flex-col gap-6">
        <div>
          <h3 className="text-[11px] text-quantum-muted tracking-widest uppercase font-mono border-b border-quantum-border pb-2 flex items-center gap-2">
            <Cpu size={13} className="text-quantum-blue" />
            Qiskit Code Sandbox (Run Anything)
          </h3>
          <p className="text-[11px] text-quantum-dim mt-2 leading-relaxed">
            Write any Python Qiskit code. Create up to 4 qubits circuits, add gates, print the ASCII representation, and review the simulated counts distribution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Editor */}
          <div className="lg:col-span-7 flex flex-col border border-quantum-border rounded-[10px] overflow-hidden bg-[#0A0B0D]">
            <div className="flex items-center justify-between px-4 py-2 border-b border-quantum-border/60 bg-quantum-card/60">
              <span className="text-[10px] text-quantum-dim font-mono tracking-wider">WORKSPACE_PLAYGROUND.PY</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const blob = new Blob([sandboxCode], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `playground_qiskit.py`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="p-1 rounded bg-quantum-bg hover:bg-quantum-border text-quantum-muted hover:text-quantum-text transition-colors cursor-pointer"
                  title="Download Script"
                >
                  <Download size={12} />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(sandboxCode);
                    alert("Script copied to clipboard!");
                  }}
                  className="p-1 rounded bg-quantum-bg hover:bg-quantum-border text-quantum-muted hover:text-quantum-text transition-colors cursor-pointer"
                  title="Copy Script"
                >
                  <Copy size={12} />
                </button>
                <div className="w-px h-4 bg-quantum-border mx-1" />
                <button
                  onClick={handleRunSandbox}
                  disabled={sandboxRunning}
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-quantum-blue/10 border border-quantum-blue/30 text-quantum-blue text-[10px] hover:bg-quantum-blue/20 transition-all font-semibold cursor-pointer"
                >
                  <Play size={10} fill="currentColor" /> {sandboxRunning ? 'Running...' : 'Run Code'}
                </button>
              </div>
            </div>

            <textarea
              value={sandboxCode}
              onChange={(e) => setSandboxCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Tab') {
                  e.preventDefault();
                  const start = e.currentTarget.selectionStart;
                  const end = e.currentTarget.selectionEnd;
                  const val = e.currentTarget.value;
                  const newVal = val.substring(0, start) + '    ' + val.substring(end);
                  setSandboxCode(newVal);
                  setTimeout(() => {
                    e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 4;
                  }, 0);
                }
              }}
              className="w-full h-72 bg-[#070809] text-quantum-green font-mono text-[12px] p-4 focus:outline-none focus:ring-0 leading-relaxed resize-y border-0"
              placeholder="# Enter custom Qiskit Python script here..."
            />
          </div>

          {/* Console */}
          <div className="lg:col-span-5 flex flex-col border border-quantum-border rounded-[10px] overflow-hidden bg-[#050607]">
            <div className="flex items-center px-4 py-2 border-b border-quantum-border/60 bg-[#0A0B0D] text-[10px] text-quantum-dim font-mono tracking-wider">
              EXECUTION CONSOLE & LOGS
            </div>
            
            <pre className="flex-grow p-4 font-mono text-[10px] text-quantum-green overflow-auto whitespace-pre-wrap max-h-72 leading-relaxed">
              {sandboxConsole || "# Console ready. Run your script to see printed circuits and counts outputs."}
            </pre>
          </div>
        </div>

        {/* Sandbox Output Chart */}
        {sandboxProbs.length > 0 && (
          <div className="border border-quantum-border rounded-[10px] p-4 bg-[#070809]/40 mt-2 flex flex-col gap-4">
            <h4 className="text-[10px] text-quantum-dim font-mono uppercase tracking-wider">Sandbox Output Probabilities</h4>
            <div className="h-28 flex items-end gap-1.5 border-b border-l border-quantum-border/40 p-2 relative">
              {sandboxProbs.map((val, i) => (
                <div key={i} className="flex-grow flex flex-col justify-end items-center gap-2 group h-full">
                  <div 
                    className={`w-full max-w-[32px] rounded-t-sm transition-all duration-300 ${val > 0.01 ? 'bg-quantum-green shadow-[0_0_8px_var(--color-quantum-green)]' : 'bg-quantum-border/20 h-1'}`}
                    style={{ height: val > 0.01 ? `${val * 80}%` : '4%' }}
                  />
                  <span className="text-[8px] text-quantum-dim font-mono">
                    |{i.toString(2).padStart(sandboxQubits, '0')}⟩
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

// ==========================================
// CLIENT-SIDE MINI QISKIT INTERPRETER
// ==========================================
function runMiniQiskitInterpreter(code: string) {
  const lines = code.split('\n');
  let numQubits = 2;
  const gates: { type: string; qubits: number[]; param?: string }[] = [];

  for (let line of lines) {
    line = line.trim();
    if (line.startsWith('#') || line === '') continue;

    // Detect QuantumCircuit initialization
    const qcMatch = line.match(/qc\s*=\s*QuantumCircuit\((\d+)\)/);
    if (qcMatch) {
      numQubits = parseInt(qcMatch[1]);
      if (numQubits < 1 || numQubits > 4) {
        throw new Error("Local simulator limit: QuantumCircuit size must be between 1 and 4 qubits.");
      }
      continue;
    }

    // Detect gates
    const hMatch = line.match(/qc\.h\((\d+)\)/);
    if (hMatch) {
      gates.push({ type: 'H', qubits: [parseInt(hMatch[1])] });
      continue;
    }
    const xMatch = line.match(/qc\.x\((\d+)\)/);
    if (xMatch) {
      gates.push({ type: 'X', qubits: [parseInt(xMatch[1])] });
      continue;
    }
    const yMatch = line.match(/qc\.y\((\d+)\)/);
    if (yMatch) {
      gates.push({ type: 'Y', qubits: [parseInt(yMatch[1])] });
      continue;
    }
    const zMatch = line.match(/qc\.z\((\d+)\)/);
    if (zMatch) {
      gates.push({ type: 'Z', qubits: [parseInt(zMatch[1])] });
      continue;
    }
    const cxMatch = line.match(/qc\.cx\((\d+),\s*(\d+)\)/);
    if (cxMatch) {
      gates.push({ type: 'CX', qubits: [parseInt(cxMatch[1]), parseInt(cxMatch[2])] });
      continue;
    }
    const ryMatch = line.match(/qc\.ry\((.*?),\s*(\d+)\)/);
    if (ryMatch) {
      gates.push({ type: 'RY', qubits: [parseInt(ryMatch[2])], param: ryMatch[1] });
      continue;
    }
  }

  // Simulate quantum state
  const size = 1 << numQubits;
  let sv: Complex[] = Array(size).fill(null).map(() => ({ r: 0, i: 0 }));
  sv[0].r = 1.0; // |0...0>

  const add = (a: Complex, b: Complex): Complex => ({ r: a.r + b.r, i: a.i + b.i });
  const sub = (a: Complex, b: Complex): Complex => ({ r: a.r - b.r, i: a.i - b.i });
  const scale = (a: Complex, s: number): Complex => ({ r: a.r * s, i: a.i * s });

  for (const gate of gates) {
    if (gate.type === 'H') {
      const q = gate.qubits[0];
      const mask = 1 << q;
      const nextSv = [...sv.map(c => ({ ...c }))];
      for (let i = 0; i < size; i++) {
        if ((i & mask) === 0) {
          const idx0 = i;
          const idx1 = i | mask;
          nextSv[idx0] = scale(add(sv[idx0], sv[idx1]), 1 / Math.sqrt(2));
          nextSv[idx1] = scale(sub(sv[idx0], sv[idx1]), 1 / Math.sqrt(2));
        }
      }
      sv = nextSv;
    } else if (gate.type === 'X') {
      const q = gate.qubits[0];
      const mask = 1 << q;
      const nextSv = [...sv.map(c => ({ ...c }))];
      for (let i = 0; i < size; i++) {
        if ((i & mask) === 0) {
          nextSv[i] = sv[i | mask];
          nextSv[i | mask] = sv[i];
        }
      }
      sv = nextSv;
    } else if (gate.type === 'Y') {
      const q = gate.qubits[0];
      const mask = 1 << q;
      const nextSv = [...sv.map(c => ({ ...c }))];
      for (let i = 0; i < size; i++) {
        if ((i & mask) === 0) {
          nextSv[i] = { r: sv[i | mask].i, i: -sv[i | mask].r };
          nextSv[i | mask] = { r: -sv[i].i, i: sv[i].r };
        }
      }
      sv = nextSv;
    } else if (gate.type === 'Z') {
      const q = gate.qubits[0];
      const mask = 1 << q;
      const nextSv = [...sv.map(c => ({ ...c }))];
      for (let i = 0; i < size; i++) {
        if ((i & mask) === 0) {
          nextSv[i | mask] = scale(sv[i | mask], -1);
        }
      }
      sv = nextSv;
    } else if (gate.type === 'CX') {
      const ctrl = gate.qubits[0];
      const target = gate.qubits[1];
      if (ctrl >= numQubits || target >= numQubits) continue;
      const ctrlMask = 1 << ctrl;
      const targetMask = 1 << target;
      const nextSv = [...sv.map(c => ({ ...c }))];
      for (let i = 0; i < size; i++) {
        if ((i & ctrlMask) !== 0 && (i & targetMask) === 0) {
          const idx0 = i;
          const idx1 = i | targetMask;
          const tmp = nextSv[idx0];
          nextSv[idx0] = nextSv[idx1];
          nextSv[idx1] = tmp;
        }
      }
      sv = nextSv;
    } else if (gate.type === 'RY') {
      const q = gate.qubits[0];
      if (q >= numQubits) continue;
      const angleStr = gate.param || "0";
      let angle = 0;
      if (angleStr.includes('np.pi') || angleStr.includes('pi')) {
        angle = Math.PI;
      } else {
        angle = parseFloat(angleStr) || 0;
      }
      const mask = 1 << q;
      const cosVal = Math.cos(angle / 2);
      const sinVal = Math.sin(angle / 2);
      const nextSv = [...sv.map(c => ({ ...c }))];
      for (let i = 0; i < size; i++) {
        if ((i & mask) === 0) {
          const idx0 = i;
          const idx1 = i | mask;
          const v0 = sv[idx0];
          const v1 = sv[idx1];
          nextSv[idx0] = {
            r: v0.r * cosVal - v1.r * sinVal,
            i: v0.i * cosVal - v1.i * sinVal
          };
          nextSv[idx1] = {
            r: v0.r * sinVal + v1.r * cosVal,
            i: v0.i * sinVal + v1.i * cosVal
          };
        }
      }
      sv = nextSv;
    }
  }

  const probs = sv.map(c => c.r * c.r + c.i * c.i);

  // Generate ASCII circuit layout
  let ascii = "Circuit Layout:\n";
  for (let q = 0; q < numQubits; q++) {
    let wire = `q_${q}: ──`;
    for (let colIdx = 0; colIdx < gates.length; colIdx++) {
      const gate = gates[colIdx];
      if (gate.qubits.includes(q)) {
        if (gate.type === 'CX') {
          if (gate.qubits[0] === q) wire += "──■──";
          else wire += "──X──";
        } else if (gate.type === 'RY') {
          wire += "─[Ry]─";
        } else {
          wire += `─[${gate.type}]─`;
        }
      } else {
        const hasCxAcross = gate.type === 'CX' && 
          Math.min(...gate.qubits) < q && 
          Math.max(...gate.qubits) > q;
        wire += hasCxAcross ? "──┼──" : "─────";
      }
    }
    wire += "──\n";
    ascii += wire;
  }

  // Generate counts (1024 shots)
  const counts: Record<string, number> = {};
  const totalShots = 1024;
  for (let i = 0; i < size; i++) {
    const prob = probs[i];
    const binaryState = i.toString(2).padStart(numQubits, '0');
    const shots = Math.round(prob * totalShots);
    if (shots > 0) {
      counts[`|${binaryState}⟩`] = shots;
    }
  }

  return {
    numQubits,
    probs,
    ascii,
    counts
  };
}
