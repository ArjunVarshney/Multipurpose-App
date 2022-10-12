import React from "react";
import { useContext } from "react";

//library components
import Rank from "./Rank";
import User from "./User";

//context
import { color } from "../../../Context/ColorContext";

//mui components
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

const PopularPost = ({ title, rank, user }) => {
  const { secondaryBgColor } = useContext(color);

  const PostBox = styled(Box)({
    boxShadow: `0 0 3px 0.5px ${secondaryBgColor}`,
    borderRadius: "10px",
    padding: "30px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "&:hover": {
      scale: "1.02",
    },
  });

  const Title = styled(Box)({
    fontSize: "24px",
    fontFamily: "Inter",
    margin: "0px 15px 15px 0px",
    cursor: "pointer",
  });

  const UserBox = styled(Box)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    fontWeight: "bold",
  });
  return (
    <PostBox>
      <Title>
        <Rank rank={rank} />
        {title}
      </Title>
      <UserBox>
        By
        <User user={user} />
      </UserBox>
    </PostBox>
  );
};

export default PopularPost;
