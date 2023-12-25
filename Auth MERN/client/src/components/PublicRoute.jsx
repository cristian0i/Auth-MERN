import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PublicRoute() {
    const { user } = useSelector((state) => state.user);
    return user ? <Navigate to={"/profile"} /> : <Outlet />;
}

export default PublicRoute