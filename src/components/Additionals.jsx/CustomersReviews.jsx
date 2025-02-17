import React from "react";

const testimonials = [
  {
    name: "Amit Sharma",
    review:
      "Amazing collection of books! The checkout process was smooth, and delivery was fast. Highly recommend!",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Priya Verma",
    review:
      "I love the variety of books available here. The website is user-friendly, and customer service is great!",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Rahul Mehta",
    review:
      "Great discounts and a wide range of categories. This is my go-to online bookstore!",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const Testimonial = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        What Our Customers Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="card bg-base-100 shadow-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center text-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mb-4 border-4 border-primary"
              />
              <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.review}"</p>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-3">
                - {testimonial.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;