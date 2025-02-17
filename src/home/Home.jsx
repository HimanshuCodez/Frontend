import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import RecentlyAdded from "../components/RecentlyAdded";
import AuthorSlider from "../components/Additionals.jsx/AuthorSlider";
import SaleSlider from "../components/Additionals.jsx/SaleSlider";
import Manga from "../components/BookCategory.jsx/Manga";
import Kdrama from "../components/BookCategory.jsx/Kdrama";
import Help from "../components/BookCategory.jsx/Help";
import Testimonial from "../components/Additionals.jsx/Testimonial";


const Home = () => {
  return (
    <>
      <Navbar />  
      <Banner />
      <RecentlyAdded />
      <Kdrama/>
      <SaleSlider/>
      <Help/>
      <Manga/>
      <Testimonial/>
      <AuthorSlider />
      <Footer />
    </>
  );
};

export default Home;
