import React, { useState, useMemo, useEffect } from 'react';
import { Search, Phone, Mail, Award, ArrowLeft, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataService } from '../services/dataService';
import { Official } from '../types';

const CATEGORIES = ['All', 'National', 'State', 'District', 'Municipal'];

const OfficialsDirectory: React.FC = () => {
  const [officials, setOfficials] = useState<Official[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    DataService.getOfficials().then(setOfficials);
  }, []);

  const filteredData = useMemo(() => {
    return officials.filter(official => {
      const matchesSearch = official.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            official.designation.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'All' || official.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, category, officials]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 animate-fade-in-up">
      <div className="bg-brand-blue text-white py-12 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <Link to="/" className="flex items-center text-brand-orange text-sm font-bold mb-4 hover:underline"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Home</Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Officials Directory</h1>
          <p className="text-slate-300 max-w-2xl text-lg">Connect with the administration.</p>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input type="text" placeholder="Search by name or designation..." className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-orange outline-none text-slate-700" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all border ${category === cat ? 'bg-brand-blue text-white border-brand-blue' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-brand-orange hover:text-brand-orange'}`}>{cat}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((person) => (
            <div key={person.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="h-24 bg-gradient-to-r from-brand-blue to-brand-blue/80 relative">
                <div className="absolute -bottom-10 left-6"><img src={person.image} alt={person.name} className="w-20 h-20 rounded-xl object-cover border-4 border-white shadow-md bg-white" /></div>
                <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider bg-white/20 text-white backdrop-blur-sm">{person.category}</span>
              </div>
              <div className="pt-12 p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-brand-orange transition-colors">{person.name}</h3>
                <div className="flex items-center text-sm font-medium text-brand-blue mb-4"><Award className="w-4 h-4 mr-2 text-brand-orange" />{person.designation}</div>
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  {person.phone ? <a href={`tel:${person.phone}`} className="flex items-center text-sm text-slate-600 hover:text-brand-green"><Phone className="w-4 h-4 mr-3" />{person.phone}</a> : <span className="flex items-center text-sm text-slate-400"><Phone className="w-4 h-4 mr-3" /> N/A</span>}
                  {person.email ? <a href={`mailto:${person.email}`} className="flex items-center text-sm text-slate-600 hover:text-brand-green"><Mail className="w-4 h-4 mr-3" />{person.email}</a> : <span className="flex items-center text-sm text-slate-400"><Mail className="w-4 h-4 mr-3" /> N/A</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfficialsDirectory;