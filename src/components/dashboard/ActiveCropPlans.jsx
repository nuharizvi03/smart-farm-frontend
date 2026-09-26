import React from 'react';
import { Link } from 'react-router-dom';
import cropTomatoImg from '../../assets/images/crop_tomato.jpg';
import cropPaddyImg from '../../assets/images/crop_paddy.jpg';

const ActiveCropPlans = ({ crops = [] }) => {
  const defaultCrops = [
    {
      id: 1,
      name: 'Tomato',
      plot: 'North-02',
      stage: 'Fruition',
      stageColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      planted: 'Feb 12, 2024',
      estHarvest: 'May 20, 2024',
      progress: 85,
      image: cropTomatoImg,
      iconBg: 'bg-rose-50 text-rose-600',
    },
    {
      id: 2,
      name: 'Paddy (Red)',
      plot: 'Main Field',
      stage: 'Growth',
      stageColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      planted: 'Mar 05, 2024',
      estHarvest: 'Jul 10, 2024',
      progress: 45,
      image: cropPaddyImg,
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      id: 3,
      name: 'Green Chili',
      plot: 'Greenhouse A',
      stage: 'Harvesting',
      stageColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      planted: 'Jan 20, 2024',
      estHarvest: 'May 05, 2024',
      progress: 90,
      image: cropTomatoImg,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
  ];

  const displayCrops = crops.length > 0 ? crops : defaultCrops;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-left space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          Active Crop Plans
        </h3>
        <Link
          to="/crops"
          className="text-xs sm:text-sm font-bold text-[#0c4e2b] hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Desktop Table View (>= md) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 font-semibold">CROP</th>
              <th className="pb-3 font-semibold">PLOT</th>
              <th className="pb-3 font-semibold">STAGE</th>
              <th className="pb-3 font-semibold">PLANTED</th>
              <th className="pb-3 font-semibold">EST. HARVEST</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80">
            {displayCrops.map((crop) => (
              <tr key={crop.id} className="hover:bg-slate-50/70 transition-colors">
                {/* Crop Name with Icon */}
                <td className="py-3.5 pr-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${crop.iconBg}`}>
                      {crop.name.charAt(0)}
                    </div>
                    <span className="font-bold text-slate-800">
                      {crop.name}
                    </span>
                  </div>
                </td>

                {/* Plot Name */}
                <td className="py-3.5 pr-3 text-slate-600 font-medium">
                  {crop.plot}
                </td>

                {/* Stage Pill */}
                <td className="py-3.5 pr-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#e8f6ed] text-[#0c4e2b]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0c4e2b]" />
                    <span>{crop.stage}</span>
                  </span>
                </td>

                {/* Planted Date */}
                <td className="py-3.5 pr-3 text-slate-500 font-medium">
                  {crop.planted}
                </td>

                {/* Est Harvest Date */}
                <td className="py-3.5 text-slate-700 font-semibold">
                  {crop.estHarvest}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Transformation (< md) */}
      <div className="block md:hidden space-y-3">
        {displayCrops.map((crop) => (
          <div
            key={crop.id}
            className="bg-[#f8faf9] rounded-2xl p-4 border border-slate-200/60 flex items-center gap-4 text-left shadow-sm"
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-sm bg-slate-100">
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {crop.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Plot {crop.plot}
                  </p>
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#e8f6ed] text-[#0c4e2b]">
                  {crop.stage}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>Progress</span>
                  <span className="font-bold text-slate-800">{crop.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0c4e2b] rounded-full"
                    style={{ width: `${crop.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveCropPlans;
