# Ode to Quantum

[![License](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![React](https://img.shields.io/badge/Frontend-React%20%7C%20TypeScript-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Build%20Tool-Vite-646CFF)](https://vite.dev/)

An immersive, scientifically styled interactive educational platform designed to bridge the gap between classical computer science and Quantum Machine Learning (QML). 

Ode to Quantum assumes no prior knowledge of quantum physics, guiding explorers from basic state vector transitions to the parameter optimization of Variational Quantum Eigensolvers (VQE) through rich interactive simulators, math visualizers, and an inline client-side Qiskit command sandbox.

---

## 🌌 Core Modules & Curriculum

The training curriculum is structured into four sequential phases, representing the operational systems of a deep-space research vessel:

*   **Phase I: Foundations**: Exploring the physical limitations of classical bits, binary operations, vector representations, and the transition to quantum registers.
*   **Phase II: The Quantum World**: Mastering superposition, measurement probabilities, single-qubit rotation gates on the Bloch sphere, and multi-qubit entanglement arrays (Bell states).
*   **Phase III: Algorithms**: Designing Parameterized Quantum Circuits (PQCs), analyzing energy optimization landscapes, and programmatically executing the Quantum Approximate Optimization Algorithm (QAOA) and Variational Quantum Eigensolver (VQE).
*   **Phase IV: Quantum Machine Learning**: Building quantum feature maps, training variational classifiers, computing quantum kernels, and calibrating hybrid neural network lines.

---

## 🚀 Key Features

### 💻 Quantum Labs
A dedicated laboratory suite containing 12 hands-on coding experiments where learners apply concepts learned in the missions:
*   **Active Notebooks (Labs 00 - 07)**: Google Colab integration and direct `.ipynb` downloads covering superposition, entanglement, teleportation, and QML.
*   **Offline/Local Execution**: Complete support for downloading notebooks and launching them locally.
*   **Scientific Card Interface**: Each laboratory shows its difficulty, stardate calibration, estimated time, and skills practiced with quick Colab links, downloads, and link-copying.

### 🔬 Interactive Playgrounds & Simulators
*   **Bloch Sphere Visualizer**: A 3D visual representation of a single qubit's state space supporting dynamic rotations, gate applications (X, Y, Z, H), and measurement projections.
*   **Qiskit Sandbox Cell**: An inline, client-side Qiskit code editor built into the core interface, complete with code verification, hints, tab indentation support, and script export features.
*   **Vessel Telemetry Status**: Displays live subsystem statuses (Navigation, Quantum Core, Entanglement Array, Machine Learning) calibrated dynamically as missions are completed.

### 📐 Mathematical Grid Lens
A bespoke LaTeX mathematical parser that renders complex matrices (e.g. `\begin{pmatrix} a & b \\ c & d \end{pmatrix}`) and Dirac bra-ket notations (`|\psi(\theta)\rangle`) into styled, monospace grid matrices and symbols with custom neon borders. Math Lens mode can be toggled on/off to balance formal proof review with exploration.

### 🎓 Space Cadet Commission
Upon successfully completing the 20 curriculum missions, explorers unlock a starfield warp graduation sequence where they can input their cadet credentials to generate and download a personalized, high-resolution certificate.

---

## 🛠️ Architecture & Technology Stack

*   **Runtime Environment**: React (v18+) with TypeScript for static type-safety.
*   **Build Tool**: Vite for ultra-fast Hot Module Replacement (HMR) and production bundling.
*   **Styling & Design System**: Tailwind CSS v4 featuring custom HSL neon palette variables, monospace typography, and responsive layouts.
*   **Animations**: Motion (Framer Motion v11) for smooth state transitions and micro-animations.
*   **Quantum Core Simulator**: Client-side complex-number linear algebra library simulating multi-qubit operations, tensor products, and measurements.

---

## 💻 Local Development

### Prerequisites
*   [Node.js](https://nodejs.org/) (Version 18 or higher is recommended)

### Setup Instructions

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Emmanuella-Adams/ode-to-quantum.git
    cd ode-to-quantum
    ```

2.  **Install Node Dependencies**:
    ```bash
    npm install
    ```

3.  **Start the Local Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

4.  **Build the Production Bundle**:
    ```bash
    npm run build
    ```

5.  **Test the Production Build Locally**:
    ```bash
    npm run preview
    ```

---

## 📧 Contact & Communications

For questions, academic inquiries, or to report vessel telemetry anomalies, contact the command deck via the primary communications channel:
*   **Email**: [emmanuella0adams@gmail.com](mailto:emmanuella0adams@gmail.com)
*   **GitHub**: [@Emmanuella-Adams](https://github.com/Emmanuella-Adams)

---

## 📄 License

This project is licensed under the **Apache-2.0 License**. See the `LICENSE` file or header declarations for detailed terms.
