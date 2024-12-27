import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
  const { currentUser } = useSelector((state: any) => state.user);

  return currentUser ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoute;
