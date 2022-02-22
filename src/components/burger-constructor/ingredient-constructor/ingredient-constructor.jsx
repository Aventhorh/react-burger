import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import cl from "./ingredient-constructor.module.css";


const IngredientConstructor = ({ bool, types, ...props }) => {

    return (
        
        <li className={bool === true ? cl.ingredientListItemLocked : cl.ingredientListItem} >
            <div className={cl.ingredientItem}>
                <button className={cl.ingredientButton}>
                    {bool === true ? '' : <DragIcon type="primary" />}
                </button>
                <div className={cl.ingredientContainer}>
                    <ConstructorElement isLocked={bool} type={types} text={props.name} price={props.price} thumbnail={props.image} />
                </div>
            </div>
        </li>
    );
};

export default IngredientConstructor;