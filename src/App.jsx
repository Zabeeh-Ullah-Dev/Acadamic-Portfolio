/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { HonorsAndLecturesSection } from './components/HonorsAndLecturesSection';
import { Navbar } from './components/Navbar';
import { PublicationModal } from './components/PublicationModal';
import { PublicationsSection } from './components/PublicationsSection';
import { ResearchSection } from './components/ResearchSection';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { SectionDivider } from './components/SectionDivider';
import { TimelineSection } from './components/TimelineSection';

export default function App() {
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState('year-desc');
  const [onlyWithCode, setOnlyWithCode] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);

  const handleSelectTopic = (nextCategory, nextQuery = '') => {
    setCategory(nextCategory);
    setSearchQuery(nextQuery);
    setOnlyWithCode(false);
    const el = document.getElementById('publications');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setCategory('all');
    setSearchQuery('');
    setSortMode('year-desc');
    setOnlyWithCode(false);
  };

  return (
    <div className="min-h-screen bg-[#0C0F14] text-[#F3F5F8]">
      <Navbar />
      <main>
        <HeroSection />
        <SectionDivider />
        <ResearchSection onSelectTopic={handleSelectTopic} />
        <SectionDivider />
        <PublicationsSection
          category={category}
          searchQuery={searchQuery}
          sortMode={sortMode}
          onlyWithCode={onlyWithCode}
          onCategoryChange={setCategory}
          onSearchChange={setSearchQuery}
          onSortChange={setSortMode}
          onToggleOnlyWithCode={() => setOnlyWithCode((prev) => !prev)}
          onResetFilters={handleResetFilters}
          onSelectPublication={setSelectedPublication}
        />
        <SectionDivider />
        <TimelineSection />
        <SectionDivider />
        <HonorsAndLecturesSection />
        <SectionDivider />
        <ContactSection />
      </main>
      <Footer />
      <PublicationModal
        publication={selectedPublication}
        onClose={() => setSelectedPublication(null)}
      />
      <ScrollToTopButton />
    </div>
  );
}
