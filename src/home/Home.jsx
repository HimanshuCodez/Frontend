import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import RecentlyAdded from "../components/RecentlyAdded";
import AuthorSlider from "../components/Additionals.jsx/AuthorSlider";
import SaleSlider from "../components/Additionals.jsx/SaleSlider";
import Manga from "../components/BookCategory.jsx/Manga";
import Adult from "../components/BookCategory.jsx/Adult";
import Kdrama from "../components/BookCategory.jsx/Kdrama";
import Testimonial from "../components/Additionals.jsx/gifs";


const Home = () => {
  return (
    <>
      <Navbar />  
      <Banner />
      <RecentlyAdded />
      <Kdrama/>
      <SaleSlider/>
      <Manga/>
      <Adult/>
      <Testimonial/>
      <AuthorSlider />
      <Footer />
    </>
  );
};

export default Home;
