export function PublicationSchematic({ type, seed = 1, figureUrl, title }) {
  if (figureUrl || type === 'local-paths-similarity') {
    const src = figureUrl || '/physica_local_paths_diagram.png';
    const isSciReports = src.includes('scientific_reports');
    const badgeText = isSciReports ? 'Figure 1 · Nature Sci Rep' : 'Fig. 1 · Physica A';

    return (
      <div className="relative flex h-full w-full items-center justify-center bg-white p-2 transition-transform duration-300 group-hover:scale-[1.015]">
        <img
          src={src}
          alt={title || 'Publication Diagram'}
          className="h-full w-full object-contain"
          loading="lazy"
        />
        <span className="pointer-events-none absolute bottom-1.5 right-2 rounded bg-[#0A0D12]/90 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-[#93C5FD] shadow-md backdrop-blur-sm">
          {badgeText}
        </span>
      </div>
    );
  }

  const shift = (seed % 5) * 2;

  switch (type) {
    case 'bert-kg':
      return (
        <svg viewBox="0 0 260 110" className="h-full w-full" aria-hidden="true">
          <rect x="0" y="0" width="260" height="110" fill="#0A0D12" />
          <g stroke="rgba(148, 163, 184, 0.16)" strokeWidth="1" strokeDasharray="3 3">
            <line x1="20" y1="55" x2="240" y2="55" />
          </g>
          <line x1="36" y1="30" x2="72" y2="55" stroke="#1E40AF" strokeWidth="1.5" />
          <line x1="36" y1="80" x2="72" y2="55" stroke="#1E40AF" strokeWidth="1.5" />
          <line x1="72" y1="55" x2="112" y2="55" stroke="#3B82F6" strokeWidth="1.8" />
          <circle cx="36" cy="30" r="6" fill="#0A0D12" stroke="#3B82F6" strokeWidth="2" />
          <circle cx="36" cy="80" r="6" fill="#0A0D12" stroke="#3B82F6" strokeWidth="2" />
          <circle cx="72" cy="55" r="8" fill="#0A0D12" stroke="#F3F5F8" strokeWidth="2.4" />
          <rect
            x="112"
            y="29"
            width="54"
            height="52"
            rx="6"
            fill="#141922"
            stroke="#3B82F6"
            strokeWidth="1.4"
          />
          <line x1="122" y1="44" x2="156" y2="44" stroke="#60A5FA" strokeWidth="2" />
          <line x1="122" y1="55" x2="156" y2="55" stroke="#3B82F6" strokeWidth="2" />
          <line x1="122" y1="66" x2="156" y2="66" stroke="#1E40AF" strokeWidth="2" />
          <line
            x1="166"
            y1="55"
            x2="216"
            y2={42 + shift}
            stroke="#3B82F6"
            strokeWidth="1.8"
            strokeDasharray="4 2"
          />
          <circle
            cx="222"
            cy={42 + shift}
            r="9"
            fill="#0A0D12"
            stroke="#60A5FA"
            strokeWidth="2.4"
          />
          <circle cx="222" cy={42 + shift} r="3" fill="#3B82F6" />
        </svg>
      );

    case 'bipartite-drug':
      return (
        <svg viewBox="0 0 260 110" className="h-full w-full" aria-hidden="true">
          <rect x="0" y="0" width="260" height="110" fill="#0A0D12" />
          <line x1="56" y1="26" x2="204" y2="28" stroke="#1E40AF" strokeWidth="1.4" opacity="0.7" />
          <line x1="56" y1="26" x2="204" y2="56" stroke="#3B82F6" strokeWidth="1.8" />
          <line x1="56" y1="56" x2="204" y2="28" stroke="#334155" strokeWidth="1.2" />
          <line x1="56" y1="56" x2="204" y2="84" stroke="#60A5FA" strokeWidth="1.8" strokeDasharray="4 2" />
          <line x1="56" y1="84" x2="204" y2="56" stroke="#1E40AF" strokeWidth="1.4" />
          <line x1="56" y1="84" x2="204" y2="84" stroke="#3B82F6" strokeWidth="1.6" />
          {[26, 56, 84].map((y, idx) => (
            <g key={`d-${y}`}>
              <circle
                cx="56"
                cy={y}
                r={idx === 1 ? 8 : 6.5}
                fill="#0A0D12"
                stroke="#3B82F6"
                strokeWidth="2.2"
              />
              <rect
                x="196"
                y={y - 7}
                width="14"
                height="14"
                rx="3"
                fill="#141922"
                stroke={idx === 2 ? '#F3F5F8' : '#60A5FA'}
                strokeWidth="1.8"
              />
            </g>
          ))}
          <text x="20" y="18" fontSize="8" fontFamily="monospace" fill="#8B95A5">
            DRUG
          </text>
          <text x="216" y="18" fontSize="8" fontFamily="monospace" fill="#8B95A5">
            TARGET
          </text>
        </svg>
      );

    case 'spectral-curve':
      return (
        <svg viewBox="0 0 260 110" className="h-full w-full" aria-hidden="true">
          <rect x="0" y="0" width="260" height="110" fill="#0A0D12" />
          <line x1="30" y1="90" x2="236" y2="90" stroke="#334155" strokeWidth="1.2" />
          <line x1="30" y1="18" x2="30" y2="90" stroke="#334155" strokeWidth="1.2" />
          <path
            d={`M 32 82 Q 80 ${22 + shift}, 130 50 T 230 28`}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2.2"
          />
          <path
            d="M 32 84 Q 95 62, 155 68 T 230 46"
            fill="none"
            stroke="#1E40AF"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <circle cx="88" cy={38 + shift / 2} r="4.5" fill="#0A0D12" stroke="#60A5FA" strokeWidth="2.2" />
          <circle cx="156" cy="49" r="4.5" fill="#0A0D12" stroke="#F3F5F8" strokeWidth="2.2" />
          <text x="38" y="24" fontSize="8" fontFamily="monospace" fill="#8B95A5">
            λ(L) SPECTRUM
          </text>
        </svg>
      );

    case 'edas-radar':
      return (
        <svg viewBox="0 0 260 110" className="h-full w-full" aria-hidden="true">
          <rect x="0" y="0" width="260" height="110" fill="#0A0D12" />
          <g transform="translate(86, 55)">
            <polygon
              points="0,-36 34,-11 21,29 -21,29 -34,-11"
              fill="none"
              stroke="#334155"
              strokeWidth="1"
            />
            <polygon
              points="0,-22 21,-7 13,18 -13,18 -21,-7"
              fill="none"
              stroke="#334155"
              strokeWidth="1"
            />
            <polygon
              points="0,-31 28,-8 14,24 -18,16 -26,-9"
              fill="rgba(37, 99, 235, 0.22)"
              stroke="#3B82F6"
              strokeWidth="1.8"
            />
            <circle cx="0" cy="-31" r="3" fill="#F3F5F8" />
            <circle cx="28" cy="-8" r="3" fill="#F3F5F8" />
          </g>
          <g transform="translate(152, 24)">
            {[0, 1, 2, 3].map((row) => (
              <g key={row} transform={`translate(0, ${row * 17})`}>
                <rect x="0" y="0" width="76" height="8" rx="4" fill="#1E293B" />
                <rect
                  x="0"
                  y="0"
                  width={44 + ((row * 11 + seed * 5) % 30)}
                  height="8"
                  rx="4"
                  fill={row === 0 ? '#60A5FA' : '#1D4ED8'}
                />
              </g>
            ))}
          </g>
        </svg>
      );

    case 'community-clusters':
      return (
        <svg viewBox="0 0 260 110" className="h-full w-full" aria-hidden="true">
          <rect x="0" y="0" width="260" height="110" fill="#0A0D12" />
          <circle cx="78" cy="56" r="32" fill="rgba(37, 99, 235, 0.1)" stroke="#3B82F6" strokeDasharray="3 3" strokeWidth="1.2" />
          <circle cx="182" cy="54" r="30" fill="rgba(29, 78, 216, 0.12)" stroke="#2563EB" strokeDasharray="3 3" strokeWidth="1.2" />
          <line x1="92" y1="54" x2="168" y2="54" stroke="#60A5FA" strokeWidth="1.8" />
          <line x1="65" y1="42" x2="92" y2="54" stroke="#3B82F6" strokeWidth="1.4" />
          <line x1="65" y1="70" x2="92" y2="54" stroke="#3B82F6" strokeWidth="1.4" />
          <line x1="168" y1="54" x2="195" y2="40" stroke="#2563EB" strokeWidth="1.4" />
          <line x1="168" y1="54" x2="195" y2="68" stroke="#2563EB" strokeWidth="1.4" />
          {[
            [65, 42],
            [65, 70],
            [92, 54],
            [168, 54],
            [195, 40],
            [195, 68],
          ].map(([cx, cy], idx) => (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r={idx === 2 || idx === 3 ? 6.5 : 4.5}
              fill="#0A0D12"
              stroke={idx === 2 || idx === 3 ? '#F3F5F8' : '#3B82F6'}
              strokeWidth="2"
            />
          ))}
        </svg>
      );

    case 'gnn-cascade':
      return (
        <svg viewBox="0 0 260 110" className="h-full w-full" aria-hidden="true">
          <rect x="0" y="0" width="260" height="110" fill="#0A0D12" />
          <line x1="50" y1="55" x2="110" y2="30" stroke="#3B82F6" strokeWidth="1.6" />
          <line x1="50" y1="55" x2="110" y2="80" stroke="#3B82F6" strokeWidth="1.6" />
          <line x1="110" y1="30" x2="175" y2="20" stroke="#1E40AF" strokeWidth="1.4" />
          <line x1="110" y1="30" x2="175" y2="46" stroke="#60A5FA" strokeWidth="1.7" />
          <line x1="110" y1="80" x2="175" y2="70" stroke="#1E40AF" strokeWidth="1.4" />
          <line x1="110" y1="80" x2="175" y2="92" stroke="#1E40AF" strokeWidth="1.4" />
          <line x1="175" y1="46" x2="225" y2="46" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="50" cy="55" r="8" fill="#0A0D12" stroke="#F3F5F8" strokeWidth="2.4" />
          {[
            [110, 30],
            [110, 80],
            [175, 20],
            [175, 46],
            [175, 70],
            [175, 92],
            [225, 46],
          ].map(([cx, cy], idx) => (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r={idx < 2 ? 6 : 4.5}
              fill="#0A0D12"
              stroke={idx === 3 ? '#60A5FA' : '#3B82F6'}
              strokeWidth="2"
            />
          ))}
        </svg>
      );

    case 'ics-shield':
      return (
        <svg viewBox="0 0 260 110" className="h-full w-full" aria-hidden="true">
          <rect x="0" y="0" width="260" height="110" fill="#0A0D12" />
          <line x1="40" y1="55" x2="108" y2="55" stroke="#3B82F6" strokeWidth="1.7" />
          <line x1="152" y1="55" x2="220" y2="55" stroke="#2563EB" strokeWidth="1.7" />
          <rect x="28" y="42" width="26" height="26" rx="4" fill="#141922" stroke="#3B82F6" strokeWidth="1.8" />
          <rect x="206" y="42" width="26" height="26" rx="4" fill="#141922" stroke="#3B82F6" strokeWidth="1.8" />
          <path
            d="M130 22 L156 32 V56 C156 72 144 84 130 90 C116 84 104 72 104 56 V32 Z"
            fill="#141922"
            stroke="#F3F5F8"
            strokeWidth="2"
          />
          <circle cx="130" cy="54" r="9" fill="#0A0D12" stroke="#3B82F6" strokeWidth="2.2" />
          <circle cx="130" cy="54" r="3" fill="#60A5FA" />
        </svg>
      );

    case 'shortest-path':
    default:
      return (
        <svg viewBox="0 0 260 110" className="h-full w-full" aria-hidden="true">
          <rect x="0" y="0" width="260" height="110" fill="#0A0D12" />
          <line x1="42" y1="55" x2="100" y2="26" stroke="#334155" strokeWidth="1.5" />
          <line x1="100" y1="26" x2="165" y2="28" stroke="#334155" strokeWidth="1.5" />
          <line x1="165" y1="28" x2="218" y2="55" stroke="#334155" strokeWidth="1.5" />
          <line x1="42" y1="55" x2="104" y2="78" stroke="#3B82F6" strokeWidth="1.8" />
          <line x1="104" y1="78" x2="164" y2="76" stroke="#3B82F6" strokeWidth="1.8" />
          <line
            x1="164"
            y1="76"
            x2="218"
            y2="55"
            stroke="#60A5FA"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          {[
            [42, 55, true],
            [100, 26, false],
            [165, 28, false],
            [104, 78, false],
            [164, 76, false],
            [218, 55, true],
          ].map(([cx, cy, endpoint], idx) => (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r={endpoint ? 7.5 : 5.5}
              fill="#0A0D12"
              stroke={endpoint ? '#F3F5F8' : '#3B82F6'}
              strokeWidth="2.1"
            />
          ))}
        </svg>
      );
  }
}
