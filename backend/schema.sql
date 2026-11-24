-- ============================================================
-- HAJI GUL ACADEMIC PORTFOLIO - SUPABASE DATABASE SCHEMA
-- Run this script in your Supabase SQL Editor (SQL Editor -> New Query)
-- ============================================================

-- 1. PROFILE & TELEMETRY TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_profile (
  id TEXT PRIMARY KEY DEFAULT 'primary',
  name TEXT NOT NULL DEFAULT 'Haji Gul',
  title TEXT NOT NULL DEFAULT 'PhD Researcher in Artificial Intelligence',
  affiliation TEXT NOT NULL DEFAULT 'School of Digital Science, Universiti Brunei Darussalam',
  fellowship_title TEXT DEFAULT 'DAAD AInet Short-Term Fellow in Natural Language Processing',
  fellowship_institution TEXT DEFAULT 'Leuphana University, Germany',
  summary TEXT,
  photo_url TEXT DEFAULT '/assets/portfolio/Haji_gul_33eec388.webp',
  photo_caption TEXT DEFAULT 'Research Collaboration · DAAD AInet Fellowship Cohort, Germany',
  email_academic TEXT DEFAULT '23h1710@ubd.edu.bn',
  email_personal TEXT DEFAULT 'hajigul1993@gmail.com',
  phone TEXT DEFAULT '+92-307-8297663',
  location TEXT DEFAULT 'School of Digital Science, Universiti Brunei Darussalam, Jalan Tungku Link, Gadong BE1410, Brunei Darussalam',
  scopus_id TEXT DEFAULT '57218363906',
  citations INT DEFAULT 376,
  h_index INT DEFAULT 10,
  i10_index INT DEFAULT 11,
  publications_count INT DEFAULT 32,
  videos_count INT DEFAULT 219,
  link_scholar TEXT,
  link_scopus TEXT,
  link_linkedin TEXT,
  link_youtube TEXT,
  link_github TEXT,
  link_orcid TEXT,
  cv_url TEXT DEFAULT '/Haji_Gul_CV.pdf',
  splash_avatar_url TEXT DEFAULT '/assets/aistudio/image_f655c344.png',
  splash_bio TEXT DEFAULT 'Ph.D. (AI) Researcher | NLP Knowledge Graphs | Transformers | LLMs | Generative AI | GNNs | Machine-Deep Learning',
  splash_fellowship TEXT DEFAULT '2025 DAAD AInet Fellow',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PUBLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_publications (
  id TEXT PRIMARY KEY,
  index_num INT NOT NULL DEFAULT 1,
  title TEXT NOT NULL,
  authors TEXT NOT NULL,
  venue TEXT NOT NULL,
  publisher TEXT,
  year INT NOT NULL,
  citations INT DEFAULT 0,
  category TEXT NOT NULL DEFAULT 'kg-llm',
  category_label TEXT DEFAULT 'Knowledge Graphs & LLMs',
  status TEXT,
  badge TEXT,
  doi TEXT,
  paper_url TEXT,
  code_url TEXT,
  dataset_url TEXT,
  abstract TEXT,
  bibtex TEXT,
  has_schematic BOOLEAN DEFAULT FALSE,
  schematic_image TEXT,
  schematic_caption TEXT,
  schematic_source_label TEXT,
  highlights JSONB DEFAULT '[]'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. EXPERIENCE TIMELINE TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_experience (
  id TEXT PRIMARY KEY,
  role TEXT DEFAULT 'Researcher',
  institution TEXT DEFAULT 'Institution',
  department TEXT DEFAULT '',
  location TEXT DEFAULT '',
  period TEXT DEFAULT 'Present',
  type TEXT DEFAULT 'research',
  description TEXT DEFAULT '',
  highlights JSONB DEFAULT '[]'::JSONB,
  order_num INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EDUCATION TIMELINE TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_education (
  id TEXT PRIMARY KEY,
  degree TEXT DEFAULT 'Degree',
  field TEXT DEFAULT 'Field',
  institution TEXT DEFAULT 'University',
  location TEXT DEFAULT '',
  period TEXT DEFAULT '',
  description TEXT DEFAULT '',
  highlights JSONB DEFAULT '[]'::JSONB,
  order_num INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. VIDEO LECTURES TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_lectures (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  course_code TEXT,
  platform TEXT DEFAULT 'YouTube',
  video_count INT DEFAULT 0,
  duration TEXT,
  thumbnail_url TEXT,
  playlist_url TEXT,
  description TEXT,
  order_num INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. RESEARCH PILLARS TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_research_pillars (
  id TEXT PRIMARY KEY,
  number TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  "focusModels" JSONB DEFAULT '[]'::JSONB,
  "filterCategory" TEXT DEFAULT 'kg-llm',
  order_num INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. OPEN SOURCE PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT,
  category TEXT DEFAULT 'proposed-methods',
  description TEXT,
  stack JSONB DEFAULT '[]'::JSONB,
  "repoUrl" TEXT,
  "mirrorUrl" TEXT,
  "scholarUrl" TEXT,
  order_num INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. HONORS & SERVICE TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_honors (
  id TEXT PRIMARY KEY,
  year TEXT,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  description TEXT,
  "linkLabel" TEXT,
  "linkUrl" TEXT,
  order_num INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_certifications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  "issuedDate" TEXT,
  "credentialId" TEXT,
  "credentialUrl" TEXT,
  "verificationUrl" TEXT,
  "imageUrl" TEXT,
  "logoUrl" TEXT,
  skills JSONB DEFAULT '[]'::JSONB,
  order_num INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.portfolio_certifications ADD COLUMN IF NOT EXISTS "logoUrl" TEXT;
ALTER TABLE public.portfolio_certifications ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;
ALTER TABLE public.portfolio_certifications ADD COLUMN IF NOT EXISTS "credentialUrl" TEXT;

-- 10. ENABLE ROW-LEVEL SECURITY (RLS)
ALTER TABLE public.portfolio_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_lectures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_research_pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_honors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_certifications ENABLE ROW LEVEL SECURITY;

-- 11. GRANT PERMISSIONS TO POSTGRES ROLES
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

-- 12. DEFINE ACCESS POLICIES:
DROP POLICY IF EXISTS "Allow public read on profile" ON public.portfolio_profile;
DROP POLICY IF EXISTS "Allow admin all on profile" ON public.portfolio_profile;
CREATE POLICY "Allow all on profile" ON public.portfolio_profile FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on publications" ON public.portfolio_publications;
DROP POLICY IF EXISTS "Allow admin all on publications" ON public.portfolio_publications;
CREATE POLICY "Allow all on publications" ON public.portfolio_publications FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on experience" ON public.portfolio_experience;
DROP POLICY IF EXISTS "Allow admin all on experience" ON public.portfolio_experience;
CREATE POLICY "Allow all on experience" ON public.portfolio_experience FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on education" ON public.portfolio_education;
DROP POLICY IF EXISTS "Allow admin all on education" ON public.portfolio_education;
CREATE POLICY "Allow all on education" ON public.portfolio_education FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on lectures" ON public.portfolio_lectures;
DROP POLICY IF EXISTS "Allow admin all on lectures" ON public.portfolio_lectures;
CREATE POLICY "Allow all on lectures" ON public.portfolio_lectures FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on pillars" ON public.portfolio_research_pillars;
DROP POLICY IF EXISTS "Allow admin all on pillars" ON public.portfolio_research_pillars;
CREATE POLICY "Allow all on pillars" ON public.portfolio_research_pillars FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on projects" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Allow admin all on projects" ON public.portfolio_projects;
CREATE POLICY "Allow all on projects" ON public.portfolio_projects FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on honors" ON public.portfolio_honors;
DROP POLICY IF EXISTS "Allow admin all on honors" ON public.portfolio_honors;
CREATE POLICY "Allow all on honors" ON public.portfolio_honors FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on certs" ON public.portfolio_certifications;
DROP POLICY IF EXISTS "Allow admin all on certs" ON public.portfolio_certifications;
CREATE POLICY "Allow all on certs" ON public.portfolio_certifications FOR ALL USING (true) WITH CHECK (true);

-- 8. STORAGE BUCKET FOR MEDIA UPLOADS (CV, diagrams, images)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: Public can view images/PDFs, only logged-in admin can upload/delete
CREATE POLICY "Allow public view portfolio-media" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'portfolio-media');

CREATE POLICY "Allow admin upload portfolio-media" 
ON storage.objects FOR INSERT TO authenticated 
WITH CHECK (bucket_id = 'portfolio-media');

CREATE POLICY "Allow admin update portfolio-media" 
ON storage.objects FOR UPDATE TO authenticated 
USING (bucket_id = 'portfolio-media');

CREATE POLICY "Allow admin delete portfolio-media" 
ON storage.objects FOR DELETE TO authenticated 
USING (bucket_id = 'portfolio-media');
