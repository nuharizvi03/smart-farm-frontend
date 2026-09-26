import React from 'react';
import { FileSpreadsheet, Map } from 'lucide-react';

const WelcomeBanner = ({ user, onViewMapClick, onGenerateReportClick }) => {
  const firstName = user?.full_name ? user.full_name.split(' ')[0] : 'Nimal';

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-[#1b5d38] via-[#165432] to-[#12492b] text-white p-6 sm:p-8 overflow-hidden shadow-sm text-left flex flex-col justify-between min-h-[220px]">
      {/* Large Decorative Leaf Watermark */}
      <div className="absolute -right-6 -bottom-8 w-60 h-60 opacity-15 pointer-events-none text-emerald-200">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <path d="M50 10 C20 30 10 70 50 90 C90 70 80 30 50 10 Z" />
          <path d="M50 20 L50 85 M50 35 L70 50 M50 50 L30 65 M50 65 L70 80" stroke="currentColor" strokeWidth="4" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 space-y-3">
        {/* Season Tag */}
        <div className="inline-block text-[11px] font-extrabold tracking-widest uppercase text-emerald-300">
          MAHA SEASON 2024
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Welcome back, {firstName}!
        </h2>

        {/* Subtitle description */}
        <p className="text-sm sm:text-[15px] text-emerald-100/90 leading-relaxed max-w-xl font-normal">
          Your fields are looking healthy. Currently, 85% of your crops are in the active growth stage. Expect harvest in approximately 3 weeks.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 flex flex-wrap items-center gap-3 pt-4">
        <button
          type="button"
          onClick={onViewMapClick}
          className="inline-flex items-center gap-2 bg-white hover:bg-emerald-50 active:scale-[0.98] text-[#0c4e2b] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-sm transition-all"
        >
          <Map className="w-4 h-4 text-[#0c4e2b]" />
          <span>View Field Map</span>
        </button>

        <button
          type="button"
          onClick={onGenerateReportClick}
          className="inline-flex items-center gap-2 bg-emerald-900/40 hover:bg-emerald-900/60 border border-white/20 active:scale-[0.98] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full backdrop-blur-sm transition-all"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
          <span>Generate Report</span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeBanner;
