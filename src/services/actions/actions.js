export const ADD_INGREDIENTS = 'ADD_INGREDIENTS'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
export const DRAG_INGREDIENT = 'DRAG_INGREDIENT'

export const ADD_DETAILS = 'ADD_DETAILS'
export const REMOVE_DETAILS = 'REMOVE_DETAILS'

export const SET_INGREDIENTS = 'SET_INGREDIENTS'

export const GET_ORDER = 'GET_ORDER'


export const getIngredientsAction = (payload) => ({type: SET_INGREDIENTS, payload})

export const postOrderAction = (payload) => ({type: GET_ORDER, payload})