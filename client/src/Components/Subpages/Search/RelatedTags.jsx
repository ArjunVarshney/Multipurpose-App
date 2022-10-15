import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { API } from "../../../Services/api.js";

//mui components
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

//library component
import Heading from "../../Library/encapsulation/Heading";
import Go from "../../Library/encapsulation/Go";
import PrimaryTag from "../../Library/widgets/PrimaryTag";
import { useState } from "react";

const RelatedTags = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getSearchedPostTags = async () => {
      let url = `blog/search?q=${searchParams.get("q")}&onlytags=true`;
      if (searchParams.get("tag")) {
        url = `blog/tag/${searchParams.get("tag")}/posts?onlytags=true`;
      }
      const response = await API.searchPost("", url);
      const data = await response.data;
      if (data.success) {
        setTags(data.data);
      }
    };
    getSearchedPostTags();
  }, [searchParams]);

  const TagBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    width: "30%",
    boxSizing: "border-box",
    "& > h2": {
      boxSizing: "border-box",
      padding: "0 10px",
      textAlign: "left",
      margin: "50px 0",
    },
    ["@media (max-width: 830px)"]: {
      display: "none",
    },
  });

  const Row = styled(Box)({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "start",
    gap: "5px",
    "& > a > div": {
      padding: "5px 10px",
      borderRadius: "10px",
      "& > p": {
        fontSize: "14px",
      },
    },
  });

  return (
    <TagBox>
      <Heading>Related</Heading>
      <Row>
        {tags.map((tag, index) => {
          return (
            <Go to={`/blog/search?tag=${tag.toLowerCase()}`} key={index}>
              <PrimaryTag text={tag} />
            </Go>
          );
        })}
      </Row>
    </TagBox>
  );
};

export default RelatedTags;
