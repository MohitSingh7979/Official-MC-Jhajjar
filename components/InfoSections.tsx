import React from 'react';
import { History, FileText, Scale, Download } from 'lucide-react';

const InfoSections: React.FC = () => {
  // Generate dynamic dates for demo purposes to ensure badges always show up correctly
  const today = new Date();
  const formatDate = (daysAgo: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() - daysAgo);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const TENDERS = [
    { 
      id: 'MCJ/2023/104', 
      desc: 'Construction of Community Center in Ward 7', 
      date: formatDate(2), // 2 days ago
      status: 'Active',
      isNew: true
    },
    { 
      id: 'MCJ/2023/102', 
      desc: 'Repair of Street Lights on Main Bazaar Road', 
      date: formatDate(5), // 5 days ago
      status: 'Active',
      isNew: true
    },
    { 
      id: 'MCJ/2023/099', 
      desc: 'Annual Maintenance Contract for IT Infrastructure', 
      date: formatDate(20), 
      status: 'Closed',
      isNew: false
    }
  ];

  return (
    <div className="bg-white">
      {/* About / History Section */}
      <section id="history" className="py-20 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 order-2 md:order-1">
              <div className="inline-flex items-center text-brand-orange font-bold tracking-wider uppercase text-sm mb-3">
                <History className="w-4 h-4 mr-2" /> Our Heritage
              </div>
              <h2 className="text-4xl font-bold text-brand-blue mb-6 leading-tight">History of Jhajjar</h2>
              <div className="prose prose-slate text-slate-600 space-y-4">
                <p>
                  Jhajjar was established by Chhajju as Chhajunagar, which was later changed to Jhajjar. 
                  It was part of the harassed territory of the chaotic eighteenth century. It is heavily 
                  influenced by the culture of Haryana and has a rich historical legacy dating back to the 
                  medieval period.
                </p>
                <p>
                  The municipality was constituted in 1954 and has since grown into a key urban center 
                  connecting Rohtak, Rewari, and Delhi. It is known for its historic gates and the 
                  Jhajjar Gurukul archaeology museum. The Municipal Council is dedicated to preserving this 
                  legacy while modernizing civic infrastructure.
                </p>
              </div>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="relative">
                 <div className="absolute -inset-4 bg-brand-orange/20 rounded-2xl rotate-3"></div>
                 <img 
                   src="https://upload.wikimedia.org/wikipedia/commons/e/e4/District_Administration_Jhajjar.jpg" 
                   alt="Municipal Council Jhajjar Building" 
                   className="relative rounded-xl shadow-2xl w-full object-cover h-[400px] border-4 border-white"
                 />
                 <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border-l-4 border-brand-blue">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Established 1954</p>
                    <p className="font-bold text-brand-blue">Municipal Council Secretariat</p>
                 </div>
              </div>
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
                  <th className="p-4 w-1/2">Description</th>
                  <th className="p-4">Closing Date</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TENDERS.map((tender, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4 font-mono text-slate-500 font-medium">{tender.id}</td>
                    <td className="p-4">
                      <div className="font-medium text-slate-800 flex items-center">
                        {tender.desc}
                        {tender.isNew && (
                          <span className="ml-2 bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded animate-pulse">
                            NEW
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-brand-orange font-medium">{tender.date}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        tender.status === 'Active' 
                          ? 'bg-brand-green/10 text-brand-green' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {tender.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-slate-400 hover:text-brand-blue transition-colors p-2 hover:bg-slate-100 rounded-full" title="Download PDF">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
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