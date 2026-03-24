"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { useAuth } from "@/hooks";
import { validateEmail } from "@/utils/validators";
import { DynamicForm, type FormField } from "@/components/form/DynamicForm";

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const { login, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await login(formData.email, formData.password);
      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const loginFields: FormField[] = [
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "you@example.com",
      colSpan: 2,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
      colSpan: 2,
    },
  ];

  const extraActions = (
    <div className="flex items-center justify-between pb-2">
      <label className="flex items-center">
        <input type="checkbox" className="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500" />
        <span className="ml-2 text-sm text-gray-600 font-medium">Remember me</span>
      </label>
      <button
        type="button"
        disabled
        className="text-sm font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-50"
      >
        Forgot password?
      </button>
    </div>
  );

  return (
    <DynamicForm
      fields={loginFields}
      formData={formData}
      formErrors={formErrors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitText="Sign In"
      isLoading={isLoading}
      error={error}
      extraActions={extraActions}
      submitButtonClassName="w-full h-11 mt-2 rounded-xl text-sm font-semibold shadow-sm shadow-blue-500/20"
    />
  );
};
