import { useContext, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./burger-ingredients.module.css";
import Ingredient from "./ingredient/ingredient";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import multiCl from "classnames"
import { ApiIngredientsContext } from "../services/appContext";

const BurgerIngredients = () => {
    const ingredients = useContext(ApiIngredientsContext)
    const [current, setCurrent] = useState('Булки');
    const [modal, setModal] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState();
    const bunsRef = useRef(null);
    const saucesRef = useRef(null);
    const mainsRef = useRef(null);

    const renderIngredient = (item) => (
        <li className={cl.ingredients__item} key={item._id} onClick={() => openIngredientDetails(item)}>
            <Ingredient props={item} />
        </li>
    );

    const openIngredientDetails = (item) => {
        setSelectedIngredient(item)
        setModal(true)
    }

    const ingredientsBun = ingredients.filter((ingredient) => {
        return ingredient.type === "bun";
    });
    const ingredientsSauce = ingredients.filter((ingredient) => {
        return ingredient.type === "sauce";
    });
    const ingredientsMain = ingredients.filter((ingredient) => {
        return ingredient.type === "main";
    });

    return (
        <>
            <Modal visible={modal} setVisible={setModal}>
                {selectedIngredient === undefined ? <></> : <IngredientDetails props={selectedIngredient} />}
            </Modal>

            <section className={cl.ingredients__section}>
                <h1 className={cl.title, "text text_type_main-large"}>Соберите бургер</h1>

                <div className={multiCl(cl.ingredient__links, "mb-8")}>
                    <a className={cl.ingredient__tab} onClick={() => bunsRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    })}>
                        <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>Булки</Tab>
                    </a>
                    <a className={cl.ingredient__tab} onClick={() => saucesRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    })}>
                        <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>Соусы</Tab>
                    </a>
                    <a className={cl.ingredient__tab} onClick={() => mainsRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    })}>
                        <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>Начинки</Tab>
                    </a>
                </div>

                <div className={cl.ingredients__container}>
                    <h2 className="ing-type-header text text_type_main-medium mb-6" ref={bunsRef}>Булки</h2>
                    <ul className={cl.ingredient__list}>
                        {ingredientsBun.map(item => renderIngredient(item))}
                    </ul>
                    <h2 className="ing-type-header text text_type_main-medium mb-6" ref={saucesRef}>Соусы</h2>
                    <ul className={cl.ingredient__list}>
                        {ingredientsSauce.map(item => renderIngredient(item))}
                    </ul>
                    <h2 className="ing-type-header text text_type_main-medium mb-6" ref={mainsRef}>Начинки</h2>
                    <ul className={cl.ingredient__list}>
                        {ingredientsMain.map(item => renderIngredient(item))}
                    </ul>
                </div>
            </section>
        </>
    );
};

export default BurgerIngredients;