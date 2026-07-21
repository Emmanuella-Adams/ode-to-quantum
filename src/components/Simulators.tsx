import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, ShieldAlert, Cpu, Sparkles, Sliders, Zap, Check, Orbit, RefreshCw } from 'lucide-react';

interface SimulatorProps {
  onStateChange: (state: any) => void;
  activeLessonId?: string;
}

// ==========================================
// 1. WELCOME SIMULATOR
// ==========================================
export function WelcomeSimulator({ onStateChange }: SimulatorProps) {
  const [telemetryActive, setTelemetryActive] = useState(false);

  const handleToggle = () => {
    const next = !telemetryActive;
    setTelemetryActive(next);
    onStateChange({ telemetryActive: next });
  };

  return (
    <div className="flex flex-col gap-6 p-6 border border-quantum-border bg-[#0D0F11] rounded-[14px]">
      <div className="flex items-center justify-between">
        <h4 className="text-[11px] text-quantum-muted tracking-widest uppercase">Telemetry Initialization</h4>
        <span className={`text-[10px] px-2.5 py-0.5 rounded-full border ${telemetryActive ? 'bg-quantum-green/10 border-quantum-green/30 text-quantum-green' : 'bg-quantum-dim/10 border-quantum-border text-quantum-dim'}`}>
          {telemetryActive ? 'LINK ACTIVE' : 'DISCONNECTED'}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center py-8 gap-6 border border-quantum-border/40 rounded-lg bg-quantum-card/30">
        <div className="relative">
          <motion.div
            animate={telemetryActive ? { rotate: 360 } : {}}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className={`w-20 h-20 rounded-full border border-dashed flex items-center justify-center transition-colors ${telemetryActive ? 'border-quantum-blue text-quantum-blue shadow-[0_0_15px_rgba(92,184,255,0.2)]' : 'border-quantum-dim/30 text-quantum-dim'}`}
          >
            <Orbit size={28} />
          </motion.div>
          {telemetryActive && (
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-quantum-green border-2 border-[#0D0F11]" />
          )}
        </div>
        <p className="text-[12px] text-center text-quantum-muted max-w-xs">
          {telemetryActive 
            ? 'Vessel transceiver connected. Ship systems monitoring parameters, real-time diagnostic channels online.' 
            : 'Click the toggle below to authorize telemetry connection and boot quantum coprocessor.'}
        </p>
        <button
          onClick={handleToggle}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-[12px] text-[12px] font-medium transition-colors ${telemetryActive ? 'bg-quantum-blue/10 border border-quantum-blue/30 text-quantum-blue hover:bg-quantum-blue/20' : 'bg-quantum-text text-quantum-bg hover:bg-white'}`}
        >
          {telemetryActive ? 'Disconnect Link' : 'Establish Link'}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 2. BIT SIMULATOR
// ==========================================
export function BitSimulator({ onStateChange }: SimulatorProps) {
  const [bit1, setBit1] = useState<0 | 1>(0);
  const [bit2, setBit2] = useState<0 | 1>(0);
  const [gate, setGate] = useState<'AND' | 'OR' | 'XOR' | 'NOT'>('AND');

  const calculateOutput = (b1: number, b2: number, g: string): 0 | 1 => {
    switch (g) {
      case 'AND': return (b1 === 1 && b2 === 1) ? 1 : 0;
      case 'OR': return (b1 === 1 || b2 === 1) ? 1 : 0;
      case 'XOR': return (b1 !== b2) ? 1 : 0;
      case 'NOT': return b1 === 1 ? 0 : 1;
      default: return 0;
    }
  };

  const output = calculateOutput(bit1, bit2, gate);

  const updateState = (b1: 0 | 1, b2: 0 | 1, g: 'AND' | 'OR' | 'XOR' | 'NOT') => {
    setBit1(b1);
    setBit2(b2);
    setGate(g);
    onStateChange({ bit1: b1, bit2: b2, gate: g, output: calculateOutput(b1, b2, g) });
  };

  return (
    <div className="flex flex-col gap-6 p-6 border border-quantum-border bg-[#0D0F11] rounded-[14px]">
      <div className="flex justify-between items-center border-b border-quantum-border/50 pb-3">
        <h4 className="text-[11px] text-quantum-muted tracking-widest uppercase">Classical Logic Gate Simulator</h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* INPUTS */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 p-3 border border-quantum-border rounded-lg bg-quantum-card/25">
            <span className="text-[10px] text-quantum-dim">INPUT BIT 1</span>
            <div className="flex items-center justify-between">
              <span className={`text-lg font-bold ${bit1 ? 'text-quantum-blue' : 'text-quantum-dim'}`}>{bit1}</span>
              <button 
                onClick={() => updateState(bit1 === 1 ? 0 : 1, bit2, gate)}
                className="px-3 py-1 rounded bg-quantum-card border border-quantum-border text-[11px] hover:border-quantum-dim hover:text-quantum-text transition-colors"
              >
                TOGGLE
              </button>
            </div>
          </div>
          <div className={`flex flex-col gap-2 p-3 border border-quantum-border rounded-lg bg-quantum-card/25 transition-opacity ${gate === 'NOT' ? 'opacity-40 pointer-events-none' : ''}`}>
            <span className="text-[10px] text-quantum-dim">INPUT BIT 2</span>
            <div className="flex items-center justify-between">
              <span className={`text-lg font-bold ${bit2 ? 'text-quantum-blue' : 'text-quantum-dim'}`}>{bit2}</span>
              <button 
                onClick={() => updateState(bit1, bit2 === 1 ? 0 : 1, gate)}
                className="px-3 py-1 rounded bg-quantum-card border border-quantum-border text-[11px] hover:border-quantum-dim hover:text-quantum-text transition-colors"
              >
                TOGGLE
              </button>
            </div>
          </div>
        </div>

        {/* LOGIC GATE SELECTOR */}
        <div className="flex flex-col gap-2 border border-quantum-border p-4 rounded-lg bg-quantum-card/30 items-center justify-center">
          <span className="text-[10px] text-quantum-dim tracking-wider">SELECT GATE</span>
          <div className="grid grid-cols-2 gap-2 w-full">
            {(['AND', 'OR', 'XOR', 'NOT'] as const).map((g) => (
              <button
                key={g}
                onClick={() => updateState(bit1, bit2, g)}
                className={`py-2 text-[11px] font-semibold rounded border transition-colors ${gate === g ? 'bg-quantum-blue/10 border-quantum-blue text-quantum-blue' : 'bg-quantum-bg border-quantum-border/50 text-quantum-muted hover:border-quantum-dim'}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* OUTPUT */}
        <div className="flex flex-col items-center justify-center p-6 border border-quantum-border rounded-lg bg-quantum-card/40 h-full">
          <span className="text-[10px] text-quantum-dim tracking-wider mb-2">OUTPUT</span>
          <motion.div
            key={output}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-16 h-16 rounded-full border flex items-center justify-center text-xl font-bold shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-all ${output ? 'border-quantum-green bg-quantum-green/10 text-quantum-green shadow-[0_0_20px_rgba(72,213,151,0.2)]' : 'border-quantum-dim/40 bg-quantum-bg text-quantum-dim'}`}
          >
            {output}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. CLASSICAL LIMITS SIMULATOR
// ==========================================
export function ClassicalLimitsSimulator({ onStateChange }: SimulatorProps) {
  const [variables, setVariables] = useState<number>(3);
  const [classicalSteps, setClassicalSteps] = useState(0);
  const [quantumSteps, setQuantumSteps] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [runCompleted, setRunCompleted] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startSimulation = () => {
    if (animating) return;
    setAnimating(true);
    setClassicalSteps(0);
    setQuantumSteps(0);
    setRunCompleted(false);

    const totalClassical = Math.pow(2, variables);
    const totalQuantum = Math.round(Math.sqrt(totalClassical));
    
    let currentClassical = 0;
    
    // We update in intervals to show sequential checking
    const speed = Math.max(5, 500 / totalClassical); // faster for larger variables
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      currentClassical += Math.ceil(totalClassical / 50); // step up
      if (currentClassical >= totalClassical) {
        currentClassical = totalClassical;
        setClassicalSteps(totalClassical);
        setQuantumSteps(totalQuantum);
        setAnimating(false);
        setRunCompleted(true);
        onStateChange({ variables, runCompleted: true });
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        setClassicalSteps(currentClassical);
        setQuantumSteps(Math.round(Math.sqrt(currentClassical)));
      }
    }, speed);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6 border border-quantum-border bg-[#0D0F11] rounded-[14px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-quantum-border/50 pb-3">
        <h4 className="text-[11px] text-quantum-muted tracking-widest uppercase">Combinatorial Explosion Diagnostic</h4>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-quantum-muted">Variables (N):</span>
          <input 
            type="range" 
            min="2" 
            max="12" 
            value={variables}
            disabled={animating}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setVariables(val);
              setClassicalSteps(0);
              setQuantumSteps(0);
              setRunCompleted(false);
            }}
            className="w-24 accent-quantum-blue bg-quantum-bg h-1 rounded-lg cursor-pointer"
          />
          <span className="text-[12px] font-bold text-quantum-blue w-6">{variables}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border border-quantum-border rounded-lg bg-quantum-card/20 flex flex-col gap-3">
          <div className="flex items-center justify-between text-[11px] text-quantum-dim">
            <span>CLASSICAL PROCESSOR (Sequential)</span>
            <span className="text-quantum-text font-bold">O(2^N) steps</span>
          </div>
          <div className="h-32 flex flex-col items-center justify-center border border-quantum-border/50 rounded bg-[#0A0B0D] relative overflow-hidden">
            <span className="text-2xl font-bold text-quantum-dim">{classicalSteps.toLocaleString()}</span>
            <span className="text-[10px] text-quantum-dim mt-2">Steps Evaluated</span>
            {animating && (
              <div className="absolute bottom-0 left-0 h-1 bg-quantum-dim animate-pulse" style={{ width: `${(classicalSteps / Math.pow(2, variables)) * 100}%` }} />
            )}
          </div>
        </div>

        <div className="p-4 border border-quantum-border rounded-lg bg-quantum-card/20 flex flex-col gap-3">
          <div className="flex items-center justify-between text-[11px] text-quantum-blue">
            <span>QUANTUM COPROCESSOR (Grover Search)</span>
            <span className="text-quantum-blue font-bold">O(√2^N) steps</span>
          </div>
          <div className="h-32 flex flex-col items-center justify-center border border-quantum-blue/30 rounded bg-[#0A0B0D] relative overflow-hidden">
            <span className="text-2xl font-bold text-quantum-blue shadow-[0_0_10px_rgba(92,184,255,0.1)]">{quantumSteps.toLocaleString()}</span>
            <span className="text-[10px] text-quantum-blue mt-2">Steps Evaluated</span>
            {animating && (
              <div className="absolute bottom-0 left-0 h-1 bg-quantum-blue shadow-[0_0_10px_var(--color-quantum-blue)]" style={{ width: `${(quantumSteps / Math.round(Math.sqrt(Math.pow(2, variables)))) * 100}%` }} />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-[11px] text-quantum-dim max-w-sm">
          Search Space: <span className="text-quantum-text font-bold">{Math.pow(2, variables).toLocaleString()} configurations</span>. 
          {runCompleted && (
            <span> Quantum is <span className="text-quantum-green font-bold">{Math.round(Math.pow(2, variables) / Math.max(1, quantumSteps))}x faster</span>!</span>
          )}
        </div>
        <button
          onClick={startSimulation}
          disabled={animating}
          className="flex items-center gap-2 px-5 py-2 rounded-[12px] bg-quantum-text text-quantum-bg hover:bg-white disabled:opacity-50 text-[12px] font-semibold transition-colors"
        >
          {animating ? 'Evaluating...' : 'Run Diagnostics'}
          <Play size={12} fill="currentColor" />
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 4. QUBIT VISUALIZER
// ==========================================
export function QubitVisualizer({ onStateChange }: SimulatorProps) {
  const [prob1, setProb1] = useState(0.0);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const p1 = parseFloat(e.target.value);
    setProb1(p1);
    onStateChange({ prob1: p1, prob0: 1 - p1 });
  };

  const prob0 = 1 - prob1;
  const alpha = Math.sqrt(prob0).toFixed(3);
  const beta = Math.sqrt(prob1).toFixed(3);

  return (
    <div className="flex flex-col gap-6 p-6 border border-quantum-border bg-[#0D0F11] rounded-[14px]">
      <div className="flex justify-between items-center border-b border-quantum-border/50 pb-3">
        <h4 className="text-[11px] text-quantum-muted tracking-widest uppercase">Qubit Probability Amplitudes</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex flex-col gap-4">
          <div className="p-4 border border-quantum-border rounded-lg bg-quantum-card/25 flex flex-col gap-2">
            <span className="text-[10px] text-quantum-dim uppercase tracking-wider">State Vector |ψ⟩ representation</span>
            <div className="text-lg font-bold text-quantum-text flex items-center gap-2 font-mono">
              <span>|ψ⟩ = </span>
              <span className="text-quantum-blue">{alpha}</span>
              <span>|0⟩ + </span>
              <span className="text-quantum-green">{beta}</span>
              <span>|1⟩</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[11px] text-quantum-dim">Adjust state probabilities ($|1\rangle$):</span>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={prob1}
              onChange={handleSliderChange}
              className="w-full accent-quantum-green bg-quantum-bg h-1 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-quantum-dim">
              <span>Only |0⟩</span>
              <span>Equal Superposition</span>
              <span>Only |1⟩</span>
            </div>
          </div>
        </div>

        <div className="border border-quantum-border p-4 rounded-lg bg-quantum-card/20 flex flex-col gap-4">
          <span className="text-[10px] text-quantum-dim tracking-wider uppercase">Measurement Odds</span>
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between text-[11px] text-quantum-dim mb-1">
                <span>Chance of measuring 0 ($|\alpha|^2$)</span>
                <span className="text-quantum-blue font-bold">{(prob0 * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 w-full bg-quantum-bg rounded overflow-hidden">
                <div className="h-full bg-quantum-blue shadow-[0_0_8px_var(--color-quantum-blue)]" style={{ width: `${prob0 * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-quantum-dim mb-1">
                <span>Chance of measuring 1 ($|\beta|^2$)</span>
                <span className="text-quantum-green font-bold">{(prob1 * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 w-full bg-quantum-bg rounded overflow-hidden">
                <div className="h-full bg-quantum-green shadow-[0_0_8px_var(--color-quantum-green)]" style={{ width: `${prob1 * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. BLOCH SPHERE EXPLORER
// ==========================================
export function BlochSphereExplorer({ onStateChange }: SimulatorProps) {
  const [theta, setTheta] = useState(0); // 0 (north) to 180 (south)
  const [phi, setPhi] = useState(0); // 0 to 360

  const updateAngles = (t: number, p: number) => {
    setTheta(t);
    setPhi(p);
    onStateChange({ theta: t, phi: p });
  };

  const applyGate = (gate: string) => {
    if (gate === 'X') {
      // Bit flip: rotate theta to 180 - theta, phi is inverted
      updateAngles(180 - theta, (360 - phi) % 360);
    } else if (gate === 'Z') {
      // Phase flip: rotate phi by 180 degrees
      updateAngles(theta, (phi + 180) % 360);
    } else if (gate === 'H') {
      // Hadamard: maps |0> to |+> (theta=90, phi=0), and |1> to |-> (theta=90, phi=180)
      if (theta < 45) {
        updateAngles(90, 0); // |0> -> |+>
      } else if (theta > 135) {
        updateAngles(90, 180); // |1> -> |->
      } else {
        // Equator states
        if (Math.abs(phi - 0) < 45 || Math.abs(phi - 360) < 45) {
          updateAngles(0, 0); // |+> -> |0>
        } else if (Math.abs(phi - 180) < 45) {
          updateAngles(180, 0); // |-> -> |1>
        } else {
          updateAngles(90, (phi + 180) % 360);
        }
      }
    }
  };

  // Convert angles to spherical coordinates for vector display
  const radTheta = (theta * Math.PI) / 180;
  const radPhi = (phi * Math.PI) / 180;
  
  // Vector projections for drawing
  const x = Math.sin(radTheta) * Math.cos(radPhi);
  const y = Math.sin(radTheta) * Math.sin(radPhi);
  const z = Math.cos(radTheta);

  return (
    <div className="flex flex-col gap-6 p-6 border border-quantum-border bg-[#0D0F11] rounded-[14px]">
      <div className="flex justify-between items-center border-b border-quantum-border/50 pb-3">
        <h4 className="text-[11px] text-quantum-muted tracking-widest uppercase">Bloch Sphere Navigator</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Sphere Display */}
        <div className="md:col-span-5 flex justify-center">
          <div className="w-48 h-48 rounded-full border border-quantum-border flex items-center justify-center relative overflow-hidden bg-[#0a0b0d]">
            {/* Equator circle (ellipse) */}
            <div className="absolute w-[98%] h-[30%] border border-quantum-dim/20 rounded-full top-[35%] left-[1%]" />
            {/* Prime meridian circle (ellipse) */}
            <div className="absolute w-[30%] h-[98%] border border-quantum-dim/20 rounded-full left-[35%] top-[1%]" />
            {/* Axis wires */}
            <div className="absolute w-px h-full bg-quantum-dim/15 left-1/2 top-0" />
            <div className="absolute h-px w-full bg-quantum-dim/15 top-1/2 left-0" />
            
            {/* Pole labels */}
            <span className="absolute top-1 text-[9px] text-quantum-dim font-bold font-mono">|0⟩</span>
            <span className="absolute bottom-1 text-[9px] text-quantum-dim font-bold font-mono">|1⟩</span>
            <span className="absolute right-1 text-[9px] text-quantum-dim font-bold font-mono">|+⟩</span>
            
            {/* Dynamic State Vector */}
            <div 
              className="absolute w-[2px] h-[80px] bg-gradient-to-t from-transparent to-quantum-blue origin-bottom bottom-1/2 left-[50%] transition-transform duration-300"
              style={{
                transform: `translateX(-50%) rotate(${-phi}deg) scaleY(${Math.max(0.1, Math.sin(radTheta))})`,
              }}
            >
              <div className="absolute -top-1 -left-[3px] w-2.5 h-2.5 rounded-full bg-quantum-blue shadow-[0_0_10px_var(--color-quantum-blue)]" />
            </div>
            
            <div className="absolute bottom-1.5 left-2 font-mono text-[9px] text-quantum-dim">
              Vector: [{x.toFixed(2)}, {y.toFixed(2)}, {z.toFixed(2)}]
            </div>
          </div>
        </div>

        {/* Sliders & Buttons */}
        <div className="md:col-span-7 flex flex-col gap-5">
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[11px] text-quantum-dim">
                <span>Polar angle (θ - inclination)</span>
                <span className="text-quantum-blue font-bold">{theta}°</span>
              </div>
              <input 
                type="range"
                min="0"
                max="180"
                value={theta}
                onChange={(e) => updateAngles(parseInt(e.target.value), phi)}
                className="w-full accent-quantum-blue bg-quantum-bg h-1 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[11px] text-quantum-dim">
                <span>Azimuthal angle (φ - phase)</span>
                <span className="text-quantum-green font-bold">{phi}°</span>
              </div>
              <input 
                type="range"
                min="0"
                max="360"
                value={phi}
                onChange={(e) => updateAngles(theta, parseInt(e.target.value))}
                className="w-full accent-quantum-green bg-quantum-bg h-1 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="border-t border-quantum-border/50 pt-4">
            <span className="text-[10px] text-quantum-dim tracking-wider uppercase block mb-3">Apply Operations</span>
            <div className="flex gap-3">
              {['X', 'Z', 'H'].map((gate) => (
                <button
                  key={gate}
                  onClick={() => applyGate(gate)}
                  className="flex-1 py-2 text-[11px] font-semibold border border-quantum-border bg-quantum-card hover:border-quantum-blue hover:text-quantum-blue transition-colors rounded"
                >
                  Apply {gate} Gate
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. SUPERPOSITION PLAYGROUND
// ==========================================
export function SuperpositionPlayground({ onStateChange }: SimulatorProps) {
  const [hasHadamard, setHasHadamard] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [measuredState, setMeasuredState] = useState<null | 0 | 1>(null);

  const applyHadamard = () => {
    setHasHadamard(true);
    setMeasuredState(null);
    onStateChange({ hasHadamard: true, measuredState: null });
  };

  const runMeasurement = () => {
    if (!hasHadamard) return;
    setSpinning(true);
    setMeasuredState(null);
    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? 0 : 1;
      setMeasuredState(outcome);
      setSpinning(false);
      onStateChange({ hasHadamard: true, measuredState: outcome });
    }, 1200);
  };

  const reset = () => {
    setHasHadamard(false);
    setMeasuredState(null);
    setSpinning(false);
    onStateChange({ hasHadamard: false, measuredState: null });
  };

  return (
    <div className="flex flex-col gap-6 p-6 border border-quantum-border bg-[#0D0F11] rounded-[14px]">
      <div className="flex justify-between items-center border-b border-quantum-border/50 pb-3">
        <h4 className="text-[11px] text-quantum-muted tracking-widest uppercase">Quantum Superposition Coin Experiment</h4>
        <button onClick={reset} className="text-quantum-dim hover:text-quantum-text transition-colors"><RotateCcw size={12}/></button>
      </div>

      <div className="flex flex-col items-center py-6 gap-8">
        <div className="h-32 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {spinning ? (
              <motion.div
                key="spinning"
                animate={{ rotateY: 360, rotateX: 360 }}
                transition={{ repeat: Infinity, duration: 0.3, ease: 'linear' }}
                className="w-20 h-20 rounded-full border-2 border-quantum-blue bg-quantum-blue/10 backdrop-blur flex items-center justify-center font-bold text-quantum-blue text-xs shadow-[0_0_20px_rgba(92,184,255,0.4)]"
              >
                |?⟩
              </motion.div>
            ) : measuredState !== null ? (
              <motion.div
                key="measured"
                initial={{ scale: 0.8, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                className={`w-20 h-20 rounded-full border-2 flex items-center justify-center font-bold text-2xl shadow-lg ${measuredState === 0 ? 'border-quantum-blue bg-quantum-blue/15 text-quantum-blue shadow-[0_0_15px_rgba(92,184,255,0.2)]' : 'border-quantum-green bg-quantum-green/15 text-quantum-green shadow-[0_0_15px_rgba(72,213,151,0.2)]'}`}
              >
                |{measuredState}⟩
              </motion.div>
            ) : hasHadamard ? (
              <motion.div
                key="superposition"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="w-20 h-20 rounded-full border border-dashed border-quantum-blue/60 bg-quantum-blue/5 flex items-center justify-center font-bold text-sm text-quantum-blue shadow-[0_0_12px_rgba(92,184,255,0.1)]"
              >
                |0⟩ + |1⟩
              </motion.div>
            ) : (
              <div className="w-20 h-20 rounded-full border border-quantum-border bg-quantum-card/40 flex items-center justify-center font-bold text-xl text-quantum-dim">
                |0⟩
              </div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-4 w-full justify-center">
          <button
            onClick={applyHadamard}
            disabled={hasHadamard || spinning}
            className={`flex items-center gap-1.5 px-4 py-2 border rounded text-[11px] font-semibold transition-colors ${hasHadamard ? 'opacity-40 bg-quantum-card border-quantum-border text-quantum-dim' : 'bg-quantum-blue/10 border-quantum-blue/30 text-quantum-blue hover:bg-quantum-blue/20'}`}
          >
            <Zap size={12} /> Apply H Gate
          </button>

          <button
            onClick={runMeasurement}
            disabled={!hasHadamard || spinning}
            className={`flex items-center gap-1.5 px-4 py-2 border rounded text-[11px] font-semibold transition-colors ${(!hasHadamard || spinning) ? 'opacity-40 bg-quantum-card border-quantum-border text-quantum-dim' : 'bg-quantum-green/10 border-quantum-green/30 text-quantum-green hover:bg-quantum-green/20'}`}
          >
            <Sparkles size={12} /> Measure Coin State
          </button>
        </div>

        <p className="text-[12px] text-quantum-muted text-center max-w-sm">
          {!hasHadamard 
            ? 'The qubit starts in a classical ground state |0⟩. Apply H to spin it.' 
            : measuredState !== null 
              ? `Wavefunction collapsed! Measured outcome: state |${measuredState}⟩.` 
              : 'The qubit is in superposition. State phase matches Heads and Tails simultaneously. Measure it to collapse.'}
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 7. MEASUREMENT SIMULATOR
// ==========================================
export function MeasurementSimulator({ onStateChange }: SimulatorProps) {
  const [trials, setTrials] = useState(100);
  const [animating, setAnimating] = useState(false);
  const [counts, setCounts] = useState<{ 0: number; 1: number }>({ 0: 0, 1: 0 });
  const [measured, setMeasured] = useState(false);

  const runSimulation = () => {
    if (animating) return;
    setAnimating(true);
    setCounts({ 0: 0, 1: 0 });
    setMeasured(false);

    let count0 = 0;
    let count1 = 0;
    
    // Animate histogram growth
    const steps = Math.min(20, trials);
    const chunk = Math.ceil(trials / steps);
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      for (let i = 0; i < chunk; i++) {
        if (count0 + count1 < trials) {
          if (Math.random() < 0.5) count0++;
          else count1++;
        }
      }
      setCounts({ 0: count0, 1: count1 });
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimating(false);
        setMeasured(true);
        onStateChange({ trials, measured: true, counts: { 0: count0, 1: count1 } });
      }
    }, 50);
  };

  const prob0 = trials > 0 ? counts[0] / trials : 0;
  const prob1 = trials > 0 ? counts[1] / trials : 0;

  return (
    <div className="flex flex-col gap-6 p-6 border border-quantum-border bg-[#0D0F11] rounded-[14px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-quantum-border/50 pb-3">
        <h4 className="text-[11px] text-quantum-muted tracking-widest uppercase">Quantum Measurement Histogram</h4>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-quantum-muted">Shots:</span>
          <select 
            value={trials} 
            disabled={animating}
            onChange={(e) => {
              setTrials(parseInt(e.target.value));
              setCounts({ 0: 0, 1: 0 });
              setMeasured(false);
            }}
            className="bg-quantum-card border border-quantum-border rounded text-[11px] px-2 py-1 focus:outline-none"
          >
            <option value={10}>10 shots</option>
            <option value={100}>100 shots</option>
            <option value={1000}>1000 shots</option>
          </select>
        </div>
      </div>

      <div className="h-44 flex items-end gap-6 border-b border-l border-quantum-border/40 p-4 relative bg-[#0a0b0d]">
        <div className="absolute top-2 right-4 flex gap-4 text-[10px] text-quantum-dim">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-quantum-blue rounded-sm"/> State |0⟩ ({counts[0]})</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-quantum-green rounded-sm"/> State |1⟩ ({counts[1]})</span>
        </div>
        
        {/* BAR 0 */}
        <div className="flex-1 flex flex-col justify-end items-center gap-2 h-full">
          <div 
            className="w-16 bg-quantum-blue shadow-[0_0_15px_rgba(92,184,255,0.15)] rounded-t transition-all duration-300"
            style={{ height: `${prob0 * 100}%` }}
          />
          <span className="text-[11px] font-semibold text-quantum-text">|0⟩</span>
          <span className="text-[9px] text-quantum-dim">{(prob0 * 100).toFixed(1)}%</span>
        </div>

        {/* BAR 1 */}
        <div className="flex-1 flex flex-col justify-end items-center gap-2 h-full">
          <div 
            className="w-16 bg-quantum-green shadow-[0_0_15px_rgba(72,213,151,0.15)] rounded-t transition-all duration-300"
            style={{ height: `${prob1 * 100}%` }}
          />
          <span className="text-[11px] font-semibold text-quantum-text">|1⟩</span>
          <span className="text-[9px] text-quantum-dim">{(prob1 * 100).toFixed(1)}%</span>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={runSimulation}
          disabled={animating}
          className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-quantum-text text-quantum-bg hover:bg-white disabled:opacity-50 text-[12px] font-semibold transition-colors"
        >
          {animating ? 'Measuring...' : 'Run Simulation'}
          <RefreshCw size={12} className={animating ? 'animate-spin' : ''} />
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 8. QUANTUM GATE PLAYGROUND
// ==========================================
export function GatePlayground({ onStateChange }: SimulatorProps) {
  const [gatesApplied, setGatesApplied] = useState<string[]>([]);
  const [stateVector, setStateVector] = useState<'|0⟩' | '|1⟩' | '|+⟩' | '|−⟩'>('|0⟩');

  const addGate = (gate: string) => {
    const nextGates = [...gatesApplied, gate];
    setGatesApplied(nextGates);
    
    // Evaluate target sequence X then H
    let current = '|0⟩';
    nextGates.forEach(g => {
      if (g === 'X') {
        if (current === '|0⟩') current = '|1⟩';
        else if (current === '|1⟩') current = '|0⟩';
        else if (current === '|+⟩') current = '|+⟩'; // X|+> = |+>
        else if (current === '|−⟩') current = '|-|−⟩'; // simplified
      } else if (g === 'H') {
        if (current === '|0⟩') current = '|+⟩';
        else if (current === '|1⟩') current = '|−⟩';
        else if (current === '|+⟩') current = '|0⟩';
        else if (current === '|−⟩') current = '|1⟩';
      }
    });

    setStateVector(current as any);
    onStateChange({ gatesApplied: nextGates });
  };

  const clear = () => {
    setGatesApplied([]);
    setStateVector('|0⟩');
    onStateChange({ gatesApplied: [] });
  };

  return (
    <div className="flex flex-col gap-6 p-6 border border-quantum-border bg-[#0D0F11] rounded-[14px]">
      <div className="flex justify-between items-center border-b border-quantum-border/50 pb-3">
        <h4 className="text-[11px] text-quantum-muted tracking-widest uppercase">Sequential Gate Playground</h4>
        <button onClick={clear} className="text-quantum-dim hover:text-quantum-text transition-colors"><RotateCcw size={12}/></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] text-quantum-dim tracking-wider uppercase">Gate Sequence Wire</span>
          <div className="h-16 border border-quantum-border/60 rounded-lg bg-[#0a0b0d] flex items-center px-4 gap-3 relative overflow-x-auto">
            <span className="text-[11px] text-quantum-dim font-mono">q: |0⟩ ──</span>
            {gatesApplied.map((g, idx) => (
              <div key={idx} className="flex items-center shrink-0">
                <span className={`w-8 h-8 rounded border flex items-center justify-center font-bold text-xs ${g === 'X' ? 'border-quantum-blue text-quantum-blue bg-quantum-blue/10' : 'border-quantum-green text-quantum-green bg-quantum-green/10'}`}>
                  {g}
                </span>
                <span className="text-quantum-dim font-mono">──</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => addGate('X')} 
              className="flex-1 py-2 text-[11px] font-semibold border border-quantum-border hover:border-quantum-blue hover:text-quantum-blue rounded bg-quantum-card/50 transition-colors"
            >
              Add Pauli-X (Bit Flip)
            </button>
            <button 
              onClick={() => addGate('H')} 
              className="flex-1 py-2 text-[11px] font-semibold border border-quantum-border hover:border-quantum-green hover:text-quantum-green rounded bg-quantum-card/50 transition-colors"
            >
              Add Hadamard (H)
            </button>
          </div>
        </div>

        <div className="p-4 border border-quantum-border rounded-lg bg-quantum-card/25 flex flex-col gap-3 items-center justify-center text-center h-full min-h-[140px]">
          <span className="text-[10px] text-quantum-dim tracking-wider uppercase">Qubit Final State</span>
          <span className="text-3xl font-light text-quantum-text tracking-wide">{stateVector}</span>
          <span className="text-[10px] text-quantum-dim max-w-xs mt-1">
            Challenge Target: Achieve the <span className="text-quantum-green font-bold">|−⟩</span> state from <span className="text-quantum-blue font-bold">|0⟩</span>.
          </span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. CIRCUIT BUILDER
// ==========================================
export function CircuitSimulator({ onStateChange }: SimulatorProps) {
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null, null, null]);

  const addGateToSlot = (gate: string, idx: number) => {
    const nextSlots = [...slots];
    nextSlots[idx] = nextSlots[idx] === gate ? null : gate;
    setSlots(nextSlots);

    const hasH = nextSlots.includes('H');
    const hasM = nextSlots.includes('M');
    onStateChange({ hasH, hasM });
  };

  const clear = () => {
    setSlots([null, null, null, null, null]);
    onStateChange({ hasH: false, hasM: false });
  };

  return (
    <div className="flex flex-col gap-6 p-6 border border-quantum-border bg-[#0D0F11] rounded-[14px]">
      <div className="flex justify-between items-center border-b border-quantum-border/50 pb-3">
        <h4 className="text-[11px] text-quantum-muted tracking-widest uppercase">Single-Qubit Circuit Assembly</h4>
        <button onClick={clear} className="text-quantum-dim hover:text-quantum-text transition-colors"><RotateCcw size={12}/></button>
      </div>

      <div className="flex flex-col gap-5 py-2">
        <span className="text-[10px] text-quantum-dim uppercase tracking-wider">Drag and drop or click slots to place gates:</span>
        
        <div className="h-16 border border-quantum-border/50 bg-[#0a0b0d] rounded-lg flex items-center justify-around px-4 relative">
          <div className="absolute left-0 right-0 h-px bg-quantum-border/70 z-0" />
          <span className="text-[11px] text-quantum-dim font-mono z-10 bg-[#0a0b0d] px-2">q0</span>
          
          {slots.map((gate, idx) => (
            <div key={idx} className="relative z-10 flex gap-2">
              <div className="flex flex-col gap-1 items-center">
                <button
                  onClick={() => addGateToSlot(gate === 'H' ? 'M' : gate === 'M' ? 'H' : 'H', idx)}
                  className={`w-9 h-9 border rounded-sm flex items-center justify-center font-bold text-xs transition-all ${gate ? 'bg-quantum-blue/10 border-quantum-blue text-quantum-blue shadow-[0_0_8px_rgba(92,184,255,0.2)]' : 'bg-quantum-card border-quantum-border text-quantum-dim hover:border-quantum-dim/60 hover:text-quantum-text'}`}
                >
                  {gate || '+'}
                </button>
                <span className="text-[9px] text-quantum-dim">slot {idx+1}</span>
              </div>
            </div>
          ))}
          <span className="text-[11px] text-quantum-dim font-mono z-10 bg-[#0a0b0d] px-2">C0</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 10. ENTANGLEMENT EXPLORER
// ==========================================
export function EntanglementExplorer({ onStateChange }: SimulatorProps) {
  const [hasH, setHasH] = useState(false);
  const [hasCX, setHasCX] = useState(false);
  const [measuredA, setMeasuredA] = useState<null | number>(null);
  const [measuredB, setMeasuredB] = useState<null | number>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [collapsing, setCollapsing] = useState(false);

  const applyH = () => {
    setHasH(true);
    resetMeasurements();
    onStateChange({ bellStateCreated: hasCX });
  };

  const applyCX = () => {
    setHasCX(true);
    resetMeasurements();
    onStateChange({ bellStateCreated: hasH });
  };

  const resetMeasurements = () => {
    setMeasuredA(null);
    setMeasuredB(null);
  };

  const measure = () => {
    if (!hasH || !hasCX) return;
    setCollapsing(true);
    resetMeasurements();

    setTimeout(() => {
      // Entangled correlation: both must be identical
      const state = Math.random() < 0.5 ? 0 : 1;
      setMeasuredA(state);
      setMeasuredB(state);
      setHistory(prev => [`|${state}${state}⟩`, ...prev.slice(0, 4)]);
      setCollapsing(false);
      onStateChange({ bellStateCreated: true });
    }, 1000);
  };

  const resetAll = () => {
    setHasH(false);
    setHasCX(false);
    setMeasuredA(null);
    setMeasuredB(null);
    setHistory([]);
    onStateChange({ bellStateCreated: false });
  };

  return (
    <div className="flex flex-col gap-6 p-6 border border-quantum-border bg-[#0D0F11] rounded-[14px]">
      <div className="flex justify-between items-center border-b border-quantum-border/50 pb-3">
        <h4 className="text-[11px] text-quantum-muted tracking-widest uppercase">Spooky Action Correlations</h4>
        <button onClick={resetAll} className="text-quantum-dim hover:text-quantum-text transition-colors"><RotateCcw size={12}/></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* QUBIT CONTROLS */}
        <div className="flex flex-col gap-3">
          <button
            onClick={applyH}
            className={`py-2 text-[11px] font-semibold border rounded transition-colors ${hasH ? 'bg-quantum-blue/15 border-quantum-blue text-quantum-blue' : 'bg-quantum-card border-quantum-border text-quantum-muted hover:border-quantum-dim'}`}
          >
            Hadamard (H) on Qubit A
          </button>
          
          <button
            onClick={applyCX}
            disabled={!hasH}
            className={`py-2 text-[11px] font-semibold border rounded transition-colors ${hasCX ? 'bg-quantum-green/15 border-quantum-green text-quantum-green' : 'bg-quantum-card border-quantum-border text-quantum-muted hover:border-quantum-dim disabled:opacity-40'}`}
          >
            CNOT (CX) A → B
          </button>
          
          <button
            onClick={measure}
            disabled={!hasH || !hasCX || collapsing}
            className="py-2.5 text-[11px] font-semibold bg-quantum-text text-quantum-bg hover:bg-white rounded transition-colors disabled:opacity-40"
          >
            {collapsing ? 'Collapsing...' : 'Measure Qubit A'}
          </button>
        </div>

        {/* TELEMETRY READOUT */}
        <div className="flex flex-col gap-3 items-center justify-center p-4 border border-quantum-border rounded-lg bg-quantum-card/25 min-h-[160px] relative overflow-hidden">
          {collapsing && (
            <div className="absolute inset-0 bg-quantum-blue/5 border border-quantum-blue/30 animate-pulse z-0 flex items-center justify-center">
              <span className="text-[10px] text-quantum-blue uppercase tracking-widest font-mono">Transmitting Collapse...</span>
            </div>
          )}
          
          <div className="relative z-10 flex gap-8">
            <div className="flex flex-col items-center">
              <span className="text-[9px] text-quantum-dim mb-1">Qubit A</span>
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm ${measuredA !== null ? 'border-quantum-blue text-quantum-blue' : 'border-quantum-dim/40 text-quantum-dim'}`}>
                {measuredA !== null ? `|${measuredA}⟩` : 'α|0⟩'}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] text-quantum-dim mb-1">Qubit B</span>
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm ${measuredB !== null ? 'border-quantum-green text-quantum-green' : 'border-quantum-dim/40 text-quantum-dim'}`}>
                {measuredB !== null ? `|${measuredB}⟩` : 'β|1⟩'}
              </div>
            </div>
          </div>
          <span className="text-[9px] text-quantum-dim mt-2 uppercase font-mono tracking-wider">
            {(!hasH && !hasCX) && 'Qubits unlinked.'}
            {(hasH && !hasCX) && 'Qubit A in superposition, B static.'}
            {(hasH && hasCX && measuredA === null) && 'Entangled. Awaiting measurement.'}
            {(measuredA !== null) && 'Correlation established.'}
          </span>
        </div>

        {/* CORRELATION LOGS */}
        <div className="flex flex-col gap-2 p-4 border border-quantum-border rounded-lg bg-quantum-card/30 h-full justify-between">
          <span className="text-[9px] text-quantum-dim uppercase tracking-wider border-b border-quantum-border pb-1">Correlation Logs</span>
          <div className="flex flex-col gap-1 text-[11px] font-mono h-24 overflow-y-auto">
            {history.map((h, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-quantum-dim">Trial #{history.length - i}</span>
                <span className="text-quantum-green font-bold">{h}</span>
              </div>
            ))}
            {history.length === 0 && (
              <span className="text-[10px] text-quantum-dim italic flex items-center justify-center h-full">No history</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 11. VARIATIONAL & VQE OPTIMIZER
// ==========================================
export function VqeOptimizer({ onStateChange, activeLessonId }: SimulatorProps) {
  const [theta, setTheta] = useState(0.0);
  const [energy, setEnergy] = useState(1.0);
  const [gradientDescentActive, setGradientDescentActive] = useState(false);

  const calculateEnergy = (t: number) => {
    if (activeLessonId === 'l14') {
      // VQE H2 molecule minimum energy
      return Math.cos(t) + 0.45 * Math.sin(3 * t) - 1.5;
    } else if (activeLessonId === 'l13') {
      // QAOA partition minimum energy
      return Math.cos(t) + 0.35 * Math.sin(3 * t) - 1.1;
    }
    // Optimization Landscapes (l12) minimum energy
    return Math.cos(t) + 0.2 * Math.sin(3 * t) - 0.8;
  };

  useEffect(() => {
    // Sync initial states
    const initEnergy = calculateEnergy(0.0);
    setTheta(0.0);
    setEnergy(initEnergy);
    onStateChange({ theta: 0.0, energy: initEnergy });
  }, [activeLessonId]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setTheta(val);
    const eng = calculateEnergy(val);
    setEnergy(eng);
    onStateChange({ theta: val, energy: eng });
  };

  const runGradientDescent = () => {
    if (gradientDescentActive) return;
    setGradientDescentActive(true);
    let currentTheta = theta;
    const target = 2.45; // Minimum
    const step = 0.05;
    
    const interval = setInterval(() => {
      if (Math.abs(currentTheta - target) < 0.06) {
        setTheta(target);
        const eng = calculateEnergy(target);
        setEnergy(eng);
        setGradientDescentActive(false);
        onStateChange({ theta: target, energy: eng });
        clearInterval(interval);
      } else {
        const dir = currentTheta < target ? 1 : -1;
        currentTheta += dir * step;
        setTheta(currentTheta);
        const eng = calculateEnergy(currentTheta);
        setEnergy(eng);
      }
    }, 60);
  };

  // Normalization boundaries for Y axis
  let minY = -2.2;
  let maxY = 0.6;
  if (activeLessonId === 'l14') {
    minY = -2.2;
    maxY = 0.2;
  }

  const pctX = (theta / 6.28) * 100;
  const pctY = ((energy - minY) / (maxY - minY)) * 100;

  // Render sampling path
  const samplePoints = () => {
    const pointsList: string[] = [];
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * 6.28;
      const eng = calculateEnergy(t);
      const x = (i / steps) * 100;
      const py = ((eng - minY) / (maxY - minY)) * 100;
      pointsList.push(`${x},${100 - py}`);
    }
    return `M ${pointsList.join(' L ')}`;
  };

  const pathD = samplePoints();

  // Render Lesson 11 (Variational Circuits) - Rotate Qubit State
  if (activeLessonId === 'l11') {
    const angleRad = theta;
    const prob0 = Math.cos(angleRad / 2) ** 2;
    const prob1 = Math.sin(angleRad / 2) ** 2;

    return (
      <div className="flex flex-col gap-6 p-6 border border-quantum-border bg-[#0D0F11] rounded-[14px] font-mono">
        <div className="flex justify-between items-center border-b border-quantum-border/50 pb-3">
          <h4 className="text-[11px] text-quantum-muted tracking-widest uppercase">Qubit State Vector Rotation</h4>
          <span className="text-[10px] text-quantum-dim">Ry(θ) rotation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Rotator Circle */}
          <div className="flex justify-center py-4">
            <div className="relative w-32 h-32 rounded-full border border-quantum-border flex items-center justify-center bg-[#070809]">
              <div className="absolute top-1 text-[9px] text-quantum-dim">|0⟩</div>
              <div className="absolute bottom-1 text-[9px] text-quantum-dim">|1⟩</div>
              
              {/* Rotating Arrow */}
              <motion.div 
                className="w-0.5 h-14 bg-quantum-blue origin-bottom absolute bottom-16"
                style={{ rotate: `${(theta / Math.PI) * 180}deg` }}
              />
              <div className="w-2 h-2 rounded-full bg-quantum-blue absolute" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="p-3 border border-quantum-border rounded bg-quantum-bg text-[11px] space-y-1">
              <span className="text-quantum-dim block uppercase text-[9px] tracking-wider">Statevector Amplitudes</span>
              <div>|ψ⟩ = {Math.cos(theta/2).toFixed(2)}|0⟩ + {Math.sin(theta/2).toFixed(2)}|1⟩</div>
              <div className="flex justify-between text-[10px] text-quantum-dim pt-1.5">
                <span>P(0) = {(prob0*100).toFixed(0)}%</span>
                <span>P(1) = {(prob1*100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[11px] text-quantum-dim">
            <span>Rotation Angle (θ)</span>
            <span className="text-quantum-text font-bold">{theta.toFixed(2)} rad ({((theta/Math.PI)*180).toFixed(0)}°)</span>
          </div>
          <input 
            type="range"
            min="0.0"
            max="6.28"
            step="0.02"
            value={theta}
            onChange={handleSliderChange}
            className="w-full accent-quantum-blue bg-quantum-bg h-1 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    );
  }

  // Render Lesson 13 (QAOA Max-Cut)
  if (activeLessonId === 'l13') {
    // Determine colors of the 4 nodes based on theta:
    // We toggle node values to simulate partition changes:
    const nodeA = theta > 1.2 && theta < 4.0;
    const nodeB = theta > 2.0 && theta < 5.0;
    const nodeC = !nodeA;
    const nodeD = !nodeB;

    const cuts = (nodeA !== nodeB ? 1 : 0) + (nodeB !== nodeC ? 1 : 0) + (nodeC !== nodeD ? 1 : 0) + (nodeD !== nodeA ? 1 : 0);

    return (
      <div className="flex flex-col gap-6 p-6 border border-quantum-border bg-[#0D0F11] rounded-[14px] font-mono">
        <div className="flex justify-between items-center border-b border-quantum-border/50 pb-3">
          <h4 className="text-[11px] text-quantum-muted tracking-widest uppercase">QAOA Max-Cut Partitions</h4>
          <span className="text-[10px] text-quantum-dim">Active Cuts: {cuts} / 4</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Graph visualizer */}
          <div className="flex justify-center py-4">
            <div className="relative w-36 h-36 border border-quantum-border/30 rounded-lg bg-[#070809] flex items-center justify-center">
              {/* Ring links */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <line x1="25" y1="25" x2="75" y2="25" stroke={nodeA !== nodeB ? "var(--color-quantum-blue)" : "rgba(255,255,255,0.06)"} strokeWidth={nodeA !== nodeB ? "2" : "1"} />
                <line x1="75" y1="25" x2="75" y2="75" stroke={nodeB !== nodeC ? "var(--color-quantum-blue)" : "rgba(255,255,255,0.06)"} strokeWidth={nodeB !== nodeC ? "2" : "1"} />
                <line x1="75" y1="75" x2="25" y2="75" stroke={nodeC !== nodeD ? "var(--color-quantum-blue)" : "rgba(255,255,255,0.06)"} strokeWidth={nodeC !== nodeD ? "2" : "1"} />
                <line x1="25" y1="75" x2="25" y2="25" stroke={nodeD !== nodeA ? "var(--color-quantum-blue)" : "rgba(255,255,255,0.06)"} strokeWidth={nodeD !== nodeA ? "2" : "1"} />
              </svg>

              {/* Nodes */}
              <div className={`absolute top-4 left-4 w-6 h-6 rounded-full border flex items-center justify-center font-bold text-[10px] transition-colors ${nodeA ? 'bg-quantum-blue text-quantum-bg border-quantum-blue' : 'bg-quantum-green text-quantum-bg border-quantum-green'}`}>A</div>
              <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border flex items-center justify-center font-bold text-[10px] transition-colors ${nodeB ? 'bg-quantum-blue text-quantum-bg border-quantum-blue' : 'bg-quantum-green text-quantum-bg border-quantum-green'}`}>B</div>
              <div className={`absolute bottom-4 right-4 w-6 h-6 rounded-full border flex items-center justify-center font-bold text-[10px] transition-colors ${nodeC ? 'bg-quantum-blue text-quantum-bg border-quantum-blue' : 'bg-quantum-green text-quantum-bg border-quantum-green'}`}>C</div>
              <div className={`absolute bottom-4 left-4 w-6 h-6 rounded-full border flex items-center justify-center font-bold text-[10px] transition-colors ${nodeD ? 'bg-quantum-blue text-quantum-bg border-quantum-blue' : 'bg-quantum-green text-quantum-bg border-quantum-green'}`}>D</div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="p-3 border border-quantum-border rounded bg-quantum-bg text-[11px] space-y-1">
              <span className="text-quantum-dim block uppercase text-[9px] tracking-wider">Partition State</span>
              <div>Cluster Blue: {[nodeA && 'A', nodeB && 'B', nodeC && 'C', nodeD && 'D'].filter(Boolean).join(', ') || 'None'}</div>
              <div>Cluster Green: {[!nodeA && 'A', !nodeB && 'B', !nodeC && 'C', !nodeD && 'D'].filter(Boolean).join(', ') || 'None'}</div>
            </div>
            <div className="p-3 border border-quantum-border rounded bg-quantum-bg text-[11px] flex justify-between">
              <span className="text-quantum-dim">APPROX RATIO:</span>
              <span className="font-bold text-quantum-blue">{Math.max(40, Math.min(98, ((cuts) / 4) * 100)).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[11px] text-quantum-dim">
            <span>QAOA Phase Angle (θ)</span>
            <span className="text-quantum-text font-bold">{theta.toFixed(2)} rad</span>
          </div>
          <input 
            type="range"
            min="0.0"
            max="6.28"
            step="0.02"
            value={theta}
            onChange={handleSliderChange}
            className="w-full accent-quantum-blue bg-quantum-bg h-1 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    );
  }

  // Render Lesson 14 (VQE Hydrogen molecule)
  if (activeLessonId === 'l14') {
    const distance = 0.3 + (theta / 6.28) * 1.5; // distance from 0.3 to 1.8 Angstroms

    return (
      <div className="flex flex-col gap-6 p-6 border border-quantum-border bg-[#0D0F11] rounded-[14px] font-mono">
        <div className="flex justify-between items-center border-b border-quantum-border/50 pb-3">
          <h4 className="text-[11px] text-quantum-muted tracking-widest uppercase">H2 Molecular Distance Optimizer</h4>
          <span className="text-[10px] text-quantum-dim">Distance: {distance.toFixed(3)} Å</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Atomic visualization */}
          <div className="flex justify-center py-4">
            <div className="relative w-36 h-36 border border-quantum-border/30 rounded-lg bg-[#070809] flex items-center justify-center overflow-hidden">
              {/* Bonding orbital electron cloud */}
              <div 
                className="absolute rounded-full bg-quantum-blue/10 border border-quantum-blue/20 blur-sm transition-all duration-300"
                style={{ 
                  width: `${60 + (1.2 - Math.abs(distance - 0.74)) * 30}px`,
                  height: '40px'
                }}
              />

              {/* Two protons */}
              <div className="flex items-center gap-1.5 absolute" style={{ gap: `${distance * 35}px` }}>
                <div className="w-5 h-5 rounded-full bg-quantum-blue flex items-center justify-center font-bold text-[9px] text-quantum-bg shadow-[0_0_8px_var(--color-quantum-blue)]">H</div>
                <div className="w-5 h-5 rounded-full bg-quantum-blue flex items-center justify-center font-bold text-[9px] text-quantum-bg shadow-[0_0_8px_var(--color-quantum-blue)]">H</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="p-3 border border-quantum-border rounded bg-quantum-bg text-[11px] space-y-1">
              <span className="text-quantum-dim block uppercase text-[9px] tracking-wider">Molecular Energy</span>
              <div className="text-quantum-green font-bold text-base">{energy.toFixed(3)} Hartree</div>
              <div className="text-[9px] text-quantum-dim">Ground state energy: -1.86 Hartree (d=0.74Å)</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[11px] text-quantum-dim">
            <span>Interatomic Distance Parameter</span>
            <span className="text-quantum-text font-bold">{theta.toFixed(2)} rad</span>
          </div>
          <input 
            type="range"
            min="0.0"
            max="6.28"
            step="0.02"
            value={theta}
            onChange={handleSliderChange}
            className="w-full accent-quantum-blue bg-quantum-bg h-1 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    );
  }

  // Default: Lesson 12 (Optimization Landscapes)
  return (
    <div className="flex flex-col gap-6 p-6 border border-quantum-border bg-[#0D0F11] rounded-[14px] font-mono">
      <div className="flex justify-between items-center border-b border-quantum-border/50 pb-3">
        <h4 className="text-[11px] text-quantum-muted tracking-widest uppercase">Variational Energy Landscape</h4>
        <button 
          onClick={runGradientDescent}
          disabled={gradientDescentActive}
          className="flex items-center gap-1.5 px-3 py-1 rounded bg-quantum-blue/10 border border-quantum-blue/30 text-quantum-blue text-[10px] hover:bg-quantum-blue/20 transition-colors disabled:opacity-40 cursor-pointer font-semibold"
        >
          <Sliders size={11} /> Auto-Optimize (GD)
        </button>
      </div>

      <div className="h-36 border border-quantum-border/40 rounded-lg relative overflow-hidden bg-[#070809] flex items-end">
        {/* Draw dynamic energy curve landscape background */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path 
            d={pathD} 
            fill="none" 
            stroke="var(--color-quantum-blue)" 
            strokeWidth="1.5" 
            className="opacity-75"
          />
        </svg>

        {/* Current State Indicator dot */}
        <motion.div
          animate={{ x: `${pctX}%`, y: `${100 - pctY}%` }}
          transition={{ duration: 0.05 }}
          className="absolute w-3 h-3 rounded-full bg-quantum-green border border-[#0D0F11] shadow-[0_0_10px_var(--color-quantum-green)] -ml-1.5 -mt-1.5 z-10"
        />
        <div className="absolute bottom-2 left-3 font-mono text-[9px] text-quantum-dim">
          θ = 0.0 rad
        </div>
        <div className="absolute bottom-2 right-3 font-mono text-[9px] text-quantum-dim">
          θ = 2π rad
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[11px] text-quantum-dim">
            <span>Variational Rotation Parameter (θ)</span>
            <span className="text-quantum-text font-bold">{theta.toFixed(2)} rad</span>
          </div>
          <input 
            type="range"
            min="0.0"
            max="6.28"
            step="0.01"
            value={theta}
            onChange={handleSliderChange}
            disabled={gradientDescentActive}
            className="w-full accent-quantum-blue bg-quantum-bg h-1 rounded-lg cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-quantum-border/40 pt-4">
          <div className="p-3 border border-quantum-border rounded bg-[#0A0B0D] flex flex-col">
            <span className="text-[10px] text-quantum-dim">EVALUATED ENERGY</span>
            <span className="text-lg font-bold text-quantum-green">{energy.toFixed(3)} Hartree</span>
          </div>
          <div className="p-3 border border-quantum-border rounded bg-[#0A0B0D] flex flex-col">
            <span className="text-[10px] text-quantum-dim">LANDSCAPE MINIMUM</span>
            <span className="text-lg font-bold text-quantum-dim">{(activeLessonId === 'l14' ? -1.920 : activeLessonId === 'l13' ? -1.450 : -1.394).toFixed(3)} Hartree</span>
          </div>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 12. QUANTUM MACHINE LEARNING SIMULATOR
// ==========================================
export function QmlDecisionBoundary({ onStateChange }: SimulatorProps) {
  const [featureMap, setFeatureMap] = useState<'ZFeatureMap' | 'ZZFeatureMap'>('ZFeatureMap');
  const [epochs, setEpochs] = useState(0);
  const [accuracy, setAccuracy] = useState(0.52);
  const [learningRate, setLearningRate] = useState(0.02);
  const [resolution, setResolution] = useState<'low' | 'high'>('low');
  const [kernelEvaluated, setKernelEvaluated] = useState(false);
  const [hybridMode, setHybridMode] = useState(false);
  const [training, setTraining] = useState(false);

  const trainModel = (numEpochs: number) => {
    if (training) return;
    setTraining(true);
    let current = epochs;
    let targetEpochs = epochs + numEpochs;

    const interval = setInterval(() => {
      current++;
      setEpochs(current);
      
      // Accuracy scales based on feature map
      const maxAcc = featureMap === 'ZZFeatureMap' ? 0.94 : 0.72;
      const progress = current / 10;
      const acc = 0.52 + (maxAcc - 0.52) * Math.min(1, progress) + (Math.random() - 0.5) * 0.02;
      setAccuracy(acc);

      if (current >= targetEpochs || current >= 20) {
        setTraining(false);
        onStateChange({
          featureMap,
          epochs: current,
          accuracy: acc,
          resolution,
          kernelEvaluated,
          hybridMode
        });
        clearInterval(interval);
      }
    }, 150);
  };

  const evaluateKernel = () => {
    setKernelEvaluated(true);
    onStateChange({
      featureMap,
      epochs,
      accuracy,
      resolution,
      kernelEvaluated: true,
      hybridMode
    });
  };

  const toggleHybrid = () => {
    const val = !hybridMode;
    setHybridMode(val);
    onStateChange({
      featureMap,
      epochs,
      accuracy,
      resolution,
      kernelEvaluated,
      hybridMode: val
    });
  };

  // SVG dimensions for scatter plot
  const points = [
    { cx: 20, cy: 30, color: 'text-quantum-blue', label: '0' },
    { cx: 35, cy: 65, color: 'text-quantum-blue', label: '0' },
    { cx: 70, cy: 20, color: 'text-quantum-blue', label: '0' },
    { cx: 80, cy: 50, color: 'text-quantum-green', label: '1' },
    { cx: 50, cy: 50, color: 'text-quantum-green', label: '1' },
    { cx: 65, cy: 75, color: 'text-quantum-green', label: '1' },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 border border-quantum-border bg-[#0D0F11] rounded-[14px]">
      <div className="flex justify-between items-center border-b border-quantum-border/50 pb-3">
        <h4 className="text-[11px] text-quantum-muted tracking-widest uppercase">Quantum Decision Boundary</h4>
        <span className="text-[10px] text-quantum-dim font-mono">EPOCHS: {epochs}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Scatter plot */}
        <div className="md:col-span-5 flex justify-center">
          <div className="w-44 h-44 border border-quantum-border bg-[#070809] rounded-lg relative overflow-hidden flex items-center justify-center">
            {/* Draw separating hyperplane boundary overlay */}
            <div 
              className={`absolute inset-0 transition-opacity duration-700 pointer-events-none opacity-20`}
              style={{
                background: featureMap === 'ZZFeatureMap' 
                  ? `radial-gradient(circle at 60% 60%, var(--color-quantum-green) 0%, transparent 60%)`
                  : `linear-gradient(45deg, var(--color-quantum-blue) 0%, var(--color-quantum-green) 100%)`,
              }}
            />
            {/* Grid background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
            
            {points.map((pt, idx) => (
              <span 
                key={idx} 
                className={`absolute w-3 h-3 rounded-full border border-[#0d0f11] font-mono text-[7px] flex items-center justify-center font-bold ${pt.color} bg-current`}
                style={{ left: `${pt.cx}%`, top: `${pt.cy}%` }}
              />
            ))}
          </div>
        </div>

        {/* Panel controls */}
        <div className="md:col-span-7 flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-1.5">
              <span className="text-[10px] text-quantum-dim uppercase">Feature Map</span>
              <select
                value={featureMap}
                onChange={(e) => {
                  setFeatureMap(e.target.value as any);
                  setEpochs(0);
                  setAccuracy(0.52);
                  onStateChange({ featureMap: e.target.value });
                }}
                className="bg-quantum-card border border-quantum-border rounded text-[11px] p-1.5 focus:outline-none"
              >
                <option value="ZFeatureMap">Z Feature Map</option>
                <option value="ZZFeatureMap">ZZ Feature Map (Entangled)</option>
              </select>
            </div>
            
            <div className="flex-1 flex flex-col gap-1.5">
              <span className="text-[10px] text-quantum-dim uppercase">Kernel Res</span>
              <select
                value={resolution}
                onChange={(e) => {
                  setResolution(e.target.value as any);
                  onStateChange({ resolution: e.target.value });
                }}
                className="bg-quantum-card border border-quantum-border rounded text-[11px] p-1.5 focus:outline-none"
              >
                <option value="low">Standard (Low)</option>
                <option value="high">High Resolution</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 border-t border-quantum-border/40 pt-4">
            <button
              onClick={() => trainModel(1)}
              disabled={training}
              className="flex-1 py-2 text-[11px] font-semibold border border-quantum-border hover:border-quantum-blue hover:text-quantum-blue rounded bg-quantum-card/50 transition-colors"
            >
              Train 1 Epoch
            </button>
            <button
              onClick={() => trainModel(5)}
              disabled={training}
              className="flex-1 py-2 text-[11px] font-semibold border border-quantum-border hover:border-quantum-green hover:text-quantum-green rounded bg-quantum-card/50 transition-colors"
            >
              Train 5 Epochs
            </button>
          </div>

          <div className="flex justify-between items-center border-t border-quantum-border/40 pt-3 text-[11px]">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="hybrid" 
                checked={hybridMode} 
                onChange={toggleHybrid}
                className="accent-quantum-blue w-3.5 h-3.5"
              />
              <label htmlFor="hybrid" className="text-quantum-dim cursor-pointer">Hybrid Mode</label>
            </div>
            <button 
              onClick={evaluateKernel}
              className="text-quantum-blue hover:text-[#7dd3fc] transition-colors uppercase tracking-wider text-[10px] font-bold"
            >
              Evaluate Kernel similarity
            </button>
          </div>
        </div>
      </div>

      <div className="p-3 border border-quantum-border rounded bg-[#0A0B0D] flex items-center justify-between text-[11px] font-mono">
        <span className="text-quantum-dim">CURRENT CLASSIFICATION ACCURACY</span>
        <span className={`font-bold text-lg ${accuracy >= 0.90 ? 'text-quantum-green' : 'text-quantum-dim'}`}>
          {(accuracy * 100).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}
