import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-16 sm:mt-24">
      <div className="bg-[#dce9df] rounded-t-[28px] sm:rounded-t-[36px] lg:rounded-t-[44px] max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 pb-12 sm:pb-16 text-slate-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-slate-600 leading-relaxed max-w-xs font-normal">
              &copy; {currentYear} FarmWise Intelligence. All rights reserved.
            </p>
          </div>

          {/* Product Column */}
          <div className="space-y-3.5">
            <h3 className="text-[15px] font-semibold text-slate-900 tracking-tight">Product</h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <a href="#features" className="hover:text-[#084d2a] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#profit-analysis" className="hover:text-[#084d2a] transition-colors">
                  Profit Analysis
                </a>
              </li>
              <li>
                <a href="#weather-sync" className="hover:text-[#084d2a] transition-colors">
                  Weather Sync
                </a>
              </li>
            </ul>
          </div>

          {/* Farmer Account Column */}
          <div className="space-y-3.5">
            <h3 className="text-[15px] font-semibold text-slate-900 tracking-tight">Farmer Account</h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link to="/login" className="hover:text-[#084d2a] transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-[#084d2a] transition-colors">
                  Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-3.5">
            <h3 className="text-[15px] font-semibold text-slate-900 tracking-tight">Support</h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <a href="#help" className="hover:text-[#084d2a] transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#084d2a] transition-colors">
                  Contact Us
                </a>
              </li>
              <li className="block sm:hidden">
                <a href="#privacy" className="hover:text-[#084d2a] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li className="block sm:hidden">
                <a href="#terms" className="hover:text-[#084d2a] transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
