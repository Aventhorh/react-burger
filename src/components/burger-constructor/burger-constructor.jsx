import React from "react";
import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./burger-constructor.module.css";
import { ingredients } from "../../utils/data";
import IngredientConstructor from "./ingredient-constructor/ingredient-constructor";
import { useState } from "react";
const BurgerConstructor = () => {

    const [bun,] = useState("bun")

    const ingre = ingredients.find(item => item.type === bun)

    return (
        <section className={(cl.ingredientConstWrapper, "ml-10 mt-20")}>

            {ingre ? <IngredientConstructor bool={true} types="top" {...ingre} key={ingre._id} /> : ''}

            <ul className={(cl.ingredientConstList)}>
                {ingredients.map((item) => (<IngredientConstructor {...item} key={item._id} />))}
            </ul>

            {ingre ? <IngredientConstructor bool={true} types="bottom" {...ingre} key={ingre._id} /> : ''}

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