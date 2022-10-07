import React from "react";
import { useContext } from "react";

//context
import { color } from "../../../Context/ColorContext";

//mui components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

const PrimaryTag = ({ text }) => {
  const { primaryThemeColor, textWhite } = useContext(color);

  const TagBox = styled(Box)({
    width: "max-content",
    height:"max-content",
    background: primaryThemeColor,
    padding: "5px 15px",
    color: textWhite,
    borderRadius: "50px",
    "& > p": {
      fontSize: "12px",
    },
  });

  return (
    <TagBox>
      <Typography>{text}</Typography>
    </TagBox>
  );
};

export default PrimaryTag;
