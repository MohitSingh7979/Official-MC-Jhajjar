import React, { useState } from 'react';
import { CreditCard, Search, X, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';

const QuickPayWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [propertyId, setPropertyId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{name: string, due: string} | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyId) return;
    
    setLoading(true);
    setResult(null);
    
    // Simulate API Check
    setTimeout(() => {
      setLoading(false);
      setResult({
        name: "Suresh Kumar",
        due: "₹ 1,250"
      });
    }, 1500);
  };

  const handlePay = () => {
    window.open('https://property.ulbharyana.gov.in/', '_blank');
  };

  return (
    <div className="fixed right-6 bottom-24 z-40 hidden md:block">
      {/* Expanded Card */}
      <div 
        className={`bg-white rounded-xl shadow-2xl border border-brand-blue/10 overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'w-80 opacity-100 scale-100' : 'w-0 h-0 opacity-0 scale-95 pointer-events-none'}`}
      >
        <div className="bg-brand-blue text-white p-4 flex justify-between items-center">
          <h3 className="font-bold flex items-center text-sm">
            <CreditCard className="w-4 h-4 mr-2 text-brand-orange" />
            Quick Tax Payment
          </h3>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full">
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-4">
          {!result ? (
            <form onSubmit={handleCheck}>
              <p className="text-xs text-slate-500 mb-3">Enter your unique Property ID to check pending dues.</p>
              <div className="relative mb-3">
                <input 
                  type="text" 
                  placeholder="Ex: 12A-450-99"
                  className="w-full pl-3 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-orange outline-none uppercase font-mono"
                  value={propertyId}
                  onChange={(e) => setPropertyId(e.target.value)}
                  disabled={loading}
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-2.5 rounded-lg text-sm transition-colors flex justify-center items-center"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Check Status'}
              </button>
            </form>
          ) : (
            <div className="animate-fade-in-up">
              <div className="flex items-start mb-4 bg-green-50 p-3 rounded-lg border border-green-100">
                <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Property Found</p>
                  <p className="text-sm font-bold text-slate-800">{result.name}</p>
                  <p className="text-xs text-slate-600 mt-1">Dues: <span className="text-red-600 font-bold">{result.due}</span></p>
                </div>
              </div>
              <button 
                onClick={handlePay}
                className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-2.5 rounded-lg text-sm transition-colors flex justify-center items-center group"
              >
                Pay Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setResult(null)} 
                className="w-full mt-2 text-xs text-slate-400 hover:text-slate-600 underline"
              >
                Check another ID
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brand-blue hover:bg-brand-orange text-white p-4 rounded-full shadow-lg transition-all hover:scale-105 flex items-center group"
        >
          <CreditCard className="w-6 h-6 group-hover:animate-pulse" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out whitespace-nowrap text-sm font-bold">
            Quick Pay
          </span>
        </button>
      )}
    </div>
  );
};

export default QuickPayWidget;