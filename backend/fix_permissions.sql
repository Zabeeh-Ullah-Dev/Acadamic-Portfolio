-- ============================================================
-- FIX TABLE PERMISSIONS, SCHEMA & LOCK DOWN RLS
-- Run this in Supabase SQL Editor (SQL Editor -> New Query)
-- ============================================================

-- 1. Ensure pre-loading screen columns exist on portfolio_profile
ALTER TABLE IF EXISTS public.portfolio_profile
  ADD COLUMN IF NOT EXISTS splash_avatar_url TEXT DEFAULT '/assets/aistudio/image_f655c344.png',
  ADD COLUMN IF NOT EXISTS splash_bio TEXT DEFAULT 'Ph.D. (AI) Researcher | NLP Knowledge Graphs | Transformers | LLMs | Generative AI | GNNs | Machine-Deep Learning',
  ADD COLUMN IF NOT EXISTS splash_fellowship TEXT DEFAULT '2025 DAAD AInet Fellow';

-- 2. Ensure experience & education columns exist and have safe defaults
ALTER TABLE IF EXISTS public.portfolio_experience
  ADD COLUMN IF NOT EXISTS institution_url TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS skills JSONB DEFAULT '[]'::JSONB,
  ADD COLUMN IF NOT EXISTS is_current BOOLEAN DEFAULT FALSE;

ALTER TABLE IF EXISTS public.portfolio_experience
  ALTER COLUMN role DROP NOT NULL,
  ALTER COLUMN period DROP NOT NULL,
  ALTER COLUMN institution DROP NOT NULL;

ALTER TABLE IF EXISTS public.portfolio_education
  ADD COLUMN IF NOT EXISTS institution_url TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS is_current BOOLEAN DEFAULT FALSE;

-- 3. Ensure publication, lecture, and project columns exist
ALTER TABLE IF EXISTS public.portfolio_publications
  ADD COLUMN IF NOT EXISTS schematic_image TEXT,
  ADD COLUMN IF NOT EXISTS schematic_caption TEXT,
  ADD COLUMN IF NOT EXISTS schematic_source_label TEXT,
  ADD COLUMN IF NOT EXISTS figure_url TEXT,
  ADD COLUMN IF NOT EXISTS figure_caption TEXT,
  ADD COLUMN IF NOT EXISTS scholar_url TEXT,
  ADD COLUMN IF NOT EXISTS keywords JSONB DEFAULT '[]'::JSONB;

ALTER TABLE IF EXISTS public.portfolio_lectures
  ADD COLUMN IF NOT EXISTS series TEXT,
  ADD COLUMN IF NOT EXISTS topics JSONB DEFAULT '[]'::JSONB;

ALTER TABLE IF EXISTS public.portfolio_projects
  ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS related_repos JSONB DEFAULT '[]'::JSONB;

ALTER TABLE IF EXISTS public.portfolio_certifications
  ADD COLUMN IF NOT EXISTS "credentialUrl" TEXT,
  ADD COLUMN IF NOT EXISTS "imageUrl" TEXT,
  ADD COLUMN IF NOT EXISTS "logoUrl" TEXT;

-- 4. Grant read-only to anon, full access to authenticated admin & service_role
GRANT USAGE ON SCHEMA public TO anon, authenticated;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO authenticated, service_role;

-- 5. Strict Admin Helper (prevents console signUp + write attacks)
CREATE OR REPLACE FUNCTION public.is_portfolio_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
AS $$
  SELECT COALESCE(auth.jwt() ->> 'email', '') IN (
    '23h1710@ubd.edu.bn',
    'hajigul1993@gmail.com'
  );
$$;

-- 6. Enable RLS on all 9 portfolio tables (Public SELECT, Admin-Email-Only Write)
ALTER TABLE IF EXISTS public.portfolio_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.portfolio_publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.portfolio_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.portfolio_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.portfolio_lectures ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.portfolio_research_pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.portfolio_honors ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.portfolio_certifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all on profile" ON public.portfolio_profile;
DROP POLICY IF EXISTS "Allow public read on profile" ON public.portfolio_profile;
DROP POLICY IF EXISTS "Allow admin all on profile" ON public.portfolio_profile;
CREATE POLICY "Allow public read on profile" ON public.portfolio_profile FOR SELECT USING (true);
CREATE POLICY "Allow admin all on profile" ON public.portfolio_profile FOR ALL TO authenticated USING (public.is_portfolio_admin()) WITH CHECK (public.is_portfolio_admin());

DROP POLICY IF EXISTS "Allow all on publications" ON public.portfolio_publications;
DROP POLICY IF EXISTS "Allow public read on publications" ON public.portfolio_publications;
DROP POLICY IF EXISTS "Allow admin all on publications" ON public.portfolio_publications;
CREATE POLICY "Allow public read on publications" ON public.portfolio_publications FOR SELECT USING (true);
CREATE POLICY "Allow admin all on publications" ON public.portfolio_publications FOR ALL TO authenticated USING (public.is_portfolio_admin()) WITH CHECK (public.is_portfolio_admin());

DROP POLICY IF EXISTS "Allow all on experience" ON public.portfolio_experience;
DROP POLICY IF EXISTS "Allow public read on experience" ON public.portfolio_experience;
DROP POLICY IF EXISTS "Allow admin all on experience" ON public.portfolio_experience;
CREATE POLICY "Allow public read on experience" ON public.portfolio_experience FOR SELECT USING (true);
CREATE POLICY "Allow admin all on experience" ON public.portfolio_experience FOR ALL TO authenticated USING (public.is_portfolio_admin()) WITH CHECK (public.is_portfolio_admin());

DROP POLICY IF EXISTS "Allow all on education" ON public.portfolio_education;
DROP POLICY IF EXISTS "Allow public read on education" ON public.portfolio_education;
DROP POLICY IF EXISTS "Allow admin all on education" ON public.portfolio_education;
CREATE POLICY "Allow public read on education" ON public.portfolio_education FOR SELECT USING (true);
CREATE POLICY "Allow admin all on education" ON public.portfolio_education FOR ALL TO authenticated USING (public.is_portfolio_admin()) WITH CHECK (public.is_portfolio_admin());

DROP POLICY IF EXISTS "Allow all on lectures" ON public.portfolio_lectures;
DROP POLICY IF EXISTS "Allow public read on lectures" ON public.portfolio_lectures;
DROP POLICY IF EXISTS "Allow admin all on lectures" ON public.portfolio_lectures;
CREATE POLICY "Allow public read on lectures" ON public.portfolio_lectures FOR SELECT USING (true);
CREATE POLICY "Allow admin all on lectures" ON public.portfolio_lectures FOR ALL TO authenticated USING (public.is_portfolio_admin()) WITH CHECK (public.is_portfolio_admin());

DROP POLICY IF EXISTS "Allow all on pillars" ON public.portfolio_research_pillars;
DROP POLICY IF EXISTS "Allow public read on pillars" ON public.portfolio_research_pillars;
DROP POLICY IF EXISTS "Allow admin all on pillars" ON public.portfolio_research_pillars;
CREATE POLICY "Allow public read on pillars" ON public.portfolio_research_pillars FOR SELECT USING (true);
CREATE POLICY "Allow admin all on pillars" ON public.portfolio_research_pillars FOR ALL TO authenticated USING (public.is_portfolio_admin()) WITH CHECK (public.is_portfolio_admin());

DROP POLICY IF EXISTS "Allow all on projects" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Allow public read on projects" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Allow admin all on projects" ON public.portfolio_projects;
CREATE POLICY "Allow public read on projects" ON public.portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Allow admin all on projects" ON public.portfolio_projects FOR ALL TO authenticated USING (public.is_portfolio_admin()) WITH CHECK (public.is_portfolio_admin());

DROP POLICY IF EXISTS "Allow all on honors" ON public.portfolio_honors;
DROP POLICY IF EXISTS "Allow public read on honors" ON public.portfolio_honors;
DROP POLICY IF EXISTS "Allow admin all on honors" ON public.portfolio_honors;
CREATE POLICY "Allow public read on honors" ON public.portfolio_honors FOR SELECT USING (true);
CREATE POLICY "Allow admin all on honors" ON public.portfolio_honors FOR ALL TO authenticated USING (public.is_portfolio_admin()) WITH CHECK (public.is_portfolio_admin());

DROP POLICY IF EXISTS "Allow all on certs" ON public.portfolio_certifications;
DROP POLICY IF EXISTS "Allow public read on certs" ON public.portfolio_certifications;
DROP POLICY IF EXISTS "Allow admin all on certs" ON public.portfolio_certifications;
CREATE POLICY "Allow public read on certs" ON public.portfolio_certifications FOR SELECT USING (true);
CREATE POLICY "Allow admin all on certs" ON public.portfolio_certifications FOR ALL TO authenticated USING (public.is_portfolio_admin()) WITH CHECK (public.is_portfolio_admin());

-- 7. Restrict Storage bucket writes to Admin Email Only
DROP POLICY IF EXISTS "Allow admin upload portfolio-media" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin update portfolio-media" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin delete portfolio-media" ON storage.objects;
CREATE POLICY "Allow admin upload portfolio-media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-media' AND public.is_portfolio_admin());
CREATE POLICY "Allow admin update portfolio-media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-media' AND public.is_portfolio_admin());
CREATE POLICY "Allow admin delete portfolio-media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-media' AND public.is_portfolio_admin());
