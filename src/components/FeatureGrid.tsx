import React, { useState } from 'react';
import {
  Droplets,
  Sprout,
  CloudSun,
  Sun,
  Waves,
  Bot,
  Mic,
  Package,
  Tractor,
  BarChart3,
  MapPin,
  Wheat,
  Coins,
  TrendingUp,
  Bell,
  Cpu,
  FlaskConical,
  Globe,
  Calendar,
  FileText,
  WifiOff,
  Settings,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { featureRegistry } from '../data/featureRegistry';
import { TranslationKeys } from '../i18n';

// Mapping icon strings to Lucide components
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Droplets,
  Sprout,
  CloudSunRain: CloudSun,
  SunMedium: Sun,
  Waves,
  Bot,
  Mic,
  Package,
  Tractor,
  BarChart3,
  MapPin,
  Wheat,
  Coins,
  TrendingUp,
  Bell,
  Cpu,
  FlaskConical,
  Globe,
  Calendar,
  FileText,
  WifiOff,
  Settings
};

export const FeatureGrid: React.FC = () => {
  const { t, setCurrentView } = useFarm();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: `All Modules (${featureRegistry.length})` },
    { id: 'core', label: 'Core Irrigation & Energy' },
    { id: 'intelligence', label: 'Farm Analytics & Weather' },
    { id: 'operations', label: 'Field Operations' },
    { id: 'management', label: 'Post-Harvest & Finance' }
  ];

  const filtered = activeCategory === 'all'
    ? featureRegistry
    : featureRegistry.filter(f => f.category === activeCategory);

  return (
    <section id="features-grid-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Feature Selection System</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t('whatWouldYouManage')}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400">
          Select any agriculture module below to view live sensor telemetry, run precision simulations, or automate farm actions.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/25'
                : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-white/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 22 Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map(feature => {
          const Icon = iconMap[feature.icon] || Sprout;
          const translatedTitle = t(feature.titleKey as TranslationKeys);
          const translatedDesc = t(feature.descriptionKey as TranslationKeys);

          return (
            <div
              key={feature.id}
              onClick={() => {
                // Remove leading slash if needed
                const target = feature.route.replace('/', '');
                setCurrentView(target || 'home');
              }}
              className="group relative rounded-2xl p-5 bg-slate-900/70 hover:bg-slate-900 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-950/40 cursor-pointer flex flex-col justify-between"
            >
              {/* Top Row: Icon + Status */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 border border-white/10 text-emerald-400 group-hover:border-emerald-500/30">
                    {feature.status}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {translatedTitle}
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {translatedDesc}
                </p>
              </div>

              {/* Bottom Row: Action link */}
              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                  Open Module
                </span>
                <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
