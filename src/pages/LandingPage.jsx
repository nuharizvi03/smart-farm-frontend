import React from 'react';
import Navbar from '../components/common/Navbar';
import HeroSection from '../components/landing/HeroSection';
import FeatureHighlights from '../components/landing/FeatureHighlights';
import ProblemSolutionSection from '../components/landing/ProblemSolutionSection';
import Footer from '../components/common/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#f2f9f5] flex flex-col justify-between text-slate-800 selection:bg-emerald-200 selection:text-emerald-950">
      <div>
        {/* Navigation Bar */}
        <Navbar />

        {/* Hero Section */}
        <main>
          <HeroSection />

          {/* Feature Highlights (Desktop Ribbon & Mobile Swipe Cards) */}
          <FeatureHighlights />

          {/* Problem vs Solution Comparison */}
          <ProblemSolutionSection />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
