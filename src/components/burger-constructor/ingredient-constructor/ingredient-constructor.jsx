import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./ingredient-constructor.module.css";
import multiCl from "classnames"
import { ingredientType } from "../../../utils/types";

const IngredientConstructor = ({ bun, types, positionText, props }) => {
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
    props: ingredientType.isRequired
}

export default IngredientConstructor;