import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../../pages/login/login";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.authUserData.userData);
  return user.success === true ? <Outlet /> : <Login />;
};

export default ProtectedRoute;
