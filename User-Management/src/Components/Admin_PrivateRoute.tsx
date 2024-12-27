import {useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../Redux/Store";

function Admin_PrivateRoute() {

const {adminDetals} = useSelector((state:RootState) => state.admin);

return adminDetals ? <Outlet /> : <Navigate  to={'/admin-sign-in'}/>

}

export default Admin_PrivateRoute
