import { ServiceReviewerBoard } from './ServiceReviewerBoard';

export function AcademicServiceSection() {
  return (
    <section
      id="academic-service-page"
      className="section-defer relative overflow-hidden bg-[#0C0F14] py-16 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.1),transparent_60%)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ServiceReviewerBoard />
      </div>
    </section>
  );
}
