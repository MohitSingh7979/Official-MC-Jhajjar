import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ChevronDown, ChevronUp, Smartphone, Play } from 'lucide-react';

const Footer: React.FC = () => {
  // Mobile Accordion State
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const AccordionHeader: React.FC<{ title: string; id: string }> = ({ title, id }) => (
    <button 
      onClick={() => toggleSection(id)}
      className="flex justify-between items-center w-full py-4 text-white font-bold md:cursor-default md:pointer-events-none"
    >
      {title}
      <span className="md:hidden">
        {openSection === id ? <ChevronUp className="w-4 h-4 text-brand-orange" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
      </span>
    </button>
  );

  return (
    <footer className="bg-brand-blue text-slate-300 text-sm border-t border-brand-blue/50">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12">
          
          {/* About - Always Visible */}
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-6 text-white">
               <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center font-bold text-white">MC</div>
               <span className="text-lg font-bold">MC Jhajjar</span>
            </div>
            <p className="mb-6 leading-relaxed text-slate-300">
              Committed to providing transparent governance and improved civic amenities for the citizens of Jhajjar.
            </p>
            <div className="flex space-x-4 mb-8">
              <a href="#" aria-label="Facebook" className="bg-white/10 hover:bg-brand-orange text-white p-2 rounded-full transition-colors"><Facebook className="w-4 h-4"/></a>
              <a href="#" aria-label="Twitter" className="bg-white/10 hover:bg-brand-orange text-white p-2 rounded-full transition-colors"><Twitter className="w-4 h-4"/></a>
              <a href="#" aria-label="Instagram" className="bg-white/10 hover:bg-brand-orange text-white p-2 rounded-full transition-colors"><Instagram className="w-4 h-4"/></a>
            </div>

            {/* App Download Section */}
            <div className="pt-6 border-t border-white/10">
               <h4 className="text-white font-bold mb-3 flex items-center">
                 <Smartphone className="w-4 h-4 mr-2 text-brand-orange" />
                 Citizen Mobile Apps
               </h4>
               <p className="text-xs mb-4 text-slate-400 leading-relaxed">
                 Access grievance redressal, property tax, and other municipal services directly from your phone.
               </p>
               <a 
                 href="https://play.google.com/store/apps/developer?id=Department+of+Urban+Local+Bodies,+Haryana&hl=en_IN"
                 target="_blank"
                 rel="noopener noreferrer" 
                 className="inline-flex items-center bg-white/10 hover:bg-brand-orange text-white px-4 py-2.5 rounded-lg transition-all text-xs font-bold border border-white/10 hover:border-brand-orange group shadow-sm"
               >
                 <Play className="w-3 h-3 mr-2 fill-current group-hover:scale-110 transition-transform" />
                 View on Google Play
               </a>
            </div>
          </div>

          {/* Quick Links Accordion */}
          <div className="border-b md:border-none border-white/10">
            <AccordionHeader title="Quick Links" id="quick-links" />
            <div className={`md:block ${openSection === 'quick-links' ? 'block mb-6' : 'hidden'}`}>
              <ul className="space-y-3">
                <li><a href="https://property.ulbharyana.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">Pay Property Tax</a></li>
                <li><a href="https://crsorgi.gov.in/web/index.php/auth/login" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">Birth/Death Certificate</a></li>
                <li><a href="https://online.ulbharyana.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">Trade License</a></li>
                <li><a href="https://grs.ulbharyana.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">Online Grievance</a></li>
                <li><a href="#tenders" className="hover:text-brand-orange transition-colors">Tenders & Auctions</a></li>
              </ul>
            </div>
          </div>

          {/* External Links Accordion */}
          <div className="border-b md:border-none border-white/10">
            <AccordionHeader title="External Links" id="external-links" />
            <div className={`md:block ${openSection === 'external-links' ? 'block mb-6' : 'hidden'}`}>
              <ul className="space-y-3">
                <li><a href="https://ulbharyana.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">ULB Haryana</a></li>
                <li><a href="https://haryanacmoffice.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">CM Office Haryana</a></li>
                <li><a href="https://jhajjar.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">District Administration</a></li>
                <li><a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">National Portal of India</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Accordion */}
          <div className="border-b md:border-none border-white/10 border-b-0">
            <AccordionHeader title="Contact Us" id="contact" />
            <div className={`md:block ${openSection === 'contact' ? 'block mb-6' : 'hidden'}`}>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-brand-orange mt-0.5 shrink-0" />
                  <span>Municipal Council Office,<br/>Near Bus Stand, Jhajjar,<br/>Haryana - 124103</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-brand-orange shrink-0" />
                  <span>+91-1251-252002</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-brand-orange shrink-0" />
                  <span>secymc.jhajjar@hry.nic.in</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright - Using Brand Blue with transparency/border for subtle distinction instead of arbitrary hex */}
      <div className="bg-brand-blue py-6 border-t border-white/10 relative">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <p className="text-center md:text-left mb-4 md:mb-0">© 2023 Municipal Council Jhajjar. All rights reserved.</p>
          <div className="flex flex-wrap justify-center space-x-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
            <a href="#" className="hover:text-white">Sitemap</a>
            <span>Powered by NIC</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;