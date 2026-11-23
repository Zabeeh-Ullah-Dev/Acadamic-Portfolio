import { TECHNICAL_SKILLS_STACK } from '../data/portfolioData.js';

export const SKILL_LOADOUT_PRESETS = [
  {
    id: 'preset-kgc',
    name: 'KGC Research Pipeline',
    projectTitle: 'MuCo-KGC & MuCoS (PAKDD / ACL BioNLP 2025)',
    summary:
      'Negative-sampling-free multi-context Knowledge Graph Completion and biomedical drug-target sampling over KEGG50k and PharmKG-8k.',
    repoUrl:
      'https://github.com/hajigul/MuCoS_KGC-Efficient-Drug-Target-Discovery-via-Multi-Context-Aware-Sampling-in-Knowledge-Graphs',
    skills: [
      'Python (primary)',
      'PyTorch',
      'Knowledge graph embeddings',
    ],
  },
  {
    id: 'preset-agent',
    name: 'Local Private Agent Rig',
    projectTitle: 'ResearchDesk (Ollama + Local Embeddings)',
    summary:
      'On-device 4-tool research assistant combining arXiv/OpenAlex discovery, grounded citation verification, and private PDF Q&A.',
    repoUrl: 'https://github.com/hajigul/ResearchDest',
    skills: [
      'Ollama (local, on-device small language models)',
      'Local embeddings (nomic-embed-text) for retrieval',
      'LangChain',
    ],
  },
  {
    id: 'preset-clinical',
    name: 'Clinical ML Application',
    projectTitle: 'CardioRisk-NN (UCI Cleveland Gradio App)',
    summary:
      'Regularized neural risk classifier (81.97% held-out test accuracy on 61 patients) paired with a multi-tab Gradio attribution dashboard.',
    repoUrl: 'https://github.com/hajigul/heart-disease-risk-predictor-heartguard-ai',
    skills: [
      'TensorFlow / Keras',
      'Gradio dashboards',
      'scikit-learn',
    ],
  },
  {
    id: 'preset-spectral',
    name: 'Spectral Graph & Teaching Lab',
    projectTitle: 'CSG Spectral Complexity & Complex Networks',
    summary:
      'Laplacian eigenvalue decay diagnostics (MusIML @ ICML 2025) and hybrid MATLAB/NetworkX link-prediction benchmarks.',
    repoUrl:
      'https://github.com/hajigul/Evaluating-Cumulative-Spectral-Gradient-as-a-Complexity-Measure',
    skills: [
      'NetworkX',
      'Spectral graph methods',
      'MATLAB',
    ],
  },
];

const SKILL_SYNERGY_MAP = {
  'Python (primary)': ['PyTorch', 'HuggingFace Transformers', 'NetworkX', 'Ollama (local, on-device small language models)'],
  MATLAB: ['Spectral graph methods', 'NetworkX', 'Link prediction'],
  Java: ['SQL', 'Git / GitHub'],
  'C#': ['SQL', 'Git / GitHub'],
  LaTeX: ['Overleaf', 'Git / GitHub'],
  SQL: ['Python (primary)', 'scikit-learn', 'SPSS'],
  PyTorch: ['Python (primary)', 'HuggingFace Transformers', 'Knowledge graph embeddings', 'Graph neural networks'],
  'TensorFlow / Keras': ['Python (primary)', 'scikit-learn', 'Gradio dashboards'],
  'HuggingFace Transformers': ['PyTorch', 'Transformer fine-tuning', 'Knowledge graph embeddings'],
  'scikit-learn': ['Python (primary)', 'TensorFlow / Keras', 'Link prediction'],
  NetworkX: ['Python (primary)', 'Link prediction', 'Spectral graph methods', 'Graph neural networks'],
  LangChain: ['Retrieval-augmented generation', 'LLM agents', 'Tool-using agents', 'Ollama (local, on-device small language models)'],
  'Knowledge graph embeddings': ['PyTorch', 'HuggingFace Transformers', 'Link prediction'],
  'Graph neural networks': ['PyTorch', 'NetworkX', 'Link prediction'],
  'Transformer fine-tuning': ['HuggingFace Transformers', 'PyTorch', 'DeepLearning.AI (Neural Networks & Deep Learning; Sequence Models / NLP; Structuring ML Projects)'],
  'Retrieval-augmented generation': ['LangChain', 'Local embeddings (nomic-embed-text) for retrieval', 'PDF parsing', 'RAG and LangChain Agents'],
  'LLM agents': ['LangChain', 'Tool-using agents', 'Evaluation suites for LLM systems', 'Ollama (local, on-device small language models)'],
  'Link prediction': ['NetworkX', 'Knowledge graph embeddings', 'MATLAB', 'Spectral graph methods'],
  'Spectral graph methods': ['NetworkX', 'MATLAB', 'Link prediction'],
  'Ollama (local, on-device small language models)': ['Local embeddings (nomic-embed-text) for retrieval', 'PDF parsing', 'Tool-using agents'],
  'Local embeddings (nomic-embed-text) for retrieval': ['Ollama (local, on-device small language models)', 'Retrieval-augmented generation', 'PDF parsing'],
  'PDF parsing': ['Local embeddings (nomic-embed-text) for retrieval', 'Retrieval-augmented generation', 'Gradio dashboards'],
  'Gradio dashboards': ['TensorFlow / Keras', 'Ollama (local, on-device small language models)', 'Python (primary)'],
  'Tool-using agents': ['LLM agents', 'LangChain', 'Evaluation suites for LLM systems'],
  'Evaluation suites for LLM systems': ['LLM agents', 'Tool-using agents', 'Ollama (local, on-device small language models)'],
  'Git / GitHub': ['Python (primary)', 'Jupyter', 'LaTeX'],
  Jupyter: ['Python (primary)', 'scikit-learn', 'NetworkX', 'Git / GitHub'],
  Overleaf: ['LaTeX', 'Git / GitHub'],
  SPSS: ['SQL', 'scikit-learn'],
};

const SKILL_TIER_MAP = {
  'Python (primary)': { tier: 'Primary Stack', level: 96, context: '16+ courses taught & 25+ research repositories' },
  PyTorch: { tier: 'Research Core', level: 94, context: 'MuCo-KGC, MuCoS, KG-BERT & GNN pipelines' },
  'HuggingFace Transformers': { tier: 'Research Core', level: 92, context: 'PAKDD 2025, BioNLP @ ACL 2025 & NeurIPS MusIML' },
  NetworkX: { tier: 'Research Core', level: 92, context: 'Complex networks, CSG eigenvalues & KEGG50k subgraphs' },
  'Knowledge graph embeddings': { tier: 'Research Core', level: 95, context: 'PhD dissertation specialization at UBD' },
  'Graph neural networks': { tier: 'Research Core', level: 90, context: 'Relation prediction, informed GNNs & misinformation cascades' },
  'Link prediction': { tier: 'Research Core', level: 96, context: '13+ peer-reviewed papers (Scientific Reports, Physica A)' },
  'Spectral graph methods': { tier: 'Research Core', level: 90, context: 'Cumulative Spectral Gradient (ICML MusIML & IEEE BigData 2025)' },
  MATLAB: { tier: 'Research & Teaching', level: 88, context: 'Computational Physics playlist & hill-climbing LP optimization' },
  'Ollama (local, on-device small language models)': { tier: 'Applied AI', level: 90, context: 'Powers private on-device inference in ResearchDesk' },
  'Local embeddings (nomic-embed-text) for retrieval': { tier: 'Applied AI', level: 88, context: 'Private PDF Q&A retrieval with page-level citations' },
  LangChain: { tier: 'Applied AI', level: 86, context: 'RAG & multi-step tool-using research agents' },
  'TensorFlow / Keras': { tier: 'Production ML', level: 86, context: 'CardioRisk-NN clinical UCI Cleveland neural network' },
  'Gradio dashboards': { tier: 'Production ML', level: 85, context: 'Multi-tab interactive batch prediction & attribution UI' },
};

export function getAllSkillEntries() {
  const entries = [];
  for (const group of TECHNICAL_SKILLS_STACK) {
    for (const item of group.items) {
      const meta = SKILL_TIER_MAP[item] || {
        tier: group.category === 'Selected Training' ? 'Certified Track' : 'Production Stack',
        level: group.category === 'Languages' ? 92 : 82,
        context: `${group.category} competency across research and instruction`,
      };
      entries.push({
        name: item,
        categoryId: group.id,
        categoryLabel: group.category,
        tier: meta.tier,
        level: meta.level,
        context: meta.context,
        synergies: SKILL_SYNERGY_MAP[item] || [],
      });
    }
  }
  return entries;
}

export function getSkillMetadata(skillName) {
  return (
    getAllSkillEntries().find((entry) => entry.name === skillName) || {
      name: skillName,
      categoryId: 'skill-programming',
      categoryLabel: 'Technical Skill',
      tier: 'Production Stack',
      level: 82,
      context: 'Core technical stack competency',
      synergies: [],
    }
  );
}

export function toggleSkillInLoadout(currentSlots, skillName, maxSlots = 3) {
  if (!skillName) return currentSlots;
  if (currentSlots.includes(skillName)) {
    return currentSlots.filter((item) => item !== skillName);
  }
  if (currentSlots.length < maxSlots) {
    return [...currentSlots, skillName];
  }
  return [...currentSlots.slice(1), skillName];
}

export function evaluateLoadoutSynergy(selectedSlots) {
  const slots = Array.isArray(selectedSlots) ? selectedSlots : [];
  if (slots.length === 0) {
    return {
      matchedPreset: null,
      overlapCount: 0,
      synergyLinks: [],
      statusText: 'Select up to 3 skills below or load a preset stack to reveal active research synergy.',
    };
  }

  let bestPreset = null;
  let bestOverlap = 0;

  for (const preset of SKILL_LOADOUT_PRESETS) {
    const overlap = preset.skills.filter((s) => slots.includes(s)).length;
    if (overlap > bestOverlap) {
      bestOverlap = overlap;
      bestPreset = preset;
    }
  }

  const allEntries = getAllSkillEntries();
  const linkedSet = new Set();
  for (const slotSkill of slots) {
    const meta = allEntries.find((e) => e.name === slotSkill);
    if (meta) {
      for (const syn of meta.synergies) {
        if (!slots.includes(syn)) {
          linkedSet.add(syn);
        }
      }
    }
  }

  return {
    matchedPreset: bestOverlap >= 2 ? bestPreset : null,
    candidatePreset: bestPreset,
    overlapCount: bestOverlap,
    synergyLinks: Array.from(linkedSet),
    statusText:
      bestOverlap >= 2 && bestPreset
        ? `Synergy active (${bestOverlap}/3 match): ${bestPreset.projectTitle}`
        : `${slots.length}/3 equipped · ${linkedSet.size} compatible synergy skills highlighted below`,
  };
}

export function pickNextPresetLoadout(currentPresetId) {
  if (!SKILL_LOADOUT_PRESETS.length) return null;
  const idx = SKILL_LOADOUT_PRESETS.findIndex((p) => p.id === currentPresetId);
  return SKILL_LOADOUT_PRESETS[(idx + 1) % SKILL_LOADOUT_PRESETS.length];
}

/**
 * Splits a preset's projectTitle into a clean display title and venue/platform tag.
 */
export function parsePresetHeading(preset) {
  const rawTitle = preset?.projectTitle || '';
  const parenMatch = rawTitle.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (parenMatch) {
    return {
      title: parenMatch[1].trim(),
      tag: parenMatch[2].trim(),
    };
  }
  const summaryVenueMatch = preset?.summary?.match(/\(([^)]+)\)/);
  return {
    title: rawTitle,
    tag: summaryVenueMatch ? summaryVenueMatch[1].trim() : preset?.name || '',
  };
}

/**
 * Classifies a technology into compact display label and visual indicator family:
 * 'core' (Primary / Core / Production / Teaching) vs 'applied' (Applied / Certified / Language).
 */
export function getSkillChipTierInfo(skillName, categoryId) {
  const meta = getSkillMetadata(skillName);
  if (categoryId === 'skill-languages') {
    const match = skillName.match(/\(([^)]+)\)/);
    return {
      label: match ? match[1] : 'Fluent',
      kind: 'applied',
    };
  }
  if (meta.tier === 'Primary Stack') return { label: 'Core', kind: 'core' };
  if (meta.tier === 'Research Core') return { label: 'Core', kind: 'core' };
  if (meta.tier === 'Production ML' || meta.tier === 'Production Stack') {
    return { label: 'Production', kind: 'core' };
  }
  if (meta.tier === 'Research & Teaching') return { label: 'Core', kind: 'core' };
  if (meta.tier === 'Applied AI') return { label: 'Applied', kind: 'applied' };
  if (meta.tier === 'Certified Track') return { label: 'Certified', kind: 'applied' };
  return { label: 'Core', kind: 'core' };
}

/**
 * Cross-links an active skill in the SkillMatrix to matching research/project Bento cards.
 * Returns direct matches (skill explicitly listed in preset.skills) and related synergy matches.
 */
export function getMatchedPresetsForSkill(skillName) {
  if (!skillName) {
    return { directIds: [], relatedIds: [], matchedPresets: [] };
  }

  const meta = getSkillMetadata(skillName);
  const direct = [];
  const related = [];

  for (const preset of SKILL_LOADOUT_PRESETS) {
    if (preset.skills.includes(skillName)) {
      direct.push(preset);
    } else if (preset.skills.some((s) => meta.synergies.includes(s))) {
      related.push(preset);
    }
  }

  return {
    directIds: direct.map((p) => p.id),
    relatedIds: related.map((p) => p.id),
    matchedPresets: [...direct, ...related],
  };
}

