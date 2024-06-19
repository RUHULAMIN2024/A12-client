import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://b9a12-server-side-ruhulamin-2024.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
