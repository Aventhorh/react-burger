const defaultBurgerConstructor = {
    addedIngredients: []
}

export const burgerConstructorReducer = (state = defaultBurgerConstructor, action) => {
    switch (action.type) {
        case "ADD_INGREDIENTS":
            if (action.payload.type === "bun") {
                if (state.addedIngredients.find(item => item.type === action.payload.type)) {
                    return {
                        ...state, addedIngredients: [...state.addedIngredients.filter((item) => {
                            return item.type != "bun"
                        }), action.payload]
                    };
                }
            }
            return { ...state, addedIngredients: [...state.addedIngredients, action.payload] }
        case "REMOVE_INGREDIENT":
            const arr = [...state.addedIngredients];
            arr.splice(action.payload + 1, 1);
            return { ...state, addedIngredients: arr };
        case "DRAG_INGREDIENT":
            const dragItem = state.addedIngredients[action.payload]
            const hoverItem = state.addedIngredients[action.payloadTwo]
            
                const updatedArr = [...state.addedIngredients]
                updatedArr[action.payload] = hoverItem
                updatedArr[action.payloadTwo] = dragItem
            return { ...state, addedIngredients: updatedArr }
        default:
            return state;
    }
}
