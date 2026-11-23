import { HonorsSection } from './HonorsSection';
import { LecturesSection } from './LecturesSection';
import { SectionDivider } from './SectionDivider';

export { HonorsSection, LecturesSection };

export function HonorsAndLecturesSection() {
  return (
    <>
      <HonorsSection />
      <SectionDivider />
      <LecturesSection />
    </>
  );
}
