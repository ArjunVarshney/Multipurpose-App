import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

//context
import { color } from "../../../Context/ColorContext";

//mui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const { secondaryBgColor, primaryTextColor } = useContext(color);
  const navigate = useNavigate();

  const searchBlogs = (e) => {
    e.preventDefault();
    navigate("/blog/search");
  };

  const Form = styled(Box)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "10px",
    overflow: "hidden",
  });

  const SearchField = styled("input")({
    margin: "0",
    border: "none",
    outline: "none",
    padding: "12px 20px",
    width: "100%",
    background: secondaryBgColor,
    fontSize: "16px",
    fontFamily: "Inter",
  });

  return (
    <Box style={{ width: "100%", margin: "50px 0" }}>
      <Form component="form" onSubmit={searchBlogs}>
        <SearchField
          id="search"
          type="text"
          name="search"
          placeholder="Search"
          autoComplete="off"
          required
        />
        <Button type="submit" style={{ padding: "0", height: "100%" }}>
          <SearchIcon
            style={{
              background: secondaryBgColor,
              width: "100%",
              padding: "13px 0",
              color: primaryTextColor,
              fontSize: "18px",
            }}
          />
        </Button>
      </Form>
    </Box>
  );
};

export default SearchBar;
