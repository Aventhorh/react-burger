import { ADD_INGREDIENTS, DRAG_INGREDIENT, REMOVE_INGREDIENT } from "./actions/actions";
import { v4 as uuidv4 } from 'uuid';

const defaultBurgerConstructor = {
    addedIngredients: []
}

export const burgerConstructorReducer = (state = defaultBurgerConstructor, action) => {
    switch (action.type) {
        case ADD_INGREDIENTS:
            action.payload.uuid = uuidv4()
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
        case REMOVE_INGREDIENT:
            const arr = [...state.addedIngredients];
            arr.splice(action.payload + 1, 1);
            return { ...state, addedIngredients: arr };
        case DRAG_INGREDIENT:
            const dragItem = state.addedIngredients[action.payload + 1]
            const hoverItem = state.addedIngredients[action.payloadTwo + 1]
            const updatedArr = [...state.addedIngredients]

            updatedArr[action.payload + 1] = hoverItem
            updatedArr[action.payloadTwo + 1] = dragItem
            return { ...state, addedIngredients: updatedArr }
        default:
            return state;
    }
}
