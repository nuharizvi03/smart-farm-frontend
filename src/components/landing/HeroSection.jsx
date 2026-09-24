import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/images/farmwise_hero.jpg';

const HeroSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-14 lg:pt-20 pb-12 sm:pb-16 lg:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Headings & CTA */}
        <div className="lg:col-span-6 xl:col-span-6 space-y-6 sm:space-y-8 text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-bold text-[#094326] tracking-tight leading-[1.15]">
            Manage your farm records and understand your true profit
          </h1>

          {/* Subtitle with responsive copy matching both design specs */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
            <span className="hidden sm:inline">
              Plan your crops, record expenses seamlessly, and view actionable profit insights to run your farm like a modern business.
            </span>
            <span className="inline sm:hidden">
              FarmWise brings calm to the chaos of farming records. Track expenses, monitor yields, and see your real bottom line.
            </span>
          </p>

          {/* Action Buttons: Desktop Layout */}
          <div className="hidden sm:flex items-center gap-4 pt-2">
            <Link
              to="/register"
              className="inline-flex items-center justify-center bg-[#084d2a] hover:bg-[#063d21] active:scale-[0.98] text-white text-base font-semibold px-7 py-3.5 rounded-xl shadow-sm hover:shadow transition-all"
            >
              Create farmer account
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center border border-[#084d2a] text-[#084d2a] hover:bg-emerald-900/5 active:scale-[0.98] text-base font-semibold px-7 py-3.5 rounded-xl transition-all"
            >
              See how it works
            </a>
          </div>

          {/* Action Buttons: Mobile Layout */}
          <div className="flex sm:hidden flex-col gap-3 pt-2">
            <Link
              to="/register"
              className="w-full text-center py-3.5 text-base font-semibold text-white bg-[#084d2a] hover:bg-[#063d21] rounded-xl shadow-sm transition-all"
            >
              Create Farmer Account
            </Link>
            <Link
              to="/login"
              className="w-full text-center py-3.5 text-base font-semibold text-[#084d2a] border border-[#084d2a]/40 bg-[#eaf5ee] hover:bg-white rounded-xl transition-all shadow-sm"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Right Column: Hero Graphic / App Showcase (Desktop) */}
        <div className="hidden lg:block lg:col-span-6 xl:col-span-6">
          <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-emerald-950/10 bg-white group transition-transform duration-500 hover:scale-[1.01]">
            <img
              src={heroImage}
              alt="FarmWise web and mobile farm management dashboard shown outdoors in a lush crop field"
              className="w-full h-auto object-cover transform duration-500 group-hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[32px] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
