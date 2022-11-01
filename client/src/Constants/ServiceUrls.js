export const SERVICE_URLS = {
  signinUserWithGoogle: {
    method: "POST",
    url: "user/create/google",
  },
  getPost: {
    method: "GET",
    url: `blog/get/${window.location.pathname.split("/")[2]}`,
  },
  getPostById: {
    method: "GET",
    url: `blog/getbyid/:id`,
  },
  getAllPost: {
    method: "GET",
    url: "blog/",
  },
  getTrendingPost: {
    method: "GET",
    url: "blog/trending",
  },
  searchPost: {
    method: "GET",
    url: "blog/search?q=",
  },
  getPaginatedPost: {
    method: "GET",
    url: "blog/getPage/0",
  },
  getUsername: {
    method: "GET",
  },
  getUser: {
    method: "GET",
    url: "user/get/:id",
  },
  getAllTags: {
    method: "GET",
    url: "blog/tag",
  },
  topTags: {
    method: "GET",
    url: "blog/tag/trendingTags",
  },
  makeComment: {
    method: "POST",
    url: "blog/comment/post",
    auth: true,
  },
  getComment: {
    method: "GET",
    url: "blog/comment/get/:id",
  },
  getBlogComments: {
    method: "GET",
    url: "blog/comment/blogcomment/:id",
  },
  deleteComment: {
    method: "DELETE",
    url: "blog/comment/delete/:comment_id",
    auth: true,
  },
  likePost: {
    method: "POST",
    url: "blog/like/:id",
    auth: true,
  },
  dislikePost: {
    method: "POST",
    url: "blog/dislike/:id",
    auth: true,
  },
  likeComment: {
    method: "POST",
    url: "blog/comment/like/:id",
    auth: true,
  },
  saveForLater: {
    method: "PATCH",
    url: "user/save/:id",
    auth: true,
  },
  updateUser: {
    method: "PUT",
    url: "user/update/:id",
    auth: true,
  },
};
