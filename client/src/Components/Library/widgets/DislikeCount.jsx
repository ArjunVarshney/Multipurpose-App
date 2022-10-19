import React from "react";
import { useContext } from "react";

//context
import { color } from "../../../Context/ColorContext";

//mui components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";

const DislikeCount = ({ dislikes, isChecked }) => {
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

  const Icon = styled(ThumbDownRoundedIcon)({
    fontSize: "20px",
    color: isChecked ? primaryThemeColor : primaryTextColor,
    ["@media (max-width: 450px)"]: {
      fontSize: "18px",
    },
  });

  return (
    <CountBox>
      {dislikes > -1 ? (
        <Typography style={{ fontFamily: "Inter" }}>{dislikes}</Typography>
      ) : (
        ""
      )}
      <Icon />
    </CountBox>
  );
};

export default DislikeCount;
