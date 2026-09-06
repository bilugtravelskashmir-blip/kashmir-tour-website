import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Package as PackageType, ItineraryDay } from '../../types';
import {
  Package,
  Search,
  Plus,
  Edit2,
  Trash2,
  Copy,
  Clock,
  MapPin,
  CheckCircle2,
  X,
  Building,
  Car,
  Image as ImageIcon
} from 'lucide-react';

interface PackagesManagePageProps {
  navigate: (path: string) => void;
}

export const PackagesManagePage: React.FC<PackagesManagePageProps> = ({ navigate }) => {
  const { packages, addPackage, updatePackage, deletePackage, duplicatePackage } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageType | null>(null);

  const initialPackageForm = {
    packageName: '',
    destination: 'Srinagar - Gulmarg - Pahalgam',
    duration: '5 Nights / 6 Days',
    numNights: 5,
    numDays: 6,
    hotelCategory: '4 Star Luxury',
    mealPlan: 'MAP (Breakfast & Dinner)',
    transportation: 'Innova Crysta',
    price: 25000,
    description: '',
    status: 'Active' as 'Active' | 'Inactive',
    isPopular: false,
    images: ['https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80'],
    inclusions: [
      '01 Night Luxury Houseboat Stay in Dal Lake',
      'Daily Breakfast & Dinner',
      'Shikara Ride in Dal Lake',
      'Private Innova Crysta for all transfers'
    ],
    exclusions: [
      'Airfare / Train fare',
      'Gondola ride tickets',
      'Union Cabs in Pahalgam'
    ],
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival Srinagar & Houseboat Check-in',
        destination: 'Srinagar',
        description: 'Warm welcome at Srinagar Airport. Transfer to luxury houseboat.',
        sightseeing: ['Dal Lake', 'Shikara Ride'],
        hotel: 'Dal Lake Luxury Houseboat',
        meals: 'Dinner'
      }
    ] as ItineraryDay[]
  };

  const [formData, setFormData] = useState(initialPackageForm);

  const handleOpenModal = (pkg?: PackageType) => {
    if (pkg) {
      setEditingPackage(pkg);
      setFormData({
        packageName: pkg.packageName,
        destination: pkg.destination,
        duration: pkg.duration,
        numNights: pkg.numNights,
        numDays: pkg.numDays,
        hotelCategory: pkg.hotelCategory,
        mealPlan: pkg.mealPlan,
        transportation: pkg.transportation,
        price: pkg.price,
        description: pkg.description,
        status: pkg.status,
        isPopular: pkg.isPopular || false,
        images: pkg.images.length > 0 ? pkg.images : initialPackageForm.images,
        inclusions: pkg.inclusions,
        exclusions: pkg.exclusions,
        itinerary: pkg.itinerary
      });
    } else {
      setEditingPackage(null);
      setFormData(initialPackageForm);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.packageName) return;

    if (editingPackage) {
      updatePackage(editingPackage.id, formData);
    } else {
      addPackage(formData);
    }
    setIsModalOpen(false);
  };

  const handleAddItineraryDay = () => {
    const nextDayNum = formData.itinerary.length + 1;
    setFormData({
      ...formData,
      itinerary: [
        ...formData.itinerary,
        {
          dayNumber: nextDayNum,
          title: `Day ${nextDayNum} Sightseeing`,
          destination: 'Srinagar',
          description: 'Explore local sights and scenic spots.',
          hotel: 'Srinagar Hotel',
          meals: 'Breakfast & Dinner'
        }
      ]
    });
  };

  const handleRemoveItineraryDay = (index: number) => {
    const updated = formData.itinerary.filter((_, i) => i !== index).map((day, i) => ({
      ...day,
      dayNumber: i + 1
    }));
    setFormData({ ...formData, itinerary: updated });
  };

  const filteredPackages = packages.filter((pkg: PackageType) => {
    return (
      pkg.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-8 pb-12 max-w-full overflow-x-hidden">

      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-serif flex items-center gap-2">
            <Package className="w-7 h-7 text-emerald-600 flex-shrink-0" />
            <span>Kashmir Tour Package Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create and edit master package templates, set pricing, build day-wise itineraries, inclusions, and exclusions.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-2xl transition-all shadow-md flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          <span>Add New Package</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="relative w-full max-w-md">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search package name or destination..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Package Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg: PackageType) => (
          <div key={pkg.id} className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
            <div className="p-6 space-y-4">
              <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100">
                <img src={pkg.images[0]} alt={pkg.packageName} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {pkg.duration}
                </span>
                <span className={`absolute top-3 right-3 text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                  pkg.status === 'Active' ? 'bg-emerald-600 text-white' : 'bg-slate-400 text-white'
                }`}>
                  {pkg.status}
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-emerald-700 block">{pkg.destination}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{pkg.packageName}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{pkg.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Hotel Category</span>
                  <span className="font-bold text-slate-800">{pkg.hotelCategory}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Price</span>
                  <span className="font-extrabold text-slate-900">₹{pkg.price.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => duplicatePackage(pkg.id)}
                className="text-xs font-bold text-slate-700 hover:text-emerald-600 flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5 flex-shrink-0" /> Duplicate
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleOpenModal(pkg)}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <Edit2 className="w-4 h-4 flex-shrink-0" />
                </button>
                <button
                  onClick={() => deletePackage(pkg.id)}
                  className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4 flex-shrink-0" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Package Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 font-serif">
                {editingPackage ? 'Edit Tour Package' : 'Create New Tour Package'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-900">
                <X className="w-6 h-6 flex-shrink-0" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Package Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.packageName}
                    onChange={e => setFormData({ ...formData, packageName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Destination Circuit</label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={e => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration Text</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hotel Category</label>
                  <input
                    type="text"
                    value={formData.hotelCategory}
                    onChange={e => setFormData({ ...formData, hotelCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Vehicle Included</label>
                  <input
                    type="text"
                    value={formData.transportation}
                    onChange={e => setFormData({ ...formData, transportation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Price per Person (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Package Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                />
              </div>

              {/* Day wise builder */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Day-Wise Itinerary Template ({formData.itinerary.length} Days)
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddItineraryDay}
                    className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5 flex-shrink-0" /> Add Day
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.itinerary.map((day, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-700">Day {day.dayNumber}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveItineraryDay(idx)}
                          className="text-rose-600 hover:text-rose-800 text-xs font-semibold"
                        >
                          Delete Day
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Day Title"
                          value={day.title}
                          onChange={e => {
                            const updated = [...formData.itinerary];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, itinerary: updated });
                          }}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold"
                        />
                        <input
                          type="text"
                          placeholder="Destination"
                          value={day.destination}
                          onChange={e => {
                            const updated = [...formData.itinerary];
                            updated[idx].destination = e.target.value;
                            setFormData({ ...formData, itinerary: updated });
                          }}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Day Description"
                        value={day.description}
                        onChange={e => {
                          const updated = [...formData.itinerary];
                          updated[idx].description = e.target.value;
                          setFormData({ ...formData, itinerary: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs resize-none"
                      />
                    </div>
                  ))}
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
                  {editingPackage ? 'Save Package' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
