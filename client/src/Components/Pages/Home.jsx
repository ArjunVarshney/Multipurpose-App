import React from "react";

//subpages
import Hero from "../Subpages/Hero";
import Discover from "../Subpages/Discover";
import Trending from "../Subpages/Trending";

const Home = () => {
  return (
    <>
      <Hero />
      <Discover />
      <Trending/>
    </>
  );
};

export default Home;
