import React from "react";
import { useContext } from "react";

//context
import { color } from "../../Context/ColorContext";

//categories
import { categories } from "../../Constants/Categories";

//Library components
import ColBox from "../Library/encapsulation/ColBox";
import AppName from "../Library/standard/LogoText";
import Go from "../Library/encapsulation/Go";

//mui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";

const Footer = () => {
  const { mainBgColor, primaryTextColor, secondaryBgColor, primaryThemeColor } =
    useContext(color);

  const FooterBox = styled(Box)({
    background: mainBgColor,
    minHeight: "50vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > div": {
      paddingBottom: "100px",
    },
  });

  const RowBox = styled(Box)({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 30px",
    boxSizing: "border-box",
    flexWrap: "wrap",
    gap: "10px",
    "& > p": {
      fontWeight: "bold",
    },
  });

  const ContactBtn = styled(Button)({
    fontWeight: "bold",
    fontSize: "18px",
    color: primaryTextColor,
  });

  const Divider = styled(Box)({
    border: `2px solid`,
    width: "100%",
    borderRadius: "50px",
    margin: "40px 0",
  });

  const BottomBtn = styled(Button)({
    color: primaryTextColor,
    fontFamily: "sohne",
    fontSize: "14px",
    border: `2px solid ${primaryTextColor}`,
    borderRadius: "10px",
    padding: "5px 10px",
  });

  const CopyrightBox = styled(Box)({
    background: secondaryBgColor,
    padding: "20px 25px",
    marginTop: "50px",
    borderRadius: "10px",
    width: "95%",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    alignItems: "flex-start",
    boxSizing: "border-box",
  });

  const CopyrightText = styled(Typography)({
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: primaryThemeColor,
    fontSize: "14px",
    gap: "10px",
  });

  return (
    <FooterBox>
      <ColBox>
        <RowBox>
          <AppName />
          <Go to="/contact">
            <ContactBtn>Contact Us</ContactBtn>
          </Go>
        </RowBox>
        <Divider />
        <RowBox>
          <Box key={0}>
            <Go to="/">
              <BottomBtn>Home</BottomBtn>
            </Go>
          </Box>
          {categories.map((category, index) => {
            return (
              <Box key={index + 1}>
                <Go to={category.link}>
                  <BottomBtn>{category.title}</BottomBtn>
                </Go>
              </Box>
            );
          })}
        </RowBox>
        <CopyrightBox>
          <CopyrightText>
            <CopyrightIcon /> 2022 YOUR NORM Lucknow India
          </CopyrightText>
          <RowBox style={{ justifyContent: "unset", padding: "0", gap: "5px" }}>
            <Go to="/policy">
              <Typography>Terms & Conditions |</Typography>
            </Go>
            <Go to="/policy">
              <Typography>Privacy policy</Typography>
            </Go>
          </RowBox>
        </CopyrightBox>
      </ColBox>
    </FooterBox>
  );
};

export default Footer;
