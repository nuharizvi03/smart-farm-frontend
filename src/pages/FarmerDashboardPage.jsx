import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import api from '../services/api';
import Sidebar from '../components/dashboard/Sidebar';
import TopHeader from '../components/dashboard/TopHeader';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import WeatherWidget from '../components/dashboard/WeatherWidget';
import QuickActions from '../components/dashboard/QuickActions';
import KpiCards from '../components/dashboard/KpiCards';
import ProfitTrendChart from '../components/dashboard/ProfitTrendChart';
import ExpenseDistribution from '../components/dashboard/ExpenseDistribution';
import ActiveCropPlans from '../components/dashboard/ActiveCropPlans';
import UpcomingTasks from '../components/dashboard/UpcomingTasks';
import RecentActivity from '../components/dashboard/RecentActivity';
import MobileBottomNav from '../components/dashboard/MobileBottomNav';
import QuickActionModal from '../components/dashboard/QuickActionModal';
import { Loader2 } from 'lucide-react';

const FarmerDashboardPage = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [profitTrend, setProfitTrend] = useState([]);
  const [expenseDistribution, setExpenseDistribution] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [farmData, setFarmData] = useState(null);

  const [quickActionModalOpen, setQuickActionModalOpen] = useState(false);
  const [selectedQuickAction, setSelectedQuickAction] = useState('expense');

  // Fetch real data from backend API endpoints
  useEffect(() => {
    let isMounted = true;

    const fetchDashboardDetails = async () => {
      setLoading(true);
      try {
        // 1. Fetch dashboard KPI summary
        const [dashRes, trendRes, expenseRes, farmRes] = await Promise.allSettled([
          api.get('/dashboard'),
          api.get('/dashboard/profit-trend'),
          api.get('/dashboard/expense-distribution'),
          api.get('/farms'),
        ]);

        if (isMounted) {
          if (dashRes.status === 'fulfilled' && dashRes.value.data?.data) {
            setDashboardData(dashRes.value.data.data);
          }

          if (trendRes.status === 'fulfilled' && trendRes.value.data?.data?.trend) {
            setProfitTrend(trendRes.value.data.data.trend);
          }

          if (expenseRes.status === 'fulfilled' && expenseRes.value.data?.data?.distribution) {
            setExpenseDistribution(expenseRes.value.data.data.distribution);
          }

          if (farmRes.status === 'fulfilled' && farmRes.value.data?.data?.length > 0) {
            const currentFarm = farmRes.value.data.data[0];
            setFarmData(currentFarm);

            // Fetch weather for the farm district
            if (currentFarm?.district) {
              try {
                const weatherRes = await api.get(`/weather?district=${encodeURIComponent(currentFarm.district)}`);
                if (weatherRes.data?.data) {
                  setWeatherData(weatherRes.data.data);
                }
              } catch {
                // Keep default weather if offline
              }
            }
          }
        }
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDashboardDetails();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleQuickAction = (actionId) => {
    setSelectedQuickAction(actionId);
    setQuickActionModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f9f6] flex text-slate-800 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Desktop Left Sidebar (>= lg) */}
      <Sidebar onAddRecordClick={() => handleQuickAction('expense')} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-24 lg:pb-12">
        {/* Top Header */}
        <TopHeader
          user={user}
          farm={farmData}
          notificationCount={dashboardData?.kpis?.pending_notification_count || 2}
        />

        {/* Dashboard Main Content Container */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-5 space-y-6 max-w-7xl w-full mx-auto">
          {loading && (
            <div className="flex items-center justify-center py-4 text-emerald-800 text-xs font-semibold gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Syncing farm records...</span>
            </div>
          )}

          {/* =================================================================== */}
          {/* ROW 1: WELCOME BANNER & WEATHER WIDGET                              */}
          {/* =================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Desktop Welcome Banner */}
            <div className="hidden lg:block lg:col-span-8">
              <WelcomeBanner
                user={user}
                onViewMapClick={() => {}}
                onGenerateReportClick={() => {}}
              />
            </div>

            {/* Weather Widget (Desktop Right, Mobile Top) */}
            <div className="lg:col-span-4">
              <div className="hidden lg:block h-full">
                <WeatherWidget
                  weather={weatherData}
                  district={farmData?.district || user?.district || 'Anuradhapura'}
                  isMobile={false}
                />
              </div>
              <div className="block lg:hidden">
                <WeatherWidget
                  weather={weatherData}
                  district={farmData?.district || user?.district || 'Anuradhapura'}
                  isMobile={true}
                />
              </div>
            </div>
          </div>

          {/* =================================================================== */}
          {/* ROW 2: QUICK ACTION BUTTONS                                         */}
          {/* =================================================================== */}
          <section aria-label="Quick Actions">
            <QuickActions onActionClick={handleQuickAction} />
          </section>

          {/* =================================================================== */}
          {/* ROW 3: PRIMARY FINANCIAL & PLOT KPIS                                */}
          {/* =================================================================== */}
          <section aria-label="Key Performance Indicators">
            <KpiCards kpis={dashboardData?.kpis} />
          </section>

          {/* =================================================================== */}
          {/* ROW 4: PROFIT TREND & EXPENSE DISTRIBUTION CHARTS                   */}
          {/* =================================================================== */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-5" aria-label="Financial Trends">
            {/* Profit Trend & Revenue vs Expense */}
            <div className="lg:col-span-8">
              <ProfitTrendChart trendData={profitTrend} />
            </div>

            {/* Expense Distribution Category Breakdown */}
            <div className="lg:col-span-4">
              <ExpenseDistribution distributionData={expenseDistribution} />
            </div>
          </section>

          {/* =================================================================== */}
          {/* ROW 5: ACTIVE CROPS, TASKS, AND RECENT ACTIVITIES                   */}
          {/* =================================================================== */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-5" aria-label="Operational Details">
            {/* Active Crop Plans (Table on Desktop, Cards on Mobile) */}
            <div className="lg:col-span-8">
              <ActiveCropPlans />
            </div>

            {/* Right Column: Upcoming Tasks & Recent Activities */}
            <div className="lg:col-span-4 space-y-5">
              <UpcomingTasks />
              <RecentActivity />
            </div>
          </section>
        </main>
      </div>

      {/* Mobile Sticky Bottom Navigation & FAB (< lg) */}
      <MobileBottomNav onFabClick={() => handleQuickAction('expense')} />

      {/* Quick Action Interactive Modal */}
      <QuickActionModal
        isOpen={quickActionModalOpen}
        defaultAction={selectedQuickAction}
        onClose={() => setQuickActionModalOpen(false)}
      />
    </div>
  );
};

export default FarmerDashboardPage;
