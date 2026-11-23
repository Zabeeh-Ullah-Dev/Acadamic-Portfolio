export const RESEARCH_MODES = {
  kgc: {
    id: 'kgc',
    label: 'Knowledge Graph Completion',
    primaryRgb: [96, 165, 250], // Sapphire Blue
    secondaryRgb: [56, 189, 248], // Ice Cyan
    accentRgb: [129, 140, 248], // Indigo Attention
    inferredRgb: [147, 197, 253], // Predicted Link Light Blue
    hubLabels: [
      'MuCo-KGC',
      'BERT',
      'KGC',
      'Triplet',
      'Relation',
      'Entity',
      'LLM',
      'Embed',
    ],
  },
  mucos: {
    id: 'mucos',
    label: 'Multi-Context Sampling',
    primaryRgb: [56, 189, 248], // Sky Cyan
    secondaryRgb: [96, 165, 250], // Sapphire
    accentRgb: [34, 211, 238], // BioNLP Cyan
    inferredRgb: [186, 230, 253], // Sampled Context Arc
    hubLabels: [
      'MuCoS',
      'KEGG50k',
      'PharmKG',
      'Context',
      'Drug-Target',
      'Subgraph',
      'BioNLP',
      'Sampler',
    ],
  },
  biomedical: {
    id: 'biomedical',
    label: 'Drug Discovery & GNNs',
    primaryRgb: [45, 212, 191], // Biomedical Teal
    secondaryRgb: [96, 165, 250], // Sapphire Blue
    accentRgb: [56, 189, 248], // Spectral Cyan
    inferredRgb: [153, 246, 228], // PPI Reconstruction Arc
    hubLabels: [
      'GNN',
      'PPI Net',
      'Motif',
      'Protein',
      'Graph',
      'Spectral',
      'Link Pred',
      'Biomed',
    ],
  },
};

export function getResearchModeConfig(modeId) {
  return RESEARCH_MODES[modeId] || RESEARCH_MODES.kgc;
}

export function lerpNumber(start, end, t) {
  const clamped = Math.max(0, Math.min(1, t));
  return start + (end - start) * clamped;
}

export function lerpRgb(fromRgb, toRgb, t) {
  return [
    Math.round(lerpNumber(fromRgb[0], toRgb[0], t)),
    Math.round(lerpNumber(fromRgb[1], toRgb[1], t)),
    Math.round(lerpNumber(fromRgb[2], toRgb[2], t)),
  ];
}

export function rgbaString(rgb, alpha) {
  const safeAlpha = Math.max(0, Math.min(1, alpha));
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${safeAlpha.toFixed(3)})`;
}

/**
 * Determines whether a coordinate falls inside protected UI reading zones
 * (the left headline/spotlight column OR the bottom metrics strip) where
 * canvas node labels stay suppressed so background annotations never collide
 * with foreground typography.
 */
export function isInTypographyQuietZone(x, y, width, height) {
  if (width <= 0 || height <= 0) return true;
  if (width < 768) {
    // On compact viewports keep labels near the top perimeter only
    return y > height * 0.14;
  }
  const inLeftColumn = x > width * 0.085 && x < width * 0.54 && y > height * 0.09 && y < height * 0.78;
  const inBottomMetricsBand = x > width * 0.08 && x < width * 0.9 && y > height * 0.74;
  return inLeftColumn || inBottomMetricsBand;
}

/**
 * Computes a quadratic Bezier control point offset perpendicular to the segment
 * between two graph hubs, producing crisp Transformer-style attention arcs.
 */
export function computeAttentionArcControlPoint(ax, ay, bx, by, curvature = 0.16) {
  const mx = (ax + bx) * 0.5;
  const my = (ay + by) * 0.5;
  const dx = bx - ax;
  const dy = by - ay;
  return {
    cx: mx - dy * curvature,
    cy: my + dx * curvature,
  };
}

/**
 * Evaluates a point and tangent vector at parameter t in [0, 1] along a quadratic Bezier curve.
 */
export function sampleQuadraticBezier(ax, ay, cx, cy, bx, by, t) {
  const u = 1 - t;
  const x = u * u * ax + 2 * u * t * cx + t * t * bx;
  const y = u * u * ay + 2 * u * t * cy + t * t * by;
  const tx = 2 * u * (cx - ax) + 2 * t * (bx - cx);
  const ty = 2 * u * (cy - ay) + 2 * t * (by - cy);
  return { x, y, tx, ty };
}

// Curated normalized anchor positions occupying pure negative space around
// the Hero composition: top horizon, central corridor, right laboratory margin,
// lower-right corner, and subtle far-left perimeter (zero text collisions).
const HUB_ANCHORS = [
  { nx: 0.555, ny: 0.14, weight: 1.0 }, // Upper central corridor above portrait
  { nx: 0.77, ny: 0.105, weight: 0.96 }, // Top-right horizon above portrait
  { nx: 0.935, ny: 0.25, weight: 0.94 }, // Upper-right lab margin
  { nx: 0.555, ny: 0.48, weight: 0.9 }, // Mid corridor between spotlight card & portrait
  { nx: 0.94, ny: 0.56, weight: 0.96 }, // Mid-right lab margin
  { nx: 0.925, ny: 0.81, weight: 0.9 }, // Lower-right perimeter clear of metrics
  { nx: 0.055, ny: 0.26, weight: 0.82 }, // Far-left upper perimeter clear of "Haji Gul"
  { nx: 0.055, ny: 0.64, weight: 0.84 }, // Far-left lower perimeter clear of CTAs
];

/**
 * Builds a deterministic, layered Knowledge Graph topology for a given viewport size:
 * - tier 0: Semantic Anchor Hubs (labeled cleanly in negative space)
 * - tier 1: Contextual Entity Nodes (participate in local GNN message passing)
 * - tier 2: Deep Latent Embedding Coordinates (subtle spatial depth stars)
 */
export function createKnowledgeGraphTopology(width, height) {
  const safeW = Math.max(320, width);
  const safeH = Math.max(320, height);
  const area = safeW * safeH;
  const nodes = [];

  // 1. Semantic Anchor Hubs (Tier 0)
  const hubCount = safeW < 640 ? 5 : HUB_ANCHORS.length;
  for (let i = 0; i < hubCount; i += 1) {
    const anchor = HUB_ANCHORS[i];
    const driftAngle = (i * 2.399963) % (Math.PI * 2);
    const speed = 0.075 + (i % 3) * 0.018;
    const baseX = anchor.nx * safeW;
    const baseY = anchor.ny * safeH;
    nodes.push({
      id: i,
      tier: 0,
      hubIndex: i,
      x: baseX,
      y: baseY,
      homeX: baseX,
      homeY: baseY,
      maxDrift: Math.min(safeW, safeH) * 0.032,
      vx: Math.cos(driftAngle) * speed,
      vy: Math.sin(driftAngle) * speed,
      radius: 4.9 + anchor.weight * 0.95,
      phaseOffset: i * 0.73,
    });
  }

  // 2. Contextual Entity Nodes (Tier 1) — focused around the right research stage & margins
  const entityCount = Math.min(38, Math.max(18, Math.floor(area / 29000)));
  for (let i = 0; i < entityCount; i += 1) {
    const seed = ((i + 1) * 9301 + 49297) % 233280;
    const rawRx = seed / 233280;
    // Place ~68% in the right & central research field, ~32% gently framing left/top edges
    const rx = i % 10 < 7 ? 0.44 + rawRx * 0.54 : 0.03 + rawRx * 0.44;
    const ry = (((seed * 7 + 131) % 233280) / 233280) * 0.88 + 0.06;
    const angle = (i * 1.618033) % (Math.PI * 2);
    const speed = 0.16 + (i % 4) * 0.032;
    nodes.push({
      id: hubCount + i,
      tier: 1,
      hubIndex: -1,
      x: rx * safeW,
      y: ry * safeH,
      homeX: rx * safeW,
      homeY: ry * safeH,
      maxDrift: 0,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 2.1 + (i % 3) * 0.55,
      phaseOffset: i * 0.41,
    });
  }

  // 3. Latent Embedding Dust (Tier 2)
  const dustCount = Math.min(28, Math.max(12, Math.floor(area / 42000)));
  for (let i = 0; i < dustCount; i += 1) {
    const seed = ((i + 37) * 7919 + 104729) % 233280;
    const rx = seed / 233280;
    const ry = ((seed * 11 + 257) % 233280) / 233280;
    const angle = (i * 2.1) % (Math.PI * 2);
    const speed = 0.065 + (i % 3) * 0.02;
    nodes.push({
      id: hubCount + entityCount + i,
      tier: 2,
      hubIndex: -1,
      x: rx * safeW,
      y: ry * safeH,
      homeX: rx * safeW,
      homeY: ry * safeH,
      maxDrift: 0,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 1.2 + (i % 2) * 0.45,
      phaseOffset: i * 0.89,
    });
  }

  // 4. Structured Semantic Arcs between Anchor Hubs (Transformer Attention + KGC Link Prediction)
  const hubArcs = [];
  const arcPairs = [
    [0, 1, 'attention', 0.16],
    [1, 2, 'attention', 0.15],
    [0, 3, 'inferred', -0.14],
    [1, 3, 'attention', 0.11],
    [2, 4, 'attention', 0.16],
    [3, 4, 'inferred', 0.12],
    [4, 5, 'attention', 0.15],
    [3, 5, 'inferred', -0.15],
    [0, 2, 'attention', -0.2],
    [2, 5, 'inferred', 0.18],
    [6, 7, 'inferred', -0.14],
    [6, 0, 'attention', -0.12],
  ];

  for (let i = 0; i < arcPairs.length; i += 1) {
    const [from, to, kind, curvature] = arcPairs[i];
    if (from < hubCount && to < hubCount) {
      hubArcs.push({
        from,
        to,
        kind, // 'attention' (directed solid arc + arrowhead + comet) | 'inferred' (dashed link-prediction arc)
        curvature,
        packetOffset: (i * 0.27) % 1,
        packetSpeed: kind === 'attention' ? 0.34 + (i % 3) * 0.06 : 0.22,
      });
    }
  }

  return { nodes, hubCount, hubArcs };
}
