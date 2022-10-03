import { useContext } from "react";
import React from "react";

//context
import { color } from "../../../Context/ColorContext";

//mui components
import Button from "@mui/material/Button";
import { styled } from "@mui/material";

const NavBtn = ({ text, variant }) => {
  const { primaryThemeColor } = useContext(color);

  const CustomButton = styled(Button)`
    font-family: sohne;
    color: ${variant == "contained" ? "#fff" : primaryThemeColor};
    background-color: ${variant == "contained" ? primaryThemeColor : "inherit"};
    font-size: 13px;
    border-radius: 10px;
    box-shadow: none;
    font-weight: bold;
    margin-left: 10px;
  `;

  return <CustomButton color="secondary" variant={variant}>{text}</CustomButton>;
};

export default NavBtn;
