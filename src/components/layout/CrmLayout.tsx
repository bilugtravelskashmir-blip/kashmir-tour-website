import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CalendarCheck,
  Package,
  FileText,
  Building2,
  Car,
  BarChart3,
  Settings,
  Menu,
  X,
  Globe,
  PlusCircle,
  PhoneCall
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface CrmLayoutProps {
  currentPath: string;
  navigate: (path: string) => void;
  children: React.ReactNode;
}

export const CrmLayout: React.FC<CrmLayoutProps> = ({ currentPath, navigate, children }) => {
  const { settings } = useData();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Leads', path: '/leads', icon: Users },
    { label: 'Customers', path: '/customers', icon: UserCheck },
    { label: 'Bookings', path: '/bookings', icon: CalendarCheck },
    { label: 'Packages', path: '/packages-manage', icon: Package },
    { label: 'Itinerary Builder', path: '/itinerary-builder', icon: FileText },
    { label: 'Hotels', path: '/hotels', icon: Building2 },
    { label: 'Transport', path: '/transport', icon: Car },
    { label: 'Reports', path: '/reports', icon: BarChart3 },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 max-w-full overflow-x-hidden">
      {/* Top CRM Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md max-w-full overflow-x-hidden">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Sidebar"
            >
              {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNav('/dashboard')}>
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white text-lg shadow-sm flex-shrink-0">
                B
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-white tracking-wide block leading-none font-serif text-base">
                  Bilu G Travels
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase block mt-0.5">
                  Internal Travel CRM
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleNav('/itinerary-builder')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden xs:inline">New Itinerary</span>
            </button>

            <button
              onClick={() => handleNav('/')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl flex items-center gap-1.5 border border-slate-700 transition-all"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">View Website</span>
            </button>

            <a
              href={`tel:${settings.phoneNumbers[0]}`}
              className="hidden md:flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/60 px-3 py-2 rounded-xl border border-slate-800"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>{settings.phoneNumbers[0]}</span>
            </a>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden max-w-full">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex-shrink-0">
          <div className="p-4 border-b border-slate-800/80">
            <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold px-3 mb-1">
              Main Operations
            </div>
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path || (item.path !== '/dashboard' && currentPath.startsWith(item.path));
              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="p-4 border-t border-slate-800 bg-slate-950/50">
            <div className="text-xs text-slate-400 font-medium">Director</div>
            <div className="text-sm font-semibold text-white">{settings.directorName}</div>
            <div className="text-[11px] text-emerald-400 truncate mt-0.5">{settings.email}</div>
          </div>
        </aside>

        {/* Mobile Drawer Sidebar */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900 text-slate-300">
              <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white">
                    B
                  </div>
                  <span className="font-serif font-bold text-white">Bilu G Travels</span>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.path || (item.path !== '/dashboard' && currentPath.startsWith(item.path));
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNav(item.path)}
                      className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl font-medium text-base transition-all ${
                        isActive
                          ? 'bg-emerald-600 text-white font-semibold'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-slate-300" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};
