import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { API } from "../../../Services/api.js";

//Libraray components
import Go from "../../Library/encapsulation/Go";
import SearchBar from "../../Library/widgets/SearchBar";
import OutlineBtn from "../../Library/widgets/OutlineBtn";

//mui components
import Box from "@mui/material/Box";
import { styled } from "@mui/material";
import PopularTags from "../../Library/widgets/PopularTags.jsx";

const SearchBlog = () => {

  return (
    <>
      <SearchBar />
      <PopularTags />
    </>
  );
};

export default SearchBlog;
