import { GET_ORDER, TActions } from "./actions/actions"

type TDefaultOrderReducer = {
  order: string
}

const defaultOrderReducer: TDefaultOrderReducer = {
    order: ''
}

export const orderReducer = (state = defaultOrderReducer, action: TActions): TDefaultOrderReducer => {
    switch (action.type) {
      case GET_ORDER:
        return { ...state, order: action.payload }
      default:
        return state
    }
  }


