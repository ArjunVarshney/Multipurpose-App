import React from "react";

//library components
import Heading from "../Library/encapsulation/Heading";
import CategoryCard from "../Library/widgets/CategoryCard";
import SectionBox from "../Library/encapsulation/SectionBox";
import AppName from "../Library/standard/AppName";
import ColBox from "../Library/encapsulation/ColBox";
import Go from "../Library/encapsulation/Go";

//import Category Data
import { categories } from "../../Constants/Categories";

//mui components
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material";

const Discover = () => {
  const Item = styled(Grid)({
    display: "grid",
    placeItems: "center",
    "& > a": {
      height: "100%",
    },
  });

  return (
    <SectionBox>
      <ColBox>
        <Heading>
          Discover on <AppName />
        </Heading>
        <Grid container spacing={8}>
          {categories.map((category, index) => {
            return (
              <Item item lg={4} md={4} sm={6} xs={12} key={index}>
                <Go to={category.link}>
                  <CategoryCard
                    image={category.image}
                    alt={category.imgAlt}
                    title={category.title}
                    description={category.description}
                  />
                </Go>
              </Item>
            );
          })}
        </Grid>
      </ColBox>
    </SectionBox>
  );
};

export default Discover;
