import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="w-full bg-[#f2f9f5]/90 backdrop-blur-md sticky top-0 z-50 border-b border-emerald-950/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[15px] font-medium text-slate-600 hover:text-[#084d2a] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/login"
            className="text-[15px] font-medium text-slate-800 hover:text-[#084d2a] transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-[#084d2a] hover:bg-[#063d21] active:scale-[0.98] text-white text-[15px] font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-all inline-flex items-center justify-center"
          >
            Create Farmer Account
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-emerald-950 hover:bg-emerald-100/60 transition-colors focus:outline-none focus:ring-2 focus:ring-[#084d2a]"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f2f9f5] border-b border-emerald-900/10 px-6 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-700 hover:text-[#084d2a] py-2 transition-colors border-b border-emerald-900/5"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-[15px] font-semibold text-[#084d2a] border border-[#084d2a]/30 bg-white/70 rounded-xl hover:bg-white transition-all shadow-sm"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-[15px] font-semibold text-white bg-[#084d2a] hover:bg-[#063d21] rounded-xl shadow-sm transition-all"
            >
              Create Farmer Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
