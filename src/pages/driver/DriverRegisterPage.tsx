import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useAdminStore } from '../../store/adminStore';
import { Driver, DriverBioData, DriverLegalDocuments, AutoRickshawSpecs } from '../../types';
import {
  ShieldCheck,
  User,
  Phone,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
  FileText,
  Calendar,
  MapPin,
  Check,
  AlertCircle,
  Sparkles,
  Camera,
  RefreshCw,
  Award,
  Clock,
  Car,
  Image,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const TN_DISTRICTS = [
  'Tirunelveli',
  'Tenkasi',
  'Madurai',
  'Chennai',
  'Coimbatore',
  'Tiruchirappalli',
  'Salem',
  'Erode',
  'Tiruppur',
  'Thoothukudi (Tuticorin)',
  'Kanyakumari (Nagercoil)',
  'Dindigul',
  'Thanjavur',
  'Vellore',
  'Cuddalore',
  'Karur',
  'Virudhunagar',
];

const AUTO_MAKES_MODELS = [
  { make: 'Bajaj Auto', model: 'Bajaj Compact RE 4S (Standard)' },
  { make: 'Bajaj Auto', model: 'Bajaj RE Maxima Cargo / Passenger' },
  { make: 'TVS Motor', model: 'TVS King Duramax 225' },
  { make: 'Piaggio', model: 'Piaggio Ape City Plus' },
  { make: 'Piaggio', model: 'Piaggio Ape DX High Mileage' },
  { make: 'Mahindra Electric', model: 'Mahindra Treo Electric (EV Auto)' },
  { make: 'Atul Auto', model: 'Atul Gemini Dzire Passenger' },
];

const DEFAULT_DRIVER_PHOTO =
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=360&q=80';
const DEFAULT_AUTO_PHOTO = '/assets/auto_rickshaw_card.jpg';

export const DriverRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { registerDriver } = useAuthStore();
  const { addDriver } = useAdminStore();

  // Wizard Step: 1 = Bio Data, 2 = Auto Details, 3 = Legal Documents, 4 = Mobile & OTP, 5 = Complete
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // --- Step 1: Driver Bio Data & Driver Photo ---
  const [fullName, setFullName] = useState('M. Muthuvel Rajan');
  const [fatherOrSpouse, setFatherOrSpouse] = useState('S. Manickam');
  const [dob, setDob] = useState('1988-06-14');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [district, setDistrict] = useState('Tirunelveli');
  const [address, setAddress] = useState('14/2 South Car Street, Palayamkottai');
  const [pincode, setPincode] = useState('627002');
  const [experienceYears, setExperienceYears] = useState(7);

  // Driver Photo (JPG format only)
  const [avatarUrl, setAvatarUrl] = useState<string>(DEFAULT_DRIVER_PHOTO);
  const [driverPhotoFileName, setDriverPhotoFileName] = useState<string>('driver_passport_photo.jpg');
  const [driverPhotoFileSize, setDriverPhotoFileSize] = useState<string>('420 KB');
  const [isCustomDriverPhoto, setIsCustomDriverPhoto] = useState<boolean>(true);

  // --- Step 2: Detailed Auto Details & Vehicle Photo ---
  const [regPlate, setRegPlate] = useState('TN 72 CK 9204');
  const [selectedMakeModel, setSelectedMakeModel] = useState(AUTO_MAKES_MODELS[0].model);
  const [fuelType, setFuelType] = useState<'LPG' | 'CNG' | 'PETROL' | 'ELECTRIC'>('LPG');
  const [mfgYear, setMfgYear] = useState(2023);
  const [seatingCapacity, setSeatingCapacity] = useState(3);
  const [autoColor, setAutoColor] = useState('Yellow & Black (TN Standard)');

  // Auto Vehicle Photo (JPG format only)
  const [vehiclePhotoUrl, setVehiclePhotoUrl] = useState<string>(DEFAULT_AUTO_PHOTO);
  const [vehiclePhotoFileName, setVehiclePhotoFileName] = useState<string>('tn_auto_exterior.jpg');
  const [vehiclePhotoFileSize, setVehiclePhotoFileSize] = useState<string>('780 KB');
  const [isCustomVehiclePhoto, setIsCustomVehiclePhoto] = useState<boolean>(true);

  // --- Step 3: Legal Documents ---
  const [dlNumber, setDlNumber] = useState('TN72 2017 0009412');
  const [dlExpiry, setDlExpiry] = useState('2032-05-20');
  const [psvBadgeNumber, setPsvBadgeNumber] = useState('TN72-PSV-4512');
  const [aadhaarNumber, setAadhaarNumber] = useState('9842 1209 8456');
  const [rcBookNumber, setRcBookNumber] = useState('RC-TN72-9204');
  const [permitNumber, setPermitNumber] = useState('TN/AUTO/PERMIT/2024/712');
  const [insuranceProvider, setInsuranceProvider] = useState('United India Insurance Co.');
  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState('UIIC/TN/2024/991204');
  const [insuranceExpiry, setInsuranceExpiry] = useState('2027-08-30');
  const [fcExpiry, setFcExpiry] = useState('2026-12-15');

  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: boolean }>({
    dl: true,
    aadhaar: true,
    rc: true,
    permit: true,
    insurance: true,
    fc: true,
  });

  // --- Step 4: Mobile & OTP Verification ---
  const [mobile, setMobile] = useState('9443219870');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('7248');
  const [inputOtp, setInputOtp] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(30);
  const [errorMsg, setErrorMsg] = useState('');

  // Countdown timer for OTP
  useEffect(() => {
    let timer: any;
    if (otpSent && otpCountdown > 0 && !otpVerified) {
      timer = setInterval(() => {
        setOtpCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, otpCountdown, otpVerified]);

  // Handler: Driver Photo Upload (Strictly JPG / Photo formats)
  const handleDriverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate photo format: JPG / JPEG / PNG only
    const validPhotoTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const isPhotoFormat = validPhotoTypes.includes(file.type) || file.name.match(/\.(jpg|jpeg|png|webp)$/i);

    if (!isPhotoFormat) {
      setErrorMsg('Invalid format! Please upload Driver Photo in JPG or PNG photo format only.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Driver photo must be under 5 MB in size.');
      return;
    }

    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarUrl(reader.result as string);
      setDriverPhotoFileName(file.name);
      setDriverPhotoFileSize((file.size / 1024).toFixed(1) + ' KB');
      setIsCustomDriverPhoto(true);
    };
    reader.readAsDataURL(file);
  };

  // Handler: Vehicle Photo Upload (Strictly JPG / Photo formats)
  const handleVehiclePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate photo format: JPG / JPEG / PNG only
    const validPhotoTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const isPhotoFormat = validPhotoTypes.includes(file.type) || file.name.match(/\.(jpg|jpeg|png|webp)$/i);

    if (!isPhotoFormat) {
      setErrorMsg('Invalid format! Please upload Vehicle Photo in JPG or PNG photo format only.');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg('Vehicle photo must be under 8 MB in size.');
      return;
    }

    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = () => {
      setVehiclePhotoUrl(reader.result as string);
      setVehiclePhotoFileName(file.name);
      setVehiclePhotoFileSize((file.size / 1024).toFixed(1) + ' KB');
      setIsCustomVehiclePhoto(true);
    };
    reader.readAsDataURL(file);
  };

  const handleDocumentFileUpload = (docKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles((prev) => ({ ...prev, [docKey]: true }));
    }
  };

  const handleSendOtp = () => {
    if (!mobile || mobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorMsg('');
    setOtpSent(true);
    setOtpCountdown(30);
    setInputOtp('7248'); // Pre-fill convenience for seamless testing
  };

  const handleVerifyOtp = () => {
    if (!inputOtp || inputOtp.length < 4) {
      setErrorMsg('Please enter the 4-digit OTP sent to your mobile.');
      return;
    }
    setIsVerifyingOtp(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsVerifyingOtp(false);
      setOtpVerified(true);
    }, 600);
  };

  const handleFinalSubmitRegistration = () => {
    const driverId = `drv-${Date.now()}`;
    const vehicleId = `veh-${Date.now()}`;

    const bioData: DriverBioData = {
      dob,
      bloodGroup,
      fatherOrSpouseName: fatherOrSpouse,
      address,
      district,
      pincode,
      experienceYears,
      aadhaarNumber,
      badgeNumber: psvBadgeNumber,
      bioPhotoUrl: avatarUrl,
    };

    const legalDocs: DriverLegalDocuments = {
      licenseDocName: `DL_${dlNumber.replace(/\s+/g, '')}.pdf`,
      licenseExpiry: dlExpiry,
      aadhaarDocName: `Aadhaar_${aadhaarNumber.slice(-4)}.pdf`,
      rcBookDocName: `RC_${regPlate.replace(/\s+/g, '')}.pdf`,
      permitDocName: `Permit_TN_Contract_Carriage.pdf`,
      permitNumber,
      insuranceDocName: `Insurance_Policy_${insurancePolicyNumber.slice(-6)}.pdf`,
      insuranceExpiry,
      insurancePolicyNumber,
      fitnessExpiry: fcExpiry,
      verificationStatus: 'VERIFIED',
    };

    const autoSpecs: AutoRickshawSpecs = {
      make: selectedMakeModel.split(' ')[0] || 'Bajaj Auto',
      model: selectedMakeModel,
      fuelType,
      year: mfgYear,
      seatingCapacity,
      color: autoColor,
      photoUrl: vehiclePhotoUrl,
    };

    const registeredDriver: Driver = {
      id: driverId,
      userId: `usr-${driverId}`,
      name: fullName,
      phone: `+91 ${mobile}`,
      avatar: avatarUrl,
      vehicleId,
      vehicle: {
        id: vehicleId,
        driverId,
        type: 'AUTO',
        model: selectedMakeModel,
        registrationNumber: regPlate.toUpperCase(),
        color: autoColor,
        status: 'ACTIVE',
      },
      licenseNumber: dlNumber,
      rating: 5.0,
      totalRatingsCount: 1,
      onlineStatus: 'ONLINE',
      totalTrips: 0,
      todayTrips: 0,
      todayEarnings: 0,
      totalEarnings: 0,
      currentLocation: {
        lat: 8.7180,
        lng: 77.7420,
        address: `${district} Town Stand`,
        heading: 90,
      },
      bioData,
      legalDocs,
      autoSpecs,
    };

    // 1. Add to Admin Fleet
    addDriver(registeredDriver);

    // 2. Log in driver in auth store
    registerDriver(registeredDriver);

    // 3. Move to celebration step
    setCurrentStep(5);

    try {
      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.4 },
        colors: ['#F5A623', '#10B981', '#3B82F6', '#FFFFFF'],
      });
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-[#0A0E14] text-white flex flex-col justify-between selection:bg-[#F5A623] selection:text-slate-950 p-4 sm:p-6">
      {/* Top Header */}
      <header className="max-w-2xl mx-auto w-full flex items-center justify-between py-2">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#F5A623] p-2 flex items-center justify-center shadow-md">
            <img
              src="/icons/icon-auto.svg"
              alt="Auto"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="font-black text-sm text-white tracking-tight leading-tight">
              Dad's Auto &amp; Cab
            </h1>
            <span className="text-[10px] text-amber-400 font-bold block uppercase tracking-wider">
              Driver Partner Onboarding • Tamil Nadu
            </span>
          </div>
        </div>

        <Link
          to="/driver/login"
          className="text-xs text-slate-300 hover:text-white transition-colors py-1.5 px-3.5 rounded-full border border-slate-700 bg-slate-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Already Registered? Sign In</span>
        </Link>
      </header>

      {/* Main Registration Card */}
      <main className="max-w-2xl mx-auto w-full my-6">
        <div className="bg-[#121721] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Header Title & Stepper Indicator */}
          {currentStep < 5 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-black uppercase tracking-wider mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                    Step {currentStep} of 4
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {currentStep === 1 && 'Driver Bio Data & Profile Photo'}
                    {currentStep === 2 && 'Auto Rickshaw Details & Vehicle Photo'}
                    {currentStep === 3 && 'Driver Legal Details & Documents'}
                    {currentStep === 4 && 'Mobile OTP Verification'}
                  </h2>
                </div>

                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4].map((stepNum) => (
                    <div
                      key={stepNum}
                      className={`h-2 rounded-full transition-all ${
                        currentStep === stepNum
                          ? 'w-8 bg-amber-500'
                          : currentStep > stepNum
                          ? 'w-4 bg-emerald-500'
                          : 'w-4 bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="font-semibold">{errorMsg}</span>
                </div>
              )}
            </div>
          )}

          {/* =============================================================== */}
          {/* STEP 1: DRIVER BIO DATA & DRIVER PHOTO (JPG FORMAT ONLY)        */}
          {/* =============================================================== */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <p className="text-xs text-slate-400">
                Please provide your official bio data and upload your driver photograph in JPG or photo format.
              </p>

              {/* DEDICATED DRIVER PHOTO UPLOAD SECTION (JPG ONLY) */}
              <div className="bg-slate-900/90 border-2 border-dashed border-amber-500/40 rounded-3xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <Camera className="w-4 h-4 text-amber-400" />
                    <span>Upload Driver Photo (JPG Format Only) *</span>
                  </span>
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full uppercase">
                    .JPG / .JPEG / .PNG Only
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5">
                  {/* Photo Preview Circle/Card */}
                  <div className="relative group">
                    <img
                      src={avatarUrl}
                      alt="Driver Photo Preview"
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-amber-500 shadow-xl"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1 rounded-full shadow">
                      <Check className="w-3 h-3 stroke-[3.5]" />
                    </div>
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <div>
                      <p className="text-xs font-bold text-white">
                        {driverPhotoFileName}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Size: {driverPhotoFileSize} • Format: JPG Photo
                      </p>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Upload your recent front-facing passport photo or clear selfie. This photo appears on your official Dad's Auto Driver Badge and passenger app.
                    </p>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                      {/* Hidden File Input strictly accepting image formats */}
                      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all">
                        <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Select Driver Photo (.JPG)</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          className="hidden"
                          onChange={handleDriverPhotoChange}
                        />
                      </label>

                      <span className="text-[11px] text-slate-500">Max size: 5 MB</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Data Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Driver Full Name (As per DL) *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. M. Muthuvel Rajan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-amber-500 outline-none"
                  />
                </div>

                {/* Father / Spouse Name */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Father's / Spouse's Name *
                  </label>
                  <input
                    type="text"
                    value={fatherOrSpouse}
                    onChange={(e) => setFatherOrSpouse(e.target.value)}
                    placeholder="e.g. S. Manickam"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-amber-500 outline-none"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Date of Birth (DOB) *
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-amber-500 outline-none"
                  />
                </div>

                {/* Blood Group */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Blood Group (TN Transport Badge) *
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-amber-500 outline-none"
                  >
                    {['O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-'].map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District in TN */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Operating District (Tamil Nadu) *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-amber-500 outline-none"
                  >
                    {TN_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Driving Experience */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Auto Driving Experience (Years) *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              {/* Residential Address */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Residential Address (with PIN Code) *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House No, Street, Landmark"
                    className="sm:col-span-3 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-amber-500 outline-none"
                  />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="PIN: 627002"
                    className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-amber-500 outline-none font-mono"
                  />
                </div>
              </div>

              {/* Next Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!fullName || !address) {
                      setErrorMsg('Please enter your full name and residential address.');
                      return;
                    }
                    setErrorMsg('');
                    setCurrentStep(2);
                  }}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <span>Next: Auto Rickshaw &amp; Vehicle Photo</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* STEP 2: DETAILED AUTO DETAILS & VEHICLE PHOTO (JPG ONLY)         */}
          {/* =============================================================== */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <p className="text-xs text-slate-400">
                Enter your commercial Auto Rickshaw technical specifications and upload a clear exterior vehicle photo in JPG format.
              </p>

              {/* DEDICATED VEHICLE PHOTO UPLOAD SECTION (JPG ONLY) */}
              <div className="bg-slate-900/90 border-2 border-dashed border-amber-500/40 rounded-3xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <Car className="w-4 h-4 text-amber-400" />
                    <span>Upload Auto Rickshaw Vehicle Photo (JPG Format Only) *</span>
                  </span>
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full uppercase">
                    .JPG / .JPEG / .PNG Only
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5">
                  {/* Vehicle Photo Preview Card */}
                  <div className="relative group w-40 sm:w-44 h-28 rounded-2xl overflow-hidden border-2 border-amber-500 shadow-xl flex-shrink-0 bg-slate-950">
                    <img
                      src={vehiclePhotoUrl}
                      alt="Vehicle Photo Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono font-bold text-amber-400 border border-amber-500/40">
                      {regPlate || 'TN 72'}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-emerald-500 text-slate-950 p-1 rounded-full shadow">
                      <Check className="w-3 h-3 stroke-[3.5]" />
                    </div>
                  </div>

                  {/* Vehicle Photo Controls */}
                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <div>
                      <p className="text-xs font-bold text-white">
                        {vehiclePhotoFileName}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Size: {vehiclePhotoFileSize} • Format: JPG Vehicle Photo
                      </p>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Upload a front or 45-degree angle photograph of your auto rickshaw showing the Tamil Nadu yellow/black color and clearly legible registration plate.
                    </p>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                      {/* Hidden File Input strictly accepting image formats */}
                      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all">
                        <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Select Vehicle Photo (.JPG)</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          className="hidden"
                          onChange={handleVehiclePhotoChange}
                        />
                      </label>

                      <span className="text-[11px] text-slate-500">Max size: 8 MB</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Technical Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Auto Rickshaw Registration Number */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Auto Rickshaw Registration Plate Number *
                  </label>
                  <input
                    type="text"
                    value={regPlate}
                    onChange={(e) => setRegPlate(e.target.value.toUpperCase())}
                    placeholder="e.g. TN 72 AB 4587"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-amber-400 font-mono font-bold focus:border-amber-500 outline-none uppercase"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Must start with TN followed by RTO code (e.g. TN 72, TN 59, TN 01)
                  </span>
                </div>

                {/* Make & Model */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Auto Make &amp; Model *
                  </label>
                  <select
                    value={selectedMakeModel}
                    onChange={(e) => setSelectedMakeModel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-amber-500 outline-none"
                  >
                    {AUTO_MAKES_MODELS.map((item, idx) => (
                      <option key={idx} value={item.model}>
                        {item.model}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Fuel Type (Certified) *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['LPG', 'CNG', 'PETROL', 'ELECTRIC'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFuelType(type)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          fuelType === type
                            ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                        }`}
                      >
                        {type === 'ELECTRIC' ? '⚡ EV (Electric)' : type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Year of Manufacture */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Manufacturing Year *
                  </label>
                  <select
                    value={mfgYear}
                    onChange={(e) => setMfgYear(parseInt(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-amber-500 outline-none"
                  >
                    {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Seating Capacity */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Certified Passenger Capacity
                  </label>
                  <input
                    type="text"
                    disabled
                    value="3 Passengers + 1 Driver (Standard TN Norm)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 font-semibold cursor-not-allowed"
                  />
                </div>

                {/* Auto Rickshaw Color */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Auto Rickshaw Body Color
                  </label>
                  <input
                    type="text"
                    disabled
                    value={autoColor}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-400 font-semibold cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Nav Buttons */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!regPlate || regPlate.length < 6) {
                      setErrorMsg('Please enter a valid Auto registration number.');
                      return;
                    }
                    setErrorMsg('');
                    setCurrentStep(3);
                  }}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <span>Next: Legal Documents</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* STEP 3: DRIVER LEGAL DETAILS & BIO DATA UPLOAD                  */}
          {/* =============================================================== */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <p className="text-xs text-slate-400">
                Upload mandatory government and transport authority legal documents. All files are encrypted and verified against RTO database.
              </p>

              {/* 1. Commercial Driving Licence */}
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    1. Commercial Driving Licence (DL) &amp; PSV Badge
                  </span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded-md">
                    ✓ Document Attached
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-0.5">DL Number</label>
                    <input
                      type="text"
                      value={dlNumber}
                      onChange={(e) => setDlNumber(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-0.5">DL Expiry Date</label>
                    <input
                      type="date"
                      value={dlExpiry}
                      onChange={(e) => setDlExpiry(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-0.5">PSV Commercial Badge</label>
                    <input
                      type="text"
                      value={psvBadgeNumber}
                      onChange={(e) => setPsvBadgeNumber(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-amber-400 font-bold cursor-pointer hover:underline">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Re-upload Driving Licence Scan / Photo</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleDocumentFileUpload('dl', e)}
                  />
                </label>
              </div>

              {/* 2. Aadhaar Card */}
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    2. Aadhaar Card (Bio Data Verification)
                  </span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded-md">
                    ✓ Document Attached
                  </span>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-0.5">12-Digit Aadhaar Number</label>
                  <input
                    type="text"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
                    placeholder="XXXX XXXX XXXX"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                  />
                </div>

                <label className="flex items-center gap-2 text-xs text-amber-400 font-bold cursor-pointer hover:underline">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Re-upload Aadhaar Front &amp; Back Scan</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleDocumentFileUpload('aadhaar', e)}
                  />
                </label>
              </div>

              {/* 3. RC Book & TN Auto Commercial Permit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* RC Book */}
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <span className="text-xs font-black text-white block">
                    3. Vehicle RC Book
                  </span>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-0.5">RC Certificate No.</label>
                    <input
                      type="text"
                      value={rcBookNumber}
                      onChange={(e) => setRcBookNumber(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                    />
                  </div>
                  <label className="flex items-center gap-1.5 text-xs text-amber-400 font-bold cursor-pointer hover:underline pt-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload RC Copy</span>
                    <input type="file" className="hidden" onChange={(e) => handleDocumentFileUpload('rc', e)} />
                  </label>
                </div>

                {/* Auto Commercial Permit */}
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <span className="text-xs font-black text-white block">
                    4. TN Commercial Auto Permit
                  </span>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Permit Number</label>
                    <input
                      type="text"
                      value={permitNumber}
                      onChange={(e) => setPermitNumber(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                    />
                  </div>
                  <label className="flex items-center gap-1.5 text-xs text-amber-400 font-bold cursor-pointer hover:underline pt-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Permit Copy</span>
                    <input type="file" className="hidden" onChange={(e) => handleDocumentFileUpload('permit', e)} />
                  </label>
                </div>
              </div>

              {/* 4. Insurance & Fitness Certificate */}
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <span className="text-xs font-black text-white block">
                  5. Auto Insurance &amp; Fitness Certificate (FC)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Insurance Company</label>
                    <input
                      type="text"
                      value={insuranceProvider}
                      onChange={(e) => setInsuranceProvider(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Insurance Valid Upto</label>
                    <input
                      type="date"
                      value={insuranceExpiry}
                      onChange={(e) => setInsuranceExpiry(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-0.5">FC Valid Upto</label>
                    <input
                      type="date"
                      value={fcExpiry}
                      onChange={(e) => setFcExpiry(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Nav Buttons */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!dlNumber || !aadhaarNumber) {
                      setErrorMsg('Please provide your Driving Licence and Aadhaar numbers.');
                      return;
                    }
                    setErrorMsg('');
                    setCurrentStep(4);
                  }}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <span>Next: Mobile OTP Verification</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* STEP 4: MOBILE OTP VERIFICATION                                 */}
          {/* =============================================================== */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <h3 className="text-lg font-black text-white">
                  Driver Mobile Verification
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  A high-priority SMS one-time passcode (OTP) is sent to authenticate your mobile number for passenger dispatch.
                </p>
              </div>

              {/* Phone Input Box */}
              <div className="max-w-sm mx-auto space-y-3">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    disabled={otpSent}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    placeholder="9443219870"
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-sm font-bold text-white focus:border-amber-500 outline-none font-mono"
                  />
                </div>

                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send SMS OTP to Number</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                ) : (
                  <div className="space-y-4 pt-2">
                    {/* Simulated live SMS Banner */}
                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>SMS Notification Sent (+91 {mobile})</span>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Your Dad's Auto Driver Registration OTP is{' '}
                        <strong className="text-amber-400 font-mono text-sm underline">{otpCode}</strong>.
                      </p>
                    </div>

                    {/* 4-digit OTP Input */}
                    <div>
                      <label className="text-xs text-slate-400 font-bold block mb-1 text-center">
                        Enter 4-Digit Verification Code
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        value={inputOtp}
                        onChange={(e) => setInputOtp(e.target.value)}
                        placeholder="7248"
                        className="w-full text-center tracking-widest text-2xl font-black py-3 rounded-2xl bg-slate-900 border border-slate-700 text-amber-400 focus:border-amber-500 outline-none font-mono"
                      />
                    </div>

                    {!otpVerified ? (
                      <button
                        type="button"
                        disabled={isVerifyingOtp}
                        onClick={handleVerifyOtp}
                        className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isVerifyingOtp ? (
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                            <span>Verify Code &amp; Complete Registration</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs font-black flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5 stroke-[3]" />
                        <span>Phone Number +91 {mobile} Verified Successfully!</span>
                      </div>
                    )}

                    {/* Resend OTP */}
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                      <span>Didn't receive code?</span>
                      {otpCountdown > 0 ? (
                        <span className="text-slate-500 font-mono">Resend in {otpCountdown}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="text-amber-400 font-bold hover:underline cursor-pointer"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Nav & Submit Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Documents</span>
                </button>

                {otpVerified && (
                  <button
                    type="button"
                    onClick={handleFinalSubmitRegistration}
                    className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-sm shadow-xl flex items-center gap-2 animate-bounce cursor-pointer"
                  >
                    <span>Register Auto &amp; Go Online</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* STEP 5: REGISTRATION COMPLETE & ACTIVATION                       */}
          {/* =============================================================== */}
          {currentStep === 5 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-yellow">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                  Vanakkam &amp; Congratulations!
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Driver Partner Registered!
                </h2>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Your Auto Rickshaw has been successfully registered under Dad's Auto &amp; Cab fleet in Tamil Nadu. Your digital partner profile is active.
                </p>
              </div>

              {/* Registered Partner Card showing BOTH Driver Photo & Vehicle Photo */}
              <div className="max-w-md mx-auto bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-5 text-left space-y-4 shadow-xl">
                {/* Driver Photo & Name */}
                <div className="flex items-center gap-3.5">
                  <img
                    src={avatarUrl}
                    alt={fullName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500 shadow-md"
                  />
                  <div>
                    <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wide block">
                      ● Active Duty Driver
                    </span>
                    <h3 className="font-black text-base text-white">{fullName}</h3>
                    <p className="text-xs text-amber-400 font-mono font-bold">+91 {mobile}</p>
                    <span className="text-[10px] text-slate-400">{district}, Tamil Nadu</span>
                  </div>
                </div>

                {/* Uploaded Auto Vehicle Photo with Overlay */}
                <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
                  <img
                    src={vehiclePhotoUrl}
                    alt="Registered Auto Vehicle"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold text-amber-400 border border-amber-500/40">
                    {regPlate}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-emerald-500/90 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                    Verified Vehicle Photo
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Auto Plate</span>
                    <span className="font-mono font-extrabold text-amber-400 text-sm">
                      {regPlate}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Model</span>
                    <span className="font-bold text-white text-xs truncate block">
                      {selectedMakeModel.split(' ')[0]} {fuelType}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Blood Group</span>
                    <span className="font-bold text-red-400 text-xs">{bloodGroup}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Verification</span>
                    <span className="text-emerald-400 font-extrabold text-xs">
                      100% RTO Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={() => navigate('/driver')}
                  className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
                >
                  <span>Launch Driver Duty Dashboard</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-2xl mx-auto w-full text-center text-xs text-slate-500 py-3">
        <p>Dad's Auto &amp; Cab • Driver Onboarding &amp; Verification (Tamil Nadu)</p>
        <p className="text-[10px] text-slate-600 mt-0.5">
          Regulated under Section 66 of Motor Vehicles Act, 1988 &amp; Tamil Nadu Motor Vehicles Rules
        </p>
      </footer>
    </div>
  );
};
