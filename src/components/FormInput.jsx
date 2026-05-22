"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function FormInput({
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  error,
  name,
  required = false,
  className = "",
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-400 select-none">
            {icon}
          </div>
        )}

        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full py-3 text-sm text-black placeholder-gray-400 bg-white border rounded-md outline-none transition-all duration-200
            ${icon ? "pl-11" : "px-4"}
            ${isPassword ? "pr-11" : "pr-4"}
            ${
              error
                ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500"
                : "border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
            }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
          >
            {showPassword ? (
              <FaEyeSlash className="w-5 h-5" />
            ) : (
              <FaEye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {error && (
        <span className="text-xs text-red-500 text-right">{error}</span>
      )}
    </div>
  );
}
