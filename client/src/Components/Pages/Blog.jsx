import React from "react";

//subpages
import Hero from "../Subpages/Blog/Hero";
import SearchBlog from "../Subpages/Blog/SearchBlog";
import Explore from "../Subpages/Blog/Explore";
import AllTags from "../Subpages/Blog/AllTags";

//Library components
import SectionBox from "../Library/encapsulation/SectionBox";
import ColBox from "../Library/encapsulation/ColBox";

//mui components
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

const Blog = () => {
  const RowBox = styled(Box)({
    display: "flex",
    flexDirection: "row",
    marginTop: "50px",
  });
  return (
    <>
      <Hero />
      <SectionBox>
        <ColBox>
          <SearchBlog />
          <RowBox>
            <Explore />
            <AllTags />
          </RowBox>
        </ColBox>
      </SectionBox>
    </>
  );
};

export default Blog;
