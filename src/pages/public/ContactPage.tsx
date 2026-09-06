import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

interface ContactPageProps {
  navigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  const { settings, addLead } = useData();

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    whatsapp: '',
    email: '',
    destination: 'Srinagar - Gulmarg - Pahalgam',
    travelDate: '',
    pax: 2,
    budget: 50000,
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mobile) return;

    addLead({
      customerName: form.name,
      mobile: form.mobile,
      whatsapp: form.whatsapp || form.mobile,
      email: form.email,
      destination: form.destination,
      travelDate: form.travelDate || new Date().toISOString().split('T')[0],
      pax: Number(form.pax),
      budget: Number(form.budget),
      leadSource: 'Contact Page Direct',
      status: 'New',
      priority: 'High',
      assignedTo: settings.directorName,
      notes: form.notes
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
    setForm({
      name: '',
      mobile: '',
      whatsapp: '',
      email: '',
      destination: 'Srinagar - Gulmarg - Pahalgam',
      travelDate: '',
      pax: 2,
      budget: 50000,
      notes: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 max-w-full overflow-x-hidden">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          Direct Srinagar Kashmir DMC
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-serif">
          Contact Bilu G Travels Kashmir
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Get in touch directly with our Director Javid Farooq for customized Kashmir holiday packages, hotel bookings, and B2B travel support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Contact Info Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-8 flex flex-col justify-between border border-slate-800">
          <div className="space-y-6">
            <div>
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">Head Office</span>
              <h2 className="text-2xl font-bold font-serif mt-1">{settings.companyName}</h2>
              <p className="text-xs text-slate-400 mt-1">Directed by {settings.directorName}</p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3.5">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed">{settings.address}</span>
              </div>

              <div className="flex items-center space-x-3.5">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  {settings.phoneNumbers.map((ph, i) => (
                    <a key={i} href={`tel:${ph}`} className="block hover:text-emerald-300 transition-colors">
                      +91 {ph}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-emerald-300 truncate">
                  {settings.email}
                </a>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/60 space-y-2">
            <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 flex-shrink-0" /> WhatsApp Quick Assistance
            </span>
            <p className="text-xs text-slate-300">
              Need immediate package quotation on WhatsApp?
            </p>
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Bilu%20G%20Travels,%20I%20want%20to%20plan%20a%20Kashmir%20trip.`}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md"
            >
              Chat on WhatsApp Now
            </a>
          </div>
        </div>

        {/* Lead Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-serif">
              Plan Your Customized Kashmir Trip
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Fill in your details below. Our local team will design a customized itinerary and price quote for you.
            </p>
          </div>

          {submitted && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              Thank you! Director Javid Farooq will contact you with the best itinerary & quote.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile / Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit Phone"
                  value={form.mobile}
                  onChange={e => setForm({ ...form, mobile: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Number</label>
                <input
                  type="tel"
                  placeholder="WhatsApp Number"
                  value={form.whatsapp}
                  onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Choice</label>
                <select
                  value={form.destination}
                  onChange={e => setForm({ ...form, destination: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  <option value="Srinagar - Gulmarg - Pahalgam">Srinagar + Gulmarg + Pahalgam</option>
                  <option value="Complete Kashmir (7 Days)">Complete Kashmir (7 Days)</option>
                  <option value="Offbeat Gurez & Bangus">Offbeat Gurez & Bangus</option>
                  <option value="Kashmir Honeymoon Package">Kashmir Honeymoon Package</option>
                  <option value="Custom Tour / B2B Ground">Custom Tour / B2B Ground</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Expected Travel Date</label>
                <input
                  type="date"
                  value={form.travelDate}
                  onChange={e => setForm({ ...form, travelDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Number of Passengers</label>
                <input
                  type="number"
                  min="1"
                  value={form.pax}
                  onChange={e => setForm({ ...form, pax: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Specific Requirements or Message</label>
              <textarea
                rows={3}
                placeholder="Tell us about your preferences: hotel category (3/4/5 Star), vehicle type, meal preferences..."
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
            >
              <Send className="w-4 h-4" />
              <span>Submit Request to Local DMC</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
