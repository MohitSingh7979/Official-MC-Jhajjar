import React, { useState, useEffect, useRef } from 'react';
import { CITY_STATS, OFFICIALS, DIGNITARIES, LATEST_NEWS } from '../constants';
import { Calendar, FileText, Download, BarChart2 } from 'lucide-react';
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
            
            {/* Leadership / Dignitaries */}
            <div>
              <div className="flex items-center mb-6">
                 <div className="w-1 h-6 bg-brand-orange mr-3 rounded-full"></div>
                 <h2 className="text-2xl font-bold text-brand-blue">Administration</h2>
              </div>
              
              {/* Top Leadership */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                 {DIGNITARIES.map((person) => (
                   <div key={person.id} className="text-center group">
                      <div className="relative inline-block mb-3">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-100 shadow-md group-hover:border-brand-orange transition-colors">
                           <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                        </div>
                        <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white
                          ${person.category === 'National' ? 'bg-brand-orange' : person.category === 'State' ? 'bg-brand-orange' : 'bg-brand-blue'}`}>
                          {person.category[0]}
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-brand-blue leading-tight">{person.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{person.designation}</p>
                   </div>
                 ))}
              </div>

              {/* Municipal Officials */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Municipal Officers</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {OFFICIALS.map((off) => (
                    <div key={off.id} className="flex items-center bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:border-brand-blue/30 transition-colors">
                       <img src={off.image} alt={off.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                       <div>
                          <h4 className="font-bold text-brand-blue text-sm">{off.name}</h4>
                          <p className="text-xs text-brand-orange font-bold">{off.designation}</p>
                          <div className="mt-1 space-x-2 text-xs text-slate-400">
                             {off.phone && <span>{off.phone}</span>}
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Citizen Poll Section */}
            <div className="bg-brand-blue rounded-2xl p-8 text-white relative overflow-hidden">
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
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden sticky top-24">
              <div className="bg-brand-blue text-white p-4 flex justify-between items-center">
                <h3 className="font-bold flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-brand-orange" />
                  Notice Board
                </h3>
                <span className="text-xs bg-brand-orange px-2 py-1 rounded">Live</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                {LATEST_NEWS.map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => onNewsSelect(item)}
                    className="w-full text-left block p-5 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs px-2 py-1 rounded font-bold uppercase 
                        ${item.category === 'Tender' ? 'bg-brand-blue/10 text-brand-blue' : 
                          item.category === 'Circular' ? 'bg-brand-orange/10 text-brand-orange' : 
                          'bg-brand-green/10 text-brand-green'}`}>
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {item.date}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-brand-blue group-hover:text-brand-orange leading-snug mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-2">{item.summary}</p>
                    <span className="text-xs text-brand-orange font-bold flex items-center group-hover:underline">
                      <Download className="w-3 h-3 mr-1" />
                      View Details
                    </span>
                  </button>
                ))}
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <button className="text-sm font-bold text-brand-blue hover:text-brand-orange transition-colors">View Archives &rarr;</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Dashboard;