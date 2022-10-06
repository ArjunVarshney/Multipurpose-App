import React from "react";
import { useContext } from "react";

//context
import { color } from "../../../Context/ColorContext";

//mui Components
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

const AppName = () => {
  const { primaryThemeColor } = useContext(color);

  const AppText = styled(Box)({
    color: primaryThemeColor,
    textTransform: "uppercase",
  });

  return <AppText component="span">YOUR NORM</AppText>;
};

export default AppName;
