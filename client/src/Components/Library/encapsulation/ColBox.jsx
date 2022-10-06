import React from "react";

//mui components
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

const ColBox = ({ children }) => {
  const ColBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    margin: "auto",
    paddingTop: "50px",
    paddingBottom: "150px",
  });

  return <ColBox>{children}</ColBox>;
};

export default ColBox;
