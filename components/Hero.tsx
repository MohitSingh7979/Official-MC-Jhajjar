import React from 'react';
import { ArrowRight, Flame, Droplets, Baby } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onOpenGrievance: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenGrievance }) => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-brand-blue text-white overflow-hidden min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop" 
          alt="Jhajjar City Civic Center" 
          className="w-full h-full object-cover opacity-20 scale-105"
          fetchPriority="high"
          width="1920"
          height="1080"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/90 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-block bg-brand-orange text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider animate-fade-in-up shadow-lg">
            {t('welcome')}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up delay-100">
            {t('hero_title_1')} <br/>
            <span className="text-brand-yellow">{t('hero_title_2')}</span>
          </h1>
          <p className="text-lg text-slate-200 mb-8 leading-relaxed animate-fade-in-up delay-200">
            {t('hero_desc')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300 mb-10">
            <a 
              href="https://online.ulbharyana.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-brand-orange/30 flex items-center justify-center group"
            >
              {t('cta_online')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button 
              onClick={onOpenGrievance}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-lg font-bold transition-all border border-white/20 flex items-center justify-center"
            >
              {t('cta_grievance')}
            </button>
          </div>

          {/* Quick Access Pills */}
          <div className="animate-fade-in-up delay-300 pt-6 border-t border-white/10">
            <p className="text-xs text-slate-300 uppercase tracking-widest font-bold mb-3">{t('trending')}</p>
            <div className="flex flex-wrap gap-3">
              <a href="https://property.ulbharyana.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-brand-blue/50 hover:bg-brand-blue rounded-full text-xs font-medium transition-colors border border-white/20 hover:border-brand-orange">
                <Flame className="w-3 h-3 text-brand-orange mr-2" /> Property Tax
              </a>
              <a href="https://online.ulbharyana.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-brand-blue/50 hover:bg-brand-blue rounded-full text-xs font-medium transition-colors border border-white/20 hover:border-brand-blue">
                <Droplets className="w-3 h-3 text-white mr-2" /> Water Bill
              </a>
              <a href="https://crsorgi.gov.in/web/index.php/auth/login" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-brand-blue/50 hover:bg-brand-blue rounded-full text-xs font-medium transition-colors border border-white/20 hover:border-brand-green">
                <Baby className="w-3 h-3 text-brand-green mr-2" /> Birth Cert
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;