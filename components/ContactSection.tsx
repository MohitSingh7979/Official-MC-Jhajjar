import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
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
          <div className="bg-brand-blue text-white p-8 md:p-12 relative overflow-hidden">
             {/* Abstract Decor */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

             <div className="relative z-10 space-y-8">
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
                     <p>secymc.jhajjar@hry.nic.in</p>
                   </div>
                   <div className="flex items-center">
                     <Clock className="w-5 h-5 mr-4 text-brand-orange shrink-0" />
                     <p>Mon - Fri: 9:00 AM - 5:00 PM</p>
                   </div>
                 </div>
               </div>

               {/* Embed Placeholder */}
               <div className="w-full h-64 bg-slate-800 rounded-xl overflow-hidden relative group">
                 <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.467456722384!2d76.6508!3d28.6258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d9d43e2702755%3A0x6b3b55502758169!2sJhajjar%2C%20Haryana!5e0!3m2!1sen!2sin!4v1697529000000!5m2!1sen!2sin" 
                   width="100%" 
                   height="100%" 
                   style={{border:0}} 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   className="opacity-70 group-hover:opacity-100 transition-opacity"
                   title="Jhajjar Map"
                 ></iframe>
                 <div className="absolute bottom-4 right-4 bg-white text-brand-blue text-xs font-bold px-3 py-1 rounded shadow-lg pointer-events-none">
                   Locate on Map
                 </div>
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

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-orange outline-none" required />
                <input type="text" placeholder="Last Name" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-orange outline-none" required />
              </div>
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-orange outline-none" required />
              <input type="text" placeholder="Subject" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-orange outline-none" required />
              <textarea rows={4} placeholder="Your Message" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-orange outline-none resize-none" required></textarea>
              
              <button type="submit" className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-3 rounded-lg transition-all shadow-md flex items-center justify-center">
                Send Message <Send className="w-4 h-4 ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;