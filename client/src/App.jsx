import React from "react";
import { Route, Routes } from "react-router-dom";

//importing components
import Navbar from "./Components/Navigation/Navbar";
import Footer from "./Components/Navigation/Footer";
import Home from "./Components/Pages/Home";
import Blog from "./Components/Pages/Blog";

//context
import ColorContext from "./Context/ColorContext";

//from mui libraries
import Box from "@mui/material/Box";

const App = () => {
  return (
    <Box>
      <ColorContext>
        <Navbar />
        <Box mt="70px"></Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
        <Footer />
      </ColorContext>
    </Box>
  );
};

export default App;
