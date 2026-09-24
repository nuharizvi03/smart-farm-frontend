import React from 'react';
import { X, Check } from 'lucide-react';

const ProblemSolutionSection = () => {
  return (
    <section id="benefits" className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* The Problem Card */}
        <div className="bg-[#e4f1e7] border border-emerald-950/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-3.5 shadow-sm transition-transform hover:shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
              <X className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              The Problem
            </h3>
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            Scattered notebooks and lost receipts mean you never truly know if a crop was profitable until it's too late.
          </p>
        </div>

        {/* The FarmWise Solution Card */}
        <div className="bg-[#1b5d37] border border-emerald-900/20 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-3.5 shadow-sm transition-transform hover:shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-700/80 flex items-center justify-center text-emerald-100 flex-shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-emerald-100">
              The FarmWise Solution
            </h3>
          </div>
          <p className="text-sm sm:text-base text-emerald-50/95 leading-relaxed font-normal">
            One organized digital system. Input expenses as they happen, record sales, and see your true net profit instantly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
