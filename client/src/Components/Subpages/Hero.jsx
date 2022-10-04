import React from "react";
import { useContext } from "react";

//context
import { color } from "../../Context/ColorContext";

//mui components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

//images
import image from "../../Images/bannerImage.svg";

//library component
import SignupBtn from "../Library/widgets/SignupBtn";
import LoginBtn from "../Library/widgets/LoginBtn";

const Hero = () => {
  const { mainBgColor, primaryTextColor, secondaryBgColor } = useContext(color);

  const SectionBox = styled(Box)({
    background: mainBgColor,
    color: primaryTextColor,
    minHeight: "calc(100vh - 70px)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderBottom: `1px solid ${secondaryBgColor}`,
  });

  const RowBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    width: "70%",
    margin: "auto",
    padding: "50px 0px",
    ["@media (max-width: 840px)"]: {
      width: "80%",
    },
  });

  const ImgBox = styled(Box)({
    display: "grid",
    placeItems: "center",
    marginLeft: "20px",
    "& > img": {
      width: "30vw",
      minWidth: "250px",
    },
    ["@media (max-width: 720px)"]: {
      display: "none",
    },
  });

  const TextBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& > *": {
      fontFamily: "Inter",
      wordSpacing: "3px",
      letterSpacing: "0.5px",
    },
    "& > h3": {
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "10px",
      lineHeight: "20px",
      ["@media (max-width: 900px)"]: {
        fontSize: "14px",
      },
    },
    "& > h2": {
      fontSize: "30px",
      fontWeight: "700",
      marginBottom: "25px",
      ["@media (max-width: 900px)"]: {
        fontSize: "25px",
      },
    },
    "& > p": {
      fontSize: "14px",
      marginRight: "50px",
      marginBottom: "50px",
      textAlign: "justify",
      lineHeight: "20px",
      ["@media (max-width: 720px)"]: {
        fontSize: "13px",
        marginRight: "20px",
        marginRight: "0",
      },
    },
    "& > div": {
      display: "flex",
      gap: "20px",
      ["@media (max-width: 280px)"]: {
        flexDirection: "column",
      },
    },
  });

  return (
    <SectionBox>
      <RowBox>
        <TextBox>
          <Typography variant="h3">Hi There!</Typography>
          <Typography variant="h2">I'm Arjun Varshney,</Typography>
          <Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae,
            nesciunt sed repellendus quia repudiandae ex non iusto maxime
            officia fugiat similique tempore labore omnis. Nam aut commodi alias
            rerum quo laudantium modi architecto accusamus asperiores
            praesentium minus, ducimus quis consectetur sequi id tempore fugit
            dolore beatae. Quisquam mollitia beatae nihil?
          </Typography>
          <Box>
            <SignupBtn />
            <LoginBtn />
          </Box>
        </TextBox>
        <ImgBox>
          <Box component="img" src={image} alt="Banner Image"></Box>
        </ImgBox>
      </RowBox>
    </SectionBox>
  );
};

export default Hero;
