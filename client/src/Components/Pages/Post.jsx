import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../Services/api";

// context
import { color } from "../../Context/ColorContext";
import { account } from "../../Context/UserContext";

//mui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { styled } from "@mui/material";

// LIbrary components
import SectionBox from "../Library/encapsulation/SectionBox";
import ColBox from "../Library/encapsulation/ColBox";
import Heading from "../Library/encapsulation/Heading";
import PrimaryTag from "../Library/widgets/PrimaryTag";
import Go from "../Library/encapsulation/Go";
import LikeCount from "../Library/widgets/LikeCount";
import DislikeCount from "../Library/widgets/DislikeCount";
import CommentCount from "../Library/widgets/CommentCount";
import CommentInput from "../Library/widgets/CommentInput";
import CommentBox from "../Library/widgets/CommentBox";

const Post = ({ setClosePlayer, isPlayerClosed, setCurrentBlog }) => {
  const { primaryThemeColor, primaryTextColor, secondaryBgColor, textWhite } =
    useContext(color);
  const navigate = useNavigate();
  const { user } = useContext(account);
  const [creator, setCreator] = useState({});
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const getData = async () => {
    try {
      const url = `blog/get/${window.location.pathname.split("/")[2]}`;
      const response = await API.getPost("", url);
      const data = response.data;
      if (data.success) {
        setPost(data.data);
      } else {
        console.log("post does not exists");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getCreator = async () => {
    try {
      if (!post.created_by) return;
      const url = `user/get/${post.created_by}`;
      const response = await API.getUser("", url);
      const user = await response.data;
      if (user.success) {
        setCreator(user.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      if (!post._id) return;
      const url = `blog/comment/blogcomment/${post._id}`;
      const response = await API.getBlogComments("", url);
      const blogComments = await response.data;
      if (blogComments.success) {
        let commentData = blogComments.data;
        for (let i = 0; i < commentData.length; i++) {
          if (commentData[i].created_by == user._id) {
            commentData.push(commentData.splice(i, 1)[0]);
          }
        }
        setComments(commentData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCreator();
    getComments();
  }, [post]);

  useEffect(() => {
    getData();
  }, []);

  const savePost = async () => {
    try {
      if (user._id) {
        if (user.saved.includes(post._id)) return;
        const response = await API.saveForLater(
          { post_id: post._id },
          `user/save/${user._id}`
        );
        const data = response.data;
        if (data.success) {
          console.log(data.data);
        } else {
          console.log("some error occurred");
        }
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
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

  const getDayBefore = (strDate) => {
    const curr = new Date();
    const date = new Date(strDate);
    const oneDay = 1000 * 60 * 60 * 24;
    const days = Math.floor((curr - date) / oneDay);
    let timeAgo = "";
    if (days > 730) {
      timeAgo = Math.floor(days / 365).toString() + " years ago";
    } else if (days > 365) {
      timeAgo = Math.floor(days / 365).toString() + " year ago";
    } else if (days > 60) {
      timeAgo = Math.floor(days / 30).toString() + " months ago";
    } else if (days > 30) {
      timeAgo = Math.floor(days / 30).toString() + " month ago";
    } else if (days > 1) {
      timeAgo = days.toString() + " days ago";
    } else if (days > 0) {
      timeAgo = days.toString() + " day ago";
    } else {
      timeAgo = "Today";
    }
    return timeAgo;
  };

  const updateLikes = async () => {
    const response = await API.likePost(
      { user_id: user._id },
      `/blog/like/${post._id}`
    );
    const data = await response.data;
    if (data.success) {
      getData();
    }
  };

  const updateDislikes = async () => {
    const response = await API.dislikePost(
      { user_id: user._id },
      `/blog/dislike/${post._id}`
    );
    const data = await response.data;
    if (data.success) {
      getData();
    }
  };

  const ImageBox = styled(Box)({
    background: `url(${creator.image_url}) center/cover`,
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    boxShadow: "0 0 3px 0",
    ["@media (max-width: 350px)"]: {
      height: "70px",
      width: "70px",
    },
  });

  const UserBox = styled(Box)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "max-content",
    cursor: "pointer",
    ["@media (max-width: 500px)"]: {
      scale: "0.8",
    },
    ["@media (max-width: 420px)"]: {
      "& > div:nth-of-type(3)": {
        display: "none",
      },
    },
  });

  const UserText = styled(Box)({
    width: "100%",
    height: "100%",
    padding: "10px 30px",
    display: "flex",
    gap: "8px",
    flexDirection: "column",
    justifyContent: "space-between",
    ["@media (max-width: 400px)"]: {
      padding: "10px 20px",
    },
    ["@media (max-width: 350px)"]: {
      padding: "5px 15px",
    },
  });

  const HeadBox = styled(Box)({
    display: "flex",
    flexDirection: "row",
    gap: "50px",
    justifyContent: "space-between",
    width: "100%",
    ["@media (max-width: 600px)"]: {
      flexDirection: "column-reverse",
      alignItems: "flex-start",
      gap: "0px",
      "& > div": {
        marginTop: "20px",
      },
      "& > div > h2": {
        marginTop: "0px !important",
        ["@media (max-width: 450px)"]: {
          fontSize: "25px",
        },
        ["@media (max-width: 380px)"]: {
          fontSize: "20px",
        },
      },
    },
  });

  const TitleBox = styled(Box)({
    "& > h2": {
      margin: "35px 0px !important",
      textAlign: "left",
    },
  });

  const PlayButton = styled(Button)({
    color: primaryTextColor,
    fontWeight: "bold",
    background: secondaryBgColor,
    fontSize: "16px",
    padding: "5px 20px 5px 5px",
    wordSpacing: "5px",
    textAlign: "center",
    borderRadius: "10px",
    transition: "all 0.3s ease",
    "&:hover": {
      background: secondaryBgColor,
      scale: "1.05",
    },
    "&:active": {
      scale: "1",
    },
  });

  const LikeBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    justifyContent: "flex-end",
    position: "fixed",
    top: "50%",
    left: "0",
    padding: "25px 7px",
    transform: "translate(0,-50%)",
    borderRadius: "0 10px 10px 0",
    background: textWhite,
    boxShadow: `0 0 3px 0 ${secondaryBgColor}`,
    zIndex: "1",
    ["@media (max-width: 650px)"]: {
      flexDirection: "row",
      borderRadius: "10px 10px 0 0",
      padding: "7px 25px",
      bottom: "0",
      top: "unset",
      left: "50%",
      transform: "translate(-50%,0)",
    },
  });

  const WidgetBox = styled(Box)({
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "50px",
    marginTop: "50px",
    justifyContent: "space-between",
    alignItems: "center",
    ["@media (max-width: 500px)"]: {
      flexDirection: "column",
      gap: "20px",
    },
  });

  return (
    <SectionBox>
      <ColBox>
        {/* For Creator details */}
        <UserBox>
          <Box
            onClick={() => {
              navigate(`/user/${creator.username}`);
            }}
          >
            <ImageBox />
          </Box>

          <UserText
            onClick={() => {
              navigate(`/user/${creator.username}`);
            }}
          >
            <Box>
              <Typography style={{ fontSize: "20px" }}>
                {creator.username}
              </Typography>

              <Typography
                style={{
                  opacity: "0.7",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "...",
                }}
              >
                {creator.small_intro}
              </Typography>
            </Box>
            <Box
              style={{
                fontFamily: "Inter",
                opacity: "0.9",
              }}
            >
              {getDayBefore(post.updatedAt)} | {readTime(post.content)}m read
            </Box>
          </UserText>

          <Box>
            <Go to="/blog/search">
              <Button
                type="submit"
                style={{ padding: "0", height: "100%", borderRadius: "10px" }}
              >
                <SearchIcon
                  style={{
                    width: "100%",
                    padding: "13px 0",
                    color: primaryThemeColor,
                    fontSize: "30px",
                  }}
                />
              </Button>
            </Go>
          </Box>
        </UserBox>

        {/* For heading and play button */}
        <HeadBox>
          <TitleBox>
            <Heading>{post.title}</Heading>
          </TitleBox>

          <Box
            style={{
              display: "grid",
              placeItems: "center",
              minWidth: "110px",
            }}
          >
            {"speechSynthesis" in window ? (
              <PlayButton
                onClick={() => {
                  setCurrentBlog(post);
                  setClosePlayer(false);
                }}
                disabled={!isPlayerClosed}
              >
                <PlayArrowRoundedIcon style={{ fontSize: "40px" }} />
                Play
              </PlayButton>
            ) : (
              ""
            )}
          </Box>
        </HeadBox>

        <Box style={{ marginBottom: "25px" }}>
          <Box>
            <Box
              component="img"
              src={post.image_url}
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0 0 3px 0",
              }}
            ></Box>
          </Box>
          <Typography
            style={{ fontSize: "18px", lineHeight: "30px", wordSpacing: "3px" }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Box>

        {/* for Tags */}
        {post.tags && post.tags.length > 0 && (
          <>
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Typography
                style={{ fontSize: "24px", fontWeight: "bold" }}
                variant="h3"
              >
                Tags :-
              </Typography>
              <Box style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
                {post.tags.map((tag, index) => {
                  return (
                    <Go to={`/blog/search?tag=${tag}`} key={index}>
                      <PrimaryTag text={tag} />
                    </Go>
                  );
                })}
              </Box>
            </Box>
          </>
        )}

        {/* For floatiing widgets */}
        <LikeBox>
          {post.comments && (
            <>
              <Box onClick={updateLikes}>
                <LikeCount isChecked={post.likes.includes(user._id)} />
              </Box>
              <Box onClick={updateDislikes}>
                <DislikeCount isChecked={post.dislikes.includes(user._id)} />
              </Box>
            </>
          )}
        </LikeBox>

        {/* For Bottom widgets */}
        <WidgetBox>
          <Button
            style={{
              padding: "10px 20px",
              height: "100%",
              borderRadius: "10px",
              color: primaryTextColor,
              background: secondaryBgColor,
              fontWeight: "bold",
            }}
            onClick={savePost}
          >
            Save for later
          </Button>
          <Box
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            {post.comments && (
              <>
                <Box>
                  <CommentCount comments={post.comments.length} />
                </Box>
                <Box onClick={updateLikes}>
                  <LikeCount
                    likes={post.likes.length}
                    isChecked={post.likes.includes(user._id)}
                  />
                </Box>
                <Box onClick={updateDislikes}>
                  <DislikeCount
                    dislikes={post.dislikes.length}
                    isChecked={post.dislikes.includes(user._id)}
                  />
                </Box>
              </>
            )}
          </Box>
        </WidgetBox>

        {/* For comments */}
        <Box style={{ width: "100%", marginBottom: "25px" }}>
          <CommentInput post={post._id} refresh={getData} />
        </Box>

        <Box style={{ width: "100%" }}>
          {comments &&
            [...comments].reverse().map((comment, index) => {
              return (
                <CommentBox
                  comment={comment}
                  refresh={getComments}
                  key={index}
                />
              );
            })}
        </Box>
      </ColBox>
    </SectionBox>
  );
};

export default Post;
