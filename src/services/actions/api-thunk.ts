import axios from 'axios';
import { TIngredient, TypeDispatch } from '../../types';
import { apiAuthUserData, apiLogoutUser } from '../../utils/api';
import { getCookie } from '../../utils/getCookie';
import { setCookie } from '../../utils/setCookie';
import { getAuthUserDataAction, getIngredientsAction, postAuthAction, postForgotPasswordAction, postOrderAction, postRegisterAction, postResetPasswordAction } from './actions';

export const fetchOrders = (url: string, postData: Array<TIngredient>) => {
    return function (dispatch: TypeDispatch) {
        axios.post(url, {
            "ingredients": postData
        }, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
        })
            .then(json => dispatch(postOrderAction(json.data.order.number)))
            .catch(error => console.log(error))
    }
}

export const fetchIngredients = (url: string) => {
    return function (dispatch: TypeDispatch) {
        axios.get(url)
            .then(json => dispatch(getIngredientsAction(json.data.data)))
            .catch(error => console.log(error))
    }
}

export const postForgotPassword = (url: string, email: string) => {
    return function (dispatch: TypeDispatch) {
        axios.post(url, {
            "email": email
        })
            .then(json => dispatch(postForgotPasswordAction(json.data.success)))
            .catch(error => console.log(error))
    }
}

export const postResetPassword = (url: string, password: string, token: string) => {
    return function (dispatch: TypeDispatch) {
        axios.post(url, {
            "password": password,
            "token": token
        })
            .then(json => dispatch(postResetPasswordAction(json.data.success)))
            .catch(error => console.log(error))
    }
}

export const postRegister = (url: string, email: string, password: string, userName: string) => {
    return function (dispatch: TypeDispatch) {
        axios.post(url, {
            "email": email,
            "password": password,
            "name": userName
        })
            .then(res => {
                let authToken = res.data.accessToken.split('Bearer ')[1];
                if (authToken) {
                    setCookie('accessToken', authToken, null);
                }
                return res;
            })
            .then(data => dispatch(postRegisterAction(data.data)))
            .catch(error => console.log(error))
    }
}

export const postAuth = (url: string, email: string, password: string) => {
    return function (dispatch: TypeDispatch) {
        axios.post(url, {
            "email": email,
            "password": password,
        })
            .then(res => {
                let authToken = res.data.accessToken.split('Bearer ')[1];
                let refrToken = res.data.refreshToken;
                if (authToken) {
                    setCookie('accessToken', authToken, null);
                    setCookie('refreshToken', refrToken, null);
                }
                return res;
            })
            .then(data => dispatch(postAuthAction(data)))
            .finally(() => dispatch(getAuthUserData(apiAuthUserData)))
            .catch(error => console.log(error))
    }
}

export const getAuthUserData = (url: string) => {
    return function (dispatch: TypeDispatch) {
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
        })
            .then(data => {
                dispatch(getAuthUserDataAction(data.data));
            })
            .catch(error => console.log(error))
    }
}

export const patchUserData = (url: string, name: string, email: string) => {
    return function (dispatch: TypeDispatch) {
        axios.patch(url, {
            "email": email,
            "name": name
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + getCookie('accessToken')
                },
            })
            .then(data => dispatch(getAuthUserDataAction(data.data)))
            .catch(error => console.log(error))
    }
}

export const postLogout = async () => {
    await axios.post(apiLogoutUser, {
        "token": getCookie('refreshToken')
    })
};


