import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, FileText, ExternalLink } from 'lucide-react';
import { SERVICES, LATEST_NEWS, OFFICIALS } from '../constants';
import useScrollLock from '../hooks/useScrollLock';
import { Service } from '../types';
import { fuzzySearch } from '../utils/search';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onServiceSelect: (service: Service) => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, onServiceSelect }) => {
  useScrollLock(isOpen);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Fuzzy Filter Logic
  const filteredServices = fuzzySearch(query, SERVICES, ['title', 'description', 'category']).slice(0, 3);
  const filteredNews = fuzzySearch(query, LATEST_NEWS, ['title', 'category']).slice(0, 3);
  const filteredOfficials = fuzzySearch(query, OFFICIALS, ['name', 'designation']).slice(0, 2);

  const hasResults = filteredServices.length > 0 || filteredNews.length > 0 || filteredOfficials.length > 0;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[80vh] animate-fade-in-up">
        {/* Header / Input */}
        <div className="p-4 border-b border-slate-100 flex items-center">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 text-lg outline-none text-slate-800 placeholder:text-slate-400"
            placeholder="Search for services (e.g., 'watr', 'tax')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors"
          >
            <div className="text-xs font-mono border border-slate-200 rounded px-1.5 py-0.5 mr-2 inline-block">ESC</div>
            <X className="w-5 h-5 inline-block" />
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto flex-1 p-2">
          {!query && (
            <div className="p-8 text-center text-slate-400">
              <p className="text-sm">Type to search across the portal</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="text-xs bg-slate-50 border border-slate-100 px-2 py-1 rounded">Property Tax</span>
                <span className="text-xs bg-slate-50 border border-slate-100 px-2 py-1 rounded">Birth Certificate</span>
                <span className="text-xs bg-slate-50 border border-slate-100 px-2 py-1 rounded">Tenders</span>
              </div>
            </div>
          )}

          {query && !hasResults && (
            <div className="p-8 text-center text-slate-500">
              <p>No results found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-2">Try checking for typos or use simpler keywords.</p>
            </div>
          )}

          {query && hasResults && (
            <div className="space-y-6 p-2">
              {/* Services Section */}
              {filteredServices.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 px-2">Services</h4>
                  <div className="space-y-1">
                    {filteredServices.map(service => (
                      <button 
                        key={service.id} 
                        onClick={() => {
                          onServiceSelect(service);
                          onClose();
                        }}
                        className="flex items-center w-full text-left p-3 hover:bg-orange-50 rounded-lg group transition-colors"
                      >
                        <div className={`w-8 h-8 rounded flex items-center justify-center text-white ${service.color} mr-3`}>
                          <service.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-slate-800 group-hover:text-orange-700">{service.title}</h5>
                          <p className="text-xs text-slate-500 line-clamp-1">{service.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* News Section */}
              {filteredNews.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 px-2">Latest Updates</h4>
                  <div className="space-y-1">
                    {filteredNews.map(item => (
                      <a 
                        key={item.id} 
                        href={item.link}
                        onClick={onClose}
                        className="flex items-start p-3 hover:bg-slate-50 rounded-lg group transition-colors"
                      >
                        <FileText className="w-4 h-4 text-slate-400 mr-3 mt-1" />
                        <div className="flex-1">
                          <h5 className="font-medium text-slate-800 text-sm group-hover:text-orange-700">{item.title}</h5>
                          <div className="flex items-center mt-1">
                            <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded mr-2">{item.category}</span>
                            <span className="text-[10px] text-slate-400">{item.date}</span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Officials Section */}
              {filteredOfficials.length > 0 && (
                 <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 px-2">Officials</h4>
                    <div className="space-y-1">
                       {filteredOfficials.map(official => (
                          <div key={official.id} className="flex items-center p-3 hover:bg-slate-50 rounded-lg">
                             <img src={official.image} alt="" className="w-8 h-8 rounded-full mr-3 border border-slate-200" />
                             <div>
                                <h5 className="font-medium text-slate-800 text-sm">{official.name}</h5>
                                <p className="text-xs text-slate-500">{official.designation}</p>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              )}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-slate-50 p-3 text-xs text-slate-400 border-t border-slate-100 flex justify-between">
            <span>Use <strong className="font-mono">↑</strong> <strong className="font-mono">↓</strong> to navigate</span>
            <span>Press <strong className="font-mono">Enter</strong> to select</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;