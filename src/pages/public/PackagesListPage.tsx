import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Package as PackageType } from '../../types';
import { Compass, Search, Clock, MapPin, ArrowRight, Filter } from 'lucide-react';

interface PackagesListPageProps {
  navigate: (path: string) => void;
}

export const PackagesListPage: React.FC<PackagesListPageProps> = ({ navigate }) => {
  const { packages } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('All');

  const filtered = packages.filter((pkg: PackageType) => {
    const matchesSearch = pkg.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDuration = selectedDuration === 'All' || pkg.duration.includes(selectedDuration);
    return matchesSearch && matchesDuration;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 max-w-full overflow-x-hidden">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          Handcrafted Kashmir Experiences
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-serif">
          Kashmir Tour Packages & DMC Itineraries
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Select from our best-selling Kashmir honeymoon, family, group, and offbeat travel itineraries with direct local support in Srinagar.
        </p>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-md border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search Srinagar, Gulmarg, Gurez, Honeymoon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <span className="text-xs font-semibold text-slate-600">Duration:</span>
          <select
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
            className="px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white text-slate-800"
          >
            <option value="All">All Durations</option>
            <option value="5 Days">5 Days</option>
            <option value="6 Days">6 Days</option>
            <option value="7 Days">7 Days</option>
          </select>
        </div>
      </div>

      {/* Package Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((pkg: PackageType) => (
          <div
            key={pkg.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all flex flex-col group cursor-pointer"
            onClick={() => navigate(`/packages/${pkg.id}`)}
          >
            <div className="relative h-60 overflow-hidden bg-slate-100">
              <img
                src={pkg.images[0]}
                alt={pkg.packageName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{pkg.duration}</span>
              </div>
              {pkg.isPopular && (
                <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Bestseller
                </div>
              )}
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{pkg.destination}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {pkg.packageName}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Starting from</span>
                  <span className="text-xl font-extrabold text-slate-900">
                    ₹{pkg.price.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ person</span>
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/packages/${pkg.id}`);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
