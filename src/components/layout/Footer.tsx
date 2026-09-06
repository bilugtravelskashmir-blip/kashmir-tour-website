import React from 'react';
import { Phone, Mail, MapPin, Compass, ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { settings } = useData();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Company Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-900/50 flex-shrink-0">
              B
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-wide block leading-tight font-serif">
                BILU G TRAVELS
              </span>
              <span className="text-xs text-emerald-400 font-semibold tracking-widest uppercase block">
                KASHMIR DMC
              </span>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Your Premier Local Destination Management Company (DMC) in Srinagar, Kashmir. Specializing in customized luxury tours, family holidays, honeymoons, offbeat adventures, and B2B ground services.
          </p>
          <div className="pt-2 flex items-center space-x-2 text-xs text-emerald-400 font-medium">
            <Award className="w-4 h-4" />
            <span>Directed by {settings.directorName}</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-base font-semibold text-white tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button onClick={() => navigate('/')} className="hover:text-emerald-400 transition-colors">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/packages')} className="hover:text-emerald-400 transition-colors">
                Tour Packages
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/contact')} className="hover:text-emerald-400 transition-colors">
                Contact & Plan Trip
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/dashboard')} className="hover:text-emerald-400 transition-colors text-emerald-400 font-medium flex items-center gap-1">
                <span>Agent / DMC Portal</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded">CRM</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Top Destinations */}
        <div>
          <h3 className="text-base font-semibold text-white tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
            Popular Destinations
          </h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2"><Compass className="w-3.5 h-3.5 text-emerald-500" /> Srinagar Dal Lake & Houseboats</li>
            <li className="flex items-center gap-2"><Compass className="w-3.5 h-3.5 text-emerald-500" /> Gulmarg Ski Resort & Gondola</li>
            <li className="flex items-center gap-2"><Compass className="w-3.5 h-3.5 text-emerald-500" /> Pahalgam Lidder Valley</li>
            <li className="flex items-center gap-2"><Compass className="w-3.5 h-3.5 text-emerald-500" /> Sonmarg Thajiwas Glacier</li>
            <li className="flex items-center gap-2"><Compass className="w-3.5 h-3.5 text-emerald-500" /> Gurez Valley & Bangus Valley</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-base font-semibold text-white tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
            Contact Direct DMC
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300">{settings.address}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <div className="text-slate-300">
                {settings.phoneNumbers.map((ph, idx) => (
                  <a key={idx} href={`tel:${ph}`} className="hover:text-emerald-400 block">
                    +91 {ph}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <a href={`mailto:${settings.email}`} className="text-slate-300 hover:text-emerald-400 truncate">
                {settings.email}
              </a>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} Bilu G Travels Kashmir. All rights reserved. Directed by {settings.directorName}.</p>
        <div className="flex items-center space-x-6">
          <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Registered Kashmir DMC</span>
          <span className="flex items-center gap-1"><HeartHandshake className="w-4 h-4 text-emerald-500" /> 24x7 Ground Support</span>
        </div>
      </div>
    </footer>
  );
};
