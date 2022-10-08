import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

//library components
import Logo from "./Logo";

//context
import { color } from "../../../Context/ColorContext";

//mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

const LogoText = () => {
  const navigate = useNavigate();

  const { secondaryBgColor, primaryThemeColor } = useContext(color);

  const RowBox = styled(Box)({
    display: "flex",
    padding: "5px 10px",
    background: secondaryBgColor,
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      scale: "1.02",
    },
  });

  const LogoText = styled(Typography)({
    padding: "0px 15px",
    display: "grid",
    placeItems: "center",
    color: primaryThemeColor,
    fontWeight: "bold",
    fontSize: "15px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    ["@media (max-width:400px)"]: {
      display: "none",
    },
  });

  return (
    <RowBox
      onClick={() => {
        navigate("/");
      }}
    >
      <Logo />
      <LogoText>YourNorm</LogoText>
    </RowBox>
  );
};

export default LogoText;
