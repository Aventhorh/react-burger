import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useEffect, useState } from "react";
import cl from "./burger-constructor.module.css";
import IngredientConstructor from "./ingredient-constructor/ingredient-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { apiOrderConfig } from "../../utils/api";
import multiCl from "classnames"
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { ADD_INGREDIENTS, DRAG_INGREDIENT, GET_ORDER } from "../../services/actions/actions";
import { fetchOrders } from "../../services/actions/api-thunk";



const BurgerConstructor = () => {
    const dispatch = useDispatch()
    const selectIngredients = useSelector(state => state.constructorBurger.addedIngredients)

    useEffect(() => {
        setIngredient(selectIngredients)
    }, [selectIngredients])

    const [ingredient, setIngredient] = useState(selectIngredients)

    const moveListItem = useCallback(
        (dragIndex, hoverIndex) => {
            dispatch({ type: DRAG_INGREDIENT, payload: dragIndex, payloadTwo: hoverIndex })
        },
        [ingredient])

    const BUN = "bun"

    const [modalOrder, setModalOrder] = useState(false);

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
            dispatch({ type: GET_ORDER, payload: '' })
        }
    }, [modalOrder])

    const [{ isHover }, dropTarget] = useDrop({
        accept: "checkedIngredient",
        drop(itemId) {
            dispatch({ type: ADD_INGREDIENTS, payload: itemId });
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

            <section className={multiCl(cl.ingredient__wrapper, "ml-10 mt-20")} ref={dropTarget} >
                {bunIngredient === undefined
                    ? <section className={multiCl(cl.ingredient__clear, borderHover)}></section>
                    : <>
                        {bunIngredient
                            ? <li className={cl.ingredient__list_lock}>
                                <IngredientConstructor positionText="(верх)" bun={true} types="top" props={bunIngredient} key={bunIngredient._id} />
                            </li>
                            : ''}

                        <ul className={cl.ingredient__list}>
                            {ingredientsWithoutBuns.map((item, index) => (
                                <li key={item.uuid}>
                                    <IngredientConstructor positionText="" props={item} index={index} moveListItem={moveListItem} />
                                </li>
                            ))}
                        </ul>

                        {bunIngredient
                            ? <li className={cl.ingredient__list_lock}>
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
                        dispatch(fetchOrders(apiOrderConfig, addIngredients()))
                        setModalOrder(true);
                    }}>Оформить заказ</Button>
                </div>
            </section>
        </>
    );
};

export default BurgerConstructor;