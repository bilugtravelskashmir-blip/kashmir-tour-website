import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Lead, LeadStatus, LeadPriority } from '../../types';
import {
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Phone,
  Mail,
  Calendar,
  IndianRupee,
  UserCheck,
  CalendarCheck,
  X,
  Filter,
  MessageSquare
} from 'lucide-react';

interface LeadsPageProps {
  navigate: (path: string) => void;
}

export const LeadsPage: React.FC<LeadsPageProps> = ({ navigate }) => {
  const { leads, addLead, updateLead, deleteLead, convertLeadToCustomerAndBooking, settings } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const initialFormState = {
    customerName: '',
    mobile: '',
    whatsapp: '',
    email: '',
    destination: 'Srinagar - Gulmarg - Pahalgam',
    travelDate: new Date().toISOString().split('T')[0],
    pax: 2,
    budget: 50000,
    leadSource: 'Website',
    status: 'New' as LeadStatus,
    priority: 'High' as LeadPriority,
    assignedTo: settings.directorName,
    followUpDate: '',
    notes: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenModal = (lead?: Lead) => {
    if (lead) {
      setEditingLead(lead);
      setFormData({
        customerName: lead.customerName,
        mobile: lead.mobile,
        whatsapp: lead.whatsapp || '',
        email: lead.email || '',
        destination: lead.destination,
        travelDate: lead.travelDate,
        pax: lead.pax,
        budget: lead.budget,
        leadSource: lead.leadSource,
        status: lead.status,
        priority: lead.priority,
        assignedTo: lead.assignedTo,
        followUpDate: lead.followUpDate || '',
        notes: lead.notes || ''
      });
    } else {
      setEditingLead(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.mobile) return;

    if (editingLead) {
      updateLead(editingLead.id, formData);
    } else {
      addLead(formData);
    }
    setIsModalOpen(false);
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.mobile.includes(searchTerm) ||
                          l.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.leadId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || l.status === selectedStatus;
    const matchesPriority = selectedPriority === 'All' || l.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const leadStatuses: LeadStatus[] = [
    'New',
    'Contacted',
    'Follow-up',
    'Quotation Sent',
    'Negotiation',
    'Confirmed',
    'Lost',
    'Cancelled'
  ];

  return (
    <div className="space-y-8 pb-12 max-w-full overflow-x-hidden">

      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-serif flex items-center gap-2">
            <Users className="w-7 h-7 text-emerald-600 flex-shrink-0" />
            <span>Kashmir Lead Management System</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track inquiries, set follow-up schedules, send quotes, and convert leads into confirmed tour bookings.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-2xl transition-all shadow-md flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          <span>Add New Lead</span>
        </button>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by lead ID, name, mobile or destination..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="text-xs font-semibold text-slate-600">Status:</span>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white text-slate-800"
            >
              <option value="All">All Statuses</option>
              {leadStatuses.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-600">Priority:</span>
            <select
              value={selectedPriority}
              onChange={e => setSelectedPriority(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white text-slate-800"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Desktop Table & Mobile Cards */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden max-w-full">

        {/* Desktop View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-4 px-5">Lead ID</th>
                <th className="py-4 px-5">Customer Name & Phone</th>
                <th className="py-4 px-5">Destination & Pax</th>
                <th className="py-4 px-5">Travel Date & Budget</th>
                <th className="py-4 px-5">Source & Priority</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-center">Actions & Convert</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredLeads.map((ld: Lead) => (
                <tr key={ld.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-5 font-bold text-slate-900">{ld.leadId}</td>
                  <td className="py-4 px-5">
                    <span className="font-extrabold text-slate-900 block">{ld.customerName}</span>
                    <a href={`tel:${ld.mobile}`} className="text-emerald-600 hover:underline flex items-center gap-1 text-[11px] mt-0.5">
                      <Phone className="w-3 h-3 flex-shrink-0" /> +91 {ld.mobile}
                    </a>
                  </td>
                  <td className="py-4 px-5">
                    <span className="font-bold text-emerald-800 block">{ld.destination}</span>
                    <span className="text-[11px] text-slate-400">{ld.pax} Passengers</span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-slate-800 block">{ld.travelDate}</span>
                    <span className="font-extrabold text-slate-900">₹{ld.budget.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-[10px] font-bold block w-fit">
                      {ld.leadSource}
                    </span>
                    <span className={`text-[10px] font-bold block mt-1 ${
                      ld.priority === 'High' ? 'text-rose-600' : 'text-amber-600'
                    }`}>
                      {ld.priority} Priority
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <select
                      value={ld.status}
                      onChange={e => updateLead(ld.id, { status: e.target.value as LeadStatus })}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold border border-slate-200 focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      {leadStatuses.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-4 px-5 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => convertLeadToCustomerAndBooking(ld.id)}
                        title="Convert Lead to Booking"
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
                      >
                        <UserCheck className="w-4 h-4 flex-shrink-0" />
                      </button>
                      <button
                        onClick={() => handleOpenModal(ld)}
                        title="Edit Lead"
                        className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
                      >
                        <Edit2 className="w-4 h-4 flex-shrink-0" />
                      </button>
                      <button
                        onClick={() => deleteLead(ld.id)}
                        title="Delete Lead"
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

        {/* Mobile View Cards */}
        <div className="lg:hidden p-4 space-y-4">
          {filteredLeads.map((ld: Lead) => (
            <div key={ld.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 block">{ld.leadId}</span>
                  <h3 className="text-base font-bold text-slate-900">{ld.customerName}</h3>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                  {ld.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block">Phone:</span>
                  <a href={`tel:${ld.mobile}`} className="font-bold text-emerald-600">+91 {ld.mobile}</a>
                </div>
                <div>
                  <span className="text-slate-400 block">Destination:</span>
                  <span className="font-bold text-slate-900">{ld.destination}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Travel Date:</span>
                  <span className="font-semibold text-slate-800">{ld.travelDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Budget:</span>
                  <span className="font-extrabold text-slate-900">₹{ld.budget.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => convertLeadToCustomerAndBooking(ld.id)}
                  className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1"
                >
                  <UserCheck className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Convert to Booking</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOpenModal(ld)}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700"
                  >
                    <Edit2 className="w-4 h-4 flex-shrink-0" />
                  </button>
                  <button
                    onClick={() => deleteLead(ld.id)}
                    className="p-2 rounded-xl bg-rose-50 text-rose-600"
                  >
                    <Trash2 className="w-4 h-4 flex-shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Add / Edit Lead Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 font-serif">
                {editingLead ? 'Edit Kashmir Lead' : 'Add New Kashmir Inquiry'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-900"
              >
                <X className="w-6 h-6 flex-shrink-0" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={e => setFormData({ ...formData, customerName: e.target.value })}
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
                  <label className="block font-semibold text-slate-700 mb-1">WhatsApp Number</label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Destination Choice</label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={e => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Travel Date</label>
                  <input
                    type="date"
                    value={formData.travelDate}
                    onChange={e => setFormData({ ...formData, travelDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pax (Travelers)</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.pax}
                    onChange={e => setFormData({ ...formData, pax: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Budget (₹)</label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={e => setFormData({ ...formData, budget: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Lead Source</label>
                  <select
                    value={formData.leadSource}
                    onChange={e => setFormData({ ...formData, leadSource: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="Website">Website</option>
                    <option value="WhatsApp">WhatsApp Direct</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="B2B Agent">B2B Agent Referral</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={e => setFormData({ ...formData, priority: e.target.value as LeadPriority })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notes & Follow-up Details</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Enter guest requirements, flight arrival time, hotel preference..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md"
                >
                  {editingLead ? 'Save Changes' : 'Create Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
