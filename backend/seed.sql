-- ============================================================
-- HAJI GUL PORTFOLIO - INITIAL SEED DATA
-- Run after schema.sql in Supabase SQL Editor
-- ============================================================

-- 1. SEED PROFILE
INSERT INTO public.portfolio_profile (
  id, name, title, affiliation, fellowship_title, fellowship_institution,
  summary, photo_url, photo_caption, email_academic, email_personal,
  phone, location, scopus_id, citations, h_index, i10_index,
  publications_count, videos_count, link_scholar, link_scopus,
  link_linkedin, link_youtube, link_github, link_orcid, cv_url
) VALUES (
  'primary',
  'Haji Gul',
  'PhD Researcher in Artificial Intelligence',
  'School of Digital Science, Universiti Brunei Darussalam',
  'DAAD AInet Short-Term Fellow in Natural Language Processing',
  'Leuphana University, Germany',
  'Advancing Knowledge Graph Completion, Complex Network Link Prediction, and Large Language Models at the School of Digital Science, Universiti Brunei Darussalam.',
  '/assets/portfolio/Haji_gul_33eec388.webp',
  'Research Collaboration · DAAD AInet Fellowship Cohort, Germany',
  '23h1710@ubd.edu.bn',
  'hajigul1993@gmail.com',
  '+92-307-8297663',
  'School of Digital Science, Universiti Brunei Darussalam, Jalan Tungku Link, Gadong BE1410, Brunei Darussalam',
  '57218363906',
  376,
  10,
  11,
  32,
  219,
  'https://scholar.google.com/citations?user=WqmzWogAAAAJ&hl=en',
  'https://www.scopus.com/authid/detail.uri?authorId=57218363906',
  'https://www.linkedin.com/in/haji-gul-658502120/',
  'https://www.youtube.com/@hajigul5733',
  'https://github.com/hajigul',
  'https://orcid.org/0000-0002-2227-6564',
  '/Haji_Gul_CV.pdf'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  title = EXCLUDED.title,
  affiliation = EXCLUDED.affiliation,
  citations = EXCLUDED.citations,
  h_index = EXCLUDED.h_index,
  i10_index = EXCLUDED.i10_index,
  publications_count = EXCLUDED.publications_count,
  videos_count = EXCLUDED.videos_count,
  updated_at = NOW();

-- 2. SEED PUBLICATIONS
INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-01',
  1,
  'MuCo-KGC: Multi-Context-Aware Knowledge Graph Completion',
  'Haji Gul, Ajaz Ahmad Bhat, Abdul Ghani Naim',
  'PAKDD 2025',
  'Springer (Pacific-Asia Conference on Knowledge Discovery and Data Mining)',
  2025,
  13,
  'kg-llm',
  'Knowledge Graphs & LLMs',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Introduces a multi-context serialization framework for Knowledge Graph Completion that captures entity descriptions, local subgraph neighborhoods, and relational paths without expensive negative triplet sampling.',
  '@inproceedings{gul2025mucokgc,
  title={MuCo-KGC: Multi-Context-Aware Knowledge Graph Completion},
  author={Gul, Haji and Bhat, Ajaz Ahmad and Naim, Abdul Ghani},
  booktitle={Pacific-Asia Conference on Knowledge Discovery and Data Mining (PAKDD)},
  year={2025},
  publisher={Springer}
}',
  TRUE,
  '/assets/diagrams/pub-01.png',
  'Fig. 1. MuCo-KGC multi-context serialization and negative-sampling-free BERT completion pipeline (PAKDD 2025).',
  NULL,
  '["Eliminates stochastic negative sampling bottlenecks during transformer fine-tuning.","Integrates structural neighborhood cues alongside textual entity semantics."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-02',
  2,
  'MuCoS: Multi-context-aware sampling for drug-target prediction',
  'Haji Gul, Ajaz Ahmad Bhat, Abdul Ghani Naim',
  'BioNLP @ ACL 2025',
  'Association for Computational Linguistics',
  2025,
  1,
  'healthcare-cps',
  'Healthcare, GNNs & Cyber-Physical AI',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'MuCoS: Multi-context-aware sampling for drug-target prediction (BioNLP@ACL 2025). Also mirrored at AdaptiveBotsLab. Applies multi-context-aware sampling over biomedical knowledge graphs (KEGG50k and PharmKG-8k) to accelerate and improve accuracy in drug-target interaction prediction.',
  '@inproceedings{gul2025mucos,
  title={MuCoS: Multi-context-aware sampling for drug-target prediction},
  author={Gul, Haji and Bhat, Ajaz Ahmad and Naim, Abdul Ghani},
  booktitle={Proceedings of the BioNLP Workshop at ACL},
  note={Also mirrored at AdaptiveBotsLab},
  year={2025}
}',
  TRUE,
  '/assets/diagrams/pub-02.png',
  'Fig. 1. MuCoS multi-context-aware biomedical subgraph sampling for drug-target prediction (BioNLP @ ACL 2025).',
  NULL,
  '["BioNLP @ ACL 2025 — also mirrored at AdaptiveBotsLab.","Evaluated on biomedical benchmarks KEGG50k and PharmKG-8k.","Balances local biological pathway density with language model representations."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-03',
  3,
  'When Metrics Disagree: A Meta-Analysis of Knowledge-Graph-Completion Model Benchmarking',
  'Haji Gul, Ajaz Ahmad Bhat, Abdul Ghani Naim',
  'arXiv Preprint',
  'arXiv',
  2026,
  0,
  'kg-llm',
  'Knowledge Graphs & LLMs',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Conducts a comprehensive meta-analysis across standard KGC benchmarks demonstrating why MRR, Hits@1, Hits@3, and Hits@10 often produce conflicting model rankings and proposes unified evaluation protocols.',
  '@article{gul2026whenmetrics,
  title={When Metrics Disagree: A Meta-Analysis of Knowledge-Graph-Completion Model Benchmarking},
  author={Gul, Haji and Bhat, Ajaz Ahmad and Naim, Abdul Ghani},
  journal={arXiv preprint},
  year={2026}
}',
  TRUE,
  '/assets/diagrams/pub-03.png',
  'Fig. 1. Rank divergence meta-analysis across MRR and Hits@K metrics with unified concordance protocol.',
  NULL,
  '["Quantifies rank divergence across translational, tensor, and LLM-based KGC models.","Includes reproducible benchmarking notebooks on GitHub (When-Metrics-Disagree)."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-04',
  4,
  'KG-EDAS: A Meta-Metric Framework for Evaluating Knowledge Graph Completion Models',
  'Haji Gul, Ajaz Ahmad Bhat, Abdul Ghani Naim',
  'IEEE BigData 2025',
  'IEEE',
  2025,
  2,
  'kg-llm',
  'Knowledge Graphs & LLMs',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Proposes KG-EDAS, an Evaluation Based on Distance from Average Solution (EDAS) meta-metric that synthesizes MRR, Hits@1/3/10, and computational efficiency into a single domain-consistent score.',
  '@inproceedings{gul2025kgedas,
  title={KG-EDAS: A Meta-Metric Framework for Evaluating Knowledge Graph Completion Models},
  author={Gul, Haji and Bhat, Ajaz Ahmad and Naim, Abdul Ghani},
  booktitle={IEEE International Conference on Big Data (BigData)},
  year={2025},
  organization={IEEE}
}',
  TRUE,
  '/assets/diagrams/pub-04.png',
  'Fig. 1. KG-EDAS distance-from-average-solution meta-metric pipeline (IEEE BigData 2025).',
  NULL,
  '["Resolves single-metric bias when ranking KGC architectures.","Supports weighted criteria tailored to latency-critical or recall-critical tasks."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-05',
  5,
  'Evaluating Knowledge Graph Complexity via Semantic, Spectral, and Structural Metrics for Link Prediction',
  'Haji Gul, Ajaz Ahmad Bhat, Abdul Ghani Naim',
  'IEEE BigData 2025',
  'IEEE',
  2025,
  1,
  'kg-llm',
  'Knowledge Graphs & LLMs',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Investigates intrinsic knowledge graph difficulty prior to model training by combining Laplacian spectral characteristics, relational entropy, and local structural density.',
  '@inproceedings{gul2025complexity,
  title={Evaluating Knowledge Graph Complexity via Semantic, Spectral, and Structural Metrics for Link Prediction},
  author={Gul, Haji and Bhat, Ajaz Ahmad and Naim, Abdul Ghani},
  booktitle={IEEE International Conference on Big Data (BigData)},
  year={2025},
  organization={IEEE}
}',
  TRUE,
  '/assets/diagrams/pub-05.png',
  'Fig. 1. Semantic, spectral Laplacian, and structural complexity framework correlated with link prediction AUC.',
  NULL,
  '["Correlates pre-training graph complexity scores with downstream link prediction accuracy.","Bridges spectral graph theory and semantic relation diversity."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-06',
  6,
  'Evaluating Cumulative Spectral Gradient as a Complexity Measure',
  'Haji Gul, Ajaz Ahmad Bhat, Abdul Ghani Naim',
  'MusIML @ ICML 2025',
  'ICML Workshop on Multimodal & Structured Learning',
  2025,
  0,
  'kg-llm',
  'Knowledge Graphs & LLMs',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Adapts and rigorously evaluates the Cumulative Spectral Gradient (CSG) as a tractable measure of separability and structural complexity across graph and multimodal embedding spaces.',
  '@inproceedings{gul2025csg,
  title={Evaluating Cumulative Spectral Gradient as a Complexity Measure},
  author={Gul, Haji and Bhat, Ajaz Ahmad and Naim, Abdul Ghani},
  booktitle={MusIML Workshop at International Conference on Machine Learning (ICML)},
  year={2025}
}',
  TRUE,
  '/assets/diagrams/pub-06.png',
  'Fig. 1. Cumulative Spectral Gradient (CSG) Laplacian eigenvalue decay diagnostic (MusIML @ ICML 2025).',
  NULL,
  '["Analyzes eigenvalue decay profiles across sparse and dense graphs.","Provides fast diagnostic complexity bounds without full training sweeps."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-07',
  7,
  'Domain-Aware Evaluation of Knowledge Graph Completion Models Using KG-EDAS',
  'Haji Gul, Ajaz Ahmad Bhat, Abdul Ghani Naim',
  'GCLR @ AAAI 2025',
  'AAAI Workshop on Graph-Centric Learning & Reasoning',
  2025,
  0,
  'kg-llm',
  'Knowledge Graphs & LLMs',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Demonstrates domain-aware criteria weighting within KG-EDAS across commonsense, encyclopedic, and biomedical knowledge graphs to guide model selection for practitioners.',
  '@inproceedings{gul2025domainaware,
  title={Domain-Aware Evaluation of Knowledge Graph Completion Models Using KG-EDAS},
  author={Gul, Haji and Bhat, Ajaz Ahmad and Naim, Abdul Ghani},
  booktitle={GCLR Workshop at AAAI Conference on Artificial Intelligence},
  year={2025}
}',
  TRUE,
  '/assets/diagrams/pub-07.png',
  'Fig. 1. Domain-calibrated KG-EDAS criteria weighting across encyclopedic, lexical, and biomedical graphs.',
  NULL,
  '["Benchmarks diverse KGC model families across FB15k-237, WN18RR, and biomedical graphs.","Produces domain-calibrated evaluation profiles."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-08',
  8,
  'A Contextualized BERT Model for Knowledge Graph Completion',
  'Haji Gul, Abdul Ghani Naim, Ajaz Ahmad Bhat',
  'MusIML @ NeurIPS 2024',
  'NeurIPS Workshop',
  2024,
  4,
  'kg-llm',
  'Knowledge Graphs & LLMs',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Presents a contextualized BERT encoding pipeline that injects multi-hop relational neighbors directly into masked language model representations for link prediction.',
  '@inproceedings{gul2024contextualized,
  title={A Contextualized BERT Model for Knowledge Graph Completion},
  author={Gul, Haji and Naim, Abdul Ghani and Bhat, Ajaz Ahmad},
  booktitle={MusIML Workshop at Advances in Neural Information Processing Systems (NeurIPS)},
  year={2024}
}',
  TRUE,
  '/assets/diagrams/pub-08.png',
  'Fig. 1. Contextualized BERT architecture injecting multi-hop relational neighbors (MusIML @ NeurIPS 2024).',
  NULL,
  '["Captures rich contextual semantics around sparse entities.","Outperforms standard text-only triple classifiers on WN18RR and FB15k-237."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-09',
  9,
  'DualRep: Knowledge Graph Completion by Utilizing Dual Representation of Relational Paths and Tail Node Density Insights',
  'Haji Gul, Abdul Ghani Naim, Ajaz Ahmad Bhat',
  'IEEE Access',
  'IEEE',
  2024,
  0,
  'kg-llm',
  'Knowledge Graphs & LLMs',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Proposes DualRep, uniting sequence-encoded relational paths with tail-node topological density insights to eliminate negative triplet sampling and resolve long-tail entity ambiguity.',
  '@article{gul2024dualrep,
  title={DualRep: Knowledge Graph Completion by Utilizing Dual Representation of Relational Paths and Tail Node Density Insights},
  author={Gul, Haji and Naim, Abdul Ghani and Bhat, Ajaz Ahmad},
  journal={IEEE Access},
  year={2024},
  publisher={IEEE}
}',
  TRUE,
  '/assets/diagrams/pub-09.png',
  'Fig. 1. DualRep dual-stream fusion of relational paths and tail-node density insights (IEEE Access 2024).',
  NULL,
  '["Dual representation fuses structural degree signals with semantic path embeddings.","Significantly improves Hits@1 on low-degree tail entities."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-10',
  10,
  'A Systematic Literature Review on Transparency and Interpretability of AI Models in Healthcare',
  'Haji Gul, et al.',
  'Health and Technology',
  'Springer',
  2026,
  22,
  'healthcare-cps',
  'Healthcare, GNNs & Cyber-Physical AI',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Synthesizes clinical AI interpretability frameworks, post-hoc attribution methods, and regulatory transparency criteria required for trustworthy diagnostic deployment.',
  '@article{gul2026transparency,
  title={A Systematic Literature Review on Transparency and Interpretability of AI Models in Healthcare},
  author={Gul, Haji and others},
  journal={Health and Technology},
  year={2026},
  publisher={Springer}
}',
  TRUE,
  '/assets/diagrams/pub-10.png',
  'Fig. 1. Clinical AI interpretability taxonomy spanning intrinsic, post-hoc XAI, and regulatory audits.',
  NULL,
  '["Maps explainability taxonomies across imaging, EHR, and biomedical graph models.","Identifies open verification gaps in clinical decision support."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-11',
  11,
  'Artificial Intelligence for Secure and Sustainable Industrial Control Systems: A Survey',
  'Haji Gul, et al.',
  'Artificial Intelligence Review',
  'Springer Nature',
  2025,
  48,
  'healthcare-cps',
  'Healthcare, GNNs & Cyber-Physical AI',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Surveys machine learning, graph-based anomaly detection, and resilient control strategies for safeguarding Industrial Control Systems against cyber-physical intrusions.',
  '@article{gul2025aisecureics,
  title={Artificial Intelligence for Secure and Sustainable Industrial Control Systems: A Survey},
  author={Gul, Haji and others},
  journal={Artificial Intelligence Review},
  year={2025},
  publisher={Springer}
}',
  TRUE,
  '/assets/diagrams/pub-11.png',
  'Fig. 1. AI-driven intrusion detection and resilient control architecture for sustainable ICS.',
  NULL,
  '["Categorizes anomaly detection architectures across SCADA and OT networks.","Links cyber resilience with energy-sustainable industrial operations."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-12',
  12,
  'Intelligent Transportation Systems: A Critical Review of Integration of Cyber-Physical Systems (CPS) and Industry 4.0',
  'Haji Gul, et al.',
  'Digital Communications and Networks',
  'Elsevier',
  2025,
  40,
  'healthcare-cps',
  'Healthcare, GNNs & Cyber-Physical AI',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Critically examines the convergence of Cyber-Physical Systems, V2X telemetry, and Industry 4.0 graph analytics in modern intelligent transportation infrastructure.',
  '@article{gul2025its,
  title={Intelligent Transportation Systems: A Critical Review of Integration of Cyber-Physical Systems (CPS) and Industry 4.0},
  author={Gul, Haji and others},
  journal={Digital Communications and Networks},
  year={2025},
  publisher={Elsevier}
}',
  TRUE,
  '/assets/diagrams/pub-12.png',
  'Fig. 1. Three-tier convergence of physical V2X sensors, edge intelligence, and Industry 4.0 analytics.',
  NULL,
  '["Evaluates latency, edge intelligence, and safety verification in CPS.","Outlines open architectural challenges for autonomous transit grids."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-13',
  13,
  'Advancing Fake News Detection with Graph Neural Network and Deep Learning',
  'Haji Gul, et al.',
  'Journal of Physics: Complexity',
  'IOP Publishing',
  2025,
  15,
  'healthcare-cps',
  'Healthcare, GNNs & Cyber-Physical AI',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Combines propagation-tree Graph Neural Networks with contextual text encoders to detect misinformation cascades early in social network diffusion.',
  '@article{gul2025fakenews,
  title={Advancing Fake News Detection with Graph Neural Network and Deep Learning},
  author={Gul, Haji and others},
  journal={Journal of Physics: Complexity},
  year={2025},
  publisher={IOP Publishing}
}',
  TRUE,
  '/assets/diagrams/pub-13.png',
  'Fig. 1. Propagation-tree GNN combined with linguistic stance encoding for early fake news detection.',
  NULL,
  '["Models structural virality alongside linguistic stance cues.","Improves early-stage fake news detection before wide cascade spread."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-14',
  14,
  'Link Prediction Using Node Information on Local Paths',
  'Furqan Aziz, Haji Gul, Imran Muhammad, et al.',
  'Physica A: Statistical Mechanics and its Applications',
  'Elsevier',
  2020,
  63,
  'link-prediction',
  'Link Prediction & Complex Networks',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Formulates an enhanced local-path link prediction index that weights intermediate node degree and neighborhood information along length-2 and length-3 paths.',
  '@article{aziz2020localpaths,
  title={Link Prediction Using Node Information on Local Paths},
  author={Aziz, Furqan and Gul, Haji and Muhammad, Imran and others},
  journal={Physica A: Statistical Mechanics and its Applications},
  volume={557},
  pages={124980},
  year={2020},
  publisher={Elsevier}
}',
  TRUE,
  '/physica_local_paths_diagram.png',
  'Fig. 1. Proposed Similarity Index — F. Aziz, H. Gul, I. Muhammad et al. / Physica A 557 (2020) 124980',
  NULL,
  '["Validated across biological, social, and technological complex networks.","Achieves superior AUC over classical Common Neighbors and Katz baselines."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-15',
  15,
  'Path-Based Extensions of Local Link Prediction Methods for Complex Networks',
  'Haji Gul, Adnan Amin, et al.',
  'Scientific Reports',
  'Nature Portfolio',
  2020,
  58,
  'link-prediction',
  'Link Prediction & Complex Networks',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Extends classical local similarity indices (Jaccard, Adamic-Adar, Resource Allocation) with multi-hop path weighting to capture mesoscopic network structure.',
  '@article{gul2020pathbased,
  title={Path-Based Extensions of Local Link Prediction Methods for Complex Networks},
  author={Gul, Haji and Amin, Adnan and others},
  journal={Scientific Reports},
  volume={10},
  year={2020},
  publisher={Nature Publishing Group}
}',
  TRUE,
  '/scientific_reports_figure1.jpg',
  'Figure 1: Benchmark AUC evaluation across 12 complex networks (Karate, Dolphins, E. coli, Yeast, etc.) — Path-based extensions of local link prediction methods for complex networks (Scientific Reports)',
  NULL,
  '["Published in Nature Scientific Reports with high empirical benchmark coverage.","Tested on Yeast PPI, C. elegans, E. coli, Karate, and Dolphins networks."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-16',
  16,
  'A Systematic Analysis of Link Prediction in Complex Network',
  'Haji Gul, et al.',
  'IEEE Access',
  'IEEE',
  2021,
  28,
  'link-prediction',
  'Link Prediction & Complex Networks',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Presents a systematic taxonomy and comparative experimental evaluation of local, quasi-local, global, and embedding-based link prediction algorithms.',
  '@article{gul2021systematiclp,
  title={A Systematic Analysis of Link Prediction in Complex Network},
  author={Gul, Haji and others},
  journal={IEEE Access},
  year={2021},
  publisher={IEEE}
}',
  TRUE,
  '/assets/diagrams/pub-16.png',
  'Fig. 1. Taxonomy of local, quasi-local, global, and embedding link prediction with runtime-AUC trade-offs.',
  NULL,
  '["Benchmarks structural similarity indices across 12 real-world network topologies.","Provides runtime-accuracy trade-off curves for large sparse graphs."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-17',
  17,
  'A Systematic Analysis of Community Detection in Complex Networks',
  'Haji Gul, et al.',
  'Procedia Computer Science',
  'Elsevier',
  2022,
  18,
  'link-prediction',
  'Link Prediction & Complex Networks',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Reviews modularity optimization, label propagation, spectral clustering, and overlapping community detection methodologies across social and biological graphs.',
  '@article{gul2022community,
  title={A Systematic Analysis of Community Detection in Complex Networks},
  author={Gul, Haji and others},
  journal={Procedia Computer Science},
  year={2022},
  publisher={Elsevier}
}',
  TRUE,
  '/assets/diagrams/pub-17.png',
  'Fig. 1. Comparative community detection paradigms and modularity/NMI evaluation framework.',
  NULL,
  '["Compares normalized mutual information (NMI) and modularity scores.","Highlights resolution-limit caveats in hierarchical networks."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-18',
  18,
  'Analyzing Complex Networks: Extracting Key Characteristics and Measuring Structural Similarities',
  'Haji Gul, et al.',
  'Expert Systems',
  'Wiley',
  2024,
  10,
  'link-prediction',
  'Link Prediction & Complex Networks',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Extracts global and local topological invariants—clustering coefficients, assortativity, centrality distributions—to measure structural similarity across heterogeneous networks.',
  '@article{gul2024analyzing,
  title={Analyzing Complex Networks: Extracting Key Characteristics and Measuring Structural Similarities},
  author={Gul, Haji and others},
  journal={Expert Systems},
  year={2024},
  publisher={Wiley}
}',
  TRUE,
  '/assets/diagrams/pub-18.png',
  'Fig. 1. Topological invariant fingerprint extraction and cross-domain structural similarity matrix.',
  NULL,
  '["Establishes quantitative fingerprints for cross-domain network comparison.","Supports domain transfer for link prediction heuristics."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-19',
  19,
  'Link Prediction Using Double Degree Equation with Mutual and Popular Nodes',
  'Haji Gul, et al.',
  'WorldCIST 2021',
  'Springer',
  2021,
  11,
  'link-prediction',
  'Link Prediction & Complex Networks',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Introduces a double-degree formulation accounting for both mutual common neighbors and high-centrality hub nodes to refine edge likelihood estimation.',
  '@inproceedings{gul2021doubledegree,
  title={Link Prediction Using Double Degree Equation with Mutual and Popular Nodes},
  author={Gul, Haji and others},
  booktitle={World Conference on Information Systems and Technologies (WorldCIST)},
  year={2021},
  publisher={Springer}
}',
  TRUE,
  '/assets/diagrams/pub-19.png',
  'Fig. 1. Double-degree formulation balancing mutual common neighbors and popular hub bias.',
  NULL,
  '["Reduces degree-bias distortion in scale-free networks.","Fast O(k^2) local computation compatible with streaming graphs."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-20',
  20,
  'Efficient Link Prediction Model for Real-World Complex Networks Using Matrix-Forest Metric with Local Similarity Features',
  'Haji Gul, et al.',
  'Journal of Complex Networks',
  'Oxford University Press',
  2022,
  8,
  'link-prediction',
  'Link Prediction & Complex Networks',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Combines the algebraic Matrix-Forest index with localized neighborhood similarity features to deliver high-precision link inference in sparse real-world networks.',
  '@article{gul2022matrixforest,
  title={Efficient Link Prediction Model for Real-World Complex Networks Using Matrix-Forest Metric with Local Similarity Features},
  author={Gul, Haji and others},
  journal={Journal of Complex Networks},
  year={2022},
  publisher={Oxford University Press}
}',
  TRUE,
  '/assets/diagrams/pub-20.png',
  'Fig. 1. Hybrid algebraic Matrix-Forest index and localized neighborhood similarity pipeline.',
  NULL,
  '["Published in Oxford Journal of Complex Networks.","Balances global spanning-forest topology with local clustering."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-21',
  21,
  'Hill Climbing-Based Efficient Model for Link Prediction in Undirected Graphs',
  'Haji Gul, et al.',
  'Mathematics',
  'MDPI',
  2022,
  8,
  'link-prediction',
  'Link Prediction & Complex Networks',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Formulates an adaptive hill-climbing optimization strategy that tunes hybrid topological feature weights for link prediction in undirected graphs.',
  '@article{gul2022hillclimbing,
  title={Hill Climbing-Based Efficient Model for Link Prediction in Undirected Graphs},
  author={Gul, Haji and others},
  journal={Mathematics},
  year={2022},
  publisher={MDPI}
}',
  TRUE,
  '/assets/diagrams/pub-21.png',
  'Fig. 1. Adaptive hill-climbing weight optimization over hybrid topological similarity features.',
  NULL,
  '["Automatically adapts feature importance per network topology.","MATLAB optimization scripts & benchmark datasets available on GitHub."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-22',
  22,
  'Enhancing Link Prediction Efficiency with Shortest Path and Structural Attributes',
  'Haji Gul, et al.',
  'Intelligent Data Analysis',
  'IOS Press',
  2024,
  6,
  'link-prediction',
  'Link Prediction & Complex Networks',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Integrates bounded shortest-path distances with local structural attributes to reduce computational overhead while preserving predictive fidelity in large networks.',
  '@article{gul2024shortestpath,
  title={Enhancing Link Prediction Efficiency with Shortest Path and Structural Attributes},
  author={Gul, Haji and others},
  journal={Intelligent Data Analysis},
  year={2024},
  publisher={IOS Press}
}',
  TRUE,
  '/assets/diagrams/pub-22.png',
  'Fig. 1. Bounded k-hop shortest-path pruning with local structural attributes for sparse graphs.',
  NULL,
  '["Avoids full all-pairs shortest path recomputation.","Validated across sparse collaboration and citation graphs."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-23',
  23,
  'Leveraging Natural Language Processing for Enhanced Text Analysis in Business Intelligence',
  'Haji Gul, et al.',
  'IGI Global',
  'IGI Global',
  2024,
  5,
  'kg-llm',
  'Knowledge Graphs & LLMs',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Examines applied NLP pipelines, named entity extraction, and semantic clustering for turning unstructured enterprise corpora into structured business intelligence.',
  '@incollection{gul2024nlpbi,
  title={Leveraging Natural Language Processing for Enhanced Text Analysis in Business Intelligence},
  author={Gul, Haji and others},
  booktitle={IGI Global Research Anthology},
  year={2024},
  publisher={IGI Global}
}',
  TRUE,
  '/assets/diagrams/pub-23.png',
  'Fig. 1. Applied NLP, entity linking, and transformer embedding pipeline for business intelligence.',
  NULL,
  '["Covers entity linking, topic modeling, and decision-support dashboards.","Bridges classical NLP pipelines with modern transformer embeddings."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-24',
  24,
  'Forecasting Networks Links with Laplace Characteristic and Geographical Information in Complex Networks',
  'Haji Gul, et al.',
  'Procedia Computer Science',
  'Elsevier',
  2023,
  4,
  'link-prediction',
  'Link Prediction & Complex Networks',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Fuses graph Laplacian spectral characteristics with spatial/geographical node coordinates to forecast future connections in spatially embedded networks.',
  '@article{gul2023laplacegeo,
  title={Forecasting Networks Links with Laplace Characteristic and Geographical Information in Complex Networks},
  author={Gul, Haji and others},
  journal={Procedia Computer Science},
  year={2023},
  publisher={Elsevier}
}',
  TRUE,
  '/assets/diagrams/pub-24.png',
  'Fig. 1. Spatial-spectral link forecasting fusing Laplacian eigenfeatures with geographical proximity.',
  NULL,
  '["Demonstrates synergy between spectral embeddings and spatial proximity.","Applicable to transit, infrastructure, and regional social graphs."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-25',
  25,
  'Real-World Protein Particle Network Reconstruction Based on Advanced Hybrid Features',
  'Haji Gul, et al.',
  'ICITS 2022',
  'Springer',
  2022,
  4,
  'healthcare-cps',
  'Healthcare, GNNs & Cyber-Physical AI',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Reconstructs missing interactions in biological protein-protein interaction networks by combining topological hybrid features with structural motif scores.',
  '@inproceedings{gul2022protein,
  title={Real-World Protein Particle Network Reconstruction Based on Advanced Hybrid Features},
  author={Gul, Haji and others},
  booktitle={International Conference on Information Technology & Systems (ICITS)},
  year={2022},
  publisher={Springer}
}',
  TRUE,
  '/assets/diagrams/pub-25.png',
  'Fig. 1. Hybrid topological and motif-based biological protein interaction network reconstruction.',
  NULL,
  '["Evaluated on Yeast and biological protein particle interaction datasets.","Improves recall on noisy experimental PPI measurements."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-26',
  26,
  'Comparative Analysis of Machine Learning Algorithms for Author Age and Gender Identification',
  'Haji Gul, et al.',
  'ICITS 2023',
  'Springer',
  2023,
  4,
  'kg-llm',
  'Knowledge Graphs & LLMs',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Benchmarks stylometric features and supervised machine learning classifiers for automated author profiling across multi-genre text collections.',
  '@inproceedings{gul2023author,
  title={Comparative Analysis of Machine Learning Algorithms for Author Age and Gender Identification},
  author={Gul, Haji and others},
  booktitle={International Conference on Information Technology & Systems (ICITS)},
  year={2023},
  publisher={Springer}
}',
  TRUE,
  '/assets/diagrams/pub-26.png',
  'Fig. 1. Stylometric feature extraction and supervised ML classifier suite for author profiling.',
  NULL,
  '["Compares lexical, syntactic, and n-gram representations.","Evaluates cross-domain robustness of demographic profiling models."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-27',
  27,
  'Features Extraction and Structure Similarities Measurement of Complex Networks',
  'Haji Gul, et al.',
  'LNNS 2024',
  'Springer (Lecture Notes in Networks and Systems)',
  2024,
  0,
  'link-prediction',
  'Link Prediction & Complex Networks',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Presents an algorithmic pipeline for extracting structural graph descriptors and computing cross-network similarity matrices across biological and social datasets.',
  '@incollection{gul2024lnns,
  title={Features Extraction and Structure Similarities Measurement of Complex Networks},
  author={Gul, Haji and others},
  booktitle={Lecture Notes in Networks and Systems (LNNS)},
  year={2024},
  publisher={Springer}
}',
  TRUE,
  '/assets/diagrams/pub-27.png',
  'Fig. 1. Standardized graph descriptor pipeline and pairwise similarity clustering across domains.',
  NULL,
  '["Standardizes degree distribution, diameter, and clustering descriptors.","Enables systematic clustering of complex network families."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-28',
  28,
  'Link Prediction in Human Complex Network Based on Random Walk with Global Topological Features',
  'Haji Gul, et al.',
  'iTDAF 2023',
  'IEEE',
  2023,
  0,
  'link-prediction',
  'Link Prediction & Complex Networks',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Integrates biased random-walk transition probabilities with global topological invariants to predict latent ties in human interaction networks.',
  '@inproceedings{gul2023randomwalk,
  title={Link Prediction in Human Complex Network Based on Random Walk with Global Topological Features},
  author={Gul, Haji and others},
  booktitle={International Conference on Technological Advancements (iTDAF)},
  year={2023}
}',
  TRUE,
  '/assets/diagrams/pub-28.png',
  'Fig. 1. Biased random walk combined with global centrality priors for human network link prediction.',
  NULL,
  '["Balances local random-walk exploration with global centrality priors.","Reduces cold-start errors on peripheral nodes."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-29',
  29,
  'Big Data Analytics in Bioinformatics and Healthcare',
  'Haji Gul, et al.',
  'Studies in Big Data',
  'Springer',
  2025,
  1,
  'healthcare-cps',
  'Healthcare, GNNs & Cyber-Physical AI',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Explores scalable graph analytics, genomic sequence mining, and knowledge-graph-assisted clinical data integration for modern precision medicine.',
  '@incollection{gul2025bioinformatics,
  title={Big Data Analytics in Bioinformatics and Healthcare},
  author={Gul, Haji and others},
  booktitle={Studies in Big Data},
  year={2025},
  publisher={Springer}
}',
  TRUE,
  '/assets/diagrams/pub-29.png',
  'Fig. 1. Scalable genomic and multi-omics knowledge graph analytics platform for precision medicine.',
  NULL,
  '["Covers multi-omics data fusion and scalable graph storage.","Connects network medicine methods with clinical analytics."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-30',
  30,
  'Cyber Security in Cyber Physical Systems: Challenges and Opportunities',
  'Haji Gul, et al.',
  'IGI Global',
  'IGI Global',
  2025,
  1,
  'healthcare-cps',
  'Healthcare, GNNs & Cyber-Physical AI',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Analyzes attack surfaces, threat modeling, and AI-enabled intrusion detection mechanisms across interconnected Cyber-Physical Systems.',
  '@incollection{gul2025cpssecurity,
  title={Cyber Security in Cyber Physical Systems: Challenges and Opportunities},
  author={Gul, Haji and others},
  booktitle={IGI Global},
  year={2025},
  publisher={IGI Global}
}',
  TRUE,
  '/assets/diagrams/pub-30.png',
  'Fig. 1. Sensor-to-cloud CPS attack surface mapping and graph-aware AI intrusion defense.',
  NULL,
  '["Maps sensor-to-cloud vulnerabilities in critical infrastructure.","Proposes graph-aware anomaly detection directions."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-31',
  31,
  'Governance, Policy Frameworks & Achieving Sustainable Healthcare Systems in Africa',
  'Haji Gul, et al.',
  'CRC Press',
  'Taylor & Francis / CRC Press',
  2025,
  0,
  'healthcare-cps',
  'Healthcare, GNNs & Cyber-Physical AI',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Examines digital health governance, data interoperability standards, and AI-supported healthcare resource allocation frameworks for sustainable health systems.',
  '@incollection{gul2025governance,
  title={Governance, Policy Frameworks & Achieving Sustainable Healthcare Systems in Africa},
  author={Gul, Haji and others},
  booktitle={CRC Press},
  year={2025},
  publisher={CRC Press}
}',
  TRUE,
  '/assets/diagrams/pub-31.png',
  'Fig. 1. Digital health governance, FHIR interoperability, and AI resource allocation framework.',
  NULL,
  '["Integrates technology governance with equitable health infrastructure.","Highlights responsible AI deployment policies."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();

INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  'pub-32',
  32,
  'Comparative Analysis of Link Prediction in Complex Networks',
  'Haji Gul, et al.',
  'IJTD 2021',
  'International Journal of Technology Diffusion',
  2021,
  1,
  'link-prediction',
  'Link Prediction & Complex Networks',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Evaluates classical local similarity indices across benchmark social, neuronal, and biological networks under controlled edge-removal protocols.',
  '@article{gul2021ijtd,
  title={Comparative Analysis of Link Prediction in Complex Networks},
  author={Gul, Haji and others},
  journal={International Journal of Technology Diffusion (IJTD)},
  year={2021}
}',
  TRUE,
  '/assets/diagrams/pub-32.png',
  'Fig. 1. Controlled edge-removal evaluation of classical local link prediction baselines.',
  NULL,
  '["Compares precision and AUC across multiple train/test edge splits.","Establishes baseline performance curves for sparse graphs."]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();


-- 3. SEED EXPERIENCE TIMELINE
INSERT INTO public.portfolio_experience (
  id, role, institution, department, location, period, type, description, highlights, order_num
) VALUES (
  'exp-cusit-current',
  'Lecturer in Computer Science',
  'City University of Science and Information Technology (CUSIT)',
  '',
  'Peshawar, Pakistan',
  'September 2026 – Present',
  'academic',
  'Faculty appointment teaching undergraduate computing courses and mentoring final-year engineering projects.',
  '["Teaching undergraduate computer science courses.","Supervising final-year projects (FYPs)."]'::jsonb,
  1
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_experience (
  id, role, institution, department, location, period, type, description, highlights, order_num
) VALUES (
  'exp-daad',
  'DAAD AInet Short-Term Fellowship — Natural Language Processing',
  'German Academic Exchange Service (DAAD) · Leuphana University',
  '',
  'Germany',
  '2025 – Present',
  'academic',
  'Selective early-career fellowship awarded by the German Academic Exchange Service; ongoing research collaboration with Leuphana University.',
  '["Collaborating on neuro-symbolic NLP, structured knowledge representation, and LLM evaluation.","Engaging with the international DAAD AInet Postdoc-NeT-AI cohort in Germany."]'::jsonb,
  2
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_experience (
  id, role, institution, department, location, period, type, description, highlights, order_num
) VALUES (
  'exp-ubd-ta',
  'Teaching Assistant — Data Structures and Algorithms',
  'School of Digital Science, Universiti Brunei Darussalam',
  '',
  'Brunei Darussalam',
  '2024 – 2026',
  'academic',
  'Academic teaching assistantship guiding foundational computer science laboratory sessions, tutorials, and algorithmic problem solving.',
  '["Assisted in delivering tutorials, coding exercises, assignments and practical sessions.","Guided students in understanding core concepts of algorithms and data structures.","Supported course assessments and student learning activities."]'::jsonb,
  3
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_experience (
  id, role, institution, department, location, period, type, description, highlights, order_num
) VALUES (
  'exp-seria-robotics',
  'Robotics Trainer & Project Supervisor',
  'Seriya Energy Lab',
  '',
  'Brunei',
  '2024 (3 Months)',
  'academic',
  'Three-month robotics mentorship and hands-on STEM project guidance for student engineering cohorts.',
  '["Conducted hands-on training sessions in robotics fundamentals.","Supervised 3 student groups through introductory robotics projects.","Mentored students in problem-solving, teamwork, and technical documentation."]'::jsonb,
  4
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_experience (
  id, role, institution, department, location, period, type, description, highlights, order_num
) VALUES (
  'exp-cusit-senior',
  'Senior Lecturer & Member of FYPs Committee',
  'City University of Science and Information Technology (CUSIT)',
  '',
  'Peshawar, Pakistan',
  'Sep 2019 – Aug 2023',
  'academic',
  'Four years of full-time academic instruction, graduate thesis co-supervision, undergraduate final-year project mentorship, and departmental governance.',
  '["Teaching Courses (BS Level).","Supervising Final-Year Projects (FYPs).","Member of Departmental FYPs Committee."]'::jsonb,
  5
)
ON CONFLICT (id) DO NOTHING;


-- 4. SEED EDUCATION TIMELINE
INSERT INTO public.portfolio_education (
  id, degree, field, institution, location, period, description, highlights, order_num
) VALUES (
  'edu-phd',
  'Ph.D., Artificial Intelligence',
  'Ph.D., Artificial Intelligence',
  'School of Digital Science, Universiti Brunei Darussalam (UBD)',
  'Brunei Darussalam',
  '2023 – 2026 (expected)',
  'Thesis: Advancing Knowledge Graph Completion Through Domain-Aware Evaluation, Complexity Analysis, and Contextual Learning',
  '["Advisors: Dr. Ajaz Ahmad Bhat and Dr. Abdul Ghani Naim","Status: Thesis submitted, defence expected, November-2026","Developing negative-sampling-free Knowledge Graph Completion architectures (MuCo-KGC, MuCoS, DualRep) and KG-EDAS evaluation frameworks."]'::jsonb,
  1
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_education (
  id, degree, field, institution, location, period, description, highlights, order_num
) VALUES (
  'edu-ms',
  'M.S., Computer Science',
  'M.S., Computer Science',
  'Center for Excellence in Information Technology, Institute of Management Sciences, Peshawar',
  'Pakistan',
  '2017 – 2019',
  'Thesis: Link Prediction Using Node Information on Local Paths (Supervisor: Dr. Furqan Aziz)',
  '["Investigated topological heuristics, local path structures, and node similarity metrics for link prediction in complex networks.","Research outputs published in peer-reviewed journals including Nature Scientific Reports, Physica A, and IEEE Access."]'::jsonb,
  2
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_education (
  id, degree, field, institution, location, period, description, highlights, order_num
) VALUES (
  'edu-msc',
  'M.Sc., Computer Science',
  'M.Sc., Computer Science',
  'Center for Excellence in Information Technology, Institute of Management Sciences, Peshawar',
  'Pakistan',
  '2014 – 2016',
  'Final project: Internet Download Application (Java, NetBeans IDE)',
  '["Engineered a multi-threaded desktop download application with segmented parallel downloading and socket stream handling in Java.","Rigorous graduate coursework covering Advanced Database Systems, Design & Analysis of Algorithms, and Software Engineering."]'::jsonb,
  3
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_education (
  id, degree, field, institution, location, period, description, highlights, order_num
) VALUES (
  'edu-bsc',
  'B.Sc. (Computer Science)',
  'B.Sc. (Computer Science)',
  'Government Superior Science College Peshawar (University of Peshawar)',
  'Pakistan',
  '2011 – 2013',
  'Undergraduate studies in Computer Science and Applied Mathematics under the University of Peshawar.',
  '["Comprehensive foundation in Object-Oriented Programming (C/C++), Data Structures, Database Fundamentals, and Calculus."]'::jsonb,
  4
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_education (
  id, degree, field, institution, location, period, description, highlights, order_num
) VALUES (
  'edu-hssc',
  'Higher Secondary School Certificate (HSSC)',
  'Higher Secondary School Certificate (HSSC)',
  'Lamar Degree College Peshawar (BISE Peshawar)',
  'Pakistan',
  '2011',
  'Intermediate science qualification certified by the Board of Intermediate and Secondary Education (BISE) Peshawar.',
  '["Specialized in Computer Science, Mathematics, and Physics with high academic distinction."]'::jsonb,
  5
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_education (
  id, degree, field, institution, location, period, description, highlights, order_num
) VALUES (
  'edu-ssc',
  'Secondary School Certificate (SSC)',
  'Secondary School Certificate (SSC)',
  'Government Technical Higher Secondary School, Gulbahar no.2, (BISE Peshawar)',
  'Pakistan',
  '2009',
  'Matriculation with Science & Technical Education foundation certified by BISE Peshawar.',
  '["Rigorous foundational education in Mathematics, Science, and Technical Engineering Principles."]'::jsonb,
  6
)
ON CONFLICT (id) DO NOTHING;


-- 5. SEED VIDEO LECTURES
INSERT INTO public.portfolio_lectures (
  id, title, course_code, platform, video_count, duration, thumbnail_url, playlist_url, description, order_num
) VALUES (
  'lec-graph-theory',
  'Graph Theory — Complete Course (Basics to Advanced)',
  'University-Level Series',
  'YouTube',
  0,
  'Full YouTube Playlist',
  '/assets/portfolio/Graph_theory_playlist_564fcae5.jpg',
  'https://youtube.com/playlist?list=PL2XfVVRsHmflOiiSfNcLUJmBROVrx0-zL&si=vRUoeNmYFAbqPxwD',
  'Step-by-step course covering graph fundamentals, adjacency matrices, paths, connectivity, spanning trees, and network algorithms.',
  1
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_lectures (
  id, title, course_code, platform, video_count, duration, thumbnail_url, playlist_url, description, order_num
) VALUES (
  'lec-matlab-physics',
  'MATLAB Course for Computational Physics — Basics of MATLAB',
  'Scientific Computing',
  'YouTube',
  0,
  'Full YouTube Playlist',
  '/assets/portfolio/Matlab_computational_physics_playlist_97bd9db1.jpg',
  'https://youtube.com/playlist?list=PL2XfVVRsHmfklGeEtud6g6QlxzZ9I0We3&si=ky0TLBaBhEvUKLap',
  'Beginner-friendly hands-on MATLAB course for matrices, differential equations, numerical plotting, and computational physics simulations.',
  2
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_lectures (
  id, title, course_code, platform, video_count, duration, thumbnail_url, playlist_url, description, order_num
) VALUES (
  'lec-dsa-cpp',
  'Data Structures Full Course in C++',
  'Complete Learning Series',
  'YouTube',
  0,
  'Full YouTube Playlist',
  '/assets/portfolio/Data_structure_and_algorithm_playlist_5311cc60.jpg',
  'https://youtube.com/playlist?list=PL2XfVVRsHmfko6A14ZL1bYlPSZ3eU7Xo_&si=ASPIY1-FnvwkDJiT',
  'Comprehensive C++ walkthroughs of arrays, linked lists, stacks, queues, trees, graphs, sorting, and algorithmic flow analysis.',
  3
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_lectures (
  id, title, course_code, platform, video_count, duration, thumbnail_url, playlist_url, description, order_num
) VALUES (
  'lec-cpp-beginners',
  'C++ Tutorial for Beginners — Full Course',
  'Programming Foundations',
  'YouTube',
  0,
  'Full YouTube Playlist',
  '/assets/portfolio/Cpp_programming_playlist_13517e0a.jpg',
  'https://youtube.com/playlist?list=PL2XfVVRsHmfn-6GcIwz3_oFMYqkvxlHR6&si=XxqKRob06BnUyWu-',
  'Zero-to-hero introduction to C++ syntax, control flow, functions, pointers, arrays, and object-oriented programming.',
  4
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_lectures (
  id, title, course_code, platform, video_count, duration, thumbnail_url, playlist_url, description, order_num
) VALUES (
  'lec-coreldraw',
  'CorelDRAW — Full Course Beginners to Advanced (2020)',
  'Graphic Design Masterclass',
  'YouTube',
  0,
  'Full YouTube Playlist',
  '/assets/portfolio/Corel_draw_playlist_88c1c672.jpg',
  'https://youtube.com/playlist?list=PL2XfVVRsHmfkMLV_8AFX6X6EqjwhPX9BC&si=5DbUChZkiGieXEKJ',
  'Vector illustration, Bézier curves, typography, branding layouts, and print-ready artwork mastery from scratch to advanced workflows.',
  5
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_lectures (
  id, title, course_code, platform, video_count, duration, thumbnail_url, playlist_url, description, order_num
) VALUES (
  'lec-photoshop-cs6',
  'Adobe Photoshop CS6 Tutorial for Beginners',
  'Digital Imaging Course',
  'YouTube',
  0,
  'Full YouTube Playlist',
  '/assets/portfolio/photoshop_playlist_c1db97a9.jpg',
  'https://youtube.com/playlist?list=PL2XfVVRsHmfkX1vDzIc24coC5frghwsTB&si=8LzDuciory8jH8UI',
  'Learn layers, masking, color grading, curves adjustments, photo retouching, and creative compositing from the ground up.',
  6
)
ON CONFLICT (id) DO NOTHING;


-- 6. SEED RESEARCH PILLARS
INSERT INTO public.portfolio_research_pillars (
  id, number, title, subtitle, description, "focusModels", "filterCategory", order_num
) VALUES (
  'pillar-kg',
  '01',
  'Multi-Context KG Reasoning',
  'MuCo-KGC · MuCoS · DualRep',
  'Eliminating negative triplet sampling overhead by serializing local neighborhood density, relational paths, and structural context directly into pre-trained transformer encoders.',
  '["BERT Encoding","Negative-Sampling-Free","Relational Paths"]'::jsonb,
  'kg-llm',
  1
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_research_pillars (
  id, number, title, subtitle, description, "focusModels", "filterCategory", order_num
) VALUES (
  'pillar-spectral',
  '02',
  'Spectral Complexity & Meta-Metrics',
  'KG-EDAS · Cumulative Spectral Gradient',
  'Quantifying intrinsic graph difficulty via Laplacian eigenvalues and multi-criteria decision analysis (EDAS) to reconcile ranking disagreements across MRR and Hits@K benchmarks.',
  '["Laplacian Spectrum","EDAS Ranking","Metric Concordance"]'::jsonb,
  'kg-llm',
  2
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_research_pillars (
  id, number, title, subtitle, description, "focusModels", "filterCategory", order_num
) VALUES (
  'pillar-networks',
  '03',
  'Biomedical, Social & Cyber-Physical Networks',
  'Drug-Target · GNNs · ICS Security',
  'Translating topological link prediction and explainable deep graph learning into drug-target discovery (KEGG50k, PharmKG-8k), misinformation cascades, and Industrial Control System security.',
  '["KEGG50k / PharmKG-8k","Protein Networks","Explainable AI"]'::jsonb,
  'healthcare-cps',
  3
)
ON CONFLICT (id) DO NOTHING;


-- 7. SEED OPEN SOURCE PROJECTS
INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-mucos',
  'MuCoS',
  'BioNLP @ ACL 2025 · Mirrored at AdaptiveBotsLab',
  'proposed-methods',
  'Multi-context-aware sampling framework for drug-target discovery over biomedical knowledge graphs (KEGG50k & PharmKG-8k).',
  '["Python","PyTorch","Transformers","BioNLP"]'::jsonb,
  'https://github.com/hajigul/MuCoS_KGC-Efficient-Drug-Target-Discovery-via-Multi-Context-Aware-Sampling-in-Knowledge-Graphs',
  'https://github.com/AdaptiveBotsLab/MuCoS-Efficient-Drug-Target-Discovery-via-Multi-Context-Aware-Sampling-in-Knowledge-Graphs',
  '',
  1
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-cab-kgc',
  'CAB-KGC',
  'MusIML @ NeurIPS 2024',
  'proposed-methods',
  'Contextualized BERT model for knowledge graph completion injecting multi-hop structural context around sparse entities.',
  '["Python","BERT","KGC"]'::jsonb,
  'https://github.com/hajigul/Revised_KG-BERT_Relation_Prediction_Implementation-',
  '',
  'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:aqlVkmm33-oC',
  2
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-murok',
  'MuRoK',
  'NeurIPS 2026 Workshop',
  'proposed-methods',
  'Multi-level routing architecture for scalable knowledge graph retrieval across heterogeneous relational neighborhoods.',
  '["Python","KG Retrieval","Routing"]'::jsonb,
  'https://github.com/hajigul/MuRoK',
  '',
  'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:M05iB0D1s5AC',
  3
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-when-metrics',
  'When-Metrics-Disagree',
  'Meta-Analysis of KGC Benchmarking · Notebooks',
  'proposed-methods',
  'Reproducible notebooks quantifying rank divergence across MRR and Hits@K evaluation protocols; also referenced with AdaptiveBotsLab.',
  '["Jupyter Notebook","Python","Meta-Analysis"]'::jsonb,
  'https://github.com/hajigul/When-Metrics-Disagree',
  '',
  '',
  4
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-kg-edas',
  'KG-EDAS & Evaluation Suite',
  'IEEE BigData 2025 · AAAI GCLR Workshop',
  'proposed-methods',
  'Meta-metric evaluation framework based on Distance from Average Solution (EDAS) plus Domain-Aware KG-EDAS, KD-EDAS, and EDAS repositories.',
  '["Python","MCDA / EDAS","KGC Eval"]'::jsonb,
  'https://github.com/hajigul/KG-EDAS-IEEE_BigData',
  '',
  '',
  5
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-csg',
  'Cumulative Spectral Gradient (CSG) Complexity',
  'MusIML @ ICML 2025 · IEEE BigData 2025',
  'proposed-methods',
  'Spectral and structural complexity measurement suite for knowledge graph benchmarks, spanning CSG, Semantic-Spectral-Structural metrics, KGC-CSG, and AdaptiveBotsLab E-CSG.',
  '["Python","Jupyter","Laplacian Spectrum"]'::jsonb,
  'https://github.com/hajigul/Evaluating-Cumulative-Spectral-Gradient-as-a-Complexity-Measure',
  '',
  '',
  6
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-no-free-lunch',
  'No-Free-Lunch-KGC',
  'Benchmark Study Notebooks',
  'proposed-methods',
  'Empirical notebooks studying dataset-dependent model trade-offs across knowledge graph completion benchmarks.',
  '["Jupyter Notebook","Benchmarking"]'::jsonb,
  'https://github.com/hajigul/No_Free_Lunch_KGC',
  '',
  '',
  7
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-reimpl-bert',
  'KG-BERT & ShallowBKGC (Revised Reimplementations)',
  'Corrected Reproducible Baselines',
  'baselines',
  'Independent, bug-fixed PyTorch reimplementations of published KGC baselines enabling fair head-to-head and tail-prediction comparisons.',
  '["Python","PyTorch","BERT"]'::jsonb,
  'https://github.com/hajigul/Revised_KG-BERT_Relation_Prediction_Implementation-',
  '',
  '',
  8
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-sota-harness',
  'KGC-Embedding-SOTA & Tail Prediction Harness',
  'Unified Evaluation Harness',
  'baselines',
  'Standardized training and evaluation harness for running state-of-the-art KGE baselines on full and tail-only link prediction splits.',
  '["Python","KGE","PyTorch"]'::jsonb,
  'https://github.com/hajigul/KGC_Embedding_SOTA',
  '',
  '',
  9
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-gnn-rel',
  'GNN-Based Relation Prediction & Informed GNN',
  'GCN · GAT · GraphSAGE',
  'baselines',
  'Graph Neural Network architectures engineered for relation prediction and structure-informed completion over multi-relational graphs.',
  '["Python","PyTorch","GNNs"]'::jsonb,
  'https://github.com/hajigul/GNN_Based_Relation_Prediction',
  '',
  '',
  10
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-researchdesk',
  'ResearchDesk',
  'Private Local AI Research Assistant · Ollama + 13-Case Eval Suite',
  'llm-agents',
  'Runs locally on small models via Ollama so sensitive documents stay on-device. Features 4 integrated tools: (i) Discover (verified paper cards from arXiv/OpenAlex via fast rules or LLM agent + 13-case eval suite), (ii) Related Work (cited paragraph grounded strictly in real arXiv metadata so the model never hallucinates references), (iii) Citation Check (verifies citations against OpenAlex & arXiv), and (iv) Q&A (RAG over private PDFs using local embeddings with clickable page citations).',
  '["Python","Ollama","nomic-embed-text","arXiv & OpenAlex APIs"]'::jsonb,
  'https://github.com/hajigul/ResearchDest',
  '',
  '',
  11
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-gram',
  'GRAM',
  'Graph-Augmented Retrieval & Reasoning',
  'llm-agents',
  'Python framework coupling structured graph traversal with retrieval-augmented generation for grounded multi-hop reasoning.',
  '["Python","Graph RAG","LLM"]'::jsonb,
  'https://github.com/hajigul/GRAM',
  '',
  '',
  12
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-kegg-agent',
  'KEGG-LLM-Agent',
  'Biomedical Knowledge Base Agent',
  'llm-agents',
  'Tool-using LLM agent for structured querying, pathway traversal, and question answering over the KEGG biomedical knowledge graph.',
  '["Python","LLM Agent","Biomedical KG"]'::jsonb,
  'https://github.com/hajigul/KEGG_LLM_Agent',
  '',
  '',
  13
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-scholar-agent',
  'Scholar-Agent Related-Work Drafter & AI-Assistant',
  'Earlier Standalone Agent Prototypes',
  'llm-agents',
  'Standalone literature drafting agent (now integrated into ResearchDesk) alongside a modular Python AI-Assistant prototype.',
  '["Python","Tool-Using Agent","NLP"]'::jsonb,
  'https://github.com/hajigul/Scholar_Agent-Related-Work-Drafter-',
  '',
  '',
  14
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-alzheimer',
  'Alzheimer-Disease-Chatbot',
  'Clinical Information RAG Assistant',
  'chatbots-slms',
  'Domain-specific retrieval-augmented conversational assistant grounded in curated clinical resources for Alzheimer’s disease.',
  '["Python","RAG","Conversational AI"]'::jsonb,
  'https://github.com/hajigul/Alzheimer-Chatbot',
  '',
  '',
  15
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-saft-moa',
  'SAFT-MoA',
  'Supervised Adaptive Fine-Tuning · Mixture-of-Agents',
  'chatbots-slms',
  'Mixture-of-Agents synthesis pipeline combining supervised adaptive fine-tuning with collaborative multi-model critique.',
  '["Python","MoA","Fine-Tuning"]'::jsonb,
  'https://github.com/hajigul/SAFT-MoA',
  '',
  '',
  16
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-slm-practice',
  'Small Language Models in Practice (v1 & v2)',
  'Lightweight Domain Adaptation',
  'chatbots-slms',
  'Benchmarking and domain adaptation workflows for compact small language models deployed on resource-constrained hardware.',
  '["Jupyter Notebook","SLMs","Quantization"]'::jsonb,
  'https://github.com/hajigul/Small_Language_Models_in_Practice',
  '',
  '',
  17
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-semantic-search',
  'Semantic Search Engine',
  'Dense Vector Retrieval',
  'chatbots-slms',
  'Sentence-Transformer-based dense semantic search engine over local document collections.',
  '["Python","SentenceTransformers","Embeddings"]'::jsonb,
  'https://github.com/hajigul/Semantic-Search-Engine',
  '',
  '',
  18
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-cardiorisk',
  'CardioRisk-NN',
  'UCI Cleveland 81.97% Test Acc (61 patients) · Multi-Tab Gradio Dashboard · Educational Use Only',
  'biomedical-ml',
  'Heart-disease risk prediction using a regularized TensorFlow/Keras feed-forward neural network achieving 81.97% test accuracy on 61 held-out UCI Cleveland patients, served via a multi-tab Gradio dashboard (single & batch prediction, risk gauge, key-driver chart). Educational use only.',
  '["TensorFlow / Keras","Gradio","UCI Cleveland"]'::jsonb,
  'https://github.com/hajigul/heart-disease-risk-predictor-heartguard-ai',
  '',
  '',
  19
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-heart-dl-ml',
  'Heart-Disease-Using-DL-ML',
  'Clinical Benchmark Comparison',
  'biomedical-ml',
  'Systematic comparison of deep neural networks and classical tabular classifiers for clinical heart-disease prediction.',
  '["Python","scikit-learn","Deep Learning"]'::jsonb,
  'https://github.com/hajigul/Heart_Disease-Using-DL_ML',
  '',
  '',
  20
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-arrhythmia',
  'Arrhythmia-Classification-Using-Machine-Learning',
  'ECG Cardiac Classification',
  'biomedical-ml',
  'Multi-class machine learning pipeline classifying cardiac arrhythmias from clinical ECG features in the UCI Arrhythmia dataset.',
  '["Jupyter Notebook","scikit-learn","Clinical ECG"]'::jsonb,
  'https://github.com/hajigul/Arrhythmia-Classification-Using-Machine-Learning-Models',
  '',
  '',
  21
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-judicial',
  'Judicial-Behaviour-Prediction',
  'Legal Analytics',
  'applied-projects',
  'Applied machine learning modeling for judicial decision outcome prediction from structured case attributes.',
  '["Python","ML","Legal Data"]'::jsonb,
  'https://github.com/hajigul/Judicial_Behaviour_Prediction',
  '',
  '',
  22
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-website-mon',
  'Website-Monitoring',
  'Reconnaissance, Security & SEO Notebook',
  'applied-projects',
  'Lightweight Python tool collecting technical, security, and content telemetry about any website for reconnaissance, SEO checks, competitor analysis, or domain due diligence.',
  '["Python","Jupyter Notebook","Reconnaissance"]'::jsonb,
  'https://github.com/hajigul/website_mobitoring.',
  '',
  '',
  23
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-node-cone',
  'Node-Cone & Complex Network Notebooks',
  'Complex-Network Analysis & MATLAB Code',
  'applied-projects',
  'Complex-network analysis notebooks, literature citation clustering visualizations, and MATLAB structural link-prediction scripts.',
  '["Jupyter Notebook","NetworkX","MATLAB"]'::jsonb,
  'https://github.com/hajigul/Literature_Graph',
  '',
  '',
  24
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-courses',
  'ML Course, LLM-for-Starters & CS4305 Intro to AI (v1 & v2)',
  'Open Undergraduate Course Repositories',
  'teaching-code',
  'Open-source lecture notebooks, PyTorch labs, and foundations of AI & Knowledge Graph Completion materials prepared for undergraduate instruction.',
  '["Python","Jupyter Notebook","Teaching"]'::jsonb,
  'https://github.com/hajigul/CS4305-Introduction-to-AI_-version-2-',
  '',
  '',
  25
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  'oss-ss2202',
  'SS 2202 Class Algorithms (AdaptiveBotsLab)',
  'Universiti Brunei Darussalam TA Materials',
  'teaching-code',
  'Hands-on Jupyter notebooks and lab exercises for the Data Structures and Algorithms course assisted at Universiti Brunei Darussalam.',
  '["Jupyter Notebook","Data Structures","Algorithms"]'::jsonb,
  'https://github.com/AdaptiveBotsLab/SS_2202_Class_Algos',
  '',
  '',
  26
)
ON CONFLICT (id) DO NOTHING;


-- 8. SEED HONORS & SERVICE
INSERT INTO public.portfolio_honors (
  id, year, title, issuer, description, "linkLabel", "linkUrl", order_num
) VALUES (
  'honor-daad',
  '2025 – Present',
  'DAAD AInet Short-Term Fellowship — Natural Language Processing, Germany',
  'German Academic Exchange Service (DAAD) · Leuphana University',
  'Selective early-career fellowship awarded by the German Academic Exchange Service; ongoing research collaboration with Leuphana University.',
  'Fellow profile',
  'https://www.daad.de/en/the-daad/postdocnet-ai/',
  1
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_honors (
  id, year, title, issuer, description, "linkLabel", "linkUrl", order_num
) VALUES (
  'honor-ugrs',
  '2023 – Present',
  'University Graduate Research Scholarship (UGRS)',
  'Universiti Brunei Darussalam (UBD)',
  'Fully funded PhD scholarship, Universiti Brunei Darussalam, supporting doctoral investigations into Knowledge Graph Completion, Graph Complexity, and Large Language Models.',
  '',
  '',
  2
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_honors (
  id, year, title, issuer, description, "linkLabel", "linkUrl", order_num
) VALUES (
  'honor-conferences',
  '2024 – 2025',
  'Top-Tier AI Conference & Workshop Presenter',
  'NeurIPS · ICML · ACL · AAAI · PAKDD · IEEE BigData',
  'Authored and presented peer-reviewed research across MusIML (NeurIPS/ICML), BioNLP (ACL), GCLR (AAAI), PAKDD, and IEEE BigData.',
  '',
  '',
  3
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_honors (
  id, year, title, issuer, description, "linkLabel", "linkUrl", order_num
) VALUES (
  'honor-reviewer',
  'Ongoing',
  'Peer Reviewer & Academic Service',
  'AI, Complex Networks & Knowledge Engineering Venues',
  'Active technical reviewer evaluating manuscripts on Graph Neural Networks, Knowledge Graphs, Link Prediction, and Explainable AI.',
  '',
  '',
  4
)
ON CONFLICT (id) DO NOTHING;


-- 9. SEED CERTIFICATIONS
INSERT INTO public.portfolio_certifications (
  id, title, issuer, "issuedDate", "credentialId", "verificationUrl", skills, order_num
) VALUES (
  'cert-robot-localization',
  'Robot Localization with Python and Particle Filters',
  'Coursera',
  'March 2025',
  'RH9A1IEZDEDI',
  'https://coursera.org/verify/RH9A1IEZDEDI',
  '[]'::jsonb,
  1
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_certifications (
  id, title, issuer, "issuedDate", "credentialId", "verificationUrl", skills, order_num
) VALUES (
  'cert-rag-agents',
  'Fundamentals of AI Agents Using RAG and LangChain',
  'IBM',
  'February 2025',
  '4G5ORTWK63S3',
  'https://coursera.org/verify/4G5ORTWK63S3',
  '[]'::jsonb,
  2
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_certifications (
  id, title, issuer, "issuedDate", "credentialId", "verificationUrl", skills, order_num
) VALUES (
  'cert-gen-ai',
  'Introduction to Generative AI',
  'Google Cloud Skills Boost',
  'January 2025',
  '3BI8MK3YVT9A',
  'https://coursera.org/verify/3BI8MK3YVT9A',
  '[]'::jsonb,
  3
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_certifications (
  id, title, issuer, "issuedDate", "credentialId", "verificationUrl", skills, order_num
) VALUES (
  'cert-sequence-models',
  'Sequence Models',
  'DeepLearning.AI',
  'December 2023',
  'HAP2PJ2D93DG',
  'https://coursera.org/verify/HAP2PJ2D93DG',
  '[]'::jsonb,
  4
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_certifications (
  id, title, issuer, "issuedDate", "credentialId", "verificationUrl", skills, order_num
) VALUES (
  'cert-structuring-ml',
  'Structuring Machine Learning Projects',
  'DeepLearning.AI',
  'November 2023',
  'U862UXYU5U5M',
  'https://coursera.org/verify/U862UXYU5U5M',
  '[]'::jsonb,
  5
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_certifications (
  id, title, issuer, "issuedDate", "credentialId", "verificationUrl", skills, order_num
) VALUES (
  'cert-nn-dl',
  'Neural Networks and Deep Learning',
  'DeepLearning.AI',
  'October 2023',
  'RYUPKP39ABP5',
  'https://coursera.org/verify/RYUPKP39ABP5',
  '[]'::jsonb,
  6
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_certifications (
  id, title, issuer, "issuedDate", "credentialId", "verificationUrl", skills, order_num
) VALUES (
  'cert-supervised-regression',
  'Supervised Machine Learning: Regression',
  'IBM',
  'October 2023',
  'ZTRVPVTSPZYA',
  'https://coursera.org/verify/ZTRVPVTSPZYA',
  '[]'::jsonb,
  7
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_certifications (
  id, title, issuer, "issuedDate", "credentialId", "verificationUrl", skills, order_num
) VALUES (
  'cert-supervised-classification',
  'Supervised Machine Learning: Classification',
  'IBM',
  'September 2023',
  'CDZ3FNTE66MS',
  'https://coursera.org/verify/CDZ3FNTE66MS',
  '[]'::jsonb,
  8
)
ON CONFLICT (id) DO NOTHING;

