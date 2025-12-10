import React, { useState } from 'react';
import { X, User, Shield, ArrowRight, Lock } from 'lucide-react';
import useScrollLock from '../hooks/useScrollLock';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  useScrollLock(isOpen);
  const [activeTab, setActiveTab] = useState<'citizen' | 'official'>('citizen');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login API
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      alert(`Logged in as ${activeTab === 'citizen' ? 'Citizen' : 'Official'}`);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-blue/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-fade-in-up border border-brand-blue/10">
        {/* Header Tabs */}
        <div className="flex border-b border-slate-100">
          <button 
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center transition-colors ${activeTab === 'citizen' ? 'bg-white text-brand-orange border-b-2 border-brand-orange' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
            onClick={() => setActiveTab('citizen')}
          >
            <User className="w-4 h-4 mr-2" /> Citizen Login
          </button>
          <button 
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center transition-colors ${activeTab === 'official' ? 'bg-white text-brand-blue border-b-2 border-brand-blue' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
            onClick={() => setActiveTab('official')}
          >
            <Shield className="w-4 h-4 mr-2" /> Official Login
          </button>
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${activeTab === 'citizen' ? 'bg-brand-orange/10 text-brand-orange' : 'bg-brand-blue/10 text-brand-blue'}`}>
              {activeTab === 'citizen' ? <User className="w-8 h-8" /> : <Shield className="w-8 h-8" />}
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
            <p className="text-slate-500 text-sm mt-1">
              {activeTab === 'citizen' ? 'Access your property tax, certificates & grievances' : 'Secure administrative access for municipal staff'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {activeTab === 'citizen' ? 'Mobile Number / Email' : 'Username / Employee ID'}
              </label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-orange outline-none transition-all"
                placeholder={activeTab === 'citizen' ? 'Enter registered mobile' : 'Enter employee ID'}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
              <input 
                type="password" 
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-orange outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {activeTab === 'citizen' && (
              <div className="flex justify-between items-center text-xs">
                <label className="flex items-center text-slate-600 cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-orange focus:ring-brand-orange" />
                  Remember me
                </label>
                <a href="#" className="text-brand-orange hover:underline font-medium">Forgot Password?</a>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-bold text-white flex items-center justify-center transition-all ${
                isLoading ? 'opacity-70 cursor-wait' : 'hover:scale-[1.02]'
              } ${activeTab === 'citizen' ? 'bg-brand-orange hover:bg-brand-orange/90' : 'bg-brand-blue hover:bg-brand-blue/90'}`}
            >
              {isLoading ? 'Verifying...' : 'Login securely'}
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </button>
          </form>

          {activeTab === 'citizen' && (
            <div className="mt-6 text-center text-xs text-slate-500">
              Not registered yet? <a href="#" className="text-brand-orange font-bold hover:underline">Create an Account</a>
            </div>
          )}
          
          {activeTab === 'official' && (
             <div className="mt-6 flex items-center justify-center text-xs text-slate-400 bg-slate-50 p-2 rounded">
                <Lock className="w-3 h-3 mr-1.5" />
                256-bit SSL Encrypted Connection
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;