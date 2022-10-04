import { useContext } from "react";
import React from "react";

//context
import { color } from "../../../Context/ColorContext";

//mui components
import Button from "@mui/material/Button";
import { styled } from "@mui/material";

const NavBtn = ({ text, variant }) => {
  const { primaryThemeColor } = useContext(color);

  const CustomButton = styled(Button)({
    fontFamily: "sohne",
    color: variant == "contained" ? "#fff" : primaryThemeColor,
    backgroundColor: variant == "contained" ? primaryThemeColor : "inherit",
    fontSize: "13px",
    borderRadius: "10px",
    boxShadow: "none",
    fontWeight: "bold",
    marginLeft: "10px",
    "&:hover": {
      backgroundColor: variant == "contained" ? primaryThemeColor : "inherit",
    },
  });

  return <CustomButton variant={variant}>{text}</CustomButton>;
};

export default NavBtn;
