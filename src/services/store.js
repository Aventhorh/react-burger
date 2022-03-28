import { combineReducers, createStore } from "redux"
import { burgerConstructorReducer } from "./constructor-reducer"
import { detailsReducer } from "./details-reducer"
import { burgerIngredientsReducer } from "./ingredients-reducer"
import { orderReducer } from "./order-reducer"

const rootReducer = combineReducers({
    ingredientsBurger: burgerIngredientsReducer,
    constructorBurger: burgerConstructorReducer,
    order: orderReducer,
    details: detailsReducer
  })

 export const store = createStore(rootReducer)
