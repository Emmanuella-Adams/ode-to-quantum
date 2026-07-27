# Academic References, Licensing, & AI Usage Disclosure

This document provides formal citations, library licensing details, and generative AI declarations for **Ode to Quantum** in compliance with the submission requirements for the **WISER Education Challenge**.

---

## 📖 Curricular & Academic References

### 1. Primary Textbooks & Research Literature
*   **Nielsen, M. A., & Chuang, I. L. (2010).** *Quantum Computation and Quantum Information (10th Anniversary Edition).* Cambridge University Press. 
    *   *Role in Project:* Used as the primary theoretical anchor for all curriculum units. Specifically referenced for state vector definitions, Kronecker products, density matrices, and quantum gate operations (Sections 1.3, 2.1, and 4.2).
    *   *Access Link:* [Nielsen & Chuang PDF](https://profmcruz.wordpress.com/wp-content/uploads/2017/08/quantum-computation-and-quantum-information-nielsen-chuang.pdf)
    *   *ISBN:* 978-0521635035
*   **Abhijith, J., et al. (2020).** *Quantum Algorithm Implementations for Beginners.* arXiv preprint arXiv:1804.03719.
    *   *Role in Project:* Provided operational structures for multi-qubit systems, entanglement proofs, and quantum teleportation protocols.

### 2. Quantum Software SDKs & Documentation
*   **Qiskit Documentation and Developer Guides (v1.0+)**
    *   *Publisher:* IBM Quantum.
    *   *Role in Project:* Referenced to design the inline compiler AST, verifying that functions like `qc.h(0)`, `qc.cx(0,1)`, and state representation outputs conform to standard Qiskit developer workflows.
    *   *Access Link:* [Qiskit Developer Guides](https://quantum.cloud.ibm.com/docs/en/guides)

### 3. Mathematics & Interactive Physics Visualizations
*   **Sanderson, Grant (3Blue1Brown).** *Essence of linear algebra* (Video Lecture Series).
    *   *Role in Project:* Inspired the pedagogical transition from matrix grids to visual geometric transformations (such as projecting vectors and coordinate transformations).
    *   *Access Link:* [Essence of Linear Algebra on YouTube](https://youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab)
*   **Kherb, J. (2021).** *Bloch Sphere Visual Simulator.*
    *   *Role in Project:* Provided inspiration for constructing my custom interactive 3D qubit vector rotation tool on a canvas.
    *   *Access Link:* [Bloch Sphere Tool by Kherb](https://bloch.kherb.io/)

---

## 🛠️ Open-Source Software Licenses

Ode to Quantum relies on the following open-source frameworks and libraries:

### 1. React & ReactDOM (v19)
*   **License:** MIT License
*   *Copyright:* (c) Meta Platforms, Inc. and affiliates.
*   *Permissions:* Software is provided "as is" with permission to use, copy, modify, merge, publish, and distribute.

### 2. Vite (v6)
*   **License:** MIT License
*   *Copyright:* (c) 2019-present, Yosuke Hasegawa and Vite contributors.

### 3. Tailwind CSS (v4)
*   **License:** MIT License
*   *Copyright:* (c) Tailwind Labs.

### 4. Motion / Framer Motion (v12)
*   **License:** MIT License
*   *Copyright:* (c) 2018 Matt Perry.

### 5. Lucide React
*   **License:** ISC License / MIT License
*   *Copyright:* (c) 2020 Lucide Contributors.

---

## 🤖 Generative AI Disclosure

In accordance with the **WISER Education Challenge AI Use Policy**, I (Emmanuella Adams) declare the following uses of AI coding assistants during this project:

### 1. Tools Utilized
*   **Google Gemini** (accessed via the Antigravity IDE pair programming workspace).

### 2. Nature of Support
*   **Layout & Styling Assistance:** Streamlined the implementation of the complex neon dashboard grids, glassmorphic panels, and responsive grid layouts using Tailwind CSS v4 directives.
*   **Educational Copy Editing:** Assisted in formatting mathematical equations into structured LaTeX strings and translating textbook proofs into readable space-cadet log summaries to lower learner cognitive load.
*   **Refactoring & Boilerplate Generation:** Generated base React TypeScript interface typings and verified matching case conditions inside the AST simulator command parser.

### 3. Verification & Accountability
All code, mathematical logic, and simulations generated with AI assistance were strictly reviewed, manually tested, and verified for mathematical accuracy by me. No code was deployed without validating state vector calculation traces, making me (Emmanuella Adams) 100% accountable for all calculations and logic.
