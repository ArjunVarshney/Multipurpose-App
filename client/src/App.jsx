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
      }
    };
    if (!user.name && !user.email) {
      /* global google */
      google.accounts.id.initialize({
        client_id:
          "601421942488-s1d3qka9gba17h79aru7p8fqmaafjfou.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      google.accounts.id.prompt();
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
