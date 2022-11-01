import React, { useEffect } from "react";
import { API } from "../../Services/api.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { account } from "../../Context/UserContext";

const Signin = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(account);

  useEffect(() => {
    const handleCredentialResponse = async (response) => {
      const res = await API.signinUserWithGoogle({
        token: response.credential,
      });
      const data = await res.data;
      if (data.success) {
        setUser(data.data);
        localStorage.setItem("token", response.credential);
        sessionStorage.setItem("user", JSON.stringify(data.data));
        navigate(-1);
      }
    };

    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signin-btn"), {
      type: "standard",
      theme: "filled_blue",
      size: "large",
    });
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "20px",
          border: "1px solid #D9C5FF",
          borderRadius: "10px",
        }}
      >
        <div id="signin-btn" />
      </div>
    </div>
  );
};

export default Signin;
