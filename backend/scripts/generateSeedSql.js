import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PROFILE_INFO } from '../../frontend/src/data/profileInfo.js';
import {
  PUBLICATIONS,
  EXPERIENCE_TIMELINE,
  EDUCATION_TIMELINE,
  YOUTUBE_LECTURES,
  RESEARCH_PILLARS,
  OPEN_SOURCE_PROJECTS,
  HONORS_AND_SERVICE,
  CERTIFICATIONS,
} from '../../frontend/src/data/portfolioData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

function escapeJson(obj) {
  if (!obj) return `'[]'::jsonb`;
  return `'${JSON.stringify(obj).replace(/'/g, "''")}'::jsonb`;
}

let sql = `-- ============================================================
-- HAJI GUL PORTFOLIO - INITIAL SEED DATA
-- Run after schema.sql in Supabase SQL Editor
-- ============================================================

-- 1. SEED PROFILE
INSERT INTO public.portfolio_profile (
  id, name, title, affiliation, fellowship_title, fellowship_institution,
  summary, photo_url, photo_caption, email_academic, email_personal,
  phone, location, scopus_id, citations, h_index, i10_index,
  publications_count, videos_count, link_scholar, link_scopus,
  link_linkedin, link_youtube, link_github, link_orcid, cv_url
) VALUES (
  'primary',
  ${escapeSql(PROFILE_INFO.name)},
  ${escapeSql(PROFILE_INFO.title)},
  ${escapeSql(PROFILE_INFO.affiliation)},
  ${escapeSql(PROFILE_INFO.fellowshipTitle)},
  ${escapeSql(PROFILE_INFO.fellowshipInstitution)},
  ${escapeSql(PROFILE_INFO.summary)},
  ${escapeSql(PROFILE_INFO.photoWebpUrl || PROFILE_INFO.photoUrl)},
  ${escapeSql(PROFILE_INFO.photoCaption)},
  ${escapeSql(PROFILE_INFO.emails.academic)},
  ${escapeSql(PROFILE_INFO.emails.personal)},
  ${escapeSql(PROFILE_INFO.phone)},
  ${escapeSql(PROFILE_INFO.location)},
  ${escapeSql(PROFILE_INFO.scopusId)},
  ${PROFILE_INFO.metrics.citations || 0},
  ${PROFILE_INFO.metrics.hIndex || 0},
  ${PROFILE_INFO.metrics.i10Index || 0},
  ${PROFILE_INFO.metrics.publications || 0},
  ${PROFILE_INFO.metrics.videos || 0},
  ${escapeSql(PROFILE_INFO.links.scholar)},
  ${escapeSql(PROFILE_INFO.links.scopus)},
  ${escapeSql(PROFILE_INFO.links.linkedin)},
  ${escapeSql(PROFILE_INFO.links.youtube)},
  ${escapeSql(PROFILE_INFO.links.github)},
  ${escapeSql(PROFILE_INFO.links.orcid)},
  ${escapeSql(PROFILE_INFO.cvUrl)}
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  title = EXCLUDED.title,
  affiliation = EXCLUDED.affiliation,
  citations = EXCLUDED.citations,
  h_index = EXCLUDED.h_index,
  i10_index = EXCLUDED.i10_index,
  publications_count = EXCLUDED.publications_count,
  videos_count = EXCLUDED.videos_count,
  updated_at = NOW();

-- 2. SEED PUBLICATIONS
`;

for (const pub of PUBLICATIONS) {
  sql += `INSERT INTO public.portfolio_publications (
  id, index_num, title, authors, venue, publisher, year, citations,
  category, category_label, status, badge, doi, paper_url, code_url,
  dataset_url, abstract, bibtex, has_schematic, schematic_image,
  schematic_caption, schematic_source_label, highlights
) VALUES (
  ${escapeSql(pub.id)},
  ${pub.index || 1},
  ${escapeSql(pub.title)},
  ${escapeSql(pub.authors)},
  ${escapeSql(pub.venue)},
  ${escapeSql(pub.publisher)},
  ${pub.year || 2025},
  ${pub.citations || 0},
  ${escapeSql(pub.category || 'kg-llm')},
  ${escapeSql(pub.categoryLabel || 'Research')},
  ${escapeSql(pub.status)},
  ${escapeSql(pub.badge)},
  ${escapeSql(pub.doi)},
  ${escapeSql(pub.paperUrl)},
  ${escapeSql(pub.codeUrl)},
  ${escapeSql(pub.datasetUrl)},
  ${escapeSql(pub.abstract)},
  ${escapeSql(pub.bibtex)},
  ${pub.figureUrl || pub.hasSchematic ? 'TRUE' : 'FALSE'},
  ${escapeSql(pub.figureUrl || pub.schematicImage)},
  ${escapeSql(pub.figureCaption || pub.schematicCaption)},
  ${escapeSql(pub.schematicSourceLabel)},
  ${escapeJson(pub.highlights || [])}
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  citations = EXCLUDED.citations,
  year = EXCLUDED.year,
  updated_at = NOW();\n\n`;
}

sql += `\n-- 3. SEED EXPERIENCE TIMELINE\n`;
let expOrder = 0;
for (const exp of EXPERIENCE_TIMELINE) {
  expOrder++;
  sql += `INSERT INTO public.portfolio_experience (
  id, role, institution, department, location, period, type, description, highlights, order_num
) VALUES (
  ${escapeSql(exp.id)},
  ${escapeSql(exp.role || exp.roleOrDegree || 'Faculty / Researcher')},
  ${escapeSql(exp.institution || 'University')},
  ${escapeSql(exp.department || '')},
  ${escapeSql(exp.location || '')},
  ${escapeSql(exp.period || 'Present')},
  ${escapeSql(exp.type || 'academic')},
  ${escapeSql(exp.description || exp.summary || '')},
  ${escapeJson(exp.highlights || exp.details || [])},
  ${expOrder}
)
ON CONFLICT (id) DO NOTHING;\n\n`;
}

sql += `\n-- 4. SEED EDUCATION TIMELINE\n`;
let eduOrder = 0;
for (const edu of EDUCATION_TIMELINE) {
  eduOrder++;
  sql += `INSERT INTO public.portfolio_education (
  id, degree, field, institution, location, period, description, highlights, order_num
) VALUES (
  ${escapeSql(edu.id)},
  ${escapeSql(edu.degree || edu.roleOrDegree || 'Ph.D.')},
  ${escapeSql(edu.field || edu.roleOrDegree || 'Computer Science / AI')},
  ${escapeSql(edu.institution || 'University')},
  ${escapeSql(edu.location || '')},
  ${escapeSql(edu.period || '')},
  ${escapeSql(edu.description || edu.summary || '')},
  ${escapeJson(edu.highlights || edu.details || [])},
  ${eduOrder}
)
ON CONFLICT (id) DO NOTHING;\n\n`;
}

sql += `\n-- 5. SEED VIDEO LECTURES\n`;
let lecOrder = 0;
for (const lec of YOUTUBE_LECTURES) {
  lecOrder++;
  sql += `INSERT INTO public.portfolio_lectures (
  id, title, course_code, platform, video_count, duration, thumbnail_url, playlist_url, description, order_num
) VALUES (
  ${escapeSql(lec.id)},
  ${escapeSql(lec.title || 'Course Series')},
  ${escapeSql(lec.courseCode || lec.series || 'CS')},
  ${escapeSql(lec.platform || 'YouTube')},
  ${lec.videoCount || 0},
  ${escapeSql(lec.duration || lec.durationOrCount || 'Full Playlist')},
  ${escapeSql(lec.thumbnailUrl || '')},
  ${escapeSql(lec.playlistUrl || lec.url || '')},
  ${escapeSql(lec.description || '')},
  ${lecOrder}
)
ON CONFLICT (id) DO NOTHING;\n\n`;
}

sql += `\n-- 6. SEED RESEARCH PILLARS\n`;
let pillarOrder = 0;
for (const pil of RESEARCH_PILLARS) {
  pillarOrder++;
  sql += `INSERT INTO public.portfolio_research_pillars (
  id, number, title, subtitle, description, "focusModels", "filterCategory", order_num
) VALUES (
  ${escapeSql(pil.id)},
  ${escapeSql(pil.number || '01')},
  ${escapeSql(pil.title || 'Research Focus')},
  ${escapeSql(pil.subtitle || '')},
  ${escapeSql(pil.description || '')},
  ${escapeJson(pil.focusModels || [])},
  ${escapeSql(pil.filterCategory || 'kg-llm')},
  ${pillarOrder}
)
ON CONFLICT (id) DO NOTHING;\n\n`;
}

sql += `\n-- 7. SEED OPEN SOURCE PROJECTS\n`;
let projOrder = 0;
for (const proj of OPEN_SOURCE_PROJECTS) {
  projOrder++;
  sql += `INSERT INTO public.portfolio_projects (
  id, name, subtitle, category, description, stack, "repoUrl", "mirrorUrl", "scholarUrl", order_num
) VALUES (
  ${escapeSql(proj.id)},
  ${escapeSql(proj.name || 'Tool')},
  ${escapeSql(proj.subtitle || '')},
  ${escapeSql(proj.category || 'proposed-methods')},
  ${escapeSql(proj.description || '')},
  ${escapeJson(proj.stack || [])},
  ${escapeSql(proj.repoUrl || '')},
  ${escapeSql(proj.mirrorUrl || '')},
  ${escapeSql(proj.scholarUrl || '')},
  ${projOrder}
)
ON CONFLICT (id) DO NOTHING;\n\n`;
}

sql += `\n-- 8. SEED HONORS & SERVICE\n`;
let honorOrder = 0;
for (const hon of HONORS_AND_SERVICE) {
  honorOrder++;
  sql += `INSERT INTO public.portfolio_honors (
  id, year, title, issuer, description, "linkLabel", "linkUrl", order_num
) VALUES (
  ${escapeSql(hon.id)},
  ${escapeSql(hon.year || '2025')},
  ${escapeSql(hon.title || 'Award')},
  ${escapeSql(hon.issuer || 'Academic Institution')},
  ${escapeSql(hon.description || '')},
  ${escapeSql(hon.linkLabel || '')},
  ${escapeSql(hon.linkUrl || '')},
  ${honorOrder}
)
ON CONFLICT (id) DO NOTHING;\n\n`;
}

sql += `\n-- 9. SEED CERTIFICATIONS\n`;
let certOrder = 0;
for (const cert of CERTIFICATIONS) {
  certOrder++;
  sql += `INSERT INTO public.portfolio_certifications (
  id, title, issuer, "issuedDate", "credentialId", "verificationUrl", skills, order_num
) VALUES (
  ${escapeSql(cert.id)},
  ${escapeSql(cert.title || 'Certification')},
  ${escapeSql(cert.issuer || 'Online Platform')},
  ${escapeSql(cert.issuedDate || cert.year || '2025')},
  ${escapeSql(cert.credentialId || '')},
  ${escapeSql(cert.verificationUrl || cert.verifyUrl || cert.credentialUrl || '')},
  ${escapeJson(cert.skills || [])},
  ${certOrder}
)
ON CONFLICT (id) DO NOTHING;\n\n`;
}

const outputPath = path.resolve(__dirname, '../seed.sql');
fs.writeFileSync(outputPath, sql, 'utf8');
console.log('Seed SQL generated successfully at ' + outputPath);
