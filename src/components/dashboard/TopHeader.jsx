import React from 'react';
import { Search, Bell, HelpCircle, MapPin } from 'lucide-react';
import avatarImg from '../../assets/images/avatar_farmer.jpg';

const TopHeader = ({ user, farm, notificationCount = 2 }) => {
  const farmerName = user?.full_name || 'Nimal Silva';
  const firstName = farmerName.split(' ')[0];
  const farmName = farm?.farm_name || user?.farm_name || 'GreenField Farms';

  return (
    <header className="w-full">
      {/* Desktop Header (>= lg) */}
      <div className="hidden lg:flex items-center justify-between gap-6 py-4 px-8 bg-white/70 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-30">
        {/* Search Input Bar */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4.5 h-4.5" />
          </div>
          <input
            type="text"
            placeholder="Search analytics, crops, or records..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#f4f7f5] border border-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600/40 focus:ring-2 focus:ring-emerald-600/10 transition-all"
          />
        </div>

        {/* Right Header User & Action Tools */}
        <div className="flex items-center gap-5">
          {/* Notification Bell */}
          <button
            type="button"
            className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Help Circle */}
          <button
            type="button"
            className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
            <div className="text-right">
              <div className="text-sm font-bold text-slate-900 leading-tight">
                {farmerName}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Farm Manager
              </div>
            </div>
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-emerald-600/20 shadow-sm flex-shrink-0">
              <img
                src={avatarImg}
                alt={farmerName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Top Header (< lg) */}
      <div className="block lg:hidden px-5 pt-5 pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 text-left">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>Good Morning, {firstName}</span>
              <span className="text-2xl">👋</span>
            </h1>
            <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>{farmName} &bull; Maha Season 2024</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative p-2 rounded-full bg-white shadow-sm border border-slate-200/80 text-slate-700"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-emerald-600/30 shadow-sm flex-shrink-0">
              <img
                src={avatarImg}
                alt={farmerName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
