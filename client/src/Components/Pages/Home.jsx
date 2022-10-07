import React from "react";

//subpages
import Hero from "../Subpages/Hero";
import Discover from "../Subpages/Discover";
import Trending from "../Subpages/Trending";
import AllPosts from "../Subpages/AllPosts";

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
