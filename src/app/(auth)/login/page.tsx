"use client";

import Link from "next/link";
import React from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-md items-center">
      <div className="w-full rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <div className="mt-6">
          <LoginForm />
        </div>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
