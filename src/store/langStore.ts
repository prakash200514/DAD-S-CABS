import { create } from 'zustand';

export type Language = 'en' | 'ta';

export interface Translations {
  [key: string]: {
    en: string;
    ta: string;
  };
}

export const TRANSLATIONS: Translations = {
  // Brand & General
  'brand.name': {
    en: "Dad's Auto & Cab",
    ta: "டாட்ஸ் ஆட்டோ & கேப்",
  },
  'brand.tagline': {
    en: 'Safe Rides • Local Routes • Always With You',
    ta: 'பாதுகாப்பான பயணம் • உள்ளூர் பாதைகள் • எப்போதும் உங்களுடன்',
  },
  'brand.secondaryTagline': {
    en: 'Your Journey, Our Priority.',
    ta: 'உங்கள் பயணம், எங்கள் முன்னுரிமை.',
  },
  'brand.servingTN': {
    en: 'Proudly Serving Tamil Nadu',
    ta: 'பெருமையுடன் தமிழ்நாட்டில் சேவை செய்கிறோம்',
  },

  // Navigation
  'nav.home': { en: 'Home', ta: 'முகப்பு' },
  'nav.bookings': { en: 'Bookings', ta: 'பயணங்கள்' },
  'nav.wallet': { en: 'Wallet', ta: 'பணப்பை' },
  'nav.profile': { en: 'Profile', ta: 'சுயவிவரம்' },
  'nav.driver': { en: 'Driver Mode', ta: 'ஓட்டுநர் பயன்முறை' },
  'nav.admin': { en: 'Admin Portal', ta: 'நிர்வாக மையம்' },

  // Customer Home
  'home.greeting': { en: 'Hello, Vanakkam!', ta: 'வணக்கம், நல்வரவு!' },
  'home.whereAreYouGoing': { en: 'Where are you going?', ta: 'எங்கு செல்ல வேண்டும்?' },
  'home.pickup': { en: 'Pickup Location', ta: 'புறப்படும் இடம்' },
  'home.destination': { en: 'Enter Destination', ta: 'சேருமிடம் தேர்வு செய்க' },
  'home.quickSaved': { en: 'Saved Places', ta: 'சேமிக்கப்பட்ட இடங்கள்' },
  'home.recent': { en: 'Recent Places', ta: 'சமீபத்திய இடங்கள்' },
  'home.searchPlaceholder': { en: 'Search pickup or destination in Tamil Nadu...', ta: 'தமிழ்நாட்டு இடங்களை தேடுங்கள்...' },

  // Ride Types
  'ride.auto': { en: 'Auto Rickshaw', ta: 'ஆட்டோ' },
  'ride.autoDesc': { en: 'Fast, pocket-friendly & ideal for local street routes', ta: 'வேகமானது, சிக்கனமானது, உள்ளூர் தெருக்களுக்கு சிறந்தது' },
  'ride.cab': { en: 'Prime Cab', ta: 'பிரைம் கேப்' },
  'ride.cabDesc': { en: 'AC Sedan, comfortable & smooth for highway travel', ta: 'குளிர்சாதன வசதியுடன் சொகுசான நெடுஞ்சாலை பயணம்' },
  'ride.chooseRide': { en: 'Choose Your Ride', ta: 'வாகனத்தை தேர்வு செய்க' },
  'ride.estimatedFare': { en: 'Estimated Fare', ta: 'மதிப்பிடப்பட்ட கட்டணம்' },
  'ride.bookRide': { en: 'Book Ride', ta: 'சவாரி புக் செய்க' },
  'ride.confirmRide': { en: 'Confirm Ride', ta: 'பயணத்தை உறுதி செய்க' },

  // Booking Flow
  'booking.distance': { en: 'Distance', ta: 'தொலைவு' },
  'booking.time': { en: 'Est. Time', ta: 'மதிப்பிடப்பட்ட நேரம்' },
  'booking.paymentMethod': { en: 'Payment Method', ta: 'பணம் செலுத்தும் முறை' },
  'booking.cash': { en: 'Cash to Driver', ta: 'நேரடி ரொக்கம்' },
  'booking.upi': { en: 'UPI (GPay / PhonePe / Paytm)', ta: 'UPI (கூகிள் பே / போன்பே)' },
  'booking.confirmBooking': { en: 'Confirm Booking', ta: 'முன்பதிவை உறுதி செய்க' },
  'booking.rideConfirmed': { en: 'Ride Confirmed!', ta: 'பயணம் உறுதியானது!' },
  'booking.driverAssigned': { en: 'Driver Assigned', ta: 'ஓட்டுநர் நியமிக்கப்பட்டார்' },
  'booking.arriving': { en: 'Driver Arriving', ta: 'ஓட்டுநர் வந்து கொண்டிருக்கிறார்' },
  'booking.onTrip': { en: 'On Trip', ta: 'பயணத்தில் உள்ளது' },
  'booking.completed': { en: 'Ride Completed', ta: 'பயணம் நிறைவடைந்தது' },

  // Action Buttons
  'action.call': { en: 'Call Driver', ta: 'அழைக்கவும்' },
  'action.whatsapp': { en: 'WhatsApp', ta: 'வாட்ஸ்அப்' },
  'action.track': { en: 'Track Live', ta: 'நேரலை கண்காணிப்பு' },
  'action.share': { en: 'Share Trip', ta: 'பயணத்தைப் பகிர்க' },
  'action.sos': { en: 'Emergency Help', ta: 'அவசர உதவி' },
  'action.done': { en: 'Done', ta: 'முடிந்தது' },
  'action.rate': { en: 'Rate Driver', ta: 'மதிப்பீடு செய்க' },

  // Driver
  'driver.online': { en: 'ONLINE', ta: 'ஆன்லைன்' },
  'driver.offline': { en: 'OFFLINE', ta: 'ஆஃப்லைன்' },
  'driver.ready': { en: 'Ready to take passengers across Tamil Nadu', ta: 'பயணிகளை ஏற்றிச் செல்ல தயாராக உள்ளது' },
  'driver.offDuty': { en: 'You are currently off duty. Go online to accept rides.', ta: 'தற்போது ஆஃப்லைனில் உள்ளீர்கள்.' },
  'driver.rideRequest': { en: 'New Ride Request!', ta: 'புதிய சவாரி கோரிக்கை!' },
  'driver.acceptRide': { en: 'Accept Ride', ta: 'சவாரியை ஏற்கவும்' },
  'driver.rejectRide': { en: 'Decline', ta: 'நிராகரி' },
  'driver.startTrip': { en: 'Start Trip', ta: 'பயணத்தை தொடங்கு' },
  'driver.completeTrip': { en: 'Complete Trip', ta: 'பயணத்தை நிறைவுசெய்' },
  'driver.todayTrips': { en: "Today's Trips", ta: 'இன்றைய சவாரிகள்' },
  'driver.todayEarnings': { en: "Today's Earnings", ta: 'இன்றைய வருமானம்' },
  'driver.totalEarnings': { en: 'Total Earnings', ta: 'மொத்த வருமானம்' },

  // Admin
  'admin.dashboard': { en: 'Admin Dashboard', ta: 'நிர்வாக கட்டுப்பாட்டு பலகை' },
  'admin.overview': { en: 'Overview', ta: 'கண்ணோட்டம்' },
  'admin.bookings': { en: 'Bookings Management', ta: 'முன்பதிவு மேலாண்மை' },
  'admin.drivers': { en: 'Driver Fleet', ta: 'ஓட்டுநர் படை' },
  'admin.vehicles': { en: 'Vehicles', ta: 'வாகனங்கள்' },
  'admin.fareRules': { en: 'Fare Rules', ta: 'கட்டண விதிமுறைகள்' },
  'admin.analytics': { en: 'Business Analytics', ta: 'வணிகப் பகுப்பாய்வு' },

  // AI Assistant
  'ai.assistant': { en: 'Dad\'s AI Assistant', ta: 'டாட்ஸ் AI உதவியாளர்' },
  'ai.bookingPrompt': { en: 'Book with Voice/Chat: "I need an auto from Palayamkottai to Tirunelveli Junction"', ta: 'சொல்லுங்கள்: "பாளையங்கோட்டையிலிருந்து திருநெல்வேலி சந்திப்புக்கு ஆட்டோ வேண்டும்"' },
  'ai.ownerPrompt': { en: 'Ask Business AI: "How much did we earn this week?"', ta: 'வணிகக் கேள்வி: "இந்த வாரம் எவ்வளவு வருவாய் கிடைத்தது?"' }
};

interface LangStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const useLangStore = create<LangStore>((set, get) => ({
  language: 'en',
  setLanguage: (language: Language) => set({ language }),
  t: (key: string) => {
    const lang = get().language;
    const item = TRANSLATIONS[key];
    if (!item) return key;
    return item[lang] || item.en;
  },
}));
