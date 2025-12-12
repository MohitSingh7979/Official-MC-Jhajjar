import React, { useEffect, useState } from 'react';
import { X, Calendar, Download, Share2, Printer, Loader2, AlertCircle } from 'lucide-react';
import { NewsItem } from '../types';
import useScrollLock from '../hooks/useScrollLock';

interface NewsModalProps {
  item: NewsItem | null;
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ item, onClose }) => {
  useScrollLock(!!item);
  const [loading, setLoading] = useState(true);
  const [fetchedContent, setFetchedContent] = useState<string | null>(null);

  // Simulate API fetch when item changes
  useEffect(() => {
    if (item) {
      setLoading(true);
      setFetchedContent(null);
      
      // Simulate network delay
      const timer = setTimeout(() => {
        // Mock dynamic content generation based on ID
        const mockContent = `
          <p class="lead text-lg text-slate-600 mb-4">
            <strong>Official Communiqué:</strong> This is the verified detailed view for the ${item.category.toLowerCase()} titled "<em>${item.title}</em>".
          </p>
          <p>
            The Municipal Council of Jhajjar aims to keep citizens informed about all developments. 
            This notification was officially released on <strong>${item.date}</strong> and serves as a primary source of information regarding the subject matter.
          </p>
          <div class="bg-blue-50 border-l-4 border-brand-blue p-4 my-4">
             <p class="font-bold text-brand-blue">Key Highlights:</p>
             <ul class="list-disc pl-5 mt-2 space-y-1 text-slate-700">
               <li>Immediate effect from the date of issue.</li>
               <li>Applicable to all wards under MC Jhajjar jurisdiction.</li>
               <li>For further queries, please contact the specific department head.</li>
             </ul>
          </div>
          <p>
            Citizens are requested to adhere to the guidelines mentioned above. Non-compliance may attract penalties as per the Municipal Act, 1973. 
            We thank you for your cooperation in making Jhajjar a better city.
          </p>
          <p class="mt-4 text-sm text-slate-500">
            Ref No: MCJ/${new Date().getFullYear()}/${item.id.padStart(3, '0')} | Digital Signature Verified
          </p>
        `;
        setFetchedContent(mockContent);
        setLoading(false);
      }, 1200); // 1.2s simulated delay

      return () => clearTimeout(timer);
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
              <p className="text-slate-500 font-medium animate-pulse">Fetching official document...</p>
            </div>
          ) : (
            <div className="prose prose-slate max-w-none animate-fade-in-up">
              {fetchedContent && <div dangerouslySetInnerHTML={{ __html: fetchedContent }} />}
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