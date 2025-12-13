import { supabase } from '../lib/supabaseClient';
import { NewsItem, Suggestion, Service, Official, Department, Stat, DownloadItem, Tender } from '../types';

// --- Caching Configuration ---
const CACHE_PREFIX = 'mc_jhajjar_v1_';
const CACHE_TTL = 3600 * 1000; // 1 hour

const getFromCache = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(CACHE_PREFIX + key);
    if (!item) return null;
    
    const { data, timestamp } = JSON.parse(item);
    if (Date.now() - timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

const setToCache = (key: string, data: any) => {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.warn('Cache quota exceeded', e);
  }
};

// --- Validation Helpers ---
const validateSuggestion = (data: Partial<Suggestion>) => {
  if (!data.message || data.message.trim().length < 5) throw new Error("Message too short.");
  // Updated list to match DB constraints
  if (!['Suggestion', 'Bug Report', 'Content Error', 'Feature', 'Other'].includes(data.type || '')) throw new Error("Invalid type.");
};

const validateNewsItem = (data: Partial<NewsItem>) => {
  if (!data.title || data.title.length < 5) throw new Error("Title required.");
  if (!data.date) throw new Error("Date required.");
};

// --- Data Service ---
export const DataService = {
  
  // --- Feedback (No Cache - Always write) ---
  async submitFeedback(feedback: { type: string; message: string }): Promise<void> {
    validateSuggestion(feedback as Partial<Suggestion>);
    const { error } = await supabase.from('suggestions').insert([feedback]);
    if (error) throw error;
  },

  async getSuggestions(): Promise<Suggestion[]> {
    const { data, error } = await supabase.from('suggestions').select('*').order('created_at', { ascending: false });
    if (error) {
      if (error.message.includes('does not exist')) throw new Error("MissingTables");
      throw error;
    }
    return data || [];
  },

  // --- News ---
  async publishNews(news: Partial<NewsItem>): Promise<void> {
    validateNewsItem(news);
    const { error } = await supabase.from('news').insert([news]);
    if (error) throw error;
    // Invalidate cache
    localStorage.removeItem(CACHE_PREFIX + 'news');
  },

  async getNews(): Promise<NewsItem[]> {
    const cached = getFromCache<NewsItem[]>('news');
    if (cached) return cached;

    try {
      const { data, error } = await supabase.from('news').select('*').order('date', { ascending: false }).limit(10);
      if (error) throw error;
      const result = data || [];
      setToCache('news', result);
      return result;
    } catch (err: any) {
      console.warn('DataService: Error fetching news', err.message);
      return [];
    }
  },

  // --- Services ---
  async getServices(): Promise<Service[]> {
    const cached = getFromCache<Service[]>('services');
    if (cached) return cached;

    try {
      // Fetch joined data from normalized tables
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          service_categories (
            color,
            accent
          ),
          service_documents (
            doc_name
          )
        `);

      if (error) throw error;

      // Transform nested response back to flat Service interface for UI
      const result = (data || []).map((s: any) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        icon: s.icon,
        link: s.link,
        // Flatten Category Style from Relation (3NF)
        color: s.service_categories?.color || 'bg-slate-500',
        accent: s.service_categories?.accent || 'text-slate-500',
        // Flatten Documents Relation (1NF)
        documents: s.service_documents ? s.service_documents.map((d: any) => d.doc_name) : [],
        timeframe: s.timeframe,
        fees: s.fees,
        isExternal: s.is_external,
        buttonLabel: s.button_label,
        category: s.category_name
      }));

      setToCache('services', result);
      return result;
    } catch (e) { console.warn('Fetch Services Failed', e); return []; }
  },

  // --- Officials / Dignitaries ---
  async getOfficials(): Promise<Official[]> {
    const cached = getFromCache<Official[]>('officials');
    if (cached) return cached;

    try {
      const { data, error } = await supabase.from('officials').select('*').order('priority', { ascending: true });
      if (error) throw error;
      const result = data || [];
      setToCache('officials', result);
      return result;
    } catch (e) { console.warn('Fetch Officials Failed', e); return []; }
  },

  // --- Departments ---
  async getDepartments(): Promise<Department[]> {
    const cached = getFromCache<Department[]>('departments');
    if (cached) return cached;

    try {
      // Fetch joined data
      const { data, error } = await supabase
        .from('departments')
        .select(`
          *,
          department_staff (name),
          department_acts (act_name)
        `);

      if (error) throw error;

      // Transform nested relations back to arrays
      const result = (data || []).map((d: any) => ({
        id: d.id,
        name: d.name,
        icon: d.icon,
        description: d.description,
        incharge: d.incharge,
        designation: d.designation,
        employees: d.department_staff ? d.department_staff.map((s: any) => s.name) : [],
        acts: d.department_acts ? d.department_acts.map((a: any) => a.act_name) : []
      }));

      setToCache('departments', result);
      return result;
    } catch (e) { console.warn('Fetch Departments Failed', e); return []; }
  },

  // --- City Stats ---
  async getStats(): Promise<Stat[]> {
    const cached = getFromCache<Stat[]>('stats');
    if (cached) return cached;

    try {
      const { data, error } = await supabase.from('city_stats').select('*').order('priority', { ascending: true });
      if (error) throw error;
      const result = data || [];
      setToCache('stats', result);
      return result;
    } catch (e) { console.warn('Fetch Stats Failed', e); return []; }
  },

  // --- Downloads ---
  async getDownloads(): Promise<DownloadItem[]> {
    const cached = getFromCache<DownloadItem[]>('downloads');
    if (cached) return cached;

    try {
      const { data, error } = await supabase.from('downloads').select('*');
      if (error) throw error;
      const result = data || [];
      setToCache('downloads', result);
      return result;
    } catch (e) { console.warn('Fetch Downloads Failed', e); return []; }
  },

  // --- Tenders ---
  async getTenders(): Promise<Tender[]> {
    const cached = getFromCache<Tender[]>('tenders');
    if (cached) return cached;

    try {
      const { data, error } = await supabase.from('tenders').select('*').order('closing_date', { ascending: false });
      if (error) throw error;
      const result = data || [];
      setToCache('tenders', result);
      return result;
    } catch (e) { console.warn('Fetch Tenders Failed', e); return []; }
  }
};