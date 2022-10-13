import React from "react";

//subpages
import Hero from "../Subpages/Home/Hero";
import Discover from "../Subpages/Home/Discover";
import Trending from "../Subpages/Home/Trending";

const Home = () => {
  return (
    <>
      <Hero />
      <Discover />
      <Trending />
    </>
  );
};

export default Home;
