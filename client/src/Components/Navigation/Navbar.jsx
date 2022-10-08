import React from "react";
import { useContext } from "react";

//from library
import LogoText from "../Library/standard/LogoText";
import NavBtn from "../Library/widgets/NavBtn";
import SignupBtn from "../Library/widgets/SignupBtn";
import LoginBtn from "../Library/widgets/LoginBtn";

//context
import { color } from "../../Context/ColorContext";

//mui components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

const Navbar = () => {
  const { mainBgColor, secondaryBgColor } = useContext(color);

  const Navbar = styled(AppBar)({
    padding: "0 20px",
    backgroundColor: mainBgColor,
    height: "70px",
    display: "flex",
    flexDirection: "row",
    justtifyContent: "center",
    boxShadow: "none",
    borderBottom: `1px solid ${secondaryBgColor}`,
    ["@media (max-width:600px)"]: {
      padding: "0",
    },
  });

  const CustomToolbar = styled(Toolbar)({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  });

  const NotImportant = styled(Box)({
    display: "inline-block",
    marginRight: "20px",
    ["@media (max-width:600px)"]: {
      display: "none",
    },
  });

  return (
    <Navbar>
      <CustomToolbar>
        <LogoText />
        <Box>
          <NotImportant>
            <NavBtn text="About" variant="standard" link="/about"/>
            <LoginBtn />
          </NotImportant>
          <SignupBtn />
        </Box>
      </CustomToolbar>
    </Navbar>
  );
};

export default Navbar;
