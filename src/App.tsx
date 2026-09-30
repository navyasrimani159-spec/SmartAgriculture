import React from 'react';
import { FarmProvider, useFarm } from './context/FarmContext';
import { Navbar } from './layouts/Navbar';
import { MobileNav } from './layouts/MobileNav';
import { Footer } from './layouts/Footer';
import { OfflineBanner } from './components/OfflineBanner';

// Pages
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { SmartIrrigationPage } from './pages/SmartIrrigationPage';
import { FarmMapPage } from './pages/FarmMapPage';
import { WeatherPage } from './pages/WeatherPage';
import { CropHealthPage } from './pages/CropHealthPage';
import { SoilIntelligencePage } from './pages/SoilIntelligencePage';
import { WaterManagementPage } from './pages/WaterManagementPage';
import { SolarEnergyPage } from './pages/SolarEnergyPage';
import { PostHarvestPage } from './pages/PostHarvestPage';
import { HarvestPlannerPage } from './pages/HarvestPlannerPage';
import { ExpenseTrackerPage } from './pages/ExpenseTrackerPage';
import { MarketInfoPage } from './pages/MarketInfoPage';
import { AlertsCenterPage } from './pages/AlertsCenterPage';
import { IoTDeviceCenterPage } from './pages/IoTDeviceCenterPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ReportsPage } from './pages/ReportsPage';
import { FeatureCustomizer } from './pages/FeatureCustomizer';
import { OfflinePage } from './pages/OfflinePage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { currentView } = useFarm();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'irrigation':
        return <SmartIrrigationPage />;
      case 'farm-map':
        return <FarmMapPage />;
      case 'weather':
        return <WeatherPage />;
      case 'crop-health':
        return <CropHealthPage />;
      case 'soil':
        return <SoilIntelligencePage />;
      case 'water':
        return <WaterManagementPage />;
      case 'solar':
        return <SolarEnergyPage />;
      case 'post-harvest':
        return <PostHarvestPage />;
      case 'calendar':
        return <HarvestPlannerPage />;
      case 'expenses':
        return <ExpenseTrackerPage />;
      case 'market':
        return <MarketInfoPage />;
      case 'alerts':
        return <AlertsCenterPage />;
      case 'iot-devices':
        return <IoTDeviceCenterPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'customizer':
        return <FeatureCustomizer />;
      case 'offline':
        return <OfflinePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white relative">
      <Navbar />
      <OfflineBanner />
      <main className="flex-1 w-full pb-16 lg:pb-0">
        {renderCurrentView()}
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <FarmProvider>
      <AppContent />
    </FarmProvider>
  );
};

export default App;
