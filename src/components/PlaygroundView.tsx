import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cpu, RotateCcw, Activity, Trash2, HelpCircle } from 'lucide-react';

type GateType = 'H' | 'X' | 'Y' | 'Z' | 'CX' | 'M' | null;

interface Complex {
  r: number;
  i: number;
}

export function PlaygroundView() {
  const numQubits = 3;
  const numSlots = 8;
  
  // 2D grid: wires (qubits) x slots (time steps)
  const [grid, setGrid] = useState<GateType[][]>(() => 
    Array(numQubits).fill(null).map(() => Array(numSlots).fill(null))
  );
  
  const [selectedGate, setSelectedGate] = useState<GateType>('H');
  const [probabilities, setProbabilities] = useState<number[]>([1, 0, 0, 0, 0, 0, 0, 0]); // P(000) = 100%
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Initialize a 3-qubit state vector to |000>
  const initStateVector = (): Complex[] => {
    const sv: Complex[] = Array(8).fill(null).map(() => ({ r: 0, i: 0 }));
    sv[0].r = 1.0; // |000> state
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

    for (let i = 0; i < 8; i++) {
      if ((i & mask) === 0) {
        const idx0 = i;
        const idx1 = i | mask;
        const v0 = sv[idx0];
        const v1 = sv[idx1];

        if (gate === 'H') {
          // H|0> = (|0>+|1>)/sqrt(2), H|1> = (|0>-|1>)/sqrt(2)
          nextSv[idx0] = scale(add(v0, v1), 1 / Math.sqrt(2));
          nextSv[idx1] = scale(sub(v0, v1), 1 / Math.sqrt(2));
        } else if (gate === 'X') {
          // Bit flip
          nextSv[idx0] = v1;
          nextSv[idx1] = v0;
        } else if (gate === 'Y') {
          // Y|0> = i|1>, Y|1> = -i|0>
          // v0 -> -i * v1.r, v1 -> i * v0.r
          nextSv[idx0] = { r: v1.i, i: -v1.r };
          nextSv[idx1] = { r: -v0.i, i: v0.r };
        } else if (gate === 'Z') {
          // Phase flip
          nextSv[idx0] = v0;
          nextSv[idx1] = scale(v1, -1);
        }
      }
    }
    return nextSv;
  };

  // Apply CX gate (Control is current qubit, Target is (qubit + 1) % 3)
  const applyCXGate = (sv: Complex[], controlQubit: number): Complex[] => {
    const nextSv = [...sv.map(c => ({ ...c }))];
    const targetQubit = (controlQubit + 1) % 3;
    
    const controlMask = 1 << controlQubit;
    const targetMask = 1 << targetQubit;

    for (let i = 0; i < 8; i++) {
      // CX only triggers if control bit is 1
      if ((i & controlMask) !== 0 && (i & targetMask) === 0) {
        const idx0 = i;
        const idx1 = i | targetMask;
        
        // Swap target qubit values
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
        const gate = grid[row][col];
        if (gate && gate !== 'CX' && gate !== 'M') {
          sv = applySingleQubitGate(sv, gate, row);
        }
      }

      // 2. Apply CX gates second
      for (let row = 0; row < numQubits; row++) {
        const gate = grid[row][col];
        if (gate === 'CX') {
          sv = applyCXGate(sv, row);
        }
      }
    }

    // Calculate probabilities: P(i) = |amplitude|^2
    const probs = sv.map(c => c.r * c.r + c.i * c.i);
    setProbabilities(probs);
  };

  // Run simulation on grid modifications
  useEffect(() => {
    simulate();
  }, [grid]);

  const handleCellClick = (row: number, col: number) => {
    const nextGrid = grid.map(r => [...r]);
    nextGrid[row][col] = nextGrid[row][col] === selectedGate ? null : selectedGate;
    setGrid(nextGrid);
  };

  const clearGrid = () => {
    setGrid(Array(numQubits).fill(null).map(() => Array(numSlots).fill(null)));
  };

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full pt-4 pb-20">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-quantum-border pb-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-light tracking-tight flex items-center gap-3">
            <Cpu className="text-quantum-blue" size={24} />
            Quantum Circuit Builder
          </h1>
          <p className="text-[12px] text-quantum-muted">
            Drag and drop is disabled. Select a gate below, then click any grid node to place or remove gates.
          </p>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-quantum-dim">
          <span className="flex items-center gap-1">
            <Activity size={12} className="text-quantum-green animate-pulse"/> SIMULATOR ACTIVE
          </span>
          <span className="border border-quantum-border px-2 py-1 rounded bg-quantum-bg">Qubits: 3</span>
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-quantum-border hover:border-quantum-blue hover:text-quantum-blue text-quantum-muted text-[11px] font-semibold transition-colors"
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
                        {/* Interactive Click circle wrapper */}
                        <div className="absolute w-8 h-8 rounded border border-dashed border-quantum-border/40 group-hover:border-quantum-blue/50 bg-[#0a0b0d]/50 transition-colors z-0" />
                        
                        {/* CX Target node visualization on adjacent wire */}
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
            <span>Note: CX acts as a controlled-NOT gate. The control qubit is the wire placed on, targeting the wire below.</span>
          </div>
        </div>

        {/* Right Column: Tool Palette */}
        <div className="lg:col-span-1">
          <div className="bg-quantum-card border border-quantum-border rounded-[14px] p-5 flex flex-col gap-4 h-full transition-all duration-300 hover:border-quantum-border-hover">
            <h3 className="text-[10px] text-quantum-muted tracking-widest uppercase border-b border-quantum-border pb-2">Gate Palette</h3>
            
            <div className="grid grid-cols-2 gap-3">
               {(['H', 'X', 'Y', 'Z', 'CX', 'M'] as const).map(gate => (
                 <button 
                   key={gate} 
                   onClick={() => setSelectedGate(gate)}
                   className={`h-11 border flex flex-col items-center justify-center rounded font-semibold text-[11px] transition-all cursor-pointer ${
                     selectedGate === gate 
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
               ))}
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
           <span className="text-[10px] text-quantum-dim">Showing 8 Computational States ($|q_2 q_1 q_0\\rangle$)</span>
         </div>

         <div className="h-44 flex items-end gap-2 border-b border-l border-quantum-border/60 p-4 relative bg-[#070809]/40 rounded-sm">
             <div className="absolute -left-7 bottom-1/2 text-[9px] text-quantum-dim -rotate-90 tracking-widest">PROB</div>
             {probabilities.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-center gap-3 group h-full">
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
                     |{i.toString(2).padStart(3, '0')}⟩
                   </span>
                </div>
             ))}
         </div>
      </div>
    </div>
  );
}
