import axios from 'axios';

const apiIngredientsConfig = 'https://norma.nomoreparties.space/api/ingredients';
const apiOrderConfig = 'https://norma.nomoreparties.space/api/orders';

export const apiIngredients = axios.get(apiIngredientsConfig);


export const postOrder = (api) => axios.post(apiOrderConfig, {
    "ingredients": api
  });
