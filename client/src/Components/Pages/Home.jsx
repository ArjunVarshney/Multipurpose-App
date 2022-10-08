import React from "react";

//subpages
import Hero from "../Subpages/Home/Hero";
import Discover from "../Subpages/Home/Discover";
import Trending from "../Subpages/Home/Trending";
import AllPosts from "../Subpages/Home/AllPosts";

const Home = () => {
  return (
    <>
      <Hero />
      <Discover />
      <Trending />
      <AllPosts />
    </>
  );
};

export default Home;
