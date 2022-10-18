import React from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useContext } from "react";
import { useCallback } from "react";
import { API } from "../../../Services/api.js";

//context
import { color } from "../../../Context/ColorContext";
import { account } from "../../../Context/UserContext";

//mui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CommentInput = ({ post, refresh }) => {
  const { primaryThemeColor, textWhite, mainBgColor, secondaryBgColor } =
    useContext(color);
  const { user } = useContext(account);
  let textBox = {};
  const navigate = useNavigate();

  const saveComment = async (e) => {
    e.preventDefault();
    if (!user._id) navigate("/signin");
    const comment = textBox.root.innerHTML;
    const post_id = post;
    const user_id = user._id;
    const response = await API.makeComment({
      blog_id: post_id,
      created_by: user_id,
      comment,
    });
    if (!response) return;
    const data = await response.data;
    if (data.success) {
      refresh();
    }
  };

  const wrapperRef = useCallback((wrapper) => {
    if (!wrapper) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    textBox = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
        ],
      },
      placeholder: "What are your thoughts?",
    });
  }, []);

  const CommentBox = styled(Box)({
    display: "flex",
    padding: "10px",
    height: "max-content",
    position: "relative",
    borderRadius: "10px",
    background: textWhite,
    boxShadow: `0 0 5px 0 ${secondaryBgColor}`,
  });

  const RespondBtn = styled(Button)({
    position: "absolute",
    right: "10px",
    top: "8px",
    borderRadius: "10px",
    padding: "10px 20px",
    color: textWhite,
    background: primaryThemeColor,
    "&:hover": {
      background: primaryThemeColor,
    },
  });

  const Editor = styled(Box)({
    width: "100%",
    "& > .ql-toolbar": {
      border: "none",
      borderRadius: "10px",
      background: mainBgColor,
    },
    "& > .ql-container.ql-snow": {
      border: "none",
    },
    "& > .ql-container > .ql-editor": {
      padding: "10px 5px 5px 5px",
      height: "fit-content",
      fontSize: "16px",
    },
    "& > .ql-container > .ql-editor::before": {
      left: "5px",
      opacity: "0.5",
    },
  });

  return (
    <CommentBox component="form" onSubmit={saveComment}>
      <Editor id="editor" ref={wrapperRef} />
      <RespondBtn type="submit">Respond</RespondBtn>
    </CommentBox>
  );
};

export default CommentInput;
