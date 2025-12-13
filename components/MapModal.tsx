import React from 'react';
import { X } from 'lucide-react';
import useScrollLock from '../hooks/useScrollLock';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose }) => {
  useScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-blue/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      {/* Modal Container */}
      <div className="bg-white w-full max-w-5xl h-[80vh] rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-fade-in-up border border-brand-blue/10 flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center shrink-0">
            <h3 className="font-bold text-brand-blue flex items-center">
              <span className="w-2 h-6 bg-brand-orange rounded-full mr-2"></span>
              Municipal Council Jhajjar Location
            </h3>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
              aria-label="Close Map"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
        
        {/* Map Frame */}
        <div className="flex-1 bg-slate-100 relative w-full h-full">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d259.69409188821277!2d76.64889731970239!3d28.603464772824115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1765350158870!5m2!1sen!2sin" 
               width="100%" 
               height="100%" 
               style={{border:0}} 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               title="Jhajjar Map"
               className="absolute inset-0"
             ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MapModal;