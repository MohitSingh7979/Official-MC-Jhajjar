import React from 'react';
import TendersTable from '../components/TendersTable';
import { FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TendersPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 animate-fade-in-up">
      <div className="bg-brand-blue text-white py-12 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Tenders & Auctions</h1>
          <p className="text-slate-300 max-w-2xl text-lg">Transparency in procurement and contracts.</p>
        </div>
      </div>
      
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 md:p-8">
             <div className="mb-8">
                <div className="inline-flex items-center text-brand-blue font-bold tracking-wider uppercase text-sm mb-2">
                  <FileText className="w-4 h-4 mr-2" /> E-Procurement
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{t('tenders_title')}</h2>
             </div>
             <TendersTable />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TendersPage;