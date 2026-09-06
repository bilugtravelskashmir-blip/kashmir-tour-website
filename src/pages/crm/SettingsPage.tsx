import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { CompanySettings } from '../../types';
import {
  Settings,
  Building,
  CreditCard,
  FileText,
  Save,
  CheckCircle
} from 'lucide-react';

interface SettingsPageProps {
  navigate: (path: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ navigate }) => {
  const { settings, updateSettings } = useData();

  const [form, setForm] = useState<CompanySettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-16 max-w-full overflow-x-hidden">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-serif flex items-center gap-2">
            <Settings className="w-7 h-7 text-emerald-600 flex-shrink-0" />
            <span>Company Profile & Document Settings</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Update director contact details, phone numbers, Srinagar office address, bank account for advance deposits, and document terms.
          </p>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold px-4 py-2 rounded-2xl flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> Settings Saved!
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Section 1: Company Profile */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building className="w-5 h-5 text-emerald-600" />
            <span>Company Branding & Contact Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Company Name</label>
              <input
                type="text"
                required
                value={form.companyName}
                onChange={e => setForm({ ...form, companyName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Director Name</label>
              <input
                type="text"
                required
                value={form.directorName}
                onChange={e => setForm({ ...form, directorName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Primary Mobile (Direct / Calls)</label>
              <input
                type="text"
                required
                value={form.phoneNumbers[0] || '6006070550'}
                onChange={e => {
                  const updated = [...form.phoneNumbers];
                  updated[0] = e.target.value;
                  setForm({ ...form, phoneNumbers: updated });
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Secondary Mobile / WhatsApp</label>
              <input
                type="text"
                value={form.phoneNumbers[1] || '7889408220'}
                onChange={e => {
                  const updated = [...form.phoneNumbers];
                  updated[1] = e.target.value;
                  setForm({ ...form, phoneNumbers: updated });
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Srinagar Office Address</label>
              <input
                type="text"
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">GST Registration Number</label>
              <input
                type="text"
                value={form.gstNumber || ''}
                onChange={e => setForm({ ...form, gstNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none uppercase font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Bank Details */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2 border-b border-slate-100 pb-3">
            <CreditCard className="w-5 h-5 text-emerald-600" />
            <span>Official Bank Account (Printed on Guest Itineraries)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Account Beneficiary Name</label>
              <input
                type="text"
                value={form.bankDetails?.accountName || ''}
                onChange={e => setForm({
                  ...form,
                  bankDetails: {
                    accountName: e.target.value,
                    bankName: form.bankDetails?.bankName || '',
                    accountNumber: form.bankDetails?.accountNumber || '',
                    ifscCode: form.bankDetails?.ifscCode || '',
                    branch: form.bankDetails?.branch || ''
                  }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Bank Name</label>
              <input
                type="text"
                value={form.bankDetails?.bankName || ''}
                onChange={e => setForm({
                  ...form,
                  bankDetails: {
                    accountName: form.bankDetails?.accountName || '',
                    bankName: e.target.value,
                    accountNumber: form.bankDetails?.accountNumber || '',
                    ifscCode: form.bankDetails?.ifscCode || '',
                    branch: form.bankDetails?.branch || ''
                  }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Bank Account Number</label>
              <input
                type="text"
                value={form.bankDetails?.accountNumber || ''}
                onChange={e => setForm({
                  ...form,
                  bankDetails: {
                    accountName: form.bankDetails?.accountName || '',
                    bankName: form.bankDetails?.bankName || '',
                    accountNumber: e.target.value,
                    ifscCode: form.bankDetails?.ifscCode || '',
                    branch: form.bankDetails?.branch || ''
                  }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">IFSC Code</label>
              <input
                type="text"
                value={form.bankDetails?.ifscCode || ''}
                onChange={e => setForm({
                  ...form,
                  bankDetails: {
                    accountName: form.bankDetails?.accountName || '',
                    bankName: form.bankDetails?.bankName || '',
                    accountNumber: form.bankDetails?.accountNumber || '',
                    ifscCode: e.target.value,
                    branch: form.bankDetails?.branch || ''
                  }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono uppercase"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Branch Name</label>
              <input
                type="text"
                value={form.bankDetails?.branch || ''}
                onChange={e => setForm({
                  ...form,
                  bankDetails: {
                    accountName: form.bankDetails?.accountName || '',
                    bankName: form.bankDetails?.bankName || '',
                    accountNumber: form.bankDetails?.accountNumber || '',
                    ifscCode: form.bankDetails?.ifscCode || '',
                    branch: e.target.value
                  }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Terms */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2 border-b border-slate-100 pb-3">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>Document Quotation Terms & Conditions</span>
          </h3>

          <div>
            <textarea
              rows={5}
              value={form.defaultTerms.join('\n')}
              onChange={e => setForm({ ...form, defaultTerms: e.target.value.split('\n') })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs sm:text-sm font-sans"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-lg flex items-center gap-2 text-sm"
          >
            <Save className="w-5 h-5 flex-shrink-0" />
            <span>Save Company Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
};
