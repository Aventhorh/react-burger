import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./ingredient-constructor.module.css";
import multiCl from "classnames"
import PropTypes from 'prop-types';

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
    props: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            proteins: PropTypes.number,
            fat: PropTypes.number,
            carbohydrates: PropTypes.number,
            calories: PropTypes.number,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            image_mobile: PropTypes.string,
            image_large: PropTypes.string,
            __v: PropTypes.number,
        })
    ).isRequired
}

export default IngredientConstructor;