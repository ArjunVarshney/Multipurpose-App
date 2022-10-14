import React from "react";
import { useContext } from "react";

//context
import { color } from "../../../Context/ColorContext";

//mui components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";

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
    "& > p": {
      ["@media (max-width: 450px)"]: {
        fontSize: "14px",
      },
    },
  });

  const Icon = styled(CommentIcon)({
    fontSize: "20px",
    ["@media (max-width: 450px)"]: {
      fontSize: "18px",
    },
  });

  return (
    <CountBox>
      <Typography>{comments}</Typography>
      <Icon />
    </CountBox>
  );
};

export default CommentCount;
