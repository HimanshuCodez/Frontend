import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Package, Calendar, CreditCard, ShoppingBag, Truck, AlertCircle } from "lucide-react";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(
          "https://backend-h759.onrender.com/api/v1/get-order-history",
          { headers }
        );
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <ShoppingBag className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">My Order History</h1>
        </div>

        {orderHistory.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No orders found.</p>
          </div>
        ) : (
          <>
            {/* Table view for larger screens */}
            <div className="hidden lg:block overflow-hidden">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Book</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Payment</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orderHistory.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={order.book[0]?.url || "/api/placeholder/48/64"}
                            alt={order.book[0]?.name}
                            className="h-16 w-12 object-cover rounded"
                          />
                          <Link
                            to={`/view-book-details/${order.book[0]._id}`}
                            className="ml-4 text-sm font-medium text-blue-600 hover:text-blue-800"
                          >
                            {order.book[0]?.name || "Unknown Book"}
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order._id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">COD</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card view for mobile */}
            <div className="lg:hidden space-y-6">
              {orderHistory.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center gap-6">
                      <Link
                        to={`/view-book-details/${order.book[0]._id}`}
                        className="w-32 h-40 overflow-hidden rounded-lg shadow-sm"
                      >
                        <img
                          src={order.book[0]?.url || "/api/placeholder/128/160"}
                          alt={order.book[0]?.name}
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      <div className="flex-grow space-y-4 w-full">
                        <Link
                          to={`/view-book-details/${order.book[0]._id}`}
                          className="block text-xl font-semibold text-blue-600 hover:text-blue-800"
                        >
                          {order.book[0]?.name || "Unknown Book"}
                        </Link>

                        <div className="grid grid-cols-1 gap-4 text-sm">
                          <div className="flex items-center justify-center text-gray-600">
                            
                            <span>Order ID: <span className="font-medium">{order._id}</span></span>
                          </div>
                          <div className="flex items-center justify-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>Date: <span className="font-medium">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span></span>
                          </div>
                          <div className="flex items-center justify-center text-gray-600">
                            <CreditCard className="h-4 w-4 mr-2" />
                            <span>Payment: <span className="font-medium">COD</span></span>
                          </div>
                          <div className="flex items-center justify-center">
                            <Truck className="h-4 w-4 mr-2" />
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserOrderHistory;