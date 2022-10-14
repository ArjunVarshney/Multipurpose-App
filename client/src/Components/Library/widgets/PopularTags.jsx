import React from "react";
import { useState, useEffect } from "react";
import { API } from "../../../Services/api";

//Library components
import OutlineBtn from "../../Library/widgets/OutlineBtn";
import Go from "../../Library/encapsulation/Go";

// mui components
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

const PopularTags = () => {
  const [trendingTags, setTrendingTags] = useState([]);

  const Row = styled(Box)({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
  });

  const getTrendingTags = async () => {
    const response = await API.topTags();
    const data = response.data;
    if (data.success) {
      setTrendingTags(data.data);
    } else {
      getTrendingTags();
    }
  };

  useEffect(() => {
    getTrendingTags();
  }, []);

  return (
    <Row>
      {trendingTags.map((tag, index) => {
        return (
          <Go to={`/blog/search?tag=${tag.tag_name.toLowerCase()}`} key={index}>
            <OutlineBtn>{tag.tag_name}</OutlineBtn>
          </Go>
        );
      })}
    </Row>
  );
};

export default PopularTags;
