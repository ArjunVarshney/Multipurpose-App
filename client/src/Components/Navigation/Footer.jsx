import React from "react";
import { useContext } from "react";

//context
import { color } from "../../Context/ColorContext";

//categories
import { categories } from "../../Constants/Categories";

//Library components
import ColBox from "../Library/encapsulation/ColBox";
import AppName from "../Library/standard/LogoText";

//mui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { display, fontSize, width } from "@mui/system";

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
    fontWeight: "bold",
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
          <ContactBtn>Contact Us</ContactBtn>
        </RowBox>
        <Divider />
        <RowBox>
          <Box key={0}>
            <BottomBtn>Home</BottomBtn>
          </Box>
          {categories.map((category, index) => {
            return (
              <Box key={index + 1}>
                <BottomBtn>{category.title}</BottomBtn>
              </Box>
            );
          })}
        </RowBox>
        <CopyrightBox>
          <CopyrightText>
            <CopyrightIcon /> 2022 YOUR NORM Lucknow India
          </CopyrightText>
          <RowBox style={{ justifyContent: "unset", padding: "0", gap: "5px" }}>
            <Typography>Terms & Conditions |</Typography>
            <Typography>Privacy policy</Typography>
          </RowBox>
        </CopyrightBox>
      </ColBox>
    </FooterBox>
  );
};

export default Footer;
