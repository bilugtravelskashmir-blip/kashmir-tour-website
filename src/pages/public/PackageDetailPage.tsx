import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Package as PackageType } from '../../types';
import {
  Clock,
  MapPin,
  Check,
  X,
  Calendar,
  Users,
  Send,
  Phone,
  CheckCircle2,
  Building,
  Car,
  ChevronLeft
} from 'lucide-react';

interface PackageDetailPageProps {
  packageId?: string;
  navigate: (path: string) => void;
}

export const PackageDetailPage: React.FC<PackageDetailPageProps> = ({ packageId, navigate }) => {
  const { packages, settings, addLead } = useData();

  const pkg = packages.find((p: PackageType) => p.id === packageId) || packages[0];

  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    travelDate: '',
    pax: 2,
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.phone) return;

    addLead({
      customerName: inquiryForm.name,
      mobile: inquiryForm.phone,
      email: inquiryForm.email,
      destination: pkg.destination,
      travelDate: inquiryForm.travelDate || new Date().toISOString().split('T')[0],
      pax: Number(inquiryForm.pax),
      budget: pkg.price * Number(inquiryForm.pax),
      leadSource: `Package Page (${pkg.packageName})`,
      status: 'New',
      priority: 'High',
      assignedTo: settings.directorName,
      notes: inquiryForm.notes ? `Package Inquiry: ${pkg.packageName}. Note: ${inquiryForm.notes}` : `Package Inquiry for ${pkg.packageName}`
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setInquiryForm({
      name: '',
      phone: '',
      email: '',
      travelDate: '',
      pax: 2,
      notes: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 max-w-full overflow-x-hidden">

      {/* Back Button */}
      <button
        onClick={() => navigate('/packages')}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to All Packages</span>
      </button>

      {/* Package Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                {pkg.destination}
              </span>
              <span className="bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                {pkg.duration}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
              {pkg.packageName}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {pkg.description}
            </p>
          </div>

          {/* Quick Package Meta Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">Hotel Stay</span>
              <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                <Building className="w-4 h-4 text-emerald-600 flex-shrink-0" /> {pkg.hotelCategory}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">Meal Plan</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">{pkg.mealPlan}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">Vehicle</span>
              <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                <Car className="w-4 h-4 text-emerald-600 flex-shrink-0" /> {pkg.transportation}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">Duration</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">{pkg.numNights}N / {pkg.numDays}D</span>
            </div>
          </div>

          {/* Gallery Image */}
          <div className="rounded-3xl overflow-hidden h-80 sm:h-96 shadow-lg border border-slate-100">
            <img src={pkg.images[0]} alt={pkg.packageName} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Instant Inquiry Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6 sticky top-28">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Special DMC Direct Package Rate</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-slate-900">₹{pkg.price.toLocaleString()}</span>
              <span className="text-xs text-slate-500 font-medium">/ person</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md mt-2 inline-block">
              Includes Houseboat + Hotel + Private Cab
            </p>
          </div>

          {submitted && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              Inquiry received! Director Javid Farooq will call you on WhatsApp/Mobile shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                placeholder="Name"
                value={inquiryForm.name}
                onChange={e => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
              <input
                type="tel"
                required
                placeholder="10-digit Phone"
                value={inquiryForm.phone}
                onChange={e => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Travel Date</label>
                <input
                  type="date"
                  value={inquiryForm.travelDate}
                  onChange={e => setInquiryForm({ ...inquiryForm, travelDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Persons (Pax)</label>
                <input
                  type="number"
                  min="1"
                  value={inquiryForm.pax}
                  onChange={e => setInquiryForm({ ...inquiryForm, pax: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Special Requirements</label>
              <textarea
                rows={2}
                placeholder="Honeymoon decoration, extra bed, etc."
                value={inquiryForm.notes}
                onChange={e => setInquiryForm({ ...inquiryForm, notes: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
            >
              <Send className="w-4 h-4" />
              <span>Send Inquiry & Get Quote</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Direct Call / WhatsApp:</span>
            <a href={`tel:${settings.phoneNumbers[0]}`} className="font-bold text-emerald-700 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 flex-shrink-0" /> +91 {settings.phoneNumbers[0]}
            </a>
          </div>
        </div>
      </div>

      {/* Detailed Day-Wise Itinerary */}
      <div className="space-y-6 pt-6">
        <h2 className="text-2xl font-bold text-slate-900 font-serif border-b border-slate-200 pb-3">
          Day-Wise Tour Itinerary
        </h2>

        <div className="space-y-6">
          {pkg.itinerary.map((day) => (
            <div key={day.dayNumber} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                    Day {day.dayNumber}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{day.title}</h3>
                </div>
                <span className="text-xs bg-slate-100 font-bold text-slate-700 px-3 py-1 rounded-full">
                  {day.destination}
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">{day.description}</p>

              <div className="pt-2 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-2xl">
                {day.sightseeing && day.sightseeing.length > 0 && (
                  <div>
                    <span className="font-bold text-slate-700 block mb-1">Sightseeing Highlights:</span>
                    <ul className="space-y-1 text-slate-600">
                      {day.sightseeing.map((s, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600 flex-shrink-0" /> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {day.hotel && (
                  <div>
                    <span className="font-bold text-slate-700 block mb-1">Overnight Stay:</span>
                    <span className="text-slate-600">{day.hotel}</span>
                  </div>
                )}
                {day.meals && (
                  <div>
                    <span className="font-bold text-slate-700 block mb-1">Meal Included:</span>
                    <span className="text-slate-600">{day.meals}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inclusions & Exclusions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        <div className="bg-emerald-50/60 rounded-3xl p-6 border border-emerald-100 space-y-4">
          <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>Package Inclusions</span>
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            {pkg.inclusions.map((inc, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-rose-50/60 rounded-3xl p-6 border border-rose-100 space-y-4">
          <h3 className="text-lg font-bold text-rose-950 flex items-center gap-2">
            <X className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <span>Package Exclusions</span>
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            {pkg.exclusions.map((exc, i) => (
              <li key={i} className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{exc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
};
