import React, { useState } from 'react';
import {
  Sprout,
  Wifi,
  WifiOff,
  Bell,
  SlidersHorizontal,
  ChevronDown,
  RefreshCw,
  Check
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { supportedLanguages } from '../i18n';
import { ConnectionStatus } from '../types';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    connectionStatus,
    setConnectionStatus,
    lastSyncedTime,
    alerts,
    simulateSensorUpdate,
    currentView,
    setCurrentView
  } = useFarm();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [connMenuOpen, setConnMenuOpen] = useState(false);
  const [alertsPopoverOpen, setAlertsPopoverOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const unreadAlertsCount = alerts.filter(a => !a.isRead).length;

  const handleSimulateSync = () => {
    setIsSyncing(true);
    simulateSensorUpdate();
    setTimeout(() => setIsSyncing(false), 600);
  };

  // Localized Navigation Links
  const navLabels: Record<string, Record<string, string>> = {
    ta: { home: 'முகப்பு', dashboard: 'டாஷ்போர்டு', irrigation: 'ஸ்மார்ட் பாசனம்', 'farm-map': 'பண்ணை வரைபடம்', market: 'சந்தை', analytics: 'பகுப்பாய்வு' },
    hi: { home: 'होम', dashboard: 'डैशबोर्ड', irrigation: 'स्मार्ट सिंचाई', 'farm-map': 'खेत का नक्शा', market: 'मंडी', analytics: 'विश्लेषण' },
    te: { home: 'హోమ్', dashboard: 'డాష్‌బోర్డ్', irrigation: 'స్మార్ట్ నీటిపారుదల', 'farm-map': 'పొలం మ్యాప్', market: 'మార్కెట్', analytics: 'విశ్లేషణ' },
    kn: { home: 'ಮುಖಪುಟ', dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', irrigation: 'ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ', 'farm-map': 'ಜಮೀನು ನಕ್ಷೆ', market: 'ಮಾರುಕಟ್ಟೆ', analytics: 'ವಿಶ್ಲೇಷಣೆ' },
    ml: { home: 'ഹോം', dashboard: 'ഡാഷ്‌ബോർഡ്', irrigation: 'സ്മാർട്ട് നനയ്ക്കൽ', 'farm-map': 'ഫാം മാപ്പ്', market: 'മാർക്കറ്റ്', analytics: 'വിശകലനം' },
    bn: { home: 'হোম', dashboard: 'ড্যাশবোর্ড', irrigation: 'স্মার্ট সেচ', 'farm-map': 'খামার মানচিত্র', market: 'বাজার', analytics: 'বিশ্লেষণ' },
    mr: { home: 'मुख्यपृष्ठ', dashboard: 'डॅशबोर्ड', irrigation: 'स्मार्ट सिंचन', 'farm-map': 'शेत नकाशा', market: 'बाजार भाव', analytics: 'विश्लेषण' },
    gu: { home: 'હોમ', dashboard: 'ડેશબોર્ડ', irrigation: 'સ્માર્ટ સિંચાઈ', 'farm-map': 'ખેતર નકશો', market: 'બજાર', analytics: 'વિશ્લેષણ' },
    pa: { home: 'ਮੁੱਖ ਪੰਨਾ', dashboard: 'ਡੈਸ਼ਬੋਰਡ', irrigation: 'ਸਮਾਰਟ ਸਿੰਚਾਈ', 'farm-map': 'ਖੇਤ ਨਕਸ਼ਾ', market: 'ਮੰਡੀ', analytics: 'ਵਿਸ਼ਲੇਸ਼ਣ' },
    as: { home: 'মুখ্য পৃষ্ঠা', dashboard: 'ডেশ্ববৰ্ড', irrigation: 'স্মাৰ্ট জলসিঞ্চন', 'farm-map': 'পথাৰ মানচিত্ৰ', market: 'বজাৰ', analytics: 'বিশ্লেষণ' },
    or: { home: 'ମୁଖ୍ୟ ପୃଷ୍ଠା', dashboard: 'ଡ୍ୟାସବୋର୍ଡ', irrigation: 'ସ୍ମାର୍ଟ ଜଳସେଚନ', 'farm-map': 'ଫାର୍ମ ମ୍ୟାପ୍', market: 'ମଣ୍ଡି', analytics: 'ବିଶ୍ଳେଷଣ' },
    en: { home: 'Home', dashboard: 'Dashboard', irrigation: 'Smart Irrigation', 'farm-map': 'Farm Map', market: 'Market', analytics: 'Analytics' }
  };

  const currentLabels = navLabels[language] || navLabels.en;

  const navLinks = [
    { id: 'home', label: currentLabels.home },
    { id: 'dashboard', label: currentLabels.dashboard },
    { id: 'irrigation', label: currentLabels.irrigation },
    { id: 'farm-map', label: currentLabels['farm-map'] },
    { id: 'market', label: currentLabels.market },
    { id: 'analytics', label: currentLabels.analytics }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/85 backdrop-blur-md">
      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-green-500 to-emerald-400 p-0.5 shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sprout className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-white">
                Smart<span className="text-emerald-400">Agri</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 tracking-wider uppercase">
                Eco
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider">Sustainable AgriTech</p>
          </div>
        </div>

        {/* Desktop Navigation links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => {
            const active = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setCurrentView(link.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick IoT Simulation Trigger */}
          <button
            onClick={handleSimulateSync}
            disabled={isSyncing}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-emerald-400 transition-colors"
            title={`Simulate IoT Sensor Reading (Last: ${lastSyncedTime})`}
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-emerald-400' : ''}`} />
          </button>

          {/* Connection Status Indicator & Toggle */}
          <div className="relative">
            <button
              onClick={() => setConnMenuOpen(!connMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs text-slate-300 transition-colors"
            >
              {connectionStatus === 'online' && (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="hidden sm:inline text-emerald-400 font-medium">Online</span>
                </>
              )}
              {connectionStatus === 'low' && (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span className="hidden sm:inline text-amber-400 font-medium">Low Net</span>
                </>
              )}
              {connectionStatus === 'offline' && (
                <>
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span className="hidden sm:inline text-rose-400 font-medium">Offline</span>
                </>
              )}
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {connMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-white/10 shadow-xl p-1 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 border-b border-white/10">
                  Network State
                </div>
                {(['online', 'low', 'offline'] as ConnectionStatus[]).map(status => (
                  <button
                    key={status}
                    onClick={() => {
                      setConnectionStatus(status);
                      setConnMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between ${
                      connectionStatus === status
                        ? 'bg-emerald-500/10 text-emerald-400 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 capitalize">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          status === 'online'
                            ? 'bg-emerald-400'
                            : status === 'low'
                            ? 'bg-amber-400'
                            : 'bg-rose-500'
                        }`}
                      />
                      {status === 'low' ? 'Low Connectivity' : status}
                    </div>
                    {connectionStatus === status && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 13 Indian Languages Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs text-slate-200 transition-colors"
              title="Change Language"
            >
              <span className="font-semibold text-emerald-400">
                {supportedLanguages.find(l => l.code === language)?.nativeLabel || 'English'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 max-h-80 overflow-y-auto rounded-xl bg-slate-900 border border-white/10 shadow-2xl p-1 z-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 border-b border-white/10">
                  Select Language (13 Languages)
                </div>
                {supportedLanguages.map(item => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLanguage(item.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between ${
                      language === item.code
                        ? 'bg-emerald-500/10 text-emerald-400 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <span className="font-medium text-white">{item.nativeLabel}</span>
                      <span className="text-[11px] text-slate-400 ml-2">({item.label})</span>
                    </div>
                    {language === item.code && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Center Bell */}
          <div className="relative">
            <button
              onClick={() => setAlertsPopoverOpen(!alertsPopoverOpen)}
              className="relative p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white transition-colors"
              title="Notifications & Smart Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center">
                  {unreadAlertsCount}
                </span>
              )}
            </button>

            {alertsPopoverOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-semibold text-white">Smart Farm Alerts</span>
                  <button
                    onClick={() => {
                      setCurrentView('alerts');
                      setAlertsPopoverOpen(false);
                    }}
                    className="text-[11px] text-emerald-400 hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="divide-y divide-white/5 max-h-64 overflow-y-auto mt-1">
                  {alerts.slice(0, 3).map(alert => (
                    <div
                      key={alert.id}
                      onClick={() => {
                        if (alert.actionRoute) {
                          setCurrentView(alert.actionRoute.replace('/', ''));
                        }
                        setAlertsPopoverOpen(false);
                      }}
                      className="py-2.5 cursor-pointer hover:bg-slate-800/50 rounded-lg px-2"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className={`font-semibold ${
                          alert.severity === 'high' ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                          {alert.title}
                        </span>
                        <span className="text-[10px] text-slate-500">{alert.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">{alert.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Customize Dashboard Shortcut */}
          <button
            onClick={() => setCurrentView('customizer')}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-emerald-400 transition-colors"
            title="Customize Dashboard"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
