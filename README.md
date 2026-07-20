# Ode to Quantum - Interactive Quantum Learning Journey

Ode to Quantum is an immersive, visual-rich interactive educational explorer designed to teach Quantum Computing and Quantum Machine Learning (QML) concepts. 

From basic binary state transitions to parameter optimization of Variational Quantum Eigensolvers (VQE), users learn through interactive challenges, math visualizers, and an inline client-side Qiskit command sandbox.

---

## 🚀 Key Features

*   **Jupyter Qiskit Sandbox Cell**: A fully interactive Qiskit code editor built into lessons. Includes Tab indentation support, inline verification/checks, hint guides, and direct script exports (`.py`).
*   **Dynamic Qubit Wire Playground**: A drag-and-click quantum wire canvas supporting 1 to 4 qubits. Automatically computes statevector probabilities dynamically and features a dedicated live command console with an ASCII circuit layout drawer.
*   **Phase-Specific Interactive Simulators**:
    *   *Module I*: Binary bit operations and vector space transitions.
    *   *Module II*: Bloch Spheres, Hadamards, double-slit measurements, and Bell-state entanglement.
    *   *Module III*: Parameterized $Ry(\theta)$ qubit statevector rotation, gradient descent optimizations, QAOA Max-Cut graph partitioning, and Hydrogen ($H_2$) molecule ground state VQE distance optimizer.
    *   *Module IV*: Decision boundaries, quantum feature maps, and hybrid optimization lines.
*   **Mathematical Grid Lens**: Built-in parser converting LaTeX matrix formulas (e.g. `\begin{pmatrix} a & b \\ c & d \end{pmatrix}`) into styled grids with blue bracket borders, providing visual mathematical alignment without external script overhead.
*   **Space Cadet Commission**: Starfield warp graduation ceremony upon curriculum completion, allowing cadets to submit their name to render and download a custom Canvas-rendered certificate (`PNG`).

---

## 🛠️ Architecture & Stack

*   **Bundler**: [Vite](https://vite.dev/)
*   **Frontend**: React (TypeScript)
*   **Styling**: Tailwind CSS v4 & custom HSL neon palettes
*   **Animations**: Motion (Framer Motion v11)
*   **Icons**: Lucide React
*   **Quantum Simulation**: Pure client-side complex matrix multiplication simulator

---

## 💻 Local Development

### Prerequisites
*   [Node.js](https://nodejs.org/) (Version 18+ recommended)

### Setup Instructions

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start the local development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

3.  **Build the production bundle**:
    ```bash
    npm run build
    ```
    To test the production build locally:
    ```bash
    npm run preview
    ```

---

## 📄 License
This project is licensed under the Apache-2.0 License.
