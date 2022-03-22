import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useContext, useState } from "react";
import cl from "./burger-constructor.module.css";
import IngredientConstructor from "./ingredient-constructor/ingredient-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { ApiIngredientsContext, selectedOrder } from "../services/appContext";
import { postOrder, testttt } from "../../utils/api";

const BurgerConstructor = () => {
    const ingredients = useContext(ApiIngredientsContext)
    const BUN = "bun"
    const [modalIngredient, setModalIngredient] = useState(false)
    const [modalOrder, setModalOrder] = useState(false)
    const [selectedIngredient, setSelectedIngredient] = useState()
    const openIngredientDetails = (item) => {
        setSelectedIngredient(item)
        setModalIngredient(true)
    }
    const [order, setOrder] = useState()

    let num;
    const bunIngredient = ingredients.find(item => item.type === BUN)
    const ingredientsWithoutBuns = ingredients.filter((ingredient) => {
        return ingredient.type != "bun";
    });

    const addIngredients = () => {
        if (bunIngredient !== undefined) {
            let addedIngredients = ingredientsWithoutBuns.map(item => item._id);
            addedIngredients.push(bunIngredient._id, bunIngredient._id);
            return addedIngredients;
        }
    }

    async function fetchOrders() {
        try {
            const getOrder = await postOrder(addIngredients())
            setOrder(getOrder.data.order.number)
        } catch {
            console.log("Ошибка взаимодействия с сервером")
        }
    }

    return (
        <>
            <Modal visible={modalOrder} setVisible={setModalOrder}>
                <selectedOrder.Provider value={order}>
                    <OrderDetails />
                </selectedOrder.Provider>
            </Modal>
            <Modal visible={modalIngredient} setVisible={setModalIngredient}>
                {selectedIngredient == undefined ? <></> : <IngredientDetails props={selectedIngredient} />}
            </Modal>

            <section className={(cl.ingredient__wrapper, "ml-10 mt-20")}>

                {bunIngredient
                    ? <li className={cl.ingredient__list_lock} onClick={() => openIngredientDetails(bunIngredient)}>
                        <IngredientConstructor positionText="(верх)" bun={true} types="top" props={bunIngredient} key={bunIngredient._id} />
                    </li>
                    : ''}

                <ul className={(cl.ingredient__list)}>
                    {ingredientsWithoutBuns.map((item) => (
                        <li key={item._id} onClick={() => openIngredientDetails(item)}>
                            <IngredientConstructor positionText="" props={item} key={item._id} />
                        </li>
                    ))}
                </ul>

                {bunIngredient
                    ? <li className={cl.ingredient__list_lock} onClick={() => openIngredientDetails(bunIngredient)}>
                        <IngredientConstructor positionText="(низ)" bun={true} types="bottom" props={bunIngredient} />
                    </li>
                    : ''}

                <div className={cl.ingredient__resultsPrice}>
                    <p className={(cl.ingredient__registration, "mr-10")}>
                        <span className="text text_type_digits-medium mr-2">
                            {bunIngredient === undefined
                                ? <></>
                                : bunIngredient.price * 2 + ingredientsWithoutBuns.map(item => num += item.price, num = 0).reverse()[0]}
                        </span>
                        <CurrencyIcon type="primary" />
                    </p>
                    <Button type="primary" size="large" onClick={() => {
                        fetchOrders()
                        if (order !== undefined) {
                            setModalOrder(true);
                        }
                    }}>Оформить заказ</Button>
                </div>
            </section>
        </>
    );
};

export default BurgerConstructor;