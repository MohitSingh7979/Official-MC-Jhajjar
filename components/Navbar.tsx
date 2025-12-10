import React, { useState } from 'react';
import { Menu, X, ChevronDown, Search, Phone, Mail, LogIn } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

interface NavbarProps {
  onSearchClick: () => void;
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchClick, onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-t-4 border-brand-orange">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
             <img 
               src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Emblem_of_Haryana.svg/800px-Emblem_of_Haryana.svg.png" 
               alt="Government of Haryana" 
               className="h-16 w-auto object-contain drop-shadow-sm"
             />
             <div className="flex flex-col border-l-2 border-slate-200 pl-4 h-12 justify-center">
                <span className="text-xl font-bold text-brand-blue leading-none mb-1">Municipal Council Jhajjar</span>
                <span className="text-xs text-brand-orange font-bold tracking-widest uppercase">Government of Haryana</span>
             </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative group">
                <a 
                  href={item.href}
                  className="text-brand-blue font-semibold hover:text-brand-orange flex items-center py-2 transition-colors"
                >
                  {item.label}
                  {item.subItems && <ChevronDown className="w-4 h-4 ml-1" />}
                </a>
                
                {item.subItems && (
                  <div className="absolute left-0 mt-0 w-56 bg-white border border-slate-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 border-t-4 border-t-brand-blue">
                    <div className="py-2">
                      {item.subItems.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-brand-blue hover:bg-brand-blue/5 hover:text-brand-orange"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button 
              onClick={onSearchClick}
              className="text-brand-blue hover:text-brand-orange p-2 flex items-center gap-2 group"
              aria-label="Search"
            >
               <Search className="w-5 h-5" />
               <span className="hidden xl:inline text-xs bg-slate-100 px-2 py-0.5 rounded text-brand-blue border border-slate-200 group-hover:border-brand-orange">⌘K</span>
            </button>
            <button 
              onClick={onLoginClick}
              className="bg-brand-orange text-white px-5 py-2 rounded-md font-bold hover:bg-brand-orange/90 transition-colors shadow-sm flex items-center"
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-brand-blue hover:text-brand-orange"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 absolute w-full left-0 shadow-lg max-h-[90vh] overflow-y-auto">
          <div className="flex flex-col p-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <div 
                  className="flex justify-between items-center py-3 border-b border-slate-50 text-brand-blue font-semibold"
                  onClick={() => item.subItems && setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                >
                  <a href={item.href} onClick={() => !item.subItems && setIsOpen(false)}>
                    {item.label}
                  </a>
                  {item.subItems && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  )}
                </div>
                {item.subItems && activeDropdown === item.label && (
                  <div className="bg-slate-50 pl-4 py-2 space-y-2 rounded-md mt-1 border-l-2 border-brand-orange">
                    {item.subItems.map((sub) => (
                      <a 
                        key={sub.label} 
                        href={sub.href} 
                        className="block py-2 text-sm text-brand-blue hover:text-brand-orange"
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="pt-4 mt-2 border-t border-slate-100">
               <div className="flex flex-col space-y-3 mb-4 text-sm text-brand-blue">
                  <a href="tel:+911251252002" className="flex items-center hover:text-brand-orange">
                     <Phone className="w-4 h-4 mr-3" /> +91-1251-252002
                  </a>
                  <a href="mailto:secymc.jhajjar@hry.nic.in" className="flex items-center hover:text-brand-orange">
                     <Mail className="w-4 h-4 mr-3" /> secymc.jhajjar@hry.nic.in
                  </a>
               </div>
               <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => {
                      onSearchClick();
                      setIsOpen(false);
                    }}
                    className="w-full bg-slate-100 text-brand-blue py-3 rounded-md font-bold hover:bg-slate-200 flex items-center justify-center"
                  >
                     <Search className="w-4 h-4 mr-2" /> Search Site
                  </button>
                  <button 
                    onClick={() => {
                      onLoginClick();
                      setIsOpen(false);
                    }}
                    className="w-full bg-brand-orange text-white py-3 rounded-md font-bold hover:bg-brand-orange/90 flex items-center justify-center"
                  >
                     <LogIn className="w-4 h-4 mr-2" /> Login
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;