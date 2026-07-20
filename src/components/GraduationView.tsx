import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Download, Award, ArrowLeft, Send } from 'lucide-react';

interface GraduationViewProps {
  onBack: () => void;
}

export function GraduationView({ onBack }: GraduationViewProps) {
  const [cadetName, setCadetName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [warpSpeed, setWarpSpeed] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Slow down warp speed after 3 seconds into a gentle space drift
  useEffect(() => {
    const timer = setTimeout(() => {
      setWarpSpeed(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  // Handle Certificate rendering on Canvas
  useEffect(() => {
    if (submitted && canvasRef.current) {
      drawCertificate();
    }
  }, [submitted, cadetName]);

  const drawCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and draw background gradient
    const grad = ctx.createLinearGradient(0, 0, 800, 600);
    grad.addColorStop(0, '#0a0d12');
    grad.addColorStop(0.5, '#07090d');
    grad.addColorStop(1, '#020305');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 600);

    // Draw space stars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * 800;
      const y = Math.random() * 600;
      const r = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Outer Neon Border
    ctx.strokeStyle = '#5CB8FF';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, 760, 560);

    // Inner Green Border
    ctx.strokeStyle = '#48D597';
    ctx.lineWidth = 1;
    ctx.strokeRect(26, 26, 748, 548);

    // Title: ODE TO QUANTUM
    ctx.fillStyle = '#ECECEC';
    ctx.font = '28px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('ODE TO QUANTUM ACADEMY', 400, 85);

    // Subtle line divider
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(100, 110);
    ctx.lineTo(700, 110);
    ctx.stroke();

    // Body text
    ctx.fillStyle = '#A7ADB5';
    ctx.font = '14px monospace';
    ctx.fillText('THIS IS TO OFFICIALLY COMMISSION CADET', 400, 170);

    // Cadet Name
    ctx.fillStyle = '#5CB8FF';
    ctx.font = 'bold 36px monospace';
    ctx.fillText(cadetName.toUpperCase() || 'CADET EXPLORER', 400, 240);

    // Subtitle
    ctx.fillStyle = '#A7ADB5';
    ctx.font = '13px monospace';
    ctx.fillText('AS A LICENSED', 400, 300);

    ctx.fillStyle = '#48D597';
    ctx.font = 'bold 22px monospace';
    ctx.fillText('QUANTUM COMPUTING EXPLORATION SCIENTIST', 400, 345);

    // Description text
    ctx.fillStyle = '#7E848C';
    ctx.font = '11px monospace';
    ctx.fillText('Having successfully completed all navigation metrics and simulations', 400, 400);
    ctx.fillText('aboard the Deep-Space Research Vessel Archimedes.', 400, 420);

    // Signature line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(150, 500);
    ctx.lineTo(350, 500);
    ctx.moveTo(450, 500);
    ctx.lineTo(650, 500);
    ctx.stroke();

    // Signees labels
    ctx.fillStyle = '#A7ADB5';
    ctx.font = '11px monospace';
    ctx.fillText('ARCHIMEDES COMMANDER AI', 250, 520);
    ctx.fillText('DATE OF JOINT COMMISSION', 550, 520);

    ctx.fillStyle = '#5CB8FF';
    ctx.font = 'italic 12px Georgia';
    ctx.fillText('Archimedes V1.0', 250, 490);
    
    const today = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillStyle = '#ECECEC';
    ctx.font = '11px monospace';
    ctx.fillText(today, 550, 490);

    // Disclaimer
    ctx.fillStyle = '#55585d';
    ctx.font = '8px monospace';
    ctx.fillText('* This is a non-official award of participation from Ode to Quantum.', 400, 560);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cadetName.replace(/\s+/g, '_')}_quantum_cadet_cert.png`;
    a.click();
  };

  return (
    <div className="relative min-h-[85vh] w-full flex flex-col items-center justify-center text-center font-mono overflow-hidden py-12">
      {/* Dynamic warp starfield background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#07080b]">
        {/* Layer 1 Stars */}
        <div className={`absolute inset-0 bg-[radial-gradient(1px_1px_at_center,white,transparent_100%)] opacity-30 ${warpSpeed ? 'animate-pulse scale-150' : 'scale-100'} transition-transform duration-1000`} />
        {/* Warp speed lines */}
        {warpSpeed && (
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(20)].map((_, i) => {
              const rot = Math.random() * 360;
              const delay = Math.random() * 1.5;
              const len = 80 + Math.random() * 120;
              return (
                <div 
                  key={i} 
                  className="absolute bg-gradient-to-r from-transparent via-quantum-blue/45 to-transparent h-0.5 rounded-full"
                  style={{
                    width: `${len}px`,
                    transform: `rotate(${rot}deg) translateX(${150 + Math.random() * 200}px)`,
                    animation: `warp-line 1.2s infinite linear`,
                    animationDelay: `${delay}s`
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes warp-line {
          0% { transform: rotate(var(--rot)) translateX(0px) scaleX(0.2); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: rotate(var(--rot)) translateX(400px) scaleX(1.8); opacity: 0; }
        }
      `}</style>

      {/* Main Ceremony Box */}
      <div className="relative z-10 max-w-3xl w-full px-6 flex flex-col items-center">
        {warpSpeed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-16 h-16 rounded-full border border-quantum-blue bg-quantum-blue/10 flex items-center justify-center text-quantum-blue shadow-[0_0_20px_var(--color-quantum-blue)] animate-bounce">
              <Award size={32} />
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-quantum-text tracking-wider uppercase animate-pulse">
              Warp Drive Activated
            </h1>
            <p className="text-quantum-muted text-[12px] max-w-sm">
              Navigating hyperspace bounds. Delivering final cadets commission status report to fleet command...
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col items-center gap-8"
          >
            {!submitted ? (
              <div className="p-8 border border-quantum-border bg-quantum-card/65 backdrop-blur-md rounded-[16px] max-w-md w-full flex flex-col items-center gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                <div className="w-12 h-12 rounded-full border border-quantum-green bg-quantum-green/10 flex items-center justify-center text-quantum-green shadow-[0_0_15px_var(--color-quantum-green)]">
                  <Sparkles size={22} className="animate-spin-slow" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg text-quantum-text font-bold uppercase tracking-wider">Congratulations, Cadet!</h2>
                  <p className="text-[12px] text-quantum-muted leading-relaxed">
                    You have successfully navigated from basic binary operations to training neural networks in complex quantum Hilbert spaces. Enter your name below to generate your graduation commission.
                  </p>
                </div>

                <div className="w-full flex gap-2">
                  <input
                    type="text"
                    value={cadetName}
                    onChange={(e) => setCadetName(e.target.value)}
                    placeholder="Enter Cadet Name"
                    className="flex-grow bg-quantum-bg border border-quantum-border rounded-[10px] px-4 py-2.5 text-[12px] text-quantum-text outline-none focus:border-quantum-blue/50 focus:ring-1 focus:ring-quantum-blue/20 transition-all font-mono"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && cadetName.trim()) setSubmitted(true);
                    }}
                  />
                  <button
                    disabled={!cadetName.trim()}
                    onClick={() => setSubmitted(true)}
                    className="px-4 py-2.5 rounded-[10px] bg-quantum-text text-quantum-bg hover:bg-white text-[12px] font-bold transition-all disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send size={12} /> Commission
                  </button>
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-8 w-full"
              >
                {/* Dynamic Canvas element hidden but active for rendering */}
                <canvas 
                  ref={canvasRef} 
                  width={800} 
                  height={600} 
                  className="hidden"
                />

                {/* Styled CSS rendering of certificate preview */}
                <div className="w-full max-w-2xl aspect-[4/3] border-2 border-quantum-blue bg-quantum-card/50 backdrop-blur-md rounded-xl p-8 relative overflow-hidden flex flex-col justify-between items-center shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(92,184,255,0.06),transparent_80%)]" />
                  
                  {/* Decorative corner node lines */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-quantum-blue/40" />
                  <div className="absolute top-4 right-4 w-4 h-4 border-r border-t border-quantum-blue/40" />
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-quantum-blue/40" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-quantum-blue/40" />

                  <div className="text-center space-y-1">
                    <span className="text-[10px] text-quantum-blue uppercase tracking-widest block font-bold">Ode to Quantum Academy</span>
                    <h3 className="text-lg md:text-xl font-light text-quantum-text tracking-wider uppercase">Commission Certificate</h3>
                  </div>

                  <div className="text-center space-y-3">
                    <span className="text-[11px] text-quantum-muted uppercase tracking-widest block">This is to certify that</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-quantum-blue tracking-wide uppercase px-4 py-1.5 border-y border-quantum-border/60">
                      {cadetName}
                    </h2>
                    <span className="text-[10px] text-quantum-muted block tracking-widest mt-1">is hereby designated as a</span>
                    <span className="text-xs md:text-sm font-bold text-quantum-green tracking-widest uppercase block">
                      Quantum Computing Exploration Scientist
                    </span>
                  </div>

                  <div className="w-full flex justify-between items-end border-t border-quantum-border/40 pt-4 text-[10px] text-quantum-muted">
                    <div className="text-left">
                      <span className="italic block font-serif">Archimedes AI Commander</span>
                      <span className="text-[9px] uppercase tracking-wider text-quantum-dim">Archimedes Vessel V1.0</span>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-quantum-text">{new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span className="text-[9px] uppercase tracking-wider text-quantum-dim">Date of commission</span>
                    </div>
                  </div>

                  <span className="text-[7px] text-quantum-dim block mt-2">
                    * This is a non-official award of participation from Ode to Quantum.
                  </span>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-6 py-3 rounded-[12px] bg-quantum-text text-quantum-bg text-[12px] font-semibold hover:bg-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] cursor-pointer"
                  >
                    <Download size={14} /> Download Certificate (PNG)
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-[12px] border border-quantum-border hover:border-quantum-muted text-[12px] text-quantum-text bg-transparent transition-all cursor-pointer"
                  >
                    Edit Name
                  </button>
                </div>
              </motion.div>
            )}

            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[11px] text-quantum-dim hover:text-quantum-text transition-colors mt-8 cursor-pointer font-bold tracking-wider"
            >
              <ArrowLeft size={12} /> RETURN TO SHIP LOG
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
