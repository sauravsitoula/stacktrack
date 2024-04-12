import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  console.log(
    "requireing auth check ------------------------------------------------"
  );
  console.log(auth);
  return auth?.token ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default RequireAuth;
