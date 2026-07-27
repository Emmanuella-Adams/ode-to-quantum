# Project Workflows: Education, Development, & Deployments

This document outlines the operational workflows for **Ode to Quantum**, covering the student learning journey, the developer release cycle, and the Jupyter Notebook deployment steps.

---

## 🎓 The Student Learning Journey

The curriculum is structured to guide students step-by-step from zero background to training advanced Quantum Machine Learning (QML) models.

```
       ┌───────────────────────┐
       │   1. Mission Select   │  Select a mission in the Starship Curriculum
       └───────────┬───────────┘
                   ▼
       ┌───────────────────────┐
       │  2. Read & Math Lens  │  Read theory; toggle Math Lens to view grid matrices
       └───────────┬───────────┘
                   ▼
       ┌───────────────────────┐
       │ 3. Active Simulation  │  Toggle values/gates on live custom simulator panels
       └───────────┬───────────┘
                   ▼
       ┌───────────────────────┐
       │ 4. Qiskit Playground  │  Practice writing code in the Playground Sandbox
       └───────────┬───────────┘
                   ▼
       ┌───────────────────────┐
       │  5. Jupyter Lab (Colab)  Download .ipynb file or launch directly in Google Colab
       └───────────┬───────────┘
                   ▼
       ┌───────────────────────┐
       │ 6. Warp Graduation    │  Complete all 20 missions to unlock Cadet certificate
       └───────────────────────┘
```

### Flow Details:
1.  **Theory Intake:** The student selects a mission (e.g. Superposition) on the main command deck.
2.  **Visual Translation:** The student toggles the Math Lens in the header navigation to translate matrix equations into color-coded, monospace text grids.
3.  **Active Practice:** The student interacts with the inline simulator (e.g., rotating the Bloch sphere representation or flipping logical bits).
4.  **Practical Notebook Coding:** The student navigates to the **Labs** tab, launches the matching notebook directly in **Google Colab**, executes Qiskit code locally, and prints quantum circuit diagrams.
5.  **Telemetry Graduation:** The student completes all 20 core missions, unlocking the starfield warp graduation sequence where they can enter their name to generate a certificate.

---

## 🛠️ Developer Git & Release Cycle

To contribute to this codebase, developers follow this release workflow:

### 1. Local Setup
```bash
# Clone and install dependencies
git clone https://github.com/Emmanuella-Adams/ode-to-quantum.git
cd ode-to-quantum
npm install
```

### 2. Feature Branching
Create a descriptively named branch for updates:
```bash
git checkout -b feature/interactive-simulator-update
```

### 3. Verification & Build checks
Before committing changes, verify there are no TypeScript compiler syntax errors or build issues:
```bash
# Type check TypeScript code
npm run lint

# Compile and optimize assets
npm run build
```

### 4. Code Standards & Style guidelines
*   **Modularity:** Ensure new quantum simulator features are written inside `Simulators.tsx` and exported cleanly.
*   **Custom CSS Rules:** Implement layout adjustments using global CSS variables inside `src/index.css` rather than hardcoding style elements.
*   **TypeScript Types:** Strictly type check all state variables, event callbacks, and AST outputs.

---

## 📓 Jupyter Notebook Deployment & Sync

The hands-on coding notebooks live in two locations:
1.  **Source Control Workspace:** `notebooks/part_1/*.ipynb`
2.  **Public Access Assets:** `public/notebooks/*.ipynb` (enables direct downloads in the browser)

### Synchronization Process:
When modifying a Jupyter notebook (e.g. updating Qiskit v1.0 syntax in `07_intro_to_quantum_machine_learning.ipynb`):
1.  **Local Testing:** Run the notebook locally inside a virtual environment to confirm all cells run sequentially without failures:
    ```bash
    python -m venv venv
    source venv/bin/activate
    pip install qiskit matplotlib pylatexenc torch numpy
    jupyter notebook
    ```
2.  **Google Colab Sync:** Upload the validated `.ipynb` notebook file to the dedicated Google Drive directory linked to Google Colab.
3.  **Copy Links:** Retrieve the shareable Colab run link (e.g., `https://colab.research.google.com/drive/...`).
4.  **Update Component Registry:** Update the `colabUrl` and metadata parameters inside [NotebookView.tsx](file:///c:/Users/Lenovo/Downloads/ode-to-quantum/src/components/NotebookView.tsx).
5.  **Browser Download Sync:** Copy the updated notebook file into the static server folder:
    ```bash
    cp notebooks/part_1/07_intro_to_quantum_machine_learning.ipynb public/notebooks/
    ```
6.  **Verify Download:** Launch the server locally (`npm run dev`) and click the download button to confirm the downloaded notebook works.
