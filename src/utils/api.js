const baseUrl = 'https://norma.nomoreparties.space/api'
export const apiIngredientsConfig = `${baseUrl}/ingredients`;
export const apiOrderConfig = `${baseUrl}/orders`;
export const apiPasswordForgot = `${baseUrl}/password-reset`;
export const apiPasswordReset = `${baseUrl}/password-reset/reset`;
export const apiRegister = `${baseUrl}/auth/register`;
export const apiAuth = `${baseUrl}/auth/login`;
export const apiAuthUserData = `${baseUrl}/auth/user`;
export const apiLogoutUser = `${baseUrl}/auth/logout`;

export const ws = new WebSocket("wss://norma.nomoreparties.space/orders/all")