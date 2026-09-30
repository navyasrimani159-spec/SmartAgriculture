import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import { useFarm } from '../context/FarmContext';

interface BackButtonProps {
  label?: string;
  fallbackView?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ fallbackView = 'home' }) => {
  const { goBack, setCurrentView, language } = useFarm();

  const getBackLabel = () => {
    switch (language) {
      case 'ta': return 'பின்னே செல்';
      case 'hi': return 'वापस जाएं';
      case 'te': return 'వెనుకకు';
      case 'kn': return 'ಹಿಂದಕ್ಕೆ ಹೋಗಿ';
      case 'ml': return 'പിന്നിലേക്ക്';
      case 'bn': return 'ফিরে যান';
      case 'mr': return 'मागे जा';
      case 'gu': return 'પાછા જાઓ';
      case 'pa': return 'ਵਾਪਸ ਜਾਓ';
      case 'as': return 'উভতি যাওক';
      case 'or': return 'ଫେରିଯାଆନ୍ତୁ';
      default: return 'Back';
    }
  };

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    goBack(fallbackView);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentView('home');
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <button
        type="button"
        onClick={handleBackClick}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 text-xs font-semibold shadow-md transition-all group cursor-pointer active:scale-95 select-none"
        title="Go Back"
      >
        <ArrowLeft className="w-4 h-4 text-emerald-400 group-hover:-translate-x-1 transition-transform pointer-events-none" />
        <span className="pointer-events-none">{getBackLabel()}</span>
      </button>

      <button
        type="button"
        onClick={handleHomeClick}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 text-xs transition-colors cursor-pointer active:scale-95 select-none"
        title="Return to Home"
      >
        <Home className="w-4 h-4 text-emerald-400 pointer-events-none" />
        <span className="hidden sm:inline text-[11px] pointer-events-none">{language === 'ta' ? 'முகப்பு' : 'Home'}</span>
      </button>
    </div>
  );
};
