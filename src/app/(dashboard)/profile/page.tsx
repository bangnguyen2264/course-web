"use client";

import { Button } from "@/components/widgets/Button";
import { Card, CardBody, CardHeader } from "@/components/widgets/Card";
import { useAuth } from "@/hooks";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-2">
          Manage your profile and account settings
        </p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">
            Personal Information
          </h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">👤</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {user?.fullName}
              </h3>
              <p className="text-gray-600">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full capitalize">
                {user?.role}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                id="fullname"
                type="text"
                value={user?.fullName}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user?.email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Role
            </label>
            <input
              id="role"
              type="text"
              value={user?.role}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 capitalize"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="primary">Edit Profile</Button>
            <Button variant="secondary">Change Password</Button>
          </div>
        </CardBody>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">
            Account Settings
          </h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <h3 className="font-medium text-gray-900">Email Notifications</h3>
              <p className="text-gray-600 text-sm">
                Receive updates about new courses
              </p>
            </div>
            <input type="checkbox" className="w-4 h-4" defaultChecked />
          </div>

          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <h3 className="font-medium text-gray-900">
                Two-Factor Authentication
              </h3>
              <p className="text-gray-600 text-sm">Secure your account</p>
            </div>
            <input type="checkbox" className="w-4 h-4" />
          </div>

          <div className="pt-4">
            <Button variant="danger">Delete Account</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
