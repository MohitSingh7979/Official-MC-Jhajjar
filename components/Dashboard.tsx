import React, { useState, useEffect, useRef } from 'react';
import { CITY_STATS, OFFICIALS, DIGNITARIES, LATEST_NEWS } from '../constants';
import { Calendar, FileText, Download, BarChart2, Mail, Phone, ChevronRight } from 'lucide-react';
import { NewsItem } from '../types';

interface DashboardProps {
  onNewsSelect: (item: NewsItem) => void;
}

// Animated Counter Component
const AnimatedCounter: React.FC<{ end: string }> = ({ end }) => {
  const [count, setCount] = useState(0);
  const numericEnd = parseInt(end.replace(/[^0-9]/g, ''), 10);
  const duration = 2000;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * numericEnd));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, numericEnd]);

  const suffix = end.replace(/[0-9]/g, '');
  return <span ref={ref}>{count}{suffix}</span>;
};

const Dashboard: React.FC<DashboardProps> = ({ onNewsSelect }) => {
  const [pollVoted, setPollVoted] = useState(false);
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* City Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {CITY_STATS.map((stat, idx) => (
            <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center hover:border-brand-orange transition-colors shadow-sm group">
              <div className="inline-flex p-3 bg-white rounded-full shadow-sm mb-3 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                <stat.icon className={`w-6 h-6 ${stat.color} group-hover:text-white`} />
              </div>
              <div className="text-2xl font-bold text-brand-blue mb-1">
                <AnimatedCounter end={stat.value} />
              </div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Leadership / Dignitaries Section - Redesigned */}
            <div>
              <div className="flex items-center mb-8">
                 <div className="w-1.5 h-8 bg-brand-orange mr-4 rounded-full"></div>
                 <div>
                   <h2 className="text-2xl font-bold text-brand-blue leading-none">Administration</h2>
                   <p className="text-sm text-slate-500 mt-1">Key officials serving the citizens of Jhajjar</p>
                 </div>
              </div>
              
              {/* Hierarchy Row 1: National & State (Large Cards) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                 {DIGNITARIES.filter(d => ['National', 'State'].includes(d.category)).map((person) => (
                   <div key={person.id} className="flex bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                      <div className="w-32 bg-slate-100 shrink-0 relative">
                         <img src={person.image} alt={person.name} className="w-full h-full object-cover object-top" />
                      </div>
                      <div className="p-5 flex flex-col justify-center">
                         <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 
                           ${person.category === 'National' ? 'text-brand-orange' : 'text-brand-blue'}`}>
                           {person.category} Leadership
                         </span>
                         <h3 className="font-bold text-lg text-slate-800 leading-tight mb-1">{person.name}</h3>
                         <p className="text-sm text-slate-500 font-medium">{person.designation}</p>
                      </div>
                   </div>
                 ))}
              </div>

              {/* Hierarchy Row 2: District Administration */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">District Administration</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {DIGNITARIES.filter(d => d.category === 'District').map((person) => (
                    <div key={person.id} className="flex items-center bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                       <img src={person.image} alt={person.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm mr-4" />
                       <div>
                          <h4 className="font-bold text-brand-blue">{person.name}</h4>
                          <p className="text-xs font-bold text-brand-orange uppercase">{person.designation}</p>
                       </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hierarchy Row 3: Municipal Administration */}
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Municipal Council Officers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {OFFICIALS.map((off) => (
                    <div key={off.id} className="group relative bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-brand-blue/30 hover:shadow-md transition-all">
                       <div className="flex items-center mb-3">
                          <img src={off.image} alt={off.name} className="w-12 h-12 rounded-full object-cover border border-slate-100 mr-3" />
                          <div>
                             <h4 className="font-bold text-slate-800">{off.name}</h4>
                             <p className="text-xs font-bold text-brand-blue">{off.designation}</p>
                          </div>
                       </div>
                       <div className="pt-3 border-t border-slate-50 flex flex-col space-y-1.5">
                          {off.phone && (
                            <a href={`tel:${off.phone}`} className="flex items-center text-xs text-slate-500 hover:text-brand-orange transition-colors">
                              <Phone className="w-3 h-3 mr-2" /> {off.phone}
                            </a>
                          )}
                          {off.email && (
                            <a href={`mailto:${off.email}`} className="flex items-center text-xs text-slate-500 hover:text-brand-orange transition-colors">
                              <Mail className="w-3 h-3 mr-2" /> {off.email}
                            </a>
                          )}
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Citizen Poll Section */}
            <div className="bg-brand-blue rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-32 bg-brand-orange rounded-full blur-3xl opacity-20"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <BarChart2 className="w-6 h-6 text-brand-orange mr-3" />
                  <h3 className="text-xl font-bold">Citizen Opinion Poll</h3>
                </div>
                
                {!pollVoted ? (
                  <div>
                    <p className="mb-6 text-slate-300">Which civic facility needs the most immediate improvement in your ward?</p>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {['Road Maintenance', 'Street Lighting', 'Garbage Collection'].map((option) => (
                        <button 
                          key={option}
                          onClick={() => setPollVoted(true)}
                          className="bg-white/10 hover:bg-brand-orange border border-white/10 hover:border-brand-orange transition-all py-3 px-4 rounded-lg font-medium text-sm text-left flex justify-between group"
                        >
                          {option}
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity">Vote</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="animate-fade-in-up">
                    <p className="mb-4 text-brand-green font-bold">Thank you for your vote!</p>
                    <div className="space-y-4">
                      {[
                        { label: 'Road Maintenance', width: '45%' },
                        { label: 'Street Lighting', width: '25%' },
                        { label: 'Garbage Collection', width: '30%' }
                      ].map((result, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-xs mb-1 text-slate-400">
                            <span>{result.label}</span>
                            <span>{result.width}</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div className="bg-brand-orange h-2 rounded-full transition-all duration-1000" style={{ width: result.width }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Sidebar / News Column */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden sticky top-28">
              <div className="bg-brand-blue text-white p-5 flex justify-between items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-orange/10"></div>
                <h3 className="font-bold flex items-center relative z-10 text-lg">
                  <FileText className="w-5 h-5 mr-2 text-brand-orange" />
                  Public Notices
                </h3>
                <span className="text-[10px] font-bold bg-brand-orange text-white px-2 py-0.5 rounded shadow-sm relative z-10 uppercase tracking-wide">Live Updates</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto bg-slate-50/50">
                {LATEST_NEWS.map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => onNewsSelect(item)}
                    className="w-full text-left block p-5 hover:bg-white transition-all group relative border-l-4 border-transparent hover:border-brand-orange"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide 
                        ${item.category === 'Tender' ? 'bg-blue-100 text-brand-blue' : 
                          item.category === 'Circular' ? 'bg-orange-100 text-brand-orange' : 
                          'bg-green-100 text-brand-green'}`}>
                        {item.category}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center font-medium">
                        <Calendar className="w-3 h-3 mr-1" />
                        {item.date}
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
                ))}
              </div>
              <div className="p-4 bg-white border-t border-slate-100 text-center">
                <button className="text-sm font-bold text-brand-blue hover:text-brand-orange transition-colors">View All Notices &rarr;</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Dashboard;