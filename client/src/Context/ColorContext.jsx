import React from "react";
import { createContext, useState } from "react";

export const color = createContext();

const ColorContext = ({ children }) => {
  const [mainBgColor, setMainBgColor] = useState("#F4F4F4");
  const [secondaryBgColor, setSecondaryBgColor] = useState("#D9C5FF");
  const [primaryThemeColor, setPrimaryThemeColor] = useState("#6821FF");
  const [primaryTextColor, setPrimaryTextColor] = useState("#000000")
  return (
    <color.Provider
      value={{
        mainBgColor,
        setMainBgColor,
        secondaryBgColor,
        setSecondaryBgColor,
        primaryThemeColor,
        setPrimaryThemeColor,
        primaryTextColor,
        setPrimaryTextColor,
      }}
    >
      {children}
    </color.Provider>
  );
};

export default ColorContext;
