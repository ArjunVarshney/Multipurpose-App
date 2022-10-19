import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
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

const Post = () => {
  const { primaryThemeColor, primaryTextColor, secondaryBgColor, textWhite } =
    useContext(color);
  const { user } = useContext(account);
  const [creator, setCreator] = useState({});
  const [post, setPost] = useState({});

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
    } catch (error) {}
  };

  useEffect(() => {
    getCreator();
  }, [post]);

  useEffect(() => {
    getData();
  }, []);

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
  });

  const UserBox = styled(Box)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "max-content",
  });

  const UserText = styled(Box)({
    width: "100%",
    height: "100%",
    padding: "10px 30px",
    display: "flex",
    gap: "8px",
    flexDirection: "column",
    justifyContent: "space-between",
  });

  const HeadBox = styled(Box)({
    display: "flex",
    flexDirection: "row",
    gap: "50px",
    justifyContent: "space-between",
    width: "100%",
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
    padding: "10px 20px 10px 7px",
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

  return (
    <SectionBox>
      <ColBox>
        {/* For Creator details */}
        <UserBox>
          <Box>
            <ImageBox />
          </Box>

          <UserText>
            <Box>
              <Typography style={{ fontSize: "20px" }}>
                {creator.username}
              </Typography>

              <Typography style={{ opacity: "0.7" }}>
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
            <PlayButton>
              <PlayArrowRoundedIcon style={{ fontSize: "40px" }} />
              Play
            </PlayButton>
          </Box>
        </HeadBox>

        <Box style={{ marginBottom: "25px" }}>
          <Box style={{ marginBottom: "15px" }}>
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
          >
            {post.content}
          </Typography>
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
              <Box>
                <CommentCount />
              </Box>
            </>
          )}
        </LikeBox>

        {/* For Bottom widgets */}
        <Box
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            marginBottom: "50px",
            marginTop: "100px",
            justifyContent: "space-between",
          }}
        >
          <Button
            style={{
              padding: "10px 20px",
              height: "100%",
              borderRadius: "10px",
              color: primaryTextColor,
              background: secondaryBgColor,
              fontWeight: "bold",
            }}
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
        </Box>

        {/* For comments */}
        <Box style={{ width: "100%", marginBottom: "25px" }}>
          <CommentInput post={post._id} refresh={getData} />
        </Box>

        <Box style={{ width: "100%" }}>
          {post.comments &&
            [...post.comments].reverse().map((comment, index) => {
              return <CommentBox comment_id={comment} key={index} />;
            })}
        </Box>
      </ColBox>
    </SectionBox>
  );
};

export default Post;
