import { useEffect } from "react";
import cl from "./app.module.css";
import { fetchIngredients } from "../../services/actions/api-thunk";
import { apiIngredientsConfig } from "../../utils/api";
import { useDispatch } from "react-redux";
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
import { useSelector } from "react-redux";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchIngredients(apiIngredientsConfig));
  }, []);
  const location = useLocation();
  const user = useSelector((state) => state.authUserData.userData);
  let background = location.state && location.state.background;
  const onClose = (path) => {
    navigate(path);
  };
  return (
    <div className={cl.app}>
      <AppHeader />
      <Routes location={background ?? location}>
        <Route
          element={
            <ProtectedRoute exact pathRedirect="/login" isAuth={user.success} />
          }
        >
          <Route exact path="/profile" element={<Profile />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              exact
              pathRedirect="/profile"
              isAuth={!user.success}
            />
          }
        >
          <Route exact path="/login" element={<Login />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              exact
              pathRedirect="/profile"
              isAuth={!user.success}
            />
          }
        >
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route exact path="/reset-password" element={<ResetPassword />} />
        <Route exact path="/" element={<Main />} />
        <Route exact path="/register" element={<Register />} />

        <Route path="/ingredients/:id" element={<Ingredient />} />
      </Routes>
      <Routes>
        {background && (
          <Route
            path="/ingredients/:id"
            element={
              <Modal visible={true} onClose={() => onClose("/")}>
                <IngredientDetails />
              </Modal>
            }
          />
        )}
      </Routes>
    </div>
  );
}

export default App;
