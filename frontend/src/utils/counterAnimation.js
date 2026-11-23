/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Pure ease-out cubic interpolation for academic metric count-up animations.
 * Guarantees deterministic start at 0 and exact landing on `target` once
 * `elapsedMs >= durationMs` so verified metrics never stall halfway.
 */
export function computeCounterValue(target, elapsedMs, durationMs) {
  const safeTarget = Number.isFinite(target) ? target : 0;
  if (durationMs <= 0 || elapsedMs >= durationMs) {
    return safeTarget;
  }
  if (elapsedMs <= 0) {
    return 0;
  }
  const progress = Math.min(1, Math.max(0, elapsedMs / durationMs));
  const eased = 1 - Math.pow(1 - progress, 3);
  return Math.round(safeTarget * eased);
}
