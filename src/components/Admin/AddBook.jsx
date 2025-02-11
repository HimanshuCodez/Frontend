import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiBook,  FiUpload } from "react-icons/fi";

const AdminAddBook = () => {
  const [bookData, setBookData] = useState({
    url: "",
    name: "",
    author: "",
    price: "",
    description: "",
    stock: "",
    language: "",
    category: "",
    discountedPrice: "",
    discountPercent: "",
    isbn: "",
  });

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      const response = await axios.post("https://backend-h759.onrender.com/api/v1/add-book", bookData, { headers });
      toast.success(response.data.message);
      setBookData({
        url: "",
        name: "",
        author: "",
        price: "",
        description: "",
        stock: "",
        language: "",
        category: "",
        discountedPrice: "",
        discountPercent: "",
        isbn: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">📚 Add a New Book</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">Book Image URL</label>
            <div className="flex items-center gap-2">
              <FiUpload className="text-gray-500" />
              <input
                type="text"
                name="url"
                value={bookData.url}
                onChange={handleChange}
                placeholder="Enter Image URL"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">Book Name</label>
            <div className="flex items-center gap-2">
              <FiBook className="text-gray-500" />
              <input
                type="text"
                name="name"
                value={bookData.name}
                onChange={handleChange}
                placeholder="Enter Book Name"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">Author</label>
            <input
              type="text"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              placeholder="Enter Author Name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">Price ₹</label>
            <input
              type="number"
              name="price"
              value={bookData.price}
              onChange={handleChange}
              placeholder="Enter Price"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">Book Description</label>
          <textarea
            name="description"
            value={bookData.description}
            onChange={handleChange}
            placeholder="Enter Book Description"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="form-control">
            <label className="label">Stock</label>
            <input
              type="number"
              name="stock"
              value={bookData.stock}
              onChange={handleChange}
              placeholder="Enter Stock Quantity"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">Language</label>
            <input
              type="text"
              name="language"
              value={bookData.language}
              onChange={handleChange}
              placeholder="Enter Language"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">Category</label>
            <input
              type="text"
              name="category"
              value={bookData.category}
              onChange={handleChange}
              placeholder="Enter Category"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="form-control">
            <label className="label">Discount Price</label>
            <input
              type="number"
              name="discountedPrice"
              value={bookData.discountedPrice}
              onChange={handleChange}
              placeholder="Enter Discounted Price"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">Discount %</label>
            <input
              type="number"
              name="discountPercent"
              value={bookData.discountPercent}
              onChange={handleChange}
              placeholder="Enter Discount Percent"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">ISBN</label>
            <input
              type="text"
              name="isbn"
              value={bookData.isbn}
              onChange={handleChange}
              placeholder="Enter ISBN Number"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Add Book 📖
        </button>
      </form>
    </div>
  );
};

export default AdminAddBook;
