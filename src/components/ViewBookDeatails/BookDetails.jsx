import React, { useEffect, useState } from "react";
import { useParams,useNavigate,Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { FaHeart, FaCartPlus, FaStar, FaBook, FaLanguage, FaUser,FaEdit, } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import RelatedBooks from "./RelatedBooks";
import Navbar from "../Navbar";
import QuantitySelector from "./QuantitySelector";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [bookData, setBookData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ text: "", rating: 0 });
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // Stock Validation
  const [selectedQuantity, setSelectedQuantity] = useState(1);


  useEffect(() => {
    const fetchBookData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://backend-h759.onrender.com/api/v1/get-book-by-id/${id}`
        );
        setBookData(response.data.data);

        // Fake reviews for testing with avatars
        const fakeReviews = [
          {
            text: "Great book! Very insightful and engaging.",
            rating: 5,
            user: {
              name: "Himanshu",
              avatar: "https://i.pravatar.cc/150?img=3",
            },
          },
          {
            text: "I loved the plot twists. A must-read for thriller fans.",
            rating: 4,
            user: {
              name: "Arun",
              avatar: "https://i.pravatar.cc/150?img=3",
            },
          },
          {
            text: "Decent read, but the ending was a bit predictable.",
            rating: 3,
            user: {
              name: "Santoshi",
              avatar: "https://imgs.search.brave.com/PidiBCmLbzqycBzNj14BNU7fYxlZKJqaMj6t7ZoXazM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDEwMTA0/MjQ0LnBuZw",
            },
          },
          {
            text: "Didn't enjoy it as much as I thought I would. The pacing was slow.",
            rating: 2,
            user: {
              name: "Rose",
              avatar: "https://imgs.search.brave.com/kNg2r-YCzaHM034-vPA55ACQdQAOdT-CuTUpjJO2Cok/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGZwcy5nZy9wZnBz/LzU0NTktYmxhY2tw/aW5rLXJvc2UucG5n",
            },
          },
          {
            text: "Not my cup of tea. Felt too cliche.",
            rating: 1,
            user: {
              name: "Lisa",
              avatar: "https://imgs.search.brave.com/jH9UYNdOBJHnSUWIknuK-rBzTh0-U2n9GHyX2gbFUsI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2FlL2Vk/LzdhL2FlZWQ3YWE3/ZDEyMzUxN2UyOTNh/NWFjZWFmOTBhZDFm/LmpwZw",
            },
          },
        ];

        setReviews(fakeReviews); // Set the fake reviews with avatars
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book data:", error);
        setLoading(false);
      }
    };
    fetchBookData();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
    quantity: selectedQuantity,
  };

  const handleFavourite = async () => {
    try {
      const response = await axios.put(
        "https://backend-h759.onrender.com/api/v1/add-to-favourite",
        {},
        { headers }
      );
      console.log("Favourite added:", response.data);
      toast.success("Book added to your favourites!");
    } catch (error) {
      toast.error("Already in Favourites.");
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.put(
        "https://backend-h759.onrender.com/api/v1/add-to-cart",
        {},
        { headers }
      );
      console.log("Book added to cart:", response.data);
      toast.success("Book added to your cart!");
    } catch (error) {
      console.error("Error adding book to cart:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Try again."
      );
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-h759.onrender.com/api/v1/add-review",
        { bookId: id, ...newReview },
        { headers }
      );
      setReviews([...reviews, response.data]);
      setNewReview({ text: "", rating: 0 });
      toast.success("Review added successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to add review. Try again.");
    }
  };

  // Handle the rating star click
  const handleRatingClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };


  //! NEW ADDED
  const handleQuantityChange = (newQuantity) => {
    setSelectedQuantity(newQuantity);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center my-8">
        <Loader />
      </div>
    );
  }

const deleteBook = async () => {
 const response =  await axios.delete("https://backend-h759.onrender.com/api/v1/delete-book",{headers})
 console.log(response.data)
 toast.success("Book Deleted")
 navigate("/get-all-books")
 
}
 
  return (
    <>
      <Navbar />
      {bookData ? (
        <div className="px-4 mt-6 md:px-12 py-20 dark:bg-slate-800 dark:text-white flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Left Column - Image */}
            <div className="md:col-span-2">
              <div className="relative bg-gray-100 dark:bg-slate-700 rounded-lg p-6 h-[500px] flex items-center justify-center">
                <img
                  src={bookData.url}
                  alt={bookData.title || "Book Cover"}
                  className="max-h-[400px] rounded-lg shadow-lg object-contain"
                />
                {isLoggedIn === true && role === "user" && (
                  <div className="absolute top-4 right-4 flex flex-col gap-3">
                    <button
                      onClick={handleFavourite}
                      className="btn btn-circle btn-ghost bg-base-100 hover:bg-red-50"
                    >
                      <FaHeart className="text-2xl text-red-500" />
                    </button>
                    <button
                      onClick={handleCart}
                      className="btn btn-circle btn-ghost bg-base-100 hover:bg-blue-50"
                    >
                      <FaCartPlus className="text-2xl text-blue-500" />
                    </button>
                  </div>
                )}
                {isLoggedIn ===true  && role === "admin" && (
                  <div className="absolute top-4 right-4 flex flex-col gap-3">
                    <Link
                      to={`/update-book/${id}`}
                      className="btn btn-circle btn-ghost bg-base-100 hover:bg-red-50"
                    >
                     <FaEdit />
                    </Link>
                    <button
                      onClick={deleteBook}
                      className="btn btn-circle btn-ghost bg-base-100 hover:bg-blue-50"
                    >
                      <MdDelete />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="md:col-span-3 space-y-6">
              {/* Book Title */}
              <h1 className="text-4xl font-bold text-black dark:text-white">
                {bookData.name || "Not Available"}
              </h1>

              {/* Book Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <FaUser className="text-lg" />
                  <span className="font-medium">Author:</span>
                  <span>{bookData.author}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <FaLanguage className="text-lg" />
                  <span className="font-medium">Language:</span>
                  <span>{bookData.language}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xl font-semibold">
                  <FaBook />
                  <h2>Description</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {bookData.description}
                </p>
              </div>

              {/* Pricing Section */}
              <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="line-through text-gray-500 text-xl">
                    ₹{bookData.price}
                  </span>
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-3 py-1 rounded-full text-sm font-medium">
                    {bookData.discountPercent}% OFF
                  </span>
                </div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  ₹{bookData.discountedPrice}
                </div>

                {/* Quantity and Cart */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">Quantity:</span>
                    <QuantitySelector
                      maxQuantity={bookData.stock}
                      onQuantityChange={handleQuantityChange}
                    />
                  </div>
                  <button
                    onClick={handleCart}
                    className="btn btn-primary btn-block gap-2"
                  >
                    <FaCartPlus className="text-xl" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="card bg-base-100 dark:bg-slate-700 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Customer Reviews</h2>
              
              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-slate-600 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <img
                          src={review.user.avatar}
                          alt={review.user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{review.user.name}</h3>
                          <div className="flex items-center gap-1 my-2">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`${
                                  i < review.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{review.text}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    No reviews yet. Be the first to review this book!
                  </p>
                )}
              </div>

              {/* Review Form */}
              {isLoggedIn && role === "user" && (
                <div className="mt-8 border-t dark:border-gray-600 pt-6">
                  <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <textarea
                      value={newReview.text}
                      onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                      className="textarea textarea-bordered w-full h-32"
                      placeholder="Share your thoughts about this book..."
                      required
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Rating:</span>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => handleRatingClick(rating)}
                          className="btn btn-ghost btn-sm p-0"
                        >
                          <FaStar
                            className={`w-6 h-6 ${
                              newReview.rating >= rating
                                ? "text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit Review
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center my-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      
      <div className="bg-base-100 dark:bg-slate-800">
        <RelatedBooks />
      </div>
    </>
  );
};

export default BookDetails;
