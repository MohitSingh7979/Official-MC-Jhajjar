import React from 'react';
import { ArrowRight, Flame, Droplets, Baby } from 'lucide-react';

interface HeroProps {
  onOpenGrievance: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenGrievance }) => {
  return (
    <div className="relative bg-brand-blue text-white overflow-hidden min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale&blur=2" 
          alt="Jhajjar City" 
          className="w-full h-full object-cover opacity-20 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
          fetchPriority="high"
          width="1920"
          height="1080"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/90 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-block bg-brand-orange text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider animate-fade-in-up shadow-lg">
            Welcome to Jhajjar
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up delay-100">
            Building a Cleaner, <br/>
            <span className="text-brand-yellow">Greener</span> Tomorrow
          </h1>
          <p className="text-lg text-slate-200 mb-8 leading-relaxed animate-fade-in-up delay-200">
            The Municipal Council of Jhajjar is dedicated to providing world-class civic amenities 
            and ensuring sustainable urban development for all citizens.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300 mb-10">
            <a 
              href="https://online.ulbharyana.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-brand-orange/30 flex items-center justify-center group"
            >
              Online Citizen Services
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button 
              onClick={onOpenGrievance}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-lg font-bold transition-all border border-white/20 flex items-center justify-center"
            >
              Lodge Grievance
            </button>
          </div>

          {/* Quick Access Pills */}
          <div className="animate-fade-in-up delay-300 pt-6 border-t border-white/10">
            <p className="text-xs text-slate-300 uppercase tracking-widest font-bold mb-3">Trending Services</p>
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