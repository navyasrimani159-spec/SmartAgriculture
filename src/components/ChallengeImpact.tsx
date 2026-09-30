import React from 'react';
import {
  Droplets,
  Sun,
  Package,
  Users,
  ShieldCheck,
  TrendingUp,
  Award,
  Zap,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const ChallengeImpact: React.FC = () => {
  const { t, language } = useFarm();

  const challengePillars = [
    {
      icon: Droplets,
      title: t('reduceIntensity'),
      desc: t('reduceIntensityDesc'),
      highlight: language === 'ta' ? '40% நீர் சேமிப்பு & பூஜ்ஜிய டீசல் பயன்பாடு' : 'Up to 40% water saved & zero diesel emissions',
      color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400'
    },
    {
      icon: Package,
      title: t('minimizeLoss'),
      desc: t('minimizeLossDesc'),
      highlight: language === 'ta' ? 'தொடர்ச்சியான வெப்பநிலை & ஈரப்பதம் கண்காணிப்பு' : 'Continuous temperature, RH & CO2 storage telemetry',
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400'
    },
    {
      icon: Users,
      title: t('empowerSmallholders'),
      desc: t('empowerSmallholdersDesc'),
      highlight: language === 'ta' ? '13 இந்திய மொழிகள் & ஆஃப்லைன் பயன்முறை' : '13 Indian languages, intuitive UI & offline mode',
      color: 'from-emerald-500/20 to-green-500/10 border-emerald-500/30 text-emerald-400'
    },
    {
      icon: ShieldCheck,
      title: t('strengthenResilience'),
      desc: t('strengthenResilienceDesc'),
      highlight: language === 'ta' ? 'துல்லிய வானிலை கணிப்பு & வெப்ப எச்சரிக்கை' : 'Hyperlocal forecast, heat stress warnings & dry spell alerts',
      color: 'from-teal-500/20 to-emerald-500/10 border-teal-500/30 text-teal-400'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Sustainable Mission Pillars */}
      <div>
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Sustainable AgriTech Mission</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('challengeTitle')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            A purpose-built solution tackling the core challenges of modern farming:
            resource intensity, post-harvest losses, smallholder prosperity, and climate adaptation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challengePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className={`rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${pillar.color} border bg-slate-900/60 backdrop-blur-md flex flex-col justify-between hover:scale-[1.01] transition-transform`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{pillar.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{pillar.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
