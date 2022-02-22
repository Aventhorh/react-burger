import React, { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./burger-ingredients.module.css";
import Ingredient from "./ingredient/ingredient";
import { ingredients } from "../../utils/data";

const BurgerIngredients = () => {

    const [ingredient,] = useState(ingredients)
    const [current, setCurrent] = useState('Булки')

    for (let anchor of document.querySelectorAll('a[href*="#"]')) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            document.getElementById(anchor.getAttribute('href').substr(1)).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }

    const renderIngredient = (item) => (
        <li className={cl.ingredientsItem} key={item._id}>
            <Ingredient {...item} />
        </li>
    );

    return (
        <section className={cl.ingredientsSection}>
            <h1 className={cl.title, "text text_type_main-large"}>Соберите бургер</h1>

            <div className={cl.ingredientLinks, "mb-8"} style={{ display: "flex" }}>
                <a className={cl.ingredientTab} href='#buns'>
                    <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>Булки</Tab>
                </a>
                <a className={cl.ingredientTab} href='#sauces'>
                    <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>Соусы</Tab>
                </a>
                <a className={cl.ingredientTab} href='#mains'>
                    <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>Начинки</Tab>
                </a>
            </div>

            <div className={cl.ingredientsContainer}>
                <h2 id='buns' className="ing-type-header text text_type_main-medium mb-6" >Булки</h2>
                <ul className={cl.ingredientList}>
                    {ingredient.map(item => item.type === "bun" ? renderIngredient(item) : '')}
                </ul>
                <h2 id={'sauces'} className="ing-type-header text text_type_main-medium mb-6">Соусы</h2>
                <ul className={cl.ingredientList}>
                    {ingredient.map(item => item.type === "sauce" ? renderIngredient(item) : '')}
                </ul>
                <h2 id='mains' className="ing-type-header text text_type_main-medium mb-6">Начинки</h2>
                <ul className={cl.ingredientList}>
                    {ingredient.map(item => item.type === "main" ? renderIngredient(item) : '')}
                </ul>
            </div>
        </section>
    );
};

export default BurgerIngredients;