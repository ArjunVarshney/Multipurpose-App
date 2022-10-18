import React, { createContext } from "react";
import { useState } from "react";

export const account = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    saved: [],
    liked: [],
    _id: "634567b480b352ae6271bb97",
    username: "boyboy",
    name: "Ashish Yadav",
    email: "ohboy@test.com",
    small_intro: "wrote a blog on YOUR NORM",
    description: "YOUR NORM user",
    image_url:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    joined_at: "2022-10-11T12:55:16.899Z",
    __v: 0,
    comments: [
      "634a205075cc8f9681b5afaf",
      "634debf3551a41c7dd20278a",
      "634dedfa52b4c1cfc807c2ef",
      "634dee95bc1373bd125080e0",
      "634deec7ef5c4f5941ec6fec",
    ],
  });

  return (
    <account.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </account.Provider>
  );
};

export default UserContext;
