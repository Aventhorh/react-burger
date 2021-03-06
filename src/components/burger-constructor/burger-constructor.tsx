import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useEffect, useMemo, useState } from "react";
import cl from "./burger-constructor.module.css";
import IngredientConstructor from "./ingredient-constructor/ingredient-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { apiOrderConfig } from "../../utils/api";
import multiCl from "classnames";
import { useDrop } from "react-dnd";
import {
  addIngredientAction,
  DRAG_INGREDIENT,
  GET_ORDER,
} from "../../services/actions/actions";
import { fetchOrders } from "../../services/actions/api-thunk";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useTypeDispatch, useTypeSelector } from "../../types";

const BurgerConstructor = () => {
  const user = useTypeSelector((state) => state.authUserData.userData);
  const navigate = useNavigate();
  const dispatch = useTypeDispatch();
  const selectIngredients = useTypeSelector(
    (state) => state.constructorBurger.addedIngredients
  );
  const order = useTypeSelector((state) => state.order.order);
  const thisUser = useMemo(() => user, [user]);

  useEffect(() => {
    setIngredient(selectIngredients);
  }, [selectIngredients]);

  const [ingredient, setIngredient] = useState(selectIngredients);

  const moveListItem = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch({
        type: DRAG_INGREDIENT,
        payload: dragIndex,
        payloadTwo: hoverIndex,
      });
    },
    [ingredient]
  );

  const BUN = "bun";

  const [modalOrder, setModalOrder] = useState(false);

  let num: number;

  const bunIngredient = ingredient.find((item) => item.type === BUN);
  const ingredientsWithoutBuns = ingredient.filter((ingredient) => {
    return ingredient.type != "bun";
  });

  const addIngredients = () => {
    if (bunIngredient !== undefined) {
      let addedIngredients = ingredientsWithoutBuns.map((item) => item._id);
      addedIngredients.push(bunIngredient._id, bunIngredient._id);
      return addedIngredients;
    }
  };

  useEffect(() => {
    if (modalOrder === false) {
      dispatch({ type: GET_ORDER, payload: "" });
    }
  }, [modalOrder]);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "checkedIngredient",
    drop(item: { id: string }) {
      dispatch(addIngredientAction({ ...item, uuid: uuidv4() }));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const borderHover = isHover ? cl.ingredient__clear_hover : "transparent";

  return (
    <>
      <Modal visible={modalOrder} onClose={() => setModalOrder(false)}>
        <OrderDetails props={order} />
      </Modal>

      <section
        className={multiCl(cl.ingredient__wrapper, "ml-10 mt-20")}
        ref={dropTarget}
      >
        {bunIngredient === undefined ? (
          <section
            className={multiCl(cl.ingredient__clear, borderHover)}
          ></section>
        ) : (
          <>
            {bunIngredient ? (
              <li className={cl.ingredient__list_lock}>
                <IngredientConstructor
                  positionText="(????????)"
                  bun={true}
                  types="top"
                  {...bunIngredient}
                  key={bunIngredient._id}
                />
              </li>
            ) : (
              ""
            )}

            <ul className={cl.ingredient__list}>
              {ingredientsWithoutBuns.map((item, index) => (
                <li key={item.uuid}>
                  <IngredientConstructor
                    positionText=""
                    {...item}
                    index={index}
                    moveListItem={moveListItem}
                  />
                </li>
              ))}
            </ul>

            {bunIngredient ? (
              <li className={cl.ingredient__list_lock}>
                <IngredientConstructor
                  positionText="(??????)"
                  bun={true}
                  types="bottom"
                  {...bunIngredient}
                />
              </li>
            ) : (
              ""
            )}
          </>
        )}

        <div className={cl.ingredient__resultsPrice}>
          <p className={multiCl(cl.ingredient__registration, "mr-10")}>
            <span className="text text_type_digits-medium mr-2">
              {!bunIngredient ? (
                <>0</>
              ) : ingredientsWithoutBuns.length ? (
                bunIngredient.price * 2 +
                ingredientsWithoutBuns
                  .map((item) => (num += item.price), (num = 0))
                  .reverse()[0]
              ) : (
                bunIngredient.price * 2
              )}
            </span>
            <CurrencyIcon type="primary" />
          </p>
          <Button
            type="primary"
            size="large"
            name="???????????????? ??????????"
            onClick={() => {
              if (thisUser.success === true) {
                dispatch(fetchOrders(apiOrderConfig, addIngredients()));
                setModalOrder(true);
              } else {
                navigate("/login");
              }
            }}
          >
            ???????????????? ??????????
          </Button>
        </div>
      </section>
    </>
  );
};

export default BurgerConstructor;
