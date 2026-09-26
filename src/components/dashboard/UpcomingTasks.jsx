import React from 'react';
import { Sprout, Package } from 'lucide-react';

const UpcomingTasks = ({ tasks = [] }) => {
  const defaultTasks = [
    {
      id: 1,
      title: 'Apply Fertilizer',
      subtitle: 'Tomato • Plot North-02',
      tag: 'DUE TODAY',
      tagColor: 'bg-rose-50 text-rose-700 font-bold',
      icon: Sprout,
      iconColor: 'bg-emerald-50 text-emerald-700',
    },
    {
      id: 2,
      title: 'Harvest Tomatoes',
      subtitle: 'Plot 4B - Batch 01',
      tag: 'TOMORROW',
      tagColor: 'bg-slate-100 text-slate-700 font-semibold',
      icon: Package,
      iconColor: 'bg-amber-50 text-amber-700',
    },
  ];

  const displayTasks = tasks.length > 0 ? tasks : defaultTasks;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-left space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          Upcoming Tasks
        </h3>
      </div>

      <div className="space-y-3">
        {displayTasks.map((task) => {
          const Icon = task.icon;
          return (
            <div
              key={task.id}
              className="bg-[#f8faf9] rounded-2xl p-3.5 border border-slate-200/60 flex items-center justify-between gap-3 shadow-sm hover:shadow transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${task.iconColor}`}>
                  <Icon className="w-4.5 h-4.5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {task.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {task.subtitle}
                  </p>
                </div>
              </div>

              <span className={`text-[10px] tracking-wider px-2 py-0.5 rounded-md uppercase whitespace-nowrap flex-shrink-0 ${task.tagColor}`}>
                {task.tag}
              </span>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="w-full mt-2 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors text-center"
      >
        View All Tasks
      </button>
    </div>
  );
};

export default UpcomingTasks;
