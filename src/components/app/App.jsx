import { useEffect } from "react";
import cl from "./app.module.css";
import { fetchIngredients } from "../../services/actions/api-thunk";
import { apiIngredientsConfig } from "../../utils/api";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Main } from "../../pages/main/main";
import AppHeader from "../app-header/app-header";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import Ingredient from "../../pages/ingredient/ingredient";
import ProtectedRoute from "../protected-route/protected-route";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients(apiIngredientsConfig));
  }, []);

  return (
    <div className={cl.app}>
      <AppHeader />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route exact path="/profile" element={<Profile />} />
        </Route>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
        <Route exact path="/" element={<Main />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/ingredients/:id" element={<Ingredient />} />
      </Routes>
    </div>
  );
}

export default App;
