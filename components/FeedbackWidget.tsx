import React, { useState } from 'react';
import { MessageSquarePlus, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { DataService } from '../services/dataService';

const FeedbackWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('Suggestion');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await DataService.submitFeedback({ type, message });
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
        setMessage('');
        setType('Suggestion');
      }, 2000);
    } catch (err: any) {
      if (err.message === 'MissingTables') {
         setError('System Setup Required: The feedback table does not exist yet. Please contact admin.');
      } else {
         setError(err.message || 'Could not submit feedback. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed left-6 bottom-20 z-40 hidden md:block">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white text-brand-blue p-3 rounded-full shadow-lg border border-brand-blue/10 hover:scale-105 transition-transform group flex items-center"
        >
          <MessageSquarePlus className="w-6 h-6 text-brand-orange" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 whitespace-nowrap text-xs font-bold">
            Improve this App
          </span>
        </button>
      ) : (
        <div className="bg-white rounded-xl shadow-2xl border border-brand-blue/10 w-72 overflow-hidden animate-fade-in-up origin-bottom-left">
          <div className="bg-brand-blue p-3 flex justify-between items-center text-white">
            <h3 className="font-bold text-sm flex items-center">
              <MessageSquarePlus className="w-4 h-4 mr-2 text-brand-orange" />
              Help us Improve
            </h3>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 rounded-full p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          {success ? (
            <div className="p-8 text-center">
              <CheckCircle className="w-10 h-10 text-brand-green mx-auto mb-2 animate-bounce" />
              <p className="text-sm font-bold text-brand-blue">Thank You!</p>
              <p className="text-xs text-slate-500">Your feedback drives our improvements.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              {error && (
                <div className="bg-red-50 text-red-600 p-2 rounded text-xs flex items-start">
                  <AlertCircle className="w-3 h-3 mr-1.5 mt-0.5 shrink-0" />
                  {error}
                </div>
              )}
              
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Feedback Type</label>
                <select 
                  className="w-full text-sm border border-slate-200 rounded-lg p-2 outline-none focus:ring-1 focus:ring-brand-orange bg-slate-50"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>Suggestion</option>
                  <option>Bug Report</option>
                  <option>Content Error</option>
                  <option>Feature</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Message</label>
                <textarea 
                  rows={3}
                  className="w-full text-sm border border-slate-200 rounded-lg p-2 outline-none focus:ring-1 focus:ring-brand-orange resize-none"
                  placeholder="Tell us what needs improvement..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-brand-orange text-white py-2 rounded-lg font-bold text-sm hover:bg-brand-orange/90 flex items-center justify-center"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit Feedback'}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackWidget;