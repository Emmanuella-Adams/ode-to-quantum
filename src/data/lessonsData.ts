export interface Lesson {
  id: string;
  phaseId: string;
  phaseTitle: string;
  title: string;
  story: string;
  intuition: string[];
  widgetType: 'welcome' | 'bit' | 'classical-limits' | 'qubit' | 'bloch' | 'superposition' | 'measurement' | 'gate' | 'circuit' | 'entanglement' | 'vqe' | 'qml';
  mathLens: {
    matrix?: string;
    dirac?: string;
    equations: string[];
  };
  code: {
    notebookCode: string;
    simulatedOutput: string;
    hint?: string;
    solution?: string;
    checkCode?: (code: string) => boolean;
  };
  challenge: {
    prompt: string;
    successMessage: string;
    check: (state: any) => boolean;
  };
  reflections: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  }[];
  summary: string[];
}

export const lessonsData: Lesson[] = [
  // --- PHASE I: FOUNDATIONS ---
  {
    id: 'l1',
    phaseId: '01',
    phaseTitle: 'Foundations',
    title: 'Welcome Aboard',
    story: 'AI: "Cadet, welcome to the Quantum Exploration Vessel Archimedes. Our main computer core is encountering complex calculations that standard silicon chips cannot resolve. To unlock the navigation systems, we must initialize our Quantum Core. First, verify your link with telemetry."',
    intuition: [
      'Computing is the process of translating information into physical states that can be manipulated.',
      'Classical computing uses voltage levels to represent bits (0 and 1).',
      'Quantum computing utilizes subatomic particles to process information in ways classical computers cannot.'
    ],
    widgetType: 'welcome',
    mathLens: {
      dirac: '|Cadet\\rangle',
      equations: [
        'Classical Information: $I(x) = -\\log_2 P(x)$',
        'State transition probabilities: $P(a \\to b) = |\\langle b | a \\rangle|^2$'
      ]
    },
    code: {
      notebookCode: '# Welcome Cadet! Check Python environment\nimport sys\nprint(f"System active. Python version: {sys.version.split()[0]}")',
      simulatedOutput: 'System active. Python version: 3.10.8\nArchimedes Quantum Link: ESTABLISHED',
      hint: 'Simply click "Run Cell" to verify your connection and print the active status.',
      solution: '# Welcome Cadet! Check Python environment\nimport sys\nprint(f"System active. Python version: {sys.version.split()[0]}")',
      checkCode: () => true
    },
    challenge: {
      prompt: 'Toggle the system link switch below to establish telemetry connection with the Archimedes AI.',
      successMessage: 'Link established! Navigation systems ready to begin cadet training.',
      check: (state) => state.telemetryActive === true
    },
    reflections: [
      {
        question: 'Why are we developing quantum computers?',
        options: [
          'To replace all home laptops and run web browsers faster.',
          'To solve specific, highly complex mathematical and physical problems that are intractable for classical computers.',
          'Because they are smaller and use less electricity.'
        ],
        answerIndex: 1,
        explanation: 'Quantum computers do not replace classical ones; they excel at specific parallel computational problems like molecular simulation and optimization.'
      }
    ],
    summary: [
      'Computing requires a physical medium.',
      'Classical computers are reaching their physical limits at the atomic scale.',
      'Quantum systems offer a new way of processing information.'
    ]
  },
  {
    id: 'l2',
    phaseId: '01',
    phaseTitle: 'Foundations',
    title: 'Bits, Binary, and Logic',
    story: 'AI: "Our auxiliary power router is malfunctioning. It runs on a classical logic gate that must route power to the life support systems. Set the bits and gates to route power safely."',
    intuition: [
      'A classical bit is the basic unit of information, taking the value 0 or 1.',
      'Logic gates (AND, OR, NOT, XOR) combine these bits to perform binary arithmetic.',
      'Everything in classical software is built upon layers of these simple logic gates.'
    ],
    widgetType: 'bit',
    mathLens: {
      matrix: 'NOT = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}',
      equations: [
        'AND: $A \\land B$',
        'OR: $A \\lor B$',
        'XOR: $A \\oplus B = (A \\land \\neg B) \\lor (\\neg A \\land B)$'
      ]
    },
    code: {
      notebookCode: '# Defining classical logic gates\ndef AND_gate(a, b):\n    return a & b\n\nprint("AND(1, 0) =", AND_gate(1, 0))',
      simulatedOutput: 'AND(1, 0) = 0'
    },
    challenge: {
      prompt: 'Configure Bit 1 to ON (1), Bit 2 to OFF (0), and select the XOR gate to output a logic high (1).',
      successMessage: 'Power routed successfully! Auxiliary systems are back online.',
      check: (state) => state.bit1 === 1 && state.bit2 === 0 && state.gate === 'XOR'
    },
    reflections: [
      {
        question: 'Which gate outputs 1 only when BOTH inputs are 1?',
        options: [
          'OR',
          'AND',
          'XOR'
        ],
        answerIndex: 1,
        explanation: 'An AND gate requires both inputs to be true (1) to produce a true (1) output.'
      }
    ],
    summary: [
      'A bit is binary (0 or 1).',
      'Logic gates map inputs to outputs based on boolean rules.',
      'XOR acts as an exclusive OR: true if inputs are different.'
    ]
  },
  {
    id: 'l3',
    phaseId: '01',
    phaseTitle: 'Foundations',
    title: 'Limits of Classical Computing',
    story: 'AI: "To plot a path through the asteroid field, the computer must solve a route optimization puzzle. There are N variables, and classical systems must check $2^N$ possibilities one-by-one. Watch how classical search struggles as variables increase."',
    intuition: [
      'Classical computers process solutions sequentially (one by one) or through limited parallel processing.',
      'Certain problems scale exponentially: adding one more variable doubles the search space.',
      'Examples include optimization, chemistry simulation, and cryptography.'
    ],
    widgetType: 'classical-limits',
    mathLens: {
      equations: [
        'Classical search complexity: $O(N)$ or $O(2^N)$',
        'Quantum search (Grover\'s): $O(\\sqrt{N})$ or $O(\\sqrt{2^N})$'
      ]
    },
    code: {
      notebookCode: '# Simulate exponential search space growth\nvariables = 10\nstates = 2**variables\nprint(f"Number of variables: {variables}")\nprint(f"Search space size: {states}")',
      simulatedOutput: 'Number of variables: 10\nSearch space size: 1024'
    },
    challenge: {
      prompt: 'Increase the number of variables to 5 or more and run the simulator to visualize the exponential explosion of search steps.',
      successMessage: 'Explosion witnessed! You see why checking $2^{10} = 1024$ or $2^{20} = 1,048,576$ states is too slow classically.',
      check: (state) => state.variables >= 5 && state.runCompleted === true
    },
    reflections: [
      {
        question: 'What is exponential growth in computational complexity?',
        options: [
          'The run time grows linearly with the input size.',
          'The run time doubles each time the input size increases by one.',
          'The run time is always constant.'
        ],
        answerIndex: 1,
        explanation: 'Exponential complexity ($2^N$) means adding one variable doubles the time, leading to trillions of steps for relatively small inputs.'
      }
    ],
    summary: [
      'Exponential problems quickly become impossible for classical supercomputers.',
      'We need a new physical computing model that uses quantum properties to evaluate states simultaneously.'
    ]
  },

  // --- PHASE II: THE QUANTUM WORLD ---
  {
    id: 'l4',
    phaseId: '02',
    phaseTitle: 'The Quantum World',
    title: 'Qubits',
    story: 'AI: "We are initializing the vessel\'s Quantum Core. Rather than transistors, we use trapped ions as qubits. Set the probability amplitudes of the qubit state $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$ to achieve a balanced superposition state."',
    intuition: [
      'A qubit is a quantum bit represented as a superposition of $|0\\rangle$ and $|1\\rangle$.',
      'The coefficients $\\alpha$ and $\\beta$ are complex probability amplitudes.',
      'The probability of measuring the state as 0 is $|\\alpha|^2$, and 1 is $|\\beta|^2$. The sum must equal 1 ($|\\alpha|^2 + |\\beta|^2 = 1$).'
    ],
    widgetType: 'qubit',
    mathLens: {
      dirac: '|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle',
      equations: [
        'Normalisation: $|\\alpha|^2 + |\\beta|^2 = 1$',
        'Measurement Probabilities: $P(0) = |\\alpha|^2$, $P(1) = |\\beta|^2$'
      ]
    },
    code: {
      notebookCode: 'from qiskit import QuantumCircuit\nqc = QuantumCircuit(1)\n# Qubits start in state |0>\nprint(qc)',
      simulatedOutput: '     ┌───┐\nq_0: ┤   ├\n     └───┘'
    },
    challenge: {
      prompt: 'Adjust the state slider to balance the state vector so that the probability of measuring state |1⟩ ($|\\beta|^2$) is exactly 50% (±5%).',
      successMessage: 'Qubit state balanced! You have created a 50/50 probability distribution.',
      check: (state) => Math.abs(state.prob1 - 0.5) < 0.05
    },
    reflections: [
      {
        question: 'If the amplitude of state |0⟩ is 0.6, what is the probability of measuring 0?',
        options: [
          '60%',
          '36%',
          '40%'
        ],
        answerIndex: 1,
        explanation: 'The probability is the square of the amplitude: $|0.6|^2 = 0.36 = 36\%$.'
      }
    ],
    summary: [
      'A qubit exists as a vector in a 2-dimensional Hilbert space.',
      'Amplitudes are complex numbers whose squared magnitudes represent probabilities.',
      'Upon measurement, the state collapses to either 0 or 1.'
    ]
  },
  {
    id: 'l5',
    phaseId: '02',
    phaseTitle: 'The Quantum World',
    title: 'The Bloch Sphere',
    story: 'AI: "To orient our quantum sensors, we must navigate the Bloch Sphere. Every point on this sphere represents a unique qubit state. Rotate the orientation vector to the positive X-axis (|+) state)."',
    intuition: [
      'The Bloch Sphere is a geometric representation of the pure state space of a qubit.',
      'The north pole represents $|0\\rangle$, and the south pole represents $|1\\rangle$.',
      'The equator represents states of equal superposition, differing only by relative phase ($\\phi$).',
      'Angles $\\theta$ (polar) and $\\phi$ (azimuthal) define the state vector.'
    ],
    widgetType: 'bloch',
    mathLens: {
      dirac: '|\\psi\\rangle = \\cos(\\theta/2)|0\\rangle + e^{i\\phi}\\sin(\\theta/2)|1\\rangle',
      equations: [
        'Polar angle $\\theta \\in [0, \\pi]$',
        'Azimuthal angle $\\phi \\in [0, 2\\pi]$',
        '$|+\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle)$, where $\\theta = \\pi/2, \\phi = 0$'
      ]
    },
    code: {
      notebookCode: 'from qiskit.visualization import plot_bloch_multigraph\n# Bloch visualization requires state vector simulation\nprint("Visualizing qubit on Bloch sphere...")',
      simulatedOutput: 'Visualizing qubit on Bloch sphere...\n[Sphere Rendered Successfully]'
    },
    challenge: {
      prompt: 'Adjust $\\theta$ to 90° (±5°) and $\\phi$ to 0° (±5°) to point the state vector towards the |+⟩ state.',
      successMessage: 'Sensor aligned to the |+⟩ equator state! Spatial coordinates locked.',
      check: (state) => Math.abs(state.theta - 90) < 5 && Math.abs(state.phi - 0) < 5
    },
    reflections: [
      {
        question: 'Which state is located at the south pole of the Bloch Sphere?',
        options: [
          '$|0\\rangle$',
          '$|1\\rangle$',
          '$|+\\rangle$'
        ],
        answerIndex: 1,
        explanation: 'The north pole is $|0\\rangle$ (where $\\theta=0$), and the south pole is $|1\\rangle$ (where $\\theta=\\pi$).'
      }
    ],
    summary: [
      'Any single qubit state can be plotted on the surface of a unit sphere.',
      'Rotations on the sphere correspond to quantum operations (gates).',
      'Phase shifts move the state along the equator.'
    ]
  },
  {
    id: 'l6',
    phaseId: '02',
    phaseTitle: 'The Quantum World',
    title: 'Superposition',
    story: 'AI: "We need to encrypt our telemetry broadcast using quantum noise. Apply a Hadamard gate (H-gate) to put our transmitter qubit into a state of perfect superposition."',
    intuition: [
      'Superposition allows a quantum system to exist in multiple states simultaneously.',
      'Applying the Hadamard gate (H) transforms the basis state $|0\\rangle$ into $|+\\rangle$ and $|1\\rangle$ into $|-\\rangle$.',
      'While in superposition, the qubit is both $|0\\rangle$ and $|1\\rangle$. Only upon measurement does it choose one.'
    ],
    widgetType: 'superposition',
    mathLens: {
      matrix: 'H = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}',
      equations: [
        '$H|0\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle) = |+\\rangle$',
        '$H|1\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle - |1\\rangle) = |-\\rangle$'
      ]
    },
    code: {
      notebookCode: 'from qiskit import QuantumCircuit\nqc = QuantumCircuit(1)\n# Apply Hadamard gate to qubit 0 below\n\nprint(qc)',
      simulatedOutput: '     ┌───┐\nq_0: ┤ H ├\n     └───┘',
      hint: 'Type qc.h(0) to apply the Hadamard gate to qubit 0.',
      solution: 'from qiskit import QuantumCircuit\nqc = QuantumCircuit(1)\nqc.h(0)\nprint(qc)',
      checkCode: (code) => code.replace(/\s+/g, '').includes('qc.h(0)')
    },
    challenge: {
      prompt: 'Apply the Hadamard (H) gate to the input |0⟩ state to put the qubit in superposition.',
      successMessage: 'Telemetry encrypted! The H-gate has initialized the superposition state.',
      check: (state) => state.hasHadamard === true
    },
    reflections: [
      {
        question: 'What happens to the state $H|0\\rangle$ when we measure it?',
        options: [
          'It always yields 0.',
          'It collapses to 0 with 50% probability or 1 with 50% probability.',
          'It yields a value of 0.5.'
        ],
        answerIndex: 1,
        explanation: 'Measurement forces the superposition to collapse into one of the basis states $|0\\rangle$ or $|1\\rangle$ with equal probability.'
      }
    ],
    summary: [
      'Superposition is not "being in two places at once," but rather a linear combination of states.',
      'The H gate is the primary mechanism for creating superposition from basis states.',
      'Interference can amplify correct answers and cancel out incorrect ones.'
    ]
  },
  {
    id: 'l7',
    phaseId: '02',
    phaseTitle: 'The Quantum World',
    title: 'Measurement & Collapse',
    story: 'AI: "To decrypt the received signals, we must observe the qubits. Remember: observing a quantum system collapses its wave function. Run multiple measurement trials and see how the probabilities translate to real-world statistical outcomes."',
    intuition: [
      'Before measurement, a qubit exists in superposition.',
      'Measurement forces the qubit to choose a definite state: $|0\\rangle$ or $|1\\rangle$.',
      'The act of measurement is destructive: it collapses the superposition, deleting the phase information.'
    ],
    widgetType: 'measurement',
    mathLens: {
      equations: [
        'Post-measurement state: $|\\psi_{post}\\rangle \\in \\{|0\\rangle, |1\\rangle\\}$',
        'Born Rule: $P(i) = |\\langle i | \\psi \\rangle|^2$'
      ]
    },
    code: {
      notebookCode: 'from qiskit import QuantumCircuit, transpile\nfrom qiskit_aer import AerSimulator\nqc = QuantumCircuit(1, 1)\nqc.h(0)\nqc.measure(0, 0)\nsim = AerSimulator()\n# Change shots to 100 or more below\njob = sim.run(qc, shots=10)\nprint(job.result().get_counts())',
      simulatedOutput: '{"0": 48, "1": 52}',
      hint: 'Modify the shots parameter in sim.run(qc, shots=10) to shots=100.',
      solution: 'from qiskit import QuantumCircuit, transpile\nfrom qiskit_aer import AerSimulator\nqc = QuantumCircuit(1, 1)\nqc.h(0)\nqc.measure(0, 0)\nsim = AerSimulator()\njob = sim.run(qc, shots=100)\nprint(job.result().get_counts())',
      checkCode: (code) => {
        const match = code.match(/shots\s*=\s*(\d+)/);
        return match ? parseInt(match[1]) >= 100 : false;
      }
    },
    challenge: {
      prompt: 'Set the measurement trials to 100 or higher and run the simulator to collapse the state vectors and gather statistics.',
      successMessage: 'Statistics gathered! The histogram matches the Born rule prediction.',
      check: (state) => state.trials >= 100 && state.measured === true
    },
    reflections: [
      {
        question: 'If we measure a qubit in superposition and get 0, what state is the qubit in immediately after the measurement?',
        options: [
          'It is still in superposition.',
          'It has collapsed into the $|0\\rangle$ state.',
          'It is in an unknown state.'
        ],
        answerIndex: 1,
        explanation: 'Immediately after measuring 0, the state is collapsed to $|0\\rangle$. Repeating the measurement will yield 0 with 100% certainty.'
      }
    ],
    summary: [
      'Quantum measurement is probabilistic, not deterministic.',
      'Measuring a qubit collapses its state.',
      'We run algorithms multiple times (shots) to reconstruct probability distributions.'
    ]
  },
  {
    id: 'l8',
    phaseId: '02',
    phaseTitle: 'The Quantum World',
    title: 'Quantum Gates',
    story: 'AI: "A software lock is blocking access to our sensory logs. We must manipulate the state vectors using single-qubit gates. To unlock the logs, apply an X gate, then an H gate to change the initial |0⟩ state into a |-⟩ state."',
    intuition: [
      'Quantum gates are mathematical operations that rotate the state vector on the Bloch sphere.',
      'X gate acts as a bit-flip (NOT gate), rotating 180° around the X-axis.',
      'Z gate is a phase-flip, changing the sign of $|1\\rangle$.',
      'Y gate combines both bit and phase flips.'
    ],
    widgetType: 'gate',
    mathLens: {
      matrix: 'X = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}, Z = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}',
      equations: [
        '$X|0\\rangle = |1\\rangle$',
        '$Z|+\\rangle = |-\\rangle$'
      ]
    },
    code: {
      notebookCode: 'from qiskit import QuantumCircuit\nqc = QuantumCircuit(1)\n# Apply X gate then H gate below\n\nprint(qc)',
      simulatedOutput: '     ┌───┐┌───┐\nq_0: ┤ X ├┤ H ├\n     └───┘└───┘',
      hint: 'Apply X gate with qc.x(0) and Hadamard gate with qc.h(0) on qubit 0.',
      solution: 'from qiskit import QuantumCircuit\nqc = QuantumCircuit(1)\nqc.x(0)\nqc.h(0)\nprint(qc)',
      checkCode: (code) => {
        const c = code.replace(/\s+/g, '');
        return c.includes('qc.x(0)') && c.includes('qc.h(0)');
      }
    },
    challenge: {
      prompt: 'Apply the Pauli-X gate (bit-flip), and then apply the Hadamard (H) gate to the qubit to put it into the state |-⟩.',
      successMessage: 'Lock bypassed! Sensory logs unlocked.',
      check: (state) => state.gatesApplied && state.gatesApplied[0] === 'X' && state.gatesApplied[1] === 'H'
    },
    reflections: [
      {
        question: 'What is the action of the Pauli-Z gate on the state $|0\\rangle$?',
        options: [
          'It turns it into $|1\\rangle$.',
          'It leaves it unchanged.',
          'It multiplies it by -1.'
        ],
        answerIndex: 1,
        explanation: 'Since $Z|0\\rangle = 1|0\\rangle$, the state $|0\\rangle$ remains completely unchanged by a Z gate.'
      }
    ],
    summary: [
      'Pauli gates (X, Y, Z) represent basic rotations.',
      'Quantum gates are represented by unitary matrices.',
      'Unitary operations preserve the total probability of 1.'
    ]
  },
  {
    id: 'l9',
    phaseId: '02',
    phaseTitle: 'The Quantum World',
    title: 'Quantum Circuits',
    story: 'AI: "To calibrate the navigation guidance, we must build a composite quantum circuit. Link the H gate to register q0 and a Measurement gate to measure the outcome. Observe the full circuit flow."',
    intuition: [
      'A quantum circuit is a sequence of gates executed over time, read left to right.',
      'Quantum registers hold qubits, and classical registers store classical bits from measurements.',
      'Circuits structure complex operations into algorithms.'
    ],
    widgetType: 'circuit',
    mathLens: {
      dirac: '|\\psi_t\\rangle = U_t U_{t-1} \\dots U_1 |00\\dots0\\rangle',
      equations: [
        'Composite Unitary Matrix: $U_{circuit} = U_n \\times U_{n-1} \\dots \\times U_1$'
      ]
    },
    code: {
      notebookCode: 'from qiskit import QuantumCircuit\nqc = QuantumCircuit(1, 1)\n# Apply Hadamard and measure qubit 0 below\n\nprint(qc)',
      simulatedOutput: '     ┌───┐┌─┐\nq_0: ┤ H ├┤M├\n     └───┘└╥┘\nc: 1/══════╩═\n           0 ',
      hint: 'Add a Hadamard gate with qc.h(0) and measurement with qc.measure(0, 0).',
      solution: 'from qiskit import QuantumCircuit\nqc = QuantumCircuit(1, 1)\nqc.h(0)\nqc.measure(0, 0)\nprint(qc)',
      checkCode: (code) => {
        const c = code.replace(/\s+/g, '');
        return c.includes('qc.h(0)') && c.includes('qc.measure(0,0)');
      }
    },
    challenge: {
      prompt: 'Construct a simple circuit: place a Hadamard (H) gate on the wire, and append a Measurement (M) gate to the qubit.',
      successMessage: 'Circuit compiled! Telemetry signal path calibrated.',
      check: (state) => state.hasH === true && state.hasM === true
    },
    reflections: [
      {
        question: 'Which way are gates in a quantum circuit diagram read?',
        options: [
          'Right to left',
          'Left to right',
          'Top to bottom'
        ],
        answerIndex: 1,
        explanation: 'Time flows from left to right in standard circuit diagrams.'
      }
    ],
    summary: [
      'Circuits organize qubits (wires) and gates (operations).',
      'Wires represent the continuous quantum state over time.',
      'Measurement collapses states and outputs classical bits.'
    ]
  },
  {
    id: 'l10',
    phaseId: '02',
    phaseTitle: 'The Quantum World',
    title: 'Quantum Entanglement',
    story: 'AI: "Warning! The ship\'s communication link is dropping out. We must link two qubits in quantum entanglement—Einstein\'s \'spooky action at a distance\'—to form a Bell State. This establishes a secure communication path."',
    intuition: [
      'Entanglement is a correlation between qubits that cannot be explained classically.',
      'In an entangled state, measuring one qubit instantly tells you the state of the other, no matter the distance.',
      'We create entanglement using a Hadamard gate to put the first qubit in superposition, followed by a CNOT gate controlled by the first qubit.'
    ],
    widgetType: 'entanglement',
    mathLens: {
      dirac: '|\\Phi^+\\rangle = \\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)',
      equations: [
        'Bell State amplitude: $\\alpha = 1/\\sqrt{2}, \\beta = 0, \\gamma = 0, \\delta = 1/\\sqrt{2}$',
        'State cannot be factored: $|\\Phi^+\\rangle \\neq |a\\rangle \\otimes |b\\rangle$'
      ]
    },
    code: {
      notebookCode: 'from qiskit import QuantumCircuit\nqc = QuantumCircuit(2)\n# Entangle qubit 0 and qubit 1 below\n\nqc.measure_all()\nprint("Bell state ready.")',
      simulatedOutput: 'Bell state ready.\nMeasured correlations: P(00)=50%, P(11)=50%, P(01)=0%, P(10)=0%',
      hint: 'To create entanglement, apply a Hadamard gate to qubit 0 (qc.h(0)) and a controlled-X gate from control qubit 0 to target qubit 1 (qc.cx(0, 1)).',
      solution: 'from qiskit import QuantumCircuit\nqc = QuantumCircuit(2)\nqc.h(0)\nqc.cx(0, 1)\nqc.measure_all()\nprint("Bell state ready.")',
      checkCode: (code) => {
        const c = code.replace(/\s+/g, '');
        return c.includes('qc.h(0)') && c.includes('qc.cx(0,1)');
      }
    },
    challenge: {
      prompt: 'Apply an H gate on Qubit A, and then apply a CNOT (CX) gate with Qubit A as the control and Qubit B as the target to entangle them.',
      successMessage: 'Subspace communications channel secured! Qubits are perfectly entangled.',
      check: (state) => state.bellStateCreated === true
    },
    reflections: [
      {
        question: 'If you measure Qubit A of an entangled Bell state $|\\Phi^+\\rangle$ and get 1, what will Qubit B measure?',
        options: [
          '0 with 100% probability.',
          '1 with 100% probability.',
          '0 or 1 with 50% probability.'
        ],
        answerIndex: 1,
        explanation: 'In the state $\\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)$, the outcomes are perfectly correlated: both are 0, or both are 1. Measuring A as 1 instantly collapses B to 1.'
      }
    ],
    summary: [
      'Entanglement binds qubit states together.',
      'Bell states are maximally entangled two-qubit states.',
      'Entanglement is the core resource for quantum teleportation.'
    ]
  },

  // --- PHASE III: ALGORITHMS ---
  {
    id: 'l11',
    phaseId: '03',
    phaseTitle: 'Algorithms',
    title: 'Variational Circuits',
    story: 'AI: "To calibrate our quantum engines, we use Parameterized Quantum Circuits (PQCs). These circuits use classical rotation parameters $\\theta$. Adjust the parameter slider to adjust the circuit\'s rotation angle."',
    intuition: [
      'Variational circuits use gate parameters (like rotation angles $\\theta$) that can be tuned by a classical optimizer.',
      'This hybrid classical-quantum approach is designed for the NISQ (Noisy Intermediate-Scale Quantum) era.',
      'By tuning parameters, we can approximate solutions to optimization and chemistry problems.'
    ],
    widgetType: 'vqe',
    mathLens: {
      dirac: '|\\psi(\\theta)\\rangle = U(\\theta)|0\\rangle',
      equations: [
        'Rotation gate: $R_y(\\theta) = \\begin{pmatrix} \\cos(\\theta/2) & -\\sin(\\theta/2) \\\\ \\sin(\\theta/2) & \\cos(\\theta/2) \\end{pmatrix}$'
      ]
    },
    code: {
      notebookCode: 'from qiskit import QuantumCircuit\nimport numpy as np\nqc = QuantumCircuit(1)\n# Apply Ry rotation with angle Pi to qubit 0 below\n\nprint(qc)',
      simulatedOutput: '     ┌──────────┐\nq_0: ┤ Ry(3.14) ├\n     └──────────┘',
      hint: 'Apply an Ry rotation using qc.ry(np.pi, 0) or qc.ry(3.14, 0).',
      solution: 'from qiskit import QuantumCircuit\nimport numpy as np\nqc = QuantumCircuit(1)\nqc.ry(np.pi, 0)\nprint(qc)',
      checkCode: (code) => {
        const c = code.replace(/\s+/g, '');
        return c.includes('qc.ry(') && (c.includes('pi') || c.includes('3.14'));
      }
    },
    challenge: {
      prompt: 'Adjust the rotation parameter $\\theta$ to exactly 3.14 radians (Pi) to flip the qubit state to |1⟩.',
      successMessage: 'State flipped! Parameterized gate angle calibrated.',
      check: (state) => Math.abs(state.theta - 3.14) < 0.1
    },
    reflections: [
      {
        question: 'What is a variational quantum circuit?',
        options: [
          'A circuit where the gates are completely random.',
          'A circuit that contains adjustable parameters tuned by a classical optimizer.',
          'A circuit that can only be run on classical hardware.'
        ],
        answerIndex: 1,
        explanation: 'Variational circuits use parameterized gates (like $R_y(\\theta)$) that are updated via classical feedback loops to minimize an objective function.'
      }
    ],
    summary: [
      'Parameterized gates allow continuous tuning of quantum states.',
      'Hybrid classical-quantum algorithms combine quantum state preparation with classical optimization.'
    ]
  },
  {
    id: 'l12',
    phaseId: '03',
    phaseTitle: 'Algorithms',
    title: 'Optimization Landscapes',
    story: 'AI: "The engines are firing, but they require tuning. Our objective function represents the energy efficiency. We need to find the minimum of this efficiency curve. Adjust the parameters to find the global minimum energy."',
    intuition: [
      'Tuning a quantum circuit creates an optimization landscape or energy curve.',
      'The goal is to find the parameter set $\\theta^*$ that minimizes the expected value $\\langle H \\rangle$.',
      'Classical algorithms calculate the gradient and step downhill.'
    ],
    widgetType: 'vqe',
    mathLens: {
      equations: [
        'Cost Function: $E(\\theta) = \\langle \\psi(\\theta) | H | \\psi(\\theta) \\rangle$',
        'Objective: $\\theta^* = \\arg\\min_\\theta E(\\theta)$'
      ]
    },
    code: {
      notebookCode: '# Classical optimization loop\nimport numpy as np\ndef cost_func(theta):\n    return np.cos(theta) + 0.2*np.sin(3*theta)\n\nprint("Evaluating landscape...")',
      simulatedOutput: 'Evaluating landscape...\nMinima located at theta = 2.45'
    },
    challenge: {
      prompt: 'Move the parameter slider to find the global minimum energy (where the value falls below -1.1).',
      successMessage: 'Minimum located! Engines stabilized.',
      check: (state) => state.energy < -1.1
    },
    reflections: [
      {
        question: 'What is the "Barren Plateau" problem in quantum optimization?',
        options: [
          'The optimizer gets stuck in a deep local minimum.',
          'The gradients of the cost function vanish exponentially, making optimization extremely difficult.',
          'The quantum computer runs out of qubits.'
        ],
        answerIndex: 1,
        explanation: 'Barren Plateaus are regions in parameter space where the gradient becomes exponentially flat, preventing classical optimizers from finding the direction of descent.'
      }
    ],
    summary: [
      'Optimization landscapes map parameters to cost values.',
      'Finding the global minimum requires avoiding local minima.',
      'Gradients guide the optimizer downhill.'
    ]
  },
  {
    id: 'l13',
    phaseId: '03',
    phaseTitle: 'Algorithms',
    title: 'Quantum Approximate Optimization (QAOA)',
    story: 'AI: "The ship\'s scheduling database has bottlenecked. Graph coloring and routing problems are NP-hard. QAOA can solve these combinatorial problems. Tune the mixer and cost Hamiltonian phases to find the optimal path through the nodes."',
    intuition: [
      'QAOA is designed to solve combinatorial optimization problems on graphs (e.g., Max-Cut).',
      'It alternates between applying a cost Hamiltonian (representing the problem constraints) and a mixer Hamiltonian (to allow quantum transitions).',
      'By increasing the depth ($p$), we get closer to the true optimal solution.'
    ],
    widgetType: 'vqe',
    mathLens: {
      dirac: '|\\gamma, \\beta\\rangle = e^{-i\\beta_p H_M} e^{-i\\gamma_p H_C} \\dots e^{-i\\beta_1 H_M} e^{-i\\gamma_1 H_C} |+\\rangle^{\\otimes n}',
      equations: [
        'Cost Hamiltonian: $H_C = \\sum C_{ij} Z_i Z_j$',
        'Mixer Hamiltonian: $H_M = \\sum X_i$'
      ]
    },
    code: {
      notebookCode: 'from qiskit.algorithms.minimum_eigensolvers import QAOA\n# Setting up QAOA with 2 steps (p=2)\nqaoa = QAOA(optimizer, reps=2)\nprint("QAOA Solver initialized.")',
      simulatedOutput: 'QAOA Solver initialized.\nTarget: Max-Cut Graph Partitioning'
    },
    challenge: {
      prompt: 'Tune the QAOA theta slider to reach an approximation ratio of over 95% (Energy below -1.4).',
      successMessage: 'Scheduling database optimized! Nodes partitioned successfully.',
      check: (state) => state.energy < -1.4
    },
    reflections: [
      {
        question: 'What is the role of the Mixer Hamiltonian in QAOA?',
        options: [
          'To measure the qubits.',
          'To explore different state configurations and ensure quantum tunneling between states.',
          'To define the constraints of the optimization problem.'
        ],
        answerIndex: 1,
        explanation: 'The mixer Hamiltonian (usually applying X-rotations) allows the state to transition and explore the search space, preventing it from getting stuck in one classical configuration.'
      }
    ],
    summary: [
      'QAOA maps graph nodes to qubits.',
      'It alternates cost and mixer operators to simulate adiabatic evolution.',
      'The algorithm outputs classical bit strings representing optimal partitions.'
    ]
  },
  {
    id: 'l14',
    phaseId: '03',
    phaseTitle: 'Algorithms',
    title: 'Variational Quantum Eigensolver (VQE)',
    story: 'AI: "To repair our radiation shielding, we must calculate the ground state energy of a molecular compound (Hydrogen). Standard chemistry calculations are too complex. Use VQE to find the molecular ground state energy."',
    intuition: [
      'VQE computes the ground state energy of a molecular Hamiltonian.',
      'It uses the Variational Principle: the expectation value of energy is always greater than or equal to the true ground state energy.',
      'The quantum processor prepares the state $|\\psi(\\theta)\\rangle$, and classical systems optimize $\\theta$ to minimize energy.'
    ],
    widgetType: 'vqe',
    mathLens: {
      equations: [
        'Molecular Hamiltonian: $H_e = \\sum h_{ij} a_i^\\dagger a_j + \\frac{1}{2} \\sum h_{ijkl} a_i^\\dagger a_j^\\dagger a_k a_l$',
        'Variational bound: $E(\\theta) = \\frac{\\langle \\psi(\\theta) | H | \\psi(\\theta) \\rangle}{\\langle \\psi(\\theta) | \\psi(\\theta) \\rangle} \\ge E_0$'
      ]
    },
    code: {
      notebookCode: 'from qiskit.algorithms.minimum_eigensolvers import VQE\nfrom qiskit.circuit.library import TwoLocal\nansatz = TwoLocal(rotation_blocks="ry", entanglement_blocks="cz")\nvqe = VQE(estimator, ansatz, optimizer)\nprint("VQE Chemistry solver compiled.")',
      simulatedOutput: 'VQE Chemistry solver compiled.\nHamiltonian: H2 molecule (d = 0.735 Å)'
    },
    challenge: {
      prompt: 'Adjust the variational parameters to minimize the VQE energy below -1.85 Hartree (simulating the H2 ground state).',
      successMessage: 'Hydrogen ground state found! Radiation shielding calibrated.',
      check: (state) => state.energy < -1.85
    },
    reflections: [
      {
        question: 'Why is VQE well-suited for near-term (NISQ) quantum computers?',
        options: [
          'It requires absolutely zero error correction and uses very short-duration circuits.',
          'It can run on classical computers faster than on quantum computers.',
          'It does not use qubits at all.'
        ],
        answerIndex: 0,
        explanation: 'Because VQE uses short parameterized circuits (ansatzes) and offloads optimization to classical hardware, it is highly robust to qubit noise.'
      }
    ],
    summary: [
      'VQE maps molecular orbitals to qubits.',
      'The Variational Principle guarantees we cannot overshoot the true ground state energy.',
      'VQE is a core algorithm for quantum chemistry and material science.'
    ]
  },

  // --- PHASE IV: QUANTUM MACHINE LEARNING ---
  {
    id: 'l15',
    phaseId: '04',
    phaseTitle: 'Quantum Machine Learning',
    title: 'QML Foundations',
    story: 'AI: "We have detected unidentified spatial anomalies. Classical machine learning classifiers are struggling to separate the noisy sensor readings. We must introduce Quantum Machine Learning (QML) to classify these multi-dimensional states."',
    intuition: [
      'QML merges quantum computing with machine learning.',
      'Quantum features utilize the high-dimensional Hilbert space of qubits to find patterns classical models miss.',
      'QML models include classifiers, neural networks, and kernel methods.'
    ],
    widgetType: 'qml',
    mathLens: {
      equations: [
        'Quantum state mapping: $x \\to |\\Phi(x)\\rangle$',
        'Hilbert Space dimensions: $D = 2^N$'
      ]
    },
    code: {
      notebookCode: '# Simple QML architecture diagram\nprint("Input Data -> Quantum Feature Map -> Variational Circuit -> Measurement -> Prediction")',
      simulatedOutput: 'Input Data -> Quantum Feature Map -> Variational Circuit -> Measurement -> Prediction'
    },
    challenge: {
      prompt: 'Initialize the QML classifier and run at least 1 epoch of training to establish a baseline accuracy.',
      successMessage: 'QML model initialized! We are ready to enhance the classification maps.',
      check: (state) => state.epochs >= 1
    },
    reflections: [
      {
        question: 'What is the primary advantage of processing data in a quantum Hilbert space?',
        options: [
          'Data is automatically compressed to 1 bit.',
          'The space scales exponentially ($2^N$), allowing us to project data into high dimensions to find linear separations.',
          'It makes the training process instantaneous.'
        ],
        answerIndex: 1,
        explanation: 'By mapping classical data into the $2^N$-dimensional quantum state space, we can project non-linearly separable data into a space where it can be separated.'
      }
    ],
    summary: [
      'QML uses quantum states to represent and process data.',
      'Mapping classical data to quantum states is a key bottleneck called data encoding.',
      'QML offers potential representation advantages over classical models.'
    ]
  },
  {
    id: 'l16',
    phaseId: '04',
    phaseTitle: 'Quantum Machine Learning',
    title: 'Quantum Feature Maps',
    story: 'AI: "To separate the overlapping signals of the spatial anomalies, we must map them into a quantum feature space. Choose the ZZFeatureMap and adjust its parameters to separate the blue and red data points."',
    intuition: [
      'A quantum feature map maps classical data points $x$ to a quantum state $|\\Phi(x)\\rangle$.',
      'The mapping is chosen such that the classical data is mapped to a highly entangled state, making it hard to simulate classically.',
      'Common feature maps are ZZFeatureMap, ZFeatureMap, and PauliFeatureMap.'
    ],
    widgetType: 'qml',
    mathLens: {
      dirac: '|\\Phi(x)\\rangle = U_{\\Phi(x)}|0\\rangle^{\\otimes n}',
      equations: [
        'ZZFeatureMap phase: $\\phi_{i,j}(x) = 2(\\pi - x_i)(\\pi - x_j)$'
      ]
    },
    code: {
      notebookCode: 'from qiskit.circuit.library import ZZFeatureMap\n# Create a ZZFeatureMap with feature dimension 2 and reps 2 below\n\nprint(fmap.decompose())',
      simulatedOutput: '     ┌───┐┌──────────┐                     \nq_0: ┤ H ├┤ P(2.0*x) ├──■──────────────────\n     ├───┤├──────────┤┌─┴─┐┌──────────────┐\nq_1: ┤ H ├┤ P(2.0*y) ├┤ X ├┤ P(2.0*x_y_z) ├\n     └───┘└──────────┘└───┘└──────────────┘',
      hint: 'Type fmap = ZZFeatureMap(feature_dimension=2, reps=2) to declare the feature map.',
      solution: 'from qiskit.circuit.library import ZZFeatureMap\nfmap = ZZFeatureMap(feature_dimension=2, reps=2)\nprint(fmap.decompose())',
      checkCode: (code) => code.includes('ZZFeatureMap') && (code.includes('reps=2') || code.includes('reps = 2'))
    },
    challenge: {
      prompt: 'Select the "ZZFeatureMap" from the control panel to project the non-linear data into an entangled quantum space.',
      successMessage: 'ZZFeatureMap applied! The features are projected into high-dimensional Hilbert space.',
      check: (state) => state.featureMap === 'ZZFeatureMap'
    },
    reflections: [
      {
        question: 'Why do we use ZZFeatureMap instead of ZFeatureMap for complex data?',
        options: [
          'ZFeatureMap is too slow.',
          'ZZFeatureMap introduces multi-qubit entanglement, allowing the representation of correlations between input features.',
          'ZZFeatureMap uses fewer qubits.'
        ],
        answerIndex: 1,
        explanation: 'ZZFeatureMap includes two-qubit gates that entangle qubits, enabling the model to learn relationships between different input features ($x_i$ and $x_j$).'
      }
    ],
    summary: [
      'Feature maps translate classical values into qubit rotations and phases.',
      'Entangling feature maps are necessary to achieve quantum advantages.'
    ]
  },
  {
    id: 'l17',
    phaseId: '04',
    phaseTitle: 'Quantum Machine Learning',
    title: 'Variational Classifiers (VQC)',
    story: 'AI: "We are ready to train our classifier. The VQC maps data using a feature map, applies a parameterized ansatz, and measures the state. Run the training cycles to adjust the classifier\'s decision boundary."',
    intuition: [
      'VQC is a supervised learning algorithm.',
      'It combines a quantum feature map with a trainable variational circuit (ansatz).',
      'The parameters are trained using classical gradient descent to minimize cross-entropy loss.'
    ],
    widgetType: 'qml',
    mathLens: {
      equations: [
        'VQC Output: $f(x, \\theta) = \\langle 0 | U^\\dagger_{\\Phi(x)} U^\\dagger(\\theta) Z U(\\theta) U_{\\Phi(x)} | 0 \\rangle$',
        'Loss function: $L(\\theta) = -\\frac{1}{M}\\sum y_i \\log(P(y_i|x_i, \\theta)) + (1-y_i)\\log(1-P(y_i|x_i, \\theta))$'
      ]
    },
    code: {
      notebookCode: 'from qiskit_machine_learning.algorithms import VQC\nvqc = VQC(feature_map=fmap, ansatz=ansatz, optimizer=cobyla)\nvqc.fit(X_train, y_train)\nprint("Model trained.")',
      simulatedOutput: 'VQC Fit Complete. Final Loss: 0.284'
    },
    challenge: {
      prompt: 'Train the VQC for at least 5 epochs and observe the decision boundary bending to fit the anomaly data.',
      successMessage: 'VQC model trained! Decision boundary matches the anomaly profile.',
      check: (state) => state.epochs >= 5
    },
    reflections: [
      {
        question: 'What constitutes the "ansatz" in a Variational Quantum Classifier?',
        options: [
          'The data encoding block.',
          'The trainable parameterized quantum circuit that serves as the model weight layers.',
          'The measurement device.'
        ],
        answerIndex: 1,
        explanation: 'The ansatz is the collection of parameterized rotation and entanglement gates that are tuned during training, analogous to weights in a neural network.'
      }
    ],
    summary: [
      'VQC works like a classical neural network but operates on qubits.',
      'The feature map encodes data; the ansatz processes it.',
      'Parameter optimization is done classically.'
    ]
  },
  {
    id: 'l18',
    phaseId: '04',
    phaseTitle: 'Quantum Machine Learning',
    title: 'Quantum Kernel Methods',
    story: 'AI: "Our anomaly readings are highly intertwined. Instead of training parameters, we can calculate the quantum kernel—measuring the similarity between different states in the Hilbert space. Compute the kernel matrix to classify the states."',
    intuition: [
      'Quantum Kernel Methods calculate the inner product between quantum states.',
      'The quantum kernel function $K(x, y) = |\\langle \\Phi(x) | \\Phi(y) \\rangle|^2$ measures data similarity.',
      'This kernel is fed into a classical Support Vector Machine (SVM).'
    ],
    widgetType: 'qml',
    mathLens: {
      dirac: 'K(x, y) = |\\langle 0 | U^\\dagger_{\\Phi(y)} U_{\\Phi(x)} | 0 \\rangle|^2',
      equations: [
        'Kernel Matrix: $\\mathbf{K}_{ij} = K(x_i, x_j)$',
        'Support Vector Machine objective: $\\max_{\\alpha} \\sum \\alpha_i - \\frac{1}{2}\\sum \\alpha_i \\alpha_j y_i y_j K(x_i, x_j)$'
      ]
    },
    code: {
      notebookCode: 'from qiskit_machine_learning.kernels import FidelityQuantumKernel\nkernel = FidelityQuantumKernel(feature_map=fmap)\nmatrix = kernel.evaluate(x_vec, y_vec)\nprint("Quantum Kernel Matrix computed.")',
      simulatedOutput: 'Quantum Kernel Matrix computed. Size: 100x100'
    },
    challenge: {
      prompt: 'Increase the kernel resolution to "high" and execute the kernel mapping to evaluate state similarity.',
      successMessage: 'Kernel mapped! Quantum similarity metrics calculated successfully.',
      check: (state) => state.resolution === 'high' && state.kernelEvaluated === true
    },
    reflections: [
      {
        question: 'What does a quantum kernel value of 1.0 between two data points mean?',
        options: [
          'The points are opposite in the Hilbert space.',
          'The points map to the exact same quantum state.',
          'The points are completely uncorrelated.'
        ],
        answerIndex: 1,
        explanation: 'A kernel value of 1.0 means $|\\langle \\Phi(x) | \\Phi(y) \\rangle|^2 = 1.0$, indicating the two states are identical in the Hilbert space.'
      }
    ],
    summary: [
      'Quantum kernels measure similarity by projection overlap.',
      'No parameter training is required on the quantum chip.',
      'Allows classical machine learning algorithms to leverage quantum representations.'
    ]
  },
  {
    id: 'l19',
    phaseId: '04',
    phaseTitle: 'Quantum Machine Learning',
    title: 'Hybrid Q-C Models',
    story: 'AI: "To fully operationalize our sensor array, we must bridge classical Neural Networks with Quantum Circuits, forming a Hybrid Model. Pass features through classical layers, then let qubits refine the classifications."',
    intuition: [
      'Hybrid classical-quantum models combine deep learning with quantum circuits.',
      'A classical network processes high-dimensional inputs (like images) down to a few features, which are then passed to a quantum circuit.',
      'Gradients are backpropagated through both the quantum and classical components.'
    ],
    widgetType: 'qml',
    mathLens: {
      equations: [
        'Classical layer: $z = W a + b$',
        'Quantum layer: $y = f(z, \\theta)$',
        'Chain rule gradient: $\\frac{\\partial L}{\\partial W} = \\frac{\\partial L}{\\partial y} \\frac{\\partial y}{\\partial z} \\frac{\\partial z}{\\partial W}$'
      ]
    },
    code: {
      notebookCode: '# Simulating PyTorch + Qiskit (TorchConnector)\nimport torch\nimport torch.nn as nn\nclass HybridModel(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.clayer = nn.Linear(10, 2)\n        self.qlayer = QuantumLayer() # Qiskit connector\n\nprint("Hybrid model loaded.")',
      simulatedOutput: 'Hybrid model loaded.\nForward pass & Backward pass channels: ACTIVE'
    },
    challenge: {
      prompt: 'Enable the Hybrid mode switch and run training to optimize both classical weights and quantum parameters together.',
      successMessage: 'Hybrid model optimized! Navigation and telemetry fully synchronized.',
      check: (state) => state.hybridMode === true && state.epochs >= 3
    },
    reflections: [
      {
        question: 'How are gradients calculated through the quantum circuit?',
        options: [
          'Using standard classical backpropagation.',
          'Using the Parameter Shift Rule, executing the circuit at shifted values ($\theta \pm s$).',
          'Quantum circuits do not have gradients.'
        ],
        answerIndex: 1,
        explanation: 'Since quantum chips do not keep track of intermediate mathematical operations, we calculate exact gradients using the Parameter Shift Rule, which evaluates the circuit at $\theta + s$ and $\theta - s$.'
      }
    ],
    summary: [
      'Hybrid models combine PyTorch/TensorFlow with Qiskit.',
      'Classical layers handle dimension reduction; quantum layers capture complex correlations.',
      'Parameter Shift Rule enables backpropagation through physical quantum hardware.'
    ]
  },
  {
    id: 'l20', // Final Mission
    phaseId: '04',
    phaseTitle: 'Quantum Machine Learning',
    title: 'Final Mission: Anomalous Particle Classifier',
    story: 'AI: "Cadet, this is your final mission. We have reached the edge of the galaxy and encountered a dangerous quantum particle field. To navigate through, you must train your Variational Quantum Classifier to achieve an accuracy of at least 92%. Best of luck."',
    intuition: [
      'This final project synthesizes everything you have learned.',
      'You will choose a feature map, set parameters, select optimizer learning rates, and train the VQC.',
      'A successful classification will steer the Archimedes to safety!'
    ],
    widgetType: 'qml',
    mathLens: {
      dirac: '|\\Psi(x, \\theta)\\rangle = U(\\theta) U_{\\Phi(x)} |0\\dots0\\rangle',
      equations: [
        'Fidelity: $F = |\\langle \\psi_{target} | \\psi_{pred} \\rangle|^2$',
        'Total Quantum Cadet Level: $\\infty$'
      ]
    },
    code: {
      notebookCode: '# Final VQC Assembly\n# Initialize VQC with ZZFeatureMap (reps=3) and SPSA (maxiter=100) below\n\nprint(f"Final Accuracy: {vqc.score(X_space, y_space)*100:.2f}%")',
      simulatedOutput: 'Final Accuracy: 94.20%\nMISSION ACCOMPLISHED: PATHWAY CLEAR',
      hint: 'Type vqc = VQC(fmap, ansatz, optimizer=SPSA(maxiter=100)) to compile the final hybrid classifier.',
      solution: '# Final VQC Assembly\nfmap = ZZFeatureMap(2, reps=3)\nansatz = RealAmplitudes(2, reps=3)\nvqc = VQC(fmap, ansatz, optimizer=SPSA(maxiter=100))\nvqc.fit(X_space, y_space)\nprint(f"Final Accuracy: {vqc.score(X_space, y_space)*100:.2f}%")',
      checkCode: (code) => code.includes('ZZFeatureMap') && code.includes('VQC') && (code.includes('maxiter=100') || code.includes('maxiter = 100'))
    },
    challenge: {
      prompt: 'Configure learning rate to 0.05, select ZZFeatureMap, and train the classifier until the classification accuracy reaches or exceeds 92%.',
      successMessage: 'Mission accomplished! Quantum engines online, telemetry fully calibrated, pathway cleared. You are now a Quantum Scientist!',
      check: (state) => state.accuracy >= 0.92 && state.featureMap === 'ZZFeatureMap'
    },
    reflections: [
      {
        question: 'Which quantum property does the ZZFeatureMap exploit to create complex boundaries?',
        options: [
          'Qubit decay.',
          'Quantum entanglement and relative phase shifts.',
          'Standard binary routing.'
        ],
        answerIndex: 1,
        explanation: 'ZZFeatureMap uses Hadamard gates for superposition, phase gates for features, and controlled-phase (or CNOT-like) rotations to create complex entangled states.'
      }
    ],
    summary: [
      'You successfully trained a Variational Quantum Classifier.',
      'You solved the non-linear classification problem using quantum Hilbert spaces.',
      'You are ready to explore real Qiskit development and quantum computing research!'
    ]
  }
];
