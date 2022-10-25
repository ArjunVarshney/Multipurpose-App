import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import UserContext from "./Context/UserContext";

//pages
import App from "./App";
import Signin from "./Components/Pages/Signin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </UserContext>
  </React.StrictMode>
);
