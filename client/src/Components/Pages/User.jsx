import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../Services/api";

// context
import { color } from "../../Context/ColorContext";
import { account } from "../../Context/UserContext";

//mui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

// LIbrary components
import SectionBox from "../Library/encapsulation/SectionBox";
import ColBox from "../Library/encapsulation/ColBox";
import Go from "../Library/encapsulation/Go";

const User = () => {
  return (
    <SectionBox>
      <ColBox>
        {/* For edit icon */}
        <Box></Box>
        {/* For image */}
        <Box></Box>
        {/* For user details */}
        <Box>
          {/* For username */}
          <Typography></Typography>
          {/* For real name and description */}
          <Typography></Typography>
          {/* For joined at */}
          <Typography></Typography>
        </Box>

        {/* For about section */}
        <Box>
          {/* For heading */}
          <Typography></Typography>
          {/* For about inner */}
          <Typography></Typography>
        </Box>

        {/* For the liked section */}
        <Box>
          {/* For heading */}
          <Typography></Typography>
          {/* For Posts */}
          <Box></Box>
        </Box>

        {/* For Saved Posts */}
        <Box>
          {/* For heading */}
          <Typography></Typography>
          {/* For Posts */}
          <Box></Box>
        </Box>

        {/* For Commented Posts */}
        <Box>
          {/* For heading */}
          <Typography></Typography>
          {/* For list of posts */}
          <Box></Box>
        </Box>
      </ColBox>
    </SectionBox>
  );
};

export default User;
