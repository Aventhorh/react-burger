import axios from 'axios';

const apiConfig = 'https://norma.nomoreparties.space/api/ingredients'

export const apiIngredients = axios.get(apiConfig)
