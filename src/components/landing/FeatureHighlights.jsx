import React from 'react';
import { FileText, TrendingUp, Smartphone, Cloud, PenLine } from 'lucide-react';

const FeatureHighlights = () => {
  const desktopFeatures = [
    {
      icon: FileText,
      label: 'Simple farm records',
    },
    {
      icon: TrendingUp,
      label: 'Profit and loss insights',
    },
    {
      icon: Smartphone,
      label: 'Mobile-friendly access',
    },
    {
      icon: Cloud,
      label: 'Weather-based planning',
    },
  ];

  const mobileCards = [
    {
      icon: PenLine,
      title: 'Simple records',
      description: 'Easy entry for every task.',
    },
    {
      icon: TrendingUp,
      title: 'Profit insights',
      description: 'Know exactly which crops yield the highest returns.',
    },
    {
      icon: Smartphone,
      title: 'Mobile-friendly',
      description: 'Record actions right from the field or greenhouse.',
    },
    {
      icon: Cloud,
      title: 'Weather sync',
      description: 'Plan harvest and spraying based on live forecasts.',
    },
  ];

  return (
    <section id="features" className="w-full">
      {/* Desktop Ribbon Bar */}
      <div className="hidden md:block bg-[#e5f4eb] border-y border-emerald-900/10 py-6 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {desktopFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.label}
                className="flex items-center gap-3 text-[#1f4a30] hover:text-[#084d2a] transition-colors"
              >
                <div className="text-[#1f4a30] flex-shrink-0">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <span className="text-[15px] font-semibold tracking-tight whitespace-nowrap">
                  {feature.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Feature Cards (Horizontal Scrollable Carousel) */}
      <div className="block md:hidden px-5 py-4">
        <div className="flex gap-3 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none -mx-5 px-5">
          {mobileCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="snap-start flex-shrink-0 w-[240px] bg-white rounded-2xl p-5 border border-emerald-950/10 shadow-sm flex flex-col justify-between space-y-3"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#084d2a] flex items-center justify-center">
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
