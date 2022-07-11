import { SET_INGREDIENTS, TActions } from "./actions/actions";
import { TIngredient } from "../types";

type TDefaultBurgerIngredients = {
  ingredients: Array<TIngredient>;
};

const defaultBurgerIngredients: TDefaultBurgerIngredients = {
  ingredients: [],
};

export const burgerIngredientsReducer = (
  state = defaultBurgerIngredients,
  action: TActions
): TDefaultBurgerIngredients => {
  switch (action.type) {
    case SET_INGREDIENTS:
      return { ...state, ingredients: action.payload };
    default:
      return state;
  }
};
