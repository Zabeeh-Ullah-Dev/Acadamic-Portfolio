import { PUBLICATIONS } from '../data/portfolioData.js';

export const SKILL_DOMAINS = [
  {
    id: 'all',
    label: 'All Expertise',
    shortLabel: 'All',
    description: 'Complete 3D constellation across AI, Knowledge Graphs, GNNs, and Systems.',
  },
  {
    id: 'llms',
    label: 'LLMs & Transformers',
    shortLabel: 'LLMs',
    description: 'Pre-trained transformers, negative-sampling-free KGC, RAG, and agentic NLP.',
  },
  {
    id: 'gnns',
    label: 'GNNs & Graphs',
    shortLabel: 'GNNs',
    description: 'Graph Neural Networks, Knowledge Graph Completion, Link Prediction, and Spectral Complexity.',
  },
  {
    id: 'ml',
    label: 'ML & Deep Learning',
    shortLabel: 'ML / DL',
    description: 'Sequence modeling, meta-metric benchmarking (KG-EDAS), and explainable inference.',
  },
  {
    id: 'biomedical',
    label: 'Biomedical & CPS',
    shortLabel: 'Biomedical',
    description: 'Drug-target interaction discovery, clinical AI transparency, and ICS security.',
  },
  {
    id: 'engineering',
    label: 'Engineering',
    shortLabel: 'Tools',
    description: 'Scientific computing stacks, C++ algorithms, MATLAB, Python, and SQL pipelines.',
  },
];

export const SPHERE_PALETTES = [
  {
    id: 'cobalt',
    light: '#3B82F6',
    mid: '#1D4ED8',
    deep: '#0F2557',
    activeLight: '#60A5FA',
    activeMid: '#2563EB',
    activeDeep: '#1E3A8A',
    stroke: '#60A5FA',
    activeStroke: '#BFDBFE',
    rim: '#93C5FD',
    halo: '#60A5FA',
    textStroke: 'rgba(15, 37, 87, 0.85)',
  },
  {
    id: 'emerald',
    light: '#10B981',
    mid: '#047857',
    deep: '#022C22',
    activeLight: '#34D399',
    activeMid: '#059669',
    activeDeep: '#064E3B',
    stroke: '#34D399',
    activeStroke: '#A7F3D0',
    rim: '#6EE7B7',
    halo: '#34D399',
    textStroke: 'rgba(2, 44, 34, 0.88)',
  },
  {
    id: 'violet',
    light: '#8B5CF6',
    mid: '#6D28D9',
    deep: '#2E1065',
    activeLight: '#A78BFA',
    activeMid: '#7C3AED',
    activeDeep: '#4C1D95',
    stroke: '#A78BFA',
    activeStroke: '#DDD6FE',
    rim: '#C4B5FD',
    halo: '#A78BFA',
    textStroke: 'rgba(46, 16, 101, 0.88)',
  },
  {
    id: 'amber',
    light: '#F59E0B',
    mid: '#B45309',
    deep: '#451A03',
    activeLight: '#FBBF24',
    activeMid: '#D97706',
    activeDeep: '#78350F',
    stroke: '#FBBF24',
    activeStroke: '#FDE68A',
    rim: '#FCD34D',
    halo: '#FBBF24',
    textStroke: 'rgba(69, 26, 3, 0.9)',
  },
  {
    id: 'rose',
    light: '#F43F5E',
    mid: '#BE123C',
    deep: '#4C0519',
    activeLight: '#FB7185',
    activeMid: '#E11D48',
    activeDeep: '#881337',
    stroke: '#FB7185',
    activeStroke: '#FECDD3',
    rim: '#FDA4AF',
    halo: '#FB7185',
    textStroke: 'rgba(76, 5, 25, 0.88)',
  },
  {
    id: 'cerulean',
    light: '#0EA5E9',
    mid: '#0369A1',
    deep: '#082F49',
    activeLight: '#38BDF8',
    activeMid: '#0284C7',
    activeDeep: '#0C4A6E',
    stroke: '#38BDF8',
    activeStroke: '#BAE6FD',
    rim: '#7DD3FC',
    halo: '#38BDF8',
    textStroke: 'rgba(8, 47, 73, 0.88)',
  },
  {
    id: 'teal',
    light: '#14B8A6',
    mid: '#0F766E',
    deep: '#042F2E',
    activeLight: '#2DD4BF',
    activeMid: '#0D9488',
    activeDeep: '#134E4A',
    stroke: '#2DD4BF',
    activeStroke: '#99F6E4',
    rim: '#5EEAD4',
    halo: '#2DD4BF',
    textStroke: 'rgba(4, 47, 46, 0.88)',
  },
  {
    id: 'indigo',
    light: '#6366F1',
    mid: '#4338CA',
    deep: '#1E1B4B',
    activeLight: '#818CF8',
    activeMid: '#4F46E5',
    activeDeep: '#312E81',
    stroke: '#818CF8',
    activeStroke: '#C7D2FE',
    rim: '#A5B4FC',
    halo: '#818CF8',
    textStroke: 'rgba(30, 27, 75, 0.88)',
  },
];

export function getSkillPaletteByIndex(index) {
  return SPHERE_PALETTES[index % SPHERE_PALETTES.length];
}

// Interleaved round-robin order by domain so every domain spans all hemispheres evenly on the 3D sphere
export const SKILL_NODES = [
  {
    id: 'skill-llm',
    label: 'Large Language Models',
    lines: ['Large Language', 'Models'],
    shortLabel: 'LLMs',
    domain: 'llms',
    weight: 1.0,
    context: 'PhD @ UBD · DAAD AInet Fellowship',
    venues: 'PAKDD 2025 · ACL BioNLP · NeurIPS Workshop',
    description:
      'Leveraging pre-trained language models and serialization strategies to reason over structured entities and factual triples without costly negative sampling.',
    publicationCategory: 'kg-llm',
    publicationSearchTerm: 'Language Model',
  },
  {
    id: 'skill-gnns',
    label: 'Graph Neural Networks',
    lines: ['Graph Neural', 'Networks'],
    shortLabel: 'GNNs',
    domain: 'gnns',
    weight: 1.0,
    context: 'PhD Core Research · Complex Topology',
    venues: 'IEEE BigData · Artificial Intelligence Review',
    description:
      'Message-passing graph neural architectures for cascade forecasting, anomaly detection, and structural link inference.',
    publicationCategory: 'healthcare-cps',
    publicationSearchTerm: 'Graph Neural',
  },
  {
    id: 'skill-deep-learning',
    label: 'Deep Learning',
    lines: ['Deep', 'Learning'],
    shortLabel: 'Deep Learning',
    domain: 'ml',
    weight: 0.94,
    context: 'PhD & MSCS · DeepLearning.AI Specialization',
    venues: 'NeurIPS Workshop · IEEE Access',
    description:
      'End-to-end neural optimization, sequence architectures, and error-driven structured representation training.',
    publicationCategory: 'all',
    publicationSearchTerm: 'Deep Learning',
  },
  {
    id: 'skill-drug-target',
    label: 'Drug-Target Discovery',
    lines: ['Drug-Target', 'Discovery'],
    shortLabel: 'Drug-Target',
    domain: 'biomedical',
    weight: 0.92,
    context: 'BioNLP @ ACL 2025 · KEGG50k / PharmKG-8k',
    venues: 'ACL BioNLP 2025',
    description:
      'Multi-context biomedical knowledge graph sampling for accurate and fast drug-target interaction discovery.',
    publicationCategory: 'healthcare-cps',
    publicationSearchTerm: 'Drug-Target',
  },
  {
    id: 'skill-python',
    label: 'Python & Data Science',
    lines: ['Python &', 'Data Science'],
    shortLabel: 'Python',
    domain: 'engineering',
    weight: 0.94,
    context: 'PhD & MSCS · 10+ Open GitHub Codebases',
    venues: 'PyTorch · NetworkX · Scikit-Learn',
    description:
      'Primary experimentation and graph-analytics stack powering dataset curation, Spectral CSG, and KGC benchmarks.',
    publicationCategory: 'all',
    publicationSearchTerm: 'MuCo',
  },
  {
    id: 'skill-transformers',
    label: 'Transformers & BERT',
    lines: ['Transformers', '& BERT'],
    shortLabel: 'Transformers',
    domain: 'llms',
    weight: 0.96,
    context: 'MuCo-KGC · MuCoS · DualRep',
    venues: 'PAKDD 2025 · BioNLP @ ACL 2025',
    description:
      'Dual-representation and multi-context transformer encoders combining contextual entity text with neighborhood structure for Knowledge Graph Completion.',
    publicationCategory: 'kg-llm',
    publicationSearchTerm: 'BERT',
  },
  {
    id: 'skill-kgc',
    label: 'Knowledge Graph Completion',
    lines: ['KG', 'Completion'],
    shortLabel: 'KG Completion',
    domain: 'gnns',
    weight: 0.98,
    context: 'PhD Dissertation Core · UBD',
    venues: 'PAKDD 2025 · AAAI GCLR 2025 · arXiv',
    description:
      'Scalable link and tail-entity prediction architectures (MuCo-KGC, MuCoS, DualRep) eliminating negative triplet overhead.',
    publicationCategory: 'kg-llm',
    publicationSearchTerm: 'Knowledge Graph',
  },
  {
    id: 'skill-kg-edas',
    label: 'KG-EDAS Meta-Metrics',
    lines: ['KG-EDAS', 'Meta-Metrics'],
    shortLabel: 'KG-EDAS',
    domain: 'ml',
    weight: 0.9,
    context: 'IEEE BigData 2025 · AAAI GCLR 2025',
    venues: 'IEEE BigData · AAAI Workshop',
    description:
      'Multi-criteria EDAS benchmarking framework reconciling MRR, Hits@K, and efficiency disagreements across domains.',
    publicationCategory: 'kg-llm',
    publicationSearchTerm: 'KG-EDAS',
  },
  {
    id: 'skill-healthcare-ai',
    label: 'Healthcare & Medical AI',
    lines: ['Healthcare', 'AI'],
    shortLabel: 'Healthcare AI',
    domain: 'biomedical',
    weight: 0.86,
    context: 'Health & Tech 2026 · Medical Knowledge Graphs',
    venues: 'Springer · Medical Imaging & AI',
    description:
      'Interpretable diagnostic pipelines and biomedical relational synthesis spanning clinical datasets.',
    publicationCategory: 'healthcare-cps',
    publicationSearchTerm: 'Medical',
  },
  {
    id: 'skill-cpp-dsa',
    label: 'C++ & Graph Algorithms',
    lines: ['C++ &', 'Algorithms'],
    shortLabel: 'C++ / DSA',
    domain: 'engineering',
    weight: 0.82,
    context: 'University Lecturer · YouTube Playlist',
    venues: 'Data Structures & Algorithms Series',
    description:
      'High-efficiency adjacency matrix operations, shortest-path search, and algorithmic teaching playlists.',
    publicationCategory: 'link-prediction',
    publicationSearchTerm: 'Shortest',
  },
  {
    id: 'skill-rag-agents',
    label: 'RAG & AI Agents',
    lines: ['RAG &', 'AI Agents'],
    shortLabel: 'RAG / Agents',
    domain: 'llms',
    weight: 0.86,
    context: 'IBM RAG & LangChain Certified · Applied NLP',
    venues: 'LangChain · Agentic Workflows',
    description:
      'Designing retrieval-augmented pipelines that ground LLM reasoning in structured knowledge graphs and domain corpora.',
    publicationCategory: 'kg-llm',
    publicationSearchTerm: '',
  },
  {
    id: 'skill-link-prediction',
    label: 'Link Prediction',
    lines: ['Link', 'Prediction'],
    shortLabel: 'Link Prediction',
    domain: 'gnns',
    weight: 0.94,
    context: '13+ Peer-Reviewed Papers · Nature Sci. Reports',
    venues: 'Physica A · IEEE Access · Complexity',
    description:
      'Multi-hop path indices, local-global quasi-local similarity, and evolutionary graph indices across social and biological networks.',
    publicationCategory: 'link-prediction',
    publicationSearchTerm: 'Link Prediction',
  },
  {
    id: 'skill-tensorflow',
    label: 'TensorFlow & PyTorch',
    lines: ['TensorFlow', '& PyTorch'],
    shortLabel: 'TensorFlow',
    domain: 'ml',
    weight: 0.84,
    context: 'PhD & MSCS · Open-Source Repositories',
    venues: 'GitHub Reproducible Pipelines',
    description:
      'Production neural graph and transformer training pipelines with reproducible public evaluation scripts.',
    publicationCategory: 'all',
    publicationSearchTerm: 'Machine Learning',
  },
  {
    id: 'skill-ics-security',
    label: 'Cyber-Physical & ICS Security',
    lines: ['ICS', 'Security'],
    shortLabel: 'ICS Security',
    domain: 'biomedical',
    weight: 0.84,
    context: 'Artificial Intelligence Review 2025',
    venues: 'Springer AI Review',
    description:
      'Graph-based anomaly detection and resilient intelligence for critical Industrial Control Systems.',
    publicationCategory: 'healthcare-cps',
    publicationSearchTerm: 'Industrial',
  },
  {
    id: 'skill-matlab',
    label: 'MATLAB Scientific Computing',
    lines: ['MATLAB'],
    shortLabel: 'MATLAB',
    domain: 'engineering',
    weight: 0.78,
    context: 'Computational Physics Series · CUSIT',
    venues: 'Matrix Computation · Link Benchmarks',
    description:
      'Matrix eigenvalue decomposition, network similarity matrices, and numerical physics teaching series.',
    publicationCategory: 'link-prediction',
    publicationSearchTerm: 'Complex Networks',
  },
  {
    id: 'skill-genai',
    label: 'Generative AI',
    lines: ['Generative', 'AI'],
    shortLabel: 'Generative AI',
    domain: 'llms',
    weight: 0.82,
    context: 'PhD Research · Google Cloud Skills Boost',
    venues: 'Neuro-Symbolic NLP · Synthesis',
    description:
      'Controlled generative modeling and representation learning across multimodal and relational NLP benchmarks.',
    publicationCategory: 'kg-llm',
    publicationSearchTerm: 'Knowledge Graph',
  },
  {
    id: 'skill-spectral',
    label: 'Spectral Graph Complexity',
    lines: ['Spectral', 'Complexity'],
    shortLabel: 'Spectral Graph',
    domain: 'gnns',
    weight: 0.9,
    context: 'ICML MusIML 2025 · IEEE BigData 2025',
    venues: 'ICML Workshop · IEEE BigData',
    description:
      'Characterizing intrinsic graph learning difficulty via Laplacian eigenvalues and Cumulative Spectral Gradient (CSG).',
    publicationCategory: 'kg-llm',
    publicationSearchTerm: 'Spectral',
  },
  {
    id: 'skill-xai',
    label: 'Explainable AI (XAI)',
    lines: ['Explainable', 'AI'],
    shortLabel: 'Explainable AI',
    domain: 'ml',
    weight: 0.86,
    context: 'Health and Technology 2026 · Clinical AI',
    venues: 'Springer Health and Technology',
    description:
      'Attribution transparency and interpretability audits for trustworthy high-stakes medical and network models.',
    publicationCategory: 'healthcare-cps',
    publicationSearchTerm: 'Healthcare',
  },
  {
    id: 'skill-social-safety',
    label: 'Misinformation & Bot Cascades',
    lines: ['Cascade', 'Safety'],
    shortLabel: 'Cascade Safety',
    domain: 'biomedical',
    weight: 0.78,
    context: 'Social Network Analytics · Bot Detection',
    venues: 'Peer-Reviewed Security & Social Venues',
    description:
      'Structural propagation analysis for automated bot detection and fake-news cascade mitigation.',
    publicationCategory: 'healthcare-cps',
    publicationSearchTerm: 'Bot',
  },
  {
    id: 'skill-sql-spss',
    label: 'SQL & IBM SPSS Analytics',
    lines: ['SQL &', 'IBM SPSS'],
    shortLabel: 'SQL / SPSS',
    domain: 'engineering',
    weight: 0.76,
    context: 'MSCS · BEd Research Methods',
    venues: 'Quantitative Evaluation & Warehousing',
    description:
      'Relational data engineering and empirical hypothesis testing across computer science and ICT studies.',
    publicationCategory: 'all',
    publicationSearchTerm: '',
  },
  {
    id: 'skill-complex-networks',
    label: 'Complex Networks & Theory',
    lines: ['Complex', 'Networks'],
    shortLabel: 'Complex Nets',
    domain: 'gnns',
    weight: 0.88,
    context: 'MSCS Thesis · YouTube Lecture Series',
    venues: 'Applied Network Science · Physica A',
    description:
      'Structural topology analysis across Yeast, C. elegans, E. coli, Karate, and Dolphins benchmark graphs.',
    publicationCategory: 'link-prediction',
    publicationSearchTerm: 'Complex Networks',
  },
  {
    id: 'skill-sequence-models',
    label: 'Sequence & Time Modeling',
    lines: ['Sequence', 'Models'],
    shortLabel: 'Sequence Models',
    domain: 'ml',
    weight: 0.8,
    context: 'DeepLearning.AI Certified · NLP',
    venues: 'BioNLP · Sequential Graphs',
    description:
      'Modeling relational token sequences, attention mechanisms, and temporal network interactions.',
    publicationCategory: 'kg-llm',
    publicationSearchTerm: 'Transformer',
  },
];

/**
 * Generates deterministically balanced 3D points on a unit sphere
 * using the golden-angle Fibonacci lattice.
 */
export function generateFibonacciSpherePoints(count) {
  if (count <= 0) return [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const points = [];

  for (let i = 0; i < count; i += 1) {
    const y = count === 1 ? 0 : 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    points.push({ x, y, z });
  }

  return points;
}

/**
 * Computes optimal yaw/pitch to face a specific node on the sphere cleanly forward.
 */
export function getTargetRotationForSkill(skillId) {
  const idx = SKILL_NODES.findIndex((n) => n.id === skillId);
  if (idx < 0) return { yaw: 0.45, pitch: 0.18 };
  const pts = generateFibonacciSpherePoints(SKILL_NODES.length);
  const p = pts[idx];
  const yaw = Math.atan2(-p.x, p.z);
  const horizontal = Math.hypot(p.x, p.z);
  const pitch = Math.max(-0.9, Math.min(0.9, Math.atan2(p.y, horizontal)));
  return { yaw, pitch };
}

/**
 * Normalizes an angular delta in radians to [-PI, PI] for shortest-arc sphere rotation.
 */
export function normalizeAngleDelta(delta) {
  let d = delta % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}

/**
 * Advances current sphere rotation smoothly toward a target angle using
 * frame-rate-independent exponential damping.
 */
export function stepRotationTowards(current, target, dt, speed = 7.5) {
  const clampedDt = Math.max(0, Math.min(0.05, dt));
  const dYaw = normalizeAngleDelta(target.yaw - current.yaw);
  const dPitch = target.pitch - current.pitch;

  if (Math.abs(dYaw) < 0.0025 && Math.abs(dPitch) < 0.0025) {
    return {
      yaw: target.yaw,
      pitch: target.pitch,
      done: true,
    };
  }

  const alpha = 1 - Math.exp(-speed * clampedDt);
  return {
    yaw: current.yaw + dYaw * alpha,
    pitch: current.pitch + dPitch * alpha,
    done: false,
  };
}

/**
 * Decays pointer drag angular velocity with smooth exponential friction.
 */
export function stepInertiaVelocity(velocity, dt, damping = 4.2) {
  const clampedDt = Math.max(0, Math.min(0.05, dt));
  const decay = Math.exp(-damping * clampedDt);
  const vx = velocity.vx * decay;
  const vy = velocity.vy * decay;

  if (Math.hypot(vx, vy) < 0.015) {
    return { vx: 0, vy: 0, active: false };
  }

  return { vx, vy, active: true };
}

/**
 * Projects 3D sphere points into 2D SVG viewport space, sorted back-to-front,
 * with domain highlighting and contained 3D bubble sizing.
 */
export function projectSkillNodes(
  nodes,
  {
    yaw = 0.45,
    pitch = 0.18,
    radius = 186,
    centerX = 320,
    centerY = 240,
    activeDomain = 'all',
    selectedSkillId = null,
  } = {}
) {
  const lattice = generateFibonacciSpherePoints(nodes.length);
  const cosYaw = Math.cos(yaw);
  const sinYaw = Math.sin(yaw);
  const cosPitch = Math.cos(pitch);
  const sinPitch = Math.sin(pitch);
  const focalLength = 3.35;

  const projected = nodes.map((node, index) => {
    const p = lattice[index];
    const palette = getSkillPaletteByIndex(index);

    const x1 = p.x * cosYaw - p.z * sinYaw;
    const z1 = p.x * sinYaw + p.z * cosYaw;

    const y2 = p.y * cosPitch - z1 * sinPitch;
    const z2 = p.y * sinPitch + z1 * cosPitch;

    const perspective = focalLength / (focalLength - z2);
    const screenX = centerX + x1 * radius * perspective;
    const screenY = centerY + y2 * radius * perspective;

    const depthFactor = (z2 + 1) / 2;
    const matchesDomain = activeDomain === 'all' || node.domain === activeDomain;
    const isSelected = selectedSkillId === node.id;

    const domainBoost = activeDomain === 'all' ? 1 : matchesDomain ? 1.16 : 0.72;
    const selectedBoost = isSelected ? 1.12 : 1;

    const baseBubbleRadius = 26 + node.weight * 12;
    const bubbleRadius =
      baseBubbleRadius * (0.64 + depthFactor * 0.44) * domainBoost * selectedBoost;

    let opacity = 0.42 + depthFactor * 0.58;
    if (activeDomain !== 'all') {
      opacity = matchesDomain
        ? Math.min(1, 0.8 + depthFactor * 0.2)
        : 0.16 + depthFactor * 0.14;
    }
    if (isSelected) {
      opacity = 1;
    }

    return {
      ...node,
      paletteId: palette.id,
      palette,
      rx: x1,
      ry: y2,
      rz: z2,
      depthFactor,
      screenX,
      screenY,
      bubbleRadius,
      opacity,
      isHighlighted: matchesDomain,
      isSelected,
    };
  });

  return projected.sort((a, b) => a.rz - b.rz);
}

/**
 * Computes edges connecting spheres within the same domain (or active filter)
 * so the globe evokes a living knowledge graph and lights up neighbors on click.
 */
export function computeSphereEdges(
  projectedNodes,
  activeDomain = 'all',
  selectedSkillId = null
) {
  const edges = [];
  for (let i = 0; i < projectedNodes.length; i += 1) {
    const a = projectedNodes[i];
    if (activeDomain !== 'all' && !a.isHighlighted) continue;

    for (let j = i + 1; j < projectedNodes.length; j += 1) {
      const b = projectedNodes[j];
      if (a.domain !== b.domain) continue;
      if (activeDomain !== 'all' && !b.isHighlighted) continue;

      const dist3d = Math.hypot(a.rx - b.rx, a.ry - b.ry, a.rz - b.rz);
      if (dist3d <= 1.65) {
        const avgDepth = (a.depthFactor + b.depthFactor) / 2;
        const connectedToSelected =
          Boolean(selectedSkillId) &&
          (a.id === selectedSkillId || b.id === selectedSkillId);
        edges.push({
          id: `${a.id}-${b.id}`,
          x1: a.screenX,
          y1: a.screenY,
          x2: b.screenX,
          y2: b.screenY,
          opacity: connectedToSelected
            ? Math.min(0.88, 0.52 + avgDepth * 0.36)
            : activeDomain === 'all'
              ? 0.15 + avgDepth * 0.16
              : 0.28 + avgDepth * 0.34,
          highlighted: activeDomain !== 'all' || connectedToSelected,
          connectedToSelected,
        });
      }
    }
  }
  return edges;
}

/**
 * Returns domain summary and matching skills for UI counts and filter state.
 */
export function getDomainSkillSummary(domainId) {
  const domain = SKILL_DOMAINS.find((d) => d.id === domainId) ?? SKILL_DOMAINS[0];
  const skills =
    domain.id === 'all'
      ? SKILL_NODES
      : SKILL_NODES.filter((skill) => skill.domain === domain.id);

  return {
    domain,
    skills,
    count: skills.length,
    total: SKILL_NODES.length,
  };
}

/**
 * Finds related peer-reviewed publications for a selected skill bubble.
 */
export function getRelatedPublicationsForSkill(skill, limit = 3) {
  if (!skill) return [];
  const term = (skill.publicationSearchTerm || '').trim().toLowerCase();

  let matches = PUBLICATIONS.filter((pub) => {
    const categoryOk =
      skill.publicationCategory === 'all' || pub.category === skill.publicationCategory;
    if (!term) return categoryOk;

    const haystack = `${pub.title} ${pub.venue} ${pub.abstract} ${pub.keywords.join(' ')}`.toLowerCase();
    return haystack.includes(term);
  });

  if (matches.length === 0) {
    matches = PUBLICATIONS.filter(
      (pub) =>
        skill.publicationCategory === 'all' || pub.category === skill.publicationCategory
    );
  }

  return matches.slice(0, limit);
}
