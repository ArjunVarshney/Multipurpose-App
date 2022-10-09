import React, { useContext } from "react";

//mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material";

//context
import { color } from "../../../Context/ColorContext";

//library component
import Heading from "../../Library/encapsulation/Heading";
import ExplorePost from "../../Library/widgets/ExplorePost";
import OutlineBtn from "../../Library/widgets/OutlineBtn";
import Go from "../../Library/encapsulation/Go";

const Explore = () => {
  const { primaryThemeColor, textWhite } = useContext(color);

  const ExploreBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "70%",
    boxSizing: "border-box",
    "& > div > h2": {
      boxSizing: "border-box",
      textAlign: "left",
      margin: "50px 0",
    },
    "& > button": {
      width: "max-content",
    },
    ["@media (max-width: 830px)"]: {
      width: "100%",
    },
  });

  const HeaderBox = styled(Box)({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    "& > a > button": {
      background: primaryThemeColor,
      color: textWhite,
      transition: "all 0.3s ease",
      "&:hover": {
        background: primaryThemeColor,
        scale: "1.02",
      },
    },
  });

  return (
    <ExploreBox>
      <HeaderBox>
        <Heading>Explore</Heading>
        <Go to="/blog/create">
          <OutlineBtn>Create</OutlineBtn>
        </Go>
      </HeaderBox>
      <Grid container spacing={5} style={{ marginBottom: "100px" }}>
        <Grid item xs={12} lg={12}>
          <ExplorePost />
        </Grid>
        <Grid item xs={12} lg={12}>
          <ExplorePost />
        </Grid>
        <Grid item xs={12} lg={12}>
          <ExplorePost />
        </Grid>
        <Grid item xs={12} lg={12}>
          <ExplorePost />
        </Grid>
      </Grid>
      <OutlineBtn>Load more</OutlineBtn>
    </ExploreBox>
  );
};

export default Explore;
