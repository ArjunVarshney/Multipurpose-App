import React from "react";
import { useContext } from "react";

//context
import { color } from "../../../Context/ColorContext";

//mui components
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import Go from "../encapsulation/Go";

const NavBtn = ({ text, variant, link }) => {
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
    textDecoration: "none",
    "&:hover": {
      scale: "1.05",
    },
  });

  return (
    <Go to={link}>
      <CustomButton variant={variant}>{text}</CustomButton>
    </Go>
  );
};

export default NavBtn;
