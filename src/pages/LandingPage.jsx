import { Link } from 'react-router-dom';
import { PawPrint, Users, Heart, Shield, Scan, MapPin, ArrowRight, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient orbs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-40" />
          <div className="absolute top-60 -left-20 w-72 h-72 bg-accent-200 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-50" />

          {/* Beacon rings animation */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 beacon-ring" />
            <div className="w-32 h-32 beacon-ring" />
            <div className="w-32 h-32 beacon-ring" />
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-100 text-accent-700 text-sm font-medium mb-8 animate-fade-in">
              <Heart className="w-4 h-4 fill-accent-500" />
              100% of registrations donated to rescue centres
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-slide-up">
              <span className="gradient-text">Guiding Pets</span>
              <br />
              <span className="text-primary-900">Home</span>
            </h1>

            {/* Subheading */}
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-primary-700 mb-10 animate-slide-up stagger-1" style={{ opacity: 0, animationFillMode: 'forwards' }}>
              A community-powered network connecting lost pets with those who find them.
              Register your pet, join our helper network, and help reunite families.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up stagger-2" style={{ opacity: 0, animationFillMode: 'forwards' }}>
              <Link
                to="/register"
                className="group flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-semibold text-lg shadow-glow hover:shadow-glow-strong transition-all duration-300 hover:-translate-y-0.5"
              >
                <PawPrint className="w-5 h-5" />
                Register Your Pet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/helpers"
                className="group flex items-center gap-2 px-8 py-4 bg-white hover:bg-cream-100 text-primary-700 rounded-2xl font-semibold text-lg shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-0.5 border border-primary-100"
              >
                <Users className="w-5 h-5" />
                Join as Helper
              </Link>
            </div>
          </div>

          {/* Hero visual */}
          <div className="mt-16 sm:mt-20 relative animate-slide-up stagger-3" style={{ opacity: 0, animationFillMode: 'forwards' }}>
            <div className="relative max-w-4xl mx-auto">
              {/* Main card */}
              <div className="relative bg-white rounded-3xl shadow-soft p-6 sm:p-8 border border-primary-100">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Pet image placeholder */}
                  <div className="relative">
                    <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center overflow-hidden">
                      <img
                        src="/PetBeacon Logo.png"
                        alt="PetBeacon"
                        className="w-40 h-40 object-contain animate-float"
                      />
                    </div>
                    {/* Status badge */}
                    <div className="absolute -bottom-2 -right-2 px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-semibold shadow-lg">
                      Protected
                    </div>
                  </div>

                  {/* Pet info */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-3">
                      <Sparkles className="w-4 h-4" />
                      Example Registration
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-primary-900 mb-2">Max the Labrador</h3>
                    <p className="text-primary-600 mb-4">Registered 3 days ago</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                      <span className="px-3 py-1.5 bg-cream-100 rounded-lg text-sm text-primary-700">
                        Microchipped
                      </span>
                      <span className="px-3 py-1.5 bg-cream-100 rounded-lg text-sm text-primary-700">
                        2 years old
                      </span>
                      <span className="px-3 py-1.5 bg-cream-100 rounded-lg text-sm text-primary-700">
                        Manchester
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating helper cards */}
              <div className="hidden lg:block absolute -left-16 top-1/4 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="bg-white rounded-2xl shadow-card p-4 border border-primary-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-lg">📍</div>
                    <div>
                      <p className="font-semibold text-primary-900 text-sm">PetMed Clinic</p>
                      <p className="text-xs text-primary-500">Safe Haven</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block absolute -right-12 bottom-1/4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="bg-white rounded-2xl shadow-card p-4 border border-primary-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-lg">⭐</div>
                    <div>
                      <p className="font-semibold text-primary-900 text-sm">12 Helpers Nearby</p>
                      <p className="text-xs text-primary-500">Within 5 miles</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
              How PetBeacon Works
            </h2>
            <p className="text-lg text-primary-600 max-w-2xl mx-auto">
              A simple three-step process to protect your pet and support local rescues
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative group">
              <div className="bg-cream-50 rounded-3xl p-8 h-full border border-cream-200 transition-all duration-300 hover:shadow-soft hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-primary-500 text-white flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform">
                  <PawPrint className="w-8 h-8" />
                </div>
                <div className="text-sm font-semibold text-primary-500 mb-2">Step 1</div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">Register Your Pet</h3>
                <p className="text-primary-600">
                  Enter your pet&apos;s details and microchip number. Upload a photo so helpers can identify them easily.
                </p>
              </div>
              {/* Connector */}
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-200" />
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="bg-cream-50 rounded-3xl p-8 h-full border border-cream-200 transition-all duration-300 hover:shadow-soft hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-accent-500 text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8" />
                </div>
                <div className="text-sm font-semibold text-accent-600 mb-2">Step 2</div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">Support a Rescue</h3>
                <p className="text-primary-600">
                  Choose a local rescue centre. Your £10 registration fee goes directly to help animals in need.
                </p>
              </div>
              {/* Connector */}
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-200" />
            </div>

            {/* Step 3 */}
            <div className="group">
              <div className="bg-cream-50 rounded-3xl p-8 h-full border border-cream-200 transition-all duration-300 hover:shadow-soft hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-primary-600 text-white flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8" />
                </div>
                <div className="text-sm font-semibold text-primary-600 mb-2">Step 3</div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">Stay Protected</h3>
                <p className="text-primary-600">
                  If your pet goes missing, our network of helpers and scanners activates to bring them home safely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Helper Types */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
              Our Helper Network
            </h2>
            <p className="text-lg text-primary-600 max-w-2xl mx-auto">
              From veterinary clinics to community volunteers, our network covers every corner
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Vet Clinics */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-primary-50 hover:shadow-soft transition-all duration-300">
              <div className="text-3xl mb-4">📍</div>
              <h3 className="font-bold text-primary-900 mb-1">Vet Clinics</h3>
              <p className="text-sm text-red-600 font-medium mb-2">Safe Haven</p>
              <p className="text-sm text-primary-600">
                Exact location scanning with universal ISO readers
              </p>
            </div>

            {/* Featured Providers */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-primary-50 hover:shadow-soft transition-all duration-300">
              <div className="text-3xl mb-4">⭐</div>
              <h3 className="font-bold text-primary-900 mb-1">Featured Providers</h3>
              <p className="text-sm text-amber-600 font-medium mb-2">10 mile reach</p>
              <p className="text-sm text-primary-600">
                Universal scanners at pet stores and groomers
              </p>
            </div>

            {/* Basic Providers */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-primary-50 hover:shadow-soft transition-all duration-300">
              <div className="text-3xl mb-4">🌟</div>
              <h3 className="font-bold text-primary-900 mb-1">Basic Providers</h3>
              <p className="text-sm text-gray-600 font-medium mb-2">5 mile reach</p>
              <p className="text-sm text-primary-600">
                Basic scanners at local businesses
              </p>
            </div>

            {/* Community Helpers */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-primary-50 hover:shadow-soft transition-all duration-300">
              <div className="text-3xl mb-4">🔵</div>
              <h3 className="font-bold text-primary-900 mb-1">Community Helpers</h3>
              <p className="text-sm text-blue-600 font-medium mb-2">Volunteers</p>
              <p className="text-sm text-primary-600">
                Local volunteers ready to help search
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/helpers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-xl font-semibold transition-colors"
            >
              <MapPin className="w-5 h-5" />
              View Helper Map
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Donation Highlight */}
      <section className="py-20 sm:py-28 bg-primary-900 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🐕</div>
          <div className="absolute bottom-10 right-10 text-8xl">🐈</div>
          <div className="absolute top-1/2 left-1/3 text-6xl">🐾</div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-primary-200 text-sm font-medium mb-8">
            <Heart className="w-4 h-4 fill-current" />
            Our Promise
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            100% of Pet Registrations
            <br />
            <span className="text-primary-300">Donated to Rescue Centres</span>
          </h2>

          <p className="text-lg sm:text-xl text-primary-200 mb-10 max-w-2xl mx-auto">
            Every £10 registration fee goes directly to your chosen local rescue centre.
            Protect your pet while helping animals in need.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="px-6 py-4 bg-white/10 backdrop-blur rounded-2xl">
              <p className="text-3xl font-bold text-white">Manchester Dogs&apos; Home</p>
            </div>
            <div className="px-6 py-4 bg-white/10 backdrop-blur rounded-2xl">
              <p className="text-3xl font-bold text-white">RSPCA Manchester</p>
            </div>
            <div className="px-6 py-4 bg-white/10 backdrop-blur rounded-2xl">
              <p className="text-3xl font-bold text-white">Hope Rescue</p>
            </div>
          </div>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <PawPrint className="w-5 h-5" />
            Register & Donate
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-cream-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/PetBeacon Logo Simple.png" alt="PetBeacon" className="h-8 w-auto" />
              <span className="font-bold text-primary-800">PetBeacon</span>
            </div>
            <p className="text-sm text-primary-600">
              Demo Prototype - Guiding Pets Home
            </p>
            <div className="flex items-center gap-6 text-sm text-primary-600">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
