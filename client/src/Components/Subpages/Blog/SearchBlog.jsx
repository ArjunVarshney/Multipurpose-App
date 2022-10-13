import React from "react";
import { API } from "../../../Services/api.js";

//Libraray components
import Go from "../../Library/encapsulation/Go";
import SearchBar from "../../Library/widgets/SearchBar";
import OutlineBtn from "../../Library/widgets/OutlineBtn";

//mui components
import Box from "@mui/material/Box";
import { styled } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

const SearchBlog = () => {
  const [trendingTags, setTrendingTags] = useState([]);

  const Row = styled(Box)({
    marginTop: "50px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
  });

  useEffect(() => {
    const getTrendingTags = async () => {
      const response = await API.topTags();
      const data = response.data;
      if (data.success) {
        setTrendingTags(data.data);
      } else {
        getTrendingTags();
      }
    };
    getTrendingTags();
  }, []);

  return (
    <>
      <SearchBar />
      <Row>
        {trendingTags.map((tag, index) => {
          return (
            <Go to={`/blog?search=${tag.tag_name.toLowerCase()}`} key={index}>
              <OutlineBtn>{tag.tag_name}</OutlineBtn>
            </Go>
          );
        })}
      </Row>
    </>
  );
};

export default SearchBlog;
