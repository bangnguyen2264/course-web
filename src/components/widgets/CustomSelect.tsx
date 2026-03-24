import React, { useState, useRef, useEffect } from "react";

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface CustomSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label: string;
  options: SelectOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  error?: string;
  name?: string;
  containerClassName?: string;
  placeholder?: string;
}

export const CustomSelect = React.forwardRef<HTMLDivElement, CustomSelectProps>(
  ({ 
    label, 
    options, 
    value, 
    onChange,
    error, 
    name,
    containerClassName = "", 
    placeholder,
    className = "",
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const selectedOption = options.find(opt => opt.value === value);
    const displayValue = selectedOption?.label || placeholder || `Chọn ${label.toLowerCase()}...`;

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen]);

    const handleSelect = (optValue: string | number) => {
      onChange?.(optValue);
      setIsOpen(false);
    };

    const labelClass =
      "absolute left-3 -top-1.5 bg-white px-1 text-[10px] font-semibold uppercase tracking-wide text-gray-500 z-10";

    return (
      <div
        ref={ref}
        className={`relative pt-3 ${containerClassName}`}
        {...props}
      >
        <label className={labelClass}>{label}</label>
        <div className="relative" ref={dropdownRef}>
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full h-11 px-3 border rounded-xl bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 appearance-none text-left flex items-center justify-between transition-colors ${
              error ? "border-red-500" : "border-gray-300"
            } ${isOpen ? "border-blue-500 ring-2 ring-blue-500/30" : ""} ${className}`}
          >
            <span className={selectedOption ? "text-gray-800" : "text-gray-500"}>
              {displayValue}
            </span>
            <svg
              viewBox="0 0 24 24"
              className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
              {options.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500 text-center">
                  Không có lựa chọn nào
                </div>
              ) : (
                options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full px-3 py-2.5 text-sm text-left hover:bg-blue-50 transition-colors ${
                      value === opt.value
                        ? "bg-blue-600 text-white hover:bg-blue-700 font-medium"
                        : "text-gray-800"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";
