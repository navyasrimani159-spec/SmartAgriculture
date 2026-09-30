import React, { useState } from 'react';
import {
  Droplets,
  Power,
  Sun,
  CloudRain,
  Thermometer,
  Waves,
  CheckCircle2,
  Clock,
  Sparkles,
  Play,
  RotateCcw,
  Zap,
  Calendar,
  AlertCircle,
  SkipForward,
  Undo2
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { visualAssets } from '../data/visualAssets';
import { BackButton } from '../components/BackButton';

export const SmartIrrigationPage: React.FC = () => {
  const {
    t,
    language,
    zones,
    setZones,
    activeZoneId,
    setActiveZoneId,
    activeZone,
    pumpStatus,
    isIrrigating,
    irrigationProgress,
    irrigationRemainingSeconds,
    startSmartIrrigation,
    stopSmartIrrigation,
    irrigationSuccessMessage,
    setIrrigationSuccessMessage,
    solar,
    water,
    weather
  } = useFarm();

  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('06:00 AM');
  const [scheduleSuccess, setScheduleSuccess] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  const handleSchedule = () => {
    setScheduleSuccess(true);
    setTimeout(() => {
      setScheduleSuccess(false);
      setScheduleModalOpen(false);
    }, 1500);
  };

  const handleSkip = () => {
    setIsSkipped(true);
    setIrrigationSuccessMessage(null);
    setZones(prev =>
      prev.map(z =>
        z.id === activeZoneId ? { ...z, irrigationStatus: 'Postponed' } : z
      )
    );
  };

  const handleUndoSkip = () => {
    setIsSkipped(false);
    setZones(prev =>
      prev.map(z =>
        z.id === activeZoneId ? { ...z, irrigationStatus: 'Required' } : z
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back Button for Navigation */}
      <BackButton fallbackView="dashboard" />

      {/* 1. Realistic Drip Irrigation Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <div
          className="h-64 sm:h-72 bg-cover bg-center"
          style={{ backgroundImage: `url(${visualAssets.irrigation})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-cyan-950/70" />
        </div>

        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-semibold backdrop-blur-md">
              <Droplets className="w-3.5 h-3.5" />
              <span>Precision Drip Automation</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 text-xs text-slate-300">
              <span className={`w-2 h-2 rounded-full ${pumpStatus === 'ON' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span>Pump Status: <strong className={pumpStatus === 'ON' ? 'text-emerald-400 font-black' : 'text-slate-300'}>{pumpStatus}</strong></span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {t('smart_irrigation')}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Targeted root-zone hydration synchronized with soil moisture deficits and clean solar power generation. Saves up to 40% water over conventional flood methods.
            </p>
          </div>
        </div>
      </div>

      {/* Zone Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {zones.map(zone => (
          <button
            key={zone.id}
            onClick={() => {
              setActiveZoneId(zone.id);
              setIsSkipped(false);
              setIrrigationSuccessMessage(null);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeZoneId === zone.id
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-white/10'
            }`}
          >
            <span>{zone.name}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
              zone.soilMoisture < 35 ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
            }`}>
              {zone.soilMoisture}%
            </span>
          </button>
        ))}
      </div>

      {/* 2. Success Alert Banner */}
      {irrigationSuccessMessage && (
        <div className="rounded-2xl p-4 bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center justify-between shadow-xl animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-semibold">{irrigationSuccessMessage}</span>
          </div>
          <button
            onClick={() => setIrrigationSuccessMessage(null)}
            className="text-xs text-emerald-400 hover:underline shrink-0 ml-4 font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 2b. Skipped Status Banner */}
      {isSkipped && (
        <div className="rounded-2xl p-5 bg-slate-900 border border-amber-500/40 text-amber-200 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <SkipForward className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white block">
                {language === 'ta' ? 'இன்றைய பாசனம் தவிர்க்கப்பட்டது' : 'Irrigation Postponed for Today'}
              </span>
              <span className="text-slate-300 text-xs">
                {language === 'ta'
                  ? `${activeZone.name} பாசனம் ஒத்திவைக்கப்பட்டது. அடுத்த மதிப்பாய்வு நாளை காலை 06:00 மணிக்கு.`
                  : `Irrigation for ${activeZone.name} skipped. Soil moisture re-assessment scheduled for tomorrow 06:00 AM.`}
              </span>
            </div>
          </div>
          <button
            onClick={handleUndoSkip}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
          >
            <Undo2 className="w-4 h-4 text-emerald-400" />
            <span>{language === 'ta' ? 'மீண்டும் செயல்படுத்தவும்' : 'Undo / Re-evaluate'}</span>
          </button>
        </div>
      )}

      {/* 3. Live Telemetry Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10">
          <span className="text-[11px] text-slate-400">{t('soilMoisture')}</span>
          <div className="text-xl font-black text-white mt-1">{activeZone.soilMoisture}%</div>
          <span className={`text-[10px] font-semibold ${activeZone.soilMoisture < 35 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {activeZone.soilMoisture < 35 ? 'Low Deficit' : t('optimal')}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10">
          <span className="text-[11px] text-slate-400">Crop Type</span>
          <div className="text-xl font-black text-white mt-1 truncate">{activeZone.crop}</div>
          <span className="text-[10px] text-slate-400">Day 54 Active</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10">
          <span className="text-[11px] text-slate-400">Soil Temp</span>
          <div className="text-xl font-black text-white mt-1">{activeZone.soilTemp}°C</div>
          <span className="text-[10px] text-slate-400">Loam Profile</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10">
          <span className="text-[11px] text-slate-400">Air Humidity</span>
          <div className="text-xl font-black text-white mt-1">{weather.humidity}%</div>
          <span className="text-[10px] text-slate-400">Ambient RH</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10">
          <span className="text-[11px] text-slate-400">Rain Prob.</span>
          <div className="text-xl font-black text-white mt-1">{weather.rainProbability}%</div>
          <span className="text-[10px] text-emerald-400">Safe Window</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10">
          <span className="text-[11px] text-slate-400">{t('waterTank')}</span>
          <div className="text-xl font-black text-white mt-1">{water.tankLevelPercent}%</div>
          <span className="text-[10px] text-slate-400">3,400 L Left</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10">
          <span className="text-[11px] text-slate-400">{t('pump')}</span>
          <div className={`text-xl font-black mt-1 ${pumpStatus === 'ON' ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`}>
            {pumpStatus}
          </div>
          <span className="text-[10px] text-slate-400">2.2 kW Solar</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10">
          <span className="text-[11px] text-slate-400">{t('solarEnergy')}</span>
          <div className="text-xl font-black text-amber-400 mt-1">{solar.generatedTodayKWh} kWh</div>
          <span className="text-[10px] text-emerald-400">3.4 kW Output</span>
        </div>
      </div>

      {/* 4. Large Recommendation Card (Main Requirement) */}
      {!isSkipped && (
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          {/* Animated Water Flow Line if irrigating */}
          {isIrrigating && (
            <div className="absolute top-0 left-0 right-0 h-2.5 water-flow-active bg-cyan-500/40" />
          )}

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                <Droplets className="w-4 h-4" />
                <span>{t('irrigationRecommendation')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Irrigation is recommended for {activeZone.name}.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Automated agronomic calculation based on current root zone deficit and weather forecast.
              </p>
            </div>

            {/* Time & Resource Badge */}
            <div className="flex items-center gap-3 bg-slate-950/60 border border-white/10 p-3 rounded-2xl">
              <div className="text-center px-3 border-r border-white/10">
                <span className="text-[10px] uppercase text-slate-400 font-bold">Duration</span>
                <div className="text-xl font-black text-white">18 mins</div>
              </div>
              <div className="text-center px-3 border-r border-white/10">
                <span className="text-[10px] uppercase text-slate-400 font-bold">Estimated Water</span>
                <div className="text-xl font-black text-cyan-400">240 L</div>
              </div>
              <div className="text-center px-3">
                <span className="text-[10px] uppercase text-slate-400 font-bold">Est. Energy</span>
                <div className="text-xl font-black text-amber-400">0.8 kWh</div>
              </div>
            </div>
          </div>

          {/* Reasons Grid */}
          <div className="py-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/40 border border-white/5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white">Soil Moisture is Low</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Current reading is {activeZone.soilMoisture}%, which is below the optimal 35% critical threshold for {activeZone.crop}.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/40 border border-white/5">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                <CloudRain className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white">Rain Probability is Low</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Only {weather.rainProbability}% probability of precipitation today. Natural rainfall will not meet crop water requirement.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/40 border border-white/5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white">Active Growth Stage</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {activeZone.crop} is in {activeZone.growthStage}. Moisture stress during flowering causes blossom drop and fruit yield loss.
                </p>
              </div>
            </div>
          </div>

          {/* Live Simulation Progress (When Active) */}
          {isIrrigating && (
            <div className="my-4 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2 text-cyan-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>Precision Drip Valve Active: Pumping 24 L/min</span>
                </div>
                <span className="text-white">Simulated Time Left: {irrigationRemainingSeconds}s</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-1000 ease-linear rounded-full"
                  style={{ width: `${irrigationProgress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Hydrating root zone: 15 cm deep</span>
                <span>Dynamic Soil Moisture: 32% → 48% Target</span>
              </div>
            </div>
          )}

          {/* Action Buttons (Section 6 Requirement: Start Irrigation, Schedule, Skip) */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            {!isIrrigating ? (
              <button
                onClick={() => startSmartIrrigation(18)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>{t('startIrrigation')}</span>
              </button>
            ) : (
              <button
                onClick={stopSmartIrrigation}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-sm shadow-xl transition-all"
              >
                <Power className="w-4 h-4" />
                <span>Stop Pump</span>
              </button>
            )}

            <button
              onClick={() => setScheduleModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-white/10 transition-colors"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>{t('schedule')}</span>
            </button>

            {/* Skip Button with active handler */}
            <button
              onClick={handleSkip}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 font-semibold text-sm border border-white/10 hover:border-amber-500/30 transition-all"
              title="Skip irrigation cycle for today"
            >
              <SkipForward className="w-4 h-4" />
              <span>{t('skip')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="rounded-3xl p-6 bg-slate-900 border border-white/15 shadow-2xl max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Schedule Precision Drip Cycle</h3>
            <p className="text-xs text-slate-400">
              Synchronize irrigation with morning solar hours (06:00 AM - 09:00 AM) to minimize evaporation losses.
            </p>

            <div className="space-y-2">
              <label className="text-xs text-slate-300 font-semibold">Select Scheduled Time:</label>
              <div className="grid grid-cols-3 gap-2">
                {['06:00 AM', '07:30 AM', '04:30 PM'].map(time => (
                  <button
                    key={time}
                    onClick={() => setScheduledTime(time)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                      scheduledTime === time
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-slate-800 text-slate-300 border-white/10 hover:bg-slate-700'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {scheduleSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Scheduled for {scheduledTime} successfully!</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setScheduleModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSchedule}
                className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400"
              >
                Confirm Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
