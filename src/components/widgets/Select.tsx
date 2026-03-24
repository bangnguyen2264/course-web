import React from "react";
import { CustomSelect } from "./CustomSelect";

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label: string;
  options: SelectOption[];
  error?: string;
  containerClassName?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement> | { target: { name?: string; value: string | number } }) => void;
  name?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ label, options, error, containerClassName = "", className = "", onChange, value, name, ...props }, ref) => {
    const handleCustomSelectChange = (customValue: string | number) => {
      // Create a synthetic event that looks like a native select change event
      const syntheticEvent = {
        target: {
          name: name || "",
          value: customValue.toString(),
        },
      } as any;
      onChange?.(syntheticEvent);
    };

    return (
      <CustomSelect
        ref={ref}
        label={label}
        options={options}
        value={value}
        onChange={handleCustomSelectChange}
        error={error}
        name={name}
        containerClassName={containerClassName}
        className={className}
        {...props}
      />
    );
  }
);
Select.displayName = "Select";
