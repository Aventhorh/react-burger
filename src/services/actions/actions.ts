import { TIngredient, TOrder } from "../../types";
import { PayloadAction } from "@reduxjs/toolkit";

export const ADD_INGREDIENTS: "ADD_INGREDIENTS" = "ADD_INGREDIENTS";
export const REMOVE_INGREDIENT: "REMOVE_INGREDIENT" = "REMOVE_INGREDIENT";
export const DRAG_INGREDIENT: "DRAG_INGREDIENT" = "DRAG_INGREDIENT";
export const ADD_DETAILS: "ADD_DETAILS" = "ADD_DETAILS";
export const REMOVE_DETAILS: "REMOVE_DETAILS" = "REMOVE_DETAILS";
export const SET_INGREDIENTS: "SET_INGREDIENTS" = "SET_INGREDIENTS";
export const GET_ORDER: "GET_ORDER" = "GET_ORDER";
export const CLEAR_UUID_INGREDIENTS: "CLEAR_UUID_INGREDIENTS" =
  "CLEAR_UUID_INGREDIENTS";
export const FORGOT_PASSWORD: "FORGOT_PASSWORD" = "FORGOT_PASSWORD";
export const RESET_PASSWORD: "RESET_PASSWORD" = "RESET_PASSWORD";
export const REGISTER_USER: "REGISTER_USER" = "REGISTER_USER";
export const AUTH_USER: "AUTH_USER" = "AUTH_USER";
export const AUTH_USER_DATA: "AUTH_USER_DATA" = "AUTH_USER_DATA";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";

export interface IAddIngredients {
  readonly type: typeof ADD_INGREDIENTS;
  readonly payload: TIngredient;
}

export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly payload: number;
}

export interface IDragIngredient {
  readonly type: typeof DRAG_INGREDIENT;
  readonly payload: number;
  readonly payloadTwo: number;
}

export interface IAddDetails {
  readonly type: typeof ADD_DETAILS;
  readonly payload: object;
}

export interface IRemoveDetails {
  readonly type: typeof REMOVE_DETAILS;
  readonly payload: object;
}

export interface ISetIngredients {
  readonly type: typeof SET_INGREDIENTS;
  readonly payload: Array<TIngredient>;
}

export interface IGetOrder {
  readonly type: typeof GET_ORDER;
  readonly payload: string;
}

export interface IClearUuidIngredients {
  readonly type: typeof CLEAR_UUID_INGREDIENTS;
}

export interface IForgotPassword {
  readonly type: typeof FORGOT_PASSWORD;
  readonly payload: string;
}

export interface IResetPassword {
  readonly type: typeof RESET_PASSWORD;
  readonly payload: string;
}

export interface IRegisterUser {
  readonly type: typeof REGISTER_USER;
  readonly payload: object;
}

export interface IAuthUser {
  readonly type: typeof AUTH_USER;
  readonly payload: object;
}

export interface IAuthUserData {
  readonly type: typeof AUTH_USER_DATA;
  readonly payload: object;
}

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  payload: PayloadAction;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload: PayloadAction;
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
  payload: PayloadAction;
}

export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: {
    orders: Array<TOrder>;
    total: number | undefined;
    totalToday: number | undefined;
  };
}

export interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
}

export const addIngredientAction = (payload: TIngredient): IAddIngredients => ({
  type: ADD_INGREDIENTS,
  payload,
});
export const getIngredientsAction = (
  payload: Array<TIngredient>
): ISetIngredients => ({ type: SET_INGREDIENTS, payload });
export const postOrderAction = (payload: string): IGetOrder => ({
  type: GET_ORDER,
  payload,
});
export const postForgotPasswordAction = (payload: string): IForgotPassword => ({
  type: FORGOT_PASSWORD,
  payload,
});
export const postResetPasswordAction = (payload: string): IResetPassword => ({
  type: RESET_PASSWORD,
  payload,
});
export const postRegisterAction = (payload: object): IRegisterUser => ({
  type: REGISTER_USER,
  payload,
});
export const postAuthAction = (payload: object): IAuthUser => ({
  type: AUTH_USER,
  payload,
});
export const getAuthUserDataAction = (payload: object): IAuthUserData => ({
  type: AUTH_USER_DATA,
  payload,
});

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

export type TActions =
  | IAddIngredients
  | IRemoveIngredient
  | IDragIngredient
  | IAddDetails
  | IRemoveDetails
  | ISetIngredients
  | IGetOrder
  | IClearUuidIngredients
  | IForgotPassword
  | IResetPassword
  | IRegisterUser
  | IAuthUser
  | IAuthUserData
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetMessage
  | IWsSendMessage;
