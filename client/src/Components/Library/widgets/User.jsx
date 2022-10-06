import React from "react";
import { useContext } from "react";

//context
import { color } from "../../../Context/ColorContext";

//mui components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

const User = ({ name, image }) => {
  const { secondaryBgColor, primaryTextColor, primaryThemeColor } =
    useContext(color);

  const UserBox = styled(Box)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: secondaryBgColor,
    padding: "7px 10px",
    borderRadius: "50px",
    maxHeight: "40px",
    boxShadow: `0 0 1px 0.1px ${primaryThemeColor}`,
    cursor:"pointer"
  });

  const ImageBox = styled(Box)({
    height: "30px",
    "& > img": {
      borderRadius: "50px",
      width: "30px",
      height: "30px",
      marginRight: "10px",
      boxShadow: `0 0 1px 0.1px ${primaryThemeColor}`,
    },
  });

  const NameBox = styled(Box)({
    "& > p": {
      fontWeight: "bold",
      margin: "0 10px",
    },
  });

  return (
    <UserBox>
      <ImageBox>
        <Box component="img" src={image} alt={`${name}'s image`} />
      </ImageBox>
      <NameBox>
        <Typography>{name}</Typography>
      </NameBox>
    </UserBox>
  );
};

export default User;
