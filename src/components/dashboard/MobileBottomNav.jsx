import React from 'react';
import { Home, Sprout, FileText, Bell, User, Plus } from 'lucide-react';

const MobileBottomNav = ({ onFabClick }) => {
  const tabs = [
    { label: 'Home', icon: Home, active: true },
    { label: 'Crops', icon: Sprout, active: false },
    { label: 'Reports', icon: FileText, active: false },
    { label: 'Alerts', icon: Bell, active: false },
    { label: 'Account', icon: User, active: false },
  ];

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <div className="fixed right-5 bottom-20 z-40 lg:hidden">
        <button
          type="button"
          onClick={onFabClick}
          className="w-14 h-14 rounded-2xl bg-[#0c4e2b] text-white shadow-xl flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Add Record"
        >
          <Plus className="w-7 h-7 stroke-[2.5]" />
        </button>
      </div>

      {/* Bottom Sticky Tab Bar */}
      <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 flex items-center justify-around z-30 lg:hidden shadow-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.label}
              type="button"
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all ${
                tab.active
                  ? 'bg-[#9ae65c] text-emerald-950 font-bold px-4'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] font-bold">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default MobileBottomNav;
