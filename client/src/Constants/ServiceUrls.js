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
  getPaginatedPost: {
    method: "GET",
    url: "blog/getPage/0",
  },
  getUsername: {
    method: "GET",
  },
};
