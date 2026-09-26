import React from 'react';
import { Receipt, Tractor, CalendarPlus, ShoppingCart } from 'lucide-react';

const QuickActions = ({ onActionClick }) => {
  const actions = [
    {
      id: 'expense',
      label: 'Add Expense',
      icon: Receipt,
      iconColor: 'text-rose-600 bg-rose-50',
    },
    {
      id: 'harvest',
      label: 'Add Harvest',
      icon: Tractor,
      iconColor: 'text-emerald-700 bg-emerald-50',
    },
    {
      id: 'crop_plan',
      label: 'Create Crop Plan',
      icon: CalendarPlus,
      iconColor: 'text-emerald-600 bg-emerald-50',
    },
    {
      id: 'sale',
      label: 'Record Sale',
      icon: ShoppingCart,
      iconColor: 'text-slate-700 bg-slate-100',
    },
  ];

  return (
    <div className="w-full">
      {/* Desktop Grid Layout (>= md) */}
      <div className="hidden md:grid md:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => onActionClick && onActionClick(action.id)}
              className="bg-white hover:bg-slate-50 border border-slate-200/70 rounded-2xl p-4 shadow-sm hover:shadow transition-all flex items-center gap-3.5 group text-left cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${action.iconColor}`}>
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-sm font-bold text-slate-800 group-hover:text-[#0c4e2b] transition-colors">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile Horizontal Scrollable List (< md) */}
      <div className="block md:hidden">
        <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-none">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                type="button"
                onClick={() => onActionClick && onActionClick(action.id)}
                className="flex items-center gap-2 bg-white active:bg-slate-50 border border-slate-200/80 rounded-full px-4 py-2.5 shadow-sm flex-shrink-0 text-xs font-bold text-slate-700 whitespace-nowrap"
              >
                <Icon className="w-4 h-4 text-emerald-800" />
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
