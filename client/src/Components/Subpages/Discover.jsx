import React from "react";

//library components
import Heading from "../Library/widgets/Heading";
import CategoryCard from "../Library/widgets/CategoryCard";
import SectionBox from "../Library/encapsulation/SectionBox";

//import Category Data
import { categories } from "../../Constants/Categories";

//mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material";

const Discover = () => {
  const ColBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    margin: "auto",
    paddingTop: "50px",
    paddingBottom: "150px",
  });

  const Item = styled(Grid)({
    display: "grid",
    placeItems: "center",
  });

  return (
    <SectionBox>
      <ColBox>
        <Heading text="Discover on the Topics" />
        <Grid container spacing={8}>
          {categories.map((category, index) => {
            return (
              <Item item lg={4} md={4} sm={6} xs={12} key={index}>
                <CategoryCard
                  image={category.image}
                  alt={category.imgAlt}
                  title={category.title}
                  description={category.description}
                />
              </Item>
            );
          })}
        </Grid>
      </ColBox>
    </SectionBox>
  );
};

export default Discover;
