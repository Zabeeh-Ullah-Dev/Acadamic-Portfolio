# Haji Gul — AI & Knowledge Graph Research Portfolio

[![React](https://img.shields.io/badge/React-19-blue.svg?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF.svg?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Checked-3178C6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=flat-square)](LICENSE)

An academic and research portfolio for **Haji Gul**, PhD Researcher in Artificial Intelligence at the **School of Digital Science, Universiti Brunei Darussalam** and **2025 DAAD AInet Fellow in Natural Language Processing** (Leuphana University of Lüneburg, Germany).

Designed with a futuristic **2050 architectural aesthetic**—featuring dark obsidian glass surfaces, OKLAB/OKLCH animated laser gradient dividers, neural network canvas simulations, 3D-tilt holographic cards, and live counting academic telemetry.

---

## Key Features

- **Hero & Kinetic Telemetry**:
  - Interactive neural topology canvas background with mouse attraction.
  - Perspective 3D-tilt portrait card with floating orbital fellowship chips and cursor-tracking sapphire sheen.
  - Live academic telemetry strip with smooth quartic ease-out **animated counting numbers** (367+ Citations, h-index 10, i10-index 11, 32 Publications, 219+ Video Lectures) with interactive hover re-count.
  - Auto-cycling research spotlight widget with play/pause controls.
  - Quick-action dock with 1-click email copy, Google Scholar, GitHub, ORCID, LinkedIn, and YouTube channels.

- **2050 Section Dividers**:
  - Multi-layered horizontal and vertical animated gradient lines.
  - Dual-stream traveling photon beams in OKLAB/OKLCH color space with precision central telemetry reticles (`[+ 01 // RESEARCH +]`).
  - Seamless visual separation between major sections: **Research**, **Publications**, **Experience**, **Education**, **Honors**, and **Lectures**.

- **Research Architecture**:
  - Interactive research pillars: Multi-Context KG Reasoning (MuCo-KGC, MuCoS, DualRep), Spectral Complexity & Meta-Metrics (KG-EDAS), and Biomedical Networks (Drug-Target discovery, GNNs).
  - Keyword filters triggering instant jump to relevant publications.

- **Publications & Code Archive**:
  - Complete record of 32 peer-reviewed papers and book chapters (2020–2026).
  - Multi-facet search by title, venue, and keywords.
  - Category filters (*Knowledge Graphs & LLMs*, *Link Prediction & Complex Networks*, *Healthcare & CPS*).
  - 1-click BibTeX modal export and direct GitHub repository links.
  - Glassmorphic "View All Publications (32)" toggle with traveling glint and counter pill.

- **Academic Trajectory (Experience & Education)**:
  - Fiber-optic trajectory spine with traveling light signals.
  - Geometric nodes: diamond nodes for research appointments, dual-ring orbital nodes for formal degrees.
  - Dual-column desktop layout with central vertical gradient divider; stacked mobile layout with horizontal divider.
  - Deep-link support for `#timeline`, `#experience`, and `#education`.

- **Fellowships, Service & Certifications**:
  - Honors showcase: DAAD AInet Fellowship, doctoral scholarships, and peer-review service (Computers in Biology and Medicine, IEEE Access, Artificial Intelligence Review).
  - Interactive modal inspect for 8 verified technical credentials (IBM, DeepLearning.AI, Google Cloud) with direct verification URLs.

- **Open Pedagogy Hub**:
  - Video lecture series catalog with 6 curated university courses: *Graph Theory*, *MATLAB for Computational Physics*, *Data Structures in C++*, *C++ for Beginners*, *CorelDRAW*, and *Photoshop*.

- **Academic Collaboration & Supervision Hub**:
  - Inquiry form with categorized subject lines and dynamic guidance text.
  - Reference contact cards with direct academic institution profiles.

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Core UI component model and reactive hooks |
| **Vite 8** | High-performance build tool and dev server |
| **Tailwind CSS v4** | Modern utility-first styling with `@theme` variables |
| **Lucide React** | Lightweight, modern icon set |
| **Modern Web APIs** | `IntersectionObserver`, `requestAnimationFrame`, `oklab()` / `oklch()` color interpolation with progressive fallback |
| **JetBrains Mono & Bricolage Grotesque** | Technical typography & expressive display headings |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` or `pnpm`

### Installation & Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hajigul/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local development server on port 3000 |
| `npm run build` | Compiles production build to `dist/` with asset minification |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`) |
| `node --test src/utils/publicationsFilter.test.js` | Runs unit tests for search, filtering, and data integrity |

---

## Project Structure

```text
├── public/
│   └── assets/
│       └── portfolio/          # Profile photography, certificate images, and playlist thumbnails
├── src/
│   ├── components/             # React UI components
│   │   ├── AnimatedCounter.jsx # Viewport-triggered counting animation with quartic easing
│   │   ├── SectionDivider.jsx  # 2050 laser gradient divider with traveling beams
│   │   ├── HeroSection.jsx     # 3D tilt portrait, neural canvas, and metrics strip
│   │   ├── ResearchSection.jsx # Editorial research pillars and topic chips
│   │   ├── PublicationsSection.jsx # Publications archive, BibTeX export, and filters
│   │   ├── TimelineSection.jsx # Dual-spine Academic Experience & Education
│   │   ├── HonorsAndLecturesSection.jsx # Fellowships, credentials modal, and lectures
│   │   ├── ContactSection.jsx  # Academic inquiry form & references
│   │   ├── Navbar.jsx          # Glassmorphic top navigation
│   │   └── Footer.jsx          # System status & quick links
│   ├── data/
│   │   └── portfolioData.js    # Publications, milestones, credentials, and bio data
│   ├── hooks/                  # Custom hooks (e.g. useScrollReveal)
│   ├── utils/                  # Publications filtering, typewriter logic, and tests
│   ├── App.jsx                 # Main application layout
│   ├── index.css               # Tailwind v4 theme, keyframes, and OKLAB gradient tokens
│   └── main.jsx                # Application root entry
├── index.html                  # Metadata, OpenGraph cards, JSON-LD Schema
├── package.json
└── tsconfig.json
```

---

## Academic Profiles & Links

- **Google Scholar**: [Haji Gul Citations](https://scholar.google.com/citations?user=WqmzWogAAAAJ&hl=en)
- **Scopus Author ID**: [57218363906](https://www.scopus.com/authid/detail.uri?authorId=57218363906)
- **ORCID**: [0000-0002-2227-6564](https://orcid.org/0000-0002-2227-6564)
- **GitHub**: [@hajigul](https://github.com/hajigul)
- **LinkedIn**: [Haji Gul](https://www.linkedin.com/in/haji-gul-658502120/)
- **YouTube Channel**: [@hajigul5733](https://www.youtube.com/@hajigul5733)

---

## License

Distributed under the **Apache-2.0 License**. See [LICENSE](LICENSE) for details.
