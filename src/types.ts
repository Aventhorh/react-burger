import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkAction } from "redux-thunk";
import { TActions } from "./services/actions/actions";

import { store } from "./services/store";

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TOrder = {
  _id: string;
  status: string | "pending" | "done";
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
  price?: number;
};

export type TRootState = ReturnType<typeof store.getState>;
export const useTypeSelector: TypedUseSelectorHook<TRootState> = useSelector;

export type TTypeDispatch = typeof store.dispatch;
export const useTypeDispatch = () => useDispatch<TTypeDispatch>();

export type AppThunk = ThunkAction<void, TRootState, unknown, TActions>;
