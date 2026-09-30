import React, { useState } from 'react';
import {
  Coins,
  Plus,
  TrendingDown,
  PieChart as PieIcon,
  Tag,
  ArrowUpRight,
  Sparkles,
  Wallet
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';
import { useFarm } from '../context/FarmContext';
import { FarmExpense } from '../types';
import { BackButton } from '../components/BackButton';

export const ExpenseTrackerPage: React.FC = () => {
  const { expenses, addExpense } = useFarm();
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState<FarmExpense['category']>('Fertilizer');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('2026-09-16');

  const totalExpense = expenses.reduce((sum, item) => sum + item.amountInr, 0);

  // Group by category for pie chart
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amountInr;
    return acc;
  }, {} as Record<string, number>);

  const pieColors: Record<string, string> = {
    Seeds: '#10b981',
    Fertilizer: '#06b6d4',
    Electricity: '#f59e0b',
    Diesel: '#ef4444',
    Labour: '#8b5cf6',
    Irrigation: '#3b82f6',
    Equipment: '#ec4899',
    Transport: '#14b8a6'
  };

  const pieData = Object.keys(categoryTotals).map(cat => ({
    name: cat,
    value: categoryTotals[cat],
    color: pieColors[cat] || '#10b981'
  }));

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount) return;
    addExpense({
      category,
      description,
      amountInr: parseFloat(amount),
      date
    });
    setDescription('');
    setAmount('');
    setModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <BackButton fallbackView="home" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Coins className="w-4 h-4" />
            <span>Farm Financial Ledger</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Farm Expense & Input Cost Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track operational expenditures, diesel vs solar power savings, fertilizer inputs, and farm labor expenses.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Top Banner Total Expenses */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase">Season Total Expenses</span>
          <div className="text-4xl sm:text-5xl font-black text-white mt-1">
            ₹{totalExpense.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-slate-300 mt-1">
            2.5-acre tomato, chilli & cotton production cycle.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/60 border border-white/10 p-4 rounded-2xl">
          <Wallet className="w-8 h-8 text-emerald-400" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Solar Decarbonization Saving</span>
            <div className="text-lg font-black text-emerald-400">~₹4,600 Saved</div>
            <span className="text-[10px] text-slate-400">Saved on pump diesel/grid tariff</span>
          </div>
        </div>
      </div>

      {/* Chart & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-2xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase">Input Distribution</span>
            <h3 className="text-base font-bold text-white">Expenses by Category</h3>

            <div className="h-52 w-full my-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {pieData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px' }}
                    formatter={(val: number) => [`₹${val.toLocaleString('en-IN')}`, 'Amount']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-white/10">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300 text-[11px] truncate">{item.name}</span>
                </div>
                <span className="font-bold text-white text-[11px]">₹{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Itemized Expense Table */}
        <div className="lg:col-span-2 rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Itemized Expense Records</h3>
            <span className="text-xs text-slate-400">{expenses.length} Total Entries</span>
          </div>

          <div className="divide-y divide-white/5 max-h-96 overflow-y-auto">
            {expenses.map(exp => (
              <div key={exp.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-xl text-slate-950 font-bold"
                    style={{ backgroundColor: pieColors[exp.category] || '#10b981' }}
                  >
                    <Tag className="w-4 h-4 text-slate-950" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{exp.description}</h4>
                    <span className="text-xs text-slate-400">{exp.category} • {exp.date}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-white">₹{exp.amountInr.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <form onSubmit={handleAdd} className="rounded-3xl p-6 bg-slate-900 border border-white/15 shadow-2xl max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Record Farm Expense</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Seeds">Seeds</option>
                  <option value="Fertilizer">Fertilizer</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Labour">Labour</option>
                  <option value="Irrigation">Irrigation</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Transport">Transport</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="e.g. Micronutrient zinc spray bottle"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Amount (₹ INR)</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="2500"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
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
                Save Expense
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
