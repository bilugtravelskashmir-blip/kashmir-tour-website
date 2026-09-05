import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle,
  FileSpreadsheet,
  Printer,
  Calendar,
  Filter
} from 'lucide-react';

interface ReportsPageProps {
  navigate: (path: string) => void;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ navigate }) => {
  const { bookings, leads, customers, settings } = useData();

  const [dateRange, setDateRange] = useState('This Month');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Metrics
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.bookingStatus === 'Confirmed').length;
  const completedBookings = bookings.filter(b => b.bookingStatus === 'Completed').length;
  const cancelledBookings = bookings.filter(b => b.bookingStatus === 'Cancelled').length;

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalAdvance = bookings.reduce((sum, b) => sum + b.advanceReceived, 0);
  const totalBalance = bookings.reduce((sum, b) => sum + b.balanceAmount, 0);

  const totalLeads = leads.length;
  const convertedLeads = leads.filter(l => l.status === 'Confirmed').length;
  const leadConversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  const handleExportCSV = () => {
    const csvRows = [
      ['Booking ID', 'Customer', 'Destination', 'Total Amount', 'Advance', 'Balance', 'Booking Status', 'Payment Status'],
      ...bookings.map(b => [
        b.bookingId,
        `"${b.customerName}"`,
        `"${b.destination}"`,
        b.totalAmount,
        b.advanceReceived,
        b.balanceAmount,
        b.bookingStatus,
        b.paymentStatus
      ])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BiluGTravels_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-16 max-w-full overflow-x-hidden">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs print:hidden">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-serif flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-emerald-600 flex-shrink-0" />
            <span>Business Reports & Financial Analytics</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track total Kashmir bookings, revenue collection, lead conversion percentages, and pending receivables.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            <FileSpreadsheet className="w-4 h-4 flex-shrink-0" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            <Printer className="w-4 h-4 flex-shrink-0" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div className="flex items-center space-x-3">
          <Calendar className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <span className="text-xs font-semibold text-slate-700">Timeframe:</span>
          <select
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
            <option>Year 2025</option>
            <option>All Time</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <span className="text-xs font-semibold text-slate-700">Status Filter:</span>
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
          >
            <option value="All">All Bookings</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Inquiry">Inquiry</option>
          </select>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Sales Revenue</span>
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">₹{totalRevenue.toLocaleString()}</div>
          <p className="text-[11px] text-slate-500">Gross revenue across all Kashmir tours</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Advance Collected</span>
            <CheckCircle className="w-5 h-5 text-sky-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-sky-700">₹{totalAdvance.toLocaleString()}</div>
          <p className="text-[11px] text-slate-500">Received advance payment from guests</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Balance Receivable</span>
            <TrendingUp className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">₹{totalBalance.toLocaleString()}</div>
          <p className="text-[11px] text-slate-500">Pending balance upon arrival in Srinagar</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lead Conversion Rate</span>
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-indigo-700">{leadConversionRate}%</div>
          <p className="text-[11px] text-slate-500">{convertedLeads} confirmed out of {totalLeads} total leads</p>
        </div>
      </div>

      {/* Detailed Tables */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900 font-serif">Booking Financial Ledger Report</h3>
          <span className="text-xs text-slate-500 font-semibold">{bookings.length} Records Total</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-extrabold uppercase text-slate-400 border-b border-slate-100">
                <th className="py-4 px-6">Booking ID</th>
                <th className="py-4 px-6">Guest Name</th>
                <th className="py-4 px-6">Destination</th>
                <th className="py-4 px-6 text-right">Total Amount</th>
                <th className="py-4 px-6 text-right">Advance Received</th>
                <th className="py-4 px-6 text-right">Balance Due</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {bookings.map(b => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">{b.bookingId}</td>
                  <td className="py-4 px-6 font-semibold">{b.customerName}</td>
                  <td className="py-4 px-6">{b.destination}</td>
                  <td className="py-4 px-6 text-right font-extrabold text-slate-900">₹{b.totalAmount.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right font-bold text-emerald-700">₹{b.advanceReceived.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right font-bold text-amber-600">₹{b.balanceAmount.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      b.bookingStatus === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                      b.bookingStatus === 'Completed' ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {b.bookingStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
