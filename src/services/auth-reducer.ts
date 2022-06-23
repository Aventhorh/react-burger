import { AUTH_USER, TActions } from "./actions/actions"

type TUser = {
    user?: {
        success: boolean;
        user: {
            email: string;
            name: string
        }
    }
}

type TDefaultAuth = {
    user: TUser
}


const defaultAuth: TDefaultAuth = {
    user: {}
}

export const authUser = (state = defaultAuth, action: TActions): TDefaultAuth => {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, user: action.payload }
        default:
            return state
    }
}