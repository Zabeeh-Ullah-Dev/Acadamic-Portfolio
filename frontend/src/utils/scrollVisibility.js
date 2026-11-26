/**
 * Determines whether the user has scrolled completely past a target section
 * (e.g., #publications), taking the fixed header height into account.
 */
export function hasScrolledPastSection({ bottom, topThreshold = 96 }) {
  if (typeof bottom !== 'number' || Number.isNaN(bottom)) {
    return false;
  }
  return bottom <= topThreshold;
}

/**
 * Computes normalized vertical page scroll progress in [0, 1].
 */
export function computeScrollProgress({ scrollY, scrollHeight, innerHeight }) {
  const maxScroll = Math.max(1, (scrollHeight || 0) - (innerHeight || 0));
  if (scrollHeight <= innerHeight) return 0;
  return Math.max(0, Math.min(1, (scrollY || 0) / maxScroll));
}
