import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, BookOpen, ArrowUp, ArrowDown, ShoppingCart } from 'lucide-react';
import { FaRupeeSign } from 'react-icons/fa';

const SalesReport = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0] 
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    fetchSalesReport();
  }, [dateRange]);

  const fetchSalesReport = async () => {
    try {
      const response = await axios.get("https://backend-h759.onrender.com/api/v1/sales-report", {
        params: dateRange,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching sales report:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    if (!reportData) return [];
    
    const averageOrderValue = reportData.totalOrders > 0 
      ? reportData.totalRevenue / reportData.totalOrders 
      : 0;

    return [
      {
        title: 'Total Revenue',
        value: `₹ ${reportData.totalRevenue.toLocaleString()}`,
        increase: true,
        percentage: '12%',
        icon: FaRupeeSign
      },
      {
        title: 'Total Orders',
        value: reportData.totalOrders.toString(),
        increase: true,
        percentage: '8%',
        icon: ShoppingCart
      },
      {
        title: 'Books Sold',
        value: reportData.totalDeliveredOrders.toString(),
        increase: true,
        percentage: '5%',
        icon: BookOpen
      },
      {
        title: 'Avg Order Value',
        value: `₹ ${averageOrderValue.toFixed(2)}`,
        increase: true,
        percentage: '3%',
        icon: TrendingUp
      }
    ];
  }, [reportData]);

  const formattedMonthlySales = useMemo(() => 
    reportData?.monthlySales.map(item => ({
      ...item,
      month: new Date(item.month).toLocaleDateString('default', { month: 'short' }),
    })) || [], 
    [reportData]
  );

  if (loading || !reportData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Sales Report Dashboard</h1>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <label className="text-xs sm:text-sm text-gray-600">Start Date:</label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                className="border rounded p-1 sm:p-2 text-xs sm:text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs sm:text-sm text-gray-600">End Date:</label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                className="border rounded p-1 sm:p-2 text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-3 sm:p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">{stat.title}</p>
                  <p className="text-sm sm:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-1 sm:mt-2">
                    {stat.increase ? (
                      <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-xs sm:text-sm ${stat.increase ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.percentage}
                    </span>
                  </div>
                </div>
                <stat.icon className="hidden sm:block w-8 h-8 lg:w-12 lg:h-12 text-blue-500 opacity-20" />
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Trend Chart */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Monthly Sales Trend</h2>
            <div className="h-48 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedMonthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#0088FE" name="Sales (₹)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Selling Books */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Top Selling Books</h2>
            <div className="h-48 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reportData.topSellingBooks}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="sales"
                    label
                  >
                    {reportData.topSellingBooks.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md lg:col-span-2 overflow-x-auto">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Recent Orders</h2>
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 sm:px-4 py-2 sm:py-3">Order ID</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3">Book</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">Customer</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3">Date</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {reportData.allOrders.slice(0, 5).map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="px-2 sm:px-4 py-2 sm:py-3">{order._id}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">{order.book[0]?.name}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">{order.user?.username || 'N/A'}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">
                      <span className={`px-1 sm:px-2 py-1 rounded-full text-xs ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;