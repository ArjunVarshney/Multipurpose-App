import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";

const Signin = () => {
  useEffect(() => {
    const handleCredentialResponse = (response) => {
      console.log(jwt_decode(response.credential));
    };
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "601421942488-s1d3qka9gba17h79aru7p8fqmaafjfou.apps.googleusercontent.com",
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
