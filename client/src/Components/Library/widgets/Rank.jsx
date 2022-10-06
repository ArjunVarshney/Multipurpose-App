import React from "react";
import { useContext } from "react";

//context
import { color } from "../../../Context/ColorContext";

//mui components
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

const Rank = ({ rank }) => {
  const { primaryThemeColor } = useContext(color);

  const RankBox = styled(Box)({
    color: primaryThemeColor,
  });

  return <RankBox component="span">#{rank} </RankBox>;
};

export default Rank;
