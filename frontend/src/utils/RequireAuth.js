import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  return auth?.token ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default RequireAuth;
