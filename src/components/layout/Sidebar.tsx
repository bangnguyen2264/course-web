"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { useAuth } from "@/hooks";
import { USER_ROLES } from "@/utils";

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

export interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  roles?: UserRole[];
}

export interface SidebarProps {
  links: NavLink[];
}

export const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const filteredLinks = links.filter((link) => {
    if (!link.roles) return true;
    if (!user || !user.role) return false;
    
    const normalizedRole = user.role.replace("ROLE_", "").toLowerCase() as UserRole;
    return link.roles.includes(normalizedRole);
  });

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-20 left-4 z-40 p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 w-64 h-screen bg-gray-50 border-r border-gray-200 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:top-0 md:block`}
      >
        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
          {filteredLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive(link.href)
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
