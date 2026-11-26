import { useId } from 'react';

export function HajiGulLogo({ className = 'h-9 w-auto' }) {
  const uid = useId().replace(/:/g, '');
  const idBevel = `${uid}-bevel`;
  const idMain = `${uid}-main`;
  const idRight = `${uid}-right`;
  const idRibbon = `${uid}-ribbon`;
  const idArc = `${uid}-arc`;
  const idInner = `${uid}-inner`;
  const idArm = `${uid}-arm`;
  const idCorner = `${uid}-corner`;
  const idNode = `${uid}-node`;
  const idGlow = `${uid}-glow`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 116"
      fill="none"
      aria-hidden="true"
      className={`${className} shrink-0 select-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]`}
    >
      <defs>
        <linearGradient id={idBevel} x1="10" y1="16" x2="26" y2="102" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#608FD4" />
          <stop offset="50%" stopColor="#2A589C" />
          <stop offset="100%" stopColor="#163566" />
        </linearGradient>
        <linearGradient id={idMain} x1="18" y1="10" x2="36" y2="106" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="55%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id={idRight} x1="68" y1="8" x2="88" y2="108" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="55%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>
        <linearGradient id={idRibbon} x1="10" y1="68" x2="100" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="35%" stopColor="#2563EB" />
          <stop offset="75%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#93C5FD" />
        </linearGradient>
        <linearGradient id={idArc} x1="88" y1="12" x2="164" y2="106" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="35%" stopColor="#1D4ED8" />
          <stop offset="72%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id={idInner} x1="94" y1="22" x2="152" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="55%" stopColor="#172554" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id={idArm} x1="124" y1="47" x2="170" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="55%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        <linearGradient id={idCorner} x1="120" y1="108" x2="168" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="60%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <radialGradient id={idNode} cx="42%" cy="38%" r="55%">
          <stop offset="0%" stopColor="#EFF6FF" />
          <stop offset="45%" stopColor="#60A5FA" />
          <stop offset="82%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </radialGradient>
        <filter id={idGlow} x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur stdDeviation="0.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path d="M 48 27 Q 63 58 48 89" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" />

      <polygon points="8,22 18,16 18,98 8,104" fill={`url(#${idBevel})`} />
      <polygon points="18,16 29,10 29,104 18,98" fill={`url(#${idMain})`} />

      <polygon points="69,16 86,6 86,101 69,111" fill={`url(#${idRight})`} />

      <path
        d="M 8 68 C 22 48, 56 62, 86 35 L 86 48 C 56 76, 22 61, 8 79 Z"
        fill={`url(#${idRibbon})`}
        filter={`url(#${idGlow})`}
      />

      <g filter={`url(#${idGlow})`}>
        <circle cx="48" cy="27" r="9.6" fill="#172554" stroke="#60A5FA" strokeWidth="1.2" />
        <circle cx="48" cy="27" r="6.6" fill={`url(#${idNode})`} />

        <circle cx="48" cy="89" r="9.6" fill="#172554" stroke="#60A5FA" strokeWidth="1.2" />
        <circle cx="48" cy="89" r="6.6" fill={`url(#${idNode})`} />
      </g>

      <path
        d="M 164 21
           C 148 7, 117 6, 98 22
           C 78 39, 77 77, 98 96
           C 118 113, 150 111, 168 94
           L 152 82
           C 138 96, 118 96, 108 82
           C 96 66, 97 44, 110 31
           C 122 20, 141 21, 151 31
           Z"
        fill={`url(#${idArc})`}
      />

      <path
        d="M 151 31
           C 140 20, 119 19, 106 31
           C 92 45, 92 71, 105 86
           C 117 98, 138 98, 152 82
           L 156 85
           C 141 102, 115 103, 101 89
           C 86 73, 86 43, 102 27
           C 117 14, 142 15, 156 27
           Z"
        fill={`url(#${idInner})`}
        opacity="0.72"
      />

      <path
        d="M 122 108 C 142 109, 158 103, 169 93 L 152 82 C 143 93, 134 100, 122 108 Z"
        fill={`url(#${idCorner})`}
      />

      <polygon points="124,47 170,47 156,60 124,60" fill={`url(#${idArm})`} />
      <polygon points="170,47 170,94 156,83 156,60" fill="#1E40AF" />

      <line
        x1="127"
        y1="56"
        x2="93"
        y2="89"
        stroke="#60A5FA"
        strokeWidth="2.4"
        strokeLinecap="round"
        filter={`url(#${idGlow})`}
      />

      <g filter={`url(#${idGlow})`}>
        <circle cx="129" cy="54" r="9.6" fill="#172554" stroke="#60A5FA" strokeWidth="1.2" />
        <circle cx="129" cy="54" r="6.6" fill={`url(#${idNode})`} />
      </g>
    </svg>
  );
}
