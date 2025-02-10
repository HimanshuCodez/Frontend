import { useState, useEffect } from "react";
import axios from "axios";

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

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/api/v1/user-requests", {
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
        "http://localhost:4000/api/v1/request-book",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResponseMessage(res.data.message);
      setFormData({ bookTitle: "", author: "", isbn: "", message: "" });
      fetchRequests(); // Refresh requests list after submission
    } catch (error) {
      setResponseMessage(error.response?.data?.error || "Request failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Request a Book</h2>
      {responseMessage && <p className="text-green-600">{responseMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="bookTitle"
          value={formData.bookTitle}
          onChange={handleChange}
          placeholder="Book Title"
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          placeholder="ISBN (13 digits)"
          className="w-full p-2 border rounded mb-3"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Optional message"
          className="w-full p-2 border rounded mb-3"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit Request
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-6">Your Book Requests</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !requests.length && <p>No requests found.</p>}
      {requests.map((req) => (
        <div key={req._id} className="p-4 border rounded mb-3">
          <p><strong>Book:</strong> {req.bookTitle}</p>
          <p><strong>Author:</strong> {req.author}</p>
          <p><strong>ISBN:</strong> {req.isbn}</p>
          <p><strong>Status:</strong> {req.status}</p>
          <p><strong>Requested On:</strong> {new Date(req.createdAt).toLocaleDateString()}</p>
          {req.message && <p><strong>Message:</strong> {req.message}</p>}
        </div>
      ))}
    </div>
  );
};

export default RequestBook;
