import axios from 'axios';
import { getIngredientsAction, postOrderAction } from './actions';

export const fetchOrders = (postOrder, postData) => {
    return function(dispatch) {
        axios.post(postOrder, {
            "ingredients": postData
        })
        .then(json => dispatch(postOrderAction(json.data.order.number)))
        .catch(error => console.log(error))
    }
}

export const fetchIngredients = (getIngredients) => {
    return function(dispatch) {
        axios.get(getIngredients)
        .then(json => dispatch(getIngredientsAction(json.data.data)))
        .catch(error => console.log(error))
    }
}
