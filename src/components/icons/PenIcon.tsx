export function PenIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M14 2L16.5 8L22 8.5L18 12.5L19.5 18L14 15L8.5 18L10 12.5L6 8.5L11.5 8L14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      <path d="M14 15V26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M11 23L14 26L17 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
