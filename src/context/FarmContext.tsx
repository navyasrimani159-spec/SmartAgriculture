import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  LanguageCode,
  ConnectionStatus,
  FarmZone,
  WeatherData,
  SolarTelemetry,
  WaterTelemetry,
  PostHarvestTelemetry,
  IoTDevice,
  FarmExpense,
  SmartAlert,
  FarmEvent
} from '../types';
import {
  initialFarmZones,
  initialWeatherData,
  initialSolarTelemetry,
  initialWaterTelemetry,
  initialPostHarvest,
  initialIoTDevices,
  initialExpenses,
  initialAlerts,
  initialEvents,
  demoFarmProfile,
  DemoFarmProfile
} from '../data/demoFarm';
import { getTranslation, TranslationKeys } from '../i18n';

interface FarmContextType {
  profile: DemoFarmProfile;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: TranslationKeys) => string;
  connectionStatus: ConnectionStatus;
  setConnectionStatus: (status: ConnectionStatus) => void;
  lastSyncedTime: string;
  
  // Farm Data
  zones: FarmZone[];
  setZones: React.Dispatch<React.SetStateAction<FarmZone[]>>;
  activeZoneId: string;
  setActiveZoneId: (id: string) => void;
  activeZone: FarmZone;
  weather: WeatherData;
  solar: SolarTelemetry;
  water: WaterTelemetry;
  postHarvest: PostHarvestTelemetry;
  ioTDevices: IoTDevice[];
  expenses: FarmExpense[];
  alerts: SmartAlert[];
  events: FarmEvent[];
  
  // Irrigation execution
  pumpStatus: 'OFF' | 'ON';
  isIrrigating: boolean;
  irrigationProgress: number; // 0-100
  irrigationRemainingSeconds: number;
  startSmartIrrigation: (durationMinutes?: number) => void;
  stopSmartIrrigation: () => void;
  irrigationSuccessMessage: string | null;
  setIrrigationSuccessMessage: (msg: string | null) => void;
  
  // Customization
  selectedWidgets: string[];
  setSelectedWidgets: React.Dispatch<React.SetStateAction<string[]>>;
  toggleWidget: (id: string) => void;
  
  // Actions
  addExpense: (expense: Omit<FarmExpense, 'id'>) => void;
  markAlertRead: (id: string) => void;
  dismissAlert: (id: string) => void;
  addEvent: (event: Omit<FarmEvent, 'id'>) => void;
  simulateSensorUpdate: () => void;
  
  // Navigation & History
  currentView: string;
  setCurrentView: (view: string) => void;
  goBack: (fallback?: string) => void;
  
  // Voice
  voiceActive: boolean;
  setVoiceActive: (active: boolean) => void;
}

const defaultWidgets = [
  'soil-moisture',
  'crop-health',
  'water-tank',
  'solar-energy',
  'weather',
  'pump',
  'water-usage',
  'energy-usage'
];

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage for language
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('smartagri_lang');
    return (saved as LanguageCode) || 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('smartagri_lang', lang);
  };

  const t = (key: TranslationKeys): string => {
    return getTranslation(language, key);
  };

  // Connection & sync
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('online');
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('Just now');

  // Farm Profile & Zones
  const profile = demoFarmProfile;
  const [zones, setZones] = useState<FarmZone[]>(initialFarmZones);
  const [activeZoneId, setActiveZoneId] = useState<string>('zone-a');
  const activeZone = zones.find(z => z.id === activeZoneId) || zones[0];

  // Telemetry states
  const [weather, setWeather] = useState<WeatherData>(initialWeatherData);
  const [solar, setSolar] = useState<SolarTelemetry>(initialSolarTelemetry);
  const [water, setWater] = useState<WaterTelemetry>(initialWaterTelemetry);
  const [postHarvest, setPostHarvest] = useState<PostHarvestTelemetry>(initialPostHarvest);
  const [ioTDevices, setIoTDevices] = useState<IoTDevice[]>(initialIoTDevices);
  const [expenses, setExpenses] = useState<FarmExpense[]>(initialExpenses);
  const [alerts, setAlerts] = useState<SmartAlert[]>(initialAlerts);
  const [events, setEvents] = useState<FarmEvent[]>(initialEvents);

  // Irrigation state
  const [pumpStatus, setPumpStatus] = useState<'OFF' | 'ON'>('OFF');
  const [isIrrigating, setIsIrrigating] = useState<boolean>(false);
  const [irrigationProgress, setIrrigationProgress] = useState<number>(0);
  const [irrigationRemainingSeconds, setIrrigationRemainingSeconds] = useState<number>(0);
  const [irrigationSuccessMessage, setIrrigationSuccessMessage] = useState<string | null>(null);

  // Dashboard customization state
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('smartagri_widgets');
      return saved ? JSON.parse(saved) : defaultWidgets;
    } catch {
      return defaultWidgets;
    }
  });

  useEffect(() => {
    localStorage.setItem('smartagri_widgets', JSON.stringify(selectedWidgets));
  }, [selectedWidgets]);

  const toggleWidget = (id: string) => {
    setSelectedWidgets(prev =>
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  };

  // Browser History & Navigation Synchronization
  const [currentView, setCurrentViewState] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  });
  const [viewHistory, setViewHistory] = useState<string[]>([]);

  const setCurrentView = (view: string) => {
    if (view !== currentView) {
      setViewHistory(prev => [...prev, currentView]);
      try {
        window.history.pushState({ view }, '', `#${view}`);
      } catch (e) {
        // Fallback if pushState fails
      }
      setCurrentViewState(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = (fallback: string = 'home') => {
    if (viewHistory.length > 0) {
      const prev = [...viewHistory];
      const targetView = prev.pop() || fallback;
      setViewHistory(prev);
      try {
        window.history.pushState({ view: targetView }, '', `#${targetView}`);
      } catch (e) {}
      setCurrentViewState(targetView);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If no internal history yet, go directly to fallback ('home' or 'dashboard')
      if (currentView !== fallback) {
        setCurrentView(fallback);
      } else {
        setCurrentView('home');
      }
    }
  };

  useEffect(() => {
    // Ensure initial state has the view
    try {
      if (!window.history.state?.view) {
        window.history.replaceState({ view: currentView }, '', `#${currentView}`);
      }
    } catch (e) {}

    const handlePopState = (e: PopStateEvent) => {
      const target = e.state?.view || window.location.hash.replace('#', '') || 'home';
      setCurrentViewState(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleHashChange = () => {
      const hashView = window.location.hash.replace('#', '') || 'home';
      if (hashView && hashView !== currentView) {
        setCurrentViewState(hashView);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentView]);

  const [voiceActive, setVoiceActive] = useState<boolean>(false);

  // Irrigation Simulation Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isIrrigating && irrigationRemainingSeconds > 0) {
      timer = setInterval(() => {
        setIrrigationRemainingSeconds(prev => {
          if (prev <= 1) {
            setIsIrrigating(false);
            setPumpStatus('OFF');
            setIrrigationProgress(100);
            
            // Raise Zone A soil moisture from 32% to 48%
            setZones(curr =>
              curr.map(z =>
                z.id === 'zone-a'
                  ? {
                      ...z,
                      soilMoisture: 48,
                      irrigationStatus: 'Optimal',
                      recentIrrigation: 'Completed just now (240 L)'
                    }
                  : z
              )
            );

            // Update water tank and flow
            setWater(curr => ({
              ...curr,
              tankLevelPercent: Math.max(20, curr.tankLevelPercent - 5),
              todayUsageLiters: curr.todayUsageLiters + 240,
              potentialSavingsLiters: curr.potentialSavingsLiters + 70
            }));

            // Update solar pump consumption
            setSolar(curr => ({
              ...curr,
              pumpConsumedKWh: +(curr.pumpConsumedKWh + 0.8).toFixed(1),
              remainingCleanKWh: Math.max(0, +(curr.remainingCleanKWh - 0.8).toFixed(1))
            }));

            // Update Pump IoT device
            setIoTDevices(curr =>
              curr.map(d =>
                d.type === 'pump'
                  ? { ...d, value: 'Status: OFF (Cycle Done)', lastUpdated: 'Just now' }
                  : d.type === 'flow'
                  ? { ...d, value: '0 L/min (Idle)', lastUpdated: 'Just now' }
                  : d
              )
            );

            setIrrigationSuccessMessage(
              'Irrigation completed successfully. Soil moisture increased from 32% → 48%. Pump switched OFF.'
            );

            try {
              confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 }
              });
            } catch (e) {
              // ignore
            }

            return 0;
          }
          const next = prev - 1;
          const total = 10;
          setIrrigationProgress(Math.round(((total - next) / total) * 100));
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isIrrigating, irrigationRemainingSeconds]);

  const startSmartIrrigation = (durationMinutes = 18) => {
    setIsIrrigating(true);
    setPumpStatus('ON');
    setIrrigationProgress(0);
    setIrrigationRemainingSeconds(10);
    setIrrigationSuccessMessage(null);

    setIoTDevices(curr =>
      curr.map(d =>
        d.type === 'pump'
          ? { ...d, value: 'Status: ON (Active)', lastUpdated: 'Just now' }
          : d.type === 'flow'
          ? { ...d, value: '24 L/min (Flowing)', lastUpdated: 'Just now' }
          : d
      )
    );
  };

  const stopSmartIrrigation = () => {
    setIsIrrigating(false);
    setPumpStatus('OFF');
    setIrrigationRemainingSeconds(0);
    setIoTDevices(curr =>
      curr.map(d =>
        d.type === 'pump'
          ? { ...d, value: 'Status: OFF', lastUpdated: 'Just now' }
          : d.type === 'flow'
          ? { ...d, value: '0 L/min', lastUpdated: 'Just now' }
          : d
      )
    );
  };

  // Actions
  const addExpense = (newExp: Omit<FarmExpense, 'id'>) => {
    const item: FarmExpense = {
      ...newExp,
      id: `exp-${Date.now()}`
    };
    setExpenses(prev => [item, ...prev]);
  };

  const markAlertRead = (id: string) => {
    setAlerts(prev => prev.map(a => (a.id === id ? { ...a, isRead: true } : a)));
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const addEvent = (newEvent: Omit<FarmEvent, 'id'>) => {
    const item: FarmEvent = {
      ...newEvent,
      id: `evt-${Date.now()}`
    };
    setEvents(prev => [...prev, item]);
  };

  const simulateSensorUpdate = () => {
    setLastSyncedTime('Just now');
    
    setZones(curr =>
      curr.map(z => ({
        ...z,
        soilTemp: +(z.soilTemp + (Math.random() * 0.4 - 0.2)).toFixed(1),
        soilMoisture: Math.min(95, Math.max(15, +(z.soilMoisture + (Math.random() * 2 - 1)).toFixed(0)))
      }))
    );

    setSolar(curr => ({
      ...curr,
      currentOutputWatts: Math.round(3300 + Math.random() * 300),
      generatedTodayKWh: +(curr.generatedTodayKWh + 0.1).toFixed(1)
    }));

    setWeather(curr => ({
      ...curr,
      temp: Math.round(28 + Math.random() * 2),
      humidity: Math.round(62 + Math.random() * 5)
    }));

    setIoTDevices(curr =>
      curr.map(d => ({
        ...d,
        battery: Math.max(10, d.battery - (Math.random() > 0.8 ? 1 : 0)),
        lastUpdated: 'Just now'
      }))
    );
  };

  return (
    <FarmContext.Provider
      value={{
        profile,
        language,
        setLanguage,
        t,
        connectionStatus,
        setConnectionStatus,
        lastSyncedTime,
        zones,
        setZones,
        activeZoneId,
        setActiveZoneId,
        activeZone,
        weather,
        solar,
        water,
        postHarvest,
        ioTDevices,
        expenses,
        alerts,
        events,
        pumpStatus,
        isIrrigating,
        irrigationProgress,
        irrigationRemainingSeconds,
        startSmartIrrigation,
        stopSmartIrrigation,
        irrigationSuccessMessage,
        setIrrigationSuccessMessage,
        selectedWidgets,
        setSelectedWidgets,
        toggleWidget,
        addExpense,
        markAlertRead,
        dismissAlert,
        addEvent,
        simulateSensorUpdate,
        currentView,
        setCurrentView,
        goBack,
        voiceActive,
        setVoiceActive
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
