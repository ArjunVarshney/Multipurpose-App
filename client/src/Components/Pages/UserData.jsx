import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../../Services/api";

// context
import { color } from "../../Context/ColorContext";
import { account } from "../../Context/UserContext";

//mui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/material";

// LIbrary components
import SectionBox from "../Library/encapsulation/SectionBox";
import ColBox from "../Library/encapsulation/ColBox";
import Go from "../Library/encapsulation/Go";
import User from "../Library/widgets/User";

const UserData = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    primaryTextColor,
    secondaryBgColor,
    textWhite,
    mainBgColor,
  } = useContext(color);
  const { user, setUser } = useContext(account);
  const [userInfo, setUserInfo] = useState({});
  const [likedPost, setLikedPost] = useState([]);
  const [savedPost, setSavedPost] = useState([]);
  const [comments, setComments] = useState([]);

  const LogoutUser = () => {
    setUser({});
    localStorage.setItem("token", "");
    navigate("/");
    window.location.reload();
  };

  const getUser = async () => {
    try {
      const id = window.location.pathname.split("/")[2];
      if (!id) return;
      const url = `user/get/${id}`;
      const response = await API.getUser("", url);
      const data = await response.data;
      if (data.success) {
        setUserInfo(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getUser();
  }, [pathname]);

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

  const getComment = async (id) => {
    try {
      const post = await API.getComment("", `blog/comment/get/${id}`);
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

  const getAllLikedPosts = async () => {
    try {
      let likeArr = [];
      if (!userInfo.liked || userInfo.liked.length <= 0) {
        setLikedPost([]);
        return;
      }
      await userInfo.liked.map(async (post_id) => {
        const post = await getPost(post_id);
        if (post.title) likeArr = [...new Set([...likeArr, post])];
        setLikedPost(likeArr);
      });
    } catch (error) {
      console.log(error);
      setLikedPost([]);
    }
  };

  const getAllSavedPosts = async () => {
    try {
      let saveArr = [];
      if (!userInfo.saved || userInfo.saved.length <= 0) {
        setSavedPost([]);
        return;
      }
      await userInfo.saved.map(async (post_id) => {
        const post = await getPost(post_id);
        if (post.title) saveArr = [...new Set([...saveArr, post])];
        setSavedPost(saveArr);
      });
    } catch (error) {
      console.log(error);
      setSavedPost([]);
    }
  };

  const getAllComments = async () => {
    try {
      let commentArr = [];
      if (!userInfo.saved || userInfo.saved.length <= 0) {
        setComments([]);
        return;
      }
      await userInfo.comments.map(async (comment_id) => {
        const comment = await getComment(comment_id);
        if (!comment) return;
        const post = await getPost(comment.blog_id);
        if (!post) return;
        const allCommentDetail = { comment, post };
        if (post.title)
          commentArr = [...new Set([...commentArr, allCommentDetail])];
        setComments(commentArr);
      });
    } catch (error) {
      console.log(error);
      setComments([]);
    }
  };

  useEffect(() => {
    getAllLikedPosts();
    getAllSavedPosts();
    getAllComments();
  }, [userInfo]);

  const FloatButton = styled(Button)({
    color: primaryTextColor,
    fontWeight: "bold",
    background: secondaryBgColor,
    fontSize: "16px",
    padding: "10px 20px",
    wordSpacing: "5px",
    textAlign: "center",
    borderRadius: "10px",
    transition: "all 0.3s ease",
    display: "flex",
    gap: "3px",
    "&:hover": {
      background: secondaryBgColor,
      scale: "1.05",
    },
    "&:active": {
      scale: "1",
    },
  });

  const ImageBox = styled(Box)({
    height: "40vw",
    width: "40vw",
    maxHeight: "350px",
    maxWidth: "350px",
    "& > div": {
      width: "100%",
      height: "100%",
      background: `url(${userInfo.image_url}) center/cover`,
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

  const LikedPost = styled(Box)({
    display: "flex",
    alignItems: "center",
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

  const ListedComment = styled(Box)({
    padding: "10px",
    border: `1px solid ${secondaryBgColor}`,
    borderRadius: "10px",
    background: textWhite,
    margin: "10px 0px",
    "& > p > p:first-of-type": {
      marginTop: "0",
    },
    "& > p > p:last-of-type": {
      marginBottom: "0",
    },
  });

  return (
    <SectionBox>
      <ColBox>
        {/* For edit icon */}
        {user._id &&
          userInfo._id &&
          user.username == userInfo.username &&
          user._id == userInfo._id && (
            <>
              <Box
                style={{
                  position: "absolute",
                  top: "160px",
                  right: "10%",
                }}
              >
                <FloatButton
                  onClick={() => {
                    navigate(`/user/edit/${user._id}`);
                  }}
                >
                  <DriveFileRenameOutlineRoundedIcon
                    style={{ fontSize: "30px" }}
                  />
                  Edit
                </FloatButton>
              </Box>
              {/* For edit icon */}
              <Box
                style={{
                  position: "absolute",
                  top: "100px",
                  right: "10%",
                }}
              >
                <FloatButton onClick={LogoutUser}>
                  <LogoutIcon style={{ fontSize: "30px" }} />
                  Sign out
                </FloatButton>
              </Box>
            </>
          )}
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
          <Typography
            variant="h5"
            style={{
              marginTop: "20px",
              fontSize: "30px",
              fontWeight: "bold",
              fontFamily: "Inter",
              textAlign: "center",
            }}
          >
            {userInfo.username}
          </Typography>
          {/* For real name and description */}
          <Typography
            style={{
              marginTop: "10px",
              fontSize: "24px",
              fontFamily: "Inter",
              textAlign: "center",
              maxWidth: "70%",
              lineHeight: "25px",
            }}
          >
            {userInfo.name} - {userInfo.small_intro}
          </Typography>
          {/* For joined at */}
          <Typography
            style={{
              marginTop: "10px",
              fontSize: "24px",
              fontFamily: "Inter",
              textAlign: "center",
              maxWidth: "70%",
            }}
          >
            Joined at:{" "}
            {userInfo.joined_at &&
              userInfo.joined_at.substring(0, userInfo.joined_at.indexOf("T"))}
          </Typography>
        </Box>

        {/* For about section */}
        <Section>
          {/* For heading */}
          <SectionHead>About</SectionHead>
          {/* For about inner */}
          <Typography>{userInfo.description}</Typography>
        </Section>

        {/* For Saved Posts */}
        {user._id &&
          userInfo._id &&
          user.username == userInfo.username &&
          user._id == userInfo._id &&
          userInfo.saved &&
          userInfo.saved.length > 0 && (
            <Section>
              {/* For heading */}
              <SectionHead>Saved Posts</SectionHead>
              {/* For Posts */}
              <Box>
                {savedPost.length > 0 &&
                  savedPost.map((post, index) => {
                    return (
                      <Go to={`/blog/${post.url}`} key={index}>
                        <LikedPost>
                          <Typography>{post.title}</Typography>
                          <Box>
                            <User user={post.created_by} />
                          </Box>
                        </LikedPost>
                      </Go>
                    );
                  })}
              </Box>
            </Section>
          )}

        {/* For the liked section */}
        {userInfo.liked && userInfo.liked.length > 0 && (
          <Section>
            {/* For heading */}
            <SectionHead>Liked Posts</SectionHead>
            {/* For Posts */}
            <Box>
              {likedPost.length > 0 &&
                likedPost.map((post, index) => {
                  return (
                    <Go to={`/blog/${post.url}`} key={index}>
                      <LikedPost>
                        <Typography>{post.title}</Typography>
                        <Box>
                          <User user={post.created_by} />
                        </Box>
                      </LikedPost>
                    </Go>
                  );
                })}
            </Box>
          </Section>
        )}

        {/* For Commented Posts */}

        {userInfo.comments && comments.length > 0 && (
          <Section>
            {/* For heading */}
            <SectionHead>Responded on</SectionHead>
            {/* For list of posts */}
            <Box>
              {comments.map((comment, index) => {
                return (
                  <ListedComment key={index}>
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: `${comment.comment.comment}`,
                      }}
                    ></Typography>
                    <LikedPost style={{ background: mainBgColor }}>
                      <Typography>{comment.post.title}</Typography>
                      <Box>
                        <User user={comment.post.created_by} />
                      </Box>
                    </LikedPost>
                    <Typography style={{ width: "100%", textAlign: "right" }}>
                      {comments[0].comment.likes.length} likes
                    </Typography>
                  </ListedComment>
                );
              })}
            </Box>
          </Section>
        )}
      </ColBox>
    </SectionBox>
  );
};

export default UserData;
