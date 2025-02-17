import React from "react";
import file from "../../public/file.png";
import FreeDeliveryBanner from "./Additionals.jsx/FreeDelivery";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <>
      <div className="flex flex-col">
        <FreeDeliveryBanner />
        
        <div className="pt-12 max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
          {/* Text Content Section */}
          <motion.div 
            className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="space-y-9">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                Hello, Welcome here to learn something{" "}
                <motion.span 
                  className="text-purple-600 inline-block"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  new everyday!!
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-xl text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                Here you'll discover a curated selection of books catering to all your interests! 
                Dive into the captivating world of manga, indulge in the magic of K-drama-inspired novels, 
                and explore a variety of genres that ignite your imagination. Whether you're a fan of 
                graphic storytelling or looking for gripping dramas, our store offers something for everyone. 
                Let your reading journey begin here!
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                <label className="input input-bordered flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </motion.svg>
                  <input 
                    type="text" 
                    className="grow focus:outline-none" 
                    placeholder="Share your feedback with us" 
                  />
                </label>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              <Link to={"/bookRequest"}>
                <motion.button 
                  className="btn mt-6 bg-purple-500 text-white hover:bg-purple-600 hover:text-white border-none shadow-md"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Request Book
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Image Section */}
          <motion.div 
            className="order-1 w-full md:w-1/2 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              whileHover={{ rotate: [0, -1, 1, -1, 0], transition: { duration: 0.5 } }}
            >
              <motion.img 
                src={file} 
                alt="Books illustration" 
                className="drop-shadow-2xl"
                initial={{ y: 20 }}
                animate={{ 
                  y: [20, 0, 20],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <motion.div
          className="hidden md:block absolute top-40 right-20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div 
            className="w-12 h-12 rounded-full bg-purple-200"
            animate={{ 
              y: [0, 20, 0],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut" 
            }}
          />
        </motion.div>
        
        <motion.div
          className="hidden md:block absolute bottom-40 left-20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.div 
            className="w-8 h-8 rounded-full bg-blue-200"
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </>
  );
};

export default Banner;