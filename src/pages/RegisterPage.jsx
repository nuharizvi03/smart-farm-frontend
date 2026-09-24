import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  Receipt, 
  BarChart3, 
  Check, 
  ChevronDown, 
  Globe, 
  Eye, 
  EyeOff, 
  MapPin, 
  Tractor, 
  ShieldCheck, 
  Headphones, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';
import useAuth from '../hooks/useAuth';

const SRI_LANKA_DISTRICTS = [
  { name: 'Ampara', province: 'Eastern' },
  { name: 'Anuradhapura', province: 'North Central' },
  { name: 'Badulla', province: 'Uva' },
  { name: 'Batticaloa', province: 'Eastern' },
  { name: 'Colombo', province: 'Western' },
  { name: 'Galle', province: 'Southern' },
  { name: 'Gampaha', province: 'Western' },
  { name: 'Hambantota', province: 'Southern' },
  { name: 'Jaffna', province: 'Northern' },
  { name: 'Kalutara', province: 'Western' },
  { name: 'Kandy', province: 'Central' },
  { name: 'Kegalle', province: 'Sabaragamuwa' },
  { name: 'Kilinochchi', province: 'Northern' },
  { name: 'Kurunegala', province: 'North Western' },
  { name: 'Mannar', province: 'Northern' },
  { name: 'Matale', province: 'Central' },
  { name: 'Matara', province: 'Southern' },
  { name: 'Monaragala', province: 'Uva' },
  { name: 'Mullaitivu', province: 'Northern' },
  { name: 'Nuwara Eliya', province: 'Central' },
  { name: 'Polonnaruwa', province: 'North Central' },
  { name: 'Puttalam', province: 'North Western' },
  { name: 'Ratnapura', province: 'Sabaragamuwa' },
  { name: 'Trincomalee', province: 'Eastern' },
  { name: 'Vavuniya', province: 'Northern' }
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    district: '',
    farmName: '',
    agreeTerms: false,
  });

  // Real-time password criteria validation
  const hasMinLength = formData.password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(formData.password);
  const hasNumber = /[0-9]/.test(formData.password);
  const isPasswordValid = hasMinLength && hasLetter && hasNumber;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error) setError(null);
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!formData.mobileNumber.trim()) {
      setError('Please enter your mobile number.');
      return;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!isPasswordValid) {
      setError('Password must be at least 8 characters and contain both letters and numbers.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.district) {
      setError('Please select your farm district.');
      return;
    }
    if (!formData.agreeTerms) {
      setError('You must agree to the Terms of Use and Privacy Policy to continue.');
      return;
    }

    const selectedDistrictObj = SRI_LANKA_DISTRICTS.find(
      (d) => d.name.toLowerCase() === formData.district.toLowerCase()
    );
    const province = selectedDistrictObj ? selectedDistrictObj.province : '';

    // Standardize mobile number format with +94
    let formattedMobile = formData.mobileNumber.trim();
    if (!formattedMobile.startsWith('+')) {
      formattedMobile = `+94 ${formattedMobile.replace(/^0+/, '')}`;
    }

    setLoading(true);

    try {
      const response = await register({
        full_name: formData.fullName.trim(),
        mobile: formattedMobile,
        email: formData.email.trim(),
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        district: formData.district,
        province: province,
        farm_name: formData.farmName.trim() || undefined,
      });

      if (response && response.success) {
        setSuccessMessage('Account registered successfully! Redirecting to your dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1200);
      } else {
        setError(response?.message || 'Registration failed. Please try again.');
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
          setError('Registration failed. Please check the entered data.');
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
      {/* LEFT SIDE: Brand Showcase & Value Proposition (Desktop >= lg)             */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] flex-col justify-between p-10 xl:p-14 bg-[#e8f5ec]/70 border-r border-emerald-900/5 min-h-screen text-left">
        {/* Brand Logo */}
        <div>
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#1b5e37] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Sprout className="w-5 h-5 text-emerald-100" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#093e23]">
              FarmWise
            </span>
          </Link>
        </div>

        {/* Step-Dependent Value Content */}
        <div className="my-auto py-8 space-y-8 max-w-md">
          {step === 1 ? (
            <>
              <div className="space-y-4">
                <h1 className="text-4xl xl:text-[44px] font-bold text-slate-900 tracking-tight leading-[1.18]">
                  Start managing your farm more clearly
                </h1>
                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  Keep precise records of your expenses, monitor crop lifecycles, and gain actionable financial insights&mdash;all in one quiet, dependable workspace.
                </p>
              </div>

              {/* 3 Feature Highlights */}
              <div className="space-y-5 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-emerald-100/90 text-[#1b5e37] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sprout className="w-4.5 h-4.5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-slate-900">
                      Crop Monitoring
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Track growth stages and harvest yields with ease.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-emerald-100/90 text-[#1b5e37] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Receipt className="w-4.5 h-4.5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-slate-900">
                      Expense Tracking
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Log inputs, labor, and machinery costs accurately.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-emerald-100/90 text-[#1b5e37] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BarChart3 className="w-4.5 h-4.5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-slate-900">
                      Financial Clarity
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Understand your true profitability per acre.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <h1 className="text-4xl xl:text-[44px] font-bold text-slate-900 tracking-tight leading-[1.18]">
                  Map your success.
                </h1>
                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  Accurate farm details unlock precise weather forecasting and tailored operational insights specifically for your district.
                </p>
              </div>
            </>
          )}

          {/* Need help setting up card */}
          <div className="bg-[#dce9df]/75 border border-emerald-950/10 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#bcd9c4] text-[#1b5e37] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Headphones className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Need help setting up?
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Our agronomy support team is available to assist you with onboarding.
                </p>
              </div>
              <a
                href="#support"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b5e37] hover:text-[#13492a] transition-colors"
              >
                <span>Contact Support</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Left Bottom Security Badge */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Secure Farm Intelligence Platform</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT SIDE: Multi-Step Registration Form (Desktop & Mobile)               */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col justify-between p-5 sm:p-8 lg:p-12 xl:p-14 min-h-screen bg-[#f2f8f4] lg:bg-white">
        {/* Top Bar on Mobile & Language Selector */}
        <div className="flex items-center justify-between w-full max-w-[580px] mx-auto">
          {/* Mobile-only Logo */}
          <div className="flex lg:hidden items-center gap-2.5">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#1b5e37] flex items-center justify-center text-white shadow-sm">
                <Sprout className="w-4.5 h-4.5 text-emerald-100" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#093e23]">
                FarmWise
              </span>
            </Link>
          </div>

          <div className="hidden lg:block" />

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              className="inline-flex items-center gap-1.5 bg-white lg:bg-slate-50 hover:bg-slate-100 border border-slate-200/80 px-3 py-1.5 rounded-full text-xs font-medium text-slate-700 shadow-sm transition-all focus:outline-none"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{selectedLanguage}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {languageMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-30 animate-in fade-in slide-in-from-top-1">
                {['EN', 'SI', 'TA'].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setLanguageMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs transition-colors ${
                      selectedLanguage === lang
                        ? 'bg-emerald-50 text-[#1b5e37] font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {lang === 'EN' ? 'English' : lang === 'SI' ? 'Sinhala' : 'Tamil'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center Registration Container */}
        <div className="w-full max-w-[540px] mx-auto my-auto py-6 sm:py-8">
          {/* ===================================================================== */}
          {/* STEP INDICATOR (DESKTOP)                                              */}
          {/* ===================================================================== */}
          <div className="hidden lg:flex items-center justify-between mb-8 pb-2">
            {/* Step 1 Pill */}
            <div className="flex items-center gap-2">
              {step === 1 ? (
                <div className="w-5 h-5 rounded-full border-2 border-[#1b5e37] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#1b5e37]" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-[#1b5e37] text-white flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
              <span className={`text-sm font-semibold ${step === 1 ? 'text-[#1b5e37]' : 'text-slate-700'}`}>
                Account details
              </span>
            </div>

            {/* Connecting Line */}
            <div className="flex-1 mx-4 h-[2px] bg-slate-200">
              <div 
                className={`h-full bg-[#1b5e37] transition-all duration-300 ${
                  step === 2 ? 'w-full' : 'w-0'
                }`} 
              />
            </div>

            {/* Step 2 Pill */}
            <div className="flex items-center gap-2">
              {step === 2 ? (
                <div className="w-5 h-5 rounded-full border-2 border-[#1b5e37] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#1b5e37]" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
              )}
              <span className={`text-sm font-semibold ${step === 2 ? 'text-[#1b5e37]' : 'text-slate-400'}`}>
                Farm details
              </span>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* STEP INDICATOR (MOBILE PROGRESS BAR)                                  */}
          {/* ===================================================================== */}
          <div className="block lg:hidden text-left mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {step === 1 ? 'Create your farmer account' : 'Tell us about your farm'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
              {step === 1 ? 'It takes only a few minutes.' : 'You can add more farm details later.'}
            </p>

            <div className="mt-4 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-[#1b5e37]">
                <span>Step {step} of 2</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-[#1b5e37] transition-all duration-300 rounded-full ${
                    step === 1 ? 'w-1/2' : 'w-full'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* DESKTOP FORM HEADER                                                   */}
          {/* ===================================================================== */}
          <div className="hidden lg:block text-left mb-6">
            <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
              Create your farmer account
            </h1>
            <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
              {step === 1 ? 'It takes only a few minutes.' : 'Add your basic farm details to get started.'}
            </p>
          </div>

          {/* Error Message Box */}
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-red-700 text-sm text-left animate-in fade-in">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {/* Success Message Box */}
          {successMessage && (
            <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-emerald-800 text-sm text-left animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
              <span className="leading-snug">{successMessage}</span>
            </div>
          )}

          {/* ===================================================================== */}
          {/* STEP 1: ACCOUNT DETAILS FORM                                          */}
          {/* ===================================================================== */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4 sm:space-y-5 text-left">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-0 shadow-sm sm:shadow-md lg:shadow-none border border-slate-100 sm:border-slate-200/60 lg:border-none space-y-4 sm:space-y-5">
                {/* Full Name */}
                <div>
                  <label 
                    htmlFor="fullName"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm sm:text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1b5e37] focus:border-transparent transition-all bg-white hover:border-slate-300"
                  />
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
                    Use the name you want displayed.
                  </p>
                </div>

                {/* Mobile Number */}
                <div>
                  <label 
                    htmlFor="mobileNumber"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    Mobile Number
                  </label>
                  <div className="flex rounded-xl border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-[#1b5e37] focus-within:border-transparent transition-all hover:border-slate-300 bg-white">
                    <div className="bg-slate-50 px-3.5 py-3 text-slate-700 font-semibold text-sm border-r border-slate-200 flex items-center select-none">
                      +94
                    </div>
                    <input
                      id="mobileNumber"
                      name="mobileNumber"
                      type="tel"
                      required
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="7X XXX XXXX"
                      className="w-full px-3.5 py-3 text-slate-900 placeholder:text-slate-400 text-sm sm:text-[15px] focus:outline-none bg-white"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label 
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm sm:text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1b5e37] focus:border-transparent transition-all bg-white hover:border-slate-300"
                  />
                </div>

                {/* Create Password */}
                <div>
                  <label 
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    Create Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-4 pr-11 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm sm:text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1b5e37] focus:border-transparent transition-all bg-white hover:border-slate-300"
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

                  {/* Password Strength Requirements Checklist */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-xs">
                    <div className={`flex items-center gap-1.5 transition-colors ${hasMinLength ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                      {hasMinLength ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                      )}
                      <span>8 characters</span>
                    </div>

                    <div className={`flex items-center gap-1.5 transition-colors ${hasLetter ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                      {hasLetter ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                      )}
                      <span>Contains a letter</span>
                    </div>

                    <div className={`flex items-center gap-1.5 transition-colors ${hasNumber ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                      {hasNumber ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                      )}
                      <span>Contains a number</span>
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label 
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-4 pr-11 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm sm:text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1b5e37] focus:border-transparent transition-all bg-white hover:border-slate-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Step 1 Button */}
                <button
                  type="submit"
                  className="w-full mt-2 bg-[#1b5e37] hover:bg-[#144d2c] active:scale-[0.99] text-white font-semibold py-3.5 rounded-xl shadow-sm hover:shadow transition-all text-base text-center"
                >
                  Continue
                </button>
              </div>

              {/* Already have an account link */}
              <div className="text-center pt-2 text-sm text-slate-600">
                <span>Already have an account? </span>
                <Link 
                  to="/login"
                  className="font-bold text-[#1b5e37] hover:text-[#144d2c] hover:underline transition-colors"
                >
                  Sign in
                </Link>
              </div>
            </form>
          )}

          {/* ===================================================================== */}
          {/* STEP 2: FARM DETAILS FORM                                             */}
          {/* ===================================================================== */}
          {step === 2 && (
            <form onSubmit={handleFinalSubmit} className="space-y-5 text-left">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm sm:shadow-md border border-slate-100 sm:border-slate-200/60 space-y-5">
                {/* District Select */}
                <div>
                  <label 
                    htmlFor="district"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    District
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="w-5 h-5 text-slate-400" />
                    </div>
                    <select
                      id="district"
                      name="district"
                      required
                      value={formData.district}
                      onChange={handleChange}
                      className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm sm:text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1b5e37] focus:border-transparent transition-all bg-white hover:border-slate-300 appearance-none cursor-pointer"
                    >
                      <option value="">Select your district</option>
                      {SRI_LANKA_DISTRICTS.map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name} ({d.province} Province)
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1.5 flex items-center gap-1">
                    <span className="inline-block w-3.5 h-3.5 rounded-full bg-slate-200 text-slate-700 text-[9px] font-bold text-center leading-[14px]">i</span>
                    <span>This helps the system display local weather information.</span>
                  </p>
                </div>

                {/* Farm Name */}
                <div>
                  <label 
                    htmlFor="farmName"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    Farm Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Tractor className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      id="farmName"
                      name="farmName"
                      type="text"
                      value={formData.farmName}
                      onChange={handleChange}
                      placeholder="Example: Green Field Farm"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm sm:text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1b5e37] focus:border-transparent transition-all bg-white hover:border-slate-300"
                    />
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
                    You can change this later.
                  </p>
                </div>

                {/* Terms and Privacy Checkbox */}
                <div className="p-3.5 sm:p-4 bg-emerald-50/70 border border-emerald-900/10 rounded-xl">
                  <div className="flex items-start">
                    <input
                      id="agreeTerms"
                      name="agreeTerms"
                      type="checkbox"
                      required
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#1b5e37] focus:ring-[#1b5e37] cursor-pointer"
                    />
                    <label 
                      htmlFor="agreeTerms"
                      className="ml-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed cursor-pointer select-none"
                    >
                      I agree to the{' '}
                      <a href="#terms" className="font-semibold text-[#1b5e37] hover:underline">
                        Terms of Use
                      </a>{' '}
                      and acknowledge the{' '}
                      <a href="#privacy" className="font-semibold text-[#1b5e37] hover:underline">
                        Privacy Policy
                      </a>.
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Desktop & Mobile Responsive */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl sm:rounded-full border border-[#1b5e37] text-[#1b5e37] hover:bg-emerald-50/60 active:scale-[0.99] font-semibold text-sm sm:text-base transition-all text-center bg-white"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 sm:py-3 rounded-xl sm:rounded-full bg-[#1b5e37] hover:bg-[#144d2c] active:scale-[0.99] text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create farmer account</span>
                      <CheckCircle2 className="w-4 h-4 hidden sm:inline" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Bottom Page Footer */}
        <div className="w-full text-center py-4 text-xs text-slate-500 font-normal">
          &copy; 2025 FarmWise &middot; Smart Farm Management &amp; Profit Analysis
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
