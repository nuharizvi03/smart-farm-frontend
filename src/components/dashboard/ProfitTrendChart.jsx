import React, { useState } from 'react';
import { ChevronDown, TrendingUp } from 'lucide-react';

const ProfitTrendChart = ({ trendData = [] }) => {
  const [selectedRange, setSelectedRange] = useState('Last 6 Months');
  const [rangeMenuOpen, setRangeMenuOpen] = useState(false);
  const [hoveredBar, setHoveredBar] = useState(null);

  // Fallback realistic monthly data if trendData from API is initially empty or loading
  const defaultMonths = [
    { label: 'JAN', revenue: 280000, expenses: 190000, profit: 90000, height: 42 },
    { label: 'FEB', revenue: 320000, expenses: 200000, profit: 120000, height: 58 },
    { label: 'MAR', revenue: 310000, expenses: 215000, profit: 95000, height: 45 },
    { label: 'APR', revenue: 410000, expenses: 230000, profit: 180000, height: 75 },
    { label: 'MAY', revenue: 520000, expenses: 250000, profit: 270000, height: 100, isPeak: true },
    { label: 'JUN', revenue: 390000, expenses: 230000, profit: 160000, height: 68 },
  ];

  const chartData = trendData.length > 0 
    ? trendData.slice(-6).map((item, idx, arr) => {
        const maxProfit = Math.max(...arr.map(m => m.profit || 1));
        const heightPct = Math.max(20, Math.round(((item.profit || 0) / (maxProfit || 1)) * 100));
        return {
          label: item.label ? item.label.split(' ')[0].toUpperCase() : `M${idx+1}`,
          revenue: item.revenue || 0,
          expenses: item.total_expenses || 0,
          profit: item.profit || 0,
          height: heightPct,
          isPeak: heightPct === 100,
        };
      })
    : defaultMonths;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-left flex flex-col justify-between space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Profit Trend
            </h3>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" />
              <span>+12% vs last month</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Net growth performance over the last 6 months
          </p>
        </div>

        {/* Timeframe Dropdown Pill */}
        <div className="relative inline-block self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setRangeMenuOpen(!rangeMenuOpen)}
            className="flex items-center gap-1.5 bg-[#f4f7f5] hover:bg-slate-100 text-xs font-semibold text-slate-700 px-3 py-1.5 rounded-full border border-slate-200/60 transition-colors"
          >
            <span>{selectedRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {rangeMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-30 animate-in fade-in">
              {['Last 6 Months', 'Last 12 Months', 'This Season'].map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => {
                    setSelectedRange(range);
                    setRangeMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                    selectedRange === range
                      ? 'bg-emerald-50 text-[#0c4e2b] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Bar Chart Display */}
      <div className="relative pt-6">
        {/* Tooltip on Hover */}
        {hoveredBar !== null && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] rounded-xl px-3 py-1.5 shadow-lg pointer-events-none z-20 flex items-center gap-3">
            <span className="font-bold text-emerald-400">{chartData[hoveredBar].label}</span>
            <span>Rev: LKR {chartData[hoveredBar].revenue.toLocaleString()}</span>
            <span className="text-emerald-300 font-semibold">Net: LKR {chartData[hoveredBar].profit.toLocaleString()}</span>
          </div>
        )}

        <div className="grid grid-cols-6 gap-2 sm:gap-4 h-48 sm:h-52 items-end px-2">
          {chartData.map((bar, idx) => (
            <div
              key={bar.label + idx}
              className="flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
              onMouseEnter={() => setHoveredBar(idx)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              <div className="w-full max-w-[48px] bg-slate-50 rounded-t-xl overflow-hidden flex flex-col justify-end h-full">
                <div
                  style={{ height: `${bar.height}%` }}
                  className={`w-full rounded-t-xl transition-all duration-500 ${
                    bar.isPeak
                      ? 'bg-[#0c4e2b] shadow-md group-hover:bg-[#08381e]'
                      : 'bg-[#a3c4b0] group-hover:bg-[#8eb89e]'
                  }`}
                />
              </div>
              <span className={`text-[11px] font-bold ${bar.isPeak ? 'text-[#0c4e2b]' : 'text-slate-500'}`}>
                {bar.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue vs Expense Comparison (Mobile View Component) */}
      <div className="border-t border-slate-100 pt-5 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider">
          <span>Revenue vs Expense</span>
          <div className="flex items-center gap-3 lowercase text-slate-500 font-medium text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0c4e2b]" />
              Revenue
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              Expense
            </span>
          </div>
        </div>

        {/* JAN Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
            <span>JAN</span>
            <span>72% / 28%</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full flex overflow-hidden">
            <div className="bg-[#0c4e2b] h-full" style={{ width: '72%' }} />
            <div className="bg-rose-600 h-full" style={{ width: '28%' }} />
          </div>
        </div>

        {/* FEB Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
            <span>FEB</span>
            <span>76% / 24%</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full flex overflow-hidden">
            <div className="bg-[#0c4e2b] h-full" style={{ width: '76%' }} />
            <div className="bg-rose-600 h-full" style={{ width: '24%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitTrendChart;
