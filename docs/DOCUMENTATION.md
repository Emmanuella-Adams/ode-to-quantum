# Technical Documentation & Architecture

This document describes the architectural layout, core simulator engine mechanics, and component design patterns implemented in **Ode to Quantum**.

---

## 🏛️ System Architecture

Ode to Quantum is structured as a client-side Single Page Application (SPA) designed to load instantly and run independently of a heavy backend database.

```
       ┌────────────────────────────────────────────────────────┐
       │                       App.tsx                          │
       │     (State Router, Telemetry Progress, Math Lens)      │
       └───────────────────────────┬────────────────────────────┘
                                   │
         ┌─────────────────────────┼────────────────────────┐
         ▼                         ▼                        ▼
 ┌──────────────┐          ┌──────────────┐          ┌──────────────┐
 │  Curriculum  │          │ MissionView  │          │  Playground  │
 │  (Missions)  │          │ (Simulators) │          │ (Bloch/AST)  │
 └──────────────┘          └───────┬──────┘          └──────┬───────┘
                                   │                        │
                                   └───────────┬────────────┘
                                               ▼
                                     ┌──────────────────┐
                                     │  Simulators.tsx  │
                                     │ (Matrix Engine & │
                                     │  Qiskit Parser)  │
                                     └──────────────────┘
```

### Key Technical Specs:
*   **Compilation & Bundling:** Vite 6 with React 19.
*   **Static Type Checking:** TypeScript 5 for strict interface compliance.
*   **Styling Engine:** Tailwind CSS v4 utilizing CSS variable bindings for themed styling.
*   **Animation System:** Motion (Framer Motion v12) for GPU-accelerated interface flows.

---

## 🔬 The Custom Quantum Simulator Engine (`Simulators.tsx`)

At the core of the application lies a high-performance linear algebra engine written in pure TypeScript. It handles complex number arithmetic, vector-matrix operations, Kronecker tensor products, and circuit state management entirely in the client's browser.

### 1. Mathematical Representation
A quantum state vector of $N$ qubits is represented as a 1D array of $2^N$ complex numbers:
$$\Psi = \begin{pmatrix} c_0 \\ c_1 \\ \vdots \\ c_{2^N-1} \end{pmatrix}$$
Each complex number is modeled as a structure:
```typescript
interface Complex {
  real: number;
  imag: number;
}
```

### 2. Core Matrix Operations
*   **Matrix Multiplication:** Applies gate matrices directly to the state vectors.
*   **Tensor (Kronecker) Product:** Combines single-qubit state vectors or gate matrices to simulate multi-qubit systems:
    ```typescript
    function tensorProduct(a: Complex[], b: Complex[]): Complex[] {
      const result: Complex[] = [];
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
          result.push(multiplyComplex(a[i], b[j]));
        }
      }
      return result;
    }
    ```
*   **Partial Measurement Probabilities:** Calculates the probability amplitude squared ($|c_i|^2$) for state components and applies projection operators for post-measurement state collapse.

### 3. Client-Side Qiskit Command Sandbox (AST Parser)
The playground includes a lightweight compiler that interprets standard Qiskit syntax.
*   **Tokenization:** Splits incoming lines of text (e.g., `qc.h(0)`, `qc.cx(0,1)`) using regular expressions.
*   **AST Construction:** Translates instructions into an Abstract Syntax Tree:
    ```typescript
    interface Instruction {
      gate: string;
      targets: number[];
      params?: number[];
    }
    ```
*   **Execution:** Sequentially applies corresponding unitary gates (Hadamard, CNOT, Phase, Rx, Ry, Rz) to the multi-qubit state vector and maps the resulting state to the 3D Bloch Sphere.

---

## 🧩 UI Component Structure & Hierarchy

The visual design is divided into reusable UI components under `src/components/`:

### 1. Navigation & State Routing
*   **[App.tsx](file:///c:/Users/Lenovo/Downloads/ode-to-quantum/src/App.tsx):** Tracks the global view state (`home`, `mission`, `playground`, `notebook`, `resources`, `about`, `graduation`) and syncs user lesson progress to local storage (`otq_completed_lessons`).
*   **[Navbar.tsx](file:///c:/Users/Lenovo/Downloads/ode-to-quantum/src/components/Navbar.tsx):** Controls header tabs and provides the toggle switch for the Math Lens.

### 2. Dashboard & Telemetry
*   **[Hero.tsx](file:///c:/Users/Lenovo/Downloads/ode-to-quantum/src/components/Hero.tsx):** Renders the greeting bridge modules, stardate calculations, and prompt warnings.
*   **[SystemStatus.tsx](file:///c:/Users/Lenovo/Downloads/ode-to-quantum/src/components/SystemStatus.tsx):** Maps curriculum progress to ship telemetry (e.g. Navigation systems, Quantum Core status, Entanglement checks) using interactive progress circular dials.

### 3. Interactive Reading & Math Engine
*   **[MissionView.tsx](file:///c:/Users/Lenovo/Downloads/ode-to-quantum/src/components/MissionView.tsx):** Hosts the reading pane for the 20 missions. Triggers respective simulators dynamically based on the active lesson ID.
*   **[MathRenderer.tsx](file:///c:/Users/Lenovo/Downloads/ode-to-quantum/src/components/MathRenderer.tsx):** A custom LaTeX translator. It parses strings like `\begin{pmatrix} a & b \\ c & d \end{pmatrix}` and Dirac strings like `|\psi\rangle` into monospaced layout tables, preventing browser text overflow while making formal mathematical notation intuitive.

### 4. Playgrounds & Laboratories
*   **[PlaygroundView.tsx](file:///c:/Users/Lenovo/Downloads/ode-to-quantum/src/components/PlaygroundView.tsx):** Combines the canvas-based 3D Bloch Sphere rotation rendering and the AST Qiskit syntax playground.
*   **[NotebookView.tsx](file:///c:/Users/Lenovo/Downloads/ode-to-quantum/src/components/NotebookView.tsx):** Renders lab cards containing links to Colab, download options, skill badges, and difficulty estimators.

---

## 🛠️ Verification & Building Instructions

To build the static application assets:
```bash
# Build production code
npm run build

# Preview production build locally
npm run preview
```
The output is bundled into the `dist/` directory, optimized for static deployment platforms (like GitHub Pages, Vercel, or Netlify).
