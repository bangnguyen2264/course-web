"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/widgets/Button";
import { CustomSelect } from "@/components/widgets/CustomSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type FieldType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "date"
  | "tel"
  | "select"
  | "radio"
  | "textarea"
  | "checkbox";

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: string }[];
  colSpan?: number;
  prefix?: React.ReactNode;
  inputClassName?: string;
  maxDate?: Date;
  minDate?: Date;
  rows?: number;
}

export interface DynamicFormProps {
  fields: FormField[];
  formData: Record<string, any>;
  formErrors: Record<string, string>;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onCustomChange?: (name: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitText: string;
  isLoading?: boolean;
  error?: string | null;
  extraActions?: React.ReactNode;
  submitButtonClassName?: string;
  gridClassName?: string;
}

const PasswordField = ({
  field,
  value,
  error,
  onChange,
}: {
  field: FormField;
  value: string;
  error?: string;
  onChange: any;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id={field.name}
        name={field.name}
        type={show ? "text" : "password"}
        value={value || ""}
        onChange={onChange}
        className={`w-full h-11 px-3 pr-10 border rounded-xl bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        } ${field.inputClassName || ""}`}
        placeholder={field.placeholder || "••••••••"}
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute inset-y-0 right-0 px-3 text-gray-400 hover:text-gray-700"
        aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
      >
        {show ? (
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 3l18 18" />
            <path d="M10.58 10.58a2 2 0 102.83 2.83" />
            <path d="M6.71 6.7A15.9 15.9 0 012 12s3.6 7 10 7a9.8 9.8 0 004.29-.96" />
            <path d="M9.88 5.08A10.9 10.9 0 0112 5c6.4 0 10 7 10 7a15.7 15.7 0 01-3.17 4.3" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
};

export const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  formData,
  formErrors,
  onChange,
  onCustomChange,
  onSubmit,
  submitText,
  isLoading,
  error,
  extraActions,
  submitButtonClassName,
  gridClassName,
}) => {
  const renderField = (field: FormField) => {
    const value = formData[field.name];
    const fieldError = formErrors[field.name];
    const baseInputClass = `w-full h-11 px-3 border rounded-xl bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 ${
      fieldError ? "border-red-500" : "border-gray-300"
    } ${field.inputClassName || ""}`;

    const labelClass =
      "absolute left-3 -top-1.5 bg-white px-1 text-[10px] font-semibold uppercase tracking-wide text-gray-500 z-10";

    return (
      <div
        key={field.name}
        className={`relative pt-3 ${
          field.colSpan === 2 ? "md:col-span-2" : ""
        }`}
      >
        {field.type !== "radio" && field.type !== "checkbox" && field.type !== "select" ? (
          <label htmlFor={field.name} className={labelClass}>
            {field.label}
          </label>
        ) : field.type === "radio" ? (
          <span className={labelClass}>{field.label}</span>
        ) : null}

        {field.type === "password" ? (
          <PasswordField
            field={field}
            value={value}
            error={fieldError}
            onChange={onChange}
          />
        ) : field.type === "select" ? (
          <CustomSelect
            label={field.label}
            options={field.options || []}
            value={value}
            onChange={(val) => onCustomChange?.(field.name, val)}
            placeholder={field.placeholder}
            error={fieldError}
          />
        ) : field.type === "radio" ? (
          <div className="grid grid-cols-2 rounded-xl border border-gray-300 bg-gray-50 p-1 h-11">
            {field.options?.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onCustomChange?.(field.name, opt.value)}
                className={`rounded-lg text-xs font-semibold transition-colors ${
                  value === opt.value
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        ) : field.type === "date" ? (
          <div className="relative">
            <DatePicker
              id={field.name}
              selected={value ? new Date(value) : null}
              onChange={(date: Date | null) => {
                const syntheticEvent = {
                  target: {
                    name: field.name,
                    value: date ? date.toLocaleDateString("en-CA") : "",
                  },
                } as any;
                onChange(syntheticEvent);
              }}
              className={`${baseInputClass} pr-10 appearance-none`}
              placeholderText={field.placeholder || "dd/MM/yyyy"}
              dateFormat="dd/MM/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="scroll"
              scrollableYearDropdown
              yearDropdownItemNumber={120}
              maxDate={field.maxDate}
              minDate={field.minDate}
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M16 3v4M8 3v4M3 10h18" />
              </svg>
            </span>
          </div>
        ) : field.type === "tel" ? (
          <div className="relative">
            {field.prefix && (
              <span className="absolute inset-y-0 left-3 flex items-center gap-1 text-xs text-gray-500 font-medium">
                {field.prefix}
              </span>
            )}
            <input
              id={field.name}
              name={field.name}
              type="tel"
              value={value || ""}
              onChange={onChange}
              className={`${baseInputClass}`}
              placeholder={field.placeholder}
            />
          </div>
        ) : field.type === "textarea" ? (
          <textarea
            id={field.name}
            name={field.name}
            value={value || ""}
            onChange={onChange}
            className={`${baseInputClass} h-auto py-3 resize-none`}
            placeholder={field.placeholder}
            rows={field.rows || 4}
          />
        ) : field.type === "checkbox" ? (
          <div className="flex items-center gap-3 h-11 px-1">
            <input
              id={field.name}
              name={field.name}
              type="checkbox"
              checked={!!value}
              onChange={(e) => {
                const syntheticEvent = {
                  target: {
                    name: field.name,
                    value: e.target.checked,
                  },
                } as any;
                onChange(syntheticEvent);
              }}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor={field.name} className="text-sm font-medium text-gray-700 cursor-pointer">
              {field.label}
            </label>
          </div>
        ) : (
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            value={value || ""}
            onChange={onChange}
            className={baseInputClass}
            placeholder={field.placeholder}
          />
        )}

        {fieldError && (
          <p className="text-red-600 text-xs mt-1">{fieldError}</p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs">
          {error}
        </div>
      )}

      <div className={gridClassName || "grid grid-cols-1 md:grid-cols-2 gap-3"}>
        {fields.map(renderField)}
      </div>

      {extraActions && <div className="mt-4">{extraActions}</div>}

      <Button
        type="submit"
        isLoading={isLoading}
        className={
          submitButtonClassName ||
          "w-full h-11 mt-2 rounded-xl text-sm font-semibold shadow-sm shadow-blue-500/20"
        }
      >
        {submitText}
      </Button>
    </form>
  );
};
