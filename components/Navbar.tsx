import React, { useState } from 'react';
import { Menu, X, ChevronDown, Search, Phone, Mail, LogIn, ChevronRight, Home } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import useScrollLock from '../hooks/useScrollLock';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  onSearchClick: () => void;
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchClick, onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t } = useLanguage();
  
  // Lock scroll when mobile menu is open
  useScrollLock(isOpen);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Helper to get translated label
  const getLabel = (label: string) => {
    switch(label) {
      case 'Home': return t('nav_home');
      case 'About Us': return t('nav_about');
      case 'Departments': return t('nav_depts');
      case 'Services': return t('nav_services');
      case 'Tenders': return t('nav_tenders');
      case 'RTI': return t('nav_rti');
      case 'Contact': return t('nav_contact');
      default: return label;
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50 border-t-4 border-brand-orange">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center min-h-[5.5rem] py-3 md:py-0 md:h-28">
            {/* Logo Section */}
            <a href="#" className="flex items-center gap-3 sm:gap-4 flex-shrink-0 group relative z-20">
               <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Emblem_of_Haryana.svg/800px-Emblem_of_Haryana.svg.png" 
                 alt="Government of Haryana Emblem" 
                 referrerPolicy="no-referrer"
                 className="h-14 sm:h-16 md:h-20 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
               />
               <div className="flex flex-col justify-center h-full border-l-2 border-slate-200 pl-3 sm:pl-4 py-1">
                  <span className="text-[10px] sm:text-xs font-bold text-brand-orange tracking-widest uppercase leading-none mb-1">Government of Haryana</span>
                  <h1 className="text-lg sm:text-2xl lg:text-2xl 2xl:text-3xl font-extrabold text-brand-blue leading-none tracking-tight group-hover:text-brand-blue/90 transition-colors">
                    Municipal Council Jhajjar
                  </h1>
               </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-5 2xl:space-x-8">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative group">
                  <a 
                    href={item.href}
                    className="text-brand-blue font-bold text-sm uppercase tracking-wide hover:text-brand-orange focus:text-brand-orange flex items-center py-2 transition-colors relative outline-none focus:outline-none"
                    aria-haspopup={item.subItems ? "true" : undefined}
                  >
                    {getLabel(item.label)}
                    {item.subItems && (
                      <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                    )}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full group-focus-within:w-full"></span>
                  </a>
                  
                  {item.subItems && (
                    <div 
                      className="absolute left-0 mt-0 w-64 bg-white border border-slate-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0 border-t-4 border-t-brand-blue z-50"
                      role="menu"
                      aria-label={`${item.label} submenu`}
                    >
                      <div className="py-2">
                        {item.subItems.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            className="block px-4 py-2.5 text-sm text-brand-blue hover:bg-brand-blue/5 hover:text-brand-orange focus:bg-brand-blue/5 focus:text-brand-orange transition-colors border-l-4 border-transparent hover:border-brand-orange focus:border-brand-orange outline-none"
                            role="menuitem"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <button 
                  onClick={onSearchClick}
                  className="text-brand-blue hover:text-brand-orange p-2 transition-colors focus:ring-2 focus:ring-brand-orange rounded"
                  aria-label="Search"
                >
                   <Search className="w-5 h-5" />
                </button>
                <button 
                  onClick={onLoginClick}
                  className="bg-brand-blue text-white px-6 py-2.5 rounded-md font-bold text-sm uppercase tracking-wide hover:bg-brand-orange focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-all shadow-md hover:shadow-lg flex items-center"
                >
                  <LogIn className="w-4 h-4 mr-2" /> {t('login')}
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="xl:hidden p-2 text-brand-blue hover:text-brand-orange rounded-md hover:bg-slate-50 transition-colors"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 z-[60] xl:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'} xl:hidden`}
      >
        {/* Drawer Header */}
        <div className="p-5 bg-brand-blue text-white flex justify-between items-center shrink-0">
          <div>
            <h2 className="font-bold text-xl leading-tight">MC Jhajjar</h2>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-6 mb-8 space-y-3">
             <button 
                onClick={() => { onLoginClick(); setIsOpen(false); }}
                className="w-full bg-brand-orange text-white py-3.5 rounded-xl font-bold shadow-md flex items-center justify-center hover:bg-brand-orange/90 transition-colors"
              >
                 <LogIn className="w-5 h-5 mr-3" /> {t('login')}
              </button>
              <button 
                onClick={() => { onSearchClick(); setIsOpen(false); }}
                className="w-full bg-slate-50 text-slate-700 py-3.5 rounded-xl font-bold border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
              >
                 <Search className="w-5 h-5 mr-3" /> {t('search')}
              </button>
          </div>

          <div className="border-t border-slate-100">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="border-b border-slate-50">
                <div 
                  className={`flex justify-between items-center px-6 py-4 font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer ${activeDropdown === item.label ? 'bg-slate-50 text-brand-blue' : ''}`}
                  onClick={() => {
                    if (item.subItems) {
                      setActiveDropdown(activeDropdown === item.label ? null : item.label);
                    } else {
                      setIsOpen(false);
                      window.location.href = item.href;
                    }
                  }}
                >
                  <span className="flex items-center text-base">
                    {item.label === 'Home' && <Home className="w-5 h-5 mr-3 text-brand-orange" />}
                    {getLabel(item.label)}
                  </span>
                  {item.subItems && (
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180 text-brand-orange' : ''}`} />
                  )}
                </div>
                
                {/* Submenu */}
                {item.subItems && (
                  <div className={`bg-slate-50 overflow-hidden transition-all duration-300 ${activeDropdown === item.label ? 'max-h-96' : 'max-h-0'}`}>
                    {item.subItems.map((sub) => (
                      <a 
                        key={sub.label} 
                        href={sub.href} 
                        className="flex items-center px-10 py-3 text-sm text-slate-600 hover:text-brand-orange border-l-4 border-transparent hover:border-brand-orange transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <ChevronRight className="w-4 h-4 mr-2 opacity-50" />
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 shrink-0">
           <div className="flex flex-col space-y-3 text-sm font-medium text-slate-600">
              <a href="tel:+911251252002" className="flex items-center hover:text-brand-blue group">
                 <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-3 shadow-sm group-hover:border-brand-blue transition-colors">
                    <Phone className="w-5 h-5 text-brand-orange" />
                 </div>
                 +91-1251-252002
              </a>
              <a href="mailto:sjsecymcjhajjar@gmail.com" className="flex items-center hover:text-brand-blue group">
                 <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-3 shadow-sm group-hover:border-brand-blue transition-colors">
                    <Mail className="w-5 h-5 text-brand-orange" />
                 </div>
                 sjsecymcjhajjar@gmail.com
              </a>
           </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;