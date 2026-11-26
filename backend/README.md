# Backend Architecture (Supabase PostgreSQL + Auth + Storage)

This folder contains all backend database scripts and configurations for the portfolio.

## Files:
- **`schema.sql`**: Creates database tables (`portfolio_profile`, `portfolio_publications`, `portfolio_experience`, `portfolio_education`, `portfolio_lectures`), configures Row-Level Security (RLS) policies, and creates the `portfolio-media` storage bucket.
- **`seed.sql`**: Automatically inserts all initial 32 publications, citations counters, trajectory milestones, and video course playlists.

## How to Apply:
1. Open your [Supabase Dashboard](https://supabase.com/dashboard/project/siqibjnaxaoaqxbtasbm).
2. Go to **SQL Editor** (`>_`).
3. Paste and run `schema.sql`.
4. Paste and run `seed.sql`.
