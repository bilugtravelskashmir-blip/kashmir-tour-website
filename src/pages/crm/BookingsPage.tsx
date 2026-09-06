import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Booking, BookingStatus, PaymentStatus } from '../../types';
import {
  CalendarCheck,
  Search,
  Plus,
  Edit2,
  Trash2,
  Phone,
  Calendar,
  IndianRupee,
  X,
  Filter,
  Building,
  Car,
  User,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface BookingsPageProps {
  navigate: (path: string) => void;
}

export const BookingsPage: React.FC<BookingsPageProps> = ({ navigate }) => {
  const { bookings, customers, packages, hotels, transports, addBooking, updateBooking, deleteBooking } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBookingStatus, setSelectedBookingStatus] = useState<string>('All');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  const initialFormState = {
    customerId: '',
    customerName: '',
    customerPhone: '',
    destination: 'Srinagar - Gulmarg - Pahalgam',
    travelStartDate: new Date().toISOString().split('T')[0],
    travelEndDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    numAdults: 2,
    numChildren: 0,
    rooms: 1,
    vehicle: 'Innova Crysta',
    packageId: '',
    packageName: 'Magical Kashmir Honeymoon Delight',
    hotelName: 'Grand Luxury Houseboat & Hotel Pine Spring',
    totalAmount: 65000,
    advanceReceived: 25000,
    paymentStatus: 'Partial' as PaymentStatus,
    bookingStatus: 'Confirmed' as BookingStatus,
    notes: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenModal = (booking?: Booking) => {
    if (booking) {
      setEditingBooking(booking);
      setFormData({
        customerId: booking.customerId,
        customerName: booking.customerName,
        customerPhone: booking.customerPhone,
        destination: booking.destination,
        travelStartDate: booking.travelStartDate,
        travelEndDate: booking.travelEndDate,
        numAdults: booking.numAdults,
        numChildren: booking.numChildren,
        rooms: booking.rooms,
        vehicle: booking.vehicle || 'Innova Crysta',
        packageId: booking.packageId || '',
        packageName: booking.packageName || '',
        hotelName: booking.hotelName || '',
        totalAmount: booking.totalAmount,
        advanceReceived: booking.advanceReceived,
        paymentStatus: booking.paymentStatus,
        bookingStatus: booking.bookingStatus,
        notes: booking.notes || ''
      });
    } else {
      setEditingBooking(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerPhone) return;

    if (editingBooking) {
      updateBooking(editingBooking.id, formData);
    } else {
      addBooking(formData);
    }
    setIsModalOpen(false);
  };

  const handleCustomerSelect = (custMobile: string) => {
    const cust = customers.find(c => c.mobile === custMobile || c.fullName === custMobile);
    if (cust) {
      setFormData(prev => ({
        ...prev,
        customerId: cust.id,
        customerName: cust.fullName,
        customerPhone: cust.mobile,
        numAdults: cust.numAdults || prev.numAdults,
        numChildren: cust.numChildren || prev.numChildren
      }));
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.customerPhone.includes(searchTerm) ||
                          b.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBookingStatus = selectedBookingStatus === 'All' || b.bookingStatus === selectedBookingStatus;
    const matchesPaymentStatus = selectedPaymentStatus === 'All' || b.paymentStatus === selectedPaymentStatus;
    return matchesSearch && matchesBookingStatus && matchesPaymentStatus;
  });

  return (
    <div className="space-y-8 pb-12 max-w-full overflow-x-hidden">

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-serif flex items-center gap-2">
            <CalendarCheck className="w-7 h-7 text-emerald-600 flex-shrink-0" />
            <span>Kashmir Tour Bookings & Payment Tracking</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage confirmed Kashmir trips, payment schedules, automatically calculate balance receivables, and assign hotel/transport fleets.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-2xl transition-all shadow-md flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          <span>New Tour Booking</span>
        </button>
      </div>

      {/* Toolbar Search & Filters */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search booking ID, client name, phone or destination..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="text-xs font-semibold text-slate-600">Booking Status:</span>
            <select
              value={selectedBookingStatus}
              onChange={e => setSelectedBookingStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white text-slate-800"
            >
              <option value="All">All Statuses</option>
              <option value="Inquiry">Inquiry</option>
              <option value="Tentative">Tentative</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-600">Payment:</span>
            <select
              value={selectedPaymentStatus}
              onChange={e => setSelectedPaymentStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white text-slate-800"
            >
              <option value="All">All Payments</option>
              <option value="Pending">Pending</option>
              <option value="Partial">Partial</option>
              <option value="Paid">Paid</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden max-w-full">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 min-w-[850px]">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-4 px-5">Booking ID</th>
                <th className="py-4 px-5">Customer Details</th>
                <th className="py-4 px-5">Destination & Dates</th>
                <th className="py-4 px-5">Hotel & Transport</th>
                <th className="py-4 px-5">Total / Advance</th>
                <th className="py-4 px-5">Balance Due</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredBookings.map((bk: Booking) => {
                const calculatedBalance = bk.totalAmount - bk.advanceReceived;
                return (
                  <tr key={bk.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5 font-extrabold text-slate-900">{bk.bookingId}</td>
                    <td className="py-4 px-5">
                      <span className="font-bold text-slate-900 block">{bk.customerName}</span>
                      <a href={`tel:${bk.customerPhone}`} className="text-emerald-600 hover:underline flex items-center gap-1 text-[11px] mt-0.5">
                        <Phone className="w-3 h-3 flex-shrink-0" /> +91 {bk.customerPhone}
                      </a>
                    </td>
                    <td className="py-4 px-5">
                      <span className="font-extrabold text-emerald-800 block">{bk.destination}</span>
                      <span className="text-[11px] text-slate-500">{bk.travelStartDate} → {bk.travelEndDate}</span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="font-semibold text-slate-800 block">{bk.hotelName || 'Selected Srinagar Hotel'}</span>
                      <span className="text-[11px] text-slate-400 block">{bk.vehicle || 'Innova Crysta'} • {bk.rooms} Rooms</span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="font-extrabold text-slate-900 block">₹{bk.totalAmount.toLocaleString()}</span>
                      <span className="text-[11px] text-emerald-700 font-semibold block">Adv: ₹{bk.advanceReceived.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`font-extrabold text-sm block ${
                        calculatedBalance > 0 ? 'text-amber-600' : 'text-emerald-600'
                      }`}>
                        ₹{calculatedBalance < 0 ? 0 : calculatedBalance.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold block w-fit mb-1 ${
                        bk.bookingStatus === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                        bk.bookingStatus === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {bk.bookingStatus}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                        bk.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700' :
                        bk.paymentStatus === 'Partial' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        Payment: {bk.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleOpenModal(bk)}
                          title="Edit Booking"
                          className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
                        >
                          <Edit2 className="w-4 h-4 flex-shrink-0" />
                        </button>
                        <button
                          onClick={() => deleteBooking(bk.id)}
                          title="Delete Booking"
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-4 h-4 flex-shrink-0" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 font-serif">
                {editingBooking ? `Edit Booking ${editingBooking.bookingId}` : 'Create New Kashmir Tour Booking'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-900">
                <X className="w-6 h-6 flex-shrink-0" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Select Existing Customer OR Enter Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Customer Name"
                    value={formData.customerName}
                    onChange={e => {
                      setFormData({ ...formData, customerName: e.target.value });
                      handleCustomerSelect(e.target.value);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Customer Phone / Mobile *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit Mobile"
                    value={formData.customerPhone}
                    onChange={e => setFormData({ ...formData, customerPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Destination</label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={e => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Travel Start Date</label>
                  <input
                    type="date"
                    value={formData.travelStartDate}
                    onChange={e => setFormData({ ...formData, travelStartDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Travel End Date</label>
                  <input
                    type="date"
                    value={formData.travelEndDate}
                    onChange={e => setFormData({ ...formData, travelEndDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Adults</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.numAdults}
                    onChange={e => setFormData({ ...formData, numAdults: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Children</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.numChildren}
                    onChange={e => setFormData({ ...formData, numChildren: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Number of Rooms</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.rooms}
                    onChange={e => setFormData({ ...formData, rooms: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assign Hotel Stays</label>
                  <select
                    value={formData.hotelName}
                    onChange={e => setFormData({ ...formData, hotelName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    {hotels.map(h => (
                      <option key={h.id} value={h.hotelName}>{h.hotelName} ({h.location})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assign Transport / Cab</label>
                  <select
                    value={formData.vehicle}
                    onChange={e => setFormData({ ...formData, vehicle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    {transports.map(t => (
                      <option key={t.id} value={t.vehicleName}>{t.vehicleName} ({t.vehicleNumber})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Automatic Financial Calculations */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
                  Payment Calculation & Status (Auto Calculated)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Total Package Price (₹)</label>
                    <input
                      type="number"
                      value={formData.totalAmount}
                      onChange={e => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Advance Received (₹)</label>
                    <input
                      type="number"
                      value={formData.advanceReceived}
                      onChange={e => setFormData({ ...formData, advanceReceived: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold text-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Balance Receivable (Auto)</label>
                    <div className="px-3 py-2 rounded-xl bg-white border border-slate-200 font-extrabold text-slate-900">
                      ₹{(formData.totalAmount - formData.advanceReceived) < 0 ? 0 : (formData.totalAmount - formData.advanceReceived).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Booking Status</label>
                    <select
                      value={formData.bookingStatus}
                      onChange={e => setFormData({ ...formData, bookingStatus: e.target.value as BookingStatus })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-semibold"
                    >
                      <option value="Inquiry">Inquiry</option>
                      <option value="Tentative">Tentative</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Payment Status</label>
                    <select
                      value={formData.paymentStatus}
                      onChange={e => setFormData({ ...formData, paymentStatus: e.target.value as PaymentStatus })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-semibold"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Partial">Partial</option>
                      <option value="Paid">Paid</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Booking Notes</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Notes regarding flight details, arrival timing, special requests..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                />
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
                  {editingBooking ? 'Save Booking' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
