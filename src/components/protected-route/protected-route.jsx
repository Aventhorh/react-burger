import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ pathRedirect, isAuth }) => {
  const location = useLocation();

  if (isAuth) {
    return <Outlet />;
  }

  return (
    <Navigate
      to={location.state?.path || pathRedirect}
      state={{ path: location.pathname }}
    />
  );
};

export default ProtectedRoute;
