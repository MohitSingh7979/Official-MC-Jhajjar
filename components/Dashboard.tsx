import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, HelpCircle } from 'lucide-react';
import { NewsItem, Stat, Official } from '../types';
import { DataService } from '../services/dataService';
import { ICON_MAP } from '../constants';
import PollWidget from './PollWidget';
import PublicNotices from './PublicNotices';

interface DashboardProps {
  onNewsSelect: (item: NewsItem) => void;
}

const AnimatedCounter: React.FC<{ end: string }> = ({ end }) => {
  const [count, setCount] = useState(0);
  const numericEnd = parseInt(end.replace(/[^0-9]/g, ''), 10);
  const duration = 2000;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 4)) * numericEnd));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, numericEnd]);

  return <span ref={ref}>{count}{end.replace(/[0-9]/g, '')}</span>;
};

const Dashboard: React.FC<DashboardProps> = ({ onNewsSelect }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [officials, setOfficials] = useState<Official[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [newsData, statsData, officialsData] = await Promise.all([
        DataService.getNews(),
        DataService.getStats(),
        DataService.getOfficials()
      ]);
      setNews(newsData);
      setStats(statsData);
      setOfficials(officialsData);
      setIsLoadingNews(false);
    };
    loadData();
  }, []);

  const dignitaries = officials.filter(o => ['National', 'State', 'District'].includes(o.category));
  const municipalOfficials = officials.filter(o => o.category === 'Municipal');
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* City Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => {
            const Icon = ICON_MAP[stat.icon] || HelpCircle;
            return (
              <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center hover:border-brand-orange transition-colors shadow-sm group">
                <div className="inline-flex p-3 bg-white rounded-full shadow-sm mb-3 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <Icon className={`w-6 h-6 ${stat.color} group-hover:text-white`} />
                </div>
                <div className="text-2xl font-bold text-brand-blue mb-1"><AnimatedCounter end={stat.value} /></div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wide">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <div className="flex items-center mb-8">
                 <div className="w-1.5 h-8 bg-brand-orange mr-4 rounded-full"></div>
                 <div><h2 className="text-2xl font-bold text-brand-blue leading-none">Administration</h2><p className="text-sm text-slate-500 mt-1">Key officials serving Jhajjar</p></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                 {dignitaries.slice(0, 2).map((person) => (
                   <div key={person.id} className="flex bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                      <div className="w-32 bg-slate-100 shrink-0 relative"><img src={person.image} alt={person.name} className="w-full h-full object-cover object-top" /></div>
                      <div className="p-5 flex flex-col justify-center">
                         <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${person.category === 'National' ? 'text-brand-orange' : 'text-brand-blue'}`}>{person.category} Leadership</span>
                         <h3 className="font-bold text-lg text-slate-800 leading-tight mb-1">{person.name}</h3>
                         <p className="text-sm text-slate-500 font-medium">{person.designation}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">District & Municipal Administration</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[...dignitaries.slice(2), ...municipalOfficials].slice(0, 4).map((person) => (
                    <div key={person.id} className="group relative bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-brand-blue/30 hover:shadow-md transition-all">
                       <div className="flex items-center mb-3">
                          <img src={person.image} alt={person.name} className="w-12 h-12 rounded-full object-cover border border-slate-100 mr-3" />
                          <div><h4 className="font-bold text-slate-800">{person.name}</h4><p className="text-xs font-bold text-brand-blue">{person.designation}</p></div>
                       </div>
                       {(person.phone || person.email) && (
                         <div className="pt-3 border-t border-slate-50 flex flex-col space-y-1.5">
                            {person.phone && <a href={`tel:${person.phone}`} className="flex items-center text-xs text-slate-500 hover:text-brand-orange"><Phone className="w-3 h-3 mr-2" /> {person.phone}</a>}
                            {person.email && <a href={`mailto:${person.email}`} className="flex items-center text-xs text-slate-500 hover:text-brand-orange"><Mail className="w-3 h-3 mr-2" /> {person.email}</a>}
                         </div>
                       )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Poll Component */}
            <PollWidget />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <PublicNotices 
              news={news} 
              isLoading={isLoadingNews} 
              onNewsSelect={onNewsSelect} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;