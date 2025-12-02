import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { rescueCentres, petTypes, dogBreeds, catBreeds } from '../data/mockData';
import {
  PawPrint,
  Camera,
  Scan,
  Heart,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  X,
} from 'lucide-react';

export default function RegisterPet() {
  const navigate = useNavigate();
  const {
    registrationStep,
    setRegistrationStep,
    registrationData,
    updateRegistrationData,
    completeRegistration,
    resetRegistration,
  } = useApp();

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    { num: 1, label: 'Pet Details', icon: PawPrint },
    { num: 2, label: 'Microchip', icon: Scan },
    { num: 3, label: 'Rescue Centre', icon: Heart },
    { num: 4, label: 'Payment', icon: CreditCard },
  ];

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!registrationData.petName?.trim()) newErrors.petName = 'Pet name is required';
      if (!registrationData.petType) newErrors.petType = 'Please select a pet type';
      if (!registrationData.breed) newErrors.breed = 'Please select a breed';
    }

    if (step === 2) {
      const chip = registrationData.microchipNumber?.replace(/\s/g, '');
      if (!chip) {
        newErrors.microchipNumber = 'Microchip number is required';
      } else if (!/^\d{15}$/.test(chip)) {
        newErrors.microchipNumber = 'Must be exactly 15 digits';
      }
    }

    if (step === 3) {
      if (!registrationData.rescueCentre) newErrors.rescueCentre = 'Please select a rescue centre';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(registrationStep)) {
      if (registrationStep < 4) {
        setRegistrationStep(registrationStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (registrationStep > 1) {
      setRegistrationStep(registrationStep - 1);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateRegistrationData({ photoBase64: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMicrochipChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 15);
    // Format with spaces every 5 digits
    value = value.replace(/(\d{5})(?=\d)/g, '$1 ');
    updateRegistrationData({ microchipNumber: value });
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    completeRegistration();
    setIsProcessing(false);
    setIsComplete(true);
  };

  const handleFinish = () => {
    resetRegistration();
    setIsComplete(false);
    navigate('/');
  };

  const getBreeds = () => {
    if (registrationData.petType === 'dog') return dogBreeds;
    if (registrationData.petType === 'cat') return catBreeds;
    return ['Mixed', 'Other'];
  };

  // Success Screen
  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full text-center">
          <div className="relative inline-block mb-8">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            {/* Beacon rings */}
            <div className="absolute inset-0 w-24 h-24 beacon-ring border-green-300" />
            <div className="absolute inset-0 w-24 h-24 beacon-ring border-green-300" />
            <div className="absolute inset-0 w-24 h-24 beacon-ring border-green-300" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
            Registration Complete!
          </h1>

          <p className="text-lg text-primary-600 mb-8">
            <span className="font-semibold text-primary-800">{registrationData.petName}</span> is now protected by PetBeacon.
            Your £10 donation has been sent to{' '}
            <span className="font-semibold text-primary-800">
              {rescueCentres.find(r => r.id === registrationData.rescueCentre)?.name}
            </span>.
          </p>

          <div className="bg-white rounded-2xl shadow-soft p-6 mb-8 border border-primary-100">
            <div className="flex items-center gap-4">
              {registrationData.photoBase64 ? (
                <img
                  src={registrationData.photoBase64}
                  alt={registrationData.petName}
                  className="w-20 h-20 rounded-xl object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-primary-100 flex items-center justify-center">
                  <PawPrint className="w-8 h-8 text-primary-400" />
                </div>
              )}
              <div className="text-left">
                <h3 className="font-bold text-primary-900">{registrationData.petName}</h3>
                <p className="text-sm text-primary-600">{registrationData.breed}</p>
                <p className="text-xs text-primary-500 mt-1">
                  Microchip: {registrationData.microchipNumber}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleFinish}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-semibold text-lg shadow-glow transition-all"
          >
            Back to Home
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = registrationStep === step.num;
              const isCompleted = registrationStep > step.num;

              return (
                <div key={step.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                        w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                        ${isActive
                          ? 'bg-primary-500 text-white shadow-glow scale-110'
                          : isCompleted
                            ? 'bg-primary-100 text-primary-600'
                            : 'bg-cream-100 text-primary-400'
                        }
                      `}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span
                      className={`
                        mt-2 text-xs font-medium hidden sm:block
                        ${isActive ? 'text-primary-700' : 'text-primary-400'}
                      `}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`
                        w-8 sm:w-16 h-0.5 mx-2
                        ${registrationStep > step.num ? 'bg-primary-400' : 'bg-cream-200'}
                      `}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-soft p-6 sm:p-8 border border-primary-100">
          {/* Step 1: Pet Details */}
          {registrationStep === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-primary-900 mb-2">Pet Details</h2>
              <p className="text-primary-600 mb-6">Tell us about your furry friend</p>

              <div className="space-y-6">
                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Pet Photo (optional)
                  </label>
                  <div className="flex items-start gap-4">
                    {registrationData.photoBase64 ? (
                      <div className="relative">
                        <img
                          src={registrationData.photoBase64}
                          alt="Pet preview"
                          className="w-32 h-32 rounded-2xl object-cover"
                        />
                        <button
                          onClick={() => updateRegistrationData({ photoBase64: null })}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="w-32 h-32 rounded-2xl border-2 border-dashed border-primary-200 flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors">
                        <Upload className="w-8 h-8 text-primary-400 mb-2" />
                        <span className="text-xs text-primary-500">Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Pet Name */}
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Pet Name *
                  </label>
                  <input
                    type="text"
                    value={registrationData.petName}
                    onChange={(e) => updateRegistrationData({ petName: e.target.value })}
                    placeholder="Enter your pet's name"
                    className={`
                      w-full px-4 py-3 rounded-xl border bg-cream-50 text-primary-900
                      placeholder:text-primary-400 transition-colors
                      ${errors.petName ? 'border-red-300' : 'border-primary-100 focus:border-primary-400'}
                    `}
                  />
                  {errors.petName && (
                    <p className="mt-1 text-sm text-red-500">{errors.petName}</p>
                  )}
                </div>

                {/* Pet Type */}
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Pet Type *
                  </label>
                  <select
                    value={registrationData.petType}
                    onChange={(e) => {
                      updateRegistrationData({ petType: e.target.value, breed: '' });
                    }}
                    className={`
                      w-full px-4 py-3 rounded-xl border bg-cream-50 text-primary-900 transition-colors
                      ${errors.petType ? 'border-red-300' : 'border-primary-100 focus:border-primary-400'}
                    `}
                  >
                    <option value="">Select pet type</option>
                    {petTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.petType && (
                    <p className="mt-1 text-sm text-red-500">{errors.petType}</p>
                  )}
                </div>

                {/* Breed */}
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Breed *
                  </label>
                  <select
                    value={registrationData.breed}
                    onChange={(e) => updateRegistrationData({ breed: e.target.value })}
                    disabled={!registrationData.petType}
                    className={`
                      w-full px-4 py-3 rounded-xl border bg-cream-50 text-primary-900 transition-colors
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${errors.breed ? 'border-red-300' : 'border-primary-100 focus:border-primary-400'}
                    `}
                  >
                    <option value="">Select breed</option>
                    {getBreeds().map((breed) => (
                      <option key={breed} value={breed}>
                        {breed}
                      </option>
                    ))}
                  </select>
                  {errors.breed && (
                    <p className="mt-1 text-sm text-red-500">{errors.breed}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Microchip */}
          {registrationStep === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-primary-900 mb-2">Microchip Number</h2>
              <p className="text-primary-600 mb-6">Enter your pet&apos;s 15-digit microchip number</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Microchip Number *
                  </label>
                  <div className="relative">
                    <Scan className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                    <input
                      type="text"
                      value={registrationData.microchipNumber}
                      onChange={handleMicrochipChange}
                      placeholder="12345 67890 12345"
                      className={`
                        w-full pl-12 pr-4 py-4 rounded-xl border bg-cream-50 text-primary-900
                        text-lg tracking-wider font-mono placeholder:text-primary-300
                        ${errors.microchipNumber ? 'border-red-300' : 'border-primary-100 focus:border-primary-400'}
                      `}
                    />
                  </div>
                  {errors.microchipNumber && (
                    <p className="mt-1 text-sm text-red-500">{errors.microchipNumber}</p>
                  )}
                  <p className="mt-2 text-xs text-primary-500">
                    The microchip number can be found on your pet&apos;s registration documents or by scanning at a vet.
                  </p>
                </div>

                {/* Info box */}
                <div className="bg-primary-50 rounded-xl p-4 flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Scan className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-800 text-sm">Why microchip?</h4>
                    <p className="text-sm text-primary-600 mt-1">
                      Microchips are the most reliable way to identify lost pets. Our helper network uses scanners to read these chips and reunite pets with their owners.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Rescue Centre */}
          {registrationStep === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-primary-900 mb-2">Choose a Rescue Centre</h2>
              <p className="text-primary-600 mb-6">
                Your £10 registration fee will be donated to your chosen centre
              </p>

              <div className="space-y-4">
                {rescueCentres.map((centre) => (
                  <label
                    key={centre.id}
                    className={`
                      block p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200
                      ${registrationData.rescueCentre === centre.id
                        ? 'border-primary-500 bg-primary-50 shadow-glow'
                        : 'border-primary-100 hover:border-primary-300 bg-white'
                      }
                    `}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="radio"
                        name="rescueCentre"
                        value={centre.id}
                        checked={registrationData.rescueCentre === centre.id}
                        onChange={(e) => updateRegistrationData({ rescueCentre: e.target.value })}
                        className="mt-1 w-5 h-5 text-primary-600 accent-primary-600"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-primary-900">{centre.name}</h3>
                        <p className="text-sm text-primary-500">{centre.location}</p>
                        <p className="text-sm text-primary-600 mt-1">{centre.description}</p>
                      </div>
                      <Heart
                        className={`w-5 h-5 ${
                          registrationData.rescueCentre === centre.id
                            ? 'text-red-500 fill-red-500'
                            : 'text-primary-300'
                        }`}
                      />
                    </div>
                  </label>
                ))}
              </div>
              {errors.rescueCentre && (
                <p className="mt-2 text-sm text-red-500">{errors.rescueCentre}</p>
              )}
            </div>
          )}

          {/* Step 4: Payment */}
          {registrationStep === 4 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-primary-900 mb-2">Complete Registration</h2>
              <p className="text-primary-600 mb-6">Review and confirm your registration</p>

              {/* Summary */}
              <div className="bg-cream-50 rounded-2xl p-5 mb-6">
                <h3 className="font-semibold text-primary-800 mb-4">Registration Summary</h3>
                <div className="flex items-center gap-4 mb-4">
                  {registrationData.photoBase64 ? (
                    <img
                      src={registrationData.photoBase64}
                      alt={registrationData.petName}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-primary-100 flex items-center justify-center">
                      <PawPrint className="w-6 h-6 text-primary-400" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-primary-900">{registrationData.petName}</p>
                    <p className="text-sm text-primary-600">{registrationData.breed}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-primary-600">Microchip:</span>
                    <span className="font-mono text-primary-800">{registrationData.microchipNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-600">Donation to:</span>
                    <span className="text-primary-800">
                      {rescueCentres.find(r => r.id === registrationData.rescueCentre)?.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment amount */}
              <div className="bg-accent-50 rounded-2xl p-5 mb-6 border border-accent-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-accent-700 font-medium">Registration Fee</p>
                    <p className="text-xs text-accent-600">100% donated to rescue centre</p>
                  </div>
                  <p className="text-3xl font-bold text-accent-700">£10</p>
                </div>
              </div>

              {/* Mock payment form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      defaultValue="4242 4242 4242 4242"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-primary-100 bg-cream-50 text-primary-900"
                      readOnly
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      Expiry
                    </label>
                    <input
                      type="text"
                      placeholder="12/25"
                      defaultValue="12/25"
                      className="w-full px-4 py-3 rounded-xl border border-primary-100 bg-cream-50 text-primary-900"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      defaultValue="123"
                      className="w-full px-4 py-3 rounded-xl border border-primary-100 bg-cream-50 text-primary-900"
                      readOnly
                    />
                  </div>
                </div>
                <p className="text-xs text-primary-500 text-center">
                  Demo mode - no real payment will be processed
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-primary-100">
            {registrationStep > 1 ? (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-4 py-2 text-primary-600 hover:text-primary-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            {registrationStep < 4 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-all shadow-glow"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex items-center gap-2 px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white rounded-xl font-semibold transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Complete Payment
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
