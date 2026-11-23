import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { PROFILE_INFO as INITIAL_PROFILE } from '../data/profileInfo.js';
import localProfileOverride from '../data/localProfileOverride.json';
import {
  PUBLICATIONS as INITIAL_PUBLICATIONS,
  EXPERIENCE_TIMELINE as INITIAL_EXPERIENCE,
  EDUCATION_TIMELINE as INITIAL_EDUCATION,
  YOUTUBE_LECTURES as INITIAL_LECTURES,
  RESEARCH_PILLARS as INITIAL_PILLARS,
  OPEN_SOURCE_PROJECTS as INITIAL_PROJECTS,
  HONORS_AND_SERVICE as INITIAL_HONORS,
  CERTIFICATIONS as INITIAL_CERTS,
} from '../data/portfolioData.js';
import {
  fetchLivePortfolioData,
  isSupabaseConfigured,
} from '../lib/supabase.js';

const PortfolioDataContext = createContext(null);

function getInitialProfile() {
  let base = INITIAL_PROFILE;
  if (localProfileOverride && typeof localProfileOverride === 'object' && Object.keys(localProfileOverride).length > 0) {
    base = mapDbProfileToLocal(localProfileOverride, INITIAL_PROFILE);
  }
  if (typeof window === 'undefined') return base;
  try {
    const cached = localStorage.getItem('portfolio_profile_override');
    if (cached) {
      const parsed = JSON.parse(cached);
      return mapDbProfileToLocal(parsed, base);
    }
  } catch (e) {
    console.warn('Could not read cached profile override', e);
  }
  return base;
}

function mapDbProfileToLocal(dbProfile, localFallback) {
  if (!dbProfile) return localFallback;
  return {
    ...localFallback,
    name: dbProfile.name || localFallback.name,
    title: dbProfile.title || localFallback.title,
    affiliation: dbProfile.affiliation || localFallback.affiliation,
    fellowshipTitle: dbProfile.fellowship_title || dbProfile.fellowshipTitle || localFallback.fellowshipTitle,
    fellowshipInstitution: dbProfile.fellowship_institution || dbProfile.fellowshipInstitution || localFallback.fellowshipInstitution,
    summary: dbProfile.summary || localFallback.summary,
    photoUrl: dbProfile.photo_url || dbProfile.photoUrl || localFallback.photoUrl,
    photoWebpUrl: dbProfile.photo_url || dbProfile.photoWebpUrl || localFallback.photoWebpUrl,
    photoCaption: dbProfile.photo_caption || dbProfile.photoCaption || localFallback.photoCaption,
    splashAvatarUrl: dbProfile.splash_avatar_url || dbProfile.splashAvatarUrl || '/assets/aistudio/image_f655c344.png',
    splashBio:
      dbProfile.splash_bio ||
      dbProfile.splashBio ||
      'Ph.D. (AI) Researcher | NLP Knowledge Graphs | Transformers | LLMs | Generative AI | GNNs | Machine-Deep Learning',
    splashFellowship:
      dbProfile.splash_fellowship ||
      dbProfile.splashFellowship ||
      dbProfile.fellowship_title ||
      '2025 DAAD AInet Fellow',
    phone: dbProfile.phone || localFallback.phone,
    location: dbProfile.location || localFallback.location,
    scopusId: dbProfile.scopus_id || dbProfile.scopusId || localFallback.scopusId,
    cvUrl: dbProfile.cv_url || dbProfile.cvUrl || localFallback.cvUrl,
    emails: {
      academic: dbProfile.email_academic || dbProfile.emails?.academic || localFallback.emails.academic,
      personal: dbProfile.email_personal || dbProfile.emails?.personal || localFallback.emails.personal,
    },
    metrics: {
      citations: Number(dbProfile.citations ?? dbProfile.metrics?.citations ?? localFallback.metrics.citations),
      hIndex: Number(dbProfile.h_index ?? dbProfile.metrics?.hIndex ?? localFallback.metrics.hIndex),
      i10Index: Number(dbProfile.i10_index ?? dbProfile.metrics?.i10Index ?? localFallback.metrics.i10Index),
      publications: Number(dbProfile.publications_count ?? dbProfile.metrics?.publications ?? localFallback.metrics.publications),
      videos: Number(dbProfile.videos_count ?? dbProfile.metrics?.videos ?? localFallback.metrics.videos),
    },
    links: {
      scholar: dbProfile.link_scholar || dbProfile.links?.scholar || localFallback.links.scholar,
      scopus: dbProfile.link_scopus || dbProfile.links?.scopus || localFallback.links.scopus,
      linkedin: dbProfile.link_linkedin || dbProfile.links?.linkedin || localFallback.links.linkedin,
      youtube: dbProfile.link_youtube || dbProfile.links?.youtube || localFallback.links.youtube,
      github: dbProfile.link_github || dbProfile.links?.github || localFallback.links.github,
      orcid: dbProfile.link_orcid || dbProfile.links?.orcid || localFallback.links.orcid,
    },
  };
}

function mapDbPublicationToLocal(dbPub) {
  let highlights = dbPub.highlights || [];
  if (typeof highlights === 'string') {
    try { highlights = JSON.parse(highlights); } catch { highlights = highlights.split('\n').filter(Boolean); }
  }
  if (!Array.isArray(highlights)) highlights = [];

  let keywords = dbPub.keywords || [];
  if (typeof keywords === 'string') {
    try { keywords = JSON.parse(keywords); } catch { keywords = keywords.split(',').map((s) => s.trim()); }
  }
  if (!Array.isArray(keywords) || keywords.length === 0) {
    keywords = highlights;
  }

  const fallback = INITIAL_PUBLICATIONS.find((p) => p.id === dbPub.id) || {};
  const indexNum = dbPub.index_num || fallback.index || 1;
  const padIndex = String(indexNum).padStart(2, '0');
  const defaultFigureUrl = fallback.figureUrl || `/assets/diagrams/pub-${padIndex}.png`;
  const figureUrl = dbPub.figure_url || dbPub.figureUrl || dbPub.schematic_image || defaultFigureUrl;
  const figureCaption =
    dbPub.figure_caption || dbPub.figureCaption || dbPub.schematic_caption || fallback.figureCaption || '';
  const schematic = dbPub.schematic || fallback.schematic || 'bert-kg';

  return {
    id: dbPub.id,
    index: indexNum,
    title: dbPub.title || fallback.title || '',
    authors: dbPub.authors || fallback.authors || '',
    venue: dbPub.venue || fallback.venue || '',
    publisher: dbPub.publisher || fallback.publisher || '',
    year: Number(dbPub.year || fallback.year) || 2024,
    citations: Number(dbPub.citations ?? fallback.citations ?? 0),
    category: dbPub.category || fallback.category || 'kg-llm',
    categoryLabel: dbPub.category_label || dbPub.categoryLabel || fallback.categoryLabel || 'Research',
    status: dbPub.status || fallback.status || undefined,
    badge: dbPub.badge || fallback.badge || undefined,
    doi: dbPub.doi || fallback.doi || undefined,
    paperUrl: dbPub.paper_url || dbPub.paperUrl || fallback.paperUrl || undefined,
    codeUrl: dbPub.code_url || dbPub.codeUrl || fallback.codeUrl || undefined,
    githubUrl: dbPub.code_url || dbPub.codeUrl || fallback.githubUrl || undefined,
    mirrorGithubUrl: fallback.mirrorGithubUrl || undefined,
    datasetUrl: dbPub.dataset_url || dbPub.datasetUrl || fallback.datasetUrl || undefined,
    scholarUrl: dbPub.scholar_url || dbPub.scholarUrl || fallback.scholarUrl || undefined,
    abstract: dbPub.abstract || fallback.abstract || '',
    bibtex: dbPub.bibtex || fallback.bibtex || '',
    schematic,
    figureUrl,
    figureCaption,
    hasSchematic: Boolean(dbPub.has_schematic ?? dbPub.hasSchematic ?? true),
    schematicImage: figureUrl,
    schematicCaption: figureCaption,
    schematicSourceLabel: dbPub.schematic_source_label || dbPub.schematicSourceLabel || undefined,
    highlights: highlights.length > 0 ? highlights : (fallback.highlights || []),
    keywords: keywords.length > 0 ? keywords : (fallback.keywords || []),
  };
}

function mapDbExperienceToLocal(dbExp) {
  let details = dbExp.details || dbExp.highlights || [];
  if (typeof details === 'string') {
    try { details = JSON.parse(details); } catch { details = details.split('\n').filter(Boolean); }
  }
  if (!Array.isArray(details)) details = [];

  let skills = dbExp.skills || [];
  if (typeof skills === 'string') {
    try { skills = JSON.parse(skills); } catch { skills = skills.split(',').map((s) => s.trim()); }
  }
  if (!Array.isArray(skills)) skills = [];

  const roleTitle = dbExp.role || dbExp.roleOrDegree || dbExp.role_or_degree || '';
  const desc = dbExp.description || dbExp.summary || '';

  return {
    id: dbExp.id,
    period: dbExp.period || '',
    role: roleTitle,
    roleOrDegree: roleTitle,
    institution: dbExp.institution || '',
    institutionUrl: dbExp.institution_url || dbExp.institutionUrl || '',
    department: dbExp.department || '',
    location: dbExp.location || '',
    description: desc,
    summary: desc,
    details,
    highlights: details,
    skills,
    isCurrent: Boolean(dbExp.is_current ?? dbExp.isCurrent),
    type: dbExp.type || 'academic',
  };
}

function mapDbEducationToLocal(dbEdu) {
  let details = dbEdu.details || dbEdu.highlights || [];
  if (typeof details === 'string') {
    try { details = JSON.parse(details); } catch { details = details.split('\n').filter(Boolean); }
  }
  if (!Array.isArray(details)) details = [];

  const degree = dbEdu.degree || '';
  const field = dbEdu.field || '';
  const roleTitle = degree ? `${degree}${field ? ` in ${field}` : ''}` : (dbEdu.roleOrDegree || dbEdu.role_or_degree || '');
  const desc = dbEdu.description || dbEdu.summary || '';

  return {
    id: dbEdu.id,
    period: dbEdu.period || '',
    degree,
    field,
    roleOrDegree: roleTitle,
    institution: dbEdu.institution || '',
    institutionUrl: dbEdu.institution_url || dbEdu.institutionUrl || '',
    location: dbEdu.location || '',
    description: desc,
    summary: desc,
    details,
    highlights: details,
    isCurrent: Boolean(dbEdu.is_current ?? dbEdu.isCurrent),
  };
}

function mapDbLectureToLocal(dbLec) {
  let topics = dbLec.topics || [];
  if (typeof topics === 'string') {
    try { topics = JSON.parse(topics); } catch { topics = topics.split(',').map((s) => s.trim()); }
  }
  if (!Array.isArray(topics)) topics = [];

  const videoCount = Number(dbLec.video_count ?? dbLec.videoCount ?? 0);
  const dur = dbLec.duration || '';
  const durCount =
    dbLec.durationOrCount ||
    dbLec.duration_or_count ||
    (videoCount > 0 ? `${videoCount} Videos` : (dur || 'Full YouTube Playlist'));

  return {
    id: dbLec.id,
    title: dbLec.title || '',
    courseCode: dbLec.course_code || dbLec.courseCode || '',
    platform: dbLec.platform || 'YouTube',
    videoCount,
    duration: dur,
    durationOrCount: durCount,
    series: dbLec.series || dbLec.course_code || 'University-Level Series',
    topics,
    url: dbLec.url || dbLec.playlist_url || dbLec.playlistUrl || 'https://youtube.com/@hajigul5733',
    playlistUrl: dbLec.playlist_url || dbLec.playlistUrl || dbLec.url || 'https://youtube.com/@hajigul5733',
    thumbnailUrl:
      dbLec.thumbnail_url || dbLec.thumbnailUrl || '/assets/portfolio/Graph_theory_playlist_564fcae5.jpg',
    description: dbLec.description || '',
  };
}

function mapDbHonorToLocal(dbHonor) {
  return {
    id: dbHonor.id,
    year: String(dbHonor.year || ''),
    title: dbHonor.title || '',
    issuer: dbHonor.issuer || '',
    description: dbHonor.description || '',
    linkLabel: dbHonor.linkLabel || dbHonor.link_label || 'Fellow profile',
    linkUrl: dbHonor.linkUrl || dbHonor.link_url || '',
  };
}

function mapDbCertToLocal(dbCert) {
  let skills = dbCert.skills || [];
  if (typeof skills === 'string') {
    try { skills = JSON.parse(skills); } catch { skills = skills.split(',').map((s) => s.trim()); }
  }
  if (!Array.isArray(skills)) skills = [];

  return {
    id: dbCert.id,
    title: dbCert.title || '',
    issuer: dbCert.issuer || '',
    issuedDate: dbCert.issuedDate || dbCert.issued_date || '',
    credentialId: dbCert.credentialId || dbCert.credential_id || '',
    credentialUrl: dbCert.credentialUrl || dbCert.credential_url || '',
    verifyUrl: dbCert.verifyUrl || dbCert.verify_url || dbCert.credentialUrl || '',
    imageUrl: dbCert.imageUrl || dbCert.image_url || '/assets/portfolio/image_f8574988.png',
    skills,
  };
}

function mapDbPillarToLocal(dbPillar) {
  let focusModels = dbPillar.focus_models || dbPillar.focusModels || [];
  if (typeof focusModels === 'string') {
    try { focusModels = JSON.parse(focusModels); } catch { focusModels = focusModels.split(',').map((s) => s.trim()); }
  }
  if (!Array.isArray(focusModels)) focusModels = [];

  return {
    id: dbPillar.id,
    number: dbPillar.number || '01',
    title: dbPillar.title || '',
    subtitle: dbPillar.subtitle || '',
    description: dbPillar.description || '',
    focusModels,
    filterCategory: dbPillar.filter_category || dbPillar.filterCategory || 'kg-llm',
  };
}

function mapDbProjectToLocal(dbProj) {
  let stack = dbProj.stack || [];
  if (typeof stack === 'string') {
    try { stack = JSON.parse(stack); } catch { stack = stack.split(',').map((s) => s.trim()); }
  }
  if (!Array.isArray(stack)) stack = [];

  let relatedRepos = dbProj.related_repos || dbProj.relatedRepos || [];
  if (typeof relatedRepos === 'string') {
    try { relatedRepos = JSON.parse(relatedRepos); } catch { relatedRepos = []; }
  }
  if (!Array.isArray(relatedRepos)) relatedRepos = [];

  return {
    id: dbProj.id,
    name: dbProj.name || '',
    subtitle: dbProj.subtitle || '',
    category: dbProj.category || 'proposed-methods',
    description: dbProj.description || '',
    stack,
    repoUrl: dbProj.repoUrl || dbProj.repo_url || '',
    mirrorUrl: dbProj.mirrorUrl || dbProj.mirror_url || '',
    scholarUrl: dbProj.scholarUrl || dbProj.scholar_url || '',
    featured: Boolean(dbProj.featured),
    relatedRepos,
  };
}

export function PortfolioDataProvider({ children }) {
  const [profile, setProfile] = useState(getInitialProfile);
  const [publications, setPublications] = useState(INITIAL_PUBLICATIONS);
  const [experience, setExperience] = useState(INITIAL_EXPERIENCE);
  const [education, setEducation] = useState(INITIAL_EDUCATION);
  const [lectures, setLectures] = useState(INITIAL_LECTURES);
  const [pillars, setPillars] = useState(INITIAL_PILLARS);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [honors, setHonors] = useState(INITIAL_HONORS);
  const [certifications, setCertifications] = useState(INITIAL_CERTS);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);
  const [isLiveFromDb, setIsLiveFromDb] = useState(false);

  const reloadData = useCallback(async () => {
    // If local storage has override, ensure it's loaded
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('portfolio_profile_override');
        if (cached) {
          const parsed = JSON.parse(cached);
          setProfile((prev) => mapDbProfileToLocal(parsed, prev));
        }
      } catch (e) {
        // no-op
      }
    }

    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await fetchLivePortfolioData();
      if (data) {
        if (data.profile) {
          let shouldApplyDb = true;
          if (typeof window !== 'undefined') {
            try {
              const cachedStr = localStorage.getItem('portfolio_profile_override');
              if (cachedStr) {
                const cached = JSON.parse(cachedStr);
                const localSavedAt = Number(cached._saved_at || 0);
                const dbUpdatedAt = data.profile.updated_at ? new Date(data.profile.updated_at).getTime() : 0;
                // If local edits were saved after the database row was updated, preserve the user's edits!
                if (localSavedAt > dbUpdatedAt) {
                  shouldApplyDb = false;
                  setProfile((prev) => mapDbProfileToLocal(cached, prev));
                }
              }
            } catch (e) {
              // no-op
            }
          }

          if (shouldApplyDb) {
            const mappedProfile = mapDbProfileToLocal(data.profile, INITIAL_PROFILE);
            setProfile(mappedProfile);
            if (typeof window !== 'undefined') {
              try {
                localStorage.setItem('portfolio_profile_override', JSON.stringify({ ...data.profile, _saved_at: Date.now() }));
              } catch (e) {
                // no-op
              }
            }
          }
        }
        if (data.publications && data.publications.length > 0) {
          setPublications(data.publications.map(mapDbPublicationToLocal));
        }
        if (data.experience && data.experience.length > 0) {
          setExperience(data.experience.map(mapDbExperienceToLocal));
        }
        if (data.education && data.education.length > 0) {
          setEducation(data.education.map(mapDbEducationToLocal));
        }
        if (data.lectures && data.lectures.length > 0) {
          setLectures(data.lectures.map(mapDbLectureToLocal));
        }
        if (data.pillars && data.pillars.length > 0) {
          setPillars(data.pillars.map(mapDbPillarToLocal));
        }
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects.map(mapDbProjectToLocal));
        }
        if (data.honors && data.honors.length > 0) {
          setHonors(data.honors.map(mapDbHonorToLocal));
        }
        if (data.certifications && data.certifications.length > 0) {
          setCertifications(data.certifications.map(mapDbCertToLocal));
        }
        setIsLiveFromDb(true);
      }
    } catch (err) {
      console.warn('Error reloading portfolio data from database:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reloadData();
  }, [reloadData]);

  return (
    <PortfolioDataContext.Provider
      value={{
        profile,
        publications,
        experience,
        education,
        lectures,
        pillars,
        projects,
        honors,
        certifications,
        isLoading,
        isLiveFromDb,
        isSupabaseConfigured,
        reloadData,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return context;
}
