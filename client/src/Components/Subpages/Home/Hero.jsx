import React, { useContext } from "react";

//mui components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

// context
import { account } from "../../../Context/UserContext";

//images
import image from "../../../Images/PageBanner/HomePageBanner.svg";

//library component
import SignInBtn from "../../Library/widgets/SignInBtn";
import SectionBox from "../../Library/encapsulation/SectionBox";

const Hero = () => {
  const { user } = useContext(account);

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
      fontFamily: "Inter",
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
          <Box>{!user._id && <SignInBtn />}</Box>
        </TextBox>
        <ImgBox>
          <Box component="img" src={image} alt="Banner Image"></Box>
        </ImgBox>
      </RowBox>
    </SectionBox>
  );
};

export default Hero;
