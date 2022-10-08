import React from "react";

//Library components
import SectionBox from "../../Library/encapsulation/SectionBox";
import Heading from "../../Library/encapsulation/Heading";
import AppName from "../../Library/standard/AppName";
import ColBox from "../../Library/encapsulation/ColBox";
import Post from "../../Library/widgets/Post";
import OutlineBtn from "../../Library/widgets/OutlineBtn";
import Go from "../../Library/encapsulation/Go";

//mui components
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const AllPosts = () => {
  return (
    <SectionBox>
      <ColBox>
        <Heading>
          <AppName /> Posts
        </Heading>
        <Grid container spacing={5}>
          <Grid item xs={12} lg={12}>
            <Post />
          </Grid>
          <Grid item xs={12} lg={12}>
            <Post />
          </Grid>
          <Grid item xs={12} lg={12}>
            <Post />
          </Grid>
          <Grid item xs={12} lg={12}>
            <Post />
          </Grid>
        </Grid>
        <Box mt={10}></Box>
        <Go to="/blog">
          <OutlineBtn>Load More</OutlineBtn>
        </Go>
      </ColBox>
    </SectionBox>
  );
};

export default AllPosts;
