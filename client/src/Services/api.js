import axios from "axios";
import { SERVICE_URLS } from "../Constants/ServiceUrls";

const BASE_URL = "http://localhost:8000";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 10,
  headers: {
    "content-type": "application/json",
  },
});

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = async (body, url) => {
    try {
      const response = await instance({
        method: value.method,
        url: url || value.url,
        data: body,
        headers: value.auth
          ? {
              Authorization: localStorage.getItem("token")
                ? localStorage.getItem("token")
                : "",
              "content-type": "application/json",
            }
          : null,
        responseType: value.responseType,
      });
      return response;
    } catch (error) {
      console.log(error, value.auth, localStorage.getItem("token"));
    }
  };
}

export { API };
