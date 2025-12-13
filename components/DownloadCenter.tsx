import React, { useState, useEffect } from 'react';
import { FileText, Download, Search, Archive, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fuzzySearch } from '../utils/search';
import { DataService } from '../services/dataService';
import { DownloadItem } from '../types';

const DownloadCenter: React.FC = () => {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    DataService.getDownloads().then(setDownloads);
  }, []);

  const categories = ['All', 'Form', 'Act', 'Tender', 'Circular', 'Report'];

  const filteredDownloads = fuzzySearch(searchTerm, downloads, ['title', 'category', 'description']).filter(
    item => activeTab === 'All' || item.category === activeTab
  );

  const handleDownload = (id: string, fileName: string) => {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      alert(`Downloaded: ${fileName}`);
    }, 1200);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 animate-fade-in-up">
      <div className="bg-brand-blue text-white py-12 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-5xl relative z-10">
          <Link to="/" className="flex items-center text-brand-orange text-sm font-bold mb-4 hover:underline"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Home</Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Download Center</h1>
          <p className="text-slate-300 max-w-2xl text-lg">Centralized repository for all municipal documents.</p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
             <input type="text" placeholder="Search documents..." className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-orange outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
             <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(cat => <button key={cat} onClick={() => setActiveTab(cat)} className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap border transition-all ${activeTab === cat ? 'bg-brand-blue text-white border-brand-blue' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-brand-orange'}`}>{cat}</button>)}
          </div>
        </div>

        <div className="grid gap-4">
          {filteredDownloads.length > 0 ? (
            filteredDownloads.map((item) => (
              <div key={item.id} className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                 <div className="flex items-start">
                    <div className={`p-3 rounded-lg mr-4 shrink-0 ${item.category === 'Form' ? 'bg-orange-50 text-brand-orange' : 'bg-slate-100 text-slate-600'}`}><FileText className="w-6 h-6" /></div>
                    <div>
                       <div className="flex items-center gap-2 mb-1"><span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{item.category}</span><span className="text-xs text-slate-400">{item.size} • {item.format}</span></div>
                       <h3 className="font-bold text-slate-800 text-lg">{item.title}</h3>
                       <p className="text-sm text-slate-500 mt-1">{item.description}</p>
                    </div>
                 </div>
                 <button onClick={() => handleDownload(item.id, item.title)} disabled={!!downloading} className="w-full md:w-auto px-6 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-lg font-bold text-sm transition-all flex items-center justify-center shrink-0 disabled:opacity-70">
                   {downloading === item.id ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <><Download className="w-4 h-4 mr-2" /> Download</>}
                 </button>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed"><Archive className="w-12 h-12 text-slate-300 mx-auto mb-4" /><h3 className="text-lg font-bold text-slate-600">No documents found</h3></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadCenter;