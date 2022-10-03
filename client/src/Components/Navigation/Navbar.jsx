import React from "react";
import { useContext } from "react";

//from library
import LogoText from "../Library/standard/LogoText";
import NavBtn from "../Library/widgets/NavBtn";

//context
import { color } from "../../Context/ColorContext";

//mui components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

const Navbar = () => {
  const { mainBgColor, primaryThemeColor, secondaryBgColor } =
    useContext(color);

  const Navbar = styled(AppBar)`
    padding: 0 20px;
    background-color: ${mainBgColor};
    height: 70px;
    display: flex;
    flex-direction: row;
    justtify-content: center;
    box-shadow: none;
    border-bottom: 1px solid ${secondaryBgColor};
  `;

  const CustomToolbar = styled(Toolbar)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  `;

  return (
    <Navbar>
      <CustomToolbar>
        <LogoText />
        <Box>
          <NavBtn text="About" variant="standard" />
          <NavBtn text="Login" variant="standard" />
          <NavBtn text="Signup" variant="contained" />
        </Box>
      </CustomToolbar>
    </Navbar>
  );
};

export default Navbar;
