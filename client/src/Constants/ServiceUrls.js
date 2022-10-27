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
  },
  getComment: {
    method: "GET",
    url: "blog/comment/get/:id",
  },
  getBlogComments: {
    method: "GET",
    url: "blog/comment/blogcomment/:id",
  },
  likePost: {
    method: "POST",
    url: "blog/like/:id",
  },
  dislikePost: {
    method: "POST",
    url: "blog/dislike/:id",
  },
  likeComment: {
    method: "POST",
    url: "blog/comment/like/:id",
  },
  saveForLater: {
    method: "PATCH",
    url: "user/save/:id",
  },
};
