import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Phone,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  Users,
  Award,
  Send,
  Heart,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Package as PackageType } from '../../types';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { packages, settings, addLead } = useData();

  const [quickForm, setQuickForm] = useState({
    name: '',
    phone: '',
    email: '',
    destination: 'Srinagar - Gulmarg - Pahalgam',
    travelDate: '',
    pax: 2
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickForm.name || !quickForm.phone) return;

    addLead({
      customerName: quickForm.name,
      mobile: quickForm.phone,
      email: quickForm.email,
      destination: quickForm.destination,
      travelDate: quickForm.travelDate || new Date().toISOString().split('T')[0],
      pax: Number(quickForm.pax),
      budget: 45000,
      leadSource: 'Homepage Quick Inquiry',
      status: 'New',
      priority: 'High',
      assignedTo: settings.directorName,
      notes: `Inquiry submitted from Homepage for ${quickForm.destination}`
    });

    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
    setQuickForm({
      name: '',
      phone: '',
      email: '',
      destination: 'Srinagar - Gulmarg - Pahalgam',
      travelDate: '',
      pax: 2
    });
  };

  const destinations = [
    {
      name: 'Srinagar',
      tagline: 'Venice of the East & Dal Lake',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
      highlights: ['Dal Lake Shikara', 'Mughal Gardens', 'Nigeen Lake', 'Royal Houseboats']
    },
    {
      name: 'Gulmarg',
      tagline: 'Meadow of Flowers & World\'s Highest Cable Car',
      image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80',
      highlights: ['Gondola Ride Phase 1 & 2', 'Golf Course', 'Apharwat Peak Snow', 'Skiing']
    },
    {
      name: 'Pahalgam',
      tagline: 'Valley of Shepherds & Lidder River',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      highlights: ['Betaab Valley', 'Aru Valley', 'Baisaran Valley', 'Chandanwari Trek']
    },
    {
      name: 'Sonmarg',
      tagline: 'Meadow of Gold & Thajiwas Glacier',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
      highlights: ['Thajiwas Glacier', 'Zero Point', 'Sindh River Rafting', 'Pony Rides']
    },
    {
      name: 'Doodhpathri',
      tagline: 'Valley of Milk & Unspoiled Rivers',
      image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80',
      highlights: ['Shaliganga River', 'Tangnar Meadows', 'Pine Forest Walks']
    },
    {
      name: 'Gurez Valley',
      tagline: 'Untouched Offbeat Kashmir Frontier',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      highlights: ['Habba Khatoon Peak', 'Razdan Pass', 'Kishanganga River', 'Dawar Village']
    },
    {
      name: 'Bangus Valley',
      tagline: 'Pristine Mountain Biosphere Reserve',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
      highlights: ['Bod Bangus', 'Lokut Bangus', 'Wild Meadows']
    },
    {
      name: 'Yusmarg',
      tagline: 'Meadow of Jesus & Alpine Lakes',
      image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80',
      highlights: ['Doodh Ganga River', 'Nilnag Lake', 'Pine Forests']
    }
  ];

  const whyUs = [
    {
      icon: Award,
      title: 'Local Kashmir DMC',
      desc: 'Based directly in Srinagar with local ground fleet, verified hotels, and experienced drivers.'
    },
    {
      icon: ShieldCheck,
      title: 'Best Price Guaranteed',
      desc: 'Direct ground rates without intermediary markups. Transparent inclusions and instant quotes.'
    },
    {
      icon: Sparkles,
      title: 'Customized Itineraries',
      desc: 'Honeymoon, family, group, or offbeat adventure tailored specifically to your budget and time.'
    },
    {
      icon: Clock,
      title: '24/7 On-Ground Support',
      desc: 'Dedicated local manager available round the clock during your trip in Kashmir.'
    }
  ];

  const experiences = [
    { title: 'Honeymoon Packages', tag: 'Romantic Stays & Flower Bed Decoration', color: 'from-pink-500 to-rose-600' },
    { title: 'Family Holiday Tours', tag: 'Comfortable Innova Cabs & Safe Stays', color: 'from-blue-500 to-indigo-600' },
    { title: 'Group & Corporate', tag: 'Tempo Travellers & Customized Buffets', color: 'from-emerald-500 to-teal-600' },
    { title: 'Offbeat Kashmir', tag: 'Gurez Valley, Bangus & Keran Explorations', color: 'from-amber-500 to-orange-600' }
  ];

  const testimonials = [
    {
      name: 'Dr. Vikrant Kulkarni',
      location: 'Pune, Maharashtra',
      rating: 5,
      comment: 'Bilu G Travels handled our 6-day Kashmir family trip flawlessly! Vehicle was brand new Innova Crysta, driver Ghulam Nabi was polite, and houseboat stay on Dal Lake was magical. Director Javid Farooq checked on us daily.',
      package: 'Best of Kashmir Family Tour'
    },
    {
      name: 'Siddharth & Sneha',
      location: 'Bangalore, Karnataka',
      rating: 5,
      comment: 'Booked our honeymoon package with Bilu G Travels Kashmir. Gondola tickets were arranged smoothly without queue hassle. Beautiful room setup in Gulmarg and candle light dinner in Dal Lake houseboat.',
      package: 'Kashmir Honeymoon Special'
    },
    {
      name: 'Rajesh Singhania',
      location: 'Ahmedabad, Gujarat',
      rating: 5,
      comment: 'We needed a reliable local DMC for our group of 14 people. Bilu G Travels provided a top notch Tempo Traveller and best Jain food arrangements at all hotels. Truly recommended Kashmir travel experts!',
      package: 'Kashmir Group Explorer'
    }
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-12 max-w-full overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative min-h-[580px] lg:min-h-[680px] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800">
        <img
          src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2000&q=80"
          alt="Dal Lake Kashmir Bilu G Travels"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-45 transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-900/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-white z-10 space-y-8">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Kashmir's Trusted Local Destination Management Company (DMC)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight font-serif max-w-4xl mx-auto leading-tight sm:leading-none">
            Discover Paradise With <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">Bilu G Travels Kashmir</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-light">
            Your Trusted Local Kashmir DMC for Unforgettable Journeys. Customized Honeymoon, Family & Group Packages with Direct On-Ground Support.
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/packages')}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-emerald-950/50 transition-all flex items-center justify-center gap-3 text-base"
            >
              <Compass className="w-5 h-5" />
              <span>Explore Kashmir Packages</span>
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-bold px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-3 text-base"
            >
              <Send className="w-5 h-5 text-emerald-400" />
              <span>Plan Your Trip</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-xs sm:text-sm font-medium text-slate-300">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> 100% Direct Local DMC
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Luxury Houseboats & Hotels
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Private Fleet & Drivers
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Director: {settings.directorName}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Booking Inquiry Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 lg:-mt-20 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Send className="w-5 h-5 text-emerald-600" />
              <span>Quick Kashmir Trip Inquiry</span>
            </h3>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-semibold">
              Instant Callback & Customized Quote
            </span>
          </div>

          {formSubmitted && (
            <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              Thank you! Director Javid Farooq from Bilu G Travels will call you shortly with the best package rates.
            </div>
          )}

          <form onSubmit={handleQuickSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Your Name *</label>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={quickForm.name}
                onChange={e => setQuickForm({ ...quickForm, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Mobile / WhatsApp *</label>
              <input
                type="tel"
                required
                placeholder="10-digit Mobile"
                value={quickForm.phone}
                onChange={e => setQuickForm({ ...quickForm, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Destination Choice</label>
              <select
                value={quickForm.destination}
                onChange={e => setQuickForm({ ...quickForm, destination: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Srinagar - Gulmarg - Pahalgam">Srinagar + Gulmarg + Pahalgam</option>
                <option value="Complete Kashmir 7 Days">Complete Kashmir (7 Days)</option>
                <option value="Offbeat Gurez & Bangus">Offbeat Gurez & Bangus</option>
                <option value="Kashmir Honeymoon Special">Kashmir Honeymoon Special</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Travel Date</label>
              <input
                type="date"
                value={quickForm.travelDate}
                onChange={e => setQuickForm({ ...quickForm, travelDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Number of Pax</label>
              <input
                type="number"
                min="1"
                value={quickForm.pax}
                onChange={e => setQuickForm({ ...quickForm, pax: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl transition-all shadow-md text-sm flex items-center justify-center gap-2"
              >
                <span>Get Instant Quote</span>
                <ChevronRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Why Choose Bilu G Travels Kashmir
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-serif">
            Your Trusted Local Kashmir DMC
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            We live here, work here, and know every hidden corner of Kashmir. Experience seamless luxury travel directly with local experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Popular Kashmir Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Handcrafted Itineraries
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-serif mt-2">
              Popular Kashmir Tour Packages
            </h2>
          </div>
          <button
            onClick={() => navigate('/packages')}
            className="text-emerald-600 hover:text-emerald-700 font-bold text-sm flex items-center gap-1 group"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.slice(0, 3).map((pkg: PackageType) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all flex flex-col group cursor-pointer"
              onClick={() => navigate(`/packages/${pkg.id}`)}
            >
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={pkg.images[0]}
                  alt={pkg.packageName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{pkg.duration}</span>
                </div>
                {pkg.isPopular && (
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    Bestseller
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{pkg.destination}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {pkg.packageName}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
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
                    className="bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors"
                  >
                    View Itinerary
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kashmir Destinations Showcase */}
      <section className="bg-slate-900 text-white py-16 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border border-slate-800">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            Paradise Kashmir Locations
          </span>
          <h2 className="text-3xl font-extrabold font-serif">
            Kashmir Destinations We Cover
          </h2>
          <p className="text-slate-400 text-sm">
            From iconic lakes and snow peaks to pristine offbeat frontiers across Jammu & Kashmir.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, idx) => (
            <div
              key={idx}
              className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/60 hover:border-emerald-500/50 transition-all space-y-3"
            >
              <div className="h-36 rounded-xl overflow-hidden mb-3">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-white flex items-center justify-between">
                <span>{dest.name}</span>
                <MapPin className="w-4 h-4 text-emerald-400" />
              </h3>
              <p className="text-xs text-emerald-300 font-medium">{dest.tagline}</p>
              <ul className="text-[11px] text-slate-300 space-y-1 pt-1">
                {dest.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Travel Experiences */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Tailored Experiences
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-serif mt-2">
            Kashmir Travel Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              onClick={() => navigate('/packages')}
              className={`p-6 rounded-3xl bg-gradient-to-br ${exp.color} text-white shadow-lg cursor-pointer transform hover:-translate-y-1 transition-all space-y-3`}
            >
              <Heart className="w-8 h-8 opacity-90" />
              <h3 className="text-xl font-bold">{exp.title}</h3>
              <p className="text-xs text-white/90 font-medium">{exp.tag}</p>
              <div className="pt-2 text-xs font-semibold flex items-center gap-1 text-white/95">
                <span>View Packages</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Guest Reviews
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-serif mt-2">
            What Our Travelers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                  <span className="text-xs text-slate-500">{t.location}</span>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full">
                  {t.package}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl border border-emerald-800/40">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif">
            Ready to Plan Your Kashmir Dream Trip?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Contact local Kashmir travel experts directly. Phone call, WhatsApp quote, or custom itinerary in 15 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={`tel:${settings.phoneNumbers[0]}`}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg transition-all flex items-center gap-2 text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call Director Javid: +91 {settings.phoneNumbers[0]}</span>
            </a>
            <button
              onClick={() => navigate('/contact')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-3.5 rounded-2xl transition-all text-sm flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Submit Custom Request</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
