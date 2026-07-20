import React from 'react';

// Helper to replace LaTeX math codes with clean unicode text
export function formatMathString(str: string): string {
  let s = str;
  // Replace symbols
  s = s.replace(/\\alpha/g, 'α');
  s = s.replace(/\\beta/g, 'β');
  s = s.replace(/\\gamma/g, 'γ');
  s = s.replace(/\\delta/g, 'δ');
  s = s.replace(/\\phi/g, 'φ');
  s = s.replace(/\\theta/g, 'θ');
  s = s.replace(/\\psi/g, 'ψ');
  s = s.replace(/\\Psi/g, 'Ψ');
  s = s.replace(/\\Phi/g, 'Φ');
  s = s.replace(/\\pi/g, 'π');
  s = s.replace(/\\hbar/g, 'ħ');
  s = s.replace(/\\langle/g, '⟨');
  s = s.replace(/\\rangle/g, '⟩');
  s = s.replace(/\\otimes/g, '⊗');
  s = s.replace(/\\oplus/g, '⊕');
  s = s.replace(/\\neg/g, '¬');
  s = s.replace(/\\land/g, '∧');
  s = s.replace(/\\lor/g, '∨');
  s = s.replace(/\\dots/g, '…');
  s = s.replace(/\\approx/g, '≈');
  s = s.replace(/\\neq/g, '≠');
  s = s.replace(/\\ge/g, '≥');
  s = s.replace(/\\le/g, '≤');
  s = s.replace(/\\sum/g, '∑');
  s = s.replace(/\\infty/g, '∞');
  s = s.replace(/\\dagger/g, '†');
  s = s.replace(/\\partial/g, '∂');
  s = s.replace(/\\to/g, '→');
  s = s.replace(/\\times/g, '×');
  s = s.replace(/\\arg\\min_\\theta/g, 'argmin_θ');
  s = s.replace(/\\in/g, '∈');
  s = s.replace(/\\{/g, '{');
  s = s.replace(/\\}/g, '}');
  
  // Clean up $ signs
  s = s.replace(/\$/g, '');
  
  return s;
}

function parseSubSuper(str: string): React.ReactNode[] {
  // Regex to match subscripts _xxx or _{xxx} and superscripts ^xxx or ^{xxx}
  const tokenRegex = /(\^\{[^\}]+\}|\^[0-9a-zA-Z\*†⊗\-+]+|_\{[^\}]+\}|_[0-9a-zA-Z_]+)/g;
  const parts = str.split(tokenRegex);
  
  return parts.map((part, index) => {
    if (part.startsWith('^')) {
      const val = part.startsWith('^{') ? part.slice(2, -1) : part.slice(1);
      return <sup key={index} className="text-[10px] text-quantum-blue font-bold align-super">{val}</sup>;
    } else if (part.startsWith('_')) {
      const val = part.startsWith('_{') ? part.slice(2, -1) : part.slice(1);
      return <sub key={index} className="text-[10px] text-quantum-dim align-sub">{val}</sub>;
    }
    return part;
  });
}

function renderFormattedText(str: string): React.ReactNode {
  let formatted = formatMathString(str);
  
  // Replace fractions
  formatted = formatted.replace(/\\frac\{1\}\{\\sqrt\{2\}\}/g, '1/1/√2'); // simplify to 1/√2
  formatted = formatted.replace(/1\/1\/\\sqrt\{2\}/g, '1/√2');
  formatted = formatted.replace(/\\frac\{1\}\{2\}/g, '1/2');
  
  const fracRegex = /\\frac\{([^{}]*)\}\{([^{}]*)\}/g;
  formatted = formatted.replace(fracRegex, '($1)/($2)');
  formatted = formatted.replace(/\(1\)\/\(\\sqrt\{2\}\)/g, '1/√2');
  formatted = formatted.replace(/\\sqrt\{2\}/g, '√2');
  formatted = formatted.replace(/\\sqrt\{N\}/g, '√N');
  
  return parseSubSuper(formatted);
}

interface MathRendererProps {
  text: string;
}

export function MathRenderer({ text }: MathRendererProps) {
  // Check if there is a pmatrix environment
  const matrixRegex = /\\begin\{pmatrix\}([\s\S]*?)\\end\{pmatrix\}/;
  const match = text.match(matrixRegex);

  if (match) {
    const rawMatrixContent = match[1];
    
    // Split the text into parts around the matrix
    const parts = text.split(matrixRegex);
    const beforeText = parts[0];
    const afterText = parts[parts.length - 1];

    // Parse matrix rows and columns
    const rows = rawMatrixContent.trim().split('\\\\').map(row => 
      row.trim().split('&').map(cell => cell.trim())
    );

    return (
      <span className="inline-flex flex-wrap items-center gap-1 font-mono text-[12px] align-middle my-1">
        {beforeText && <span className="inline-block">{renderFormattedText(beforeText)}</span>}
        <span className="inline-flex items-center mx-1.5 select-none align-middle">
          {/* Left Bracket */}
          <span className="border-l border-t border-b border-quantum-blue/70 w-1.5 h-8 rounded-l inline-block" />
          {/* Cells */}
          <span className="flex flex-col gap-0.5 px-2 py-0.5 text-center text-[11px] font-semibold text-quantum-green bg-quantum-card/20 rounded-sm">
            {rows.map((row, rIdx) => (
              <span key={rIdx} className="flex justify-center gap-2">
                {row.map((cell, cIdx) => (
                  <span key={cIdx} className="min-w-[12px] block text-center">
                    {renderFormattedText(cell)}
                  </span>
                ))}
              </span>
            ))}
          </span>
          {/* Right Bracket */}
          <span className="border-r border-t border-b border-quantum-blue/70 w-1.5 h-8 rounded-r inline-block" />
        </span>
        {afterText && <span className="inline-block">{renderFormattedText(afterText)}</span>}
      </span>
    );
  }

  return <span className="align-middle inline-block">{renderFormattedText(text)}</span>;
}
