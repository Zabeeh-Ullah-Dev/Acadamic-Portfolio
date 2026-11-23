/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Computes evenly fanned Y coordinates along the left or right edge of the
 * central subject node so multiple incoming/outgoing arrows enter cleanly
 * without overlapping each other.
 */
export function computeFannedAnchorY(centerRect, index, totalCount) {
  const midY = centerRect.top + centerRect.height / 2;
  if (totalCount <= 1) {
    return midY;
  }
  const usableSpan = Math.min(centerRect.height * 0.52, Math.max(24, (totalCount - 1) * 18));
  const step = usableSpan / (totalCount - 1);
  return midY - usableSpan / 2 + index * step;
}

/**
 * Generates a smooth horizontal S-curve cubic Bezier SVG path string (`M ... C ...`)
 * flowing from `from` { x, y } to `to` { x, y }.
 */
export function buildCubicConnectorPath(from, to) {
  const dx = to.x - from.x;
  const horizontalTension = Math.max(16, Math.abs(dx) * 0.52);
  const c1x = Number((from.x + horizontalTension).toFixed(1));
  const c1y = Number(from.y.toFixed(1));
  const c2x = Number((to.x - horizontalTension).toFixed(1));
  const c2y = Number(to.y.toFixed(1));
  const x1 = Number(from.x.toFixed(1));
  const y1 = Number(from.y.toFixed(1));
  const x2 = Number(to.x.toFixed(1));
  const y2 = Number(to.y.toFixed(1));

  return `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;
}

/**
 * Computes all prerequisite -> center and center -> unlock curved connector paths
 * from measured relative bounding boxes inside the diagram canvas.
 *
 * @param {Array<{ id: string, left: number, top: number, width: number, height: number }>} prereqRects
 * @param {{ id: string, left: number, top: number, width: number, height: number } | null} centerRect
 * @param {Array<{ id: string, left: number, top: number, width: number, height: number }>} unlockRects
 */
export function computeDiagramConnectors(prereqRects, centerRect, unlockRects) {
  if (!centerRect || centerRect.width <= 0 || centerRect.height <= 0) {
    return { incoming: [], outgoing: [] };
  }

  const pad = 4;
  const centerLeftX = centerRect.left - pad;
  const centerRightX = centerRect.left + centerRect.width + pad;

  const incoming = (prereqRects || []).map((rect, idx, arr) => {
    const from = {
      x: rect.left + rect.width + pad,
      y: rect.top + rect.height / 2,
    };
    const to = {
      x: centerLeftX,
      y: computeFannedAnchorY(centerRect, idx, arr.length),
    };
    return {
      id: `in-${rect.id}-${centerRect.id}`,
      sourceId: rect.id,
      targetId: centerRect.id,
      kind: 'prerequisite',
      from,
      to,
      d: buildCubicConnectorPath(from, to),
    };
  });

  const outgoing = (unlockRects || []).map((rect, idx, arr) => {
    const from = {
      x: centerRightX,
      y: computeFannedAnchorY(centerRect, idx, arr.length),
    };
    const to = {
      x: rect.left - pad,
      y: rect.top + rect.height / 2,
    };
    return {
      id: `out-${centerRect.id}-${rect.id}`,
      sourceId: centerRect.id,
      targetId: rect.id,
      kind: 'unlocks',
      from,
      to,
      d: buildCubicConnectorPath(from, to),
    };
  });

  return { incoming, outgoing };
}
