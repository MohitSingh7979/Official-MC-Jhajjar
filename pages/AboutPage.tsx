import React from 'react';
import { History, Map, Users, Landmark, Trees } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen animate-fade-in-up">
      <div className="bg-brand-blue text-white py-12 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-slate-300 max-w-2xl text-lg">Rich heritage and a vision for the future.</p>
        </div>
      </div>

      <section className="py-20 border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 order-2 md:order-1">
              <div className="inline-flex items-center text-brand-orange font-bold tracking-wider uppercase text-sm mb-3">
                <History className="w-4 h-4 mr-2" /> Our Heritage
              </div>
              <h2 className="text-4xl font-bold text-brand-blue mb-6 leading-tight">History of Jhajjar</h2>
              <div className="prose prose-slate text-slate-600 space-y-4 text-justify">
                <p>
                  The town of Jhajjar, headquarters of the district, is said to have been founded by one Chhajju and passed to the hands of different rulers. The name was derived from Chhajunagar, which changed to Jhajjar over time. It naturally became part of the territory of the Nawab of Jhajjar during the British East India Company era.
                </p>
                <p>
                  Jhajjar holds immense historical significance due to its active participation in the <strong>First War of Independence in 1857</strong>. The Nawab of Jhajjar, Abdur Rahman Khan, played a pivotal role in the uprising against British rule, for which he was martyred. The district is proud of its brave soldiers and martyrs who have served the nation.
                </p>
                <p>
                   Modern Jhajjar is a growing educational and industrial hub, located strategically near New Delhi. The Municipal Council, constituted in 1954, oversees the civic administration, ensuring the preservation of its heritage sites—like the historic gates and the Gurukul Museum—while fostering urban development.
                </p>
              </div>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="relative">
                 <div className="absolute -inset-4 bg-brand-orange/20 rounded-2xl rotate-3"></div>
                 <img 
                   src="https://images.unsplash.com/photo-1577086663218-9642f31b667e?q=80&w=1000&auto=format&fit=crop" 
                   alt="Historical building" 
                   className="relative rounded-xl shadow-2xl w-full object-cover h-64 md:h-[400px] border-4 border-white"
                 />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
         <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
               <div className="inline-flex items-center text-brand-orange font-bold tracking-wider uppercase text-sm mb-2">
                 <Map className="w-4 h-4 mr-2" /> City at a Glance
               </div>
               <h2 className="text-3xl font-bold text-brand-blue">City Profile</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow group">
                  <div className="w-14 h-14 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                     <Users className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-1">48,424+</h3>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Population (2011)</p>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow group">
                  <div className="w-14 h-14 bg-orange-50 text-brand-orange rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                     <Map className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-1">20.40</h3>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Area (Sq. Km)</p>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow group">
                  <div className="w-14 h-14 bg-green-50 text-brand-green rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                     <Landmark className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-1">19</h3>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Municipal Wards</p>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow group">
                  <div className="w-14 h-14 bg-yellow-50 text-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                     <Trees className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-1">80.53%</h3>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Literacy Rate</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default AboutPage;