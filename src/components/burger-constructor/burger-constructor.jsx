import React, { useState } from "react";
import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./burger-constructor.module.css";
import IngredientConstructor from "./ingredient-constructor/ingredient-constructor";
const BurgerConstructor = (...props) => {

    const [ingredient,] = useState(props[0].ingredientsData)

    const BUN = "bun"

    const bunIngredient = ingredient.find(item => item.type === BUN)

    const ingredientsWithoutBuns = ingredient.filter((ingredient) => {
        return ingredient.type != "bun";
    });

    return (
        <section className={(cl.ingredientConstWrapper, "ml-10 mt-20")}>

            {bunIngredient ? <IngredientConstructor positionText="(верх)" bun={true} types="top" {...bunIngredient} key={bunIngredient._id} /> : ''}

            <ul className={(cl.ingredientConstList)}>
                {ingredientsWithoutBuns.map((item) => (<IngredientConstructor {...item} key={item._id} />))}
            </ul>

            {bunIngredient ? <IngredientConstructor positionText="(низ)" bun={true} types="bottom" {...bunIngredient}/> : ''}

            <div className={cl.ingredientConstResultsPrice}>
                <p className={(cl.ingredientConstRegistration, "mr-10")}>
                    <span className="text text_type_digits-medium mr-2">1255</span>
                    <CurrencyIcon type="primary" />
                </p>
                <Button type="primary" size="large">Оформить заказ</Button>
            </div>
        </section>
    );
};

export default BurgerConstructor;