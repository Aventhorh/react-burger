import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useEffect, useState } from "react";
import cl from "./burger-constructor.module.css";
import IngredientConstructor from "./ingredient-constructor/ingredient-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { postOrder } from "../../utils/api";
import multiCl from "classnames"
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";

const BurgerConstructor = () => {
    const dispatch = useDispatch()
    const selectIngredients = useSelector(state => state.constructorBurger.addedIngredients)

    useEffect(() => {
        setIngredient(selectIngredients)
    }, [selectIngredients])

    const [ingredient, setIngredient] = useState(selectIngredients)
 
    const movePetListItem = useCallback(
        (dragIndex, hoverIndex) => {
                dispatch({ type: "DRAG_INGREDIENT", payload: dragIndex, payloadTwo: hoverIndex })
            },
        [])

    const BUN = "bun"
    const [modalIngredient, setModalIngredient] = useState(false)
    const [modalOrder, setModalOrder] = useState(false)

    const details = useSelector(state => state.details.details)

    const openIngredientDetails = (item) => {
        dispatch({ type: "ADD_DETAILS", payload: item })
        setModalIngredient(true)
    }

    useEffect(() => {
        if (modalIngredient === false) {
            dispatch({ type: "REMOVE_DETAILS", payload: {} })
        }
    }, [modalIngredient])

    let num;

    const bunIngredient = ingredient.find(item => item.type === BUN)
    const ingredientsWithoutBuns = ingredient.filter((ingredient) => {
        return ingredient.type != "bun";
    });

    const addIngredients = () => {
        if (bunIngredient !== undefined) {
            let addedIngredients = ingredientsWithoutBuns.map(item => item._id);
            addedIngredients.push(bunIngredient._id, bunIngredient._id);
            return addedIngredients;
        }
    }

    useEffect(() => {
        if (modalOrder === false) {
            dispatch({ type: "GET_ORDER", payload: '' })
        }
    }, [modalOrder])

    async function fetchOrders() {
        try {
            const getOrder = await postOrder(addIngredients())
            dispatch({ type: "GET_ORDER", payload: getOrder.data.order.number })
        } catch {
            console.log("Ошибка взаимодействия с сервером")
        }
    }

    const [{ isHover }, dropTarget] = useDrop({
        accept: "checkedIngredient",
        drop(itemId) {
            dispatch({ type: "ADD_INGREDIENTS", payload: itemId });
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const borderHover = isHover ? cl.ingredient__clear_hover : 'transparent';

    return (
        <>
            <Modal visible={modalOrder} setVisible={setModalOrder}>
                <OrderDetails />
            </Modal>
            <Modal visible={modalIngredient} setVisible={setModalIngredient}>
                {details === undefined ? <></> : <IngredientDetails props={details} />}
            </Modal>

            <section className={multiCl(cl.ingredient__wrapper, "ml-10 mt-20")} ref={dropTarget} >
                {bunIngredient === undefined
                    ? <section className={multiCl(cl.ingredient__clear, borderHover)}></section>
                    : <>
                        {bunIngredient
                            ? <li className={cl.ingredient__list_lock} onClick={() => openIngredientDetails(bunIngredient)}>
                                <IngredientConstructor positionText="(верх)" bun={true} types="top" props={bunIngredient} key={bunIngredient._id} />
                            </li>
                            : ''}

                        <ul className={cl.ingredient__list}>
                            {ingredientsWithoutBuns.map((item, index) => (
                                <li key={index} onClick={() => openIngredientDetails(item)}>
                                    <IngredientConstructor positionText="" props={item} index={index} moveListItem={movePetListItem}/>
                                </li>
                            ))}
                        </ul>

                        {bunIngredient
                            ? <li className={cl.ingredient__list_lock} onClick={() => openIngredientDetails(bunIngredient)}>
                                <IngredientConstructor positionText="(низ)" bun={true} types="bottom" props={bunIngredient} />
                            </li>
                            : ''}
                    </>}

                <div className={cl.ingredient__resultsPrice}>
                    <p className={multiCl(cl.ingredient__registration, "mr-10")}>
                        <span className="text text_type_digits-medium mr-2">
                            {!bunIngredient
                                ? <>0</>
                                : ingredientsWithoutBuns.length
                                    ? bunIngredient.price * 2 + ingredientsWithoutBuns.map(item => num += item.price, num = 0).reverse()[0]
                                    : bunIngredient.price * 2}
                        </span>
                        <CurrencyIcon type="primary" />
                    </p>
                    <Button type="primary" size="large" onClick={() => {
                        fetchOrders()
                        setModalOrder(true);
                    }}>Оформить заказ</Button>
                </div>
            </section>
        </>
    );
};

export default BurgerConstructor;