import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { API } from "../../../Services/api.js";

// context
import { color } from "../../../Context/ColorContext";
import { account } from "../../../Context/UserContext";

// library components
import User from "./User";

// mui components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";

const CommentBox = ({ comment_id }) => {
  const { textWhite, secondaryBgColor, primaryTextColor, primaryThemeColor } =
    useContext(color);
  const [comment, setComment] = useState({});
  const { user } = useContext(account);

  const getData = async () => {
    try {
      const response = await API.getComment(
        "",
        `blog/comment/get/${comment_id}`
      );
      if (response.data.success) {
        setComment(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateCommentLikes = async () => {
    const response = await API.likeComment(
      { user_id: user._id },
      `blog/comment/like/${comment_id}`
    );
    if (response.data.success) {
      getData();
    }
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
        {comment.created_by && <User user={comment.created_by} />}
        <Typography style={{ opacity: "0.7" }}>
          {comment.updatedAt && getDayBefore(comment.updatedAt)}
        </Typography>
      </Box>
      <Box style={{ padding: "0 5px" }}>
        {comment.comment && (
          <Typography
            style={{
              fontFamily: "Inter",
              lineHeight: "24px",
              wordSpacing: "3px",
            }}
            dangerouslySetInnerHTML={{ __html: comment.comment }}
          ></Typography>
        )}
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
          onClick={updateCommentLikes}
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
          <Typography style={{ fontSize: "12px" }}>
            {comment.likes && comment.likes.length}
          </Typography>
          {comment.likes && (
            <ThumbUpRoundedIcon
              fontSize="sm"
              style={{
                color: comment.likes.includes(user._id)
                  ? primaryThemeColor
                  : primaryTextColor,
              }}
            />
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default CommentBox;
