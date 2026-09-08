import Logo from './Logo';

const PageLoader = ({ text = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-[#FAF7F2]/80 backdrop-blur-sm">
      <div className="relative">
        {/* Outer spinning ring */}
        <svg className="w-24 h-24 animate-spin" style={{ animationDuration: '2.5s' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#E8E4DC" strokeWidth="2" />
          <circle cx="50" cy="50" r="46" fill="none" stroke="#3C5241" strokeWidth="2" strokeDasharray="72 218" strokeLinecap="round" />
        </svg>

        {/* Inner counter-spinning ring */}
        <svg className="absolute inset-0 w-24 h-24 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="38" fill="none" stroke="#C4822D" strokeWidth="1" strokeDasharray="12 30" strokeLinecap="round" opacity="0.5" />
        </svg>

        {/* Logo in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-[#E8E4DC]">
            <Logo size={36} />
          </div>
        </div>
      </div>

      {/* Loading text */}
      <p className="mt-5 text-sm text-[#7D7162] font-medium tracking-wide">{text}</p>

      {/* Pulsing dots */}
      <div className="mt-3 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full bg-[#3C5241]"
            style={{
              animation: 'loaderDot 1.4s ease-in-out infinite',
              animationDelay: `${i * 0.16}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes loaderDot {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.6); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
