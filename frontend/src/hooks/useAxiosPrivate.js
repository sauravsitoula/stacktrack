import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const { auth } = useAuth();

  const axiosPrivate = axios.create({
    baseURL: "http://18.118.122.21:3000",
  });

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [auth?.token]);

  return axiosPrivate;
};

export default useAxiosPrivate;
