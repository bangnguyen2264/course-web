import React from "react";

export interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelClassName?: string;
  containerClassName?: string;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ label, labelClassName = "", containerClassName = "", className = "", ...props }, ref) => {
    return (
      <div className={`relative pt-3 ${containerClassName}`}>
        <label className={`absolute left-3 -top-1.5 bg-white px-1 text-[10px] font-semibold uppercase tracking-wide z-10 ${labelClassName}`}>
          {label}
        </label>
        <input
          ref={ref}
          type="number"
          className={`w-full h-11 px-3 border border-gray-300 rounded-xl text-sm text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none placeholder:text-gray-500 ${className}`}
          {...props}
        />
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";
