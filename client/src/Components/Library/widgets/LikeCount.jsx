import React from "react";
import { useContext } from "react";

//context
import { color } from "../../../Context/ColorContext";

//mui components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";

const LikeCount = ({ likes, isChecked }) => {
  const { secondaryBgColor, primaryTextColor, primaryThemeColor } =
    useContext(color);

  const CountBox = styled(Box)({
    background: secondaryBgColor,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
    padding: "8px 15px",
    borderRadius: "10px",
    fontSize: "14px",
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

  const Icon = styled(ThumbUpRoundedIcon)({
    fontSize: "20px",
    color: isChecked ? primaryThemeColor : primaryTextColor,
    ["@media (max-width: 450px)"]: {
      fontSize: "18px",
    },
  });

  return (
    <CountBox>
      {likes > -1 ? (
        <Typography style={{ fontFamily: "Inter" }}>{likes}</Typography>
      ) : (
        ""
      )}
      <Icon />
    </CountBox>
  );
};

export default LikeCount;
