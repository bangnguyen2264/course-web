import React from "react";

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className = "", containerClassName = "", ...props }, ref) => {
    return (
      <div className={`relative ${containerClassName}`}>
        <input
          ref={ref}
          type="text"
          className={`w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none placeholder:text-gray-500 transition-all ${className}`}
          {...props}
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </span>
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";
