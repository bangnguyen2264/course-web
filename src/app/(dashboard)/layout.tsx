"use client";

import type React from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Sidebar, NavLink } from "@/components/layout/Sidebar";
import { USER_ROLES } from "@/utils";

const dashboardLinks: NavLink[] = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/courses", label: "Danh sách Môn học", icon: "📚" },
  { href: "/profile", label: "My Profile", icon: "👤" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar links={dashboardLinks} />

          <main className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
