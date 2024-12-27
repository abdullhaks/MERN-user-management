import { useLocation } from "react-router-dom";
import UserHeader from "./UserHeader";
import AdminHeader from "./AdminHeader";

function Header() {
  const location = useLocation();
  const adminRoutes = ["/admin", "/admin/dashboard", "/admin/users"];

  // Check is it admin routr..
  const isAdminRoute = adminRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <>
      {isAdminRoute ? (
        <AdminHeader /> 
      ) : (
        <UserHeader /> 
      )}
    </>
  );
}

export default Header;
