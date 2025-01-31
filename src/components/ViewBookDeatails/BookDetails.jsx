import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { FaHeart, FaCartPlus, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import RelatedBooks from "./RelatedBooks";
import Navbar from "../Navbar";
import QuantitySelector from "./QuantitySelector";

const BookDetails = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ text: "", rating: 0 });
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center my-8">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {bookData ? (
        <div className="px-4 mt-6 md:px-12 py-8 dark:bg-slate-800 dark:text-white flex flex-col gap-8">
          {/* Book Image and Details Section */}
          <div className="flex flex-col md:flex-row gap-8  dark:bg-slate-800 dark:text-white">
            <div className="relative  rounded p-4 h-[60vh] w-full md:w-2/5 flex items-center justify-center">
              <img
                className="h-[50vh] rounded bg-black "
                src={bookData.url}
                alt={bookData.title || "Book Cover"}
              />
              {isLoggedIn && role === "user" && (
                <div className="absolute  md:right-7 top-4 right-5 flex flex-col space-y-2">
                  <button
                    className="bg-white text-red-600 rounded-full text-2xl p-2 shadow-md"
                    onClick={handleFavourite}
                  >
                    <FaHeart />
                  </button>
                  <button
                    className="bg-white text-blue-600 rounded-full text-2xl p-2 shadow-md"
                    onClick={handleCart}
                  >
                    <FaCartPlus />
                  </button>
                </div>
              )}
            </div>
            <div className="p-4 w-full md:w-3/5 space-y-4">
              <h1 className="font-semibold text-3xl text-black dark:text-white">
                {bookData.name || "not available"}
              </h1>
              <p className="text-lg text-black dark:text-white">by : {bookData.author}</p>
              <p className="text-sm text-slate-900 dark:text-zinc-300 mt-4">
                {bookData.description}
              </p>
              <p className="text-sm text-slate-900 dark:text-zinc-300 mt-2">
                Language: {bookData.language}
              </p>
              <p className="font-semibold text-xl text-black dark:text-white mt-4">
                <span className="line-through text-black dark:text-white">₹{bookData.price}</span>{" "}
                <span className="text-green-600 ml-3 ">
                  {bookData.discountPercent}%
                </span>
              </p>
              <p className="font-semibold text-xl  text-black dark:text-white mt-4">
                Price: ₹{bookData.discountedPrice}
              </p>
              <p className="font-semibold text-xl  text-black dark:text-white mt-4">
                Stock left: {bookData.stock}
              </p>
                <QuantitySelector maxQuantity={10}  />
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-2"
                onClick={handleCart}
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-slate-100 text-black p-4 rounded-lg dark:bg-slate-700 dark:text-white">
            <h2 className="text-2xl font-semibold dark:text-white text-black">Reviews</h2>
            <div className="space-y-4 mt-4">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="p-4  dark:bg-slate-600 rounded-lg">
                    <div className="flex items-center space-x-4 ">
                      <img
                        src={review.user.avatar}
                        alt={review.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-black dark:text-white ">
                          {review.user.name}
                        </div>
                        <div className="flex items-center space-x-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-sm text-slate-700 dark:text-white mt-2">
                          {review.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-400">
                  No reviews yet. Be the first to review this book!
                </p>
              )}
            </div>
            {isLoggedIn && role === "user" && (
              <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
                <textarea
                  value={newReview.text}
                  onChange={(e) =>
                    setNewReview({ ...newReview, text: e.target.value })
                  }
                  className="w-full p-2 rounded dark:bg-slate-600 "
                  placeholder="Write your review here..."
                  required
                ></textarea>

                {/* Star Rating */}
                <div className="flex items-center space-x-2 mt-4">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <FaStar
                      key={rating}
                      className={`cursor-pointer text-xl ${
                        newReview.rating >= rating
                          ? "text-yellow-400"
                          : "text-zinc-500"
                      }`}
                      onClick={() => handleRatingClick(rating)} // Handle star click
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      <div className="bg-white  rounded-lg dark:bg-slate-800 dark:text-white">
      <RelatedBooks  />
      </div>
     
    </>
  );
};

export default BookDetails;
