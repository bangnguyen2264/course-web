"use client";

import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/widgets/Button";
import { useAuth } from "@/hooks";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="flex-1 px-4 py-20 md:py-32 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Welcome to EduPlatform
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Learn from the best, grow at your own pace. Access thousands of
            courses designed by industry experts to help you master new skills.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button size="lg">Go to Dashboard</Button>
                </Link>
                <Link href="/courses">
                  <Button variant="secondary" size="lg">
                    Browse Courses
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/register">
                  <Button size="lg">Get Started Free</Button>
                </Link>
                <Link href="/login">
                  <Button variant="secondary" size="lg">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Why Choose EduPlatform?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Expert Instructors
              </h3>
              <p className="text-gray-600">
                Learn from experienced professionals with years of industry
                expertise
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Flexible Learning
              </h3>
              <p className="text-gray-600">
                Learn at your own pace, anytime, anywhere, on any device
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Certificates
              </h3>
              <p className="text-gray-600">
                Earn recognized certificates to boost your professional profile
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
