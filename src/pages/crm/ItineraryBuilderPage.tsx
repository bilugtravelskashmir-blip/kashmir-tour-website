import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { Itinerary, ItineraryDay } from '../../types';
import {
  FileText,
  Plus,
  Save,
  Download,
  Printer,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface ItineraryBuilderPageProps {
  navigate: (path: string) => void;
  itineraryId?: string;
}

export const ItineraryBuilderPage: React.FC<ItineraryBuilderPageProps> = ({ navigate, itineraryId }) => {
  const { itineraries, settings, addItinerary, updateItinerary } = useData();
  const printRef = useRef<HTMLDivElement>(null);

  const [selectedItineraryId, setSelectedItineraryId] = useState<string | null>(itineraryId || null);

  const initialItinerary = {
    clientName: 'Rohit Sharma',
    clientPhone: '9876543210',
    clientEmail: 'rohit.sharma@gmail.com',
    destination: 'Srinagar - Gulmarg - Pahalgam',
    travelDate: '2025-05-10',
    returnDate: '2025-05-15',
    numDays: 6,
    numNights: 5,
    paxAdults: 2,
    paxChildren: 1,
    childAges: '5 yrs',
    numRooms: 1,
    packageName: 'Magical Kashmir Honeymoon',
    hotelCategory: '4 Star Deluxe',
    mealPlan: 'MAP (Breakfast & Dinner)',
    transportation: 'Private Innova Crysta',
    totalCost: 48500,
    hotelDetails: 'Dal Lake Houseboat (1N) + Grand Mumtaz Gulmarg (2N) + Pine N Peak Pahalgam (2N)',
    inclusions: [
      '01 Night stay in Premium Houseboat in Srinagar',
      '04 Nights in 4-Star Luxury Hotels (Gulmarg & Pahalgam)',
      'Daily Buffet Breakfast & Dinner',
      '1 Hour Shikara Ride on Dal Lake',
      'All Sightseeing and transfers by private Innova Crysta',
      'Driver allowances, toll tax, parking, and GST'
    ],
    exclusions: [
      'Airfare / Train fare',
      'Gondola Cable Car Tickets at Gulmarg',
      'Pony rides or local Union taxis in Pahalgam / Sonmarg',
      'Personal expenses & tipping'
    ],
    termsAndConditions: settings.defaultTerms,
    dayWiseItinerary: [
      {
        dayNumber: 1,
        title: 'Arrival Srinagar & Shikara Ride in Dal Lake',
        destination: 'Srinagar',
        description: 'Warm welcome at Srinagar Airport by Bilu G Travels representative. Transfer to Luxury Houseboat. Enjoy an evening romantic 1-hour Shikara ride on Dal Lake.',
        sightseeing: ['Dal Lake', 'Boulevard Road', 'Local Crafts Market'],
        hotel: 'Dal Lake Premium Houseboat',
        meals: 'Dinner',
        image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80'
      },
      {
        dayNumber: 2,
        title: 'Srinagar Mughal Gardens to Gulmarg',
        destination: 'Gulmarg',
        description: 'Morning visit to famous Mughal Gardens (Nishat & Shalimar). Later drive to Gulmarg (Meadow of Flowers). Check-in at hotel and enjoy snow views.',
        sightseeing: ['Nishat Bagh', 'Shalimar Bagh', 'Tangmarg Scenic Drive'],
        hotel: 'Grand Mumtaz Gulmarg',
        meals: 'Breakfast & Dinner',
        image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80'
      },
      {
        dayNumber: 3,
        title: 'Gulmarg Gondola Ride & Snow Activities',
        destination: 'Gulmarg',
        description: 'Board the world highest Gondola Cable Car to Phase 1 & Phase 2 (Kongdoori & Apharwat Peak). Enjoy skiing, snow sledding, and photography.',
        sightseeing: ['Gondola Phase 1 & 2', 'Golf Course', 'St. Mary Church'],
        hotel: 'Grand Mumtaz Gulmarg',
        meals: 'Breakfast & Dinner',
        image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80'
      }
    ] as ItineraryDay[]
  };

  const [form, setForm] = useState(initialItinerary);

  useEffect(() => {
    if (itineraryId) {
      const found = itineraries.find(i => i.id === itineraryId || i.itineraryId === itineraryId);
      if (found) {
        handleSelectItinerary(found);
      }
    }
  }, [itineraryId, itineraries]);

  const handleSelectItinerary = (itin: Itinerary) => {
    setSelectedItineraryId(itin.id);
    setForm({
      clientName: itin.clientName || '',
      clientPhone: itin.clientPhone || '',
      clientEmail: itin.clientEmail || '',
      destination: itin.destination || '',
      travelDate: itin.travelDate || '',
      returnDate: itin.returnDate || '',
      numDays: itin.numDays || 6,
      numNights: itin.numNights || 5,
      paxAdults: itin.paxAdults || 2,
      paxChildren: itin.paxChildren || 0,
      childAges: itin.childAges || '',
      numRooms: itin.numRooms || 1,
      packageName: itin.packageName || '',
      hotelCategory: itin.hotelCategory || '',
      mealPlan: itin.mealPlan || '',
      transportation: itin.transportation || '',
      totalCost: itin.totalCost || 0,
      hotelDetails: itin.hotelDetails || '',
      inclusions: itin.inclusions || [],
      exclusions: itin.exclusions || [],
      termsAndConditions: itin.termsAndConditions || settings.defaultTerms,
      dayWiseItinerary: itin.dayWiseItinerary || []
    });
  };

  const handleCreateNew = () => {
    setSelectedItineraryId(null);
    setForm(initialItinerary);
  };

  const handleSaveItinerary = () => {
    if (selectedItineraryId) {
      updateItinerary(selectedItineraryId, form);
      alert('Itinerary updated successfully!');
    } else {
      const created = addItinerary(form);
      setSelectedItineraryId(created.id);
      alert('Itinerary saved to database!');
    }
  };

  const handleAddDay = () => {
    const nextNum = form.dayWiseItinerary.length + 1;
    setForm({
      ...form,
      dayWiseItinerary: [
        ...form.dayWiseItinerary,
        {
          dayNumber: nextNum,
          title: `Day ${nextNum} Sightseeing`,
          destination: 'Srinagar / Pahalgam',
          description: 'Explore scenic attractions and enjoy local Kashmir hospitality.',
          hotel: 'Standard 4-Star Hotel',
          meals: 'Breakfast & Dinner'
        }
      ]
    });
  };

  const handleRemoveDay = (index: number) => {
    const updated = form.dayWiseItinerary.filter((_, i) => i !== index).map((d, i) => ({
      ...d,
      dayNumber: i + 1
    }));
    setForm({ ...form, dayWiseItinerary: updated });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    try {
      const canvas = await html2canvas(printRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Itinerary-${form.clientName.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error(err);
      alert('Unable to generate PDF directly. You can use the Print option to Save as PDF.');
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-full overflow-x-hidden">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs print:hidden">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-serif flex items-center gap-2">
            <FileText className="w-7 h-7 text-emerald-600 flex-shrink-0" />
            <span>Itinerary & Quotation Builder</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Build branded travel proposals with day-wise schedules, price breakdown, and instant client PDF download.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCreateNew}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4 flex-shrink-0" />
            <span>New Proposal</span>
          </button>
          <button
            onClick={handleSaveItinerary}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            <Save className="w-4 h-4 flex-shrink-0" />
            <span>Save Itinerary</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            <Download className="w-4 h-4 flex-shrink-0" />
            <span>Download PDF</span>
          </button>
          <button
            onClick={handlePrint}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            <Printer className="w-4 h-4 flex-shrink-0" />
            <span>Print</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block">

        {/* Left Form Column */}
        <div className="lg:col-span-5 space-y-6 print:hidden">

          {/* Saved Proposals Selector */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Saved Itineraries ({itineraries.length})
            </h3>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {itineraries.map((itin) => (
                <div
                  key={itin.id}
                  onClick={() => handleSelectItinerary(itin)}
                  className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    selectedItineraryId === itin.id
                      ? 'border-emerald-500 bg-emerald-50/50 font-bold text-emerald-900'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div>
                    <span className="block font-bold">{itin.packageName}</span>
                    <span className="text-[10px] text-slate-500">{itin.clientName} • {itin.destination}</span>
                  </div>
                  <span className="text-emerald-700 font-extrabold">₹{(itin.totalCost || 0).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Builder Form Controls */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5 text-xs sm:text-sm">
            <h3 className="font-bold text-slate-900 font-serif text-base border-b border-slate-100 pb-3">
              1. Client & Travel Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Client Full Name *</label>
                <input
                  type="text"
                  value={form.clientName}
                  onChange={e => setForm({ ...form, clientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Mobile / WhatsApp</label>
                <input
                  type="text"
                  value={form.clientPhone}
                  onChange={e => setForm({ ...form, clientPhone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Travel Date</label>
                <input
                  type="date"
                  value={form.travelDate}
                  onChange={e => setForm({ ...form, travelDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Return Date</label>
                <input
                  type="date"
                  value={form.returnDate}
                  onChange={e => setForm({ ...form, returnDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Adults</label>
                <input
                  type="number"
                  value={form.paxAdults}
                  onChange={e => setForm({ ...form, paxAdults: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Children</label>
                <input
                  type="number"
                  value={form.paxChildren}
                  onChange={e => setForm({ ...form, paxChildren: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Rooms</label>
                <input
                  type="number"
                  value={form.numRooms}
                  onChange={e => setForm({ ...form, numRooms: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <h3 className="font-bold text-slate-900 font-serif text-base border-b border-slate-100 pb-3 pt-2">
              2. Package & Pricing
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Package Title</label>
              <input
                type="text"
                value={form.packageName}
                onChange={e => setForm({ ...form, packageName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold text-emerald-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Hotel Category</label>
                <input
                  type="text"
                  value={form.hotelCategory}
                  onChange={e => setForm({ ...form, hotelCategory: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Total Quotation Cost (₹)</label>
                <input
                  type="number"
                  value={form.totalCost}
                  onChange={e => setForm({ ...form, totalCost: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-extrabold text-slate-900"
                />
              </div>
            </div>

            <div className="flex justify-between items-center border-b border-slate-100 pb-2 pt-2">
              <h3 className="font-bold text-slate-900 font-serif text-base">3. Day-wise Itinerary ({form.dayWiseItinerary.length} Days)</h3>
              <button
                type="button"
                onClick={handleAddDay}
                className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5 flex-shrink-0" /> Add Day
              </button>
            </div>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {form.dayWiseItinerary.map((day, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-emerald-700">Day {day.dayNumber}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDay(idx)}
                      className="text-rose-600 text-xs font-semibold hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Day Title"
                    value={day.title}
                    onChange={e => {
                      const updated = [...form.dayWiseItinerary];
                      updated[idx].title = e.target.value;
                      setForm({ ...form, dayWiseItinerary: updated });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold"
                  />
                  <textarea
                    rows={2}
                    placeholder="Day Detailed Description"
                    value={day.description}
                    onChange={e => {
                      const updated = [...form.dayWiseItinerary];
                      updated[idx].description = e.target.value;
                      setForm({ ...form, dayWiseItinerary: updated });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs resize-none"
                  />
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Right Printable Document Preview Column */}
        <div className="lg:col-span-7 print:w-full">
          <div
            ref={printRef}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-lg space-y-8 print:shadow-none print:border-none print:p-0 text-slate-800"
          >
            {/* Document Branded Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-emerald-600 pb-6 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Kashmir DMC Official Tour Proposal
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight">
                  {settings.companyName}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {settings.address} • Phone: {settings.phoneNumbers[0] || ''} / {settings.phoneNumbers[1] || ''}
                </p>
                <p className="text-xs text-slate-500">Email: {settings.email} | GSTIN: {settings.gstNumber}</p>
              </div>

              <div className="bg-emerald-600 text-white p-4 rounded-2xl text-right sm:text-center min-w-36">
                <span className="text-[10px] font-bold uppercase tracking-wider block opacity-90">Total Quotation</span>
                <span className="text-2xl font-black">₹{(form.totalCost || 0).toLocaleString()}</span>
                <span className="text-[9px] block opacity-80">(Inclusive of All Taxes)</span>
              </div>
            </div>

            {/* Client Summary Grid */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Prepared For</span>
                <span className="font-extrabold text-slate-900 text-sm block mt-0.5">{form.clientName}</span>
                <span className="text-slate-500">{form.clientPhone}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Destination</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{form.destination}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Travel Dates</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{form.travelDate} to {form.returnDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Pax & Rooms</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{form.paxAdults} Adults, {form.paxChildren} Children</span>
                <span className="text-slate-500">{form.numRooms} Rooms ({form.hotelCategory})</span>
              </div>
            </div>

            {/* Day Wise Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 font-serif border-b border-slate-200 pb-2">
                Day-Wise Detailed Itinerary
              </h3>

              <div className="space-y-6">
                {form.dayWiseItinerary.map((day) => (
                  <div key={day.dayNumber} className="relative pl-6 sm:pl-8 border-l-2 border-emerald-500 space-y-2">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white" />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-black text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-md">
                        Day {day.dayNumber}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">{day.destination}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900">{day.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{day.description}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-2">
                      <div>
                        <span className="text-slate-400 font-semibold text-[10px] uppercase block">Stay Hotel</span>
                        <span className="font-bold text-slate-800">{day.hotel}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold text-[10px] uppercase block">Meal Plan</span>
                        <span className="font-bold text-slate-800">{day.meals}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
              <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-100 space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Package Inclusions</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {form.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-50/60 rounded-2xl p-5 border border-rose-100 space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>Package Exclusions</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {form.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Terms & Bank Details */}
            <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-3">
              <h4 className="font-bold text-slate-800">Terms & Payment Terms</h4>
              <ul className="list-disc pl-4 space-y-1">
                {form.termsAndConditions.map((term, idx) => (
                  <li key={idx}>{term}</li>
                ))}
              </ul>

              <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Official Bank Details for Booking Advance</span>
                  <span className="font-bold text-sm block mt-0.5">{settings.bankDetails?.accountName}</span>
                  <span className="text-xs text-slate-300">A/C: {settings.bankDetails?.accountNumber} | IFSC: {settings.bankDetails?.ifscCode} | {settings.bankDetails?.bankName}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-400 block">Director Contact</span>
                  <span className="font-bold text-white text-sm">{settings.directorName}</span>
                  <span className="text-xs text-slate-300 block">{settings.phoneNumbers[0]}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
