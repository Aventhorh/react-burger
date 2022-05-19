import { REGISTER_USER } from "./actions/actions"

const defaultRegister = {
    user: {}
}

export const registerUser = (state = defaultRegister, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return { ...state, user: action.payload }
        default:
            return state
    }
}