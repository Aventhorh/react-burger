import { combineReducers, createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk';
import { authUser } from "./auth-reducer";
import { authUserData } from "./auth-user-data";
import { burgerConstructorReducer } from "./constructor-reducer"
import { detailsReducer } from "./details-reducer"
import { forgotPassword } from "./forgot-password-reducer";
import { burgerIngredientsReducer } from "./ingredients-reducer"
import { orderReducer } from "./order-reducer"
import { registerUser } from "./register-user-reducer";
import { resetPassword } from "./reset-password-reducer";

const rootReducer = combineReducers({
  ingredientsBurger: burgerIngredientsReducer,
  constructorBurger: burgerConstructorReducer,
  order: orderReducer,
  details: detailsReducer,
  forgotPass: forgotPassword,
  resetPass: resetPassword,
  registerUser: registerUser,
  authUser: authUser,
  authUserData: authUserData
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
