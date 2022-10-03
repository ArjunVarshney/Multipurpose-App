import React from "react";
import { useContext } from "react";

//library components
import Logo from "./Logo";

//context
import { color } from "../../../Context/ColorContext";

//mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

const LogoText = () => {
  const { secondaryBgColor, primaryThemeColor } = useContext(color);

  const RowBox = styled(Box)`
    display: flex;
    padding:5px 10px;
    background: ${secondaryBgColor};
    border-radius: 10px;
    cursor:pointer
  `;

  const LogoText = styled(Typography)`
    padding: 0px 15px;
    display: grid;
    place-items: center;
    color: ${primaryThemeColor};
    font-weight: bold;
    font-size: 15px;
    letter-spacing: 2px;
    text-transform: uppercase;
  `;

  return (
    <RowBox>
      <Logo />
      <LogoText>Title</LogoText>
    </RowBox>
  );
};

export default LogoText;
