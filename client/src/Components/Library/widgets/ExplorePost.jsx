import React from "react";
import { useContext } from "react";

//context
import { color } from "../../../Context/ColorContext";

//library components
import User from "./User";
import PrimaryTag from "./PrimaryTag";
import CommentCount from "./CommentCount";
import LikeCount from "./LikeCount";
import DislikeCount from "./DislikeCount";

//mui components
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

const ExplorePost = (props) => {
  const { secondaryBgColor } = useContext(color);

  const PostBox = styled(Box)({
    boxShadow: `0 0 3px 0.5px ${secondaryBgColor}`,
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    width: "100%",
    background: "rgba(0,0,0,0.06)",
    padding: "30px",
    borderRadius: "10px",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
    "&:hover": {
      scale: "1.02",
    },
    ["@media (max-width: 550px)"]: {
      padding: "30px 20px",
    },
  });

  const CountBox = styled(Box)({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "240px",
    width: "100%",
  });

  const WidgetBox = styled(Box)({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ["@media (max-width: 1000px)"]: {
      flexDirection: "column",
      gap: "20px",
    },
  });

  const DetailBox = styled(Box)({
    padding: "5px",
    display: "flex",
    flexDirection: "row",
    gap: "25px",
    ["@media (max-width: 1000px)"]: {
      flexDirection: "column",
      alignItems: "center",
    },
  });

  const ImageBox = styled(Box)({
    boxShadow: `0 0 3px 0.2px`,
    background: "url(https://source.unsplash.com/random) center/cover",
    height: "150px",
    width: "150px",
    minWidth: "150px",
    borderRadius: "10px",
    ["@media (max-width: 1000px)"]: {
      width: "100%",
      height: "300px",
    },
  });

  const TextBox = styled(Box)({
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "10px 0",
    gap: "5px",
    height: "80%",
    maxHeight: "120px",
    "& > div": {
      fontFamily: "Inter",
    },
  });

  const TitleBox = styled(Box)({
    fontSize: "20px",
    fontWeight: "bold",
    width: "100%",
    ["@media (max-width: 1000px)"]: {
      fontSize: "16px",
    },
  });

  const DateBox = styled(Box)({
    fontFamily: "Inter",
    fontSize: "14px",
    opacity: "0.7",
    margin: "10px 0px",
  });

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

  return (
    <PostBox>
      <User user={props.user} />
      <DetailBox>
        <ImageBox />
        <Box style={{ width: "100%" }}>
          <TextBox>
            <TitleBox>{props.title}</TitleBox>
          </TextBox>
          <DateBox>
            {getDayBefore(props.date)} | {props.read}m read
          </DateBox>
        </Box>
      </DetailBox>
      <WidgetBox>
        {props.tags.length > 0 ? <PrimaryTag text={props.tags[0]} /> : <Box />}
        <CountBox>
          <CommentCount comments={props.comments} />
          <LikeCount likes={props.likes} />
          <DislikeCount dislikes={props.dislikes} />
        </CountBox>
      </WidgetBox>
    </PostBox>
  );
};

export default ExplorePost;
