import React from "react";
import { Link } from "react-router-dom";

//mui components
import { styled } from "@mui/material";

const Go = ({ to, children }) => {
  const CustomLink = styled(Link)({
    textDecoration: "none",
    color: "inherit",
  });
  return <CustomLink to={to}>{children}</CustomLink>;
};

export default Go;
