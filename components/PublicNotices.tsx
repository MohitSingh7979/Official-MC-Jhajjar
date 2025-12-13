import React from 'react';
import { FileText, Calendar, ChevronRight, Loader2 } from 'lucide-react';
import { NewsItem } from '../types';

interface PublicNoticesProps {
  news: NewsItem[];
  isLoading: boolean;
  onNewsSelect: (item: NewsItem) => void;
}

const PublicNotices: React.FC<PublicNoticesProps> = ({ news, isLoading, onNewsSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden sticky top-28">
      <div className="bg-brand-blue text-white p-5 flex justify-between items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-orange/10"></div>
        <h3 className="font-bold flex items-center relative z-10 text-lg">
            <FileText className="w-5 h-5 mr-2 text-brand-orange" /> Public Notices
        </h3>
        <span className="text-[10px] font-bold bg-brand-orange text-white px-2 py-0.5 rounded shadow-sm relative z-10 uppercase tracking-wide">Live Updates</span>
      </div>
      <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto bg-slate-50/50 min-h-[300px]">
        {isLoading ? (
          <div className="p-8 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin mb-2 text-brand-orange" />
            <p className="text-xs">Fetching updates...</p>
          </div>
        ) : (
          news.map((item) => (
            <button 
                key={item.id} 
                onClick={() => onNewsSelect(item)} 
                className="w-full text-left block p-5 hover:bg-white transition-all group relative border-l-4 border-transparent hover:border-brand-orange"
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide ${item.category === 'Tender' ? 'bg-blue-100 text-brand-blue' : item.category === 'Circular' ? 'bg-orange-100 text-brand-orange' : 'bg-green-100 text-brand-green'}`}>
                    {item.category}
                </span>
                <span className="text-[10px] text-slate-400 flex items-center font-medium">
                    <Calendar className="w-3 h-3 mr-1" />{item.date}
                </span>
              </div>
              <h4 className="text-sm font-bold text-brand-blue group-hover:text-brand-orange leading-snug mb-2 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2 mb-3">{item.summary}</p>
              <div className="flex items-center text-xs text-brand-blue font-bold group-hover:underline decoration-brand-orange">
                Read More <ChevronRight className="w-3 h-3 ml-1" />
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default PublicNotices;