import React, { useState, useMemo, useEffect } from 'react';
import { Download, ChevronLeft, ChevronRight, ArrowUpDown, Loader2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DataService } from '../services/dataService';
import { Tender } from '../types';

const TendersTable: React.FC = () => {
  const { t } = useLanguage();
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Tender>('closing_date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [downloading, setDownloading] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  
  useEffect(() => {
    DataService.getTenders().then(setTenders);
  }, []);

  const itemsPerPage = 5;

  const handleSort = (field: keyof Tender) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = useMemo(() => {
    return [...tenders].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [tenders, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDownload = (id: string) => {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      setToast(`${t('download_complete')}: ${id}.pdf`);
      setTimeout(() => setToast(null), 3000);
    }, 1500);
  };

  return (
    <div className="relative">
      {toast && (
        <div className="fixed top-24 right-4 z-[80] bg-brand-blue text-white px-6 py-3 rounded-lg shadow-xl animate-fade-in-up flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-3 text-brand-green" />{toast}
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-700 uppercase font-bold">
            <tr>
              <th className="p-4 cursor-pointer hover:bg-slate-200" onClick={() => handleSort('id')}><div className="flex items-center">{t('tender_id')} <ArrowUpDown className="w-3 h-3 ml-1" /></div></th>
              <th className="p-4 w-1/2">{t('description')}</th>
              <th className="p-4 cursor-pointer hover:bg-slate-200" onClick={() => handleSort('closing_date')}><div className="flex items-center">{t('closing_date')} <ArrowUpDown className="w-3 h-3 ml-1" /></div></th>
              <th className="p-4 text-center">{t('status')}</th>
              <th className="p-4 text-right">{t('action')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedData.map((tender) => (
              <tr key={tender.id} className="hover:bg-slate-50 transition-colors group">
                <td className="p-4 font-mono text-slate-500 font-medium">{tender.id}</td>
                <td className="p-4"><div className="font-medium text-slate-800 flex items-center">{tender.description}{tender.is_new && <span className="ml-2 bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded animate-pulse">NEW</span>}</div></td>
                <td className="p-4 text-brand-orange font-medium">{tender.closing_date}</td>
                <td className="p-4 text-center"><span className={`px-2 py-1 rounded text-xs font-bold ${tender.status === 'Active' ? 'bg-brand-green/10 text-brand-green' : 'bg-slate-100 text-slate-500'}`}>{tender.status === 'Active' ? t('active') : t('closed')}</span></td>
                <td className="p-4 text-right"><button onClick={() => handleDownload(tender.id)} disabled={!!downloading} className="text-slate-400 hover:text-brand-blue transition-colors p-2 hover:bg-slate-100 rounded-full">{downloading === tender.id ? <Loader2 className="w-4 h-4 animate-spin text-brand-orange" /> : <Download className="w-4 h-4" />}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 px-2">
         <span className="text-xs text-slate-500">Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} entries</span>
         <div className="flex gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50"><ChevronRight className="w-4 h-4" /></button>
         </div>
      </div>
    </div>
  );
};

export default TendersTable;