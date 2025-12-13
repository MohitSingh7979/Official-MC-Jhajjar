import React, { useEffect, useState } from 'react';
import { DataService } from '../services/dataService';
import { Suggestion } from '../types';
import { LayoutDashboard, MessageSquare, PlusCircle, LogOut, Check, X, Loader2, Bell, Database, AlertTriangle } from 'lucide-react';

const SQL_INIT_SCRIPT = `-- 1. RESET & CLEANUP
drop table if exists public.service_documents;
drop table if exists public.services;
drop table if exists public.service_categories;
drop table if exists public.department_staff;
drop table if exists public.department_acts;
drop table if exists public.departments;

-- 2. CREATE NORMALIZED TABLES

-- Service Categories (3NF: Color/Accent depends on Category)
create table public.service_categories (
  name text primary key,
  color text,
  accent text
);

-- Services (1NF: No arrays)
create table public.services (
  id uuid default gen_random_uuid() primary key,
  title text,
  description text,
  icon text,
  link text,
  timeframe text,
  fees text,
  is_external boolean,
  button_label text,
  category_name text references public.service_categories(name)
);

-- Service Documents (1NF: Atomic values)
create table public.service_documents (
  id uuid default gen_random_uuid() primary key,
  service_id uuid references public.services(id) on delete cascade,
  doc_name text
);

-- Departments
create table public.departments (
  id uuid default gen_random_uuid() primary key,
  name text,
  icon text,
  description text,
  incharge text,
  designation text
);

-- Department Staff (1NF)
create table public.department_staff (
  id uuid default gen_random_uuid() primary key,
  department_id uuid references public.departments(id) on delete cascade,
  name text
);

-- Department Acts (1NF)
create table public.department_acts (
  id uuid default gen_random_uuid() primary key,
  department_id uuid references public.departments(id) on delete cascade,
  act_name text
);

-- Other Tables (Already Normalized)
create table if not exists public.downloads (
  id uuid default gen_random_uuid() primary key,
  title text,
  category text,
  size text,
  format text,
  description text,
  link text default '#'
);

create table if not exists public.officials (
  id uuid default gen_random_uuid() primary key,
  name text,
  designation text,
  image text,
  phone text,
  email text,
  category text,
  priority int,
  message text
);

create table if not exists public.city_stats (
  id uuid default gen_random_uuid() primary key,
  label text,
  value text,
  icon text,
  color text,
  priority int
);

create table if not exists public.tenders (
  id text primary key,
  description text,
  closing_date date,
  status text,
  is_new boolean
);

create table if not exists public.suggestions (
  id uuid default gen_random_uuid() primary key,
  type text,
  message text,
  status text default 'Pending',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table if not exists public.news (
  id uuid default gen_random_uuid() primary key,
  title text,
  date date default current_date,
  category text,
  summary text,
  content text,
  link text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. ENABLE RLS
alter table public.service_categories enable row level security;
alter table public.services enable row level security;
alter table public.service_documents enable row level security;
alter table public.departments enable row level security;
alter table public.department_staff enable row level security;
alter table public.department_acts enable row level security;
alter table public.downloads enable row level security;
alter table public.officials enable row level security;
alter table public.city_stats enable row level security;
alter table public.tenders enable row level security;
alter table public.suggestions enable row level security;
alter table public.news enable row level security;

-- Create Policies (Simplified for Public Access)
create policy "Public Read Categories" on public.service_categories for select using (true);
create policy "Public Read Services" on public.services for select using (true);
create policy "Public Read Svc Docs" on public.service_documents for select using (true);
create policy "Public Read Departments" on public.departments for select using (true);
create policy "Public Read Dept Staff" on public.department_staff for select using (true);
create policy "Public Read Dept Acts" on public.department_acts for select using (true);
create policy "Public Read Downloads" on public.downloads for select using (true);
create policy "Public Read Officials" on public.officials for select using (true);
create policy "Public Read Stats" on public.city_stats for select using (true);
create policy "Public Read Tenders" on public.tenders for select using (true);
create policy "Public Read News" on public.news for select using (true);
create policy "Public Insert Suggestions" on public.suggestions for insert with check (true);

-- 4. SEED DATA

-- Categories
INSERT INTO public.service_categories (name, color, accent) VALUES
('Finance', 'bg-brand-blue', 'text-brand-blue'),
('Commercial', 'bg-brand-green', 'text-brand-green'),
('Safety', 'bg-brand-red', 'text-brand-red');

-- Services & Docs (Using CTE for IDs)
WITH s1 AS (
  INSERT INTO public.services (title, description, icon, link, timeframe, fees, is_external, button_label, category_name)
  VALUES ('Property Tax', 'Pay property tax, view bills.', 'Home', 'https://property.ulbharyana.gov.in/', 'Instant', 'Assessment', true, 'Pay Tax', 'Finance')
  RETURNING id
),
s2 AS (
  INSERT INTO public.services (title, description, icon, link, timeframe, fees, is_external, button_label, category_name)
  VALUES ('Trade License', 'Apply for trade license.', 'Receipt', 'https://online.ulbharyana.gov.in/', '15 Days', 'Category', true, 'ULB Portal', 'Commercial')
  RETURNING id
)
INSERT INTO public.service_documents (service_id, doc_name)
SELECT id, 'Property ID' FROM s1
UNION ALL
SELECT id, 'Rent Agreement' FROM s2
UNION ALL
SELECT id, 'ID Proof' FROM s2;

-- Departments & Details
WITH d1 AS (
  INSERT INTO public.departments (name, icon, description, incharge, designation)
  VALUES ('Engineering Wing', 'HardHat', 'Infrastructure maintenance.', 'Sh. Pankaj Saini', 'XEN')
  RETURNING id
)
INSERT INTO public.department_staff (department_id, name)
SELECT id, 'Narender (JE)' FROM d1
UNION ALL
SELECT id, 'Sunil (ME)' FROM d1;

-- Stats (Mock)
INSERT INTO public.city_stats (label, value, icon, color, priority) VALUES
('Properties', '34,971+', 'Home', 'text-brand-blue', 1),
('Connections', '48,000+', 'Droplets', 'text-brand-blue', 2);
`;

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feedback' | 'news'>('feedback');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [newsForm, setNewsForm] = useState({ title: '', category: 'Notification', date: new Date().toISOString().split('T')[0], summary: '', content: '' });
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => { fetchSuggestions(); }, []);

  const fetchSuggestions = async () => {
    setLoading(true); setDbError(null);
    try {
      setSuggestions(await DataService.getSuggestions());
    } catch (error: any) {
      if (error.message === 'MissingTables') setDbError('MissingTables');
      else alert('Database Error: ' + error.message);
    } finally { setLoading(false); }
  };

  const handlePostNews = async (e: React.FormEvent) => {
    e.preventDefault(); setIsPosting(true);
    try {
      await DataService.publishNews(newsForm);
      alert('News published successfully!');
      setNewsForm({ ...newsForm, title: '', summary: '', content: '' });
    } catch (err: any) {
      if (err.message === 'MissingTables') setDbError('MissingTables');
      else alert('Error publishing news: ' + err.message);
    } finally { setIsPosting(false); }
  };

  if (dbError === 'MissingTables') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
         <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full overflow-hidden border border-slate-200">
            <div className="bg-brand-blue p-6 text-white flex items-center">
               <Database className="w-8 h-8 mr-4 text-brand-orange" />
               <div><h1 className="text-xl font-bold">Database Normalization Required</h1><p className="text-slate-300 text-sm">Schema Update to Best Normal Forms (1NF/3NF)</p></div>
            </div>
            <div className="p-8">
               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 shrink-0" />
                  <p className="text-sm text-yellow-800">
                    The application now uses a normalized database schema. 
                    <strong>Services</strong> and <strong>Departments</strong> now use separate tables for related data (Documents, Categories, Staff).
                    Please run the SQL below in Supabase SQL Editor.
                  </p>
               </div>
               <div className="relative group">
                  <pre className="bg-slate-900 text-slate-300 p-4 rounded-lg text-xs overflow-x-auto font-mono leading-relaxed select-all h-64">{SQL_INIT_SCRIPT}</pre>
               </div>
               <div className="mt-8 flex justify-end">
                  <button onClick={() => window.location.reload()} className="bg-brand-orange text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-orange/90 transition-colors">I have run the SQL, Refresh Page</button>
               </div>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-brand-blue text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="bg-white/10 p-2 rounded-lg"><LayoutDashboard className="w-6 h-6 text-brand-orange" /></div>
          <div><h1 className="font-bold text-lg leading-none">Admin Console</h1><p className="text-xs text-slate-300">Continuous Improvement System</p></div>
        </div>
        <button onClick={() => window.location.href = '/'} className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg flex items-center transition-colors"><LogOut className="w-4 h-4 mr-2" /> Logout</button>
      </header>

      <div className="flex flex-1 container mx-auto p-6 gap-6">
        <div className="w-64 space-y-2 shrink-0 hidden md:block">
          <button onClick={() => setActiveTab('feedback')} className={`w-full text-left p-3 rounded-lg flex items-center font-medium transition-colors ${activeTab === 'feedback' ? 'bg-brand-blue text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
            <MessageSquare className="w-5 h-5 mr-3" /> User Feedback <span className="ml-auto bg-brand-orange text-white text-[10px] px-2 py-0.5 rounded-full">{suggestions.length}</span>
          </button>
          <button onClick={() => setActiveTab('news')} className={`w-full text-left p-3 rounded-lg flex items-center font-medium transition-colors ${activeTab === 'news' ? 'bg-brand-blue text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
            <Bell className="w-5 h-5 mr-3" /> Publish Updates
          </button>
        </div>

        <div className="flex-1">
          {activeTab === 'feedback' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50"><h2 className="font-bold text-brand-blue">Incoming Suggestions</h2><button onClick={fetchSuggestions} className="text-sm text-brand-orange hover:underline">Refresh</button></div>
              <div className="divide-y divide-slate-100 max-h-[70vh] overflow-y-auto">
                {loading ? <div className="p-8 text-center text-slate-400">Loading feedback...</div> : suggestions.length === 0 ? <div className="p-8 text-center text-slate-400">No suggestions received yet.</div> :
                  suggestions.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${item.type === 'Bug Report' ? 'bg-red-100 text-red-600' : item.type === 'Feature' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>{item.type}</span>
                        <span className="text-xs text-slate-400">{new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-slate-800 text-sm mb-3">{item.message}</p>
                      <div className="flex space-x-2">
                        <button className="text-xs flex items-center px-2 py-1 bg-green-50 text-green-700 rounded border border-green-200 hover:bg-green-100"><Check className="w-3 h-3 mr-1" /> Acknowledge</button>
                        <button className="text-xs flex items-center px-2 py-1 bg-slate-50 text-slate-600 rounded border border-slate-200 hover:bg-slate-100"><X className="w-3 h-3 mr-1" /> Dismiss</button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="max-w-2xl bg-white rounded-xl shadow-lg border border-slate-200 p-8">
               <h2 className="text-2xl font-bold text-brand-blue mb-6 flex items-center"><PlusCircle className="w-6 h-6 mr-3 text-brand-orange" /> Publish Live Notice</h2>
               <form onSubmit={handlePostNews} className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                      <select className="w-full border p-2 rounded-lg bg-slate-50" value={newsForm.category} onChange={e => setNewsForm({...newsForm, category: e.target.value})}>
                        {['Notification', 'Circular', 'Tender', 'Event'].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
                      <input type="date" className="w-full border p-2 rounded-lg" value={newsForm.date} onChange={e => setNewsForm({...newsForm, date: e.target.value})} />
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                    <input type="text" className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none" placeholder="Alert Title" value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} required />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Summary</label>
                    <textarea rows={2} className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none resize-none" placeholder="Short description..." value={newsForm.summary} onChange={e => setNewsForm({...newsForm, summary: e.target.value})} required />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Detailed Content (HTML)</label>
                    <textarea rows={4} className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none resize-none font-mono text-sm" placeholder="<p>Full content details...</p>" value={newsForm.content} onChange={e => setNewsForm({...newsForm, content: e.target.value})} />
                 </div>
                 <button type="submit" disabled={isPosting} className="w-full bg-brand-orange text-white font-bold py-3 rounded-lg hover:bg-brand-orange/90 flex justify-center items-center">
                   {isPosting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Publish to Website'}
                 </button>
               </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;