import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  Search,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { demoMarketCommodities } from '../data/marketData';
import { BackButton } from '../components/BackButton';

export const MarketInfoPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterState, setFilterState] = useState<string>('All');

  const filtered = demoMarketCommodities.filter(item => {
    const matchesSearch =
      item.crop.toLowerCase().includes(search.toLowerCase()) ||
      item.market.toLowerCase().includes(search.toLowerCase()) ||
      item.state.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterState === 'All' || item.state === filterState;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <BackButton fallbackView="home" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>APMC Mandi Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Agricultural Market Prices & Trends
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Indicative daily wholesale prices from agricultural produce market committees across regional hubs.
          </p>
        </div>

        {/* Clear Simulation Notice Pill (Section 18 requirement) */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Demo / Simulated Data — Not Live Market Feed</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search crop, mandi, or state..."
            className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400">State:</span>
          <select
            value={filterState}
            onChange={e => setFilterState(e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
          >
            <option value="All">All States</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Telangana">Telangana</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
          </select>
        </div>
      </div>

      {/* Market Prices Table (Section 18 requirements: Crop, Market, Price, Trend) */}
      <div className="rounded-3xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[11px] font-bold border-b border-white/10">
              <tr>
                <th className="py-4 px-6">Crop & Variety</th>
                <th className="py-4 px-6">APMC Mandi</th>
                <th className="py-4 px-6">Wholesale Price (₹/Quintal)</th>
                <th className="py-4 px-6">Price Trend</th>
                <th className="py-4 px-6 text-right">Data Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <span>{item.crop}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 block font-normal">{item.variety}</span>
                  </td>

                  <td className="py-4 px-6 text-slate-300">
                    <div>{item.market}</div>
                    <span className="text-[11px] text-slate-500">{item.state}</span>
                  </td>

                  <td className="py-4 px-6 font-black text-white text-base">
                    ₹{item.pricePerQuintal.toLocaleString('en-IN')}
                    {item.changeAmount !== 0 && (
                      <span className={`text-[11px] font-bold ml-2 ${
                        item.changeAmount > 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {item.changeAmount > 0 ? `+₹${item.changeAmount}` : `-₹${Math.abs(item.changeAmount)}`}
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6">
                    {item.trend === 'Rising' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                        <TrendingUp className="w-3.5 h-3.5" />
                        📈 Rising
                      </span>
                    )}
                    {item.trend === 'Falling' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 text-xs font-bold">
                        <TrendingDown className="w-3.5 h-3.5" />
                        📉 Falling
                      </span>
                    )}
                    {item.trend === 'Stable' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/10 text-xs font-bold">
                        <Minus className="w-3.5 h-3.5" />
                        ➡️ Stable
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-white/5 uppercase">
                      Simulated Demo
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
