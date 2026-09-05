import { Customer, Lead, Booking, Package, Hotel, Transport, Itinerary, CompanySettings } from '../types';

export const initialCompanySettings: CompanySettings = {
  companyName: 'Bilu G Travels Kashmir',
  directorName: 'Javid Farooq',
  logoUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=300&q=80',
  phoneNumbers: ['6006070550', '7889408220'],
  whatsappNumber: '916006070550',
  email: 'bilugtourtravels1121@gmail.com',
  website: 'https://kashmirtourpackages.info',
  address: 'Near Dal Lake Boulevard Road, Srinagar, Jammu & Kashmir 190001, India',
  gstNumber: '01AAAAA0000A1Z5',
  bankDetails: {
    accountName: 'Bilu G Travels Kashmir',
    bankName: 'Jammu & Kashmir Bank',
    accountNumber: '0012010100009876',
    ifscCode: 'JAKA0DALAKE',
    branch: 'Boulevard Srinagar',
  },
  documentHeader: 'BILU G TRAVELS KASHMIR - YOUR TRUSTED LOCAL DMC',
  documentFooter: 'Thank you for choosing Bilu G Travels Kashmir. Wishing you a safe & memorable journey in Paradise!',
  defaultTerms: [
    '50% advance payment required to confirm booking.',
    'Balance 50% to be paid upon arrival in Srinagar.',
    'Cancellation before 15 days: 10% deduction.',
    'Cancellation within 7-14 days: 50% deduction.',
    'Cancellation within 7 days: Non-refundable.',
    'Vehicle rates include toll, parking, driver allowance & fuel.',
    'Standard check-in time 12:00 PM, Check-out 11:00 AM.'
  ],
  currency: '₹',
  defaultMealPlan: 'MAP (Breakfast + Dinner)',
  defaultVehicle: 'Innova Crysta',
  defaultHotelCategory: '4 Star'
};

export const initialPackages: Package[] = [
  {
    id: 'pkg-1',
    packageName: 'Magical Kashmir Honeymoon Delight',
    destination: 'Srinagar - Gulmarg - Pahalgam',
    duration: '5 Nights / 6 Days',
    numNights: 5,
    numDays: 6,
    hotelCategory: '4 Star Luxury',
    mealPlan: 'MAP (Breakfast & Dinner)',
    transportation: 'Private Sedan / Innova',
    price: 24500,
    description: 'Experience pure romance amidst snow-capped peaks, shikara rides on Dal Lake, candle-lit houseboat stay, and gondola rides in Gulmarg.',
    status: 'Active',
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1000&q=80'
    ],
    inclusions: [
      '01 Night Luxury Houseboat Stay in Dal Lake',
      '02 Nights Hotel Stay in Srinagar',
      '01 Night Hotel Stay in Gulmarg',
      '01 Night Hotel Stay in Pahalgam',
      'Welcome Drink on Arrival (Kahwa)',
      'Daily Breakfast & Dinner',
      'Complimentary 1 Hr Shikara Ride',
      'Honeymoon Inclusion: Flower bed decoration & Candle light dinner in Houseboat',
      'Private Non-AC Sedan/Innova for all transfers & sightseeing'
    ],
    exclusions: [
      'Airfare / Train fare',
      'Gondola ride tickets',
      'Pony rides in Gulmarg/Pahalgam',
      'Betaab Valley & Aru Valley local union cab charges',
      'Personal expenses & tipping'
    ],
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival Srinagar & Shikara Experience',
        destination: 'Srinagar',
        description: 'Warm welcome at Srinagar Airport by Bilu G Travels representative. Transfer to Dal Lake Luxury Houseboat. Evening romantic 1-hour Shikara ride. Romantic candle-lit dinner.',
        sightseeing: ['Dal Lake', 'Boulevard Road', 'Shikara Ride'],
        hotel: 'Grand Luxury Houseboat, Dal Lake',
        meals: 'Dinner',
        activities: 'Shikara Ride, Kahwa Tasting'
      },
      {
        dayNumber: 2,
        title: 'Srinagar Mughal Gardens Sightseeing',
        destination: 'Srinagar',
        description: 'After breakfast, check in to hotel. Visit famous Mughal Gardens: Nishat Bagh, Shalimar Bagh, Cheshma Shahi, and Pari Mahal. Visit Shankaracharya Temple.',
        sightseeing: ['Nishat Bagh', 'Shalimar Bagh', 'Cheshma Shahi', 'Pari Mahal', 'Shankaracharya Temple'],
        hotel: 'Hotel Pine Spring / Similar, Srinagar',
        meals: 'Breakfast & Dinner',
        activities: 'Garden Tour, Photography'
      },
      {
        dayNumber: 3,
        title: 'Srinagar to Gulmarg Excursion',
        destination: 'Gulmarg',
        description: 'Drive to Gulmarg (Meadow of Flowers). Enjoy scenic drive passing mustard fields and pine trees. Cable car Gondola Ride Phase 1 & Phase 2 up to Apharwat Peak.',
        sightseeing: ['Gulmarg Golf Course', 'Strawberry Valley', 'Aphrawat Peak Gondola'],
        hotel: 'Hotel Hilltop / Grand Mumtaz, Gulmarg',
        meals: 'Breakfast & Dinner',
        activities: 'Gondola Ride, Snow Sports / Skiing'
      },
      {
        dayNumber: 4,
        title: 'Gulmarg to Pahalgam (Valley of Shepherds)',
        destination: 'Pahalgam',
        description: 'Scenic journey to Pahalgam via Pampore Saffron fields and Avantipura ruins. Evening stroll along Lidder River.',
        sightseeing: ['Saffron Fields Pampore', 'Avantipura Ruins', 'Lidder River Bank'],
        hotel: 'Hotel Heevan / Pine & Peak, Pahalgam',
        meals: 'Breakfast & Dinner',
        activities: 'River Walk, Shopping for Kashmiri Handloom'
      },
      {
        dayNumber: 5,
        title: 'Pahalgam Local Explorations (Betaab & Aru)',
        destination: 'Pahalgam',
        description: 'Visit iconic Betaab Valley, Aru Valley, and Chandanwari. Picturesque alpine meadows and crystal clear streams.',
        sightseeing: ['Betaab Valley', 'Aru Valley', 'Chandanwari'],
        hotel: 'Hotel Pine Spring / Similar, Srinagar',
        meals: 'Breakfast & Dinner',
        activities: 'Nature Walk, Trekking Spot'
      },
      {
        dayNumber: 6,
        title: 'Departure Srinagar Airport',
        destination: 'Srinagar Airport',
        description: 'After breakfast, transfer to Srinagar Airport for onward journey with beautiful Kashmir memories.',
        sightseeing: ['Local Souvenir Market'],
        meals: 'Breakfast',
        activities: 'Airport Drop'
      }
    ]
  },
  {
    id: 'pkg-2',
    packageName: 'Best of Kashmir Family Paradise',
    destination: 'Srinagar - Sonmarg - Gulmarg - Pahalgam',
    duration: '6 Nights / 7 Days',
    numNights: 6,
    numDays: 7,
    hotelCategory: '3 Star / 4 Star Premium',
    mealPlan: 'MAP (Breakfast & Dinner)',
    transportation: 'Innova Crysta / Tempo Traveller',
    price: 28900,
    description: 'Complete family Kashmir package covering Srinagar lakes, Sonmarg glaciers, Gulmarg snow rides, and Pahalgam river valleys.',
    status: 'Active',
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80'
    ],
    inclusions: [
      '6 Nights Accommodation in handpicked family hotels & houseboat',
      'Daily Breakfast and Dinner included',
      'Pick & Drop Srinagar Airport in Innova Crysta',
      'All sightseeing as per itinerary',
      'Shikara ride on Dal Lake',
      'Driver allowances, toll tax & parking'
    ],
    exclusions: [
      'Flight tickets',
      'Union cabs in Pahalgam/Sonmarg',
      'Adventure activities',
      'Gondola tickets'
    ],
    itinerary: [
      {
        dayNumber: 1,
        title: 'Srinagar Arrival & Lake Promenade',
        destination: 'Srinagar',
        description: 'Arrival Srinagar Airport. Transfer to houseboat on Nigeen / Dal Lake.',
        sightseeing: ['Dal Lake', 'Nigeen Lake'],
        hotel: 'Royal Heritage Houseboat',
        meals: 'Dinner'
      },
      {
        dayNumber: 2,
        title: 'Day Trip to Sonmarg (Meadow of Gold)',
        destination: 'Sonmarg',
        description: 'Excursion to Sonmarg. Thajiwas Glacier pony ride and river Rafting spot.',
        sightseeing: ['Thajiwas Glacier', 'Sindh River'],
        hotel: 'Srinagar Hotel',
        meals: 'Breakfast & Dinner'
      },
      {
        dayNumber: 3,
        title: 'Srinagar to Gulmarg',
        destination: 'Gulmarg',
        description: 'Drive to Gulmarg. Cable car experience.',
        sightseeing: ['Gondola Cable Car', 'St. Mary Church'],
        hotel: 'Gulmarg Resort',
        meals: 'Breakfast & Dinner'
      },
      {
        dayNumber: 4,
        title: 'Gulmarg to Pahalgam',
        destination: 'Pahalgam',
        description: 'Drive through pine forests to Pahalgam.',
        sightseeing: ['Apple Orchards', 'Lidder Valley'],
        hotel: 'Pahalgam Hotel',
        meals: 'Breakfast & Dinner'
      },
      {
        dayNumber: 5,
        title: 'Pahalgam Valleys Sightseeing',
        destination: 'Pahalgam',
        description: 'Explore Betaab Valley and Baisaran Valley (Mini Switzerland).',
        sightseeing: ['Betaab Valley', 'Baisaran Valley'],
        hotel: 'Pahalgam Hotel',
        meals: 'Breakfast & Dinner'
      },
      {
        dayNumber: 6,
        title: 'Return Srinagar Gardens & Shopping',
        destination: 'Srinagar',
        description: 'Return to Srinagar. Visit Lal Chowk and Kashmiri Pashmina handicraft centers.',
        sightseeing: ['Mughal Gardens', 'Lal Chowk Bazaar'],
        hotel: 'Srinagar Hotel',
        meals: 'Breakfast & Dinner'
      },
      {
        dayNumber: 7,
        title: 'Airport Departure',
        destination: 'Srinagar Airport',
        description: 'Transfer to Srinagar Airport.',
        sightseeing: [],
        meals: 'Breakfast'
      }
    ]
  },
  {
    id: 'pkg-3',
    packageName: 'Offbeat Kashmir Explorer (Gurez & Bangus Valley)',
    destination: 'Srinagar - Gurez Valley - Dawar - Habba Khatoon - Srinagar',
    duration: '4 Nights / 5 Days',
    numNights: 4,
    numDays: 5,
    hotelCategory: 'Deluxe / Boutique Stays',
    mealPlan: 'MAP',
    transportation: '4x4 Scorpio / SUV',
    price: 22000,
    description: 'Discover untouched Kashmir in Gurez Valley along Kishanganga River and Habba Khatoon Peak.',
    status: 'Active',
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
    ],
    inclusions: [
      'Accommodation in Gurez & Srinagar',
      'All meals (Breakfast & Dinner)',
      'Inner line permits for Gurez',
      'SUV with experienced mountain driver'
    ],
    exclusions: ['Airfare', 'Personal expenses'],
    itinerary: [
      {
        dayNumber: 1,
        title: 'Srinagar Arrival',
        destination: 'Srinagar',
        description: 'Arrive Srinagar, check-in hotel.',
        hotel: 'Srinagar Hotel',
        meals: 'Dinner'
      },
      {
        dayNumber: 2,
        title: 'Srinagar to Gurez Valley via Razdan Pass',
        destination: 'Gurez Valley',
        description: 'Drive through breathtaking Razdan Pass (11,672 ft). Arrive Dawar.',
        sightseeing: ['Razdan Pass', 'Kishanganga River'],
        hotel: 'Gurez Wooden Cottage',
        meals: 'Breakfast & Dinner'
      },
      {
        dayNumber: 3,
        title: 'Dawar, Habba Khatoon & Tulail Valley',
        destination: 'Gurez',
        description: 'Explore Habba Khatoon peak spring water and border village of Tulail.',
        sightseeing: ['Habba Khatoon Peak', 'Tulail Border Village'],
        hotel: 'Gurez Wooden Cottage',
        meals: 'Breakfast & Dinner'
      },
      {
        dayNumber: 4,
        title: 'Gurez Valley to Srinagar',
        destination: 'Srinagar',
        description: 'Return to Srinagar. Evening houseboat stay.',
        sightseeing: ['Wular Lake Enroute'],
        hotel: 'Dal Lake Houseboat',
        meals: 'Breakfast & Dinner'
      },
      {
        dayNumber: 5,
        title: 'Departure',
        destination: 'Srinagar Airport',
        description: 'Transfer to Srinagar Airport.',
        meals: 'Breakfast'
      }
    ]
  }
];

export const initialCustomers: Customer[] = [
  {
    id: 'cust-1',
    fullName: 'Rahul Sharma',
    mobile: '9876543210',
    whatsapp: '9876543210',
    email: 'rahul.sharma@gmail.com',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    numAdults: 2,
    numChildren: 1,
    childAges: '5',
    travelDate: '2025-05-10',
    returnDate: '2025-05-16',
    destination: 'Srinagar - Gulmarg - Pahalgam',
    budget: 65000,
    source: 'Website Inquiry',
    notes: 'Honeymoon couple with child. Prefers 4-star hotel and private Innova.',
    createdDate: '2025-02-15'
  },
  {
    id: 'cust-2',
    fullName: 'Vikram Mehta',
    mobile: '9820011223',
    whatsapp: '9820011223',
    email: 'vikram.mehta@techcorp.com',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    numAdults: 4,
    numChildren: 0,
    travelDate: '2025-04-12',
    returnDate: '2025-04-18',
    destination: 'Srinagar & Sonmarg',
    budget: 110000,
    source: 'B2B Referral',
    notes: 'Family trip. Requires Tempo Traveller and 2 deluxe rooms.',
    createdDate: '2025-02-20'
  },
  {
    id: 'cust-3',
    fullName: 'Ananya Roy',
    mobile: '9831122334',
    whatsapp: '9831122334',
    email: 'ananya.roy@yahoo.in',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    numAdults: 2,
    numChildren: 0,
    travelDate: '2025-06-01',
    returnDate: '2025-06-06',
    destination: 'Offbeat Gurez Valley',
    budget: 50000,
    source: 'Instagram',
    notes: 'Interested in photography and offbeat Kashmir.',
    createdDate: '2025-02-25'
  }
];

export const initialLeads: Lead[] = [
  {
    id: 'lead-1',
    leadId: 'LD-1001',
    customerName: 'Sanjay Kapoor',
    mobile: '9811122334',
    whatsapp: '9811122334',
    email: 'sanjay.k@gmail.com',
    destination: 'Srinagar - Gulmarg',
    travelDate: '2025-04-20',
    pax: 2,
    budget: 50000,
    leadSource: 'Website Form',
    status: 'Follow-up',
    priority: 'High',
    assignedTo: 'Javid Farooq',
    followUpDate: '2025-03-02',
    notes: 'Requested quotation for 5D4N Honeymoon Package.',
    createdDate: '2025-02-28'
  },
  {
    id: 'lead-2',
    leadId: 'LD-1002',
    customerName: 'Priya Verma',
    mobile: '9711223344',
    whatsapp: '9711223344',
    email: 'priya.v@gmail.com',
    destination: 'Full Kashmir Tour',
    travelDate: '2025-05-15',
    pax: 6,
    budget: 150000,
    leadSource: 'WhatsApp Direct',
    status: 'New',
    priority: 'High',
    assignedTo: 'Javid Farooq',
    followUpDate: '2025-03-01',
    notes: 'Family group requiring 3 rooms and Innova Crysta.',
    createdDate: '2025-03-01'
  },
  {
    id: 'lead-3',
    leadId: 'LD-1003',
    customerName: 'Amit Patel',
    mobile: '9909988776',
    whatsapp: '9909988776',
    email: 'apatel@gmail.com',
    destination: 'Srinagar - Pahalgam',
    travelDate: '2025-04-05',
    pax: 4,
    budget: 80000,
    leadSource: 'Google Ads',
    status: 'Quotation Sent',
    priority: 'Medium',
    assignedTo: 'Javid Farooq',
    followUpDate: '2025-03-03',
    notes: 'Quotation #BG-2025-88 sent via WhatsApp.',
    createdDate: '2025-02-26'
  }
];

export const initialBookings: Booking[] = [
  {
    id: 'book-1',
    bookingId: 'BK-2025-01',
    customerId: 'cust-1',
    customerName: 'Rahul Sharma',
    customerPhone: '9876543210',
    destination: 'Srinagar - Gulmarg - Pahalgam',
    travelStartDate: '2025-05-10',
    travelEndDate: '2025-05-16',
    numAdults: 2,
    numChildren: 1,
    rooms: 1,
    vehicle: 'Innova Crysta',
    packageId: 'pkg-1',
    packageName: 'Magical Kashmir Honeymoon Delight',
    hotelName: 'Grand Luxury Houseboat & Hotel Pine Spring',
    totalAmount: 68000,
    advanceReceived: 30000,
    balanceAmount: 38000,
    paymentStatus: 'Partial',
    bookingStatus: 'Confirmed',
    notes: 'Advance ₹30,000 received via GPay. Balance to be paid on arrival in Srinagar.',
    createdDate: '2025-02-18'
  },
  {
    id: 'book-2',
    bookingId: 'BK-2025-02',
    customerId: 'cust-2',
    customerName: 'Vikram Mehta',
    customerPhone: '9820011223',
    destination: 'Srinagar & Sonmarg',
    travelStartDate: '2025-04-12',
    travelEndDate: '2025-04-18',
    numAdults: 4,
    numChildren: 0,
    rooms: 2,
    vehicle: 'Tempo Traveller',
    packageId: 'pkg-2',
    packageName: 'Best of Kashmir Family Paradise',
    hotelName: 'Hotel Hilltop & Royal Heritage Houseboat',
    totalAmount: 115000,
    advanceReceived: 115000,
    balanceAmount: 0,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    notes: 'Full payment clear.',
    createdDate: '2025-02-22'
  }
];

export const initialHotels: Hotel[] = [
  {
    id: 'hotel-1',
    hotelName: 'Grand Heritage Luxury Houseboat',
    location: 'Dal Lake, Srinagar',
    category: 'Houseboat',
    address: 'Opposite Ghat No. 7, Boulevard Road, Dal Lake, Srinagar',
    contactPerson: 'Mohammad Altaf',
    phone: '9419012345',
    email: 'info@grandheritagehouseboat.com',
    roomTypes: ['Deluxe Lake View Suite', 'Royal Super Deluxe'],
    mealPlans: ['CP (Breakfast)', 'MAP (Breakfast & Dinner)'],
    rate: 6500,
    status: 'Active',
    notes: 'Carpet flooring, cedar wood carving, attached bath, heater included.'
  },
  {
    id: 'hotel-2',
    hotelName: 'Hotel Pine Spring Gulmarg',
    location: 'Gulmarg',
    category: '4 Star',
    address: 'Near Gondola Base Station, Gulmarg 193403',
    contactPerson: 'Farooq Ahmad',
    phone: '9419123456',
    email: 'gulmarg@pinespring.com',
    roomTypes: ['Deluxe Room', 'Executive Suite'],
    mealPlans: ['MAP', 'AP'],
    rate: 9500,
    status: 'Active',
    notes: 'Walking distance to Gondola Phase 1.'
  },
  {
    id: 'hotel-3',
    hotelName: 'Hotel Heevan Pahalgam',
    location: 'Pahalgam',
    category: '4 Star',
    address: 'Opposite Lidder River, Pahalgam 192126',
    contactPerson: 'Shabir Wani',
    phone: '9419234567',
    email: 'heevan@ahsanmount.com',
    roomTypes: ['River View Deluxe', 'Suite'],
    mealPlans: ['MAP'],
    rate: 8800,
    status: 'Active'
  }
];

export const initialTransport: Transport[] = [
  {
    id: 'tr-1',
    vehicleType: 'Innova Crysta',
    vehicleName: 'Toyota Innova Crysta (AC)',
    vehicleNumber: 'JK01AX7890',
    driverName: 'Ghulam Nabi',
    driverMobile: '9906123456',
    capacity: 6,
    ratePerDay: 3800,
    availability: 'Available',
    notes: 'Clean vehicle with roof carrier and hill experienced driver.'
  },
  {
    id: 'tr-2',
    vehicleType: 'Tempo Traveller',
    vehicleName: 'Force Tempo Traveller 12 Seater',
    vehicleNumber: 'JK01BZ4321',
    driverName: 'Tariq Ahmad',
    driverMobile: '9906234567',
    capacity: 12,
    ratePerDay: 5500,
    availability: 'Available'
  },
  {
    id: 'tr-3',
    vehicleType: 'Sedan',
    vehicleName: 'Swift Dzire',
    vehicleNumber: 'JK01CY1122',
    driverName: 'Bilal Lone',
    driverMobile: '9906345678',
    capacity: 4,
    ratePerDay: 2600,
    availability: 'On Tour'
  }
];

export const initialItineraries: Itinerary[] = [
  {
    id: 'itin-1',
    itineraryId: 'IT-2025-01',
    customerId: 'cust-1',
    clientName: 'Rahul Sharma',
    clientPhone: '9876543210',
    clientEmail: 'rahul.sharma@gmail.com',
    packageName: 'Magical Kashmir Honeymoon Delight',
    destination: 'Srinagar - Gulmarg - Pahalgam',
    travelDate: '2025-05-10',
    returnDate: '2025-05-16',
    numDays: 6,
    numNights: 5,
    paxAdults: 2,
    paxChildren: 1,
    childAges: '5',
    numRooms: 1,
    hotelCategory: '4 Star Premium',
    mealPlan: 'MAP (Breakfast + Dinner)',
    transportation: 'Innova Crysta Private',
    hotelDetails: '1 Night Houseboat Dal Lake, 2 Nights Srinagar 4 Star, 1 Night Gulmarg, 1 Night Pahalgam',
    dayWiseItinerary: initialPackages[0].itinerary,
    inclusions: initialPackages[0].inclusions,
    exclusions: initialPackages[0].exclusions,
    termsAndConditions: initialCompanySettings.defaultTerms,
    totalCost: 68000,
    createdDate: '2025-02-18'
  }
];
