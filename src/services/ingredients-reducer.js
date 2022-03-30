import { SET_INGREDIENTS } from "./actions/actions"

const defaultBurgerIngredients = {
  ingredients: []
}

export const burgerIngredientsReducer = (state = defaultBurgerIngredients, action) => {
  switch (action.type) {
    case SET_INGREDIENTS:
      return { ...state, ingredients: action.payload }
    default:
      return state
  }
}

