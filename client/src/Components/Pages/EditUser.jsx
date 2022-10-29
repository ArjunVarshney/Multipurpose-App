import React, { useEffect, useCallback } from "react";
import { useContext } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../../Services/api";

// context
import { color } from "../../Context/ColorContext";
import { account } from "../../Context/UserContext";

//mui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { styled } from "@mui/material";

// LIbrary components
import SectionBox from "../Library/encapsulation/SectionBox";
import ColBox from "../Library/encapsulation/ColBox";
import Go from "../Library/encapsulation/Go";

const EditUser = () => {
  const {
    primaryTextColor,
    primaryThemeColor,
    secondaryBgColor,
    textWhite,
    mainBgColor,
  } = useContext(color);
  const { user, setUser } = useContext(account);
  const [savedPost, setSavedPost] = useState([]);
  let textBox = {};

  const getPost = async (id) => {
    try {
      const post = await API.getPostById("", `blog/getbyid/${id}`);
      const data = post.data;
      if (!post || !data) return;
      if (data.success) {
        return data.data;
      } else {
        return {};
      }
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  const getAllSavedPosts = async () => {
    try {
      let saveArr = [];
      if (!user.saved || user.saved.length <= 0) {
        setSavedPost([]);
        return;
      }
      await user.saved.map(async (post_id) => {
        const post = await getPost(post_id);
        if (post.title) saveArr = [...new Set([...saveArr, post])];
        setSavedPost(saveArr);
      });
    } catch (error) {
      console.log(error);
      setSavedPost([]);
    }
  };

  useEffect(() => {
    getAllSavedPosts();
  }, [user]);

  const updateAbout = (e) => {
    e.preventDefault();
  };

  const ImageBox = styled(Box)({
    height: "40vw",
    width: "40vw",
    maxHeight: "350px",
    maxWidth: "350px",
    "& > div": {
      width: "100%",
      height: "100%",
      background: `url(${user.image_url}) center/cover`,
      borderRadius: "50%",
    },
  });

  const Section = styled(Box)({
    marginTop: "30px",
    width: "100%",
  });

  const SectionHead = styled(Typography)({
    fontWeight: "bold",
    fontSize: "24px",
    width: "100%",
    textAlign: "left",
    marginBottom: "10px",
  });

  const SavedPost = styled(Box)({
    display: "flex",
    alignItems: "start",
    justifyContent: "space-between",
    padding: "15px",
    border: `1px solid ${secondaryBgColor}`,
    borderRadius: "10px",
    margin: "10px 0px",
    background: textWhite,
    "& > p": {
      padding: "5px 20px 5px 5px",
      fontFamily: "Inter",
      fontSize: "20px",
    },
    "& > div": {},
  });

  const loadEditor = useCallback((wrapper) => {
    if (!wrapper) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    textBox = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ header: 1 }, { header: 2 }],
          [{ color: [] }, { background: [] }],
          ["blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          [{ font: [] }],
        ],
      },
      placeholder: "What are your thoughts?",
    });
  }, []);

  const AboutBox = styled(Box)({
    display: "flex",
    padding: "10px",
    height: "max-content",
    position: "relative",
    borderRadius: "10px",
    background: textWhite,
    boxShadow: `0 0 5px 0 ${secondaryBgColor}`,
    ["@media (max-width: 1000px)"]: {
      borderRadius: "10px 10px 0 0",
      marginBottom: "50px",
    },
  });

  const UpdateBtn = styled(Button)({
    position: "absolute",
    right: "10px",
    top: "8px",
    borderRadius: "10px",
    padding: "10px 20px",
    color: textWhite,
    background: primaryThemeColor,
    "&:hover": {
      background: primaryThemeColor,
    },
    ["@media (max-width: 1000px)"]: {
      top: "100%",
      left: "0",
      right: "0",
      borderRadius: "0 0 10px 10px",
    },
  });

  const Editor = styled(Box)({
    width: "100%",
    "& > .ql-toolbar": {
      border: "none",
      borderRadius: "10px",
      background: mainBgColor,
    },
    "& > .ql-container.ql-snow": {
      border: "none",
      "& *": {
        fontFamily: "Inter",
      },
      "& h1": {
        fontSize: "24px",
      },
      "& h2": {
        fontSize: "18px",
      },
    },
    "& > .ql-container > .ql-editor": {
      padding: "10px 5px 5px 5px",
      height: "max-content",
      fontSize: "16px",
      ["@media (max-width: 1000px)"]: {
        minHeight: "100px",
      },
    },
    "& > .ql-container > .ql-editor::before": {
      left: "5px",
      opacity: "0.5",
    },
  });

  return (
    <SectionBox>
      <ColBox>
        {/* For image */}
        <ImageBox>
          <Box />
        </ImageBox>
        {/* For user details */}
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* For username */}
          <Box
            style={{
              width: "100%",
              marginTop: "20px",
              fontSize: "30px",
              fontWeight: "bold",
              fontFamily: "Inter",
              textAlign: "center",
            }}
          >
            {/* {user.username} */}
            <TextField
              color="secondary"
              defaultValue={user.username}
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
            />
          </Box>
          {/* For real name and description */}
          <Box
            style={{
              width: "100%",
              marginTop: "20px",
              fontSize: "24px",
              fontFamily: "Inter",
              textAlign: "center",
              maxWidth: "100%",
              lineHeight: "25px",
            }}
          >
            {/* {user.name} - {user.small_intro} */}
            <TextField
              color="secondary"
              defaultValue={user.name}
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
            />
            <TextField
              color="secondary"
              defaultValue={user.small_intro}
              required
              fullWidth
              id="smallIntro"
              label="Small Intro"
              name="intro"
              style={{
                marginTop: "10px",
              }}
            />
          </Box>
          {/* For joined at */}
          <Typography
            style={{
              marginTop: "10px",
              fontSize: "24px",
              fontFamily: "Inter",
              textAlign: "center",
              maxWidth: "100%",
            }}
          >
            Joined at:{" "}
            {user.joined_at &&
              user.joined_at.substring(0, user.joined_at.indexOf("T"))}
          </Typography>
        </Box>

        {/* For about section */}
        <Section>
          {/* For heading */}
          <SectionHead>About</SectionHead>
          {/* For about inner */}
          <Box>
            <AboutBox component="form" onSubmit={updateAbout}>
              <Editor id="aboutEditor" ref={loadEditor} />
              <UpdateBtn type="submit">Update</UpdateBtn>
            </AboutBox>
          </Box>
        </Section>

        {/* For Saved Posts */}
        {user._id &&
          user._id &&
          user.username == user.username &&
          user._id == user._id &&
          user.saved &&
          user.saved.length > 0 && (
            <Section>
              {/* For heading */}
              <SectionHead>Saved Posts</SectionHead>
              {/* For Posts */}
              <Box>
                {savedPost.length > 0 &&
                  savedPost.map((post, index) => {
                    return (
                      <SavedPost key={index}>
                        <Go to={`/blog/${post.url}`}>
                          <Typography
                            style={{
                              fontFamily: "Inter",
                              fontSize: "18px",
                            }}
                          >
                            {post.title}
                          </Typography>
                        </Go>
                        <Button
                          style={{
                            color: primaryThemeColor,
                            width: "fit-content",
                            minWidth: "unset",
                            borderRadius: "10px",
                          }}
                        >
                          <CloseRoundedIcon />
                        </Button>
                      </SavedPost>
                    );
                  })}
              </Box>
            </Section>
          )}
      </ColBox>
    </SectionBox>
  );
};

export default EditUser;
