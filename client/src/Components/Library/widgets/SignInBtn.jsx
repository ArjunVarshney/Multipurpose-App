import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

//context
import { color } from "../../../Context/ColorContext";

//mui components
import { Button } from "@mui/material";
import { styled } from "@mui/material";

const SignInBtn = () => {
  const navigate = useNavigate();

  const { primaryThemeColor, textWhite } = useContext(color);

  const SignBtn = styled(Button)({
    background: primaryThemeColor,
    color: textWhite,
    fontWeight: "bold",
    padding: "7px 20px",
    borderRadius: "10px",
    textTransform: "uppercase",
    fontFamily: "sohne",
    transition: "all 0.3s ease",
    "&:hover": {
      background: primaryThemeColor,
      scale: "1.05",
    },
  });

  return (
    <SignBtn
      onClick={() => {
        navigate("/signin");
      }}
    >
      Sign in
    </SignBtn>
  );
};

export default SignInBtn;
