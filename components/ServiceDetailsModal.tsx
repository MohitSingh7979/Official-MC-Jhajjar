import React from 'react';
import { X, Clock, FileText, IndianRupee, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Service } from '../types';
import useScrollLock from '../hooks/useScrollLock';

interface ServiceDetailsModalProps {
  service: Service | null;
  onClose: () => void;
}

const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({ service, onClose }) => {
  useScrollLock(!!service);

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-blue/70 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh] border border-brand-blue/10">
        {/* Header */}
        <div className={`${service.color} p-6 text-white`}>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
                <service.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="text-white/80 text-sm">Online Application Portal</p>
              </div>
            </div>
            <button onClick={onClose} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <p className="text-slate-600 mb-6">{service.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center text-slate-500 mb-1 text-xs uppercase font-bold tracking-wider">
                <Clock className="w-3 h-3 mr-2" /> Processing Time
              </div>
              <p className="font-semibold text-slate-800">{service.timeframe}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center text-slate-500 mb-1 text-xs uppercase font-bold tracking-wider">
                <IndianRupee className="w-3 h-3 mr-2" /> Application Fee
              </div>
              <p className="font-semibold text-slate-800">{service.fees}</p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-bold text-slate-800 mb-3 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-brand-orange" /> Documents Required
            </h4>
            <ul className="space-y-2">
              {service.documents.map((doc, index) => (
                <li key={index} className="flex items-start text-sm text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-brand-green mt-0.5 shrink-0" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          <button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center group">
            Proceed to Apply
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-center text-xs text-slate-400 mt-3">
            By clicking proceed, you will be redirected to the secure login page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsModal;