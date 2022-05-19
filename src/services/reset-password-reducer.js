import { RESET_PASSWORD } from "./actions/actions"

const defaultResetPassword = {
    password: ''
}

export const resetPassword = (state = defaultResetPassword, action) => {
    switch (action.type) {
        case RESET_PASSWORD:
            return { ...state, password: action.payload }
        default:
            return state
    }
}