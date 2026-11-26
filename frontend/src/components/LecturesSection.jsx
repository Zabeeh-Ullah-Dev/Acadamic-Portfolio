import {
  ArrowUpRight,
  Play,
  Video,
} from 'lucide-react';
import {
  PROFILE_INFO,
  YOUTUBE_LECTURES as DEFAULT_LECTURES,
} from '../data/portfolioData';
import { usePortfolioData } from '../context/PortfolioContext';
import { YouTubeIcon } from './BrandIcons';

function LectureThumbnail({ src, title }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden border-b border-white/10 bg-[#0A0D12]">
      <img
        src={src}
        alt={title}
        width={800}
        height={450}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0C0F14]/75 to-transparent" />

      <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#0C0F14]/90 px-2.5 py-1 font-mono text-[11px] font-medium text-[#F3F5F8] shadow-lg backdrop-blur-sm transition-transform duration-200 group-hover:scale-105 group-hover:border-[#3B82F6]">
        <Play className="h-3 w-3 fill-current text-[#60A5FA]" />
        <span>Playlist</span>
      </span>
    </div>
  );
}

export function LecturesSection() {
  const portfolioData = usePortfolioData();
  const YOUTUBE_LECTURES = portfolioData?.lectures || DEFAULT_LECTURES;

  return (
    <section
      id="lectures"
      className="section-defer bg-[#10141B] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#60A5FA]">
              Open Pedagogy &amp; Video Courses
            </p>
            <h2 className="mt-2.5 text-3xl font-bold tracking-tight text-[#F3F5F8] sm:text-4xl">
              YouTube Lectures &amp; Tutorials
            </h2>
            <p className="mt-3 text-base leading-relaxed tracking-[0.01em] text-[#C4CCD6]">
              Over 219 educational lecture videos and 500+ subscribers exploring Graph Theory, Complex Network Datasets, MATLAB computational physics, and Data Structures.
            </p>
          </div>

          <a
            href={PROFILE_INFO.links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#2563EB] px-5 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-950/50 transition-colors hover:bg-[#3B82F6] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
          >
            <YouTubeIcon className="h-4 w-4 shrink-0" />
            <span>Visit @hajigul5733</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div
          data-testid="youtube-playlists-grid"
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {YOUTUBE_LECTURES.map((lecture) => {
            const topics = Array.isArray(lecture.topics)
              ? lecture.topics
              : typeof lecture.topics === 'string'
              ? [lecture.topics]
              : [];
            const lectureUrl =
              lecture.url || lecture.playlistUrl || 'https://youtube.com/@hajigul5733';
            const seriesLabel =
              lecture.series || lecture.courseCode || 'University-Level Series';
            const durationLabel =
              lecture.durationOrCount ||
              (lecture.videoCount
                ? `${lecture.videoCount} Videos`
                : lecture.duration || 'Full YouTube Playlist');

            return (
              <a
                key={lecture.id}
                href={lectureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B82F6]/45 focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
              >
                <div>
                  <LectureThumbnail
                    src={
                      lecture.thumbnailUrl ||
                      '/assets/portfolio/Graph_theory_playlist_564fcae5.jpg'
                    }
                    title={lecture.title}
                  />
                  <div className="p-5 sm:p-6">
                    <p className="font-mono text-xs text-[#60A5FA]">
                      {seriesLabel} · {durationLabel}
                    </p>
                    <h3 className="mt-2 text-base font-semibold leading-snug text-[#F3F5F8] transition-colors group-hover:text-[#60A5FA]">
                      {lecture.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed tracking-[0.01em] text-[#C4CCD6]">
                      {lecture.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 bg-[#0A0D12]/70 px-5 py-3.5 text-xs text-[#8B95A5] sm:px-6">
                  <span className="truncate">{topics.join(' · ')}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#60A5FA]" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
