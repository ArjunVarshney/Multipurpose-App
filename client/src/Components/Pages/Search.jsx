import React from "react";
import { useState } from "react";

//Libraray components
import SectionBox from "../Library/encapsulation/SectionBox";
import ColBox from "../Library/encapsulation/ColBox";
import SearchBox from "../Library/widgets/SearchBar";
import PopularTags from "../Library/widgets/PopularTags";

//subpages
import Results from "../Subpages/Search/Results";
import RelatedTags from "../Subpages/Search/RelatedTags";

//mui components
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

const Search = ({ showAlert }) => {
  const RowBox = styled(Box)({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: "40px",
    marginTop: "50px",
  });

  return (
    <SectionBox>
      <ColBox>
        <SearchBox />
        <PopularTags />
        <RowBox>
          <Results showAlert={showAlert} />
          <RelatedTags />
        </RowBox>
      </ColBox>
    </SectionBox>
  );
};

export default Search;
