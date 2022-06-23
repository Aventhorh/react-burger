import { AppThunk, TIngredient } from "../../types";
import { apiAuthUserData, apiLogoutUser } from "../../utils/api";
import axios from "axios";
import { getCookie } from "../../utils/getCookie";
import { setCookie } from "../../utils/setCookie";
import {
  getAuthUserDataAction,
  getIngredientsAction,
  postAuthAction,
  postForgotPasswordAction,
  postOrderAction,
  postRegisterAction,
  postResetPasswordAction,
} from "./actions";
import {
  fetchIngredientsRequest,
  fetchOrdersRequest,
  getAuthUserDataRequest,
  patchUserDataRequest,
  postAuthRequest,
  postForgotPasswordRequest,
  postRegisterRequest,
  postResetPasswordRequest,
} from "./requests";

export const fetchOrders = (
  url: string,
  postData: Array<TIngredient>
): AppThunk => {
  return function (dispatch) {
    fetchOrdersRequest(url, postData)
      .then((json) => dispatch(postOrderAction(json.data.order.number)))
      .catch((error) => console.log(error));
  };
};

export const fetchIngredients = (url: string): AppThunk => {
  return function (dispatch) {
    fetchIngredientsRequest(url)
      .then((data) => dispatch(getIngredientsAction(data.data.data)))
      .catch((error) => console.log(error));
  };
};

export const postForgotPassword = (url: string, email: string): AppThunk => {
  return function (dispatch) {
    postForgotPasswordRequest(url, email)
      .then((json) => dispatch(postForgotPasswordAction(json.data.success)))
      .catch((error) => console.log(error));
  };
};

export const postResetPassword = (
  url: string,
  password: string,
  token: string
): AppThunk => {
  return function (dispatch) {
    postResetPasswordRequest(url, password, token)
      .then((json) => dispatch(postResetPasswordAction(json.data.success)))
      .catch((error) => console.log(error));
  };
};

export const postRegister = (
  url: string,
  email: string,
  password: string,
  userName: string
): AppThunk => {
  return function (dispatch) {
    postRegisterRequest(url, email, password, userName)
      .then((res) => {
        let authToken = res.data.accessToken.split("Bearer ")[1];
        if (authToken) {
          setCookie("accessToken", authToken, null);
        }
        return res;
      })
      .then((data) => dispatch(postRegisterAction(data.data)))
      .catch((error) => console.log(error));
  };
};

export const postAuth = (
  url: string,
  email: string,
  password: string
): AppThunk => {
  return function (dispatch) {
    postAuthRequest(url, email, password)
      .then((res) => {
        let authToken = res.data.accessToken.split("Bearer ")[1];
        let refrToken = res.data.refreshToken;
        if (authToken) {
          setCookie("accessToken", authToken, null);
          setCookie("refreshToken", refrToken, null);
        }
        return res;
      })
      .then((data) => dispatch(postAuthAction(data)))
      .finally(() => getAuthUserData(apiAuthUserData))
      .catch((error) => console.log(error));
  };
};

export const getAuthUserData = (url: string): AppThunk => {
  return function (dispatch) {
    getAuthUserDataRequest(url)
      .then((data) => {
        dispatch(getAuthUserDataAction(data.data));
      })
      .catch((error) => console.log(error));
  };
};

export const patchUserData = (
  url: string,
  name: string,
  email: string
): AppThunk => {
  return function (dispatch) {
    patchUserDataRequest(url, name, email)
      .then((data) => dispatch(getAuthUserDataAction(data.data)))
      .catch((error) => console.log(error));
  };
};

export const postLogout = async () => {
  await axios.post(apiLogoutUser, {
    token: getCookie("refreshToken"),
  });
};
