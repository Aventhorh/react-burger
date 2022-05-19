import { FORGOT_PASSWORD } from "./actions/actions"

const defaultForgotPassword = {
    password: ''
}

export const forgotPassword = (state = defaultForgotPassword, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD:
            return { ...state, password: action.payload }
        default:
            return state
    }
}
