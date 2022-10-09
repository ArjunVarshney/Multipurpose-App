import React from "react";

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

  const postTitle = [
    "How to web scraping in java script",
    "Calisthenics vs Weights",
    "How will meditation change your life",
    "How to use and enable WSL in Windows",
    "What is docker, How to use it, How it works, Basic Docker Commands",
    "What is tendonoitis",
    "How is Whey protein different from Plant protien",
    "Hidden HTML tags that can make your life easy",
    "Why eggs whites do not foam when yolk is present in it",
    "How to prevent burnouts",
  ];

  const Row = styled(Box)({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
  });

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
          {postTitle.map((title, index) => {
            const username = "Arjun Varshney";
            const image = "https://source.unsplash.com/random/?user";
            return (
              <Grid item xs={12} md={6} key={index}>
                <PopularPost
                  title={title}
                  rank={index + 1}
                  username={username}
                  image={image}
                />
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
