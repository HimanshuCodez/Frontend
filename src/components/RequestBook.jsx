import React, { useState, useEffect } from "react";
import axios from "axios";
import { Book, Send, Clock, CheckCircle, XCircle, Info, Library, ChevronDown, ChevronUp } from "lucide-react";

const RequestBook = () => {
  const [formData, setFormData] = useState({
    bookTitle: "",
    author: "",
    isbn: "",
    message: "",
  });
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://backend-h759.onrender.com/api/v1/user-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://backend-h759.onrender.com/api/v1/request-book",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResponseMessage(res.data.message);
      setFormData({ bookTitle: "", author: "", isbn: "", message: "" });
      fetchRequests();
      setShowHistory(true);
    } catch (error) {
      setResponseMessage(error.response?.data?.error || "Request failed.");
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Request Form */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Library className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Request a Book</h2>
        </div>

        {responseMessage && (
          <div className={`p-4 mb-6 rounded-lg ${responseMessage.includes('failed') ? 'bg-red-100' : 'bg-green-100'}`}>
            {responseMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Book Title</label>
            <input
              type="text"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">ISBN</label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message (Optional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Submit Request
          </button>
        </form>
      </div>

      {/* Check Status Button */}
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="w-full bg-gray-100 hover:bg-gray-200 p-4 rounded-lg flex items-center justify-center gap-2 font-medium text-gray-700"
      >
        {showHistory ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        {showHistory ? 'Hide Request History' : 'Check Request Status'}
      </button>

      {/* Request History */}
      {showHistory && (
        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Book className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Request History</h2>
          </div>

          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {!loading && !requests.length && (
            <div className="text-center py-8 text-gray-500">
              No requests found
            </div>
          )}

          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">{req.bookTitle}</h3>
                    <p className="text-gray-600">by {req.author}</p>
                  </div>
                  <div className="sm:text-right">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${getStatusClass(req.status)}`}>
                      {getStatusIcon(req.status)}
                      {req.status}
                    </span>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  <p>ISBN: {req.isbn}</p>
                  <p>Requested: {new Date(req.createdAt).toLocaleDateString()}</p>
                  {req.message && <p className="mt-2 italic">{req.message}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestBook;