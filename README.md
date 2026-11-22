# DAD'S AUTO & CAB 🛺🚗

> **“Safe Rides • Local Routes • Always With You”**  
> *“Your Journey, Our Priority.”*  
> **Proudly Serving Tamil Nadu, India**

A real-world, commercial-grade Progressive Web Application (PWA) mobility platform built for local Auto & Cab operations in Tamil Nadu.

---

## 🌟 Key Architecture & Version 1 Scope

### 1. Strictly Tamil Nadu in Version 1
- **Service Area**: Exclusively all 38 districts of Tamil Nadu (Tirunelveli, Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, Thoothukudi, Nagercoil, Erode, Vellore, Thanjavur, Dindigul, Virudhunagar, Kanyakumari, etc.).
- **Bounding Box Security**: GPS coordinates outside Tamil Nadu are intercepted with informative messaging.
- **Scalable Architecture**: State-agnostic data models ready for future multi-state expansion without rewriting core dispatching and fare systems.

### 2. Dual Map Engine (Google Maps API + TN Vector Map)
- **Google Maps API**: Connected via `VITE_GOOGLE_MAPS_API_KEY` in `.env`.
- **Zero-Config Vector Map**: Pre-configured interactive Leaflet map centered on Tamil Nadu hubs with custom yellow auto markers, animated pulsing GPS markers, and live route polylines.

### 3. Configurable Fare Calculation Engine
- **Auto Rickshaw**: Base ₹40 (first 1.5 km) + ₹16/km + ₹1.5/min waiting.
- **Prime Cab**: Base ₹90 (first 2.0 km) + ₹22/km + ₹2.5/min waiting.
- **Night Surcharge**: 1.25x between 10:00 PM and 5:00 AM.
- **Admin Managed**: Pricing rules can be edited and published in real-time from the Admin portal.

---

## 👥 Three Dedicated Portals in One App

| Role | Core Capabilities | Demo Account |
| :--- | :--- | :--- |
| **Passenger (Customer)** | Instant Auto/Cab booking, Tamil Nadu location search, live driver tracking, fare breakdown, call/WhatsApp driver, SOS 112, ride rating, English & தமிழ் localization | Karthik Raja (`+91 98401 23456`) |
| **Driver (Auto/Cab)** | Online/Offline toggle, animated ride requests with countdown timer, turn-by-turn navigation, start/complete trip, daily/weekly earnings charts | Ravi Kumar (`+91 94431 87654`, `TN 72 AB 4587`) |
| **Admin (Dad / Owner)** | Fleet management, bookings oversight, driver approval, dynamic fare card rules, AI business intelligence, real revenue analytics | Sundar Rajan (`+91 94422 11000`) |

---

## 🤖 AI Assistants

1. **Customer AI Booking Assistant**:
   - Customer can ask: *"I need an auto from Palayamkottai to Tirunelveli Junction."*
   - AI extracts pickup, destination, and vehicle type, then prepares the booking for confirmation (per safety rules, rides require customer confirmation).
2. **Owner AI Business Intelligence**:
   - Owner can query: *"How much did I earn this week?"*, *"What was my busiest route?"*, *"How many rides did I complete today?"*, *"Compare this month with last month."*
   - Driven exclusively by real platform operational numbers.

---

## 🚀 Quick Start Guide

### Frontend (PWA)
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
The app will launch at `http://localhost:3000` or `http://localhost:5173`.

### Backend & Prisma Database (Optional)
```bash
cd server
npm install
npx prisma generate
npx prisma db push
npm run prisma:seed
npm run dev
```

---

## 📱 Progressive Web App (PWA) Installation
- Visit the app in Chrome, Brave, Edge, or Safari.
- Click **"Install App Now"** on the floating banner or tap browser menu (⋮) -> **"Add to Home Screen"**.
- Works offline with cached fallback and app icon badges.
