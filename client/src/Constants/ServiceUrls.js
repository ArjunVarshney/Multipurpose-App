export const SERVICE_URLS = {
  getPost: {
    method: "GET",
    url: `blog/get/${window.location.pathname.split("/")[2]}`,
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
    url: "user/get/6345524eb7cf13e03f889c88",
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
    url: "blog/comment/get/",
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
};
