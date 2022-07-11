import axios from "axios";
import { TIngredient } from "../../types";
import { getCookie } from "../../utils/getCookie";

export const fetchOrdersRequest = (
  url: string,
  postData: Array<TIngredient>
) => {
  return axios.post(
    url,
    {
      ingredients: postData,
    },
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
    }
  );
};

export const fetchIngredientsRequest = (url: string) => {
  return axios.get(url);
};

export const postForgotPasswordRequest = (url: string, email: string) => {
  return axios.post(url, {
    email: email,
  });
};

export const postResetPasswordRequest = (
  url: string,
  password: string,
  token: string
) => {
  return axios.post(url, {
    password: password,
    token: token,
  });
};

export const postRegisterRequest = (
  url: string,
  email: string,
  password: string,
  userName: string
) => {
  return axios.post(url, {
    email: email,
    password: password,
    name: userName,
  });
};

export const postAuthRequest = (
  url: string,
  email: string,
  password: string
) => {
  return axios.post(url, {
    email: email,
    password: password,
  });
};

export const getAuthUserDataRequest = (url: string) => {
  return axios({
    method: "GET",
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  });
};

export const patchUserDataRequest = (
  url: string,
  name: string,
  email: string
) => {
  return axios.patch(
    url,
    {
      email: email,
      name: name,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
    }
  );
};
