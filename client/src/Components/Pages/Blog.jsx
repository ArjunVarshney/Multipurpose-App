import React from "react";

//subpages
import Hero from "../Subpages/Blog/Hero";
import SearchBlog from "../Subpages/Blog/SearchBlog";
import Explore from "../Subpages/Blog/Explore";
import AllTags from "../Subpages/Blog/AllTags";

//mui components
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

const Blog = () => {
  return (
    <>
      <Hero />
      <SearchBlog />
      <Box>
        <Explore />
        <AllTags />
      </Box>
    </>
  );
};

export default Blog;
