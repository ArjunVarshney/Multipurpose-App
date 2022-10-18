import React from "react";
import { Route, Routes } from "react-router-dom";

//importing components
import Navbar from "./Components/Navigation/Navbar";
import Footer from "./Components/Navigation/Footer";
import Home from "./Components/Pages/Home";
import Blog from "./Components/Pages/Blog";
import Post from "./Components/Pages/Post";
import Search from "./Components/Pages/Search";

//context
import ColorContext from "./Context/ColorContext";
import UserContext from "./Context/UserContext";

//from mui libraries
import Box from "@mui/material/Box";

const App = () => {
  return (
    <UserContext>
      <ColorContext>
        <Navbar />
        <Box mt="70px"></Box>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/blog" element={<Blog />} />
          <Route exact path="/blog/search" element={<Search />} />
          <Route exact path="/blog/:title" element={<Post />} />
        </Routes>
        <Footer />
      </ColorContext>
    </UserContext>
  );
};

export default App;
