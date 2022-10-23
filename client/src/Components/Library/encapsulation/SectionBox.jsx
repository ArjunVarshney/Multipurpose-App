import React from "react";
import { useContext } from "react";

//context
import { color } from "../../../Context/ColorContext";

//mui components
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

const SectionBox = ({ children }) => {
  const { mainBgColor, primaryTextColor, secondaryBgColor } = useContext(color);

  const SecBox = styled(Box)({
    background: mainBgColor,
    color: primaryTextColor,
    minHeight: "calc(100vh - 70px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `1px solid ${secondaryBgColor}`,
  });

  return <SecBox>{children}</SecBox>;
};

export default SectionBox;
