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
import PopularTags from "../../Library/widgets/PopularTags";

//mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Trending = () => {
  const [trending, setTrending] = useState([]);

  const getData = async () => {
    try {
      const posts = await API.getTrendingPost();
      const postData = posts.data;
      if (postData.success) {
        setTrending(postData.data);
      } else {
        getData();
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
        <PopularTags />
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
