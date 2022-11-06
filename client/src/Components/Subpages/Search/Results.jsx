import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API } from "../../../Services/api.js";

//mui components
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material";

//context
import { color } from "../../../Context/ColorContext";

//library component
import Heading from "../../Library/encapsulation/Heading";
import PostCard from "../../Library/widgets/PostCard";
import Go from "../../Library/encapsulation/Go";

const Results = ({ showAlert }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(0);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getSearchedpost = async () => {
      let url = `blog/search?q=${searchParams.get("q")}&sort=${
        sort == 0 ? "popular" : "latest"
      }`;
      if (searchParams.get("tag")) {
        url = `blog/tag/${searchParams.get("tag")}/posts?sort=${
          sort == 0 ? "popular" : "latest"
        }`;
      }
      const response = await API.searchPost("", url);
      const data = await response.data;
      if (data.success) {
        setBlogs(data.data);
      } else {
        showAlert({
          type: "error",
          msg: "Some error occurred. Please check your internet connection or try again later",
        });
      }
    };
    getSearchedpost();
  }, [searchParams, sort]);

  const { primaryThemeColor, textWhite, secondaryBgColor } = useContext(color);

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
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    "& > h2": {
      marginBottom: "20px !important",
    },
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
  const CustomTabs = styled(Tabs)({
    width: "100%",
    marginBottom: "20px",
    borderBottom: `1px solid ${secondaryBgColor}`,
    "& .MuiTabs-indicator": {
      backgroundColor: primaryThemeColor,
    },
  });

  const CustomTab = styled(Tab)({
    "&.Mui-selected": {
      color: primaryThemeColor,
      fontWeight: "bold",
    },
  });

  const tabChange = (event, newValue) => {
    setSort(newValue);
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

  return (
    <ExploreBox>
      <HeaderBox>
        <Heading>Search Results</Heading>
        <CustomTabs value={sort} onChange={tabChange} selectionFollowsFocus>
          <CustomTab label="Popular" />
          <CustomTab label="Latest" />
        </CustomTabs>
      </HeaderBox>
      <Grid container spacing={5} style={{ marginBottom: "100px" }}>
        {blogs.length == 0 ? (
          <Grid item xs={12} lg={12} style={{ fontFamily: "Inter" }}>
            No Post found
          </Grid>
        ) : (
          blogs.map((blog, index) => {
            return (
              <Grid item xs={12} lg={12} key={index}>
                <Go to={`/blog/${blog.url}`}>
                  <PostCard
                    title={blog.title}
                    date={blog.updatedAt || blog.createdAt}
                    read={readTime(blog.content)}
                    likes={blog.likes}
                    dislikes={blog.dislikes}
                    comments={blog.comments.length}
                    user={blog.created_by}
                    tags={blog.tags}
                    image={blog.image_url}
                    subject={blog.subject}
                  />
                </Go>
              </Grid>
            );
          })
        )}
      </Grid>
    </ExploreBox>
  );
};

export default Results;
