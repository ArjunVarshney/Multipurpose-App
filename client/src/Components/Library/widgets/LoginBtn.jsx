import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

//context
import { color } from "../../../Context/ColorContext";

//mui components
import { Button } from "@mui/material";
import { styled } from "@mui/material";

const LoginBtn = () => {
  const navigate = useNavigate();

  const { primaryThemeColor } = useContext(color);

  const LogBtn = styled(Button)({
    color: primaryThemeColor,
    fontWeight: "bold",
    borderRadius: "10px",
    fontFamily: "sohne",
    padding: "7px 20px",
    transition: "all 0.3s ease",
    "&:hover": {
      scale: "1.05",
    },
  });

  return (
    <LogBtn
      onClick={() => {
        navigate("/login");
      }}
    >
      Login
    </LogBtn>
  );
};

export default LoginBtn;
