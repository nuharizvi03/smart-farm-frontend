import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Receipt, 
  Sprout, 
  BarChart3, 
  TrendingUp, 
  CloudRain, 
  Globe, 
  ChevronDown,
  AlertCircle,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import useAuth from '../hooks/useAuth';
import loginBg from '../assets/images/login_bg.jpg';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      if (response && response.success) {
        setSuccessMessage('Login successful! Redirecting...');
        const userRole = response.user?.role;
        setTimeout(() => {
          if (userRole === 'admin') {
            navigate('/admin/dashboard');
          } else if (userRole === 'extension_officer') {
            navigate('/extension-officer/dashboard');
          } else {
            navigate('/dashboard');
          }
        }, 800);
      } else {
        setError(response?.message || 'Invalid email or password.');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (data.errors) {
          const firstErrorKey = Object.keys(data.errors)[0];
          setError(data.errors[firstErrorKey][0]);
        } else if (data.message) {
          setError(data.message);
        } else {
          setError('Unable to sign in. Please check your credentials.');
        }
      } else {
        setError('Connection error. Please check your network connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f2f8f4] selection:bg-emerald-200 selection:text-emerald-950 font-sans">
      {/* ========================================================================= */}
      {/* LEFT SIDE: Brand Showcase & Agricultural Visual Banner (Desktop >= lg)   */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[52%] relative flex-col justify-between p-10 xl:p-14 overflow-hidden text-white min-h-screen">
        {/* Background photo + dark emerald overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 transform transition-transform duration-1000"
          style={{ backgroundImage: `url(${loginBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#063a1f]/95 via-[#0c4e2b]/92 to-[#145d36]/90 z-10 backdrop-blur-[1px]" />
        
        {/* Decorative soft sunlight glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl z-10 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-300/15 rounded-full blur-3xl z-10 pointer-events-none" />

        {/* Top Header: Brand Logo */}
        <div className="relative z-20 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#185e37] border border-emerald-400/30 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Sprout className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-white leading-tight">
                FarmWise
              </div>
              <div className="text-[11px] font-medium text-emerald-200/80 tracking-wide">
                Smart Farm Management
              </div>
            </div>
          </Link>
        </div>

        {/* Middle Content: Value Proposition & Feature Highlights */}
        <div className="relative z-20 my-auto py-10 max-w-xl space-y-8 text-left">
          <div className="space-y-4">
            <h1 className="text-4xl xl:text-[46px] font-bold text-white tracking-tight leading-[1.18]">
              Manage your farm with confidence
            </h1>
            <p className="text-base text-emerald-100/90 leading-relaxed font-normal max-w-lg">
              Track crops, expenses, harvests, sales, and profit from one simple and secure platform.
            </p>
          </div>

          {/* Feature List Bullets */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3.5 group">
              <div className="w-9 h-9 rounded-full bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center text-emerald-200 shadow-sm flex-shrink-0">
                <Receipt className="w-4.5 h-4.5" />
              </div>
              <span className="text-[15px] font-medium text-emerald-50">
                Track farming expenses and costs
              </span>
            </div>

            <div className="flex items-center gap-3.5 group">
              <div className="w-9 h-9 rounded-full bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center text-emerald-200 shadow-sm flex-shrink-0">
                <Sprout className="w-4.5 h-4.5" />
              </div>
              <span className="text-[15px] font-medium text-emerald-50">
                Monitor crops, growth, and harvests
              </span>
            </div>

            <div className="flex items-center gap-3.5 group">
              <div className="w-9 h-9 rounded-full bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center text-emerald-200 shadow-sm flex-shrink-0">
                <BarChart3 className="w-4.5 h-4.5" />
              </div>
              <span className="text-[15px] font-medium text-emerald-50">
                Understand profit, loss, and trends
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Floating Stats Preview Cards */}
        <div className="relative z-20 pt-4">
          <div className="grid grid-cols-3 gap-3.5">
            {/* Card 1: Monthly Profit */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 text-slate-800 shadow-lg border border-white/20 text-left">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Monthly Profit</span>
              </div>
              <div className="text-[17px] font-bold text-slate-900 mt-1.5">
                LKR 84,500
              </div>
              <div className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-0.5">
                <span>&uarr; 12.4%</span>
              </div>
            </div>

            {/* Card 2: Active Crops */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 text-slate-800 shadow-lg border border-white/20 text-left">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                <span>Active Crops</span>
              </div>
              <div className="text-[17px] font-bold text-slate-900 mt-1.5">
                04
              </div>
              <div className="text-xs font-semibold text-emerald-600 mt-1">
                In season
              </div>
            </div>

            {/* Card 3: Weather */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 text-slate-800 shadow-lg border border-white/20 text-left">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <CloudRain className="w-3.5 h-3.5 text-slate-500" />
                <span>Weather</span>
              </div>
              <div className="text-[17px] font-bold text-slate-900 mt-1.5">
                27&deg;C
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">
                Light rain
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT SIDE: Authentication Container (Desktop & Mobile Unified)           */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col justify-between p-5 sm:p-8 lg:p-12 xl:p-16 min-h-screen bg-[#f2f8f4] lg:bg-[#f7faf8]">
        {/* Top Bar with Mobile Brand and Language Dropdown */}
        <div className="flex items-center justify-between w-full max-w-[500px] mx-auto lg:max-w-none">
          {/* Mobile-only Logo */}
          <div className="flex lg:hidden items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#1b5e37] flex items-center justify-center text-white shadow-sm">
                <Sprout className="w-5 h-5 text-emerald-100" />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold text-slate-900 leading-none">
                  FarmWise
                </div>
                <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                  Smart Farm Management
                </div>
              </div>
            </Link>
          </div>

          <div className="hidden lg:block">
            {/* Spacer for desktop layout */}
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium text-slate-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1b5e37]/20"
            >
              <Globe className="w-4 h-4 text-slate-500" />
              <span>{selectedLanguage}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {languageMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-30 animate-in fade-in slide-in-from-top-1">
                {['English', 'Sinhala', 'Tamil'].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setLanguageMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm transition-colors ${
                      selectedLanguage === lang
                        ? 'bg-emerald-50 text-[#1b5e37] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center Container: Main Login Box */}
        <div className="w-full max-w-[440px] sm:max-w-[460px] mx-auto my-auto py-8 sm:py-10">
          {/* Mobile Page Heading */}
          <div className="block lg:hidden text-left mb-6">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed font-normal">
              Sign in to manage your crops, expenses, harvests, and farm profit.
            </p>
          </div>

          {/* Login Card Form Container */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm sm:shadow-md border border-slate-100 sm:border-slate-200/60 p-6 sm:p-9 text-left">
            {/* Desktop Inside Card Title */}
            <div className="hidden lg:block mb-6">
              <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed font-normal">
                Sign in to manage your crops, expenses, harvests, and farm profit.
              </p>
            </div>

            {/* Error Message Box */}
            {error && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-200/80 rounded-xl flex items-start gap-2.5 text-red-700 text-sm animate-in fade-in">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
                <span className="leading-snug">{error}</span>
              </div>
            )}

            {/* Success Message Box */}
            {successMessage && (
              <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-emerald-800 text-sm animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                <span className="leading-snug">{successMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Email Field */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-semibold text-slate-800 mb-1.5"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm sm:text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1b5e37] focus:border-transparent transition-all bg-white hover:border-slate-300"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-semibold text-slate-800 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm sm:text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1b5e37] focus:border-transparent transition-all bg-white hover:border-slate-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Keep me signed in & Forgot Password */}
              <div className="pt-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                      checked={formData.remember}
                      onChange={handleChange}
                      className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#1b5e37] focus:ring-[#1b5e37] cursor-pointer"
                    />
                    <label 
                      htmlFor="remember" 
                      className="ml-2 text-xs sm:text-sm text-slate-700 select-none cursor-pointer font-normal"
                    >
                      Keep me signed in
                    </label>
                  </div>

                  <Link
                    to="/forgot-password"
                    className="hidden sm:inline-block text-xs sm:text-sm font-semibold text-[#1b5e37] hover:text-[#13492a] hover:underline transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Mobile Personal Device Disclaimer */}
                <p className="block sm:hidden text-[11px] text-slate-500 mt-1 ml-6 leading-tight">
                  Use this only on your personal device.
                </p>

                {/* Mobile-only Forgot password link */}
                <div className="block sm:hidden mt-3">
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-[#1b5e37] hover:text-[#13492a] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-[#1b5e37] hover:bg-[#144d2c] active:scale-[0.99] text-white font-semibold py-3.5 rounded-xl shadow-sm hover:shadow transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign in</span>
                )}
              </button>
            </form>

            {/* Desktop Form Bottom Link */}
            <div className="hidden sm:block text-center mt-6 pt-2 text-xs sm:text-sm text-slate-600">
              <span>New to FarmWise? </span>
              <Link 
                to="/register" 
                className="font-bold text-[#1b5e37] hover:text-[#144d2c] hover:underline transition-colors"
              >
                Create a farmer account
              </Link>
            </div>
          </div>

          {/* Links Below Card */}
          <div className="mt-6 text-center space-y-3 sm:space-y-4">
            {/* Mobile Registration Link */}
            <div className="block sm:hidden space-y-1">
              <p className="text-xs text-slate-500">New to FarmWise?</p>
              <Link 
                to="/register" 
                className="block text-sm font-bold text-[#1b5e37] hover:underline"
              >
                Create a farmer account
              </Link>
            </div>

            {/* Staff / Extension Officer Link */}
            <div className="text-xs sm:text-sm text-slate-600 space-y-1">
              <p className="inline sm:inline">Extension Officer or Administrator? </p>
              <Link 
                to="/login"
                onClick={(e) => {
                  e.preventDefault();
                  // Staff login uses the same secure credentials form with role-based routing
                  setError(null);
                  setSuccessMessage('Staff members can sign in with their assigned officer or admin credentials above.');
                }}
                className="block sm:inline font-bold text-[#1b5e37] hover:text-[#144d2c] hover:underline transition-colors"
              >
                Use staff login
              </Link>
            </div>

            {/* Mobile Contact Support Link */}
            <div className="block sm:hidden pt-2">
              <a 
                href="#support" 
                className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
              >
                Need help? Contact support
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Page Footer */}
        <div className="w-full text-center py-4 text-xs text-slate-500 font-normal">
          <span className="hidden sm:inline">
            &copy; 2025 FarmWise &middot; Smart Farm Management &amp; Profit Analysis
          </span>
          <span className="inline sm:hidden">
            &copy; 2025 FarmWise
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
