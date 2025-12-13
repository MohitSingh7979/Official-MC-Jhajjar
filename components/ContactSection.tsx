import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Map as MapIcon, Expand, Loader2 } from 'lucide-react';
import MapModal from './MapModal';

const ContactSection: React.FC = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        setIsSubmitting(false);
        alert("Message sent!");
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center text-brand-orange font-bold tracking-wider uppercase text-sm mb-2">
            Get in Touch
          </div>
          <h2 className="text-3xl font-bold text-brand-blue">Contact & Location</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
          {/* Map & Info Side */}
          <div className="bg-brand-blue text-white p-8 md:p-12 relative overflow-hidden flex flex-col justify-between">
             {/* Abstract Decor */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

             <div className="relative z-10 space-y-8 mb-8">
               <div>
                 <h3 className="text-2xl font-bold mb-6">Municipal Council Jhajjar</h3>
                 <div className="space-y-4 text-slate-300">
                   <div className="flex items-start">
                     <MapPin className="w-5 h-5 mr-4 text-brand-orange mt-1 shrink-0" />
                     <p>Near Bus Stand, Rohtak Road,<br/>Jhajjar, Haryana - 124103</p>
                   </div>
                   <div className="flex items-center">
                     <Phone className="w-5 h-5 mr-4 text-brand-orange shrink-0" />
                     <p>+91-1251-252002</p>
                   </div>
                   <div className="flex items-center">
                     <Mail className="w-5 h-5 mr-4 text-brand-orange shrink-0" />
                     <p>sjsecymcjhajjar@gmail.com</p>
                   </div>
                   <div className="flex items-center">
                     <Clock className="w-5 h-5 mr-4 text-brand-orange shrink-0" />
                     <p>Mon - Fri: 9:00 AM - 5:00 PM</p>
                   </div>
                 </div>
               </div>
             </div>

             {/* Static Map Placeholder */}
             <div 
               onClick={() => setIsMapOpen(true)}
               className="w-full h-64 bg-slate-800 rounded-xl overflow-hidden relative group shadow-lg border border-white/10 cursor-pointer transition-transform hover:scale-[1.02] ring-4 ring-transparent hover:ring-brand-orange/30"
               role="button"
               aria-label="Open Interactive Map"
               tabIndex={0}
               onKeyDown={(e) => e.key === 'Enter' && setIsMapOpen(true)}
             >
               {/* Static Map Image */}
               <img 
                 src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" 
                 alt="Map Location Preview" 
                 className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity scale-110 group-hover:scale-100 duration-700"
               />
               
               {/* Interactive Overlay */}
               <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-brand-blue/30 backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all">
                  <div className="bg-brand-orange text-white p-4 rounded-full shadow-xl mb-3 group-hover:scale-110 transition-transform duration-300 animate-bounce group-hover:animate-none">
                      <MapIcon className="w-8 h-8" />
                  </div>
                  <span className="bg-white text-brand-blue text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center group-hover:bg-brand-orange group-hover:text-white transition-colors">
                      <Expand className="w-3 h-3 mr-2" />
                      View Interactive Map
                  </span>
               </div>
               
               <div className="absolute bottom-3 right-3 bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                 Google Maps
               </div>
             </div>
          </div>

          {/* Form Side */}
          <div className="bg-slate-50 p-8 md:p-12">
            <h3 className="text-xl font-bold text-slate-800 mb-2">General Inquiry</h3>
            <p className="text-slate-500 text-sm mb-6">
              For specific complaints, please use the <button className="text-brand-orange font-bold hover:underline">Grievance Portal</button>. 
              For other queries, send us a message.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-orange outline-none placeholder:text-slate-500 bg-white" required />
                <input type="text" placeholder="Last Name" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-orange outline-none placeholder:text-slate-500 bg-white" required />
              </div>
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-orange outline-none placeholder:text-slate-500 bg-white" required />
              <input type="text" placeholder="Subject" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-orange outline-none placeholder:text-slate-500 bg-white" required />
              <textarea rows={4} placeholder="Your Message" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-orange outline-none resize-none placeholder:text-slate-500 bg-white" required></textarea>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-3 rounded-lg transition-all shadow-md flex items-center justify-center disabled:opacity-70 disabled:cursor-wait"
              >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending Message...
                    </>
                ) : (
                    <>
                        Send Message <Send className="w-4 h-4 ml-2" />
                    </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      <MapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
    </section>
  );
};

export default ContactSection;