import React from "react";
import { Route, Routes } from "react-router-dom";

//importing components
import Navbar from "./Components/Navigation/Navbar";
import Footer from "./Components/Navigation/Footer";
import Home from "./Components/Pages/Home";
import Blog from "./Components/Pages/Blog";
import Post from "./Components/Pages/Post";

//context
import ColorContext from "./Context/ColorContext";

//from mui libraries
import Box from "@mui/material/Box";
import Create from "./Components/Pages/Create";

const App = () => {
  return (
    <ColorContext>
      <Navbar />
      <Box mt="70px"></Box>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/blog/create" element={<Create />} />
        <Route exact path="/blog/:title" element={<Post />} />
      </Routes>
      <Footer />
    </ColorContext>
  );
};

export default App;
