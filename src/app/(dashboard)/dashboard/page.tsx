"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/widgets/Card";
import { useAuth } from "@/hooks";
import { DashboardResponse } from "@/types/dashboard";

const mockData: DashboardResponse = {
  role: "ROLE_ADMIN",
  userId: 51,
  from: "2026-03-01",
  to: "2026-03-31",
  generatedAt: "2026-03-20T07:43:13.547251Z",
  admin: {
    totalUsers: 51,
    totalSubjects: 500,
    totalEnrollments: 200,
    totalOrders: 50,
    totalRevenue: 214588.88,
    newUsersToday: 0,
    newEnrollmentsToday: 0,
    newOrdersToday: 0,
    revenueToday: 0,
    newEnrollmentsThisMonth: 200,
    revenueThisMonth: 214588.88,
  },
  user: null,
  analytics: {
    totalRevenue: 214588.88,
    averageOrderValue: 4291.7776,
    averageDailyRevenue: 214588.88,
    retentionRate: 0,
    conversionRate: 98.03,
    totalActiveUsers: 50,
    inactiveUsersCount: 1,
    completionRate: 0,
    notStartedRate: 4,
  },
};

const mockTrendData = [
  { label: "Tuần 1", revenue: 45000, orders: 12 },
  { label: "Tuần 2", revenue: 52000, orders: 15 },
  { label: "Tuần 3", revenue: 38000, orders: 8 },
  { label: "Tuần 4", revenue: 79588, orders: 15 },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const data = mockData;
  const [timeRange, setTimeRange] = useState("this_month");

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(val * 24000); // Giả lập tỷ giá sang VND cho đẹp
  };

  const maxRevenue = Math.max(...mockTrendData.map((d) => d.revenue));

  // Giả lập dữ liệu hoàn tiền (Refunds)
  const totalRegistrations = data.admin?.totalEnrollments || 0;
  const mockRefunds = 5; 
  const successfulRegistrations = totalRegistrations - mockRefunds;
  const successRate = totalRegistrations > 0 ? (successfulRegistrations / totalRegistrations) * 100 : 0;

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Bảng điều khiển quản lý 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Tổng quan hoạt động kinh doanh và đào tạo.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <label htmlFor="timeRange" className="text-sm font-medium text-gray-600">Thời gian:</label>
          <select
            id="timeRange"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow cursor-pointer"
          >
            <option value="today">Hôm nay</option>
            <option value="this_week">Tuần này</option>
            <option value="this_month">Tháng {new Date().getMonth() + 1}</option>
            <option value="last_month">Tháng trước</option>
            <option value="this_year">Năm nay</option>
            <option value="all_time">Tất cả</option>
          </select>
        </div>
      </div>

      {data.admin && (
        <>
          {/* Tổng quan thống kê (Overview Stats) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Tổng số học viên"
              value={data.admin.totalUsers.toString()}
              icon="👨‍🎓"
              color="text-blue-600"
              bg="bg-blue-50"
            />
            <MetricCard
              title="Tổng khóa học"
              value={data.admin.totalSubjects.toString()}
              icon="📚"
              color="text-indigo-600"
              bg="bg-indigo-50"
            />
            <MetricCard
              title="Tổng đơn hàng"
              value={data.admin.totalOrders.toString()}
              icon="🛒"
              color="text-fuchsia-600"
              bg="bg-fuchsia-50"
            />
            <MetricCard
              title="Doanh thu tháng này"
              value={formatCurrency(data.admin.revenueThisMonth)}
              icon="💰"
              color="text-emerald-600"
              bg="bg-emerald-50"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Biểu đồ xu hướng (Trend Chart) */}
            <Card className="lg:col-span-2 shadow-sm border border-gray-100">
              <CardHeader className="border-b border-gray-100 pb-4">
                <h2 className="text-lg font-bold text-gray-800">Biểu đồ xu hướng doanh thu</h2>
              </CardHeader>
              <CardBody className="pt-6">
                <div className="h-64 flex items-end gap-4">
                  {mockTrendData.map((item, index) => {
                    const heightPercent = (item.revenue / maxRevenue) * 100;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                        <div className="w-full relative h-full flex items-end justify-center rounded-t-md">
                          {/* Tooltip */}
                          <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
                            {formatCurrency(item.revenue)} ({item.orders} ĐH)
                          </div>
                          {/* Bar */}
                          <div 
                            className="w-full max-w-[60px] bg-blue-500 rounded-t-md hover:bg-blue-600 transition-all duration-300"
                            style={{ height: `${Math.max(10, heightPercent)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>

            {/* Tình trạng đăng ký / Hoàn tiền */}
            <Card className="shadow-sm border border-gray-100">
              <CardHeader className="border-b border-gray-100 pb-4">
                <h2 className="text-lg font-bold text-gray-800">Tình trạng đăng ký</h2>
              </CardHeader>
              <CardBody className="pt-6 flex flex-col justify-center">
                <div className="text-center mb-6">
                  <div className="text-5xl font-extrabold text-blue-600">{totalRegistrations}</div>
                  <div className="text-sm text-gray-500 mt-2 font-medium uppercase tracking-wide">
                    Lượt đăng ký ({timeRange.replace('_', ' ')})
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-emerald-600 font-medium flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Thành công
                      </span>
                      <span className="font-bold text-gray-700">{successfulRegistrations}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${successRate}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-rose-500 font-medium flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span> Hoàn tiền / Hủy
                      </span>
                      <span className="font-bold text-gray-700">{mockRefunds}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-rose-500 h-2 rounded-full" style={{ width: `${100 - successRate}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-100">
                  <span className="text-sm text-gray-600">Tỉ lệ hoàn thành</span>
                  <span className="text-lg font-bold text-emerald-600">{successRate.toFixed(1)}%</span>
                </div>
              </CardBody>
            </Card>
          </div>
        </>
      )}

      {/* Placeholder for standard User */}
      {!data.admin && !data.analytics && (
        <Card className="shadow-sm border border-gray-100">
          <CardBody className="py-16 text-center">
            <span className="text-6xl mb-4 block">👩‍🎓</span>
            <h3 className="text-2xl font-bold text-gray-800">Khu vực học tập</h3>
            <p className="text-gray-500 mt-2">Dành cho học viên xem tiến trình học và các khóa học đã đăng ký.</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon,
  color,
  bg,
}: {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  bg: string;
}) {
  return (
    <Card className="hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100 group cursor-pointer">
      <CardBody className="p-6">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${bg} ${color} group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              {title}
            </p>
            <h3 className={`text-2xl font-bold mt-1 text-gray-900 group-hover:${color} transition-colors`}>{value}</h3>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
