import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    (config) => {
      const userToken = localStorage.getItem("token");
      config.headers.authorization = `Bearer ${userToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const statusCode = error.response?.status;
      if (statusCode === 401 || statusCode === 403) {
        await logout();
        navigate("/login", { replace: true });
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
