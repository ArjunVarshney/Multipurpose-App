import React from "react";
import { useContext } from "react";

// context
import { color } from "../../../Context/ColorContext";

//library components
import User from "./User";
import Heading from "../encapsulation/Heading";
import PrimaryTag from "./PrimaryTag";
import CommentCount from "./CommentCount";
import LikeCount from "./LikeCount";
import DislikeCount from "./DislikeCount";

//mui components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

const PostCard = (props) => {
  const { secondaryBgColor, textWhite } = useContext(color);

  const PostBox = styled(Box)({
    boxShadow: `0 0 3px 0 ${secondaryBgColor}`,
    background: textWhite,
    width: "100%",
    margin: "auto",
    borderRadius: "10px",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
    "&:hover": {
      scale: "1.01",
    },
  });

  const ImageBox = styled(Box)({
    height: "350px",
    overflow: "hidden",
    padding: "1px",
    ["@media (max-width:1050px)"]: {
      height: "300px",
    },
    ["@media (max-width:400px)"]: {
      height: "250px",
    },
    ["@media (max-width:350px)"]: {
      height: "200px",
    },
    "& > div": {
      borderRadius: "10px 10px 0 0",
      background: `url(${props.image}) center/cover`,
      width: "100%",
      height: "100%",
    },
  });
  const DetailBox = styled(Box)({
    padding: "20px",
    boxSizing: "border-box",
  });

  const TextBox = styled(Box)({
    "& > h2": {
      margin: "15px 0",
      textAlign: "left",
      fontSize: "20px",
    },
  });

  const DateBox = styled(Box)({
    fontFamily: "Inter",
    opacity: "0.7",
    marginTop: "20px",
    marginBottom: "15px",
  });

  const WidgetBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    ["@media (max-width:520px)"]: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "15px",
    },
    "& > div": {
      "& > p": {
        fontSize: "15px",
      },
    },
  });

  const CountBox = styled(Box)({
    width: "220px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "7px",
    ["@media (max-width:520px)"]: {
      width: "100%",
    },
    ["@media (max-width:470px)"]: {
      width: "unset",
    },
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
      <ImageBox>
        <Box />
      </ImageBox>
      <DetailBox>
        <User user={props.user} />
        <TextBox>
          <Heading>{props.title}</Heading>
          <Typography>{props.subject}</Typography>
          <DateBox>
            {getDayBefore(props.date)} | {props.read}m read
          </DateBox>
        </TextBox>
        <WidgetBox>
          {props.tags.length > 0 ? (
            <PrimaryTag text={props.tags[0]} />
          ) : (
            <Box />
          )}
          <CountBox>
            <CommentCount comments={props.comments} />
            <LikeCount likes={props.likes} />
            <DislikeCount dislikes={props.dislikes} />
          </CountBox>
        </WidgetBox>
      </DetailBox>
    </PostBox>
  );
};

export default PostCard;
