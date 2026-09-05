import React, { useState } from 'react';
import { Phone, Mail, Menu, X, LayoutDashboard, Compass, Send } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const { settings } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Packages', path: '/packages' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 max-w-full overflow-x-hidden">
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline-block text-emerald-400 font-semibold">
              Kashmir DMC Direct Local Office
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="text-slate-300 flex items-center gap-1">
              <Phone className="w-3 h-3 text-emerald-400" /> +91 {settings.phoneNumbers[0]} / {settings.phoneNumbers[1]}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href={`mailto:${settings.email}`} className="hover:text-emerald-400 hidden lg:flex items-center gap-1">
              <Mail className="w-3 h-3 text-emerald-400" /> {settings.email}
            </a>
            <button
              onClick={() => handleNav('/dashboard')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-2.5 py-1 rounded flex items-center gap-1 transition-all"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>CRM Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNav('/')}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-500 flex items-center justify-center text-white font-bold text-2xl shadow-md shadow-emerald-600/30 flex-shrink-0">
              B
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-serif block leading-none">
                Bilu G Travels
              </span>
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest block mt-1">
                Kashmir DMC
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`text-sm font-semibold transition-colors duration-200 py-1 border-b-2 ${
                    isActive
                      ? 'text-emerald-600 border-emerald-600'
                      : 'text-slate-700 border-transparent hover:text-emerald-600'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            <button
              onClick={() => handleNav('/packages')}
              className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Explore Kashmir</span>
            </button>

            <button
              onClick={() => handleNav('/contact')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Plan My Trip</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNav(link.path)}
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium ${
                currentPath === link.path ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
            <button
              onClick={() => handleNav('/contact')}
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 shadow-md shadow-emerald-600/20"
            >
              <Send className="w-4 h-4" />
              <span>Plan My Kashmir Trip</span>
            </button>
            <button
              onClick={() => handleNav('/dashboard')}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
              <span>Enter Internal CRM Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
