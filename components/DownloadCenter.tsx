import React, { useState } from 'react';
import { FileText, Download, Search, Filter, Archive, CheckCircle2, Loader2 } from 'lucide-react';
import { DOWNLOADS } from '../constants';
import { fuzzySearch } from '../utils/search';
import { ArrowLeft } from 'lucide-react';

const DownloadCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [downloading, setDownloading] = useState<string | null>(null);

  const categories = ['All', 'Form', 'Act', 'Tender', 'Circular', 'Report'];

  const filteredDownloads = fuzzySearch(searchTerm, DOWNLOADS, ['title', 'category', 'description']).filter(
    item => activeTab === 'All' || item.category === activeTab
  );

  const handleDownload = (id: string, fileName: string) => {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      // Simulate download action
      alert(`Downloaded: ${fileName}`);
    }, 1200);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 animate-fade-in-up">
      {/* Header */}
      <div className="bg-brand-blue text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <button 
            onClick={() => window.location.hash = ''} 
            className="flex items-center text-brand-orange text-sm font-bold mb-4 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
          </button>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Download Center</h1>
          <p className="text-slate-300 max-w-2xl text-lg">
            Centralized repository for all municipal application forms, acts, notifications, and tenders.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 -mt-8 relative z-20">
        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
             <input 
               type="text" 
               placeholder="Search documents (e.g. 'birth form', 'act 1973')..."
               className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-orange outline-none"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
             <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap border transition-all ${
                  activeTab === cat 
                    ? 'bg-brand-blue text-white border-brand-blue' 
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-brand-orange hover:text-brand-orange'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="grid gap-4">
          {filteredDownloads.length > 0 ? (
            filteredDownloads.map((item) => (
              <div key={item.id} className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                 <div className="flex items-start">
                    <div className={`p-3 rounded-lg mr-4 shrink-0 ${
                       item.category === 'Form' ? 'bg-orange-50 text-brand-orange' :
                       item.category === 'Act' ? 'bg-blue-50 text-brand-blue' :
                       'bg-slate-100 text-slate-600'
                    }`}>
                       <FileText className="w-6 h-6" />
                    </div>
                    <div>
                       <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                             {item.category}
                          </span>
                          <span className="text-xs text-slate-400">
                             {item.size} • {item.format}
                          </span>
                       </div>
                       <h3 className="font-bold text-slate-800 text-lg">{item.title}</h3>
                       <p className="text-sm text-slate-500 mt-1">{item.description}</p>
                    </div>
                 </div>
                 
                 <button 
                   onClick={() => handleDownload(item.id, item.title)}
                   disabled={!!downloading}
                   className="w-full md:w-auto px-6 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-lg font-bold text-sm transition-all flex items-center justify-center shrink-0 disabled:opacity-70 disabled:cursor-wait"
                 >
                   {downloading === item.id ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Downloading...
                      </>
                   ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" /> Download
                      </>
                   )}
                 </button>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
               <Archive className="w-12 h-12 text-slate-300 mx-auto mb-4" />
               <h3 className="text-lg font-bold text-slate-600">No documents found</h3>
               <p className="text-slate-400">Try adjusting your search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadCenter;