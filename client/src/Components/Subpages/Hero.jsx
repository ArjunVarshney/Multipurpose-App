import React from "react";
import { useContext } from "react";

//context
import { color } from "../../Context/ColorContext";

//mui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

//images
import image from "../../Images/bannerImage.svg";

const Hero = () => {
  const { primaryThemeColor, mainBgColor, primaryTextColor } = useContext(color);

  const SectionBox = styled(Box)({
    background: mainBgColor,
    color: primaryTextColor,
    minHeight: "calc(100vh - 70px)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    fontFamily: "Inter",
  });

  const RowBox = styled(Box)`
    display: flex;
    width: 70%;
    margin: auto;
    padding: 50px 0px;
  `;

  const ImgBox = styled(Box)`
    display: grid;
    place-items: center;
    margin-left: 20px;
  `;

  const Img = styled(Box)({
    width: "30vw",
  });

  const TextBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& > h3": {
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "10px",
      fontFamily: "Inter",
    },
    "& > h2": {
      fontSize: "30px",
      fontWeight: "700",
      marginBottom: "25px",
      fontFamily: "Inter",
    },
    "& > p": {
      fontSize: "14px",
      lineHeight: "16px",
      marginRight: "50px",
      marginBottom: "20px",
      fontFamily: "Inter",
      marginBottom: "50px",
      wordSpacing: "3px",
      letterSpacing: "0.5px",
    },
  });

  const SignupBtn = styled(Button)({
    background: primaryThemeColor,
    color: mainBgColor,
    fontWeight: "bold",
    padding: "7px 20px",
    borderRadius: "10px",
    fontFamily: "sohne",
  });

  const LoginBtn = styled(Button)({
    color: primaryThemeColor,
    fontWeight: "bold",
    padding: "7px 20px",
    borderRadius: "10px",
    fontFamily: "sohne",
    marginLeft: "30px",
    padding: "7px 20px",
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
            <SignupBtn>SIGNUP</SignupBtn>
            <LoginBtn>LOGIN</LoginBtn>
          </Box>
        </TextBox>
        <ImgBox>
          <Img component="img" src={image} alt="Banner Image"></Img>
        </ImgBox>
      </RowBox>
    </SectionBox>
  );
};

export default Hero;
