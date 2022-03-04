import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import cl from "./burger-constructor.module.css";
import IngredientConstructor from "./ingredient-constructor/ingredient-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import PropTypes from 'prop-types';
import { ingredientType } from "../../utils/types";

const BurgerConstructor = (props) => {
    const BUN = "bun"
    const ingredients = props.ingredientsData

    const [modalIngredient, setModalIngredient] = useState(false)
    const [modalOrder, setModalOrder] = useState(false)
    const [selectedIngredient, setSelectedIngredient] = useState()

    const openIngredientDetails = (item) => {
        setSelectedIngredient(item)
        setModalIngredient(true)
    }

    const bunIngredient = ingredients.find(item => item.type === BUN)
    const ingredientsWithoutBuns = ingredients.filter((ingredient) => {
        return ingredient.type != "bun";
    });

    return (
        <>
            <Modal visible={modalOrder} setVisible={setModalOrder}>
                <OrderDetails />
            </Modal>
            <Modal visible={modalIngredient} setVisible={setModalIngredient}>
                <IngredientDetails {...selectedIngredient} />
            </Modal>

            <section className={(cl.ingredient__wrapper, "ml-10 mt-20")}>

                {bunIngredient
                    ? <li className={cl.ingredient__list_lock} onClick={() => openIngredientDetails(bunIngredient)}>
                        <IngredientConstructor positionText="(верх)" bun={true} types="top" {...bunIngredient} key={bunIngredient._id} />
                    </li>
                    : ''}

                <ul className={(cl.ingredient__list)}>
                    {ingredientsWithoutBuns.map((item) => (
                        <li key={item._id} onClick={() => openIngredientDetails(item)}>
                            <IngredientConstructor positionText="" {...item} key={item._id} />
                        </li>
                    ))}
                </ul>

                {bunIngredient
                    ? <li className={cl.ingredient__list_lock} onClick={() => openIngredientDetails(bunIngredient)}>
                        <IngredientConstructor positionText="(низ)" bun={true} types="bottom" {...bunIngredient} />
                    </li>
                    : ''}

                <div className={cl.ingredient__resultsPrice}>
                    <p className={(cl.ingredient__registration, "mr-10")}>
                        <span className="text text_type_digits-medium mr-2">1255</span>
                        <CurrencyIcon type="primary" />
                    </p>
                    <Button type="primary" size="large" onClick={() => setModalOrder(true)}>Оформить заказ</Button>
                </div>
            </section>
        </>
    );
};
BurgerConstructor.propTypes = {
    ingredientsData: PropTypes.arrayOf(ingredientType).isRequired
}

export default BurgerConstructor;