export function PensrLogo({ className = '', size = 48 }: { className?: string; size?: number }) {
  return (
    <svg 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      width={size}
      height={size}
    >
      {/* Modern minimalist pen nib icon */}
      <defs>
        <linearGradient id="penGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      
      {/* Pen nib - left tine */}
      <path 
        d="M 24 12 L 28 32 L 22 40 Z" 
        fill="url(#penGradient)" 
        opacity="0.9"
      />
      
      {/* Pen nib - right tine */}
      <path 
        d="M 40 12 L 36 32 L 42 40 Z" 
        fill="url(#penGradient)" 
        opacity="0.7"
      />
      
      {/* Barrel */}
      <rect 
        x="26" 
        y="36" 
        width="12" 
        height="20" 
        rx="3" 
        fill="url(#penGradient)"
      />
      
      {/* Accent line */}
      <line 
        x1="26" 
        y1="42" 
        x2="38" 
        y2="42" 
        stroke="#fff" 
        strokeWidth="1.5"
        opacity="0.4"
      />
    </svg>
  )
}
