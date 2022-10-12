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
    const response = await instance({
      method: value.method,
      url: url || value.url,
      data: body,
      headers: value.headers,
      responseType: value.responseType,
    });
    return response;
  };
}

export { API };
