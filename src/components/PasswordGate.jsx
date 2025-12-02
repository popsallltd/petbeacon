import { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';

const CORRECT_PASSWORD = 'popsall';
const STORAGE_KEY = 'petbeacon_authenticated';

export default function PasswordGate({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === CORRECT_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsAuthenticated(true);
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[600px] h-[600px] border border-primary-500/10 rounded-full" />
          <div className="absolute inset-8 border border-primary-500/10 rounded-full" />
          <div className="absolute inset-16 border border-primary-500/10 rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 mx-auto relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary-400/30 rounded-3xl blur-xl animate-pulse-soft" />

              {/* Logo container */}
              <div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 flex items-center justify-center p-4 shadow-2xl">
                <img
                  src="/favicon.png"
                  alt="PetBeacon"
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
            </div>

            {/* Beacon rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
              <div className="beacon-ring border-primary-400/40" />
              <div className="beacon-ring border-primary-400/40" />
              <div className="beacon-ring border-primary-400/40" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">PetBeacon</h1>
          <p className="text-primary-200">Enter password to continue</p>
        </div>

        {/* Password form */}
        <form onSubmit={handleSubmit}>
          <div
            className={`
              bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl
              ${isShaking ? 'animate-shake' : ''}
            `}
            style={isShaking ? { animation: 'shake 0.5s ease-in-out' } : {}}
          >
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-300" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter password"
                autoFocus
                className={`
                  w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border text-white
                  placeholder:text-primary-300/60 text-lg
                  focus:outline-none focus:ring-2 focus:ring-primary-400/50
                  ${error ? 'border-red-400/60' : 'border-white/20'}
                `}
              />
            </div>

            {error && (
              <p className="text-red-300 text-sm mt-2 text-center">
                Incorrect password. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="w-full mt-4 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-primary-400/40"
            >
              Access Prototype
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>

        <p className="text-center text-primary-300/60 text-sm mt-6">
          Demo Prototype - Confidential
        </p>
      </div>

      {/* Shake animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
