import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, Search, X, ExternalLink, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Service } from '../types';
import { fuzzySearch } from '../utils/search';
import { DataService } from '../services/dataService';
import { ICON_MAP } from '../constants';

interface ServicesGridProps {
  onServiceSelect: (service: Service) => void;
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ onServiceSelect }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const data = await DataService.getServices();
      setServices(data);
      setLoading(false);
    };
    loadData();
  }, []);

  // Reset expansion when filters change
  useEffect(() => {
    setIsExpanded(false);
  }, [selectedCategory]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(services.map(s => s.category || 'Other')));
    return ['All', ...cats.sort()];
  }, [services]);

  const filteredServices = useMemo(() => {
    let result = services;
    if (selectedCategory !== 'All') {
      result = result.filter(s => s.category === selectedCategory);
    }
    if (searchTerm) {
      result = fuzzySearch(searchTerm, result, ['title', 'description']);
    }
    return result;
  }, [searchTerm, selectedCategory, services]);

  const displayedServices = useMemo(() => {
    if (searchTerm) return filteredServices;
    if (isExpanded) return filteredServices;
    return filteredServices.slice(0, 6);
  }, [filteredServices, isExpanded, searchTerm]);

  if (loading) return <div className="py-20 text-center text-slate-400">Loading Services...</div>;

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-brand-blue mb-4">Citizen Services</h2>
          <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full mb-4"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Access municipal services online. Direct links to state government portals.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border min-w-[90px] ${
                  selectedCategory === cat
                    ? 'bg-brand-blue text-white border-brand-blue shadow-md'
                    : 'bg-white text-slate-500 border-slate-200 hover:text-brand-orange hover:border-brand-orange'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-md mx-auto mb-12 relative">
          <input 
            type="text" 
            placeholder={`Search ${selectedCategory === 'All' ? 'services' : selectedCategory}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-full border border-slate-200 shadow-sm focus:ring-2 focus:ring-brand-orange outline-none text-brand-blue"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
          )}
        </div>

        {displayedServices.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
              {displayedServices.map((service) => {
                const Icon = ICON_MAP[service.icon] || HelpCircle;
                return (
                  <div key={service.id} className="bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col h-full relative">
                    <div className={`${service.color} w-14 h-14 rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-md shrink-0`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="mb-1"><span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 border border-slate-100 px-2 py-0.5 rounded-full">{service.category}</span></div>
                    <h3 className="text-xl font-bold text-brand-blue mb-3 group-hover:text-brand-orange transition-colors">{service.title}</h3>
                    <p className="text-slate-500 mb-6 leading-relaxed flex-grow text-sm">{service.description}</p>
                    <div className="mt-auto">
                      {service.isExternal ? (
                        <a href={service.link} target="_blank" rel="noopener noreferrer" className={`flex items-center font-bold text-sm ${service.accent} hover:underline`}>
                          {service.buttonLabel || "Access Portal"} <ExternalLink className="w-4 h-4 ml-1.5" />
                        </a>
                      ) : (
                        <button onClick={() => onServiceSelect(service)} className={`flex items-center font-bold text-sm ${service.accent} hover:underline outline-none`}>
                          {service.buttonLabel || "View Details"} <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {!searchTerm && filteredServices.length > 6 && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center px-8 py-3 border-2 border-brand-blue text-brand-blue font-bold rounded-full hover:bg-brand-blue hover:text-white transition-all duration-300 group"
                >
                  {isExpanded ? (
                    <>Show Less <ChevronUp className="ml-2 w-4 h-4 group-hover:-translate-y-1 transition-transform" /></>
                  ) : (
                    <>View All Services <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" /></>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-10 bg-white rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-medium text-brand-blue mb-1">No services found</h3>
            <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="mt-4 text-brand-orange font-bold hover:underline">Clear Filters</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesGrid;