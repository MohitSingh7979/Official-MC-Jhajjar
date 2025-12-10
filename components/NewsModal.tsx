import React from 'react';
import { X, Calendar, Download, Share2, Printer } from 'lucide-react';
import { NewsItem } from '../types';
import useScrollLock from '../hooks/useScrollLock';

interface NewsModalProps {
  item: NewsItem | null;
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ item, onClose }) => {
  useScrollLock(!!item);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-blue/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-fade-in-up flex flex-col max-h-[85vh] border border-brand-blue/10">
        {/* Header */}
        <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-start">
          <div className="pr-8">
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
        <div className="p-8 overflow-y-auto">
          <div className="prose prose-slate max-w-none">
            <p className="lead text-lg text-slate-600 mb-4">
              This is the detailed view for the {item.category.toLowerCase()} titled "{item.title}".
            </p>
            <p>
              In a real-world scenario, this area would contain the full text of the notification, tender details, or news article fetched from the backend CMS.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 my-4">
               <li>Reference Number: MCJ/2023/{Math.floor(Math.random() * 1000)}</li>
               <li>Department: Administration</li>
               <li>Issuing Authority: Executive Officer</li>
            </ul>
            <p>
               Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-3">
          <button className="flex-1 flex items-center justify-center bg-brand-orange hover:bg-brand-orange/90 text-white py-3 rounded-lg font-bold transition-colors shadow-sm">
            <Download className="w-4 h-4 mr-2" /> Download Official PDF
          </button>
          <div className="flex gap-3">
             <button className="flex items-center justify-center px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-100 font-medium transition-colors">
               <Printer className="w-4 h-4" />
             </button>
             <button className="flex items-center justify-center px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-100 font-medium transition-colors">
               <Share2 className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;