import React, { useEffect, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./burger-ingredients.module.css";
import Ingredient from "./ingredient/ingredient";

const BurgerIngredients = (...props) => {

    const [ingredient,] = useState(props[0].ingredientsData)
    const [current, setCurrent] = useState('Булки')

    const renderIngredient = (item) => (
        <li className={cl.ingredientsItem} key={item._id}>
            <Ingredient {...item} />
        </li>
    );

    const ingredientsBun = ingredient.filter((ingredient) => {
        return ingredient.type === "bun";
    });
    const ingredientsSauce = ingredient.filter((ingredient) => {
        return ingredient.type === "sauce";
    });
    const ingredientsMain = ingredient.filter((ingredient) => {
        return ingredient.type === "main";
    });

    const bunsRef = useRef(null);
    const saucesRef = useRef(null);
    const mainsRef = useRef(null);

    return (
        <section className={cl.ingredientsSection}>
            <h1 className={cl.title, "text text_type_main-large"}>Соберите бургер</h1>

            <div className={cl.ingredientLinks, "mb-8"} style={{ display: "flex" }}>
                <a className={cl.ingredientTab} onClick={() => bunsRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })}>
                    <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>Булки</Tab>
                </a>
                <a className={cl.ingredientTab} onClick={() => saucesRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })}>
                    <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>Соусы</Tab>
                </a>
                <a className={cl.ingredientTab} onClick={() => mainsRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })}>
                    <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>Начинки</Tab>
                </a>
            </div>

            <div className={cl.ingredientsContainer}>
                <h2 className="ing-type-header text text_type_main-medium mb-6" ref={bunsRef}>Булки</h2>
                <ul className={cl.ingredientList}>
                    {ingredientsBun.map(item => renderIngredient(item))}
                </ul>
                <h2 className="ing-type-header text text_type_main-medium mb-6" ref={saucesRef}>Соусы</h2>
                <ul className={cl.ingredientList}>
                    {ingredientsSauce.map(item => renderIngredient(item))}
                </ul>
                <h2 className="ing-type-header text text_type_main-medium mb-6" ref={mainsRef}>Начинки</h2>
                <ul className={cl.ingredientList}>
                    {ingredientsMain.map(item => renderIngredient(item))}
                </ul>
            </div>
        </section>
    );
};

export default BurgerIngredients;