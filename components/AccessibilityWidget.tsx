import React, { useState, useEffect } from 'react';
import { Accessibility, Type, Eye, RotateCcw, X, Plus, Minus } from 'lucide-react';

const AccessibilityWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSizePercent, setFontSizePercent] = useState(100);
  const [isGrayscale, setIsGrayscale] = useState(false);

  // Apply changes to the root HTML element
  useEffect(() => {
    const html = document.documentElement;
    html.style.fontSize = `${fontSizePercent}%`;
    
    if (isGrayscale) {
      document.body.style.filter = 'grayscale(100%)';
    } else {
      document.body.style.filter = 'none';
    }
  }, [fontSizePercent, isGrayscale]);

  const handleReset = () => {
    setFontSizePercent(100);
    setIsGrayscale(false);
  };

  return (
    <div className="fixed left-6 bottom-20 lg:bottom-6 z-50 flex items-end">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brand-blue text-white p-3 rounded-full shadow-xl hover:bg-brand-orange transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange"
          aria-label="Open Accessibility Tools"
        >
          <Accessibility className="w-6 h-6" />
        </button>
      )}

      {/* Tools Panel */}
      <div 
        className={`bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden transition-all duration-300 ease-in-out origin-bottom-left ${
          isOpen ? 'w-72 opacity-100 scale-100 mb-2' : 'w-0 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-800 flex items-center">
              <Accessibility className="w-4 h-4 mr-2 text-brand-orange" />
              Accessibility
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600"
              aria-label="Close Accessibility Tools"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Font Size Controls */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block flex items-center">
                <Type className="w-3 h-3 mr-1" /> Text Size
              </label>
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setFontSizePercent(p => Math.max(80, p - 10))}
                  className="flex-1 py-2 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-700 flex justify-center"
                  aria-label="Decrease Font Size"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-px bg-slate-300 my-2"></div>
                <button
                  onClick={() => setFontSizePercent(p => Math.min(130, p + 10))}
                  className="flex-1 py-2 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-700 flex justify-center"
                  aria-label="Increase Font Size"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Mode */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block flex items-center">
                <Eye className="w-3 h-3 mr-1" /> Display
              </label>
              <button
                onClick={() => setIsGrayscale(!isGrayscale)}
                className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                  isGrayscale 
                    ? 'bg-brand-blue text-white' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Grayscale Mode
                <div className={`w-8 h-4 rounded-full relative transition-colors ${isGrayscale ? 'bg-brand-orange' : 'bg-slate-300'}`}>
                  <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${isGrayscale ? 'left-4.5 translate-x-1' : 'left-0.5'}`}></div>
                </div>
              </button>
            </div>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="w-full py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 text-sm font-medium flex items-center justify-center mt-2"
            >
              <RotateCcw className="w-3 h-3 mr-2" /> Reset Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityWidget;