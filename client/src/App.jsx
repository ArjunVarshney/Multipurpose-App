import React, { useEffect } from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

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
import UserContext from "./Context/UserContext";

//from mui libraries
import Box from "@mui/material/Box";

const App = () => {
  const [closePlayer, setClosePlayer] = useState(true);
  const [currentBlog, setCurrentBlog] = useState({});

  useEffect(() => {
    const handleCredentialResponse = (response) => {
      console.log("Encoded JWT ID token: " + response.credential);
    };
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "601421942488-s1d3qka9gba17h79aru7p8fqmaafjfou.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    google.accounts.id.prompt();
  }, []);

  return (
    <UserContext>
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
    </UserContext>
  );
};

export default App;
