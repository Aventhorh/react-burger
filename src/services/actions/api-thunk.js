import axios from 'axios';
import { apiAuthUserData, apiLogoutUser } from '../../utils/api';
import { deleteCookie } from '../../utils/deleteCookie';
import { getCookie } from '../../utils/getCookie';
import { setCookie } from '../../utils/setCookie';
import { getAuthUserDataAction, getIngredientsAction, postAuthAction, postForgotPasswordAction, postOrderAction, postRegisterAction, postResetPasswordAction } from './actions';

export const fetchOrders = (url, postData) => {
    return function (dispatch) {
        axios.post(url, {
            "ingredients": postData
        })
            .then(json => dispatch(postOrderAction(json.data.order.number)))
            .catch(error => console.log(error))
    }
}

export const fetchIngredients = (url) => {
    return function (dispatch) {
        axios.get(url)
            .then(json => dispatch(getIngredientsAction(json.data.data)))
            .catch(error => console.log(error))
    }
}

export const postForgotPassword = (url, email) => {
    return function (dispatch) {
        axios.post(url, {
            "email": email
        })
            .then(json => dispatch(postForgotPasswordAction(json.data.success)))
            .catch(error => console.log(error))
    }
}

export const postResetPassword = (url, password, token) => {
    return function (dispatch) {
        axios.post(url, {
            "password": password,
            "token": token
        })
            .then(json => dispatch(postResetPasswordAction(json.data.success)))
            .catch(error => console.log(error))
    }
}

export const postRegister = (url, email, password, userName) => {
    return function (dispatch) {
        axios.post(url, {
            "email": email,
            "password": password,
            "name": userName
        })
            .then(res => {
                let authToken = res.data.accessToken.split('Bearer ')[1];
                if (authToken) {
                    setCookie('accessToken', authToken);
                }
                return res;
            })
            .then(data => dispatch(postRegisterAction(data.data)))
            .catch(error => console.log(error))
    }
}

export const postAuth = (url, email, password) => {
    return function (dispatch) {
        axios.post(url, {
            "email": email,
            "password": password,
        })
            .then(res => {
                let authToken = res.data.accessToken.split('Bearer ')[1];
                let refrToken = res.data.refreshToken;
                if (authToken) {
                    setCookie('accessToken', authToken);
                    setCookie('refreshToken', refrToken);
                }
                return res;
            })
            .then(data => dispatch(postAuthAction(data)))
            .finally(dispatch(getAuthUserData(apiAuthUserData)))
            .catch(error => console.log(error))
    }
}

export const getAuthUserData = (url) => {
    return function (dispatch) {
        axios({
            method: 'GET',
            url: url,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
            .then(data => {
                dispatch(getAuthUserDataAction(data.data));
            })
            .catch(error => console.log(error))
    }
}

export const patchUserData = (url, name, email) => {
    return function (dispatch) {
        axios.patch(url, {
            "email": email,
            "name": name
        },
            {
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + getCookie('accessToken')
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
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