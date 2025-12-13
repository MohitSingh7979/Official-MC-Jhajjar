import React from 'react';
import { Phone, Mail, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TopBar: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="bg-brand-blue text-white text-xs py-2 px-4 hidden md:block">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-6">
          <a href="tel:+911251252002" className="flex items-center hover:text-brand-yellow transition-colors">
            <Phone className="w-3 h-3 mr-2" />
            +91-1251-252002
          </a>
          <a href="mailto:sjsecymcjhajjar@gmail.com" className="flex items-center hover:text-brand-yellow transition-colors">
            <Mail className="w-3 h-3 mr-2" />
            sjsecymcjhajjar@gmail.com
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center hover:text-brand-yellow transition-colors focus:outline-none"
          >
            <Globe className="w-3 h-3 mr-1" />
            {language === 'en' ? 'हिंदी में देखें' : 'View in English'}
          </button>
          <div className="border-l border-white/20 h-4 mx-2"></div>
          <a href="#" className="hover:text-brand-yellow">Skip to Main Content</a>
          <a href="#" className="hover:text-brand-yellow">Screen Reader Access</a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;