"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { useAuth } from "@/hooks";
import { validateEmail, validatePassword } from "@/utils/validators";
import type { RegisterRequest } from "@/types";
import { DynamicForm, type FormField } from "@/components/form/DynamicForm";
import Link from "next/link";

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const { register, isLoading, error } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "MALE" as "MALE" | "FEMALE",
    dob: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors[0];
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    }

    if (!formData.dob) {
      errors.dob = "Date of birth is required";
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

  const handleCustomChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData as RegisterRequest);
      router.push("/dashboard");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const registerFields: FormField[] = [
    {
      name: "fullName",
      label: "Họ và Tên",
      type: "text",
      placeholder: "Nguyễn Văn A",
      colSpan: 2,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
    },
    {
      name: "dob",
      label: "Ngày Sinh",
      type: "date",
      maxDate: new Date(),
    },
    {
      name: "phoneNumber",
      label: "Số Điện Thoại",
      type: "tel",
      placeholder: "912345678",
      prefix: (
        <>
          <span aria-hidden="true">VN</span>
          <span>+84</span>
        </>
      ),
      inputClassName: "pl-[72px]",
    },
    {
      name: "gender",
      label: "Giới Tính",
      type: "radio",
      options: [
        { label: "NAM", value: "MALE" },
        { label: "NỮ", value: "FEMALE" },
      ],
    },
    {
      name: "password",
      label: "Mật Khẩu",
      type: "password",
      placeholder: "••••••••",
    },
    {
      name: "confirmPassword",
      label: "Xác Nhận Mật Khẩu",
      type: "password",
      placeholder: "••••••••",
    },
  ];

  return (
    <DynamicForm
      fields={registerFields}
      formData={formData}
      formErrors={formErrors}
      onChange={handleChange}
      onCustomChange={handleCustomChange}
      onSubmit={handleSubmit}
      submitText="Đăng Ký"
      isLoading={isLoading}
      error={error}
    />
  );
};
