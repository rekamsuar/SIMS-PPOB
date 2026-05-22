'use client';

import { FaSpinner } from 'react-icons/fa';

export default function Button({
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  children,
  className = '',
}) {
  const isButtonDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isButtonDisabled}
      className={`w-full py-3.5 px-4 text-sm font-semibold text-white bg-[#f92f16] hover:bg-[#d9220c] active:bg-[#b81b0a] rounded-md transition-all duration-200 shadow-sm flex items-center justify-center gap-2 select-none
        ${isButtonDisabled ? 'opacity-65 cursor-not-allowed bg-gray-400 hover:bg-gray-400 active:bg-gray-400' : ''}
        ${className}`}
    >
      {loading && (
        <FaSpinner className="animate-spin -ml-1 mr-1 h-5 w-5 text-white" />
      )}
      <span>{children}</span>
    </button>
  );
}
