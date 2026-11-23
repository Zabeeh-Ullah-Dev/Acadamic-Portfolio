import { PROFILE_INFO } from './profileInfo.js';

export { PROFILE_INFO };


export const RESEARCH_KEYWORDS = [
  'Knowledge Graph Completion',
  'Link Prediction',
  'Spectral Graph Complexity',
  'Meta-Metric Benchmarking',
  'Graph Neural Networks',
  'RAG & Multimodal AI',
  'Explainable Healthcare AI',
];

export const RESEARCH_PILLARS = [
  {
    id: 'pillar-kg',
    number: '01',
    title: 'Multi-Context KG Reasoning',
    subtitle: 'MuCo-KGC · MuCoS · DualRep',
    description:
      'Eliminating negative triplet sampling overhead by serializing local neighborhood density, relational paths, and structural context directly into pre-trained transformer encoders.',
    focusModels: ['BERT Encoding', 'Negative-Sampling-Free', 'Relational Paths'],
    filterCategory: 'kg-llm',
  },
  {
    id: 'pillar-spectral',
    number: '02',
    title: 'Spectral Complexity & Meta-Metrics',
    subtitle: 'KG-EDAS · Cumulative Spectral Gradient',
    description:
      'Quantifying intrinsic graph difficulty via Laplacian eigenvalues and multi-criteria decision analysis (EDAS) to reconcile ranking disagreements across MRR and Hits@K benchmarks.',
    focusModels: ['Laplacian Spectrum', 'EDAS Ranking', 'Metric Concordance'],
    filterCategory: 'kg-llm',
  },
  {
    id: 'pillar-networks',
    number: '03',
    title: 'Biomedical, Social & Cyber-Physical Networks',
    subtitle: 'Drug-Target · GNNs · ICS Security',
    description:
      'Translating topological link prediction and explainable deep graph learning into drug-target discovery (KEGG50k, PharmKG-8k), misinformation cascades, and Industrial Control System security.',
    focusModels: ['KEGG50k / PharmKG-8k', 'Protein Networks', 'Explainable AI'],
    filterCategory: 'healthcare-cps',
  },
];

export const PUBLICATIONS = [
  {
    id: 'pub-01',
    index: 1,
    title: 'MuCo-KGC: Multi-Context-Aware Knowledge Graph Completion',
    authors: 'Haji Gul, Ajaz Ahmad Bhat, Abdul Ghani Naim',
    venue: 'PAKDD 2025',
    publisher: 'Springer (Pacific-Asia Conference on Knowledge Discovery and Data Mining)',
    year: 2025,
    citations: 13,
    category: 'kg-llm',
    categoryLabel: 'Knowledge Graphs & LLMs',
    schematic: 'bert-kg',
    figureUrl: '/assets/diagrams/pub-01.png',
    figureCaption: 'Fig. 1. MuCo-KGC multi-context serialization and negative-sampling-free BERT completion pipeline (PAKDD 2025).',
    abstract:
      'Introduces a multi-context serialization framework for Knowledge Graph Completion that captures entity descriptions, local subgraph neighborhoods, and relational paths without expensive negative triplet sampling.',
    highlights: [
      'Eliminates stochastic negative sampling bottlenecks during transformer fine-tuning.',
      'Integrates structural neighborhood cues alongside textual entity semantics.',
    ],
    keywords: ['Knowledge Graph Completion', 'BERT', 'Multi-Context', 'PAKDD'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:R3hNpaxXUhUC',
    bibtex: `@inproceedings{gul2025mucokgc,
  title={MuCo-KGC: Multi-Context-Aware Knowledge Graph Completion},
  author={Gul, Haji and Bhat, Ajaz Ahmad and Naim, Abdul Ghani},
  booktitle={Pacific-Asia Conference on Knowledge Discovery and Data Mining (PAKDD)},
  year={2025},
  publisher={Springer}
}`,
  },
  {
    id: 'pub-02',
    index: 2,
    title: 'MuCoS: Multi-context-aware sampling for drug-target prediction',
    authors: 'Haji Gul, Ajaz Ahmad Bhat, Abdul Ghani Naim',
    venue: 'BioNLP @ ACL 2025',
    publisher: 'Association for Computational Linguistics',
    year: 2025,
    citations: 1,
    category: 'healthcare-cps',
    categoryLabel: 'Healthcare, GNNs & Cyber-Physical AI',
    schematic: 'bipartite-drug',
    figureUrl: '/assets/diagrams/pub-02.png',
    figureCaption: 'Fig. 1. MuCoS multi-context-aware biomedical subgraph sampling for drug-target prediction (BioNLP @ ACL 2025).',
    abstract:
      'MuCoS: Multi-context-aware sampling for drug-target prediction (BioNLP@ACL 2025). Also mirrored at AdaptiveBotsLab. Applies multi-context-aware sampling over biomedical knowledge graphs (KEGG50k and PharmKG-8k) to accelerate and improve accuracy in drug-target interaction prediction.',
    highlights: [
      'BioNLP @ ACL 2025 — also mirrored at AdaptiveBotsLab.',
      'Evaluated on biomedical benchmarks KEGG50k and PharmKG-8k.',
      'Balances local biological pathway density with language model representations.',
    ],
    keywords: ['Drug-Target Prediction', 'BioNLP', 'Biomedical KG', 'ACL', 'AdaptiveBotsLab'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:blknAaTinKkC',
    githubUrl:
      'https://github.com/hajigul/MuCoS_KGC-Efficient-Drug-Target-Discovery-via-Multi-Context-Aware-Sampling-in-Knowledge-Graphs',
    mirrorGithubUrl:
      'https://github.com/AdaptiveBotsLab/MuCoS-Efficient-Drug-Target-Discovery-via-Multi-Context-Aware-Sampling-in-Knowledge-Graphs',
    bibtex: `@inproceedings{gul2025mucos,
  title={MuCoS: Multi-context-aware sampling for drug-target prediction},
  author={Gul, Haji and Bhat, Ajaz Ahmad and Naim, Abdul Ghani},
  booktitle={Proceedings of the BioNLP Workshop at ACL},
  note={Also mirrored at AdaptiveBotsLab},
  year={2025}
}`,
  },
  {
    id: 'pub-03',
    index: 3,
    title: 'When Metrics Disagree: A Meta-Analysis of Knowledge-Graph-Completion Model Benchmarking',
    authors: 'Haji Gul, Ajaz Ahmad Bhat, Abdul Ghani Naim',
    venue: 'arXiv Preprint',
    publisher: 'arXiv',
    year: 2026,
    citations: 0,
    category: 'kg-llm',
    categoryLabel: 'Knowledge Graphs & LLMs',
    schematic: 'edas-radar',
    figureUrl: '/assets/diagrams/pub-03.png',
    figureCaption: 'Fig. 1. Rank divergence meta-analysis across MRR and Hits@K metrics with unified concordance protocol.',
    abstract:
      'Conducts a comprehensive meta-analysis across standard KGC benchmarks demonstrating why MRR, Hits@1, Hits@3, and Hits@10 often produce conflicting model rankings and proposes unified evaluation protocols.',
    highlights: [
      'Quantifies rank divergence across translational, tensor, and LLM-based KGC models.',
      'Includes reproducible benchmarking notebooks on GitHub (When-Metrics-Disagree).',
    ],
    keywords: ['Meta-Analysis', 'Benchmarking', 'MRR', 'Hits@K', 'Knowledge Graph Completion'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:35N4QoGY0k4C',
    githubUrl: 'https://github.com/hajigul/When-Metrics-Disagree',
    bibtex: `@article{gul2026whenmetrics,
  title={When Metrics Disagree: A Meta-Analysis of Knowledge-Graph-Completion Model Benchmarking},
  author={Gul, Haji and Bhat, Ajaz Ahmad and Naim, Abdul Ghani},
  journal={arXiv preprint},
  year={2026}
}`,
  },
  {
    id: 'pub-04',
    index: 4,
    title: 'KG-EDAS: A Meta-Metric Framework for Evaluating Knowledge Graph Completion Models',
    authors: 'Haji Gul, Ajaz Ahmad Bhat, Abdul Ghani Naim',
    venue: 'IEEE BigData 2025',
    publisher: 'IEEE',
    year: 2025,
    citations: 2,
    category: 'kg-llm',
    categoryLabel: 'Knowledge Graphs & LLMs',
    schematic: 'edas-radar',
    figureUrl: '/assets/diagrams/pub-04.png',
    figureCaption: 'Fig. 1. KG-EDAS distance-from-average-solution meta-metric pipeline (IEEE BigData 2025).',
    abstract:
      'Proposes KG-EDAS, an Evaluation Based on Distance from Average Solution (EDAS) meta-metric that synthesizes MRR, Hits@1/3/10, and computational efficiency into a single domain-consistent score.',
    highlights: [
      'Resolves single-metric bias when ranking KGC architectures.',
      'Supports weighted criteria tailored to latency-critical or recall-critical tasks.',
    ],
    keywords: ['KG-EDAS', 'Meta-Metric Benchmarking', 'IEEE BigData', 'Evaluation'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:ns9cj8rnVeAC',
    githubUrl: 'https://github.com/hajigul/KG-EDAS-IEEE_BigData',
    mirrorGithubUrl: 'https://github.com/AdaptiveBotsLab/KG-EDAS_IEEE_BigData',
    bibtex: `@inproceedings{gul2025kgedas,
  title={KG-EDAS: A Meta-Metric Framework for Evaluating Knowledge Graph Completion Models},
  author={Gul, Haji and Bhat, Ajaz Ahmad and Naim, Abdul Ghani},
  booktitle={IEEE International Conference on Big Data (BigData)},
  year={2025},
  organization={IEEE}
}`,
  },
  {
    id: 'pub-05',
    index: 5,
    title: 'Evaluating Knowledge Graph Complexity via Semantic, Spectral, and Structural Metrics for Link Prediction',
    authors: 'Haji Gul, Ajaz Ahmad Bhat, Abdul Ghani Naim',
    venue: 'IEEE BigData 2025',
    publisher: 'IEEE',
    year: 2025,
    citations: 1,
    category: 'kg-llm',
    categoryLabel: 'Knowledge Graphs & LLMs',
    schematic: 'spectral-curve',
    figureUrl: '/assets/diagrams/pub-05.png',
    figureCaption: 'Fig. 1. Semantic, spectral Laplacian, and structural complexity framework correlated with link prediction AUC.',
    abstract:
      'Investigates intrinsic knowledge graph difficulty prior to model training by combining Laplacian spectral characteristics, relational entropy, and local structural density.',
    highlights: [
      'Correlates pre-training graph complexity scores with downstream link prediction accuracy.',
      'Bridges spectral graph theory and semantic relation diversity.',
    ],
    keywords: ['Spectral Graph Complexity', 'Link Prediction', 'Knowledge Graphs', 'IEEE BigData'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:RGFaLdJalmkC',
    githubUrl:
      'https://github.com/hajigul/Evaluating-KGC-via-Semantic-Spectral-and-Structural-Metrics-for-Link-Prediction',
    bibtex: `@inproceedings{gul2025complexity,
  title={Evaluating Knowledge Graph Complexity via Semantic, Spectral, and Structural Metrics for Link Prediction},
  author={Gul, Haji and Bhat, Ajaz Ahmad and Naim, Abdul Ghani},
  booktitle={IEEE International Conference on Big Data (BigData)},
  year={2025},
  organization={IEEE}
}`,
  },
  {
    id: 'pub-06',
    index: 6,
    title: 'Evaluating Cumulative Spectral Gradient as a Complexity Measure',
    authors: 'Haji Gul, Ajaz Ahmad Bhat, Abdul Ghani Naim',
    venue: 'MusIML @ ICML 2025',
    publisher: 'ICML Workshop on Multimodal & Structured Learning',
    year: 2025,
    citations: 0,
    category: 'kg-llm',
    categoryLabel: 'Knowledge Graphs & LLMs',
    schematic: 'spectral-curve',
    figureUrl: '/assets/diagrams/pub-06.png',
    figureCaption: 'Fig. 1. Cumulative Spectral Gradient (CSG) Laplacian eigenvalue decay diagnostic (MusIML @ ICML 2025).',
    abstract:
      'Adapts and rigorously evaluates the Cumulative Spectral Gradient (CSG) as a tractable measure of separability and structural complexity across graph and multimodal embedding spaces.',
    highlights: [
      'Analyzes eigenvalue decay profiles across sparse and dense graphs.',
      'Provides fast diagnostic complexity bounds without full training sweeps.',
    ],
    keywords: ['Cumulative Spectral Gradient', 'Spectral Graph Complexity', 'ICML'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:r0BpntZqJG4C',
    githubUrl:
      'https://github.com/hajigul/Evaluating-Cumulative-Spectral-Gradient-as-a-Complexity-Measure',
    mirrorGithubUrl: 'https://github.com/AdaptiveBotsLab/E-CSG_Complexity_Measur',
    bibtex: `@inproceedings{gul2025csg,
  title={Evaluating Cumulative Spectral Gradient as a Complexity Measure},
  author={Gul, Haji and Bhat, Ajaz Ahmad and Naim, Abdul Ghani},
  booktitle={MusIML Workshop at International Conference on Machine Learning (ICML)},
  year={2025}
}`,
  },
  {
    id: 'pub-07',
    index: 7,
    title: 'Domain-Aware Evaluation of Knowledge Graph Completion Models Using KG-EDAS',
    authors: 'Haji Gul, Ajaz Ahmad Bhat, Abdul Ghani Naim',
    venue: 'GCLR @ AAAI 2025',
    publisher: 'AAAI Workshop on Graph-Centric Learning & Reasoning',
    year: 2025,
    citations: 0,
    category: 'kg-llm',
    categoryLabel: 'Knowledge Graphs & LLMs',
    schematic: 'edas-radar',
    figureUrl: '/assets/diagrams/pub-07.png',
    figureCaption: 'Fig. 1. Domain-calibrated KG-EDAS criteria weighting across encyclopedic, lexical, and biomedical graphs.',
    abstract:
      'Demonstrates domain-aware criteria weighting within KG-EDAS across commonsense, encyclopedic, and biomedical knowledge graphs to guide model selection for practitioners.',
    highlights: [
      'Benchmarks diverse KGC model families across FB15k-237, WN18RR, and biomedical graphs.',
      'Produces domain-calibrated evaluation profiles.',
    ],
    keywords: ['Meta-Metric Benchmarking', 'KG-EDAS', 'AAAI', 'Knowledge Graph Completion'],
    scholarUrl:
      'https://scholar.google.com/scholar?q=Domain-Aware+Evaluation+of+Knowledge+Graph+Completion+Models+Using+KG-EDAS+Haji+Gul',
    githubUrl: 'https://github.com/hajigul/Domain_Aware_KG_EDAS_GCLR_AAA',
    bibtex: `@inproceedings{gul2025domainaware,
  title={Domain-Aware Evaluation of Knowledge Graph Completion Models Using KG-EDAS},
  author={Gul, Haji and Bhat, Ajaz Ahmad and Naim, Abdul Ghani},
  booktitle={GCLR Workshop at AAAI Conference on Artificial Intelligence},
  year={2025}
}`,
  },
  {
    id: 'pub-08',
    index: 8,
    title: 'A Contextualized BERT Model for Knowledge Graph Completion',
    authors: 'Haji Gul, Abdul Ghani Naim, Ajaz Ahmad Bhat',
    venue: 'MusIML @ NeurIPS 2024',
    publisher: 'NeurIPS Workshop',
    year: 2024,
    citations: 4,
    category: 'kg-llm',
    categoryLabel: 'Knowledge Graphs & LLMs',
    schematic: 'bert-kg',
    figureUrl: '/assets/diagrams/pub-08.png',
    figureCaption: 'Fig. 1. Contextualized BERT architecture injecting multi-hop relational neighbors (MusIML @ NeurIPS 2024).',
    abstract:
      'Presents a contextualized BERT encoding pipeline that injects multi-hop relational neighbors directly into masked language model representations for link prediction.',
    highlights: [
      'Captures rich contextual semantics around sparse entities.',
      'Outperforms standard text-only triple classifiers on WN18RR and FB15k-237.',
    ],
    keywords: ['BERT', 'Knowledge Graph Completion', 'NeurIPS', 'Transformers'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:9ZlFYXVOiuMC',
    bibtex: `@inproceedings{gul2024contextualized,
  title={A Contextualized BERT Model for Knowledge Graph Completion},
  author={Gul, Haji and Naim, Abdul Ghani and Bhat, Ajaz Ahmad},
  booktitle={MusIML Workshop at Advances in Neural Information Processing Systems (NeurIPS)},
  year={2024}
}`,
  },
  {
    id: 'pub-09',
    index: 9,
    title: 'DualRep: Knowledge Graph Completion by Utilizing Dual Representation of Relational Paths and Tail Node Density Insights',
    authors: 'Haji Gul, Abdul Ghani Naim, Ajaz Ahmad Bhat',
    venue: 'IEEE Access',
    publisher: 'IEEE',
    year: 2024,
    citations: 0,
    category: 'kg-llm',
    categoryLabel: 'Knowledge Graphs & LLMs',
    schematic: 'bert-kg',
    figureUrl: '/assets/diagrams/pub-09.png',
    figureCaption: 'Fig. 1. DualRep dual-stream fusion of relational paths and tail-node density insights (IEEE Access 2024).',
    abstract:
      'Proposes DualRep, uniting sequence-encoded relational paths with tail-node topological density insights to eliminate negative triplet sampling and resolve long-tail entity ambiguity.',
    highlights: [
      'Dual representation fuses structural degree signals with semantic path embeddings.',
      'Significantly improves Hits@1 on low-degree tail entities.',
    ],
    keywords: ['DualRep', 'Knowledge Graph Completion', 'Relational Paths', 'IEEE Access'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:4TOpqqG69KYC',
    bibtex: `@article{gul2024dualrep,
  title={DualRep: Knowledge Graph Completion by Utilizing Dual Representation of Relational Paths and Tail Node Density Insights},
  author={Gul, Haji and Naim, Abdul Ghani and Bhat, Ajaz Ahmad},
  journal={IEEE Access},
  year={2024},
  publisher={IEEE}
}`,
  },
  {
    id: 'pub-10',
    index: 10,
    title: 'A Systematic Literature Review on Transparency and Interpretability of AI Models in Healthcare',
    authors: 'Haji Gul, et al.',
    venue: 'Health and Technology',
    publisher: 'Springer',
    year: 2026,
    citations: 22,
    category: 'healthcare-cps',
    categoryLabel: 'Healthcare, GNNs & Cyber-Physical AI',
    schematic: 'bipartite-drug',
    figureUrl: '/assets/diagrams/pub-10.png',
    figureCaption: 'Fig. 1. Clinical AI interpretability taxonomy spanning intrinsic, post-hoc XAI, and regulatory audits.',
    abstract:
      'Synthesizes clinical AI interpretability frameworks, post-hoc attribution methods, and regulatory transparency criteria required for trustworthy diagnostic deployment.',
    highlights: [
      'Maps explainability taxonomies across imaging, EHR, and biomedical graph models.',
      'Identifies open verification gaps in clinical decision support.',
    ],
    keywords: ['Explainable Healthcare AI', 'Interpretability', 'Systematic Review', 'Springer'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:O3NaXMp0MMsC',
    bibtex: `@article{gul2026transparency,
  title={A Systematic Literature Review on Transparency and Interpretability of AI Models in Healthcare},
  author={Gul, Haji and others},
  journal={Health and Technology},
  year={2026},
  publisher={Springer}
}`,
  },
  {
    id: 'pub-11',
    index: 11,
    title: 'Artificial Intelligence for Secure and Sustainable Industrial Control Systems: A Survey',
    authors: 'Haji Gul, et al.',
    venue: 'Artificial Intelligence Review',
    publisher: 'Springer Nature',
    year: 2025,
    citations: 48,
    category: 'healthcare-cps',
    categoryLabel: 'Healthcare, GNNs & Cyber-Physical AI',
    schematic: 'ics-shield',
    figureUrl: '/assets/diagrams/pub-11.png',
    figureCaption: 'Fig. 1. AI-driven intrusion detection and resilient control architecture for sustainable ICS.',
    abstract:
      'Surveys machine learning, graph-based anomaly detection, and resilient control strategies for safeguarding Industrial Control Systems against cyber-physical intrusions.',
    highlights: [
      'Categorizes anomaly detection architectures across SCADA and OT networks.',
      'Links cyber resilience with energy-sustainable industrial operations.',
    ],
    keywords: ['Industrial Control Systems', 'Cyber-Physical AI', 'Security', 'Survey'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:TFP_iSt0sucC',
    bibtex: `@article{gul2025aisecureics,
  title={Artificial Intelligence for Secure and Sustainable Industrial Control Systems: A Survey},
  author={Gul, Haji and others},
  journal={Artificial Intelligence Review},
  year={2025},
  publisher={Springer}
}`,
  },
  {
    id: 'pub-12',
    index: 12,
    title: 'Intelligent Transportation Systems: A Critical Review of Integration of Cyber-Physical Systems (CPS) and Industry 4.0',
    authors: 'Haji Gul, et al.',
    venue: 'Digital Communications and Networks',
    publisher: 'Elsevier',
    year: 2025,
    citations: 40,
    category: 'healthcare-cps',
    categoryLabel: 'Healthcare, GNNs & Cyber-Physical AI',
    schematic: 'ics-shield',
    figureUrl: '/assets/diagrams/pub-12.png',
    figureCaption: 'Fig. 1. Three-tier convergence of physical V2X sensors, edge intelligence, and Industry 4.0 analytics.',
    abstract:
      'Critically examines the convergence of Cyber-Physical Systems, V2X telemetry, and Industry 4.0 graph analytics in modern intelligent transportation infrastructure.',
    highlights: [
      'Evaluates latency, edge intelligence, and safety verification in CPS.',
      'Outlines open architectural challenges for autonomous transit grids.',
    ],
    keywords: ['Cyber-Physical Systems', 'Industry 4.0', 'Intelligent Transportation'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:4JMBOYKVnBMC',
    bibtex: `@article{gul2025its,
  title={Intelligent Transportation Systems: A Critical Review of Integration of Cyber-Physical Systems (CPS) and Industry 4.0},
  author={Gul, Haji and others},
  journal={Digital Communications and Networks},
  year={2025},
  publisher={Elsevier}
}`,
  },
  {
    id: 'pub-13',
    index: 13,
    title: 'Advancing Fake News Detection with Graph Neural Network and Deep Learning',
    authors: 'Haji Gul, et al.',
    venue: 'Journal of Physics: Complexity',
    publisher: 'IOP Publishing',
    year: 2025,
    citations: 15,
    category: 'healthcare-cps',
    categoryLabel: 'Healthcare, GNNs & Cyber-Physical AI',
    schematic: 'gnn-cascade',
    figureUrl: '/assets/diagrams/pub-13.png',
    figureCaption: 'Fig. 1. Propagation-tree GNN combined with linguistic stance encoding for early fake news detection.',
    abstract:
      'Combines propagation-tree Graph Neural Networks with contextual text encoders to detect misinformation cascades early in social network diffusion.',
    highlights: [
      'Models structural virality alongside linguistic stance cues.',
      'Improves early-stage fake news detection before wide cascade spread.',
    ],
    keywords: ['Graph Neural Networks', 'Fake News Detection', 'Information Cascades'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:KlAtU1dfN6UC',
    bibtex: `@article{gul2025fakenews,
  title={Advancing Fake News Detection with Graph Neural Network and Deep Learning},
  author={Gul, Haji and others},
  journal={Journal of Physics: Complexity},
  year={2025},
  publisher={IOP Publishing}
}`,
  },
  {
    id: 'pub-14',
    index: 14,
    title: 'Link Prediction Using Node Information on Local Paths',
    authors: 'Furqan Aziz, Haji Gul, Imran Muhammad, et al.',
    venue: 'Physica A: Statistical Mechanics and its Applications',
    publisher: 'Elsevier',
    year: 2020,
    citations: 63,
    category: 'link-prediction',
    categoryLabel: 'Link Prediction & Complex Networks',
    schematic: 'local-paths-similarity',
    figureUrl: '/physica_local_paths_diagram.png',
    figureCaption:
      'Fig. 1. Proposed Similarity Index — F. Aziz, H. Gul, I. Muhammad et al. / Physica A 557 (2020) 124980',
    abstract:
      'Formulates an enhanced local-path link prediction index that weights intermediate node degree and neighborhood information along length-2 and length-3 paths.',
    highlights: [
      'Validated across biological, social, and technological complex networks.',
      'Achieves superior AUC over classical Common Neighbors and Katz baselines.',
    ],
    keywords: ['Link Prediction', 'Local Paths', 'Complex Networks', 'Physica A'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:u-x6o8ySG0sC',
    bibtex: `@article{aziz2020localpaths,
  title={Link Prediction Using Node Information on Local Paths},
  author={Aziz, Furqan and Gul, Haji and Muhammad, Imran and others},
  journal={Physica A: Statistical Mechanics and its Applications},
  volume={557},
  pages={124980},
  year={2020},
  publisher={Elsevier}
}`,
  },
  {
    id: 'pub-15',
    index: 15,
    title: 'Path-Based Extensions of Local Link Prediction Methods for Complex Networks',
    authors: 'Haji Gul, Adnan Amin, et al.',
    venue: 'Scientific Reports',
    publisher: 'Nature Portfolio',
    year: 2020,
    citations: 58,
    category: 'link-prediction',
    categoryLabel: 'Link Prediction & Complex Networks',
    schematic: 'local-paths-similarity',
    figureUrl: '/scientific_reports_figure1.jpg',
    figureCaption:
      'Figure 1: Benchmark AUC evaluation across 12 complex networks (Karate, Dolphins, E. coli, Yeast, etc.) — Path-based extensions of local link prediction methods for complex networks (Scientific Reports)',
    abstract:
      'Extends classical local similarity indices (Jaccard, Adamic-Adar, Resource Allocation) with multi-hop path weighting to capture mesoscopic network structure.',
    highlights: [
      'Published in Nature Scientific Reports with high empirical benchmark coverage.',
      'Tested on Yeast PPI, C. elegans, E. coli, Karate, and Dolphins networks.',
    ],
    keywords: ['Link Prediction', 'Scientific Reports', 'Complex Networks', 'Local Similarity'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:2osOgNQ5qMEC',
    githubUrl: 'https://github.com/hajigul/Link-Prediction-2021',
    bibtex: `@article{gul2020pathbased,
  title={Path-Based Extensions of Local Link Prediction Methods for Complex Networks},
  author={Gul, Haji and Amin, Adnan and others},
  journal={Scientific Reports},
  volume={10},
  year={2020},
  publisher={Nature Publishing Group}
}`,
  },
  {
    id: 'pub-16',
    index: 16,
    title: 'A Systematic Analysis of Link Prediction in Complex Network',
    authors: 'Haji Gul, et al.',
    venue: 'IEEE Access',
    publisher: 'IEEE',
    year: 2021,
    citations: 28,
    category: 'link-prediction',
    categoryLabel: 'Link Prediction & Complex Networks',
    schematic: 'community-clusters',
    figureUrl: '/assets/diagrams/pub-16.png',
    figureCaption: 'Fig. 1. Taxonomy of local, quasi-local, global, and embedding link prediction with runtime-AUC trade-offs.',
    abstract:
      'Presents a systematic taxonomy and comparative experimental evaluation of local, quasi-local, global, and embedding-based link prediction algorithms.',
    highlights: [
      'Benchmarks structural similarity indices across 12 real-world network topologies.',
      'Provides runtime-accuracy trade-off curves for large sparse graphs.',
    ],
    keywords: ['Link Prediction', 'Systematic Analysis', 'Complex Networks', 'IEEE Access'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:d1gkVwhDpl0C',
    bibtex: `@article{gul2021systematiclp,
  title={A Systematic Analysis of Link Prediction in Complex Network},
  author={Gul, Haji and others},
  journal={IEEE Access},
  year={2021},
  publisher={IEEE}
}`,
  },
  {
    id: 'pub-17',
    index: 17,
    title: 'A Systematic Analysis of Community Detection in Complex Networks',
    authors: 'Haji Gul, et al.',
    venue: 'Procedia Computer Science',
    publisher: 'Elsevier',
    year: 2022,
    citations: 18,
    category: 'link-prediction',
    categoryLabel: 'Link Prediction & Complex Networks',
    schematic: 'community-clusters',
    figureUrl: '/assets/diagrams/pub-17.png',
    figureCaption: 'Fig. 1. Comparative community detection paradigms and modularity/NMI evaluation framework.',
    abstract:
      'Reviews modularity optimization, label propagation, spectral clustering, and overlapping community detection methodologies across social and biological graphs.',
    highlights: [
      'Compares normalized mutual information (NMI) and modularity scores.',
      'Highlights resolution-limit caveats in hierarchical networks.',
    ],
    keywords: ['Community Detection', 'Modularity', 'Complex Networks'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:IjCSPb-OGe4C',
    bibtex: `@article{gul2022community,
  title={A Systematic Analysis of Community Detection in Complex Networks},
  author={Gul, Haji and others},
  journal={Procedia Computer Science},
  year={2022},
  publisher={Elsevier}
}`,
  },
  {
    id: 'pub-18',
    index: 18,
    title: 'Analyzing Complex Networks: Extracting Key Characteristics and Measuring Structural Similarities',
    authors: 'Haji Gul, et al.',
    venue: 'Expert Systems',
    publisher: 'Wiley',
    year: 2024,
    citations: 10,
    category: 'link-prediction',
    categoryLabel: 'Link Prediction & Complex Networks',
    schematic: 'community-clusters',
    figureUrl: '/assets/diagrams/pub-18.png',
    figureCaption: 'Fig. 1. Topological invariant fingerprint extraction and cross-domain structural similarity matrix.',
    abstract:
      'Extracts global and local topological invariants—clustering coefficients, assortativity, centrality distributions—to measure structural similarity across heterogeneous networks.',
    highlights: [
      'Establishes quantitative fingerprints for cross-domain network comparison.',
      'Supports domain transfer for link prediction heuristics.',
    ],
    keywords: ['Structural Similarity', 'Complex Networks', 'Expert Systems', 'Wiley'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:0EnyYjriUFMC',
    bibtex: `@article{gul2024analyzing,
  title={Analyzing Complex Networks: Extracting Key Characteristics and Measuring Structural Similarities},
  author={Gul, Haji and others},
  journal={Expert Systems},
  year={2024},
  publisher={Wiley}
}`,
  },
  {
    id: 'pub-19',
    index: 19,
    title: 'Link Prediction Using Double Degree Equation with Mutual and Popular Nodes',
    authors: 'Haji Gul, et al.',
    venue: 'WorldCIST 2021',
    publisher: 'Springer',
    year: 2021,
    citations: 11,
    category: 'link-prediction',
    categoryLabel: 'Link Prediction & Complex Networks',
    schematic: 'shortest-path',
    figureUrl: '/assets/diagrams/pub-19.png',
    figureCaption: 'Fig. 1. Double-degree formulation balancing mutual common neighbors and popular hub bias.',
    abstract:
      'Introduces a double-degree formulation accounting for both mutual common neighbors and high-centrality hub nodes to refine edge likelihood estimation.',
    highlights: [
      'Reduces degree-bias distortion in scale-free networks.',
      'Fast O(k^2) local computation compatible with streaming graphs.',
    ],
    keywords: ['Link Prediction', 'Double Degree', 'Complex Networks', 'WorldCIST'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:9yKSN-GCB0IC',
    bibtex: `@inproceedings{gul2021doubledegree,
  title={Link Prediction Using Double Degree Equation with Mutual and Popular Nodes},
  author={Gul, Haji and others},
  booktitle={World Conference on Information Systems and Technologies (WorldCIST)},
  year={2021},
  publisher={Springer}
}`,
  },
  {
    id: 'pub-20',
    index: 20,
    title: 'Efficient Link Prediction Model for Real-World Complex Networks Using Matrix-Forest Metric with Local Similarity Features',
    authors: 'Haji Gul, et al.',
    venue: 'Journal of Complex Networks',
    publisher: 'Oxford University Press',
    year: 2022,
    citations: 8,
    category: 'link-prediction',
    categoryLabel: 'Link Prediction & Complex Networks',
    schematic: 'spectral-curve',
    figureUrl: '/assets/diagrams/pub-20.png',
    figureCaption: 'Fig. 1. Hybrid algebraic Matrix-Forest index and localized neighborhood similarity pipeline.',
    abstract:
      'Combines the algebraic Matrix-Forest index with localized neighborhood similarity features to deliver high-precision link inference in sparse real-world networks.',
    highlights: [
      'Published in Oxford Journal of Complex Networks.',
      'Balances global spanning-forest topology with local clustering.',
    ],
    keywords: ['Matrix-Forest Metric', 'Link Prediction', 'Oxford', 'Complex Networks'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:YsMSGLbcyi4C',
    bibtex: `@article{gul2022matrixforest,
  title={Efficient Link Prediction Model for Real-World Complex Networks Using Matrix-Forest Metric with Local Similarity Features},
  author={Gul, Haji and others},
  journal={Journal of Complex Networks},
  year={2022},
  publisher={Oxford University Press}
}`,
  },
  {
    id: 'pub-21',
    index: 21,
    title: 'Hill Climbing-Based Efficient Model for Link Prediction in Undirected Graphs',
    authors: 'Haji Gul, et al.',
    venue: 'Mathematics',
    publisher: 'MDPI',
    year: 2022,
    citations: 8,
    category: 'link-prediction',
    categoryLabel: 'Link Prediction & Complex Networks',
    schematic: 'shortest-path',
    figureUrl: '/assets/diagrams/pub-21.png',
    figureCaption: 'Fig. 1. Adaptive hill-climbing weight optimization over hybrid topological similarity features.',
    abstract:
      'Formulates an adaptive hill-climbing optimization strategy that tunes hybrid topological feature weights for link prediction in undirected graphs.',
    highlights: [
      'Automatically adapts feature importance per network topology.',
      'MATLAB optimization scripts & benchmark datasets available on GitHub.',
    ],
    keywords: ['Hill Climbing', 'Link Prediction', 'Undirected Graphs', 'MDPI'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:WF5omc3nYNoC',
    githubUrl: 'https://github.com/hajigul/Efficient-LP-Method-Code',
    bibtex: `@article{gul2022hillclimbing,
  title={Hill Climbing-Based Efficient Model for Link Prediction in Undirected Graphs},
  author={Gul, Haji and others},
  journal={Mathematics},
  year={2022},
  publisher={MDPI}
}`,
  },
  {
    id: 'pub-22',
    index: 22,
    title: 'Enhancing Link Prediction Efficiency with Shortest Path and Structural Attributes',
    authors: 'Haji Gul, et al.',
    venue: 'Intelligent Data Analysis',
    publisher: 'IOS Press',
    year: 2024,
    citations: 6,
    category: 'link-prediction',
    categoryLabel: 'Link Prediction & Complex Networks',
    schematic: 'shortest-path',
    figureUrl: '/assets/diagrams/pub-22.png',
    figureCaption: 'Fig. 1. Bounded k-hop shortest-path pruning with local structural attributes for sparse graphs.',
    abstract:
      'Integrates bounded shortest-path distances with local structural attributes to reduce computational overhead while preserving predictive fidelity in large networks.',
    highlights: [
      'Avoids full all-pairs shortest path recomputation.',
      'Validated across sparse collaboration and citation graphs.',
    ],
    keywords: ['Shortest Path', 'Link Prediction', 'Structural Attributes'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:LkGwnXOMwfcC',
    bibtex: `@article{gul2024shortestpath,
  title={Enhancing Link Prediction Efficiency with Shortest Path and Structural Attributes},
  author={Gul, Haji and others},
  journal={Intelligent Data Analysis},
  year={2024},
  publisher={IOS Press}
}`,
  },
  {
    id: 'pub-23',
    index: 23,
    title: 'Leveraging Natural Language Processing for Enhanced Text Analysis in Business Intelligence',
    authors: 'Haji Gul, et al.',
    venue: 'IGI Global',
    publisher: 'IGI Global',
    year: 2024,
    citations: 5,
    category: 'kg-llm',
    categoryLabel: 'Knowledge Graphs & LLMs',
    schematic: 'bert-kg',
    figureUrl: '/assets/diagrams/pub-23.png',
    figureCaption: 'Fig. 1. Applied NLP, entity linking, and transformer embedding pipeline for business intelligence.',
    abstract:
      'Examines applied NLP pipelines, named entity extraction, and semantic clustering for turning unstructured enterprise corpora into structured business intelligence.',
    highlights: [
      'Covers entity linking, topic modeling, and decision-support dashboards.',
      'Bridges classical NLP pipelines with modern transformer embeddings.',
    ],
    keywords: ['NLP', 'RAG & Multimodal AI', 'Text Analysis', 'Business Intelligence'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:ULOm3_A8WrAC',
    bibtex: `@incollection{gul2024nlpbi,
  title={Leveraging Natural Language Processing for Enhanced Text Analysis in Business Intelligence},
  author={Gul, Haji and others},
  booktitle={IGI Global Research Anthology},
  year={2024},
  publisher={IGI Global}
}`,
  },
  {
    id: 'pub-24',
    index: 24,
    title: 'Forecasting Networks Links with Laplace Characteristic and Geographical Information in Complex Networks',
    authors: 'Haji Gul, et al.',
    venue: 'Procedia Computer Science',
    publisher: 'Elsevier',
    year: 2023,
    citations: 4,
    category: 'link-prediction',
    categoryLabel: 'Link Prediction & Complex Networks',
    schematic: 'spectral-curve',
    figureUrl: '/assets/diagrams/pub-24.png',
    figureCaption: 'Fig. 1. Spatial-spectral link forecasting fusing Laplacian eigenfeatures with geographical proximity.',
    abstract:
      'Fuses graph Laplacian spectral characteristics with spatial/geographical node coordinates to forecast future connections in spatially embedded networks.',
    highlights: [
      'Demonstrates synergy between spectral embeddings and spatial proximity.',
      'Applicable to transit, infrastructure, and regional social graphs.',
    ],
    keywords: ['Laplace Characteristic', 'Spectral Graph Complexity', 'Link Prediction'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:Se3iqnhoufwC',
    bibtex: `@article{gul2023laplacegeo,
  title={Forecasting Networks Links with Laplace Characteristic and Geographical Information in Complex Networks},
  author={Gul, Haji and others},
  journal={Procedia Computer Science},
  year={2023},
  publisher={Elsevier}
}`,
  },
  {
    id: 'pub-25',
    index: 25,
    title: 'Real-World Protein Particle Network Reconstruction Based on Advanced Hybrid Features',
    authors: 'Haji Gul, et al.',
    venue: 'ICITS 2022',
    publisher: 'Springer',
    year: 2022,
    citations: 4,
    category: 'healthcare-cps',
    categoryLabel: 'Healthcare, GNNs & Cyber-Physical AI',
    schematic: 'bipartite-drug',
    figureUrl: '/assets/diagrams/pub-25.png',
    figureCaption: 'Fig. 1. Hybrid topological and motif-based biological protein interaction network reconstruction.',
    abstract:
      'Reconstructs missing interactions in biological protein-protein interaction networks by combining topological hybrid features with structural motif scores.',
    highlights: [
      'Evaluated on Yeast and biological protein particle interaction datasets.',
      'Improves recall on noisy experimental PPI measurements.',
    ],
    keywords: ['Protein Networks', 'Link Prediction', 'Bioinformatics', 'ICITS'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:UeHWp8X0CEIC',
    bibtex: `@inproceedings{gul2022protein,
  title={Real-World Protein Particle Network Reconstruction Based on Advanced Hybrid Features},
  author={Gul, Haji and others},
  booktitle={International Conference on Information Technology & Systems (ICITS)},
  year={2022},
  publisher={Springer}
}`,
  },
  {
    id: 'pub-26',
    index: 26,
    title: 'Comparative Analysis of Machine Learning Algorithms for Author Age and Gender Identification',
    authors: 'Haji Gul, et al.',
    venue: 'ICITS 2023',
    publisher: 'Springer',
    year: 2023,
    citations: 4,
    category: 'kg-llm',
    categoryLabel: 'Knowledge Graphs & LLMs',
    schematic: 'gnn-cascade',
    figureUrl: '/assets/diagrams/pub-26.png',
    figureCaption: 'Fig. 1. Stylometric feature extraction and supervised ML classifier suite for author profiling.',
    abstract:
      'Benchmarks stylometric features and supervised machine learning classifiers for automated author profiling across multi-genre text collections.',
    highlights: [
      'Compares lexical, syntactic, and n-gram representations.',
      'Evaluates cross-domain robustness of demographic profiling models.',
    ],
    keywords: ['NLP', 'Author Profiling', 'Machine Learning', 'ICITS'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:qUcmZB5y_30C',
    bibtex: `@inproceedings{gul2023author,
  title={Comparative Analysis of Machine Learning Algorithms for Author Age and Gender Identification},
  author={Gul, Haji and others},
  booktitle={International Conference on Information Technology & Systems (ICITS)},
  year={2023},
  publisher={Springer}
}`,
  },
  {
    id: 'pub-27',
    index: 27,
    title: 'Features Extraction and Structure Similarities Measurement of Complex Networks',
    authors: 'Haji Gul, et al.',
    venue: 'LNNS 2024',
    publisher: 'Springer (Lecture Notes in Networks and Systems)',
    year: 2024,
    citations: 0,
    category: 'link-prediction',
    categoryLabel: 'Link Prediction & Complex Networks',
    schematic: 'community-clusters',
    figureUrl: '/assets/diagrams/pub-27.png',
    figureCaption: 'Fig. 1. Standardized graph descriptor pipeline and pairwise similarity clustering across domains.',
    abstract:
      'Presents an algorithmic pipeline for extracting structural graph descriptors and computing cross-network similarity matrices across biological and social datasets.',
    highlights: [
      'Standardizes degree distribution, diameter, and clustering descriptors.',
      'Enables systematic clustering of complex network families.',
    ],
    keywords: ['Complex Networks', 'Feature Extraction', 'Structural Similarity', 'LNNS'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:3fE2CSJIrl8C',
    bibtex: `@incollection{gul2024lnns,
  title={Features Extraction and Structure Similarities Measurement of Complex Networks},
  author={Gul, Haji and others},
  booktitle={Lecture Notes in Networks and Systems (LNNS)},
  year={2024},
  publisher={Springer}
}`,
  },
  {
    id: 'pub-28',
    index: 28,
    title: 'Link Prediction in Human Complex Network Based on Random Walk with Global Topological Features',
    authors: 'Haji Gul, et al.',
    venue: 'iTDAF 2023',
    publisher: 'IEEE',
    year: 2023,
    citations: 0,
    category: 'link-prediction',
    categoryLabel: 'Link Prediction & Complex Networks',
    schematic: 'shortest-path',
    figureUrl: '/assets/diagrams/pub-28.png',
    figureCaption: 'Fig. 1. Biased random walk combined with global centrality priors for human network link prediction.',
    abstract:
      'Integrates biased random-walk transition probabilities with global topological invariants to predict latent ties in human interaction networks.',
    highlights: [
      'Balances local random-walk exploration with global centrality priors.',
      'Reduces cold-start errors on peripheral nodes.',
    ],
    keywords: ['Random Walk', 'Link Prediction', 'Human Networks', 'Topological Features'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:roLk4NBRz8UC',
    bibtex: `@inproceedings{gul2023randomwalk,
  title={Link Prediction in Human Complex Network Based on Random Walk with Global Topological Features},
  author={Gul, Haji and others},
  booktitle={International Conference on Technological Advancements (iTDAF)},
  year={2023}
}`,
  },
  {
    id: 'pub-29',
    index: 29,
    title: 'Big Data Analytics in Bioinformatics and Healthcare',
    authors: 'Haji Gul, et al.',
    venue: 'Studies in Big Data',
    publisher: 'Springer',
    year: 2025,
    citations: 1,
    category: 'healthcare-cps',
    categoryLabel: 'Healthcare, GNNs & Cyber-Physical AI',
    schematic: 'bipartite-drug',
    figureUrl: '/assets/diagrams/pub-29.png',
    figureCaption: 'Fig. 1. Scalable genomic and multi-omics knowledge graph analytics platform for precision medicine.',
    abstract:
      'Explores scalable graph analytics, genomic sequence mining, and knowledge-graph-assisted clinical data integration for modern precision medicine.',
    highlights: [
      'Covers multi-omics data fusion and scalable graph storage.',
      'Connects network medicine methods with clinical analytics.',
    ],
    keywords: ['Bioinformatics', 'Explainable Healthcare AI', 'Big Data', 'Springer'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:QIV2ME_5wuYC',
    bibtex: `@incollection{gul2025bioinformatics,
  title={Big Data Analytics in Bioinformatics and Healthcare},
  author={Gul, Haji and others},
  booktitle={Studies in Big Data},
  year={2025},
  publisher={Springer}
}`,
  },
  {
    id: 'pub-30',
    index: 30,
    title: 'Cyber Security in Cyber Physical Systems: Challenges and Opportunities',
    authors: 'Haji Gul, et al.',
    venue: 'IGI Global',
    publisher: 'IGI Global',
    year: 2025,
    citations: 1,
    category: 'healthcare-cps',
    categoryLabel: 'Healthcare, GNNs & Cyber-Physical AI',
    schematic: 'ics-shield',
    figureUrl: '/assets/diagrams/pub-30.png',
    figureCaption: 'Fig. 1. Sensor-to-cloud CPS attack surface mapping and graph-aware AI intrusion defense.',
    abstract:
      'Analyzes attack surfaces, threat modeling, and AI-enabled intrusion detection mechanisms across interconnected Cyber-Physical Systems.',
    highlights: [
      'Maps sensor-to-cloud vulnerabilities in critical infrastructure.',
      'Proposes graph-aware anomaly detection directions.',
    ],
    keywords: ['Cyber Security', 'Cyber-Physical Systems', 'IGI Global'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:-f6ydRqryjwC',
    bibtex: `@incollection{gul2025cpssecurity,
  title={Cyber Security in Cyber Physical Systems: Challenges and Opportunities},
  author={Gul, Haji and others},
  booktitle={IGI Global},
  year={2025},
  publisher={IGI Global}
}`,
  },
  {
    id: 'pub-31',
    index: 31,
    title: 'Governance, Policy Frameworks & Achieving Sustainable Healthcare Systems in Africa',
    authors: 'Haji Gul, et al.',
    venue: 'CRC Press',
    publisher: 'Taylor & Francis / CRC Press',
    year: 2025,
    citations: 0,
    category: 'healthcare-cps',
    categoryLabel: 'Healthcare, GNNs & Cyber-Physical AI',
    schematic: 'gnn-cascade',
    figureUrl: '/assets/diagrams/pub-31.png',
    figureCaption: 'Fig. 1. Digital health governance, FHIR interoperability, and AI resource allocation framework.',
    abstract:
      'Examines digital health governance, data interoperability standards, and AI-supported healthcare resource allocation frameworks for sustainable health systems.',
    highlights: [
      'Integrates technology governance with equitable health infrastructure.',
      'Highlights responsible AI deployment policies.',
    ],
    keywords: ['Explainable Healthcare AI', 'Governance', 'Sustainable Health', 'CRC Press'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:YFjsv_pBGBYC',
    bibtex: `@incollection{gul2025governance,
  title={Governance, Policy Frameworks & Achieving Sustainable Healthcare Systems in Africa},
  author={Gul, Haji and others},
  booktitle={CRC Press},
  year={2025},
  publisher={CRC Press}
}`,
  },
  {
    id: 'pub-32',
    index: 32,
    title: 'Comparative Analysis of Link Prediction in Complex Networks',
    authors: 'Haji Gul, et al.',
    venue: 'IJTD 2021',
    publisher: 'International Journal of Technology Diffusion',
    year: 2021,
    citations: 1,
    category: 'link-prediction',
    categoryLabel: 'Link Prediction & Complex Networks',
    schematic: 'community-clusters',
    figureUrl: '/assets/diagrams/pub-32.png',
    figureCaption: 'Fig. 1. Controlled edge-removal evaluation of classical local link prediction baselines.',
    abstract:
      'Evaluates classical local similarity indices across benchmark social, neuronal, and biological networks under controlled edge-removal protocols.',
    highlights: [
      'Compares precision and AUC across multiple train/test edge splits.',
      'Establishes baseline performance curves for sparse graphs.',
    ],
    keywords: ['Link Prediction', 'Complex Networks', 'Comparative Analysis'],
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:qjMakFHDy7sC',
    bibtex: `@article{gul2021ijtd,
  title={Comparative Analysis of Link Prediction in Complex Networks},
  author={Gul, Haji and others},
  journal={International Journal of Technology Diffusion (IJTD)},
  year={2021}
}`,
  },
];

export const EXPERIENCE_TIMELINE = [
  {
    id: 'exp-cusit-current',
    period: 'September 2026 – Present',
    roleOrDegree: 'Lecturer in Computer Science',
    institution:
      'City University of Science and Information Technology (CUSIT)',
    institutionUrl: 'https://www.linkedin.com/school/15128901/',
    location: 'Peshawar, Pakistan',
    summary:
      'Faculty appointment teaching undergraduate computing courses and mentoring final-year engineering projects.',
    details: [
      'Teaching undergraduate computer science courses.',
      'Supervising final-year projects (FYPs).',
    ],
    skills: [
      'Computer Science Instruction',
      'FYP Supervision',
      'Undergraduate Teaching',
      'Curriculum Delivery',
    ],
    isCurrent: true,
  },
  {
    id: 'exp-daad',
    period: '2025 – Present',
    roleOrDegree:
      'DAAD AInet Short-Term Fellowship — Natural Language Processing',
    institution:
      'German Academic Exchange Service (DAAD) · Leuphana University',
    location: 'Germany',
    summary:
      'Selective early-career fellowship awarded by the German Academic Exchange Service; ongoing research collaboration with Leuphana University.',
    details: [
      'Collaborating on neuro-symbolic NLP, structured knowledge representation, and LLM evaluation.',
      'Engaging with the international DAAD AInet Postdoc-NeT-AI cohort in Germany.',
    ],
    skills: [
      'Natural Language Processing',
      'LLMs',
      'Knowledge Graphs',
      'Neuro-Symbolic AI',
    ],
    isCurrent: true,
  },
  {
    id: 'exp-ubd-ta',
    period: '2024 – 2026',
    roleOrDegree:
      'Teaching Assistant — Data Structures and Algorithms',
    institution:
      'School of Digital Science, Universiti Brunei Darussalam',
    institutionUrl: 'https://www.linkedin.com/school/15098115/',
    location: 'Brunei Darussalam',
    summary:
      'Academic teaching assistantship guiding foundational computer science laboratory sessions, tutorials, and algorithmic problem solving.',
    details: [
      'Assisted in delivering tutorials, coding exercises, assignments and practical sessions.',
      'Guided students in understanding core concepts of algorithms and data structures.',
      'Supported course assessments and student learning activities.',
    ],
    skills: [
      'Data Structures',
      'Algorithms',
      'Tutorials & Labs',
      'Course Assessment',
      'Problem Solving',
    ],
  },
  {
    id: 'exp-seria-robotics',
    period: '2024 (3 Months)',
    roleOrDegree: 'Robotics Trainer & Project Supervisor',
    institution: 'Seriya Energy Lab',
    location: 'Brunei',
    summary:
      'Three-month robotics mentorship and hands-on STEM project guidance for student engineering cohorts.',
    details: [
      'Conducted hands-on training sessions in robotics fundamentals.',
      'Supervised 3 student groups through introductory robotics projects.',
      'Mentored students in problem-solving, teamwork, and technical documentation.',
    ],
    skills: [
      'Robotics Fundamentals',
      'Student Mentorship',
      'Project Supervision',
      'Technical Documentation',
    ],
  },
  {
    id: 'exp-cusit-senior',
    period: 'Sep 2019 – Aug 2023',
    roleOrDegree: 'Senior Lecturer & Member of FYPs Committee',
    institution:
      'City University of Science and Information Technology (CUSIT)',
    institutionUrl: 'https://www.linkedin.com/school/15128901/',
    location: 'Peshawar, Pakistan',
    summary:
      'Four years of full-time academic instruction, graduate thesis co-supervision, undergraduate final-year project mentorship, and departmental governance.',
    details: [
      'Teaching Courses (BS Level).',
      'Supervising Final-Year Projects (FYPs).',
      'Member of Departmental FYPs Committee.',
    ],
    supervision: {
      ms: [
        'Link Prediction Based on Topological Features with Shortest Path',
      ],
      bs: [
        'Complex Network Structure Analysis and Similarity Measurement',
        'Similarity-Based Algorithms for Protein-Protein Interaction Prediction',
        'Digital Parking System',
        'CUSIT Sport Monitoring and Prediction System',
        'Edge Mining in Transportation and Animal Network',
      ],
    },
    skills: [
      'BS Level Teaching',
      'MS Co-Supervision',
      'FYP Committee',
      'Complex Networks',
      'Link Prediction',
    ],
  },
];

export const EDUCATION_TIMELINE = [
  {
    id: 'edu-phd',
    period: '2023 – 2026 (expected)',
    roleOrDegree: 'Ph.D., Artificial Intelligence',
    institution: 'School of Digital Science, Universiti Brunei Darussalam (UBD)',
    institutionUrl: 'https://www.linkedin.com/school/15098115/',
    location: 'Brunei Darussalam',
    degreeNote: 'Thesis Submitted · Defence Expected Nov-2026',
    summary:
      'Thesis: Advancing Knowledge Graph Completion Through Domain-Aware Evaluation, Complexity Analysis, and Contextual Learning',
    details: [
      'Advisors: Dr. Ajaz Ahmad Bhat and Dr. Abdul Ghani Naim',
      'Status: Thesis submitted, defence expected, November-2026',
      'Developing negative-sampling-free Knowledge Graph Completion architectures (MuCo-KGC, MuCoS, DualRep) and KG-EDAS evaluation frameworks.',
    ],
    skills: [
      'Artificial Intelligence',
      'Knowledge Graphs',
      'LLMs',
      'GNNs',
      'Transformers',
      'Spectral Graph Complexity',
    ],
    isCurrent: true,
  },
  {
    id: 'edu-ms',
    period: '2017 – 2019',
    roleOrDegree: 'M.S., Computer Science',
    institution:
      'Center for Excellence in Information Technology, Institute of Management Sciences, Peshawar',
    institutionUrl: 'https://www.linkedin.com/school/14068032/',
    location: 'Pakistan',
    summary:
      'Thesis: Link Prediction Using Node Information on Local Paths (Supervisor: Dr. Furqan Aziz)',
    details: [
      'Investigated topological heuristics, local path structures, and node similarity metrics for link prediction in complex networks.',
      'Research outputs published in peer-reviewed journals including Nature Scientific Reports, Physica A, and IEEE Access.',
    ],
    skills: [
      'Complex Networks',
      'Link Prediction',
      'Graph Theory',
      'Machine Learning',
      'Python',
    ],
  },
  {
    id: 'edu-msc',
    period: '2014 – 2016',
    roleOrDegree: 'M.Sc., Computer Science',
    institution:
      'Center for Excellence in Information Technology, Institute of Management Sciences, Peshawar',
    institutionUrl: 'https://www.linkedin.com/school/14068032/',
    location: 'Pakistan',
    summary:
      'Final project: Internet Download Application (Java, NetBeans IDE)',
    details: [
      'Engineered a multi-threaded desktop download application with segmented parallel downloading and socket stream handling in Java.',
      'Rigorous graduate coursework covering Advanced Database Systems, Design & Analysis of Algorithms, and Software Engineering.',
    ],
    skills: [
      'Java',
      'NetBeans IDE',
      'Multithreading',
      'Software Engineering',
      'Algorithms',
    ],
  },
  {
    id: 'edu-bsc',
    period: '2011 – 2013',
    roleOrDegree: 'B.Sc. (Computer Science)',
    institution:
      'Government Superior Science College Peshawar (University of Peshawar)',
    institutionUrl: 'https://www.linkedin.com/school/15104731/',
    location: 'Pakistan',
    summary:
      'Undergraduate studies in Computer Science and Applied Mathematics under the University of Peshawar.',
    details: [
      'Comprehensive foundation in Object-Oriented Programming (C/C++), Data Structures, Database Fundamentals, and Calculus.',
    ],
    skills: [
      'Computer Science',
      'C/C++',
      'Data Structures',
      'Mathematics',
    ],
  },
  {
    id: 'edu-hssc',
    period: '2011',
    roleOrDegree: 'Higher Secondary School Certificate (HSSC)',
    institution: 'Lamar Degree College Peshawar (BISE Peshawar)',
    institutionUrl: 'https://www.linkedin.com/school/15128901/',
    location: 'Pakistan',
    summary:
      'Intermediate science qualification certified by the Board of Intermediate and Secondary Education (BISE) Peshawar.',
    details: [
      'Specialized in Computer Science, Mathematics, and Physics with high academic distinction.',
    ],
    skills: ['Computer Science', 'Mathematics', 'Physics'],
  },
  {
    id: 'edu-ssc',
    period: '2009',
    roleOrDegree: 'Secondary School Certificate (SSC)',
    institution:
      'Government Technical Higher Secondary School, Gulbahar no.2, (BISE Peshawar)',
    institutionUrl: 'https://www.linkedin.com/school/15128901/',
    location: 'Pakistan',
    summary:
      'Matriculation with Science & Technical Education foundation certified by BISE Peshawar.',
    details: [
      'Rigorous foundational education in Mathematics, Science, and Technical Engineering Principles.',
    ],
    skills: ['Science', 'Technical Education', 'Mathematics'],
  },
];

export const HONORS_AND_SERVICE = [
  {
    id: 'honor-daad',
    year: '2025 – Present',
    title:
      'DAAD AInet Short-Term Fellowship — Natural Language Processing, Germany',
    issuer: 'German Academic Exchange Service (DAAD) · Leuphana University',
    description:
      'Selective early-career fellowship awarded by the German Academic Exchange Service; ongoing research collaboration with Leuphana University.',
    linkLabel: 'Fellow profile',
    linkUrl: 'https://www.daad.de/en/the-daad/postdocnet-ai/',
  },
  {
    id: 'honor-ugrs',
    year: '2023 – Present',
    title: 'University Graduate Research Scholarship (UGRS)',
    issuer: 'Universiti Brunei Darussalam (UBD)',
    description:
      'Fully funded PhD scholarship, Universiti Brunei Darussalam, supporting doctoral investigations into Knowledge Graph Completion, Graph Complexity, and Large Language Models.',
  },
  {
    id: 'honor-conferences',
    year: '2024 – 2025',
    title: 'Top-Tier AI Conference & Workshop Presenter',
    issuer: 'NeurIPS · ICML · ACL · AAAI · PAKDD · IEEE BigData',
    description:
      'Authored and presented peer-reviewed research across MusIML (NeurIPS/ICML), BioNLP (ACL), GCLR (AAAI), PAKDD, and IEEE BigData.',
  },
  {
    id: 'honor-reviewer',
    year: 'Ongoing',
    title: 'Peer Reviewer & Academic Service',
    issuer: 'AI, Complex Networks & Knowledge Engineering Venues',
    description:
      'Active technical reviewer evaluating manuscripts on Graph Neural Networks, Knowledge Graphs, Link Prediction, and Explainable AI.',
  },
];

export const CERTIFICATIONS = [
  {
    id: 'cert-robot-localization',
    title: 'Robot Localization with Python and Particle Filters',
    issuer: 'Coursera',
    issuedDate: 'March 2025',
    credentialId: 'RH9A1IEZDEDI',
    credentialUrl:
      'https://www.linkedin.com/in/haji-gul-658502120/details/certifications/',
    verifyUrl: 'https://coursera.org/verify/RH9A1IEZDEDI',
    imageUrl: '/assets/portfolio/image_14dfea1e.png',
  },
  {
    id: 'cert-rag-agents',
    title: 'Fundamentals of AI Agents Using RAG and LangChain',
    issuer: 'IBM',
    issuedDate: 'February 2025',
    credentialId: '4G5ORTWK63S3',
    credentialUrl:
      'https://www.linkedin.com/in/haji-gul-658502120/details/certifications/',
    verifyUrl: 'https://coursera.org/verify/4G5ORTWK63S3',
    imageUrl: '/assets/portfolio/image_9964d76a.png',
  },
  {
    id: 'cert-gen-ai',
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud Skills Boost',
    issuedDate: 'January 2025',
    credentialId: '3BI8MK3YVT9A',
    credentialUrl:
      'https://www.linkedin.com/in/haji-gul-658502120/details/certifications/',
    verifyUrl: 'https://coursera.org/verify/3BI8MK3YVT9A',
    imageUrl: '/assets/portfolio/image_2007cab2.png',
  },
  {
    id: 'cert-sequence-models',
    title: 'Sequence Models',
    issuer: 'DeepLearning.AI',
    issuedDate: 'December 2023',
    credentialId: 'HAP2PJ2D93DG',
    credentialUrl:
      'https://www.linkedin.com/in/haji-gul-658502120/details/certifications/',
    verifyUrl: 'https://coursera.org/verify/HAP2PJ2D93DG',
    imageUrl: '/assets/portfolio/image_098b6005.png',
  },
  {
    id: 'cert-structuring-ml',
    title: 'Structuring Machine Learning Projects',
    issuer: 'DeepLearning.AI',
    issuedDate: 'November 2023',
    credentialId: 'U862UXYU5U5M',
    credentialUrl:
      'https://www.linkedin.com/in/haji-gul-658502120/details/certifications/',
    verifyUrl: 'https://coursera.org/verify/U862UXYU5U5M',
    imageUrl: '/assets/portfolio/image_08e2682f.png',
  },
  {
    id: 'cert-nn-dl',
    title: 'Neural Networks and Deep Learning',
    issuer: 'DeepLearning.AI',
    issuedDate: 'October 2023',
    credentialId: 'RYUPKP39ABP5',
    credentialUrl:
      'https://www.linkedin.com/in/haji-gul-658502120/details/certifications/',
    verifyUrl: 'https://coursera.org/verify/RYUPKP39ABP5',
    imageUrl: '/assets/portfolio/image_f8574988.png',
  },
  {
    id: 'cert-supervised-regression',
    title: 'Supervised Machine Learning: Regression',
    issuer: 'IBM',
    issuedDate: 'October 2023',
    credentialId: 'ZTRVPVTSPZYA',
    credentialUrl:
      'https://www.linkedin.com/in/haji-gul-658502120/details/certifications/',
    verifyUrl: 'https://coursera.org/verify/ZTRVPVTSPZYA',
    imageUrl: '/assets/portfolio/image_f74bd8f2.png',
  },
  {
    id: 'cert-supervised-classification',
    title: 'Supervised Machine Learning: Classification',
    issuer: 'IBM',
    issuedDate: 'September 2023',
    credentialId: 'CDZ3FNTE66MS',
    credentialUrl:
      'https://www.linkedin.com/in/haji-gul-658502120/details/certifications/',
    verifyUrl: 'https://coursera.org/verify/CDZ3FNTE66MS',
    imageUrl: '/assets/portfolio/image_a50ef98f.png',
  },
];

export const YOUTUBE_LECTURES = [
  {
    id: 'lec-graph-theory',
    title: 'Graph Theory — Complete Course (Basics to Advanced)',
    series: 'University-Level Series',
    durationOrCount: 'Full YouTube Playlist',
    description:
      'Step-by-step course covering graph fundamentals, adjacency matrices, paths, connectivity, spanning trees, and network algorithms.',
    topics: ['Graph Theory', 'Adjacency Matrices', 'Paths & Trees'],
    url: 'https://youtube.com/playlist?list=PL2XfVVRsHmflOiiSfNcLUJmBROVrx0-zL&si=vRUoeNmYFAbqPxwD',
    thumbnailUrl: '/assets/portfolio/Graph_theory_playlist_564fcae5.jpg',
  },
  {
    id: 'lec-matlab-physics',
    title: 'MATLAB Course for Computational Physics — Basics of MATLAB',
    series: 'Scientific Computing',
    durationOrCount: 'Full YouTube Playlist',
    description:
      'Beginner-friendly hands-on MATLAB course for matrices, differential equations, numerical plotting, and computational physics simulations.',
    topics: ['MATLAB Basics', 'Computational Physics', '3D Visualization'],
    url: 'https://youtube.com/playlist?list=PL2XfVVRsHmfklGeEtud6g6QlxzZ9I0We3&si=ky0TLBaBhEvUKLap',
    thumbnailUrl: '/assets/portfolio/Matlab_computational_physics_playlist_97bd9db1.jpg',
  },
  {
    id: 'lec-dsa-cpp',
    title: 'Data Structures Full Course in C++',
    series: 'Complete Learning Series',
    durationOrCount: 'Full YouTube Playlist',
    description:
      'Comprehensive C++ walkthroughs of arrays, linked lists, stacks, queues, trees, graphs, sorting, and algorithmic flow analysis.',
    topics: ['Data Structures', 'C++ Implementations', 'Algorithms'],
    url: 'https://youtube.com/playlist?list=PL2XfVVRsHmfko6A14ZL1bYlPSZ3eU7Xo_&si=ASPIY1-FnvwkDJiT',
    thumbnailUrl: '/assets/portfolio/Data_structure_and_algorithm_playlist_5311cc60.jpg',
  },
  {
    id: 'lec-cpp-beginners',
    title: 'C++ Tutorial for Beginners — Full Course',
    series: 'Programming Foundations',
    durationOrCount: 'Full YouTube Playlist',
    description:
      'Zero-to-hero introduction to C++ syntax, control flow, functions, pointers, arrays, and object-oriented programming.',
    topics: ['C++ Programming', 'OOP Concepts', 'Pointers & Functions'],
    url: 'https://youtube.com/playlist?list=PL2XfVVRsHmfn-6GcIwz3_oFMYqkvxlHR6&si=XxqKRob06BnUyWu-',
    thumbnailUrl: '/assets/portfolio/Cpp_programming_playlist_13517e0a.jpg',
  },
  {
    id: 'lec-coreldraw',
    title: 'CorelDRAW — Full Course Beginners to Advanced (2020)',
    series: 'Graphic Design Masterclass',
    durationOrCount: 'Full YouTube Playlist',
    description:
      'Vector illustration, Bézier curves, typography, branding layouts, and print-ready artwork mastery from scratch to advanced workflows.',
    topics: ['CorelDRAW 2020', 'Vector Illustration', 'Graphic Design'],
    url: 'https://youtube.com/playlist?list=PL2XfVVRsHmfkMLV_8AFX6X6EqjwhPX9BC&si=5DbUChZkiGieXEKJ',
    thumbnailUrl: '/assets/portfolio/Corel_draw_playlist_88c1c672.jpg',
  },
  {
    id: 'lec-photoshop-cs6',
    title: 'Adobe Photoshop CS6 Tutorial for Beginners',
    series: 'Digital Imaging Course',
    durationOrCount: 'Full YouTube Playlist',
    description:
      'Learn layers, masking, color grading, curves adjustments, photo retouching, and creative compositing from the ground up.',
    topics: ['Photoshop CS6', 'Layers & Masks', 'Photo Editing'],
    url: 'https://youtube.com/playlist?list=PL2XfVVRsHmfkX1vDzIc24coC5frghwsTB&si=8LzDuciory8jH8UI',
    thumbnailUrl: '/assets/portfolio/photoshop_playlist_c1db97a9.jpg',
  },
];

export const ACADEMIC_REFERENCES = [
  {
    id: 'ref-1',
    name: 'Dr. Ajaz Ahmad Bhat',
    title: 'Assistant Professor',
    department: 'School of Digital Science',
    institution: 'Universiti Brunei Darussalam',
    email: 'ajaz.bhat@ubd.edu.bn',
  },
  {
    id: 'ref-2',
    name: 'Dr. Abdul Ghani Naim',
    title: 'Assistant Professor',
    department: 'School of Digital Science',
    institution: 'Universiti Brunei Darussalam',
    email: 'ghani.naim@ubd.edu.bn',
  },
  {
    id: 'ref-3',
    name: 'Dr. Adnan Amin',
    title: 'Assistant Professor',
    department: 'Department of Computer Science',
    institution: 'Institute of Management Sciences (IMSciences), Peshawar',
    email: 'adnan.amin@imsciences.edu.pk',
  },
];

export const SUBJECTS_TAUGHT = {
  primaryLanguage: 'Python',
  primaryTool: 'MATLAB',
  courses: [
    { id: 'c-1', name: 'AI', track: 'AI & Data Science', code: 'CS-AI' },
    { id: 'c-2', name: 'ML', track: 'AI & Data Science', code: 'CS-ML' },
    { id: 'c-3', name: 'Data Mining', track: 'AI & Data Science', code: 'CS-DM' },
    { id: 'c-4', name: 'Social Network Analysis', track: 'AI & Data Science', code: 'CS-SNA' },
    { id: 'c-5', name: 'Analysis of Algorithms', track: 'Theory & Algorithms', code: 'CS-ALGO' },
    { id: 'c-6', name: 'Data Structure', track: 'Theory & Algorithms', code: 'CS-DSA' },
    { id: 'c-7', name: 'Advanced Computation Theory', track: 'Theory & Algorithms', code: 'CS-ACT' },
    { id: 'c-8', name: 'Theory of Automata', track: 'Theory & Algorithms', code: 'CS-TOA' },
    { id: 'c-9', name: 'Compiler Construction', track: 'Systems & Software', code: 'CS-CC' },
    { id: 'c-10', name: 'Operating System', track: 'Systems & Software', code: 'CS-OS' },
    { id: 'c-11', name: 'Data Communication and Computer Network', track: 'Systems & Software', code: 'CS-DCN' },
    { id: 'c-12', name: 'Database', track: 'Systems & Software', code: 'CS-DB' },
    { id: 'c-13', name: 'Advanced Programming', track: 'Programming Foundations', code: 'CS-AP' },
    { id: 'c-14', name: 'Fundamentals of Programming', track: 'Programming Foundations', code: 'CS-FOP' },
    { id: 'c-15', name: 'Visual Programming', track: 'Programming Foundations', code: 'CS-VP' },
    { id: 'c-16', name: 'Introduction to Computers', track: 'Programming Foundations', code: 'CS-ITC' },
  ],
};

export const ACADEMIC_SERVICE = {
  conferences: [
    { name: 'ICML', note: '2026' },
    { name: 'NeurIPS', note: '2026' },
    { name: 'AAAI', note: 'PC / Reviewer' },
    { name: 'ICDM', note: 'Reviewer' },
    { name: 'MusIML@ICML', note: 'Workshop' },
    { name: 'WorldCIST', note: 'Reviewer' },
    { name: 'ECIC', note: 'Reviewer' },
  ],
  journals: [
    { name: 'Scientific Reports', publisher: 'Nature Portfolio' },
    { name: 'npj Complexity', publisher: 'Nature Portfolio' },
    { name: 'Applied Network Science', publisher: 'Springer' },
    { name: 'Cluster Computing', publisher: 'Springer' },
    { name: 'Social Network Analysis and Mining', publisher: 'Springer' },
    { name: 'IEEE Transactions on Consumer Electronics', publisher: 'IEEE' },
  ],
};

export const TECHNICAL_SKILLS_STACK = [
  {
    id: 'skill-programming',
    category: 'Programming',
    items: ['Python (primary)', 'MATLAB', 'Java', 'C#', 'LaTeX', 'SQL'],
  },
  {
    id: 'skill-ml',
    category: 'ML Frameworks',
    items: [
      'PyTorch',
      'TensorFlow / Keras',
      'HuggingFace Transformers',
      'scikit-learn',
      'NetworkX',
      'LangChain',
    ],
  },
  {
    id: 'skill-methods',
    category: 'Methods',
    items: [
      'Knowledge graph embeddings',
      'Graph neural networks',
      'Transformer fine-tuning',
      'Retrieval-augmented generation',
      'LLM agents',
      'Link prediction',
      'Spectral graph methods',
    ],
  },
  {
    id: 'skill-llm-tooling',
    category: 'LLM Tooling',
    items: [
      'Ollama (local, on-device small language models)',
      'Local embeddings (nomic-embed-text) for retrieval',
      'PDF parsing',
      'Gradio dashboards',
      'Tool-using agents',
      'Evaluation suites for LLM systems',
    ],
  },
  {
    id: 'skill-tools',
    category: 'Tools',
    items: ['Git / GitHub', 'Jupyter', 'Overleaf', 'SPSS'],
  },
  {
    id: 'skill-languages',
    category: 'Languages',
    items: ['English (fluent)', 'Urdu (native)', 'Pashto (native)'],
  },
  {
    id: 'skill-training',
    category: 'Selected Training',
    items: [
      'DeepLearning.AI (Neural Networks & Deep Learning; Sequence Models / NLP; Structuring ML Projects)',
      'RAG and LangChain Agents',
      'Generative AI',
    ],
  },
];

export const OPEN_SOURCE_CATEGORIES = [
  { id: 'proposed-methods', label: '1. Proposed Methods & Evaluation' },
  { id: 'baselines', label: '2. Reimplementations & Baselines' },
  { id: 'llm-agents', label: '3. LLM Agents & Assistants' },
  { id: 'chatbots-slms', label: '4. Chatbots, Retrieval & SLMs' },
  { id: 'biomedical-ml', label: '5. Biomedical & Clinical ML' },
  { id: 'applied-projects', label: '6. Applied Projects' },
  { id: 'teaching-code', label: '7. Teaching & Course Materials' },
];

export const OPEN_SOURCE_PROJECTS = [
  {
    id: 'oss-mucos',
    category: 'proposed-methods',
    name: 'MuCoS',
    subtitle: 'BioNLP @ ACL 2025 · Mirrored at AdaptiveBotsLab',
    description:
      'Multi-context-aware sampling framework for drug-target discovery over biomedical knowledge graphs (KEGG50k & PharmKG-8k).',
    stack: ['Python', 'PyTorch', 'Transformers', 'BioNLP'],
    repoUrl:
      'https://github.com/hajigul/MuCoS_KGC-Efficient-Drug-Target-Discovery-via-Multi-Context-Aware-Sampling-in-Knowledge-Graphs',
    mirrorUrl:
      'https://github.com/AdaptiveBotsLab/MuCoS-Efficient-Drug-Target-Discovery-via-Multi-Context-Aware-Sampling-in-Knowledge-Graphs',
    mirrorLabel: 'AdaptiveBotsLab Mirror',
  },
  {
    id: 'oss-cab-kgc',
    category: 'proposed-methods',
    name: 'CAB-KGC',
    subtitle: 'MusIML @ NeurIPS 2024',
    description:
      'Contextualized BERT model for knowledge graph completion injecting multi-hop structural context around sparse entities.',
    stack: ['Python', 'BERT', 'KGC'],
    repoUrl: 'https://github.com/hajigul/Revised_KG-BERT_Relation_Prediction_Implementation-',
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:aqlVkmm33-oC',
  },
  {
    id: 'oss-murok',
    category: 'proposed-methods',
    name: 'MuRoK',
    subtitle: 'NeurIPS 2026 Workshop',
    description:
      'Multi-level routing architecture for scalable knowledge graph retrieval across heterogeneous relational neighborhoods.',
    stack: ['Python', 'KG Retrieval', 'Routing'],
    repoUrl: 'https://github.com/hajigul/MuRoK',
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:M05iB0D1s5AC',
  },
  {
    id: 'oss-when-metrics',
    category: 'proposed-methods',
    name: 'When-Metrics-Disagree',
    subtitle: 'Meta-Analysis of KGC Benchmarking · Notebooks',
    description:
      'Reproducible notebooks quantifying rank divergence across MRR and Hits@K evaluation protocols; also referenced with AdaptiveBotsLab.',
    stack: ['Jupyter Notebook', 'Python', 'Meta-Analysis'],
    repoUrl: 'https://github.com/hajigul/When-Metrics-Disagree',
  },
  {
    id: 'oss-kg-edas',
    category: 'proposed-methods',
    name: 'KG-EDAS & Evaluation Suite',
    subtitle: 'IEEE BigData 2025 · AAAI GCLR Workshop',
    description:
      'Meta-metric evaluation framework based on Distance from Average Solution (EDAS) plus Domain-Aware KG-EDAS, KD-EDAS, and EDAS repositories.',
    stack: ['Python', 'MCDA / EDAS', 'KGC Eval'],
    repoUrl: 'https://github.com/hajigul/KG-EDAS-IEEE_BigData',
    relatedRepos: [
      { label: 'Domain-Aware (AAAI GCLR)', url: 'https://github.com/hajigul/Domain_Aware_KG_EDAS_GCLR_AAA' },
      { label: 'KD-EDAS', url: 'https://github.com/hajigul/KD-EDAS' },
      { label: 'EDAS Core', url: 'https://github.com/hajigul/EDAS' },
      { label: 'AdaptiveBotsLab', url: 'https://github.com/AdaptiveBotsLab/KG-EDAS_IEEE_BigData' },
    ],
  },
  {
    id: 'oss-csg',
    category: 'proposed-methods',
    name: 'Cumulative Spectral Gradient (CSG) Complexity',
    subtitle: 'MusIML @ ICML 2025 · IEEE BigData 2025',
    description:
      'Spectral and structural complexity measurement suite for knowledge graph benchmarks, spanning CSG, Semantic-Spectral-Structural metrics, KGC-CSG, and AdaptiveBotsLab E-CSG.',
    stack: ['Python', 'Jupyter', 'Laplacian Spectrum'],
    repoUrl:
      'https://github.com/hajigul/Evaluating-Cumulative-Spectral-Gradient-as-a-Complexity-Measure',
    relatedRepos: [
      {
        label: 'Semantic-Spectral-Structural',
        url: 'https://github.com/hajigul/Evaluating-KGC-via-Semantic-Spectral-and-Structural-Metrics-for-Link-Prediction',
      },
      {
        label: 'KGC-CSG',
        url: 'https://github.com/hajigul/KGC-CSG-Knowledge-Graph-Complexity-Measurement-using-Cumulative-Spectral-Graph-',
      },
      { label: 'E-CSG (AdaptiveBotsLab)', url: 'https://github.com/AdaptiveBotsLab/E-CSG_Complexity_Measur' },
    ],
  },
  {
    id: 'oss-no-free-lunch',
    category: 'proposed-methods',
    name: 'No-Free-Lunch-KGC',
    subtitle: 'Benchmark Study Notebooks',
    description:
      'Empirical notebooks studying dataset-dependent model trade-offs across knowledge graph completion benchmarks.',
    stack: ['Jupyter Notebook', 'Benchmarking'],
    repoUrl: 'https://github.com/hajigul/No_Free_Lunch_KGC',
  },
  {
    id: 'oss-reimpl-bert',
    category: 'baselines',
    name: 'KG-BERT & ShallowBKGC (Revised Reimplementations)',
    subtitle: 'Corrected Reproducible Baselines',
    description:
      'Independent, bug-fixed PyTorch reimplementations of published KGC baselines enabling fair head-to-head and tail-prediction comparisons.',
    stack: ['Python', 'PyTorch', 'BERT'],
    repoUrl: 'https://github.com/hajigul/Revised_KG-BERT_Relation_Prediction_Implementation-',
    relatedRepos: [
      { label: 'ShallowBKGC Reimpl', url: 'https://github.com/hajigul/Revised_Implementation_ShallowBKGC' },
    ],
  },
  {
    id: 'oss-sota-harness',
    category: 'baselines',
    name: 'KGC-Embedding-SOTA & Tail Prediction Harness',
    subtitle: 'Unified Evaluation Harness',
    description:
      'Standardized training and evaluation harness for running state-of-the-art KGE baselines on full and tail-only link prediction splits.',
    stack: ['Python', 'KGE', 'PyTorch'],
    repoUrl: 'https://github.com/hajigul/KGC_Embedding_SOTA',
    relatedRepos: [
      { label: 'Tail Prediction Variant', url: 'https://github.com/hajigul/KGC_Embedding_SOTA_Tail_Prediction' },
    ],
  },
  {
    id: 'oss-gnn-rel',
    category: 'baselines',
    name: 'GNN-Based Relation Prediction & Informed GNN',
    subtitle: 'GCN · GAT · GraphSAGE',
    description:
      'Graph Neural Network architectures engineered for relation prediction and structure-informed completion over multi-relational graphs.',
    stack: ['Python', 'PyTorch', 'GNNs'],
    repoUrl: 'https://github.com/hajigul/GNN_Based_Relation_Prediction',
    relatedRepos: [
      { label: 'Informed GNN', url: 'https://github.com/hajigul/Informed-Graph-Neural-Network' },
    ],
  },
  {
    id: 'oss-researchdesk',
    category: 'llm-agents',
    name: 'ResearchDesk',
    subtitle: 'Private Local AI Research Assistant · Ollama + 13-Case Eval Suite',
    description:
      'Runs locally on small models via Ollama so sensitive documents stay on-device. Features 4 integrated tools: (i) Discover (verified paper cards from arXiv/OpenAlex via fast rules or LLM agent + 13-case eval suite), (ii) Related Work (cited paragraph grounded strictly in real arXiv metadata so the model never hallucinates references), (iii) Citation Check (verifies citations against OpenAlex & arXiv), and (iv) Q&A (RAG over private PDFs using local embeddings with clickable page citations).',
    stack: ['Python', 'Ollama', 'nomic-embed-text', 'arXiv & OpenAlex APIs'],
    repoUrl: 'https://github.com/hajigul/ResearchDest',
    featured: true,
  },
  {
    id: 'oss-gram',
    category: 'llm-agents',
    name: 'GRAM',
    subtitle: 'Graph-Augmented Retrieval & Reasoning',
    description:
      'Python framework coupling structured graph traversal with retrieval-augmented generation for grounded multi-hop reasoning.',
    stack: ['Python', 'Graph RAG', 'LLM'],
    repoUrl: 'https://github.com/hajigul/GRAM',
  },
  {
    id: 'oss-kegg-agent',
    category: 'llm-agents',
    name: 'KEGG-LLM-Agent',
    subtitle: 'Biomedical Knowledge Base Agent',
    description:
      'Tool-using LLM agent for structured querying, pathway traversal, and question answering over the KEGG biomedical knowledge graph.',
    stack: ['Python', 'LLM Agent', 'Biomedical KG'],
    repoUrl: 'https://github.com/hajigul/KEGG_LLM_Agent',
  },
  {
    id: 'oss-scholar-agent',
    category: 'llm-agents',
    name: 'Scholar-Agent Related-Work Drafter & AI-Assistant',
    subtitle: 'Earlier Standalone Agent Prototypes',
    description:
      'Standalone literature drafting agent (now integrated into ResearchDesk) alongside a modular Python AI-Assistant prototype.',
    stack: ['Python', 'Tool-Using Agent', 'NLP'],
    repoUrl: 'https://github.com/hajigul/Scholar_Agent-Related-Work-Drafter-',
    relatedRepos: [
      { label: 'Scholar-Agent', url: 'https://github.com/hajigul/Scholar-Agent' },
      { label: 'AI-Assistant', url: 'https://github.com/hajigul/AI-Assistant' },
    ],
  },
  {
    id: 'oss-alzheimer',
    category: 'chatbots-slms',
    name: 'Alzheimer-Disease-Chatbot',
    subtitle: 'Clinical Information RAG Assistant',
    description:
      'Domain-specific retrieval-augmented conversational assistant grounded in curated clinical resources for Alzheimer’s disease.',
    stack: ['Python', 'RAG', 'Conversational AI'],
    repoUrl: 'https://github.com/hajigul/Alzheimer-Chatbot',
  },
  {
    id: 'oss-saft-moa',
    category: 'chatbots-slms',
    name: 'SAFT-MoA',
    subtitle: 'Supervised Adaptive Fine-Tuning · Mixture-of-Agents',
    description:
      'Mixture-of-Agents synthesis pipeline combining supervised adaptive fine-tuning with collaborative multi-model critique.',
    stack: ['Python', 'MoA', 'Fine-Tuning'],
    repoUrl: 'https://github.com/hajigul/SAFT-MoA',
  },
  {
    id: 'oss-slm-practice',
    category: 'chatbots-slms',
    name: 'Small Language Models in Practice (v1 & v2)',
    subtitle: 'Lightweight Domain Adaptation',
    description:
      'Benchmarking and domain adaptation workflows for compact small language models deployed on resource-constrained hardware.',
    stack: ['Jupyter Notebook', 'SLMs', 'Quantization'],
    repoUrl: 'https://github.com/hajigul/Small_Language_Models_in_Practice',
    relatedRepos: [
      { label: 'Practice v2', url: 'https://github.com/hajigul/Small_LLM_in_Practice_v2' },
      {
        label: 'Lightweight Efficient AI',
        url: 'https://github.com/hajigul/Light-Weight-Domain-Specific-Small-Language-Models-Efficient-AI',
      },
    ],
  },
  {
    id: 'oss-semantic-search',
    category: 'chatbots-slms',
    name: 'Semantic Search Engine',
    subtitle: 'Dense Vector Retrieval',
    description:
      'Sentence-Transformer-based dense semantic search engine over local document collections.',
    stack: ['Python', 'SentenceTransformers', 'Embeddings'],
    repoUrl: 'https://github.com/hajigul/Semantic-Search-Engine',
  },
  {
    id: 'oss-cardiorisk',
    category: 'biomedical-ml',
    name: 'CardioRisk-NN',
    subtitle: 'UCI Cleveland 81.97% Test Acc (61 patients) · Multi-Tab Gradio Dashboard · Educational Use Only',
    description:
      'Heart-disease risk prediction using a regularized TensorFlow/Keras feed-forward neural network achieving 81.97% test accuracy on 61 held-out UCI Cleveland patients, served via a multi-tab Gradio dashboard (single & batch prediction, risk gauge, key-driver chart). Educational use only.',
    stack: ['TensorFlow / Keras', 'Gradio', 'UCI Cleveland'],
    repoUrl: 'https://github.com/hajigul/heart-disease-risk-predictor-heartguard-ai',
    featured: true,
  },
  {
    id: 'oss-heart-dl-ml',
    category: 'biomedical-ml',
    name: 'Heart-Disease-Using-DL-ML',
    subtitle: 'Clinical Benchmark Comparison',
    description:
      'Systematic comparison of deep neural networks and classical tabular classifiers for clinical heart-disease prediction.',
    stack: ['Python', 'scikit-learn', 'Deep Learning'],
    repoUrl: 'https://github.com/hajigul/Heart_Disease-Using-DL_ML',
  },
  {
    id: 'oss-arrhythmia',
    category: 'biomedical-ml',
    name: 'Arrhythmia-Classification-Using-Machine-Learning',
    subtitle: 'ECG Cardiac Classification',
    description:
      'Multi-class machine learning pipeline classifying cardiac arrhythmias from clinical ECG features in the UCI Arrhythmia dataset.',
    stack: ['Jupyter Notebook', 'scikit-learn', 'Clinical ECG'],
    repoUrl: 'https://github.com/hajigul/Arrhythmia-Classification-Using-Machine-Learning-Models',
  },
  {
    id: 'oss-judicial',
    category: 'applied-projects',
    name: 'Judicial-Behaviour-Prediction',
    subtitle: 'Legal Analytics',
    description: 'Applied machine learning modeling for judicial decision outcome prediction from structured case attributes.',
    stack: ['Python', 'ML', 'Legal Data'],
    repoUrl: 'https://github.com/hajigul/Judicial_Behaviour_Prediction',
  },
  {
    id: 'oss-website-mon',
    category: 'applied-projects',
    name: 'Website-Monitoring',
    subtitle: 'Reconnaissance, Security & SEO Notebook',
    description:
      'Lightweight Python tool collecting technical, security, and content telemetry about any website for reconnaissance, SEO checks, competitor analysis, or domain due diligence.',
    stack: ['Python', 'Jupyter Notebook', 'Reconnaissance'],
    repoUrl: 'https://github.com/hajigul/website_mobitoring.',
  },
  {
    id: 'oss-node-cone',
    category: 'applied-projects',
    name: 'Node-Cone & Complex Network Notebooks',
    subtitle: 'Complex-Network Analysis & MATLAB Code',
    description:
      'Complex-network analysis notebooks, literature citation clustering visualizations, and MATLAB structural link-prediction scripts.',
    stack: ['Jupyter Notebook', 'NetworkX', 'MATLAB'],
    repoUrl: 'https://github.com/hajigul/Literature_Graph',
    relatedRepos: [
      { label: 'Efficient-LP-Method (MATLAB)', url: 'https://github.com/hajigul/Efficient-LP-Method' },
      { label: 'hajigul Repositories', url: 'https://github.com/hajigul?tab=repositories' },
    ],
  },
  {
    id: 'oss-courses',
    category: 'teaching-code',
    name: 'ML Course, LLM-for-Starters & CS4305 Intro to AI (v1 & v2)',
    subtitle: 'Open Undergraduate Course Repositories',
    description:
      'Open-source lecture notebooks, PyTorch labs, and foundations of AI & Knowledge Graph Completion materials prepared for undergraduate instruction.',
    stack: ['Python', 'Jupyter Notebook', 'Teaching'],
    repoUrl: 'https://github.com/hajigul/CS4305-Introduction-to-AI_-version-2-',
    relatedRepos: [
      { label: 'CS4305 v1', url: 'https://github.com/hajigul/CS4305_Introduction_to_AI' },
      { label: 'Machine-Learning-Course', url: 'https://github.com/hajigul/Machine-Learning-Course' },
      { label: 'LLM-for-Starters', url: 'https://github.com/hajigul/LLM-for-Starters' },
      {
        label: 'KGC Foundations Notes',
        url: 'https://github.com/hajigul/Knowledge-Graph-Completion-From-Foundations-to-Advanced-Methods',
      },
    ],
  },
  {
    id: 'oss-ss2202',
    category: 'teaching-code',
    name: 'SS 2202 Class Algorithms (AdaptiveBotsLab)',
    subtitle: 'Universiti Brunei Darussalam TA Materials',
    description:
      'Hands-on Jupyter notebooks and lab exercises for the Data Structures and Algorithms course assisted at Universiti Brunei Darussalam.',
    stack: ['Jupyter Notebook', 'Data Structures', 'Algorithms'],
    repoUrl: 'https://github.com/AdaptiveBotsLab/SS_2202_Class_Algos',
  },
];

