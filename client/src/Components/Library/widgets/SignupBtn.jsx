import React from "react";
import { useContext } from "react";

//context
import { color } from "../../../Context/ColorContext";

//mui components
import { Button } from "@mui/material";
import { styled } from "@mui/material";

const SignupBtn = () => {
  const { primaryThemeColor, mainBgColor } = useContext(color);

  const SignBtn = styled(Button)({
    background: primaryThemeColor,
    color: mainBgColor,
    fontWeight: "bold",
    padding: "7px 20px",
    borderRadius: "10px",
    textTransform: "uppercase",
    fontFamily: "sohne",
    "&:hover": {
      background: primaryThemeColor,
    },
  });

  return <SignBtn>Signup</SignBtn>;
};

export default SignupBtn;
