import React from "react";
import Link from "next/link";
import { FOOTER_LEGAL_LINKS, FOOTER_SECTIONS, SOCIAL_LINKS } from "../../utils/navigation";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              EduPlatform
            </Link>
            <p className="text-gray-600 max-w-xs">
              Nền tảng học tập trực tuyến hiện đại, giúp bạn nâng cao kỹ năng và kiến thức mỗi ngày.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <span className="sr-only">{social.label}</span>
                  <div className="w-5 h-5 bg-gray-200 rounded-full" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-base text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Bản tin
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Đăng ký để nhận tin tức mới nhất về các khóa học.
            </p>
            <form className="mt-4 flex flex-col gap-2" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Email của bạn"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-base text-gray-400">
              &copy; {currentYear} EduPlatform Inc. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
