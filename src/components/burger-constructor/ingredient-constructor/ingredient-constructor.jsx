import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./ingredient-constructor.module.css";
import PropTypes from 'prop-types';
import multiCl from "classnames"

const IngredientConstructor = ({ bun, types, positionText, ...props }) => {

    return (
        
        <div className={bun === true ? cl.ingredient__listItemLocked : cl.ingredient__listItem} >
            <div className={multiCl(cl.ingredient__item, "mb-4")}>
                <button className={cl.ingredient__button}>
                    {bun === true ? '' : <DragIcon type="primary" />}
                </button>
                <div className={cl.ingredient__container}>
                    <ConstructorElement isLocked={bun} type={types} text={props.name + positionText} price={props.price} thumbnail={props.image} />
                </div>
                
            </div>
        </div>
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
    types: PropTypes.string,
    positionText: PropTypes.string
}; 

export default IngredientConstructor;