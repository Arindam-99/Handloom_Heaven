import { useState, useEffect } from 'react';
import Logo from './Logo';

const SplashScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState(0); // 0=logo, 1=name, 2=subtitle, 3=fade out
  const siteName = 'Handloom Haven';
  const subtitle = 'Artisanal & Ethical Weaves';

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => onComplete(), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#2A2520] transition-opacity duration-700 ${phase === 3 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="weave" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q10 10 20 20 Q30 30 40 20" stroke="#C4822D" fill="none" strokeWidth="1" />
              <path d="M0 20 Q10 30 20 20 Q30 10 40 20" stroke="#3C5241" fill="none" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#weave)" />
        </svg>
      </div>

      {/* Logo */}
      <div className={`transition-all duration-700 ${phase >= 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        <div className="relative">
          <Logo size={80} />
          {/* Spinning ring around logo */}
          <svg className="absolute -inset-3 animate-spin" style={{ animationDuration: '3s' }} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#C4822D" strokeWidth="0.5" strokeDasharray="8 12" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* Site Name - letter by letter */}
      <div className="mt-6 overflow-hidden">
        <div className="flex justify-center">
          {siteName.split('').map((char, i) => (
            <span
              key={i}
              className="text-4xl md:text-5xl font-bold text-white inline-block"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                opacity: phase >= 1 ? 1 : 0,
                transform: phase >= 1 ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.04}s`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>

      {/* Subtitle */}
      <p
        className="mt-3 text-sm tracking-[0.3em] uppercase text-[#C4822D] font-medium"
        style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.6s ease-out',
        }}
      >
        {subtitle}
      </p>

      {/* Decorative line */}
      <div
        className="mt-6 h-[1px] bg-gradient-to-r from-transparent via-[#C4822D] to-transparent"
        style={{
          width: phase >= 2 ? '200px' : '0px',
          transition: 'width 0.8s ease-out 0.3s',
        }}
      />

      {/* Loading dots */}
      <div className="mt-8 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#C4822D]"
            style={{
              animation: 'splashPulse 1.2s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes splashPulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
