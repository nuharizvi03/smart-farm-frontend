import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = '', iconOnly = false, isLight = false }) => {
  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 ${
        isLight ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-100/90 text-[#084d2a]'
      }`}>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4.5 h-4.5"
        >
          <path d="M17 3.5c-4.42 0-8 3.58-8 8 0 1.48.4 2.86 1.1 4.05L5 20.65l1.35 1.35 5.1-5.1C12.64 17.6 14.02 18 15.5 18c4.42 0 8-3.58 8-8 0-.83-.67-1.5-1.5-1.5H17V3.5zM15.5 16c-3.03 0-5.5-2.47-5.5-5.5 0-1.89.96-3.56 2.44-4.55.77 1.83 2.27 3.33 4.1 4.1-.99 1.48-2.66 2.44-4.54 2.45L12 10.5h3.5v5.5z" />
          <path d="M6.5 12C4.01 12 2 14.01 2 16.5c0 1.05.36 2.02.97 2.79L1.5 20.76 2.24 21.5l1.47-1.47c.77.61 1.74.97 2.79.97 2.49 0 4.5-2.01 4.5-4.5 0-.55-.45-1-1-1H6.5V12z" />
        </svg>
      </div>
      {!iconOnly && (
        <span
          className={`text-xl font-bold tracking-tight transition-colors ${
            isLight ? 'text-white' : 'text-[#093e23]'
          }`}
        >
          FarmWise
        </span>
      )}
    </Link>
  );
};

export default Logo;
