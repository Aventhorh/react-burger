import { TOrder } from "../types";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  TActions,
} from "./actions/actions";
import { PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  wsConnected: boolean;
  orders: Array<TOrder>;
  total: number | undefined;
  totalToday: number | undefined;
  error: PayloadAction | null;
};

const initialState: TInitialState = {
  wsConnected: false,
  orders: [],
  total: undefined,
  totalToday: undefined,
  error: null,
};

export const wsReducer = (
  state = initialState,
  action: TActions
): TInitialState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: action.payload,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};
