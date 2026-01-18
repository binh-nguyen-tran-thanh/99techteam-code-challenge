import React from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  darkMode?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

function Input({ label, error, className = '', ref, ...props }: InputProps) {
  const baseInputClasses = `
      w-full px-4 py-2 rounded-lg border transition-colors
      focus:outline-none focus:ring-2 focus:ring-blue-500
      disabled:opacity-50 disabled:cursor-not-allowed
      bg-white border-gray-300 text-gray-900 placeholder-gray-400
      dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400
      ${error ? 'border-red-500 focus:ring-red-500' : ''}
    `;

  const labelClasses = `
      block mb-2 text-sm font-medium
      text-gray-700 dark:text-gray-200
    `;

  const errorClasses = `
      mt-1 text-sm text-red-500 flex items-center gap-1
    `;

  return (
    <div className="w-full">
      {label && <label className={labelClasses}>{label}</label>}
      <input
        ref={ref}
        className={`${baseInputClasses} ${className}`}
        aria-invalid={error ? 'true' : 'false'}
        {...props}
      />
      {error && (
        <p className={errorClasses}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

Input.displayName = 'Input';

export default Input;
