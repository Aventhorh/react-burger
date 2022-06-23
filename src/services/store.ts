import { authUser } from "./auth-reducer";
import { authUserData } from "./auth-user-data";
import { burgerConstructorReducer } from "./constructor-reducer";
import { detailsReducer } from "./details-reducer";
import { forgotPassword } from "./forgot-password-reducer";
import { burgerIngredientsReducer } from "./ingredients-reducer";
import { orderReducer } from "./order-reducer";
import { registerUser } from "./register-user-reducer";
import { resetPassword } from "./reset-password-reducer";
import { wsReducer } from "./rootReducer";
import { socketMiddleware } from "../middleware/socket-middleware";
import { configureStore } from "@reduxjs/toolkit";
import { wsActions } from "./actions/actions";

export const store = configureStore({
  reducer: {
    ingredientsBurger: burgerIngredientsReducer,
    constructorBurger: burgerConstructorReducer,
    order: orderReducer,
    details: detailsReducer,
    forgotPass: forgotPassword,
    resetPass: resetPassword,
    registerUser: registerUser,
    authUser: authUser,
    authUserData: authUserData,
    wsReducer: wsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});
