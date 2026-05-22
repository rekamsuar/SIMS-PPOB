'use client';

import { FaTimes } from 'react-icons/fa';

export default function Toast({
  message,
  type = 'error',
  onClose,
  className = '',
}) {
  if (!message) return null;

  const bgClass = type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-[#fff1f0] border-[#ffccc7] text-[#f92f16]';
  const closeButtonColor = type === 'success' ? 'hover:bg-emerald-100 text-emerald-500' : 'hover:bg-[#ffdfdb] text-[#f92f16]';

  return (
    <div
      className={`w-full max-w-md flex items-center justify-between p-3.5 border rounded-md shadow-sm transition-all duration-300 animate-slide-up ${bgClass} ${className}`}
      role="alert"
    >
      <span className="text-sm font-medium tracking-wide leading-relaxed pr-4">
        {message}
      </span>
      {onClose && (
        <button
          onClick={onClose}
          type="button"
          className={`p-1 rounded-full transition-colors focus:outline-none ${closeButtonColor}`}
          aria-label="Close alert"
        >
          <FaTimes className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
