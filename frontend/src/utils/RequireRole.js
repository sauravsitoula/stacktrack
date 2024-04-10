import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireRole = ({ roleName }) => {
  const { auth } = useAuth();
  return auth?.role?.[roleName] ? (
    <>
      <Outlet />
    </>
  ) : auth?.access_token ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireRole;
