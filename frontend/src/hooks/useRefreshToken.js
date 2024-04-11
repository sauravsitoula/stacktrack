import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth, auth } = useAuth();
  const refresh = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axios.get("http://localhost:3002/auth/refresh", {
      refreshToken,
    });
    setAuth((prev) => {
      return {
        ...prev,
        token: response.data.token,
        user: response.data.user,
      };
    });
    return response.data.token;
  };
  return refresh;
};

export default useRefreshToken;
