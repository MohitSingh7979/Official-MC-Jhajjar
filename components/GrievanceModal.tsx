import React, { useState } from 'react';
import { X, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import useScrollLock from '../hooks/useScrollLock';

interface GrievanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GrievanceModal: React.FC<GrievanceModalProps> = ({ isOpen, onClose }) => {
  useScrollLock(isOpen);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{phone?: string}>({});
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    ward: '',
    type: 'Sanitation',
    description: ''
  });

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: {phone?: string} = {};
    // Indian Mobile Number Validation: 10 digits, starts with 6-9
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 1500);
  };

  const resetAndClose = () => {
    setStep('form');
    setIsSubmitting(false);
    setErrors({});
    setFormData({ name: '', phone: '', ward: '', type: 'Sanitation', description: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-blue/80 backdrop-blur-sm transition-opacity" 
        onClick={resetAndClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-fade-in-up border border-brand-blue/10">
        {step === 'form' ? (
          <>
            <div className="bg-brand-orange px-6 py-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Lodge Public Grievance
              </h3>
              <button 
                onClick={resetAndClose} 
                className="hover:bg-white/20 p-1 rounded-full transition-colors"
                disabled={isSubmitting}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">Name <span className="text-brand-red">*</span></label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none text-sm disabled:bg-slate-50"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">Mobile <span className="text-brand-red">*</span></label>
                  <input 
                    required
                    type="tel" 
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none text-sm disabled:bg-slate-50 ${errors.phone ? 'border-brand-red/50 focus:ring-brand-red/30' : 'border-slate-200 focus:ring-brand-orange'}`}
                    placeholder="10 digit number"
                    value={formData.phone}
                    onChange={e => {
                      setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)});
                      if (errors.phone) setErrors({...errors, phone: undefined});
                    }}
                    disabled={isSubmitting}
                  />
                  {errors.phone && <p className="text-xs text-brand-red">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">Ward No. <span className="text-brand-red">*</span></label>
                  <select 
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none text-sm bg-white disabled:bg-slate-50"
                    value={formData.ward}
                    onChange={e => setFormData({...formData, ward: e.target.value})}
                    disabled={isSubmitting}
                  >
                    <option value="">Select</option>
                    {[...Array(19)].map((_, i) => (
                      <option key={i} value={i + 1}>Ward {i + 1}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">Issue Type <span className="text-brand-red">*</span></label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none text-sm bg-white disabled:bg-slate-50"
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                    disabled={isSubmitting}
                  >
                    <option value="Sanitation">Sanitation/Garbage</option>
                    <option value="Street Light">Street Lights</option>
                    <option value="Water">Water Supply</option>
                    <option value="Roads">Roads/Potholes</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Description <span className="text-brand-red">*</span></label>
                <textarea 
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none text-sm resize-none disabled:bg-slate-50"
                  placeholder="Please describe the issue in detail..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center ${
                    isSubmitting 
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                      : 'bg-brand-blue text-white hover:bg-brand-blue/90 shadow-md hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Complaint <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="p-8 text-center animate-fade-in-up">
            <div className="w-16 h-16 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-brand-blue mb-2">Complaint Registered!</h3>
            <p className="text-slate-500 mb-6 text-sm">
              Your grievance ID is <span className="font-mono font-bold text-slate-800">#JHJ-2023-{Math.floor(Math.random() * 1000)}</span>. 
              You will receive an SMS update shortly.
            </p>
            <button 
              onClick={resetAndClose}
              className="px-6 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrievanceModal;