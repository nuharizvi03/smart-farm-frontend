import React from 'react';
import { ShoppingCart, Fuel } from 'lucide-react';

const RecentActivity = ({ activities = [] }) => {
  const defaultActivities = [
    {
      id: 1,
      type: 'Record Sale',
      desc: '200kg Tomatoes to Global Fresh Ltd.',
      time: '2 hours ago',
      icon: ShoppingCart,
      iconColor: 'bg-emerald-50 text-[#0c4e2b]',
    },
    {
      id: 2,
      type: 'New Expense',
      desc: 'Fuel for irrigation pumps.',
      time: 'Yesterday',
      icon: Fuel,
      iconColor: 'bg-rose-50 text-rose-600',
    },
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-left space-y-4">
      <h3 className="text-lg font-bold text-slate-900 tracking-tight">
        Recent Activity
      </h3>

      <div className="space-y-4 relative pl-2">
        {/* Connecting line */}
        <div className="absolute left-6 top-3 bottom-3 w-[2px] bg-slate-100" />

        {displayActivities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="relative flex items-start gap-3.5 z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ring-4 ring-white ${act.iconColor}`}>
                <Icon className="w-4 h-4 stroke-[2]" />
              </div>

              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-bold text-slate-900">
                  <span className="text-[#0c4e2b]">{act.type}: </span>
                  <span className="font-medium text-slate-700">{act.desc}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {act.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
