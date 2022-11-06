import React, { useState } from "react";

// mui components
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { styled } from "@mui/material";
import { useEffect } from "react";

const Alert = ({ alert }) => {
  const [closeAlert, setCloseAlert] = useState(true);

  const options = {
    error: {
      color: "#d60008",
      bgColor: "#ffccce",
    },
    warning: {
      color: "#d1b800",
      bgColor: "#fcffc2",
    },
    success: {
      color: "#0ebf00",
      bgColor: "#d5fad2",
    },
  };

  let timer;

  useEffect(() => {
    setCloseAlert(false);
    window.clearTimeout(timer);
    timer = setTimeout(() => {
      setCloseAlert(true);
    }, 3000);
  }, [alert]);

  const AlertBox = styled("div")({
    position: "fixed",
    top: "10px",
    right: "10px",
    background: options[alert.type].bgColor,
    padding: "15px 20px 20px 20px",
    borderRadius: "10px",
    boxSizing: "border-box",
    minWidth: "250px",
    boxShadow: `0 0 3px 0 ${options[alert.type].color}`,
    fontFamily: "Inter",
    transition: "all 0.5s ease",
    opacity: closeAlert ? "0" : "1",
    zIndex: closeAlert ? "0" : "1200",
  });

  const CloseBox = styled("div")({
    width: "100%",
    height: "100%",
    display: "grid",
    placeItems: "center",
    opacity: "0.5",
    borderRadius: "10px",
    background: "black",
    position: "absolute",
    top: "0",
    right: "0",
    color: options[alert.type].color,
    opacity: "0",
    transition: "all 0.5s ease",
    "&:hover": {
      opacity: "0.7",
    },
  });

  return (
    <AlertBox>
      <CloseBox
        onClick={() => {
          setCloseAlert(!closeAlert);
        }}
      >
        <CloseRoundedIcon fontSize="large" />
      </CloseBox>
      <p
        style={{
          margin: "0",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontWeight: "bold",
          color: options[alert.type].color,
          textTransform: "capitalize",
        }}
      >
        {alert.type == "error" && <ErrorRoundedIcon />}
        {alert.type == "warning" && <WarningRoundedIcon />}
        {alert.type == "success" && <TaskAltRoundedIcon />}
        {alert.type}
      </p>
      <p
        style={{
          marginBottom: "0",
          marginTop: "5px",
          maxWidth: "220px",
          fontSize: "14px",
        }}
      >
        {alert.msg}
      </p>
    </AlertBox>
  );
};

export default Alert;
