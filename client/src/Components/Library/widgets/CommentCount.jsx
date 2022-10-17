import React from "react";
import { useContext } from "react";

//context
import { color } from "../../../Context/ColorContext";

//mui components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";

const CommentCount = ({ comments }) => {
  const { secondaryBgColor } = useContext(color);
  const CountBox = styled(Box)({
    background: secondaryBgColor,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
    padding: "8px 15px",
    borderRadius: "10px",
    width: "max-content",
    cursor: "pointer",
    "& > p": {
      ["@media (max-width: 450px)"]: {
        fontSize: "14px",
      },
    },
    transition: "all 0.3s ease",
    "&:hover": {
      scale: "1.05",
    },
    "&:active": {
      scale: "1",
    },
  });

  const Icon = styled(ModeCommentRoundedIcon)({
    fontSize: "20px",
    ["@media (max-width: 450px)"]: {
      fontSize: "18px",
    },
  });

  return (
    <CountBox>
      {comments > -1 ? (
        <Typography style={{ fontFamily: "Inter" }}>{comments}</Typography>
      ) : (
        ""
      )}
      <Icon />
    </CountBox>
  );
};

export default CommentCount;
