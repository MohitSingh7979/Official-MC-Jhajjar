import React from 'react';
import { History, FileText, Scale } from 'lucide-react';

const InfoSections: React.FC = () => {
  return (
    <div className="bg-white">
      {/* About / History Section */}
      <section id="history" className="py-20 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="inline-flex items-center text-brand-orange font-bold tracking-wider uppercase text-sm mb-2">
                <History className="w-4 h-4 mr-2" /> Our Heritage
              </div>
              <h2 className="text-3xl font-bold text-brand-blue mb-6">History of Jhajjar</h2>
              <div className="prose prose-slate text-slate-600">
                <p className="mb-4">
                  Jhajjar was established by Chhajju as Chhajunagar, which was later changed to Jhajjar. 
                  It was part of the harassed territory of the chaotic eighteenth century. It is heavily 
                  influenced by the culture of Haryana and has a rich historical legacy dating back to the 
                  medieval period.
                </p>
                <p>
                  The municipality was constituted in 1954 and has since grown into a key urban center 
                  connecting Rohtak, Rewari, and Delhi. It is known for its historic gates and the 
                  Jhajjar Gurukul archaeology museum.
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://picsum.photos/800/600?grayscale" 
                alt="Historical Jhajjar" 
                className="rounded-2xl shadow-xl w-full object-cover h-80 hover:scale-[1.02] transition-transform duration-500 border border-brand-blue/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tenders Section */}
      <section id="tenders" className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center text-brand-blue font-bold tracking-wider uppercase text-sm mb-2">
              <FileText className="w-4 h-4 mr-2" /> E-Procurement
            </div>
            <h2 className="text-3xl font-bold text-brand-blue">Active Tenders & Auctions</h2>
          </div>
          
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold">
                <tr>
                  <th className="p-4">Tender ID</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Closing Date</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-slate-500">MCJ/2023/104</td>
                  <td className="p-4 font-medium">Construction of Community Center in Ward 7</td>
                  <td className="p-4 text-brand-orange">Oct 30, 2023</td>
                  <td className="p-4 text-right"><span className="bg-brand-green/10 text-brand-green px-2 py-1 rounded text-xs font-bold">Active</span></td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-slate-500">MCJ/2023/102</td>
                  <td className="p-4 font-medium">Repair of Street Lights on Main Bazaar Road</td>
                  <td className="p-4 text-brand-orange">Oct 25, 2023</td>
                  <td className="p-4 text-right"><span className="bg-brand-green/10 text-brand-green px-2 py-1 rounded text-xs font-bold">Active</span></td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-slate-500">MCJ/2023/099</td>
                  <td className="p-4 font-medium">Annual Maintenance Contract for IT Infrastructure</td>
                  <td className="p-4 text-slate-400">Oct 15, 2023</td>
                  <td className="p-4 text-right"><span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-xs">Closed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-center mt-6">
             <button className="text-brand-blue font-bold hover:underline">View All Active Tenders &rarr;</button>
          </div>
        </div>
      </section>

      {/* RTI Section */}
      <section id="rti" className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-brand-blue rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-40 bg-brand-orange/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
             
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="md:w-2/3">
                 <div className="inline-flex items-center text-brand-orange font-bold tracking-wider uppercase text-sm mb-4">
                   <Scale className="w-4 h-4 mr-2" /> Right to Information
                 </div>
                 <h2 className="text-2xl md:text-3xl font-bold mb-4">Transparency is our priority.</h2>
                 <p className="text-slate-300 mb-6 leading-relaxed">
                   Under the RTI Act 2005, citizens can request information regarding the activities of the 
                   Municipal Council. Our Public Information Officers are dedicated to providing timely responses.
                 </p>
                 <div className="flex flex-wrap gap-4">
                   <button className="bg-brand-orange hover:bg-brand-orange/90 px-6 py-3 rounded-lg font-bold transition-colors">
                     File Online RTI
                   </button>
                   <button className="bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-lg font-bold transition-colors">
                     View Proactive Disclosures
                   </button>
                 </div>
               </div>
               
               <div className="md:w-1/3 bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                 <h3 className="font-bold text-lg mb-4 border-b border-white/10 pb-2">RTI Officers</h3>
                 <div className="space-y-4">
                   <div>
                     <p className="text-xs text-slate-400 uppercase">First Appellate Authority</p>
                     <p className="font-medium">Sh. Deputy Commissioner</p>
                   </div>
                   <div>
                     <p className="text-xs text-slate-400 uppercase">SPIO</p>
                     <p className="font-medium">Sh. Executive Officer</p>
                     <a href="mailto:eo.mcj@hry.nic.in" className="text-xs text-brand-orange hover:underline">eo.mcj@hry.nic.in</a>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoSections;