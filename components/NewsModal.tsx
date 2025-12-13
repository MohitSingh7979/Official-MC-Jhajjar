import React, { useEffect, useState } from 'react';
import { X, Calendar, Download, Share2, Printer, Loader2 } from 'lucide-react';
import { NewsItem } from '../types';
import useScrollLock from '../hooks/useScrollLock';

interface NewsModalProps {
  item: NewsItem | null;
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ item, onClose }) => {
  useScrollLock(!!item);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (item) {
      setLoading(false);
    }
  }, [item]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-blue/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-fade-in-up flex flex-col max-h-[85vh] border border-brand-blue/10">
        
        {/* Header */}
        <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-start">
          <div className="pr-8 flex-1">
            <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase mb-2 
              ${item.category === 'Tender' ? 'bg-brand-blue/10 text-brand-blue' : 
                item.category === 'Circular' ? 'bg-brand-orange/10 text-brand-orange' : 
                'bg-brand-green/10 text-brand-green'}`}>
              {item.category}
            </span>
            <h2 className="text-xl font-bold text-brand-blue leading-snug">{item.title}</h2>
            <div className="flex items-center mt-2 text-slate-500 text-sm">
              <Calendar className="w-4 h-4 mr-1.5" />
              Published on: {item.date}
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-600 shadow-sm hover:shadow border border-slate-100 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto min-h-[300px] relative">
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20">
              <Loader2 className="w-10 h-10 text-brand-orange animate-spin mb-3" />
              <p className="text-slate-500 font-medium animate-pulse">Loading content...</p>
            </div>
          ) : (
            <div className="prose prose-slate max-w-none animate-fade-in-up">
              {item.content ? (
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              ) : (
                <>
                  <p className="text-lg text-slate-600 mb-4 font-medium">{item.summary}</p>
                  <p className="text-slate-500 italic">No additional details available for this notification.</p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-3">
          <button 
            disabled={loading}
            className="flex-1 flex items-center justify-center bg-brand-orange hover:bg-brand-orange/90 text-white py-3 rounded-lg font-bold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4 mr-2" /> Download Official PDF
          </button>
          <div className="flex gap-3">
             <button disabled={loading} className="flex items-center justify-center px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-100 font-medium transition-colors disabled:opacity-50">
               <Printer className="w-4 h-4" />
             </button>
             <button disabled={loading} className="flex items-center justify-center px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-100 font-medium transition-colors disabled:opacity-50">
               <Share2 className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;