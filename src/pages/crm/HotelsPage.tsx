import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Hotel } from '../../types';
import {
  Building,
  Plus,
  Search,
  Edit2,
  Trash2,
  MapPin,
  Phone,
  Mail,
  X
} from 'lucide-react';

interface HotelsPageProps {
  navigate: (path: string) => void;
}

export const HotelsPage: React.FC<HotelsPageProps> = ({ navigate }) => {
  const { hotels, addHotel, updateHotel, deleteHotel } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);

  const initialForm = {
    hotelName: '',
    location: 'Srinagar',
    category: '4 Star' as Hotel['category'],
    address: 'Boulevard Road, Srinagar, Kashmir',
    contactPerson: 'Manager',
    phone: '0194-2450000',
    email: 'info@hotel.com',
    roomTypes: ['Deluxe Lake View', 'Super Deluxe', 'Executive Suite'],
    mealPlans: ['CP (Breakfast)', 'MAP (Breakfast & Dinner)', 'AP (All Meals)'],
    rate: 4500,
    status: 'Active' as 'Active' | 'Inactive',
    notes: 'Preferred partner hotel with excellent ratings and service.'
  };

  const [form, setForm] = useState(initialForm);

  const handleOpenModal = (h?: Hotel) => {
    if (h) {
      setEditingHotel(h);
      setForm({
        hotelName: h.hotelName,
        location: h.location,
        category: h.category,
        address: h.address,
        contactPerson: h.contactPerson,
        phone: h.phone,
        email: h.email,
        roomTypes: h.roomTypes,
        mealPlans: h.mealPlans,
        rate: h.rate || 0,
        status: h.status,
        notes: h.notes || ''
      });
    } else {
      setEditingHotel(null);
      setForm(initialForm);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.hotelName) return;

    if (editingHotel) {
      updateHotel(editingHotel.id, form);
    } else {
      addHotel(form);
    }
    setIsModalOpen(false);
  };

  const filteredHotels = hotels.filter(h => {
    const matchesSearch = h.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          h.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || h.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 pb-16 max-w-full overflow-x-hidden">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-serif flex items-center gap-2">
            <Building className="w-7 h-7 text-emerald-600 flex-shrink-0" />
            <span>Kashmir Partner Hotel Network</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage partner hotels, contracted room tariffs, contact managers, and location categories across Srinagar, Gulmarg, and Pahalgam.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-2xl transition-all shadow-md flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          <span>Add New Hotel</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search hotel name, location (Srinagar, Gulmarg...)"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <span className="text-xs font-semibold text-slate-600">Category:</span>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white text-slate-800"
          >
            <option value="All">All Categories</option>
            <option value="5 Star">5 Star / Luxury</option>
            <option value="4 Star">4 Star Deluxe</option>
            <option value="3 Star">3 Star Premium</option>
            <option value="Houseboat">Luxury Houseboat</option>
          </select>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map(h => (
          <div key={h.id} className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {h.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">{h.hotelName}</h3>
                </div>
                <span className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-xl">
                  ₹{(h.rate || 0).toLocaleString()}/night
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{h.location} • {h.address}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{h.contactPerson} ({h.phone})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{h.email}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs space-y-1">
                <span className="text-slate-400 block text-[10px] font-semibold uppercase">Room Types</span>
                <p className="font-semibold text-slate-800">{h.roomTypes.join(', ')}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                h.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
              }`}>
                {h.status}
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleOpenModal(h)}
                  className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <Edit2 className="w-4 h-4 flex-shrink-0" />
                </button>
                <button
                  onClick={() => deleteHotel(h.id)}
                  className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4 flex-shrink-0" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 font-serif">
                {editingHotel ? 'Edit Hotel Details' : 'Add New Partner Hotel'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-900">
                <X className="w-6 h-6 flex-shrink-0" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hotel Name *</label>
                  <input
                    type="text"
                    required
                    value={form.hotelName}
                    onChange={e => setForm({ ...form, hotelName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="5 Star">5 Star / Luxury</option>
                    <option value="4 Star">4 Star Deluxe</option>
                    <option value="3 Star">3 Star Premium</option>
                    <option value="Houseboat">Luxury Houseboat</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Rate per Night (₹)</label>
                  <input
                    type="number"
                    value={form.rate}
                    onChange={e => setForm({ ...form, rate: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={e => setForm({ ...form, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={form.contactPerson}
                    onChange={e => setForm({ ...form, contactPerson: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
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
                  {editingHotel ? 'Save Hotel' : 'Add Hotel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
