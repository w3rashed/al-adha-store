import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://al-adha-server.up.railway.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
