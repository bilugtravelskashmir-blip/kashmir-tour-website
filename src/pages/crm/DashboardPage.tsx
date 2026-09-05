import React from 'react';
import { useData } from '../../context/DataContext';
import {
  Users,
  UserCheck,
  CalendarCheck,
  PlaneTakeoff,
  IndianRupee,
  Clock,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  PlusCircle,
  FileText
} from 'lucide-react';
import { Lead, Booking } from '../../types';

interface DashboardPageProps {
  navigate: (path: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ navigate }) => {
  const { leads, customers, bookings, settings } = useData();

  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const confirmedBookings = bookings.filter(b => b.bookingStatus === 'Confirmed' || b.bookingStatus === 'Completed').length;
  const upcomingTrips = bookings.filter(b => new Date(b.travelStartDate) >= new Date() && b.bookingStatus !== 'Cancelled').length;
  const totalCustomers = customers.length;

  const totalRevenue = bookings.reduce((sum, b) => b.bookingStatus !== 'Cancelled' ? sum + b.totalAmount : sum, 0);
  const totalAdvance = bookings.reduce((sum, b) => b.bookingStatus !== 'Cancelled' ? sum + b.advanceReceived : sum, 0);
  const pendingPayments = bookings.reduce((sum, b) => b.bookingStatus !== 'Cancelled' ? sum + b.balanceAmount : sum, 0);

  const kpis = [
    { label: 'Total Leads', value: totalLeads, sub: `${newLeads} New Pending`, icon: Users, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { label: 'Confirmed Bookings', value: confirmedBookings, sub: `${upcomingTrips} Upcoming Trips`, icon: CalendarCheck, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { label: 'Total Customers', value: totalCustomers, sub: 'Registered Clients', icon: UserCheck, color: 'text-violet-600 bg-violet-50 border-violet-200' },
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, sub: `₹${totalAdvance.toLocaleString()} Received`, icon: IndianRupee, color: 'text-slate-900 bg-slate-100 border-slate-300' },
    { label: 'Balance Receivable', value: `₹${pendingPayments.toLocaleString()}`, sub: 'Pending Collection', icon: AlertCircle, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  ];

  const recentLeads = leads.slice(0, 5);
  const recentBookings = bookings.slice(0, 5);
  const upcomingTripList = bookings.filter(b => b.bookingStatus !== 'Cancelled').slice(0, 4);

  return (
    <div className="space-y-8 pb-12 max-w-full overflow-x-hidden">

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            Internal Operations Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif mt-2">
            Bilu G Travels Executive Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Welcome, <span className="font-semibold text-white">{settings.directorName}</span> | Kashmir DMC Management Console
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate('/itinerary-builder')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 flex-shrink-0" />
            <span>Create Itinerary</span>
          </button>
          <button
            onClick={() => navigate('/leads')}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition-all flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Manage Leads</span>
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className={`rounded-3xl p-5 border shadow-xs bg-white space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{kpi.label}</span>
                <div className={`p-2.5 rounded-2xl ${kpi.color}`}>
                  <Icon className="w-5 h-5 flex-shrink-0" />
                </div>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block tracking-tight">
                  {kpi.value}
                </span>
                <span className="text-[11px] font-medium text-slate-500 block mt-0.5">
                  {kpi.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Charts & Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Revenue & Booking Distribution Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Monthly Booking Revenue Performance</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Real-time revenue tracking across current season</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              FY 2025-26
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { month: 'March 2025', revenue: 183000, target: 200000, percentage: 91 },
              { month: 'April 2025 (Forecast)', revenue: 240000, target: 250000, percentage: 96 },
              { month: 'May 2025 (Peak Season)', revenue: 310000, target: 300000, percentage: 100 },
            ].map((m, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{m.month}</span>
                  <span>₹{m.revenue.toLocaleString()} / Target ₹{m.target.toLocaleString()} ({m.percentage}%)</span>
                </div>
                <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all duration-1000"
                    style={{ width: `${m.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
            <div className="bg-slate-50 p-3 rounded-2xl">
              <span className="text-slate-400 block font-medium">Confirmed Total</span>
              <span className="text-base font-bold text-slate-900 mt-0.5 block">₹{totalRevenue.toLocaleString()}</span>
            </div>
            <div className="bg-emerald-50 p-3 rounded-2xl">
              <span className="text-emerald-700 block font-medium">Advance Received</span>
              <span className="text-base font-bold text-emerald-800 mt-0.5 block">₹{totalAdvance.toLocaleString()}</span>
            </div>
            <div className="bg-amber-50 p-3 rounded-2xl">
              <span className="text-amber-800 block font-medium">Balance Pending</span>
              <span className="text-base font-bold text-amber-900 mt-0.5 block">₹{pendingPayments.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Lead Status Conversion Summary */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Lead Pipeline Status</h3>
            <p className="text-xs text-slate-500 mt-0.5">Distribution of lead stages</p>
          </div>

          <div className="space-y-3">
            {[
              { status: 'New', count: leads.filter(l => l.status === 'New').length, color: 'bg-blue-500' },
              { status: 'Follow-up', count: leads.filter(l => l.status === 'Follow-up').length, color: 'bg-amber-500' },
              { status: 'Quotation Sent', count: leads.filter(l => l.status === 'Quotation Sent').length, color: 'bg-violet-500' },
              { status: 'Confirmed', count: leads.filter(l => l.status === 'Confirmed').length, color: 'bg-emerald-500' },
            ].map((st, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center space-x-2.5">
                  <span className={`w-3 h-3 rounded-full ${st.color}`} />
                  <span className="text-xs font-semibold text-slate-700">{st.status}</span>
                </div>
                <span className="text-xs font-extrabold text-slate-900">{st.count} Leads</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/leads')}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-2xl transition-all flex items-center justify-center gap-1"
          >
            <span>Open Leads Pipeline</span>
            <ChevronRight className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          </button>
        </div>

      </div>

      {/* Upcoming Kashmir Trips */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <PlaneTakeoff className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>Upcoming Kashmir Trips & On-Ground Operations</span>
            </h3>
            <p className="text-xs text-slate-500">Guests arriving in Srinagar soon</p>
          </div>
          <button
            onClick={() => navigate('/bookings')}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>View All Bookings</span>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
          </button>
        </div>

        {/* Responsive Table / Cards */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 min-w-[700px]">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px] border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Travel Dates</th>
                <th className="py-3 px-4">Pax / Vehicle</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4 text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {upcomingTripList.map((bk: Booking) => (
                <tr key={bk.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{bk.bookingId}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-900 block">{bk.customerName}</span>
                    <span className="text-[11px] text-slate-400">{bk.customerPhone}</span>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">{bk.destination}</td>
                  <td className="py-3.5 px-4">
                    <span>{bk.travelStartDate}</span> to <span>{bk.travelEndDate}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span>{bk.numAdults} Adults, {bk.numChildren} Kids</span>
                    <span className="block text-[11px] text-slate-400">{bk.vehicle}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      bk.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                      bk.paymentStatus === 'Partial' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {bk.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-extrabold text-slate-900">
                    ₹{bk.balanceAmount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Leads & Bookings Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Recent Leads */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Recent Customer Inquiries</h3>
            <button
              onClick={() => navigate('/leads')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
            >
              View Leads →
            </button>
          </div>

          <div className="space-y-3">
            {recentLeads.map((ld: Lead) => (
              <div key={ld.id} className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{ld.customerName}</h4>
                  <p className="text-xs text-slate-500">{ld.destination} • {ld.pax} Pax • {ld.travelDate}</p>
                </div>
                <span className="text-[10px] bg-slate-200 text-slate-800 font-bold px-2.5 py-1 rounded-full">
                  {ld.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Recent Tour Bookings</h3>
            <button
              onClick={() => navigate('/bookings')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
            >
              View Bookings →
            </button>
          </div>

          <div className="space-y-3">
            {recentBookings.map((bk: Booking) => (
              <div key={bk.id} className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{bk.bookingId}</span>
                    <span className="text-xs text-slate-600">• {bk.customerName}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">₹{bk.totalAmount.toLocaleString()} Total • Advance ₹{bk.advanceReceived.toLocaleString()}</p>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                  {bk.bookingStatus}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
