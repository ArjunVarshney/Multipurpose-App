import React from "react";
import { useContext } from "react";

// context
import { color } from "../../../Context/ColorContext";

// library components
import User from "./User";

// mui components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";

const CommentBox = ({ user, comment, likes, date }) => {
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

  const { textWhite, secondaryBgColor, primaryTextColor } = useContext(color);
  return (
    <Box
      style={{
        background: textWhite,
        boxShadow: `0 0 3px 0 ${secondaryBgColor}`,
        borderRadius: "10px",
        padding: "20px",
        margin: "7px 0",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <User user={user} />
        <Typography style={{ opacity: "0.7" }}>{getDayBefore(date)}</Typography>
      </Box>
      <Box style={{ padding: "10px 5px 5px 5px" }}>
        <Typography
          style={{
            fontFamily: "Inter",
            lineHeight: "24px",
            wordSpacing: "3px",
          }}
        >
          {comment}
        </Typography>
      </Box>
      <Box
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "5px",
          gap: "5px",
        }}
      >
        <Button
          style={{
            display: "flex",
            background: secondaryBgColor,
            color: primaryTextColor,
            width: "max-content",
            borderRadius: "10px",
            padding: "7px",
            gap: "5px",
          }}
        >
          <Typography style={{ fontSize: "12px" }}>{likes}</Typography>
          <ThumbUpRoundedIcon fontSize="sm" />
        </Button>
      </Box>
    </Box>
  );
};

export default CommentBox;
