import { useEffect } from "react";
import cl from "./app.module.css";
import { fetchIngredients } from "../../services/actions/api-thunk";
import { apiIngredientsConfig } from "../../utils/api";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Main } from "../../pages/main/main";
import AppHeader from "../app-header/app-header";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import Ingredient from "../../pages/ingredient/ingredient";
import ProtectedRoute from "../protected-route/protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrdersFeed from "../../pages/feed/feed";
import Details from "../../pages/details/details";
import ProfileOrders from "../../pages/profile-orders/profile-orders";
import { useTypeDispatch, useTypeSelector } from "../../types";

type TLocationState = {
  state: {
    background?: string;
  };
};

const App = () => {
  const dispatch = useTypeDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchIngredients(apiIngredientsConfig));
  }, []);
  const location = useLocation() as TLocationState;
  const user = useTypeSelector((state) => state.authUserData.userData);
  const background = location.state && location.state.background;
  const onClose = (path: string) => {
    navigate(path);
  };
  return (
    <div className={cl.app}>
      <AppHeader />
      <Routes location={background ?? location}>
        <Route
          element={
            <ProtectedRoute pathRedirect="/login" isAuth={user.success} />
          }
        >
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route
          element={
            <ProtectedRoute pathRedirect="/profile" isAuth={!user.success} />
          }
        >
          <Route path="/login" element={<Login />} />
        </Route>

        <Route
          element={
            <ProtectedRoute pathRedirect="/profile" isAuth={!user.success} />
          }
        >
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route
          element={
            <ProtectedRoute
              pathRedirect="/login"
              isAuth={
                !user.success
                  ? setTimeout(() => user.success, 5000)
                  : user.success
              }
            />
          }
        >
          <Route path="/profile/orders" element={<ProfileOrders />} />
        </Route>

        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<OrdersFeed />} />

        <Route
          element={
            <ProtectedRoute
              pathRedirect="/login"
              isAuth={
                !user.success
                  ? setTimeout(() => user.success, 5000)
                  : user.success
              }
            />
          }
        >
          <Route path="/profile/orders/:id" element={<Details />} />
        </Route>
        <Route path="/feed/:id" element={<Details />} />
        <Route path="/ingredients/:id" element={<Ingredient />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal visible={true} onClose={() => onClose("/")}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      {background && (
        <Routes>
          <Route
            path="/profile/orders/:id"
            element={
              <Modal visible={true} onClose={() => onClose("/profile/orders")}>
                <Details />
              </Modal>
            }
          />
        </Routes>
      )}
      {background && (
        <Routes>
          <Route
            path="/feed/:id"
            element={
              <Modal visible={true} onClose={() => onClose("/feed")}>
                <Details />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
