import React, { useEffect, useState } from "react";
import { API } from "../../../Services/api";

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
  const [blogs, setBlogs] = useState([]);

  const getData = async () => {
    try {
      const posts = await API.getPaginatedPost();
      const postData = posts.data;
      if (postData.success) {
        setBlogs(postData.data);
      } else {
        console.log("post does not exists");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const readTime = (content) => {
    const p = document.createElement("p");
    p.append(content);
    const text = p.innerText;
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SectionBox>
      <ColBox>
        <Heading>
          <AppName /> Posts
        </Heading>
        <Grid container spacing={5}>
          {blogs.map((blog, index) => {
            return (
              <Grid item xs={12} lg={12} key={index}>
                <Go to={`/blog/${blog.url}`}>
                  <Post
                    title={blog.title}
                    date={blog.updatedAt || blog.createdAt}
                    read={readTime(blog.content)}
                    likes={blog.likes}
                    dislikes={blog.dislikes}
                    comments={blog.comments.length}
                    user={blog.created_by}
                    tags={blog.tags}
                  />
                </Go>
              </Grid>
            );
          })}
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
