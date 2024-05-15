import axios from "axios";

const instance = axios.create({
  // baseURL: process.env.VUE_BASE_URL,
  baseURL: "http://127.0.0.1:8000",
  timeout: 3000,
});
// axios.interceptors.request.use(function () {/*...*/})
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    return data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
