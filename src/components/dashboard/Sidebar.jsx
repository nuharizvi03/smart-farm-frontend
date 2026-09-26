import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  Sprout, 
  Receipt, 
  Tractor, 
  TrendingUp, 
  BarChart3, 
  FileText, 
  Plus, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Sidebar = ({ onAddRecordClick }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { label: 'Dashboard', icon: LayoutGrid, path: '/dashboard', active: true },
    { label: 'Crop Plans', icon: Sprout, path: '/crops', active: false },
    { label: 'Expenses', icon: Receipt, path: '/expenses', active: false },
    { label: 'Harvests', icon: Tractor, path: '/harvests', active: false },
    { label: 'Sales', icon: TrendingUp, path: '/sales', active: false },
    { label: 'Profit Analysis', icon: BarChart3, path: '/profit-analysis', active: false },
    { label: 'Reports', icon: FileText, path: '/reports', active: false },
  ];

  return (
    <aside className="hidden lg:flex lg:flex-col justify-between w-64 xl:w-72 bg-white border-r border-slate-200/80 p-6 min-h-screen sticky top-0 h-screen overflow-y-auto">
      <div className="space-y-8">
        {/* Brand Logo Header */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#0c4e2b] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Tractor className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <div className="text-xl font-extrabold tracking-tight text-[#0c4e2b]">
              FarmWise
            </div>
            <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              ENTERPRISE PLAN
            </div>
          </div>
        </Link>

        {/* Navigation Menu List */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isCurrent = item.active || location.pathname === item.path;

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isCurrent
                    ? 'bg-[#9ae65c] text-emerald-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isCurrent ? 'text-emerald-950 stroke-[2.2]' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-5 pt-6 border-t border-slate-100">
        {/* + Add Record CTA Button */}
        <button
          type="button"
          onClick={onAddRecordClick}
          className="w-full bg-[#0c4e2b] hover:bg-[#083a20] active:scale-[0.98] text-white font-bold py-3.5 px-4 rounded-2xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 text-sm"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>Add Record</span>
        </button>

        {/* Support & Logout Links */}
        <div className="space-y-2 text-sm font-medium">
          <a
            href="#help"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <HelpCircle className="w-4.5 h-4.5 text-slate-400" />
            <span>Help Center</span>
          </a>

          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4.5 h-4.5 text-red-500" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
