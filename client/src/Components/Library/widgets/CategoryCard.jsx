import React from "react";
import { useContext } from "react";

//context
import { color } from "../../../Context/ColorContext";

//mui components
import Box from "@mui/material/Box";
import { styled } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CategoryCard = ({ image, alt, title, description }) => {
  const { primaryThemeColor, textWhite, linkColor, secondaryBgColor } =
    useContext(color);

  const CardBox = styled(Box)({
    minWidth: "200px",
    maxWidth: "250px",
    minHeight: "300px",
    height: "100%",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: primaryThemeColor,
    boxShadow: `0 0 5px 1px ${secondaryBgColor}`,
    transition: "all 0.3s ease",
    "&:hover": {
      scale: "1.05",
    },
  });

  const ImageBox = styled(Box)({
    boxSizing: "border-box",
    width: "100%",
    overflow: "hidden",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    padding: "1px",
    paddingBottom: "0",
    "& > img": {
      width: "100%",
      borderRadius: "10px 10px 0 0",
    },
  });

  const TextBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    padding: "10px 20px",
    color: textWhite,
    fontFamily: "Inter",
    height: "57%",
    ["@media (max-width: 1050px)"]: {
      padding: "10px 15px",
    },
  });

  const TitleBox = styled(Box)({
    margin: "0",
    marginBottom: "20px",
    fontFamily: "Inter",
    fontSize: "20px",
    ["@media (max-width: 1050px)"]: {
      marginBottom: "10px",
    },
  });

  const DesBox = styled(Box)({
    margin: "0",
    fontFamily: "Inter",
    fontSize: "12px",
    marginBottom: "20px",
    fontWeight: "400",
    lineHeight: "16px",
    height: "100%",
    ["@media (max-width: 1050px)"]: {
      marginBottom: "10px",
    },
  });

  const LearnMore = styled(Box)({
    fontFamily: "Inter",
    display: "flex",
    flexDirection: "row",
    fontSize: "14px",
    alignItems: "center",
    color: linkColor,
    cursor: "pointer",
    marginBottom: "10px",
  });

  return (
    <CardBox>
      <ImageBox>
        <Box component="img" src={image} alt={alt} />
      </ImageBox>
      <TextBox>
        <TitleBox component="h3">{title}</TitleBox>
        <DesBox>{description}</DesBox>
        <LearnMore>
          Learn more <ArrowForwardIcon />
        </LearnMore>
      </TextBox>
    </CardBox>
  );
};

export default CategoryCard;
