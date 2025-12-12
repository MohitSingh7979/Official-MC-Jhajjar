import React, { useState, useMemo } from 'react';
import { SERVICES } from '../constants';
import { ArrowRight, Search, X, ExternalLink, Filter } from 'lucide-react';
import { Service } from '../types';

interface ServicesGridProps {
  onServiceSelect: (service: Service) => void;
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ onServiceSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(SERVICES.map(s => s.category || 'Other')));
    return ['All', ...cats.sort()];
  }, []);

  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-brand-blue mb-4">Citizen Services</h2>
          <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full mb-4"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Access municipal services from the comfort of your home. 
            Direct links to state government portals and local services.
          </p>
        </div>

        {/* Category Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all border min-w-[80px] ${
                  selectedCategory === cat
                    ? 'bg-brand-blue text-white border-brand-blue shadow-md'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-brand-orange hover:text-brand-orange'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <div className="relative">
            <input 
              type="text" 
              placeholder={`Search in ${selectedCategory === 'All' ? 'all services' : selectedCategory}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-full border border-slate-200 shadow-sm focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all text-brand-blue"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
            {filteredServices.map((service) => (
              <div 
                key={service.id} 
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col h-full relative"
              >
                <div className={`${service.color} w-14 h-14 rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md shrink-0`}>
                  <service.icon className="w-7 h-7" />
                </div>
                
                <div className="mb-1">
                   <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 border border-slate-100 px-2 py-0.5 rounded-full">
                     {service.category}
                   </span>
                </div>

                <h3 className="text-xl font-bold text-brand-blue mb-3 group-hover:text-brand-orange transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 mb-6 leading-relaxed flex-grow text-sm">
                  {service.description}
                </p>
                
                <div className="mt-auto">
                  {service.isExternal ? (
                    <a 
                      href={service.link}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-center font-bold text-sm ${service.accent} hover:underline`}
                    >
                      {service.buttonLabel || "Access Portal"}
                      <ExternalLink className="w-4 h-4 ml-1.5" />
                    </a>
                  ) : (
                    <button 
                      onClick={() => onServiceSelect(service)}
                      className={`flex items-center font-bold text-sm ${service.accent} hover:underline outline-none focus:outline-none`}
                    >
                      {service.buttonLabel || "View Details"}
                      <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-xl border border-slate-100 shadow-sm">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-brand-blue mb-1">No services found</h3>
            <p className="text-slate-500">
              No services found for "{searchTerm}" in {selectedCategory}.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-4 text-brand-orange font-bold hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesGrid;