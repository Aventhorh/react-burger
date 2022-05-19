import { AUTH_USER_DATA } from "./actions/actions"

const defaultAuth = {
    userData: {}
}

export const authUserData = (state = defaultAuth, action) => {
    switch (action.type) {
        case AUTH_USER_DATA:
            return { ...state, userData: action.payload }
        default:
            return state
    }
}