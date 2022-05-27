import { AUTH_USER } from "./actions/actions"

const defaultAuth = {
    user: {}
}

export const authUser = (state = defaultAuth, action) => {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, user: action.payload }
        default:
            return state
    }
}