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
    color: primaryThemeColor,
    fontSize: "14px",
    borderRadius: "10px",
    boxShadow: "none",
    fontWeight: "bold",
    marginLeft: "10px",
    transition: "all 0.3s ease",
    "&:hover": {
      scale: "1.05",
    },
  });

  return <CustomButton variant={variant}>{text}</CustomButton>;
};

export default NavBtn;
