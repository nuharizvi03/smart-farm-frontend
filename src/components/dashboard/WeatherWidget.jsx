import React from 'react';
import { CloudRain, Droplets, Info } from 'lucide-react';

const WeatherWidget = ({ weather, district = 'Anuradhapura', isMobile = false }) => {
  const temp = weather?.temperature ?? 28;
  const condition = weather?.condition ?? 'Light Rain';
  const humidity = weather?.humidity ?? 82;
  const recommendation = weather?.recommendation ?? 'Good weather for fertilizer application before soil saturation.';

  if (isMobile) {
    return (
      <div className="relative rounded-3xl bg-gradient-to-br from-[#165a34] via-[#124d2c] to-[#0d3f23] text-white p-5 overflow-hidden shadow-sm text-left space-y-4">
        {/* Background Graphic */}
        <div className="absolute top-2 right-2 opacity-15 pointer-events-none text-emerald-200">
          <Droplets className="w-24 h-24" />
        </div>

        <div className="flex items-start justify-between relative z-10">
          <div>
            <span className="text-xs font-semibold text-emerald-200">
              Current Weather
            </span>
            <div className="text-4xl font-extrabold text-white mt-1">
              {temp}&deg;C
            </div>
          </div>
          <div className="text-right">
            <div className="w-10 h-10 rounded-full bg-emerald-700/60 border border-emerald-400/30 flex items-center justify-center text-emerald-100 ml-auto mb-1">
              <Droplets className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-emerald-200">
              {humidity}% Humidity
            </div>
          </div>
        </div>

        {/* Mobile Recommendation Alert */}
        <div className="relative z-10 bg-emerald-900/40 border border-emerald-500/20 backdrop-blur-sm rounded-2xl p-3 flex items-start gap-2.5 text-xs text-emerald-50">
          <Info className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed font-normal">
            Good day for fertilizer application.
          </span>
        </div>
      </div>
    );
  }

  // Desktop Card View
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between text-left space-y-4 h-full">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-700">
            {district}, SL
          </span>
          <CloudRain className="w-7 h-7 text-emerald-700" />
        </div>

        <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
          {temp}&deg;C
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold border-t border-slate-100 pt-2.5">
          <span>{condition}</span>
          <span>Humidity {humidity}%</span>
        </div>
      </div>

      {/* Desktop Recommendation Box */}
      <div className="bg-[#e7f7ed] border border-emerald-200/50 rounded-2xl p-3.5 flex items-start gap-2 text-xs text-emerald-900">
        <Info className="w-4 h-4 text-[#0c4e2b] flex-shrink-0 mt-0.5" />
        <p className="leading-snug">
          <strong className="font-bold text-[#0c4e2b]">Recommendation: </strong>
          {recommendation}
        </p>
      </div>
    </div>
  );
};

export default WeatherWidget;
