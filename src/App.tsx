import React, { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CrmLayout } from './components/layout/CrmLayout';

// Public pages
import { HomePage } from './pages/public/HomePage';
import { PackagesListPage } from './pages/public/PackagesListPage';
import { PackageDetailPage } from './pages/public/PackageDetailPage';
import { ContactPage } from './pages/public/ContactPage';

// CRM pages
import { DashboardPage } from './pages/crm/DashboardPage';
import { LeadsPage } from './pages/crm/LeadsPage';
import { CustomersPage } from './pages/crm/CustomersPage';
import { BookingsPage } from './pages/crm/BookingsPage';
import { PackagesManagePage } from './pages/crm/PackagesManagePage';
import { ItineraryBuilderPage } from './pages/crm/ItineraryBuilderPage';
import { HotelsPage } from './pages/crm/HotelsPage';
import { TransportPage } from './pages/crm/TransportPage';
import { ReportsPage } from './pages/crm/ReportsPage';
import { SettingsPage } from './pages/crm/SettingsPage';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');

  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname || '/');
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCrmRoute = [
    '/dashboard',
    '/leads',
    '/customers',
    '/bookings',
    '/packages-manage',
    '/itinerary-builder',
    '/hotels',
    '/transport',
    '/reports',
    '/settings'
  ].some(route => currentPath === route || currentPath.startsWith(route + '/'));

  const renderContent = () => {
    if (currentPath === '/') return <HomePage navigate={navigate} />;
    if (currentPath === '/packages') return <PackagesListPage navigate={navigate} />;
    if (currentPath.startsWith('/packages/')) {
      const packageId = currentPath.split('/packages/')[1];
      return <PackageDetailPage packageId={packageId} navigate={navigate} />;
    }
    if (currentPath === '/contact') return <ContactPage navigate={navigate} />;

    // CRM Routes
    if (currentPath === '/dashboard') return <DashboardPage navigate={navigate} />;
    if (currentPath === '/leads') return <LeadsPage navigate={navigate} />;
    if (currentPath.startsWith('/customers')) {
      const parts = currentPath.split('/customers/');
      const custId = parts.length > 1 ? parts[1] : undefined;
      return <CustomersPage customerId={custId} navigate={navigate} />;
    }
    if (currentPath.startsWith('/bookings')) return <BookingsPage navigate={navigate} />;
    if (currentPath === '/packages-manage') return <PackagesManagePage navigate={navigate} />;
    if (currentPath.startsWith('/itinerary-builder')) {
      const parts = currentPath.split('/itinerary-builder/');
      const itinId = parts.length > 1 ? parts[1] : undefined;
      return <ItineraryBuilderPage itineraryId={itinId} navigate={navigate} />;
    }
    if (currentPath === '/hotels') return <HotelsPage navigate={navigate} />;
    if (currentPath === '/transport') return <TransportPage navigate={navigate} />;
    if (currentPath === '/reports') return <ReportsPage navigate={navigate} />;
    if (currentPath === '/settings') return <SettingsPage navigate={navigate} />;

    // Default Fallback
    return <HomePage navigate={navigate} />;
  };

  return (
    <DataProvider>
      {isCrmRoute ? (
        <CrmLayout currentPath={currentPath} navigate={navigate}>
          {renderContent()}
        </CrmLayout>
      ) : (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
          <Navbar currentPath={currentPath} navigate={navigate} />
          <main className="flex-1">{renderContent()}</main>
          <Footer navigate={navigate} />
        </div>
      )}
    </DataProvider>
  );
}

export default App;
