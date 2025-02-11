import React, { useEffect, useState } from "react";
import axios from "axios";
import { Book, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const AdminBookRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

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
      setError("Failed to update request status.");
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'fulfilled': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = requests.filter(request => 
    filter === "all" || request.status.toLowerCase() === filter
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Book className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">Book Requests</h1>
            </div>
            <select
              className="p-2 border rounded-lg bg-white"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="fulfilled">Fulfilled</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">
            <AlertCircle className="w-12 h-12 mx-auto mb-2" />
            {error}
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <Book className="w-12 h-12 mx-auto mb-2" />
            No requests found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="p-4 font-semibold text-gray-600">#</th>
                  <th className="p-4 font-semibold text-gray-600">User</th>
                  <th className="p-4 font-semibold text-gray-600">ISBN</th>
                  <th className="p-4 font-semibold text-gray-600">Book Title</th>
                  <th className="p-4 font-semibold text-gray-600">Author</th>
                  <th className="p-4 font-semibold text-gray-600">Status</th>
                  <th className="p-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredRequests.map((request, index) => (
                  <tr key={request._id} className="hover:bg-gray-50">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{request.user?.username || "N/A"}</td>
                    <td className="p-4">{request?.isbn || "N/A"}</td>
                    <td className="p-4 font-medium">{request.bookTitle || "N/A"}</td>
                    <td className="p-4">{request?.author || "N/A"}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {request.status === "Pending" && (
                          <>
                            <button
                              onClick={() => updateStatus(request._id, "Fulfilled")}
                              className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Fulfill
                            </button>
                            <button
                              onClick={() => updateStatus(request._id, "Rejected")}
                              className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookRequests;