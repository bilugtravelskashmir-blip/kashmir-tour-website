export type LeadStatus = 'New' | 'Contacted' | 'Follow-up' | 'Quotation Sent' | 'Negotiation' | 'Confirmed' | 'Lost' | 'Cancelled';
export type LeadPriority = 'High' | 'Medium' | 'Low';

export interface Lead {
  id: string;
  leadId: string;
  customerName: string;
  mobile: string;
  whatsapp?: string;
  email?: string;
  destination: string;
  travelDate: string;
  pax: number;
  budget: number;
  leadSource: string;
  status: LeadStatus;
  priority: LeadPriority;
  assignedTo: string;
  followUpDate?: string;
  notes?: string;
  createdDate: string;
  updatedDate?: string;
}

export interface Customer {
  id: string;
  fullName: string;
  mobile: string;
  whatsapp?: string;
  email?: string;
  city: string;
  state: string;
  country: string;
  numAdults: number;
  numChildren: number;
  childAges?: string;
  travelDate?: string;
  returnDate?: string;
  destination?: string;
  budget?: number;
  source?: string;
  notes?: string;
  createdDate: string;
  updatedDate?: string;
}

export type PaymentStatus = 'Pending' | 'Partial' | 'Paid' | 'Refunded';
export type BookingStatus = 'Inquiry' | 'Tentative' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Booking {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  destination: string;
  travelStartDate: string;
  travelEndDate: string;
  numAdults: number;
  numChildren: number;
  rooms: number;
  vehicle?: string;
  packageId?: string;
  packageName?: string;
  hotelId?: string;
  hotelName?: string;
  totalAmount: number;
  advanceReceived: number;
  balanceAmount: number;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  notes?: string;
  createdDate: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  destination: string;
  description: string;
  sightseeing?: string[];
  hotel?: string;
  meals?: string;
  activities?: string;
  image?: string;
}

export interface Package {
  id: string;
  packageName: string;
  destination: string;
  duration: string;
  numNights: number;
  numDays: number;
  hotelCategory: string;
  mealPlan: string;
  transportation: string;
  price: number;
  description: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  images: string[];
  status: 'Active' | 'Inactive';
  isPopular?: boolean;
}

export interface Hotel {
  id: string;
  hotelName: string;
  location: string;
  category: '3 Star' | '4 Star' | '5 Star' | 'Luxury' | 'Budget' | 'Houseboat' | 'Resort';
  address: string;
  contactPerson: string;
  phone: string;
  email: string;
  roomTypes: string[];
  mealPlans: string[];
  rate: number;
  notes?: string;
  status: 'Active' | 'Inactive';
  image?: string;
}

export type VehicleType = 'Sedan' | 'SUV' | 'Tempo Traveller' | 'Traveller' | 'Innova' | 'Innova Crysta' | 'Bus';

export interface Transport {
  id: string;
  vehicleType: VehicleType;
  vehicleName: string;
  vehicleNumber: string;
  driverName: string;
  driverMobile: string;
  capacity: number;
  ratePerDay: number;
  availability: 'Available' | 'On Tour' | 'Maintenance';
  notes?: string;
}

export interface Itinerary {
  id: string;
  itineraryId: string;
  customerId?: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  packageName?: string;
  destination: string;
  travelDate: string;
  returnDate: string;
  numDays: number;
  numNights: number;
  paxAdults: number;
  paxChildren: number;
  childAges?: string;
  numRooms: number;
  hotelCategory: string;
  mealPlan: string;
  transportation: string;
  hotelDetails?: string;
  dayWiseItinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  termsAndConditions: string[];
  totalCost: number;
  createdDate: string;
}

export interface CompanySettings {
  companyName: string;
  directorName: string;
  logoUrl: string;
  phoneNumbers: string[];
  whatsappNumber: string;
  email: string;
  website: string;
  address: string;
  gstNumber?: string;
  bankDetails?: {
    accountName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    branch: string;
  };
  documentHeader?: string;
  documentFooter?: string;
  defaultTerms: string[];
  currency: string;
  defaultMealPlan: string;
  defaultVehicle: string;
  defaultHotelCategory: string;
}
