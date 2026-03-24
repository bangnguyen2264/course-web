"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks";
import { Button } from "@/components/widgets/Button";
import { MAIN_NAV } from "../../utils/navigation";
import { ROUTES } from "@/utils/constants";

const getNavLinkClassName = (isActive: boolean) =>
  `transition-colors hover:text-blue-600 ${isActive ? "text-blue-600" : "text-gray-600"}`;

const isRouteActive = (pathname: string, href: string) => {
  if (href === ROUTES.HOME) {
    return pathname === ROUTES.HOME;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const firstName = useMemo(() => user?.fullName?.split(" ")[0] ?? "", [user?.fullName]);

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-blue-600">EduPlatform</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={getNavLinkClassName(isRouteActive(pathname, item.href))}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link
                  href={ROUTES.DASHBOARD}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Hi, {firstName}
                </Link>
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <>
                <Link href={ROUTES.LOGIN}>
                  <Button variant="secondary" size="sm">
                    Đăng nhập
                  </Button>
                </Link>
                <Link href={ROUTES.REGISTER}>
                  <Button size="sm">Bắt đầu ngay</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white px-4 pt-2 pb-6 space-y-1">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium hover:text-blue-600 hover:bg-gray-50 ${
                isRouteActive(pathname, item.href) ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  href={ROUTES.DASHBOARD}
                  onClick={closeMobileMenu}
                  className="px-3 py-2 text-gray-700"
                >
                  Bảng điều khiển
                </Link>
                <Button className="w-full justify-start" variant="secondary" onClick={handleLogout}>
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Link href={ROUTES.LOGIN} onClick={closeMobileMenu} className="w-full">
                  <Button className="w-full" variant="secondary">
                    Đăng nhập
                  </Button>
                </Link>
                <Link href={ROUTES.REGISTER} onClick={closeMobileMenu} className="w-full">
                  <Button className="w-full">Đăng ký</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
