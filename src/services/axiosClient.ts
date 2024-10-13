import axios from "axios";

const isNgrok = import.meta.env.VITE_USE_NGROK === "true";
const baseURL = isNgrok
  ? `${import.meta.env.VITE_NGROK_URL}/api`
  : `${import.meta.env.VITE_LOCAL_URL}/api`;

const axiosClient = axios.create({
  baseURL,
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Accept = `Application/json`;
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;

  // Automatically set Content-Type for FormData
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }

  // if enable ngrok for hit api (make sure ngrok is running)
  if (isNgrok) {
    config.headers["ngrok-skip-browser-warning"] = true;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;
      if (response.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
      }
    } catch (error) {
      console.log(error);
    }
    // bisa else if untuk status code lain
    // tapi skrg throw error aja dulu
    throw error;
  }
);

export default axiosClient;
