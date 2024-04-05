import axios from "axios";

// Dont add slash in the end to prevent the mismatch with origin url
const BASE_SERVER_URL = "http://localhost:1112";

const axiosInstance = axios.create({
  baseURL: BASE_SERVER_URL,
});

axiosInstance.defaults.withCredentials = true;

const get = (url, config) => axiosInstance.get(url, config);
const post = (url, data, config) => axiosInstance.post(url, data, config);
const put = (url, data, config) => axiosInstance.put(url, data, config);
const del = (url, config) => axiosInstance.delete(url, config);
const patch = (url, data, config) => axiosInstance.patch(url, data, config);

export default {
  BASE_SERVER_URL,
  get,
  post,
  put,
  del,
  patch,
};
