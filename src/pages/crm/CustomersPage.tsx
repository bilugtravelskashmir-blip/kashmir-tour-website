import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Customer, Booking } from '../../types';
import {
  UserCheck,
  Search,
  Plus,
  Edit2,
  Trash2,
  Phone,
  Mail,
  MapPin,
  CalendarCheck,
  ChevronRight,
  X,
  FileText,
  User,
  ArrowLeft
} from 'lucide-react';

interface CustomersPageProps {
  customerId?: string;
  navigate: (path: string) => void;
}

export const CustomersPage: React.FC<CustomersPageProps> = ({ customerId, navigate }) => {
  const { customers, bookings, addCustomer, updateCustomer, deleteCustomer } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    customerId ? customers.find(c => c.id === customerId) || null : null
  );

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const initialForm = {
    fullName: '',
    mobile: '',
    whatsapp: '',
    email: '',
    city: '',
    state: '',
    country: 'India',
    numAdults: 2,
    numChildren: 0,
    childAges: '',
    travelDate: '',
    returnDate: '',
    destination: 'Srinagar - Gulmarg - Pahalgam',
    budget: 50000,
    source: 'Website Inquiry',
    notes: ''
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenModal = (cust?: Customer) => {
    if (cust) {
      setEditingCustomer(cust);
      setFormData({
        fullName: cust.fullName,
        mobile: cust.mobile,
        whatsapp: cust.whatsapp || '',
        email: cust.email || '',
        city: cust.city,
        state: cust.state,
        country: cust.country,
        numAdults: cust.numAdults,
        numChildren: cust.numChildren,
        childAges: cust.childAges || '',
        travelDate: cust.travelDate || '',
        returnDate: cust.returnDate || '',
        destination: cust.destination || '',
        budget: cust.budget || 0,
        source: cust.source || '',
        notes: cust.notes || ''
      });
    } else {
      setEditingCustomer(null);
      setFormData(initialForm);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobile) return;

    if (editingCustomer) {
      updateCustomer(editingCustomer.id, formData);
    } else {
      addCustomer(formData);
    }
    setIsModalOpen(false);
  };

  const filteredCustomers = customers.filter(c => {
    return (
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.mobile.includes(searchTerm) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  if (selectedCustomer) {
    const customerBookings = bookings.filter(b => b.customerId === selectedCustomer.id || b.customerPhone === selectedCustomer.mobile);

    return (
      <div className="space-y-8 pb-12 max-w-full overflow-x-hidden">
        <button
          onClick={() => setSelectedCustomer(null)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 flex-shrink-0" />
          <span>Back to Customers Directory</span>
        </button>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md flex-shrink-0">
                {selectedCustomer.fullName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{selectedCustomer.fullName}</h1>
                <span className="text-xs text-slate-500 font-medium">
                  Client ID: {selectedCustomer.id} • Registered {selectedCustomer.createdDate}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleOpenModal(selectedCustomer)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5 flex-shrink-0" /> Edit Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase block">Contact Information</span>
              <div className="flex items-center gap-2 text-slate-800 font-medium">
                <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" /> +91 {selectedCustomer.mobile}
              </div>
              {selectedCustomer.email && (
                <div className="flex items-center gap-2 text-slate-800 font-medium">
                  <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" /> {selectedCustomer.email}
                </div>
              )}
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase block">Location</span>
              <div className="flex items-center gap-2 text-slate-800 font-medium">
                <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" /> {selectedCustomer.city}, {selectedCustomer.state}, {selectedCustomer.country}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase block">Travel Preferences</span>
              <div className="text-slate-800 font-medium">
                Pax: {selectedCustomer.numAdults} Adults, {selectedCustomer.numChildren} Children
              </div>
              <div className="text-slate-500 text-xs">
                Preferred Destination: {selectedCustomer.destination || 'Kashmir'}
              </div>
            </div>
          </div>

          {/* Customer Booking History */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>Customer Booking History ({customerBookings.length})</span>
            </h3>

            {customerBookings.length === 0 ? (
              <div className="p-6 bg-slate-50 rounded-2xl text-center text-xs text-slate-500 font-medium">
                No past bookings linked with this customer yet.
              </div>
            ) : (
              <div className="space-y-3">
                {customerBookings.map((bk: Booking) => (
                  <div key={bk.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">{bk.bookingId}</span>
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          {bk.bookingStatus}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        {bk.destination} • {bk.travelStartDate} to {bk.travelEndDate}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-extrabold text-slate-900 block">₹{bk.totalAmount.toLocaleString()}</span>
                      <span className="text-xs text-slate-500">
                        Paid: ₹{bk.advanceReceived.toLocaleString()} | Balance: ₹{bk.balanceAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 max-w-full overflow-x-hidden">

      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-serif flex items-center gap-2">
            <UserCheck className="w-7 h-7 text-emerald-600 flex-shrink-0" />
            <span>Customer Directory & Profiles</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Maintain complete records of all travelers, preferences, and booking histories.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-2xl transition-all shadow-md flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          <span>Add New Customer</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="relative w-full max-w-md">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by customer name, phone, city or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden max-w-full">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 min-w-[700px]">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-4 px-5">Customer Name</th>
                <th className="py-4 px-5">Mobile & Email</th>
                <th className="py-4 px-5">City & Location</th>
                <th className="py-4 px-5">Pax & Preferred Travel</th>
                <th className="py-4 px-5">Source</th>
                <th className="py-4 px-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredCustomers.map((cust: Customer) => (
                <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-5">
                    <button
                      onClick={() => setSelectedCustomer(cust)}
                      className="font-extrabold text-slate-900 text-sm hover:text-emerald-600 transition-colors block text-left"
                    >
                      {cust.fullName}
                    </button>
                    <span className="text-[11px] text-slate-400">Added {cust.createdDate}</span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="font-bold text-slate-900 block">+91 {cust.mobile}</span>
                    <span className="text-[11px] text-slate-400 block">{cust.email || '-'}</span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-slate-800 font-semibold">{cust.city}, {cust.state}</span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-slate-900 font-bold block">{cust.numAdults} Adults, {cust.numChildren} Kids</span>
                    <span className="text-[11px] text-emerald-700">{cust.destination || 'Kashmir'}</span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-[10px] font-bold">
                      {cust.source || 'Direct'}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => setSelectedCustomer(cust)}
                        title="View Customer Profile"
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
                      >
                        <User className="w-4 h-4 flex-shrink-0" />
                      </button>
                      <button
                        onClick={() => handleOpenModal(cust)}
                        title="Edit Customer"
                        className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
                      >
                        <Edit2 className="w-4 h-4 flex-shrink-0" />
                      </button>
                      <button
                        onClick={() => deleteCustomer(cust.id)}
                        title="Delete Customer"
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-4 h-4 flex-shrink-0" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 font-serif">
                {editingCustomer ? 'Edit Customer Info' : 'Add New Customer Profile'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-900">
                <X className="w-6 h-6 flex-shrink-0" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Source</label>
                  <input
                    type="text"
                    value={formData.source}
                    onChange={e => setFormData({ ...formData, source: e.target.value })}
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
                  {editingCustomer ? 'Save Changes' : 'Create Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
