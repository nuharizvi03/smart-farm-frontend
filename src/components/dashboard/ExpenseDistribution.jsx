import React from 'react';

const ExpenseDistribution = ({ distributionData = [] }) => {
  const defaultCategories = [
    { category: 'Fertilizer', percentage: 42, color: 'bg-[#0c4e2b]' },
    { category: 'Labor', percentage: 28, color: 'bg-[#2d7a4f]' },
    { category: 'Seeds', percentage: 15, color: 'bg-[#b45309]' },
    { category: 'Equipment', percentage: 15, color: 'bg-[#64748b]' },
  ];

  const categories = distributionData.length > 0
    ? distributionData.map((d, i) => {
        const colors = ['bg-[#0c4e2b]', 'bg-[#2d7a4f]', 'bg-[#b45309]', 'bg-[#64748b]', 'bg-[#0284c7]'];
        return {
          category: d.category,
          percentage: d.percentage,
          color: colors[i % colors.length],
        };
      })
    : defaultCategories;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-left flex flex-col justify-between space-y-6 h-full">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Expense Distribution
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Breakdown by category
          </p>
        </div>

        {/* Category List with Progress Bars */}
        <div className="space-y-3.5 pt-1">
          {categories.map((cat) => (
            <div key={cat.category} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>{cat.category}</span>
                <span className="text-slate-900 font-bold">{cat.percentage}%</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Largest Expense Highlight Card */}
      <div className="bg-[#f0f8f3] border border-emerald-950/5 rounded-2xl p-4 text-center space-y-1">
        <span className="text-xs text-slate-500 font-medium">
          Largest expense this month:
        </span>
        <div className="text-sm sm:text-[15px] font-bold text-[#0c4e2b]">
          Nitrogen Fertilizer Bulk Order
        </div>
      </div>
    </div>
  );
};

export default ExpenseDistribution;
