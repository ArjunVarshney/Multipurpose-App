import React, { useEffect } from "react";
import { API } from "../../Services/api";

const Post = () => {
  const getData = async () => {
    try {
      const url = `blog/get/${window.location.pathname.split("/")[2]}`;
      const response = await API.getPost("", url);
      const post = await response.data;
      console.log(post);
      if (post.success) {
        console.log(post.data);
      } else {
        console.log("post does not exists");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return <div>Post</div>;
};

export default Post;
