# Complete Portfolio Blueprint & Technical Requirements: Haji Gul

This document serves as the complete architectural specification, content inventory, and design blueprint for building an advanced, futuristic, animated academic and AI research portfolio for **Haji Gul** (`https://hajigul.github.io/`).

---

## 1. Visual Identity, Design System & Color Palette

The aesthetic merges **scientific minimalism** with **futuristic complex network topology** (inspired by hollow circular ring nodes and interconnected graph meshes).

### A. Color Tokens
| Role | Color Name | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Primary Background** | Crisp Scientific White | `#FFFFFF` | Main page canvas, modal backgrounds, high-contrast reading areas |
| **Secondary Background** | Soft Ice Slate | `#F8FAFC` | Alternating section backgrounds, metric pills, abstract drawers |
| **Primary Node & Link** | Deep Cyan-Teal | `#148292` | Ring node borders, timeline spine, primary badges, SVG schematics |
| **Secondary Node & Edge** | Vibrant Teal | `#1B9AAA` | Graph edges, secondary accents, hover borders, filter tabs |
| **Structural Depth** | Deep Slate Teal | `#0E4D57` | Primary headings, footer background, active buttons, node shadows |
| **Futuristic Glow** | Electric Cyan | `#00E5FF` | Cursor-reactive network links, active timeline rings, pulse effects |
| **Primary Body Text** | Charcoal Slate | `#0F172A` | Titles, body copy, high-legibility academic descriptions |
| **Muted Metadata Text** | Cool Slate Gray | `#475569` | Co-author lists, dates, secondary labels |

### B. Typography System
* **Display & Headings:** `Space Grotesk` (Bold/SemiBold, tight tracking) — gives a modern, geometric, scientific-tech feel.
* **Body & Abstracts:** `Inter` or `Plus Jakarta Sans` (Regular/Medium) — ensures effortless readability for academic prose.
* **Metrics, Code & Venues:** `JetBrains Mono` — used for citation counts, BibTeX blocks, publication years, DOIs, and section indices (`01 //`, `02 //`).

### C. UI & Motion Standards
* **Glassmorphism Cards:** `background: rgba(255, 255, 255, 0.82); backdrop-filter: blur(14px); border: 1px solid rgba(20, 130, 146, 0.22);`
* **Hollow Ring-Node Motif:** Circular nodes with a `4px` `#148292` border and white core that glow `#00E5FF` on hover.
* **Performance:** All scroll reveals and hover elevations must use GPU-accelerated `transform` and `opacity` transitions at 60fps.

---

## 2. Complete Section-by-Section Requirements & Content Inventory

### Section 0: Sticky Glass Navigation Bar
* **Brand Emblem:** Hollow teal ring icon + **HAJI GUL** (`AI & KG Lab` badge).
* **Anchor Links:**
  1. `About & Research`
  2. `Publications (32+)`
  3. `Education & Experience`
  4. `Certificates & Awards`
  5. `YouTube Lectures`
  6. `Contact & References`
* **Mobile Responsiveness:** Collapsible hamburger drawer for mobile viewports.

---

### Section 1: Hero & Interactive Network Canvas
* **Interactive Background (`<canvas>`):**
  * Floating hollow teal ring nodes (`#148292`) and solid nodes (`#1B9AAA`) connected by proximity edges.
  * Mouse-reactive physics: moving the cursor draws glowing electric cyan (`#00E5FF`) edges to nearby nodes.
* **Left Column (Identity & Value Proposition):**
  * **Status Pill:** `PhD Researcher · Artificial Intelligence · Universiti Brunei Darussalam` (with live pulsing cyan dot).
  * **Headline:** **Haji Gul**
  * **Executive Summary:** *"Advancing Knowledge Graph Completion, Complex Network Link Prediction, and Large Language Models at the School of Digital Science, Universiti Brunei Darussalam."*
  * **Fellowship Spotlight Banner:** Highlighting his selection as a **2025 DAAD AInet Fellow in Natural Language Processing** (collaborating with Leuphana University of Lüneburg, Germany).
  * **Primary Action Buttons:**
    * Google Scholar (`https://scholar.google.com/citations?user=WqmzWogAAAAJ&hl=en`)
    * LinkedIn (`https://www.linkedin.com/in/haji-gul-658502120/`)
    * YouTube (`https://www.youtube.com/@hajigul5733`)
    * GitHub (`https://github.com/hajigul`)
    * ORCID (`https://orcid.org/0000-0002-2227-6564`)
* **Right Column (Live Academic Telemetry Card):**
  * Ring-framed profile avatar with subtle cyan pulse animation.
  * **Animated Scroll Counters (Google Scholar Verified):**
    * **367+** Total Citations
    * **10** h-index
    * **11** i10-index
  * **Quick Identifiers:** Academic Email (`23h1710@ubd.edu.bn`), Scopus Author ID (`57218363906`), YouTube Stats (`219+ Lecture Videos`).

---

### Section 2: About & Research Domain Architecture (Bento Grid)
* **Card 1 — Academic Biography & Research Philosophy:**
  * Detailed overview of his interdisciplinary work bridging **Knowledge Graphs (KG)**, **Complex Networks** (protein–protein interaction networks, Yeast, *C. elegans* neurons, *E. coli*), **Social Network Analysis** (Karate, Dolphins), **Transformers**, and **Large Language Models (LLMs)**.
  * Interactive keyword tags (`Knowledge Graph Completion`, `Link Prediction`, `Spectral Graph Complexity`, `Meta-Metric Benchmarking`, `Graph Neural Networks`, `RAG & Multimodal AI`, `Explainable Healthcare AI`).
* **Card 2 — Pillar I: Multi-Context KG Reasoning (`MuCo-KGC`, `MuCoS`, `DualRep`):**
  * Eliminating negative triplet sampling overhead by serializing local neighborhood density and relational paths into pre-trained language models (BERT).
* **Card 3 — Pillar II: Spectral Complexity & Meta-Metrics (`KG-EDAS`, `CSG`):**
  * Quantifying intrinsic graph difficulty using Laplacian eigenvalues and multi-criteria decision analysis to resolve ranking disagreements across MRR and Hits@K.
* **Card 4 — Pillar III: Biomedical, Social & Cyber-Physical Networks:**
  * Applying link prediction and GNNs to drug-target discovery (KEGG50k, PharmKG-8k), fake news cascade detection, and Industrial Control System (ICS) security.

---

### Section 3: Complete Filterable Publications Hub (with Custom Visuals)
* **Interactive Controls:**
  * **Real-Time Search Bar:** Filter instantly by paper title, co-author name, venue, or publication year.
  * **Category Filter Tabs:**
    * `All Publications (32)`
    * `Knowledge Graphs & LLMs`
    * `Link Prediction & Complex Networks`
    * `Healthcare, GNNs & Cyber-Physical AI`
* **Mandatory Per-Paper Features:**
  1. **Custom Scientific Schematic Visual:** Every publication card must display a bespoke SVG/Canvas technical diagram illustrating its specific contribution (e.g., BERT-KG encoding pipeline, drug-protein bipartite graph, Laplacian spectral curve, EDAS multi-criteria bar/radar chart, community modularity clusters).
  2. **Metadata Badges:** Publication Year badge (`2020–2026`), Citation Count badge, and Venue tag (e.g., *PAKDD 2025*, *ACL BioNLP 2025*, *IEEE BigData 2025*, *NeurIPS/ICML/AAAI Workshops*, *Scientific Reports*, *Physica A*, *IEEE Access*).
  3. **Interactive Modal Drawer:** Clicking a paper opens a full-detail modal with its research summary, direct DOI/arXiv/GitHub links, and a **1-Click "Copy BibTeX"** button.

#### Full Publication Inventory to Include:
1. *MuCo-KGC: Multi-Context-Aware Knowledge Graph Completion* — PAKDD 2025 (Springer)
2. *MuCoS: Efficient Drug-Target Prediction through Multi-Context-Aware Sampling* — BioNLP @ ACL 2025
3. *When Metrics Disagree: A Meta-Analysis of Knowledge-Graph-Completion Model Benchmarking* — arXiv 2026
4. *KG-EDAS: A Meta-Metric Framework for Evaluating Knowledge Graph Completion Models* — IEEE BigData 2025
5. *Evaluating Knowledge Graph Complexity via Semantic, Spectral, and Structural Metrics for Link Prediction* — IEEE BigData 2025
6. *Evaluating Cumulative Spectral Gradient as a Complexity Measure* — MusIML @ ICML 2025
7. *Domain-Aware Evaluation of Knowledge Graph Completion Models Using KG-EDAS* — GCLR @ AAAI 2025
8. *A Contextualized BERT Model for Knowledge Graph Completion* — MusIML @ NeurIPS 2024
9. *DualRep: Knowledge Graph Completion by Utilizing Dual Representation of Relational Paths and Tail Node Density Insights* — IEEE Access 2024
10. *A Systematic Literature Review on Transparency and Interpretability of AI Models in Healthcare* — Health and Technology (Springer) 2026
11. *Artificial Intelligence for Secure and Sustainable Industrial Control Systems: A Survey* — Artificial Intelligence Review 2025
12. *Intelligent Transportation Systems: A Critical Review of Integration of Cyber-Physical Systems (CPS) and Industry 4.0* — Digital Communications and Networks 2025
13. *Advancing Fake News Detection with Graph Neural Network and Deep Learning* — Journal of Physics: Complexity 2025
14. *Link Prediction Using Node Information on Local Paths* — Physica A 2020
15. *Path-Based Extensions of Local Link Prediction Methods for Complex Networks* — Scientific Reports (Nature) 2020
16. *A Systematic Analysis of Link Prediction in Complex Network* — IEEE Access 2021
17. *A Systematic Analysis of Community Detection in Complex Networks* — Procedia Computer Science 2022
18. *Analyzing Complex Networks: Extracting Key Characteristics and Measuring Structural Similarities* — Expert Systems (Wiley) 2024
19. *Link Prediction Using Double Degree Equation with Mutual and Popular Nodes* — WorldCIST (Springer) 2021
20. *Efficient Link Prediction Model for Real-World Complex Networks Using Matrix-Forest Metric with Local Similarity Features* — Journal of Complex Networks (Oxford) 2022
21. *Hill Climbing-Based Efficient Model for Link Prediction in Undirected Graphs* — Mathematics (MDPI) 2022
22. *Enhancing Link Prediction Efficiency with Shortest Path and Structural Attributes* — Intelligent Data Analysis 2024
23. *Leveraging Natural Language Processing for Enhanced Text Analysis in Business Intelligence* — IGI Global 2024
24. *Forecasting Networks Links with Laplace Characteristic and Geographical Information in Complex Networks* — Procedia Computer Science 2023
25. *Real-World Protein Particle Network Reconstruction Based on Advanced Hybrid Features* — ICITS 2022
26. *Comparative Analysis of Machine Learning Algorithms for Author Age and Gender Identification* — ICITS 2023
27. *Features Extraction and Structure Similarities Measurement of Complex Networks* — LNNS 2024
28. *Link Prediction in Human Complex Network Based on Random Walk with Global Topological Features* — iTDAF 2023
29. *Big Data Analytics in Bioinformatics and Healthcare* — Studies in Big Data (Springer) 2025
30. *Cyber Security in Cyber Physical Systems: Challenges and Opportunities* — IGI Global 2025
31. *Governance, Policy Frameworks & Achieving Sustainable Healthcare Systems in Africa* — CRC Press 2025
32. *Comparative Analysis of Link Prediction in Complex Networks* — IJTD 2021

---

### Section 4: Education & Academic Experience (Connected Ring-Node Timeline)
Designed as a dual-column vertical connected timeline with glowing hollow ring nodes (`#148292` -> `#00E5FF` on scroll):

#### A. Academic & Research Experience
* **PhD Researcher in Artificial Intelligence (2023 – Present)**
  * *Institution:* School of Digital Science, Universiti Brunei Darussalam (UBD), Brunei
  * *Focus:* Knowledge Graph Completion, Graph Complexity, Transformers, and Large Language Models.
* **DAAD AInet Fellow in Natural Language Processing (May 2025 – Present)**
  * *Institution:* Leuphana University of Lüneburg, Germany
  * *Focus:* International research fellowship in NLP, neuro-symbolic AI, and structured knowledge representation.
* **Lecturer in Computer Science & Student Thesis Mentor (2019 – 2023)**
  * *Institution:* City University of Science & Information Technology (CUSIT), Peshawar, Pakistan
  * *Courses & Mentorship:* Taught Graph Theory, Data Science, Machine Learning, and MATLAB; supervised undergraduate and graduate research projects.

#### B. Education
* **Doctor of Philosophy (PhD) in Computer Science / Artificial Intelligence (In Progress)**
  * *Institution:* Universiti Brunei Darussalam (UBD)
  * *Dissertation:* Multi-Context-Aware Knowledge Graph Completion, Spectral Complexity & Meta-Metric Evaluation.
* **Master of Science (MS) in Computer Science (2017 – 2020)**
  * *Institution:* Institute of Management Sciences (IMSciences), Peshawar, Pakistan
  * *Thesis Focus:* Complex Network Analysis & Local Path Link Prediction.
* **Bachelor of Science (BS) in Computer Science**
  * *Foundation:* Algorithms, Discrete Mathematics, Graph Theory, and Software Engineering.

---

### Section 5: Certificates, Honors, Fellowships & Academic Service
Structured into sleek badge cards with verification metadata:
1. **DAAD AInet Fellowship Award (May 2025)** — Awarded by the German Academic Exchange Service (DAAD) for excellence in Natural Language Processing research.
2. **UBD Graduate Research Scholarship (GRS)** — Awarded by Universiti Brunei Darussalam for doctoral research in Artificial Intelligence.
3. **International Conference & Workshop Presenter** — Certificates of presentation and authorship at **NeurIPS** (MusIML), **ICML** (MusIML), **ACL** (BioNLP), **AAAI** (GCLR), **PAKDD**, and **IEEE BigData**.
4. **Peer Reviewer & Academic Service** — Active reviewer for leading journals and conferences in Artificial Intelligence, Complex Networks, and Knowledge Engineering.
5. **Technical & Research Certifications** — Deep Learning & Transformer Architectures, Graph Data Science, MATLAB Scientific Computing, and Explainable AI.

---

### Section 6: YouTube Teaching & Open Pedagogy Hub
* **Channel Overview:** `https://www.youtube.com/@hajigul5733` (219+ educational lecture videos, 500+ subscribers).
* **Featured Lecture Cards (with custom geometric play thumbnails):**
  1. *Graph Theory Full Course: Adjacency Matrix & Graph Creation Using MATLAB*
  2. *Complex Network Analysis: Extracting Nodes & Links in Real-World Graph Datasets*
  3. *Data Science, Machine Learning & Image Matrix Processing Tutorials*

---

### Section 7: Contact Information & Academic References
* **Direct Contact Channels:**
  * **Institutional Email:** `23h1710@ubd.edu.bn`
  * **Personal Email:** `hajigul1993@gmail.com`
  * **Phone / WhatsApp:** `+92-307-8297663`
  * **Location:** School of Digital Science, Universiti Brunei Darussalam, Jalan Tungku Link, Gadong BE1410, Brunei Darussalam
* **Academic References (3 Verified Referees):**
  1. **Dr. Ajaz Ahmad Bhat** — Assistant Professor, School of Digital Science, Universiti Brunei Darussalam (`ajaz.bhat@ubd.edu.bn`)
  2. **Dr. Abdul Ghani Naim** — Assistant Professor, School of Digital Science, Universiti Brunei Darussalam (`ghani.naim@ubd.edu.bn`)
  3. **Dr. Adnan Amin** — Assistant Professor, Institute of Management Sciences (IMSciences), Peshawar (`adnan.amin@imsciences.edu.pk`)

---

## 3. Technical & Deployment Checklist for GitHub Pages (`hajigul.github.io`)
* [x] **Zero-Build Compatibility:** Pure HTML5, Tailwind CSS (CDN or compiled CSS), and vanilla ES6+ JavaScript so it deploys directly via GitHub Pages without Node/Webpack build failures.
* [x] **SEO & Academic Metadata:** Include `<meta>` OpenGraph tags, Google Scholar `citation_*` meta tags, and semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
* [x] **Accessibility (WCAG AA):** Maintain high contrast between `#0F172A` / `#0E4D57` text and `#FFFFFF` / `#F8FAFC` surfaces, plus keyboard-accessible modal dialogs.
* [x] **Interactive Polish:** Include smooth anchor scrolling, `IntersectionObserver` reveal animations, animated metric counters, and 1-click BibTeX clipboard copying.