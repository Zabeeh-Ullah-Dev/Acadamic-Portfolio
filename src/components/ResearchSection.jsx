import { useState } from 'react';
import { ArrowRight, Network, Cpu, Activity } from 'lucide-react';
import { RESEARCH_KEYWORDS, RESEARCH_PILLARS } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SkillBubbleCloud } from './SkillBubbleCloud';

const PILLAR_ICONS = [Network, Activity, Cpu];

export function ResearchSection({ onSelectTopic }) {
  const [sectionRef, revealed] = useScrollReveal({ threshold: 0.06 });
  const [activePillarId, setActivePillarId] = useState(null);

  return (
    <section
      id="research"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#10141B] py-20 sm:py-24"
    >
      {/* Subtle top spatial radial wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(37,99,235,0.09),transparent_55%)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Editorial Biography & Interactive Focus Selectors */}
          <div
            className={`lg:col-span-5 transition-all duration-500 ${
              revealed ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
          >
            <p className="font-mono text-xs font-medium tracking-[0.04em] text-[#60A5FA]">
              01 // RESEARCH ARCHITECTURE
            </p>
            <h2 className="mt-2.5 text-3xl font-bold tracking-tight text-[#F3F5F8] sm:text-4xl">
              Bridging Knowledge Graphs and Language Models
            </h2>
            <p className="mt-5 text-sm leading-relaxed tracking-[0.01em] text-[#C4CCD6] sm:text-base">
              At the School of Digital Science, Universiti Brunei Darussalam, Haji Gul investigates how pre-trained Transformers and Large Language Models can reason over large-scale relational graphs without costly negative sampling.
            </p>
            <p className="mt-4 text-sm leading-relaxed tracking-[0.01em] text-[#8B95A5] sm:text-base">
              His foundation in statistical complex networks—spanning protein–protein interaction networks (Yeast, <em>C. elegans</em>, <em>E. coli</em>) and social topologies (Karate, Dolphins)—informs rigorous spectral and meta-metric evaluation frameworks.
            </p>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="font-mono text-xs font-medium text-[#8B95A5]">
                Jump to Publications by Topic
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {RESEARCH_KEYWORDS.map((keyword) => (
                  <button
                    key={keyword}
                    type="button"
                    onClick={() => onSelectTopic('all', keyword)}
                    className="rounded-xl border border-white/12 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-[#C4CCD6] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#3B82F6] hover:bg-[#2563EB]/15 hover:text-[#93C5FD] hover:shadow-[0_6px_18px_-6px_rgba(37,99,235,0.45)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 2050 Architectural Research Pillars */}
          <div className="space-y-4 lg:col-span-7">
            {RESEARCH_PILLARS.map((pillar, idx) => {
              const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
              const isHighlighted = activePillarId === pillar.id;
              return (
                <article
                  key={pillar.id}
                  onMouseEnter={() => setActivePillarId(pillar.id)}
                  onMouseLeave={() => setActivePillarId(null)}
                  style={{ transitionDelay: revealed ? `${idx * 85}ms` : '0ms' }}
                  className={`glass-panel group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${
                    revealed
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-4 opacity-0'
                  } ${
                    isHighlighted
                      ? '-translate-y-0.5 border-[#3B82F6]/65 bg-gradient-to-br from-[#172554]/35 via-[#131924] to-[#0E131B] shadow-[inset_0_1px_0_rgba(147,197,253,0.22),0_18px_40px_-16px_rgba(37,99,235,0.4)]'
                      : 'border-white/10 hover:border-[#3B82F6]/50'
                  }`}
                >
                  {/* Precision corner reticles on active/hover */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute left-2.5 top-2.5 h-3 w-3 border-l border-t transition-opacity duration-200 ${
                      isHighlighted ? 'border-[#93C5FD] opacity-90' : 'border-[#60A5FA] opacity-0 group-hover:opacity-60'
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute right-2.5 bottom-2.5 h-3 w-3 border-b border-r transition-opacity duration-200 ${
                      isHighlighted ? 'border-[#93C5FD] opacity-90' : 'border-[#60A5FA] opacity-0 group-hover:opacity-60'
                    }`}
                  />

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="relative mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-[#0C1017] text-[#60A5FA] transition-all duration-200 group-hover:scale-105 group-hover:border-[#3B82F6] group-hover:text-[#93C5FD] group-hover:shadow-[0_0_24px_-4px_rgba(37,99,235,0.65)]">
                        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-[#60A5FA]">
                          <span>Pillar {pillar.number}</span>
                          <span aria-hidden="true" className="text-white/25">·</span>
                          <span className="text-[#8B95A5]">{pillar.subtitle}</span>
                        </div>

                        <h3 className="mt-1.5 text-xl font-semibold text-[#F3F5F8] transition-colors group-hover:text-white">
                          {pillar.title}
                        </h3>

                        <p className="mt-2.5 text-sm leading-relaxed tracking-[0.01em] text-[#C4CCD6]">
                          {pillar.description}
                        </p>

                        <p className="mt-3 font-mono text-xs text-[#60A5FA]/80">
                          {pillar.focusModels.join(' · ')}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectTopic(pillar.filterCategory, '')}
                      className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-[#60A5FA] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#3B82F6] hover:bg-[#2563EB]/20 hover:text-white whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                    >
                      <span>View papers</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Interactive 3D-Style Research Skill Bubble Cloud */}
        <SkillBubbleCloud onSelectTopic={onSelectTopic} />
      </div>
    </section>
  );
}

