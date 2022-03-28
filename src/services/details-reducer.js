const defaultDetails = {
    details: {}
}

export const detailsReducer = (state = defaultDetails, action) => {
    switch (action.type) {
        case "ADD_DETAILS":
            return { ...state, details: action.payload }
        case "REMOVE_DETAILS":
            return { details: action.payload }
        default:
            return state
    }
}