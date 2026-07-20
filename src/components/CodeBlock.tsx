import { useState } from 'react';
import { Copy, Check, Play, Download } from 'lucide-react';

export function CodeBlock({ code, language = 'python' }: { code: string, language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-[12px] border border-quantum-border bg-[#0D0F11] overflow-hidden my-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-quantum-border bg-quantum-card text-[12px]">
        <span className="text-quantum-dim uppercase tracking-wider font-medium">{language}</span>
        <div className="flex items-center gap-2">
          <button onClick={handleCopy} className="p-1.5 rounded bg-quantum-bg hover:bg-quantum-border text-quantum-muted hover:text-quantum-text transition-colors" title="Copy code">
            {copied ? <Check size={14} className="text-quantum-green" /> : <Copy size={14} />}
          </button>
          <button className="p-1.5 rounded bg-quantum-bg hover:bg-quantum-border text-quantum-muted hover:text-quantum-text transition-colors" title="Download Notebook">
            <Download size={14} />
          </button>
          <div className="w-px h-4 bg-quantum-border mx-1" />
          <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-quantum-blue/10 text-quantum-blue hover:bg-quantum-blue/20 transition-colors">
            <Play size={12} fill="currentColor" />
            <span className="font-medium">Run</span>
          </button>
        </div>
      </div>
      <div className="p-5 overflow-x-auto text-[12px] leading-[1.7] text-quantum-muted whitespace-pre font-mono custom-scrollbar">
        {code}
      </div>
    </div>
  );
}
