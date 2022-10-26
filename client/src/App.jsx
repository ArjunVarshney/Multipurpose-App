import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { API } from "./Services/api.js";

//importing components
import Navbar from "./Components/Navigation/Navbar";
import Footer from "./Components/Navigation/Footer";
import Home from "./Components/Pages/Home";
import Blog from "./Components/Pages/Blog";
import Post from "./Components/Pages/Post";
import Search from "./Components/Pages/Search";
import User from "./Components/Pages/User.jsx";
import Player from "./Components/Library/widgets/Player";

//context
import ColorContext from "./Context/ColorContext";
import { account } from "./Context/UserContext";

//from mui libraries
import Box from "@mui/material/Box";

const App = () => {
  const { user, setUser } = useContext(account);
  const [closePlayer, setClosePlayer] = useState(true);
  const [currentBlog, setCurrentBlog] = useState({});

  useEffect(() => {
    const handleCredentialResponse = async (response) => {
      const res = await API.signinUserWithGoogle({
        token: response.credential,
      });
      const data = await res.data;
      if (data.success) {
        setUser(data.data);
        localStorage.setItem("token", response.credential);
      }
    };

    const autoLogin = async (token) => {
      if (!token) return;
      try {
        const res = await API.signinUserWithGoogle({ token });
        const data = await res.data;
        if (data.success) {
          setUser(data.data);
          return true;
        } else {
          localStorage.setItem("token", "");
          return false;
        }
      } catch (error) {
        localStorage.setItem("token", "");
        return false;
      }
    };

    const promptForLogin = () => {
      setTimeout(() => {
        /* global google */
        google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });
        google.accounts.id.prompt();
      }, 5000);
    };

    const checkForPreviousToken = async () => {
      const prevToken = localStorage.getItem("token");

      if (prevToken && prevToken !== "") {
        const res = await autoLogin(prevToken);
        if (res) return;
      }

      promptForLogin();
    };

    if (!user.name && !user.email) {
      checkForPreviousToken();
    }
  }, []);

  return (
    <ColorContext>
      <Navbar />
      <Player
        close={closePlayer}
        setClose={setClosePlayer}
        currentBlog={currentBlog}
      />
      <Box mt="70px"></Box>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/user/:username" element={<User />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/blog/search" element={<Search />} />
        <Route
          exact
          path="/blog/:title"
          element={
            <Post
              setClosePlayer={setClosePlayer}
              isPlayerClosed={closePlayer}
              setCurrentBlog={setCurrentBlog}
            />
          }
        />
      </Routes>
      <Footer />
    </ColorContext>
  );
};

export default App;
