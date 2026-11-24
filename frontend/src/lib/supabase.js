import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project') &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseAnonKey.includes('your-') &&
    !supabaseAnonKey.includes('placeholder') &&
    supabaseAnonKey.length > 20
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ================= AUTH HELPERS =================
export async function signInAdmin(email, password) {
  if (!supabase) throw new Error('Supabase is not configured yet. Please check your environment variables.');
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOutAdmin() {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentAdmin() {
  if (!supabase) return null;
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
}

export function onAdminAuthChange(callback) {
  if (!supabase) return { unsubscribe: () => {} };
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });
  return subscription;
}

// ================= DATA FETCHING =================
export async function fetchLivePortfolioData() {
  if (!supabase) return null;

  try {
    const [
      profileRes,
      publicationsRes,
      experienceRes,
      educationRes,
      lecturesRes,
      pillarsRes,
      projectsRes,
      honorsRes,
      certsRes,
    ] = await Promise.all([
      supabase.from('portfolio_profile').select('*').eq('id', 'primary').maybeSingle(),
      supabase.from('portfolio_publications').select('*').order('index_num', { ascending: true }),
      supabase.from('portfolio_experience').select('*').order('order_num', { ascending: true }),
      supabase.from('portfolio_education').select('*').order('order_num', { ascending: true }),
      supabase.from('portfolio_lectures').select('*').order('order_num', { ascending: true }),
      supabase.from('portfolio_research_pillars').select('*').order('order_num', { ascending: true }),
      supabase.from('portfolio_projects').select('*').order('order_num', { ascending: true }),
      supabase.from('portfolio_honors').select('*').order('order_num', { ascending: true }),
      supabase.from('portfolio_certifications').select('*').order('order_num', { ascending: true }),
    ]);

    return {
      profile: profileRes.data || null,
      publications: publicationsRes.data || null,
      experience: experienceRes.data || null,
      education: educationRes.data || null,
      lectures: lecturesRes.data || null,
      pillars: pillarsRes.data || null,
      projects: projectsRes.data || null,
      honors: honorsRes.data || null,
      certifications: certsRes.data || null,
    };
  } catch (err) {
    console.warn('Failed to load data from Supabase, falling back to local data:', err);
    return null;
  }
}

// ================= PROFILE CRUD =================
export async function updateProfileData(profileFields) {
  if (!supabase) throw new Error('Supabase is not connected');
  const { data, error } = await supabase
    .from('portfolio_profile')
    .upsert({ id: 'primary', ...profileFields, updated_at: new Date().toISOString() })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ================= PUBLICATIONS CRUD =================
export async function upsertPublication(pub) {
  if (!supabase) throw new Error('Supabase is not connected');
  const payload = {
    ...pub,
    updated_at: new Date().toISOString(),
  };
  const { data, error } = await supabase
    .from('portfolio_publications')
    .upsert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletePublication(id) {
  if (!supabase) throw new Error('Supabase is not connected');
  const { error } = await supabase.from('portfolio_publications').delete().eq('id', id);
  if (error) throw error;
}

// ================= EXPERIENCE CRUD =================
export async function upsertExperience(exp) {
  if (!supabase) throw new Error('Supabase is not connected');
  const { data, error } = await supabase
    .from('portfolio_experience')
    .upsert(exp)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteExperience(id) {
  if (!supabase) throw new Error('Supabase is not connected');
  const { error } = await supabase.from('portfolio_experience').delete().eq('id', id);
  if (error) throw error;
}

// ================= EDUCATION CRUD =================
export async function upsertEducation(edu) {
  if (!supabase) throw new Error('Supabase is not connected');
  const { data, error } = await supabase
    .from('portfolio_education')
    .upsert(edu)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteEducation(id) {
  if (!supabase) throw new Error('Supabase is not connected');
  const { error } = await supabase.from('portfolio_education').delete().eq('id', id);
  if (error) throw error;
}

// ================= LECTURES CRUD =================
export async function upsertLecture(lec) {
  if (!supabase) throw new Error('Supabase is not connected');
  const { data, error } = await supabase
    .from('portfolio_lectures')
    .upsert(lec)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteLecture(id) {
  if (!supabase) throw new Error('Supabase is not connected');
  const { error } = await supabase.from('portfolio_lectures').delete().eq('id', id);
  if (error) throw error;
}

// ================= RESEARCH PILLARS CRUD =================
export async function upsertResearchPillar(pillar) {
  if (!supabase) throw new Error('Supabase is not connected');
  const { data, error } = await supabase
    .from('portfolio_research_pillars')
    .upsert(pillar)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteResearchPillar(id) {
  if (!supabase) throw new Error('Supabase is not connected');
  const { error } = await supabase.from('portfolio_research_pillars').delete().eq('id', id);
  if (error) throw error;
}

// ================= OPEN SOURCE PROJECTS CRUD =================
export async function upsertOpenSourceProject(project) {
  if (!supabase) throw new Error('Supabase is not connected');
  const { data, error } = await supabase
    .from('portfolio_projects')
    .upsert(project)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteOpenSourceProject(id) {
  if (!supabase) throw new Error('Supabase is not connected');
  const { error } = await supabase.from('portfolio_projects').delete().eq('id', id);
  if (error) throw error;
}

// ================= HONORS & AWARDS CRUD =================
export async function upsertHonor(honor) {
  if (!supabase) throw new Error('Supabase is not connected');
  const { data, error } = await supabase
    .from('portfolio_honors')
    .upsert(honor)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteHonor(id) {
  if (!supabase) throw new Error('Supabase is not connected');
  const { error } = await supabase.from('portfolio_honors').delete().eq('id', id);
  if (error) throw error;
}

// ================= CERTIFICATIONS CRUD =================
export async function upsertCertification(cert) {
  if (!supabase) throw new Error('Supabase is not connected');
  const { data, error } = await supabase
    .from('portfolio_certifications')
    .upsert(cert)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCertification(id) {
  if (!supabase) throw new Error('Supabase is not connected');
  const { error } = await supabase.from('portfolio_certifications').delete().eq('id', id);
  if (error) throw error;
}

// ================= STORAGE / MEDIA UPLOAD =================
export async function uploadMediaFile(file, folder = 'uploads') {
  if (!supabase) throw new Error('Supabase is not connected');
  const fileExt = file.name.split('.').pop();
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const fileName = `${folder}/${Date.now()}_${cleanName}`;

  const { data, error } = await supabase.storage
    .from('portfolio-media')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) throw error;

  const { data: publicData } = supabase.storage
    .from('portfolio-media')
    .getPublicUrl(data.path);

  return publicData.publicUrl;
}
