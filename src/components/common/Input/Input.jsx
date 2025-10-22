import React from 'react';

/**
 * Reusable Input component
 */
export const Input = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  error = null,
  required = false,
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-stone-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 bg-stone-900/80 border-2 rounded-lg text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
          error ? 'border-red-500' : 'border-amber-800/50'
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};
