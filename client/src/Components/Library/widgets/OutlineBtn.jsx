import React from "react";
import { useContext } from "react";

//context
import { color } from "../../../Context/ColorContext";

//Mui Component
import Button from "@mui/material/Button";
import { styled } from "@mui/material";

const OutlineBtn = ({ children, variant }) => {
  const { primaryThemeColor } = useContext(color);

  const Btn = styled(Button)({
    border: `2px solid ${primaryThemeColor}`,
    borderRadius: "10px",
    color: primaryThemeColor,
    fontWeight: "600",
    fontFamily: "Inter",
    padding:"10px 25px",
  });

  return <Btn variant={variant}>{children}</Btn>;
};

export default OutlineBtn;
