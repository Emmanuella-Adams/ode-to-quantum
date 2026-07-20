import { motion } from 'motion/react';
import { Activity, Lock, CheckCircle2, RotateCcw } from 'lucide-react';
import { lessonsData } from '../data/lessonsData';

export function SystemStatus({ completedLessons }: { completedLessons: string[] }) {
  // Determine subsystem statuses based on completed lessons
  const isL13Done = completedLessons.includes('l1') && completedLessons.includes('l2') && completedLessons.includes('l3');
  const isL47Done = completedLessons.includes('l4') && completedLessons.includes('l5') && completedLessons.includes('l6') && completedLessons.includes('l7');
  const isL89Done = completedLessons.includes('l8') && completedLessons.includes('l9');
  const isL10Done = completedLessons.includes('l10');
  const isL1114Done = completedLessons.includes('l11') && completedLessons.includes('l12') && completedLessons.includes('l13') && completedLessons.includes('l14');
  const isL1520Done = completedLessons.includes('l15') && completedLessons.includes('l16') && completedLessons.includes('l17') && completedLessons.includes('l18') && completedLessons.includes('l19') && completedLessons.includes('l20');

  const systems = [
    { 
      name: 'Navigation System', 
      status: isL13Done ? 'ONLINE' : completedLessons.includes('l1') ? 'CALIBRATING' : 'OFFLINE', 
      color: isL13Done ? 'text-quantum-green' : completedLessons.includes('l1') ? 'text-quantum-blue' : 'text-quantum-dim' 
    },
    { 
      name: 'Quantum Core', 
      status: isL47Done ? 'ONLINE' : isL13Done ? 'CALIBRATING' : 'LOCKED', 
      color: isL47Done ? 'text-quantum-green' : isL13Done ? 'text-quantum-blue' : 'text-quantum-dim' 
    },
    { 
      name: 'Circuit Lab', 
      status: isL89Done ? 'ONLINE' : isL47Done ? 'CALIBRATING' : 'LOCKED', 
      color: isL89Done ? 'text-quantum-green' : isL47Done ? 'text-quantum-blue' : 'text-quantum-dim' 
    },
    { 
      name: 'Entanglement Array', 
      status: isL10Done ? 'ONLINE' : isL89Done ? 'CALIBRATING' : 'LOCKED', 
      color: isL10Done ? 'text-quantum-green' : isL89Done ? 'text-quantum-blue' : 'text-quantum-dim' 
    },
    { 
      name: 'Machine Learning Module', 
      status: isL1520Done ? 'ONLINE' : isL1114Done ? 'CALIBRATING' : 'LOCKED', 
      color: isL1520Done ? 'text-quantum-green' : isL1114Done ? 'text-quantum-blue' : 'text-quantum-dim' 
    },
  ];

  const totalLessons = lessonsData.length;
  const completedCount = completedLessons.length;
  const readinessPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="p-6 rounded-[14px] border border-quantum-border bg-quantum-card flex flex-col gap-6 relative overflow-hidden transition-all duration-300 hover:border-quantum-border-hover hover:bg-quantum-card-hover"
    >
      <div className="absolute top-0 right-0 p-32 opacity-[0.03] pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full border border-white border-dashed" 
        />
      </div>

      <div className="flex items-center justify-between border-b border-quantum-border pb-4 relative z-10">
        <h3 className="text-[13px] text-quantum-text font-medium flex items-center gap-2">
          <Activity size={14} className="text-quantum-blue" />
          Vessel Systems
        </h3>
        <span className="text-[11px] text-quantum-dim tracking-widest">
          DIAGNOSTIC: {readinessPercent === 100 ? 'NOMINAL' : readinessPercent > 0 ? 'CALIBRATING' : 'STANDBY'}
        </span>
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        {systems.map((sys, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {sys.status === 'ONLINE' ? (
                <CheckCircle2 size={12} className="text-quantum-green" />
              ) : sys.status === 'LOCKED' || sys.status === 'OFFLINE' ? (
                <Lock size={12} className="text-quantum-dim" />
              ) : (
                <Activity size={12} className="text-quantum-blue animate-pulse" />
              )}
              <span className={`text-[12px] ${sys.status === 'LOCKED' ? 'text-quantum-dim' : 'text-quantum-muted'}`}>
                {sys.name}
              </span>
            </div>
            <span className={`text-[11px] font-medium tracking-wide ${sys.color}`}>
              {sys.status}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-2 pt-4 border-t border-quantum-border relative z-10">
        <div className="flex items-center justify-between text-[11px] text-quantum-dim mb-3 tracking-wide">
          <span>SYSTEM READINESS</span>
          <span className="text-quantum-text">{readinessPercent}%</span>
        </div>
        <div className="h-1.5 w-full bg-quantum-bg rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${readinessPercent}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-quantum-green/50 relative"
          >
            <div className="absolute inset-0 bg-quantum-green blur-[2px] opacity-60" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
