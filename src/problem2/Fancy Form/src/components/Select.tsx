import { cn } from '@/utils/className';
import { AlertCircle } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

interface SelectOption {
  value: string;
  label: string;
  iconUrl?: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  labelPosition?: 'horizontal' | 'vertical';
  optionRenderer?: (option: SelectOption) => React.ReactNode;
  error?: string;
  disabled?: boolean;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  label,
  labelPosition = 'vertical',
  optionRenderer,
  error,
  disabled = false
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    onChange?.(optionValue);
  };

  const renderOption = (option?: SelectOption) => {
    if (!option) return placeholder;

    if (optionRenderer) {
      return optionRenderer(option);
    }
    return option.label;
  };

  const selectElement = (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          `w-full px-4 py-2 rounded-lg border text-left
          bg-white border-gray-300 text-gray-900 hover:border-gray-400
          dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:border-gray-600
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-colors duration-200`,
          { 'border-red-500 dark:border-red-500': error },
          {
            'opacity-50 cursor-not-allowed': disabled,
            'cursor-pointer': !disabled
          },
          className,
          'flex items-center justify-between'
        )}
      >
        <span
          className={cn(!selectedOption && 'text-gray-500 dark:text-gray-400')}
        >
          {renderOption(selectedOption)}
        </span>
        <svg
          className={cn('w-5 h-5 transition-transform', isOpen && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={cn(
                `
                w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700
                transition-colors duration-150
              `,
                selectedValue === option.value && 'bg-blue-50 dark:bg-blue-900'
              )}
            >
              {optionRenderer ? optionRenderer(option) : option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const errorElement = error && (
    <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
      <AlertCircle size={16} />
      {error}
    </span>
  );

  if (!label) {
    return (
      <div className="flex flex-col">
        {selectElement}
        {errorElement}
      </div>
    );
  }

  const labelElement = (
    <label className="text-gray-700 dark:text-gray-300 font-medium">
      {label}
    </label>
  );

  if (labelPosition === 'horizontal') {
    return (
      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          {labelElement}
          <div className="flex-1">{selectElement}</div>
        </div>
        {errorElement}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {labelElement}
      {selectElement}
      {errorElement}
    </div>
  );
}
