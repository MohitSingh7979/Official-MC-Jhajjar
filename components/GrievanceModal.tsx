import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import useScrollLock from '../hooks/useScrollLock';

interface GrievanceModalProps { isOpen: boolean; onClose: () => void; }
const STORAGE_KEY = 'mc_jhajjar_grievance_draft';

const GrievanceModal: React.FC<GrievanceModalProps> = ({ isOpen, onClose }) => {
  useScrollLock(isOpen);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{phone?: string; captcha?: string}>({});
  const [captcha, setCaptcha] = useState({ q: '', a: 0 });
  const [captchaInput, setCaptchaInput] = useState('');
  
  const [formData, setFormData] = useState({ name: '', phone: '', ward: '', type: 'Sanitation', description: '' });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) try { setFormData(JSON.parse(saved)); } catch {}
  }, []);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)); }, [formData]);
  useEffect(() => { if (isOpen) refreshCaptcha(); }, [isOpen]);

  const refreshCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10) + 1, n2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ q: `${n1} + ${n2}`, a: n1 + n2 });
    setCaptchaInput('');
    setErrors(prev => ({ ...prev, captcha: undefined }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id || 'val']: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = "Invalid mobile number.";
    if (parseInt(captchaInput) !== captcha.a) { newErrors.captcha = "Incorrect answer."; refreshCaptcha(); }
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
      localStorage.removeItem(STORAGE_KEY);
      setFormData({ name: '', phone: '', ward: '', type: 'Sanitation', description: '' });
    }, 1500);
  };

  const resetAndClose = () => { setStep('form'); setIsSubmitting(false); setErrors({}); setCaptchaInput(''); onClose(); };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-blue/80 backdrop-blur-sm transition-opacity" onClick={resetAndClose}></div>
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-fade-in-up border border-brand-blue/10">
        {step === 'form' ? (
          <>
            <div className="bg-brand-orange px-6 py-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg flex items-center"><AlertCircle className="w-5 h-5 mr-2" /> Lodge Grievance</h3>
              <button onClick={resetAndClose} className="hover:bg-white/20 p-1 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">Name *</label>
                  <input required id="name" type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Full name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} disabled={isSubmitting} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">Mobile *</label>
                  <input required type="tel" className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.phone ? 'border-brand-red' : 'border-slate-200'}`} placeholder="10 digits" value={formData.phone} onChange={e => { setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)}); setErrors({...errors, phone: undefined}); }} disabled={isSubmitting} />
                  {errors.phone && <p className="text-xs text-brand-red">{errors.phone}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">Ward *</label>
                  <select required id="ward" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white" value={formData.ward} onChange={e => setFormData({...formData, ward: e.target.value})} disabled={isSubmitting}>
                    <option value="">Select</option>
                    {[...Array(19)].map((_, i) => <option key={i} value={i + 1}>Ward {i + 1}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">Issue *</label>
                  <select id="type" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} disabled={isSubmitting}>
                    {['Sanitation', 'Street Light', 'Water', 'Roads', 'Other'].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <textarea required id="description" rows={3} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none" placeholder="Description..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} disabled={isSubmitting} />
              
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white border border-slate-200 px-3 py-1.5 rounded font-mono font-bold">{captcha.q} = ?</div>
                  <button type="button" onClick={refreshCaptcha} className="p-1.5 text-slate-400 hover:text-brand-orange"><RefreshCw className="w-4 h-4" /></button>
                </div>
                <input required type="number" className={`w-24 px-3 py-2 border rounded-lg text-sm ${errors.captcha ? 'border-brand-red' : 'border-slate-200'}`} placeholder="Ans" value={captchaInput} onChange={e => { setCaptchaInput(e.target.value); setErrors({...errors, captcha: undefined}); }} disabled={isSubmitting} />
              </div>

              <button type="submit" disabled={isSubmitting} className={`w-full py-3 rounded-lg font-bold flex items-center justify-center ${isSubmitting ? 'bg-slate-300' : 'bg-brand-orange text-white hover:bg-brand-orange/90'}`}>
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Submit <Send className="w-4 h-4 ml-2" /></>}
              </button>
            </form>
          </>
        ) : (
          <div className="p-8 text-center animate-fade-in-up">
            <CheckCircle className="w-16 h-16 text-brand-green/20 text-brand-green rounded-full mx-auto mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-brand-blue mb-2">Complaint Registered!</h3>
            <p className="text-slate-500 mb-6 text-sm">ID: <span className="font-mono font-bold">#JHJ-2023-{Math.floor(Math.random() * 1000)}</span></p>
            <button onClick={resetAndClose} className="px-6 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200">Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrievanceModal;