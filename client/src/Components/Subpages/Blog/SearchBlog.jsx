import React from "react";

//Libraray components
import ColBox from "../../Library/encapsulation/ColBox";
import Go from "../../Library/encapsulation/Go";
import SearchBar from "../../Library/widgets/SearchBar";
import OutlineBtn from "../../Library/widgets/OutlineBtn";

//mui components
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

const SearchBlog = () => {
  const tags = [
    "Nutrition",
    "Exercise",
    "Productivity",
    "Coding",
    "Relationship",
    "Sports",
    "Docker",
    "DevOps",
    "Development",
    "Skill",
  ];

  const Row = styled(Box)({
    marginTop: "50px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
  });

  return (
    <>
      <SearchBar />
      <Row>
        {tags.map((tag, index) => {
          return (
            <Go to={`/blog?search=${tag.toLowerCase()}`} key={index}>
              <OutlineBtn>{tag}</OutlineBtn>
            </Go>
          );
        })}
      </Row>
    </>
  );
};

export default SearchBlog;
