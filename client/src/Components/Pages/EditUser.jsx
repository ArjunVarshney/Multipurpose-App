import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../../Services/api";

// context
import { color } from "../../Context/ColorContext";
import { account } from "../../Context/UserContext";

//mui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/material";

// LIbrary components
import SectionBox from "../Library/encapsulation/SectionBox";
import ColBox from "../Library/encapsulation/ColBox";
import Go from "../Library/encapsulation/Go";
import User from "../Library/widgets/User";

const EditUser = () => {
  const [userInfo, setUserInfo] = useState({});

  const getUser = async () => {
    try {
      const id = window.location.pathname.split("/")[3];
      if (!id) return;
      const url = `user/get/${id}`;
      const response = await API.getUser("", url);
      const data = await response.data;
      if (data.success) {
        setUserInfo(data.data);
        console.log(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return <div>EditUser</div>;
};

export default EditUser;
