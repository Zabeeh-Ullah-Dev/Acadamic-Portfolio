/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * SectionDivider renders a subtle 2050 architectural animated gradient line
 * between major sections for sleek visual separation without bulky badges.
 *
 * Features:
 * - Color interpolation with modern OKLAB/OKLCH color space with progressive fallback.
 * - Layered fine 1px base line + soft optical glow bloom.
 * - Bidirectional traveling photon beam sweeps with staggered frequencies.
 * - Minimalist optical diamond center accent that seamlessly integrates into the line.
 * - Fully accessible (aria-hidden="true") and reduced-motion safe.
 */
export function SectionDivider({
  id,
  variant = 'horizontal',
  showCenterNode = true,
  className = '',
}) {
  if (variant === 'vertical') {
    return (
      <div
        id={id}
        aria-hidden="true"
        className={`pointer-events-none relative flex h-full w-6 select-none items-center justify-center ${className}`}
      >
        {/* Soft optical glow aura */}
        <div className="gradient-line-vertical-glow absolute inset-y-0 w-[3px]" />

        {/* Crisp baseline */}
        <div className="gradient-line-vertical-base absolute inset-y-0 w-px" />

        {/* Primary traveling vertical photon beam */}
        <div className="absolute inset-y-0 w-px overflow-hidden">
          <span className="animate-gradient-beam-vertical absolute left-0 h-32 w-px bg-gradient-to-b from-transparent via-[#93C5FD] to-transparent shadow-[0_0_12px_rgba(147,197,253,0.9)]" />
        </div>

        {/* Minimalist optic diamond node */}
        {showCenterNode && (
          <div className="relative z-10 flex flex-col items-center justify-center">
            <span className="h-1.5 w-1.5 rotate-45 bg-[#93C5FD] shadow-[0_0_8px_rgba(96,165,250,0.85)]" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      id={id}
      aria-hidden="true"
      className={`pointer-events-none relative w-full select-none overflow-hidden py-3 sm:py-4 ${className}`}
    >
      {/* Background ambient radial aura behind line center */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.08)_0%,transparent_70%)]" />

      {/* Layer 1: Soft optical glow bloom */}
      <div className="gradient-line-glow absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px]" />

      {/* Layer 2: Ultra-fine 1px baseline */}
      <div className="gradient-line-base absolute inset-x-0 top-1/2 -translate-y-1/2 h-px" />

      {/* Layer 3: Forward traveling photon beam (left-to-right) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px overflow-hidden">
        <span className="animate-gradient-beam absolute top-0 h-[2px] -translate-y-[0.5px] w-48 sm:w-72 bg-gradient-to-r from-transparent via-[#93C5FD] to-transparent shadow-[0_0_12px_rgba(147,197,253,0.95)]" />
      </div>

      {/* Layer 4: Harmonic secondary beam (right-to-left, wider and softer) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px overflow-hidden">
        <span className="animate-gradient-beam-reverse absolute top-0 h-px w-64 sm:w-96 bg-gradient-to-r from-transparent via-[#38BDF8]/65 to-transparent shadow-[0_0_14px_rgba(56,189,248,0.7)]" />
      </div>

      {/* Center optical accent: tiny micro-diamond aligned with the laser line */}
      {showCenterNode && (
        <div className="relative z-10 flex items-center justify-center">
          <div className="flex items-center gap-1.5 px-2">
            <span className="h-px w-3 bg-gradient-to-r from-transparent to-[#60A5FA]/60" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#93C5FD] shadow-[0_0_8px_rgba(96,165,250,0.9)]" />
            <span className="h-px w-3 bg-gradient-to-l from-transparent to-[#60A5FA]/60" />
          </div>
        </div>
      )}
    </div>
  );
}
