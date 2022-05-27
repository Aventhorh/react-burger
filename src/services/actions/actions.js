export const ADD_INGREDIENTS = 'ADD_INGREDIENTS'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
export const DRAG_INGREDIENT = 'DRAG_INGREDIENT'
export const ADD_DETAILS = 'ADD_DETAILS'
export const REMOVE_DETAILS = 'REMOVE_DETAILS'
export const SET_INGREDIENTS = 'SET_INGREDIENTS'
export const GET_ORDER = 'GET_ORDER'
export const CLEAR_UUID_INGREDIENTS = 'CLEAR_UUID_INGREDIENTS'
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const REGISTER_USER = 'REGISTER_USER'
export const AUTH_USER = 'AUTH_USER'
export const AUTH_USER_DATA = 'AUTH_USER_DATA'

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';

export const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};

export const addIngredientAction = (payload) => {
    return ({ type: ADD_INGREDIENTS, payload })
}
export const getIngredientsAction = (payload) => ({ type: SET_INGREDIENTS, payload })
export const postOrderAction = (payload) => ({ type: GET_ORDER, payload })
export const postForgotPasswordAction = (payload) => ({ type: FORGOT_PASSWORD, payload })
export const postResetPasswordAction = (payload) => ({ type: RESET_PASSWORD, payload })
export const postRegisterAction = (payload) => ({ type: REGISTER_USER, payload })
export const postAuthAction = (payload) => ({ type: AUTH_USER, payload })
export const getAuthUserDataAction = (payload) => ({ type: AUTH_USER_DATA, payload })