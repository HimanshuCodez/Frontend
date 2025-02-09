import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaBoxOpen } from "react-icons/fa";
import { FiUser, FiBook, FiCalendar, FiLoader } from "react-icons/fi";

const AdminAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const headers = {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const response = await axios.get("http://localhost:4000/api/v1/get-all-orders", { headers });
        setOrders(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center p-4"> <FiLoader className="animate-spin text-2xl" /> Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 flex items-center justify-center gap-2">
        <FaBoxOpen /> All Orders
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Book</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="hover">
                  <td>{order._id}</td>
                  <td className="flex items-center gap-2">
                    <FiUser className="text-gray-500" /> {order.user?.name || "Unknown"}
                  </td>
                  <td className="flex items-center gap-2">
                    <FiBook className="text-gray-500" /> {order.book?.name || "Unknown"}
                  </td>
                  <td className="flex items-center gap-2">
                    <FiCalendar className="text-gray-500" /> {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="text-green-600 font-semibold">{order.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllOrders;