import React from 'react';
import { X, Receipt, Tractor, CalendarPlus, ShoppingCart } from 'lucide-react';

const QuickActionModal = ({ isOpen, onClose, defaultAction = 'expense' }) => {
  if (!isOpen) return null;

  const actions = [
    {
      id: 'expense',
      title: 'Add Farm Expense',
      desc: 'Record costs for fertilizers, labor, seeds, or equipment.',
      icon: Receipt,
      color: 'bg-rose-50 text-rose-600',
    },
    {
      id: 'harvest',
      title: 'Record Harvest Yield',
      desc: 'Log harvested crop quantity, quality grade, and storage lot.',
      icon: Tractor,
      color: 'bg-emerald-50 text-emerald-700',
    },
    {
      id: 'crop_plan',
      title: 'Create New Crop Plan',
      desc: 'Schedule planting date, estimated harvest, and target acreage.',
      icon: CalendarPlus,
      color: 'bg-emerald-600/10 text-emerald-800',
    },
    {
      id: 'sale',
      title: 'Record Crop Sale',
      desc: 'Document buyer details, unit price, and received revenue.',
      icon: ShoppingCart,
      color: 'bg-slate-100 text-slate-800',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-left space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Quick Farm Actions
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select an action to record operational or financial data
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {actions.map((act) => {
            const Icon = act.icon;
            const isSelected = act.id === defaultAction;
            return (
              <button
                key={act.id}
                type="button"
                onClick={() => {
                  // Action placeholder handler
                  onClose();
                }}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 hover:shadow-md ${
                  isSelected
                    ? 'border-[#0c4e2b] bg-[#f0f8f3] ring-2 ring-[#0c4e2b]/10'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${act.color}`}>
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {act.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">
                    {act.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionModal;
