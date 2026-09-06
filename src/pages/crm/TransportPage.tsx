import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Transport } from '../../types';
import {
  Car,
  Plus,
  Search,
  Edit2,
  Trash2,
  User,
  Phone,
  CheckCircle,
  XCircle,
  X
} from 'lucide-react';

interface TransportPageProps {
  navigate: (path: string) => void;
}

export const TransportPage: React.FC<TransportPageProps> = ({ navigate }) => {
  const { transports, addTransport, updateTransport, deleteTransport } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransport, setEditingTransport] = useState<Transport | null>(null);

  const initialForm = {
    vehicleType: 'Innova Crysta' as Transport['vehicleType'],
    vehicleName: 'Innova Crysta Deluxe',
    vehicleNumber: 'JK01 AB 1234',
    driverName: 'Mohammad Tariq',
    driverMobile: '9906000001',
    capacity: 6,
    ratePerDay: 3800,
    availability: 'Available' as 'Available' | 'On Tour' | 'Maintenance',
    notes: 'AC Commercial Permit vehicle with verified local Srinagar driver.'
  };

  const [form, setForm] = useState(initialForm);

  const handleOpenModal = (t?: Transport) => {
    if (t) {
      setEditingTransport(t);
      setForm({
        vehicleType: t.vehicleType,
        vehicleName: t.vehicleName,
        vehicleNumber: t.vehicleNumber,
        driverName: t.driverName,
        driverMobile: t.driverMobile,
        capacity: t.capacity,
        ratePerDay: t.ratePerDay,
        availability: t.availability,
        notes: t.notes || ''
      });
    } else {
      setEditingTransport(null);
      setForm(initialForm);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.vehicleName) return;

    if (editingTransport) {
      updateTransport(editingTransport.id, form);
    } else {
      addTransport(form);
    }
    setIsModalOpen(false);
  };

  const filtered = transports.filter(t => {
    const matchesSearch = t.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || t.vehicleType === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8 pb-16 max-w-full overflow-x-hidden">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-serif flex items-center gap-2">
            <Car className="w-7 h-7 text-emerald-600 flex-shrink-0" />
            <span>Kashmir Tourist Vehicle & Driver Fleet</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage tourist vehicles (Innova Crysta, Tempo Traveller, Sedans), driver contact details, per-day rates, and tour availability.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-2xl transition-all shadow-md flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          <span>Add New Vehicle</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search driver name, vehicle number, or model..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <span className="text-xs font-semibold text-slate-600">Vehicle Type:</span>
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white text-slate-800"
          >
            <option value="All">All Vehicle Types</option>
            <option value="Innova Crysta">Innova Crysta</option>
            <option value="Innova">Innova</option>
            <option value="Tempo Traveller">Tempo Traveller</option>
            <option value="Sedan">Sedan (Etios/Dzire)</option>
            <option value="SUV">SUV (Scorpio/Xylo)</option>
            <option value="Bus">Luxury Bus</option>
          </select>
        </div>
      </div>

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(t => (
          <div key={t.id} className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {t.vehicleType} ({t.capacity} Pax)
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">{t.vehicleName}</h3>
                  <span className="text-xs font-mono font-bold text-slate-500">{t.vehicleNumber}</span>
                </div>
                <span className="text-xs font-extrabold text-slate-900 bg-slate-100 px-3 py-1 rounded-xl">
                  ₹{(t.ratePerDay || 0).toLocaleString()}/day
                </span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-semibold text-slate-800">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>Driver: {t.driverName}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 text-slate-600">
                  <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{t.driverMobile}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                t.availability === 'Available' ? 'bg-emerald-100 text-emerald-800' :
                t.availability === 'On Tour' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {t.availability}
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleOpenModal(t)}
                  className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <Edit2 className="w-4 h-4 flex-shrink-0" />
                </button>
                <button
                  onClick={() => deleteTransport(t.id)}
                  className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4 flex-shrink-0" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 font-serif">
                {editingTransport ? 'Edit Vehicle Details' : 'Add New Tourist Vehicle'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-900">
                <X className="w-6 h-6 flex-shrink-0" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Vehicle Model / Name *</label>
                  <input
                    type="text"
                    required
                    value={form.vehicleName}
                    onChange={e => setForm({ ...form, vehicleName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Registration Number</label>
                  <input
                    type="text"
                    value={form.vehicleNumber}
                    onChange={e => setForm({ ...form, vehicleNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none uppercase font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Vehicle Type</label>
                  <select
                    value={form.vehicleType}
                    onChange={e => setForm({ ...form, vehicleType: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="Innova Crysta">Innova Crysta</option>
                    <option value="Innova">Innova</option>
                    <option value="Tempo Traveller">Tempo Traveller</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Bus">Bus</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Capacity (Pax)</label>
                  <input
                    type="number"
                    value={form.capacity}
                    onChange={e => setForm({ ...form, capacity: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Rate / Day (₹)</label>
                  <input
                    type="number"
                    value={form.ratePerDay}
                    onChange={e => setForm({ ...form, ratePerDay: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-extrabold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Driver Name</label>
                  <input
                    type="text"
                    value={form.driverName}
                    onChange={e => setForm({ ...form, driverName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Driver Mobile Number</label>
                  <input
                    type="text"
                    value={form.driverMobile}
                    onChange={e => setForm({ ...form, driverMobile: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Availability Status</label>
                <select
                  value={form.availability}
                  onChange={e => setForm({ ...form, availability: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-bold text-slate-800"
                >
                  <option value="Available">Available</option>
                  <option value="On Tour">On Tour</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md"
                >
                  {editingTransport ? 'Save Vehicle' : 'Add Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
