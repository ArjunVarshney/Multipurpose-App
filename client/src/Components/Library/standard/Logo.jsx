import React from "react";
import { useNavigate } from "react-router-dom";

//resources
import image from "../../../Images/logo.svg";

//context
import { color } from "../../../Context/ColorContext";

//mui components
import Box from "@mui/material/Box";
import { styled } from "@mui/material";
import { useContext } from "react";

const Logo = () => {
  const navigate = useNavigate();

  const { secondaryBgColor } = useContext(color);

  const Image = styled(Box)`
    height: 25px;
    width: 25px;
    background: ${secondaryBgColor};
    padding: 8px;
    border-radius: 10px;
  `;

  return (
    <Image
      component="img"
      alt="The house from the offer."
      src={image}
      onClick={() => {
        navigate("/");
      }}
    />
  );
};

export default Logo;
