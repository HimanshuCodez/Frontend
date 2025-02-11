import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBookRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/admin/requests");
      setRequests(data);
    } catch (err) {
      setError("Error fetching book requests.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:4000/api/v1/admin/request/${id}`, { status: newStatus });
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status: newStatus } : req))
      );
    } catch (err) {
      toast.error("Failed to update request status.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700 text-center">Book Requests</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-600">No book requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Book Title</th>
                <th className="px-4 py-2 border">Author</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border">{request.user?.username || "N/A"}</td>
                  <td className="px-4 py-2 border">{request.user?.email || "N/A"}</td>
                  <td className="px-4 py-2 border">{request.book?.title || "N/A"}</td>
                  <td className="px-4 py-2 border">{request.book?.author || "N/A"}</td>
                  <td className="px-4 py-2 border font-semibold">{request.status}</td>
                  <td className="px-4 py-2 border flex gap-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() => updateStatus(request._id, "Fulfilled")}
                      disabled={request.status !== "Pending"}
                    >
                      Fulfill
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => updateStatus(request._id, "Rejected")}
                      disabled={request.status !== "Pending"}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBookRequests;
