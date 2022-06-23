import { Navigate, Outlet, useLocation, RouteProps } from "react-router-dom";

type ProtectedRouteProps = {
  isAuth: any;
  pathRedirect: string;
} & RouteProps;

type TLocationState = {
  state: {
    path?: string;
  };
  pathname?: string;
};

const ProtectedRoute = ({ pathRedirect, isAuth }: ProtectedRouteProps) => {
  const location = useLocation() as TLocationState;

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
