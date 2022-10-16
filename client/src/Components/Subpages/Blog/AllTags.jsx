import React, { useEffect } from "react";
import { API } from "../../../Services/api.js";

//mui components
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

//library component
import Heading from "../../Library/encapsulation/Heading";
import Go from "../../Library/encapsulation/Go";
import PrimaryTag from "../../Library/widgets/PrimaryTag";
import { useState } from "react";

const AllTags = () => {
  const [tags, setTags] = useState([]);

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

  useEffect(() => {
    const getTags = async () => {
      const response = await API.getAllTags();
      const data = response.data;
      if (data.success) {
        setTags(data.data);
      }
    };
    getTags();
  }, []);

  return (
    <TagBox>
      <Heading>Tags</Heading>
      <Row>
        {tags.map((tag, index) => {
          return (
            <Go to={`/blog/search?q=${tag.tag_name.toLowerCase()}`} key={index}>
              <PrimaryTag text={tag.tag_name} />
            </Go>
          );
        })}
      </Row>
    </TagBox>
  );
};

export default AllTags;
