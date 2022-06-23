import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector
} from 'react-redux';

import {
    store
} from './services/store';

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

export type TOrder = {
    _id: string;
    status: string | "pending" | "done";
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    ingredients: string[];
    price?: number;
};

export type TypeSelector = ReturnType<typeof store.getState>;
export const useTypeSelector: TypedUseSelectorHook<TypeSelector> = useSelector;

export type TypeDispatch = typeof store.dispatch;
export const useTypeDispatch = () => useDispatch<TypeDispatch>();