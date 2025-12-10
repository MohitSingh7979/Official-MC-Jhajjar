import React from 'react';
import { Phone, Mail, Globe } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <div className="bg-brand-blue text-white text-xs py-2 px-4 hidden md:block">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-6">
          <a href="tel:+911251252002" className="flex items-center hover:text-brand-yellow transition-colors">
            <Phone className="w-3 h-3 mr-2" />
            +91-1251-252002
          </a>
          <a href="mailto:secymc.jhajjar@hry.nic.in" className="flex items-center hover:text-brand-yellow transition-colors">
            <Mail className="w-3 h-3 mr-2" />
            secymc.jhajjar@hry.nic.in
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Globe className="w-3 h-3 mr-1" />
            English / हिंदी
          </span>
          <div className="border-l border-white/20 h-4 mx-2"></div>
          <a href="#" className="hover:text-brand-yellow">Skip to Main Content</a>
          <a href="#" className="hover:text-brand-yellow">Screen Reader Access</a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;