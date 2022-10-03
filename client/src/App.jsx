import React from "react";

//importing components
import Navbar from "./Components/Navigation/Navbar";
import Home from "./Components/Pages/Home";
import Footer from "./Components/Navigation/Footer";

//from mui libraries
import Box from "@mui/material/Box";

const App = () => {
  return (
    <Box>
      <Navbar />
      <Home />
      <Footer />
    </Box>
  );
};

export default App;
