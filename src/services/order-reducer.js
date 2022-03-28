const defaultOrderReducer = {
    order: ''
}

export const orderReducer = (state = defaultOrderReducer, action) => {
    switch (action.type) {
      case "GET_ORDER":
        return { ...state, order: action.payload }
      default:
        return state
    }
  }