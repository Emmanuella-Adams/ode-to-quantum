import { motion } from 'motion/react';

export function BlochSphere() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 4, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none flex items-center justify-center z-0"
      style={{ perspective: '1200px' }}
    >
      {/* Very soft background glow */}
      <div className="absolute inset-0 bg-quantum-muted/5 rounded-full blur-[100px]" />

      <motion.div
        animate={{ rotateX: [0, 360], rotateY: [0, 360], rotateZ: [0, 360] }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="relative w-[340px] h-[340px]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Outer sphere (silhouette) */}
        <div className="absolute inset-0 border border-quantum-dim/20 rounded-full" />

        {/* Z-axis circle (equator) */}
        <div className="absolute inset-0 border border-quantum-dim/30 rounded-full" style={{ transform: 'rotateX(90deg)' }} />
        {/* X-axis circle */}
        <div className="absolute inset-0 border border-quantum-dim/20 rounded-full" style={{ transform: 'rotateY(90deg)' }} />

        {/* Axes lines */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-quantum-dim/10" style={{ transform: 'translateX(-50%)' }} />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-quantum-dim/10" style={{ transform: 'translateY(-50%)' }} />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-quantum-dim/10" style={{ transform: 'translateY(-50%) rotateY(90deg)' }} />

        {/* State vector */}
        <div
          className="absolute top-1/2 left-1/2 w-[2px] h-[170px] bg-gradient-to-t from-transparent to-quantum-muted/60 origin-bottom"
          style={{ transform: 'translateX(-50%) translateY(-100%) rotateX(45deg) rotateY(45deg)' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-quantum-muted/80 rounded-full shadow-[0_0_15px_var(--color-quantum-muted)]" />
        </div>
      </motion.div>
    </motion.div>
  );
}
