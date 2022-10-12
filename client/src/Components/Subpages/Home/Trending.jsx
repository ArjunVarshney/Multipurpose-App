import React from "react";
import { useState, useEffect } from "react";
import { API } from "../../../Services/api";

//library components
import Heading from "../../Library/encapsulation/Heading";
import SectionBox from "../../Library/encapsulation/SectionBox";
import AppName from "../../Library/standard/AppName";
import ColBox from "../../Library/encapsulation/ColBox";
import OutlineBtn from "../../Library/widgets/OutlineBtn";
import PopularPost from "../../Library/widgets/PopularPost";
import Go from "../../Library/encapsulation/Go";

//mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material";

const Trending = () => {
  const [trending, setTrending] = useState([]);

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
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
  });

  const getData = async () => {
    try {
      const posts = await API.getTrendingPost();
      const postData = posts.data;
      if (postData.success) {
        setTrending(postData.data);
      } else {
        console.log("post does not exists");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SectionBox>
      <ColBox>
        <Heading>
          Trending on <AppName />
        </Heading>
        <Row>
          {tags.map((tag, index) => {
            return (
              <Go to={`/blog?search=${tag.toLowerCase()}`} key={index}>
                <OutlineBtn>{tag}</OutlineBtn>
              </Go>
            );
          })}
        </Row>
        <Box mt={10}></Box>
        <Grid container spacing={4}>
          {trending.map((post, index) => {
            return (
              <Grid item xs={12} md={6} key={index}>
                <Go to={`/blog/${post.url}`}>
                  <PopularPost
                    title={post.title}
                    rank={index + 1}
                    user={post.created_by}
                  />
                </Go>
              </Grid>
            );
          })}
        </Grid>
        <Box mt={10}></Box>
        <Go to="/blog">
          <OutlineBtn>All Posts</OutlineBtn>
        </Go>
      </ColBox>
    </SectionBox>
  );
};

export default Trending;
