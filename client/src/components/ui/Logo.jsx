const Logo = ({ size = 42, className = '', showText = false }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <img src="/images/logo.png" alt="Handloom Haven" className={`${showText ? 'h-12' : 'h-10'} w-auto object-contain`} onError={(e) => {
      e.target.style.display = 'none';
      e.target.nextSibling.style.display = 'flex';
    }} />
    {/* SVG fallback if image fails */}
    <div className="hidden items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 64 64">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3C5241"/>
            <stop offset="100%" stopColor="#6B8F4B"/>
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="url(#logoGrad)"/>
        <text x="32" y="42" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="bold" fontSize="28" fill="white">HH</text>
      </svg>
    </div>
  </div>
);

export default Logo;
