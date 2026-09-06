import React, { createContext, useContext, useState, useEffect } from 'react';
import { Customer, Lead, Booking, Package, Hotel, Transport, Itinerary, CompanySettings } from '../types';
import {
  initialCompanySettings,
  initialPackages,
  initialCustomers,
  initialLeads,
  initialBookings,
  initialHotels,
  initialTransport,
  initialItineraries
} from '../data/sampleData';

interface DataContextType {
  settings: CompanySettings;
  updateSettings: (newSettings: CompanySettings) => void;

  packages: Package[];
  addPackage: (pkg: Omit<Package, 'id'>) => void;
  updatePackage: (id: string, pkg: Partial<Package>) => void;
  deletePackage: (id: string) => void;
  duplicatePackage: (id: string) => void;

  customers: Customer[];
  addCustomer: (cust: Omit<Customer, 'id' | 'createdDate'>) => Customer;
  updateCustomer: (id: string, cust: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;

  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'leadId' | 'createdDate'>) => void;
  updateLead: (id: string, lead: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  convertLeadToCustomerAndBooking: (leadId: string) => void;

  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'bookingId' | 'createdDate' | 'balanceAmount'>) => void;
  updateBooking: (id: string, booking: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;

  hotels: Hotel[];
  addHotel: (hotel: Omit<Hotel, 'id'>) => void;
  updateHotel: (id: string, hotel: Partial<Hotel>) => void;
  deleteHotel: (id: string) => void;

  transports: Transport[];
  addTransport: (transport: Omit<Transport, 'id'>) => void;
  updateTransport: (id: string, transport: Partial<Transport>) => void;
  deleteTransport: (id: string) => void;

  itineraries: Itinerary[];
  addItinerary: (itinerary: Omit<Itinerary, 'id' | 'itineraryId' | 'createdDate'>) => Itinerary;
  updateItinerary: (id: string, itinerary: Partial<Itinerary>) => void;
  deleteItinerary: (id: string) => void;
  duplicateItinerary: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'bilug_settings',
  PACKAGES: 'bilug_packages',
  CUSTOMERS: 'bilug_customers',
  LEADS: 'bilug_leads',
  BOOKINGS: 'bilug_bookings',
  HOTELS: 'bilug_hotels',
  TRANSPORTS: 'bilug_transports',
  ITINERARIES: 'bilug_itineraries'
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<CompanySettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : initialCompanySettings;
  });

  const [packages, setPackages] = useState<Package[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PACKAGES);
    return saved ? JSON.parse(saved) : initialPackages;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
    return saved ? JSON.parse(saved) : initialLeads;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [hotels, setHotels] = useState<Hotel[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HOTELS);
    return saved ? JSON.parse(saved) : initialHotels;
  });

  const [transports, setTransports] = useState<Transport[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRANSPORTS);
    return saved ? JSON.parse(saved) : initialTransport;
  });

  const [itineraries, setItineraries] = useState<Itinerary[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ITINERARIES);
    return saved ? JSON.parse(saved) : initialItineraries;
  });

  // Local storage auto-sync
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages)); }, [packages]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads)); }, [leads]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.HOTELS, JSON.stringify(hotels)); }, [hotels]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.TRANSPORTS, JSON.stringify(transports)); }, [transports]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ITINERARIES, JSON.stringify(itineraries)); }, [itineraries]);

  // Actions
  const updateSettings = (newSettings: CompanySettings) => setSettings(newSettings);

  const addPackage = (pkg: Omit<Package, 'id'>) => {
    const newPkg: Package = { ...pkg, id: 'pkg-' + Date.now() };
    setPackages(prev => [newPkg, ...prev]);
  };

  const updatePackage = (id: string, updated: Partial<Package>) => {
    setPackages(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deletePackage = (id: string) => {
    setPackages(prev => prev.filter(p => p.id !== id));
  };

  const duplicatePackage = (id: string) => {
    const target = packages.find(p => p.id === id);
    if (target) {
      const duplicated: Package = {
        ...target,
        id: 'pkg-' + Date.now(),
        packageName: `${target.packageName} (Copy)`
      };
      setPackages(prev => [duplicated, ...prev]);
    }
  };

  const addCustomer = (cust: Omit<Customer, 'id' | 'createdDate'>): Customer => {
    const newCust: Customer = {
      ...cust,
      id: 'cust-' + Date.now(),
      createdDate: new Date().toISOString().split('T')[0]
    };
    setCustomers(prev => [newCust, ...prev]);
    return newCust;
  };

  const updateCustomer = (id: string, cust: Partial<Customer>) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...cust, updatedDate: new Date().toISOString().split('T')[0] } : c));
  };

  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  const addLead = (lead: Omit<Lead, 'id' | 'leadId' | 'createdDate'>) => {
    const leadNum = 1000 + leads.length + 1;
    const newLead: Lead = {
      ...lead,
      id: 'lead-' + Date.now(),
      leadId: `LD-${leadNum}`,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const updateLead = (id: string, lead: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...lead, updatedDate: new Date().toISOString().split('T')[0] } : l));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  const convertLeadToCustomerAndBooking = (leadId: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    let existingCust = customers.find(c => c.mobile === lead.mobile || c.fullName.toLowerCase() === lead.customerName.toLowerCase());
    if (!existingCust) {
      existingCust = addCustomer({
        fullName: lead.customerName,
        mobile: lead.mobile,
        whatsapp: lead.whatsapp || lead.mobile,
        email: lead.email,
        city: 'Inquired',
        state: 'India',
        country: 'India',
        numAdults: lead.pax,
        numChildren: 0,
        travelDate: lead.travelDate,
        destination: lead.destination,
        budget: lead.budget,
        source: lead.leadSource,
        notes: lead.notes
      });
    }

    addBooking({
      customerId: existingCust.id,
      customerName: existingCust.fullName,
      customerPhone: existingCust.mobile,
      destination: lead.destination,
      travelStartDate: lead.travelDate,
      travelEndDate: lead.travelDate,
      numAdults: lead.pax,
      numChildren: 0,
      rooms: Math.ceil(lead.pax / 2),
      vehicle: 'Innova Crysta',
      totalAmount: lead.budget,
      advanceReceived: 0,
      paymentStatus: 'Pending',
      bookingStatus: 'Confirmed',
      notes: `Converted from Lead ${lead.leadId}`
    });

    updateLead(leadId, { status: 'Confirmed' });
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'bookingId' | 'createdDate' | 'balanceAmount'>) => {
    const bookNum = 100 + bookings.length + 1;
    const balance = booking.totalAmount - booking.advanceReceived;
    let payStatus = booking.paymentStatus;
    if (balance <= 0) payStatus = 'Paid';
    else if (booking.advanceReceived > 0) payStatus = 'Partial';
    else payStatus = 'Pending';

    const newBooking: Booking = {
      ...booking,
      id: 'book-' + Date.now(),
      bookingId: `BK-2025-${bookNum}`,
      balanceAmount: balance < 0 ? 0 : balance,
      paymentStatus: payStatus,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const updateBooking = (id: string, updated: Partial<Booking>) => {
    setBookings(prev => prev.map(b => {
      if (b.id !== id) return b;
      const merged = { ...b, ...updated };
      const balance = merged.totalAmount - merged.advanceReceived;
      let payStatus = merged.paymentStatus;
      if (balance <= 0) payStatus = 'Paid';
      else if (merged.advanceReceived > 0) payStatus = 'Partial';
      else payStatus = 'Pending';

      return {
        ...merged,
        balanceAmount: balance < 0 ? 0 : balance,
        paymentStatus: payStatus
      };
    }));
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const addHotel = (hotel: Omit<Hotel, 'id'>) => {
    const newHotel: Hotel = { ...hotel, id: 'hotel-' + Date.now() };
    setHotels(prev => [newHotel, ...prev]);
  };

  const updateHotel = (id: string, updated: Partial<Hotel>) => {
    setHotels(prev => prev.map(h => h.id === id ? { ...h, ...updated } : h));
  };

  const deleteHotel = (id: string) => {
    setHotels(prev => prev.filter(h => h.id !== id));
  };

  const addTransport = (transport: Omit<Transport, 'id'>) => {
    const newTr: Transport = { ...transport, id: 'tr-' + Date.now() };
    setTransports(prev => [newTr, ...prev]);
  };

  const updateTransport = (id: string, updated: Partial<Transport>) => {
    setTransports(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const deleteTransport = (id: string) => {
    setTransports(prev => prev.filter(t => t.id !== id));
  };

  const addItinerary = (itinerary: Omit<Itinerary, 'id' | 'itineraryId' | 'createdDate'>): Itinerary => {
    const itinNum = 100 + itineraries.length + 1;
    const newItin: Itinerary = {
      ...itinerary,
      id: 'itin-' + Date.now(),
      itineraryId: `IT-2025-${itinNum}`,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setItineraries(prev => [newItin, ...prev]);
    return newItin;
  };

  const updateItinerary = (id: string, updated: Partial<Itinerary>) => {
    setItineraries(prev => prev.map(i => i.id === id ? { ...i, ...updated } : i));
  };

  const deleteItinerary = (id: string) => {
    setItineraries(prev => prev.filter(i => i.id !== id));
  };

  const duplicateItinerary = (id: string) => {
    const target = itineraries.find(i => i.id === id);
    if (target) {
      const duplicatedNum = 100 + itineraries.length + 1;
      const duplicated: Itinerary = {
        ...target,
        id: 'itin-' + Date.now(),
        itineraryId: `IT-2025-${duplicatedNum}`,
        clientName: `${target.clientName} (Copy)`,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setItineraries(prev => [duplicated, ...prev]);
    }
  };

  return (
    <DataContext.Provider
      value={{
        settings,
        updateSettings,
        packages,
        addPackage,
        updatePackage,
        deletePackage,
        duplicatePackage,
        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        leads,
        addLead,
        updateLead,
        deleteLead,
        convertLeadToCustomerAndBooking,
        bookings,
        addBooking,
        updateBooking,
        deleteBooking,
        hotels,
        addHotel,
        updateHotel,
        deleteHotel,
        transports,
        addTransport,
        updateTransport,
        deleteTransport,
        itineraries,
        addItinerary,
        updateItinerary,
        deleteItinerary,
        duplicateItinerary
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
