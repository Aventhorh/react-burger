import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import cl from "./ingredient-constructor.module.css";
import PropTypes from 'prop-types';


const IngredientConstructor = ({ bun, types, positionText, ...props }) => {

    return (
        
        <li className={bun === true ? cl.ingredientListItemLocked : cl.ingredientListItem} >
            <div className={cl.ingredientItem}>
                <button className={cl.ingredientButton}>
                    {bun === true ? '' : <DragIcon type="primary" />}
                </button>
                <div className={cl.ingredientContainer}>
                    <ConstructorElement isLocked={bun} type={types} text={props.name + positionText} price={props.price} thumbnail={props.image} />
                </div>
                
            </div>
        </li>
    );
};

IngredientConstructor.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
}; 

export default IngredientConstructor;