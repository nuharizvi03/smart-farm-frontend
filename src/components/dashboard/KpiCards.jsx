import React from 'react';
import { Wallet, Receipt, Banknote, Layers } from 'lucide-react';

const KpiCards = ({ kpis = {} }) => {
  const totalRevenue = kpis?.total_revenue ?? 450200;
  const totalExpenses = kpis?.total_expenses ?? 210500;
  const netProfit = kpis?.net_profit_loss ?? (totalRevenue - totalExpenses);
  const activeCropCount = kpis?.active_crop_plans ?? 4;

  const cards = [
    {
      id: 'revenue',
      label: 'Total Revenue',
      value: `LKR ${Number(totalRevenue).toLocaleString()}`,
      badge: '+12%',
      badgeColor: 'bg-emerald-50 text-emerald-700 font-bold',
      icon: Wallet,
      iconColor: 'text-emerald-700 bg-emerald-50',
      borderAccent: '',
    },
    {
      id: 'expenses',
      label: 'Total Expenses',
      value: `LKR ${Number(totalExpenses).toLocaleString()}`,
      badge: null,
      icon: Receipt,
      iconColor: 'text-rose-600 bg-rose-50',
      borderAccent: '',
    },
    {
      id: 'profit',
      label: 'Net Profit',
      value: `LKR ${Number(netProfit).toLocaleString()}`,
      valueColor: 'text-[#15803d]',
      badge: null,
      icon: Banknote,
      iconColor: 'text-emerald-800 bg-emerald-50',
      borderAccent: 'border-l-4 border-l-[#16a34a]',
    },
    {
      id: 'plots',
      label: 'Active Crop Plans',
      value: `${activeCropCount} Plots`,
      badge: null,
      icon: Layers,
      iconColor: 'text-slate-700 bg-slate-100',
      borderAccent: '',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-sm text-left flex flex-col justify-between space-y-3 ${card.borderAccent}`}
          >
            <div className="flex items-center justify-between">
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${card.iconColor}`}>
                <Icon className="w-5 h-5 stroke-[2]" />
              </div>

              {card.badge && (
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${card.badgeColor}`}>
                  {card.badge}
                </span>
              )}
            </div>

            <div>
              <span className="text-xs sm:text-sm font-medium text-slate-500 block">
                {card.label}
              </span>
              <div className={`text-base sm:text-xl font-extrabold tracking-tight mt-1 ${card.valueColor || 'text-slate-900'}`}>
                {card.value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KpiCards;
