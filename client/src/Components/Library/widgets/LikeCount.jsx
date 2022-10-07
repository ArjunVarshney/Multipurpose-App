import React from "react";
import { useContext } from "react";

//context
import { color } from "../../../Context/ColorContext";

//mui components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const LikeCount = ({ likes }) => {
  const { secondaryBgColor } = useContext(color);
  const CountBox = styled(Box)({
    background: secondaryBgColor,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
    padding: "8px 15px",
    borderRadius: "10px",
    fontSize: "14px",
    "& > p": {
      ["@media (max-width: 450px)"]: {
        fontSize: "14px",
      },
    },
  });

  const Icon = styled(ThumbUpIcon)({
    fontSize: "20px",
    ["@media (max-width: 450px)"]: {
      fontSize: "18px",
    },
  });

  return (
    <CountBox>
      <Typography>{likes}</Typography>
      <Icon />
    </CountBox>
  );
};

export default LikeCount;
