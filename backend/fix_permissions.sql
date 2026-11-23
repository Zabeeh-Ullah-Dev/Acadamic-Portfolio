-- ============================================================
-- FIX TABLE PERMISSIONS & SCHEMA (Run this in Supabase SQL Editor)
-- ============================================================

-- 1. Ensure pre-loading screen columns exist on portfolio_profile
ALTER TABLE IF EXISTS public.portfolio_profile
  ADD COLUMN IF NOT EXISTS splash_avatar_url TEXT DEFAULT '/assets/aistudio/image_f655c344.png',
  ADD COLUMN IF NOT EXISTS splash_bio TEXT DEFAULT 'Ph.D. (AI) Researcher | NLP Knowledge Graphs | Transformers | LLMs | Generative AI | GNNs | Machine-Deep Learning',
  ADD COLUMN IF NOT EXISTS splash_fellowship TEXT DEFAULT '2025 DAAD AInet Fellow';

-- 2. Ensure experience table constraints have safe defaults and don't fail on nulls
ALTER TABLE IF EXISTS public.portfolio_experience
  ALTER COLUMN role DROP NOT NULL,
  ALTER COLUMN period DROP NOT NULL,
  ALTER COLUMN institution DROP NOT NULL;

-- 3. Ensure publication figure columns exist
ALTER TABLE IF EXISTS public.portfolio_publications
  ADD COLUMN IF NOT EXISTS schematic_image TEXT,
  ADD COLUMN IF NOT EXISTS schematic_caption TEXT,
  ADD COLUMN IF NOT EXISTS schematic_source_label TEXT,
  ADD COLUMN IF NOT EXISTS figure_url TEXT,
  ADD COLUMN IF NOT EXISTS figure_caption TEXT;

-- 4. Grant full permissions on public schema to database roles
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

-- 5. Open RLS on all 9 portfolio tables (allows anon key to read and write without permission denied)
ALTER TABLE IF EXISTS public.portfolio_profile DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.portfolio_publications DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.portfolio_experience DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.portfolio_education DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.portfolio_lectures DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.portfolio_research_pillars DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.portfolio_projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.portfolio_honors DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.portfolio_certifications DISABLE ROW LEVEL SECURITY;

