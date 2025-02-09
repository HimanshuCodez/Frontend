import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaBoxOpen } from "react-icons/fa";
import { FiCalendar, FiUser } from "react-icons/fi";
import Loader from "../Loader/Loader";

const AdminAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/get-all-orders",
          { headers }
        );
        setOrders(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
        await axios.put(`http://localhost:4000/api/v1/update-status/${orderId}`, 
        { status: newStatus }, // Send status in the body
        { headers });

        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order._id === orderId ? { ...order, status: newStatus } : order
            )
        );

        toast.success("Order status updated successfully!");
    } catch (error) {
        console.error("Error updating order status:", error);
        toast.error("Failed to update status");
    }
};


  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 bg-white shadow-xl rounded-lg mt-6 w-full">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-blue-600 flex items-center justify-center gap-2">
        <FaBoxOpen /> All Orders
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500 py-4">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse hidden md:table">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="p-3">User</th>
                <th className="p-3">Book</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-100">
                  <td className="p-3">
                    <div className="flex flex-col">
                      <span className="flex items-center gap-2 font-semibold">
                        <FiUser className="text-gray-500" /> {order?.user?.username || "Unknown"}
                      </span>
                      <span className="text-sm text-gray-600">{order?.user?.email}</span>
                      <span className="text-sm text-gray-500">{order?.user?.address}</span>
                    </div>
                  </td>

                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={order?.book[0]?.url || ""}
                      alt={order?.book[0]?.name || "Unknown"}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <span>{order?.book[0]?.name || "Unknown"}</span>
                  </td>

                  <td className="p-3 flex items-center gap-2">
                    <FiCalendar className="text-gray-500" />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <select
                      className="border rounded p-2 bg-white cursor-pointer"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Out For Delivery">Out For Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="p-4 border rounded-lg shadow-sm">
                <div className="flex gap-3">
                  <img
                    src={order?.book[0]?.url || ""}
                    alt={order?.book[0]?.name || "Unknown"}
                    className="w-16 h-20 object-cover rounded"
                  />

                  <div className="flex flex-col flex-1">
                    <span className="text-lg font-semibold text-blue-600">{order?.book[0]?.name || "Unknown"}</span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <FiUser /> {order?.user?.username || "Unknown"}
                    </span>
                    <span className="text-sm text-gray-600">{order?.user?.email}</span>
                    <span className="text-sm text-gray-500">{order?.user?.address}</span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <FiCalendar /> {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Status Dropdown */}
                <div className="mt-3">
                  <select
                    className="w-full border rounded p-2 bg-white cursor-pointer"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Out For Delivery">Out For Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllOrders;
