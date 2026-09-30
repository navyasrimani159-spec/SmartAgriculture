import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Wheat,
  Truck,
  Package,
  TrendingUp,
  Plus,
  CheckCircle2,
  Clock,
  Tag
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { FarmEvent } from '../types';
import { BackButton } from '../components/BackButton';

export const HarvestPlannerPage: React.FC = () => {
  const { events, addEvent } = useFarm();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<FarmEvent['category']>('Harvesting');
  const [date, setDate] = useState('2026-09-28');
  const [zone, setZone] = useState('Zone A - Tomato');
  const [notes, setNotes] = useState('');

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addEvent({
      title,
      category,
      date,
      zone,
      notes,
      status: 'Scheduled'
    });
    setTitle('');
    setNotes('');
    setModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <BackButton fallbackView="home" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <Wheat className="w-4 h-4" />
            <span>Yield Timing & Field Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Harvest Planner & Agricultural Calendar
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            End-to-end crop calendar aligning field maturity with cold storage availability, labor schedules, and APMC logistics.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Farm Operation</span>
        </button>
      </div>

      {/* Harvest Readiness Dashboard (Section 16 Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-white/10">
          <span className="text-[11px] text-slate-400">Expected Harvest Date</span>
          <div className="text-lg font-black text-white mt-1">Sept 26, 2026</div>
          <span className="text-[10px] text-emerald-400">In 10 Days</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-white/10">
          <span className="text-[11px] text-slate-400">Estimated Quantity</span>
          <div className="text-lg font-black text-white mt-1">800 kg</div>
          <span className="text-[10px] text-slate-400">Zone A (Tomato)</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-white/10">
          <span className="text-[11px] text-slate-400">Storage Availability</span>
          <div className="text-lg font-black text-emerald-400 mt-1">400 kg Reserved</div>
          <span className="text-[10px] text-slate-400">Unit #3 Cold Chain</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-white/10">
          <span className="text-[11px] text-slate-400">Transport Status</span>
          <div className="text-lg font-black text-cyan-400 mt-1">Truck Booked</div>
          <span className="text-[10px] text-slate-400">Kolar / Hosur Route</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-white/10">
          <span className="text-[11px] text-slate-400">Market Readiness</span>
          <div className="text-lg font-black text-amber-400 mt-1">90% Mature</div>
          <span className="text-[10px] text-slate-400">Breaker Stage</span>
        </div>
      </div>

      {/* Interactive Agricultural Calendar & Activities */}
      <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-emerald-400" />
            <span>Farm Operations Timeline (Sowing, Irrigation, Fertilization, Spraying, Harvest)</span>
          </h3>
          <span className="text-xs text-slate-400">{events.length} Recorded Activities</span>
        </div>

        <div className="divide-y divide-white/5">
          {events.map(evt => (
            <div key={evt.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                  evt.category === 'Harvesting'
                    ? 'bg-amber-500/20 text-amber-400'
                    : evt.category === 'Fertilization'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : evt.category === 'Irrigation'
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'bg-purple-500/20 text-purple-400'
                }`}>
                  <Tag className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{evt.title}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {evt.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{evt.notes}</p>
                  <span className="text-[11px] text-emerald-400 font-medium">{evt.zone}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs shrink-0">
                <span className="text-slate-400">{evt.date}</span>
                <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                  evt.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {evt.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Operation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <form onSubmit={handleAddEvent} className="rounded-3xl p-6 bg-slate-900 border border-white/15 shadow-2xl max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Add Farm Activity</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Foliar Micronutrient Spray"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Sowing">Sowing</option>
                    <option value="Irrigation">Irrigation</option>
                    <option value="Fertilization">Fertilization</option>
                    <option value="Spraying">Spraying</option>
                    <option value="Harvesting">Harvesting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Zone</label>
                <input
                  type="text"
                  value={zone}
                  onChange={e => setZone(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Notes</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Details or inputs to apply..."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white h-20"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400"
              >
                Save Activity
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
