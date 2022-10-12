import React, { useContext, useEffect, useState } from "react";
import { API } from "../../../Services/api";

//mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material";

//context
import { color } from "../../../Context/ColorContext";

//library component
import Heading from "../../Library/encapsulation/Heading";
import ExplorePost from "../../Library/widgets/ExplorePost";
import OutlineBtn from "../../Library/widgets/OutlineBtn";
import Go from "../../Library/encapsulation/Go";

const Explore = () => {
  const { primaryThemeColor, textWhite } = useContext(color);

  const ExploreBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "70%",
    boxSizing: "border-box",
    "& > div > h2": {
      boxSizing: "border-box",
      textAlign: "left",
      margin: "50px 0",
    },
    "& > button": {
      width: "max-content",
    },
    ["@media (max-width: 830px)"]: {
      width: "100%",
    },
  });

  const HeaderBox = styled(Box)({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    "& > a > button": {
      background: primaryThemeColor,
      color: textWhite,
      transition: "all 0.3s ease",
      "&:hover": {
        background: primaryThemeColor,
        scale: "1.02",
      },
    },
  });
  
  const [blogs, setBlogs] = useState([]);

  const getData = async () => {
    try {
      const posts = await API.getAllPost();
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
    <ExploreBox>
      <HeaderBox>
        <Heading>Explore</Heading>
        <Go to="/blog/create">
          <OutlineBtn>Create</OutlineBtn>
        </Go>
      </HeaderBox>
      <Grid container spacing={5} style={{ marginBottom: "100px" }}>
        {blogs.map((blog, index) => {
          return (
            <Grid item xs={12} lg={12} key={index}>
              <Go to={`/blog/${blog.url}`}>
                <ExplorePost
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
      <OutlineBtn>Load more</OutlineBtn>
    </ExploreBox>
  );
};

export default Explore;
