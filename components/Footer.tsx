import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ChevronDown, ChevronUp, Smartphone, Play } from 'lucide-react';

const Footer: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const toggleSection = (id: string) => setOpenSection(openSection === id ? null : id);

  const LINKS = [
    { title: "Quick Links", id: "quick", items: [
      { l: "Pay Property Tax", h: "https://property.ulbharyana.gov.in/" },
      { l: "Birth/Death Certificate", h: "https://crsorgi.gov.in/web/index.php/auth/login" },
      { l: "Trade License", h: "https://online.ulbharyana.gov.in/" },
      { l: "Online Grievance", h: "https://grs.ulbharyana.gov.in/" },
      { l: "Tenders & Auctions", h: "#tenders", local: true },
    ]},
    { title: "External Links", id: "external", items: [
      { l: "ULB Haryana", h: "https://ulbharyana.gov.in" },
      { l: "CM Office Haryana", h: "https://haryanacmoffice.gov.in" },
      { l: "District Administration", h: "https://jhajjar.nic.in" },
      { l: "National Portal of India", h: "https://india.gov.in" },
    ]}
  ];

  return (
    <footer className="bg-brand-blue text-slate-300 text-sm border-t border-brand-blue/50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12">
          
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-6 text-white">
               <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center font-bold text-white">MC</div>
               <span className="text-lg font-bold">MC Jhajjar</span>
            </div>
            <p className="mb-6 leading-relaxed text-slate-300">Committed to providing transparent governance and improved civic amenities for the citizens of Jhajjar.</p>
            <div className="flex space-x-4 mb-8">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="bg-white/10 hover:bg-brand-orange text-white p-2 rounded-full transition-colors"><Icon className="w-4 h-4"/></a>
              ))}
            </div>
            <div className="pt-6 border-t border-white/10">
               <h4 className="text-white font-bold mb-3 flex items-center"><Smartphone className="w-4 h-4 mr-2 text-brand-orange" /> Citizen Mobile Apps</h4>
               <p className="text-xs mb-4 text-slate-400 leading-relaxed">Access grievance redressal, property tax, and other municipal services directly from your phone.</p>
               <a href="https://play.google.com/store/apps/developer?id=Department+of+Urban+Local+Bodies,+Haryana&hl=en_IN" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-white/10 hover:bg-brand-orange text-white px-4 py-2.5 rounded-lg transition-all text-xs font-bold border border-white/10 hover:border-brand-orange group shadow-sm">
                 <Play className="w-3 h-3 mr-2 fill-current group-hover:scale-110 transition-transform" /> View on Google Play
               </a>
            </div>
          </div>

          {LINKS.map(sec => (
            <div key={sec.id} className="border-b md:border-none border-white/10">
              <button onClick={() => toggleSection(sec.id)} className="flex justify-between items-center w-full py-4 text-white font-bold md:cursor-default md:pointer-events-none">
                {sec.title}
                <span className="md:hidden">{openSection === sec.id ? <ChevronUp className="w-4 h-4 text-brand-orange" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}</span>
              </button>
              <div className={`md:block ${openSection === sec.id ? 'block mb-6' : 'hidden'}`}>
                <ul className="space-y-3">
                  {sec.items.map(item => (
                    <li key={item.l}><a href={item.h} target={item.local ? undefined : "_blank"} rel={item.local ? undefined : "noopener noreferrer"} className="hover:text-brand-orange transition-colors">{item.l}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <div className="border-b md:border-none border-white/10 border-b-0">
            <button onClick={() => toggleSection('contact')} className="flex justify-between items-center w-full py-4 text-white font-bold md:cursor-default md:pointer-events-none">
              Contact Us <span className="md:hidden">{openSection === 'contact' ? <ChevronUp className="w-4 h-4 text-brand-orange" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}</span>
            </button>
            <div className={`md:block ${openSection === 'contact' ? 'block mb-6' : 'hidden'}`}>
              <ul className="space-y-4">
                <li className="flex items-start"><MapPin className="w-5 h-5 mr-3 text-brand-orange mt-0.5 shrink-0" /><span>Municipal Council Office,<br/>Near Bus Stand, Jhajjar,<br/>Haryana - 124103</span></li>
                <li className="flex items-center"><Phone className="w-5 h-5 mr-3 text-brand-orange shrink-0" /><span>+91-1251-252002</span></li>
                <li className="flex items-center"><Mail className="w-5 h-5 mr-3 text-brand-orange shrink-0" /><span>sjsecymcjhajjar@gmail.com</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-brand-blue py-6 border-t border-white/10 relative">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <p className="text-center md:text-left mb-4 md:mb-0">© 2023 Municipal Council Jhajjar. All rights reserved.</p>
          <div className="flex flex-wrap justify-center space-x-6">
            <a href="#" className="hover:text-white">Privacy Policy</a><a href="#" className="hover:text-white">Terms of Use</a><a href="#" className="hover:text-white">Sitemap</a><span>Powered by NIC</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;