import multiCl from "classnames";
import cl from "./details.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import ImgIngredient from "../../components/feed-card/img-ingredient/img-ingredient";
import { date } from "../../utils/date";
import { useEffect } from "react";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/actions";
import { useTypeDispatch, useTypeSelector } from "../../types";

const Details = () => {
  let num: number;
  const { id } = useParams<{ id: string }>();
  const dispatch = useTypeDispatch();
  const orders = useTypeSelector((state) => state.wsReducer.orders);
  const ingredientId = (id) => (state) => {
    return state.wsReducer.orders.find((ing) => ing._id === id);
  };
  const ordersFromSockets = useTypeSelector(ingredientId(id));
  const ingredients = useTypeSelector(
    (state) => state.ingredientsBurger.ingredients
  );

  const ingredientsInOrder = ingredients.filter((ingredient) => {
    if (ordersFromSockets) {
      return ordersFromSockets.ingredients.find((ingre) => {
        return ingredient._id === ingre;
      });
    }
  });

  const bunIngredient = ingredientsInOrder.find((item) => item.type === "bun");
  const ingredientsWithoutBuns = ingredientsInOrder.filter((ingredient) => {
    return ingredient.type != "bun";
  });

  useEffect(() => {
    if (orders.length === 0) {
      dispatch({
        type: WS_CONNECTION_START,
        payload: `wss://norma.nomoreparties.space/orders/all`,
      });
    }
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [ordersFromSockets, dispatch, orders, id]);

  if (!ordersFromSockets) {
    return <div className="text text_type_main-large mt-20">Загрузка...</div>;
  }

  return (
    <div className={cl.root}>
      <p
        className={multiCl(
          "text text_type_digits-default mb-10",
          cl.titleOrder
        )}
      >
        #{ordersFromSockets.number}
      </p>
      <h1 className="text text_type_main-medium  mt-10">
        {ordersFromSockets.name}
      </h1>
      <p className="text text_type_main-default text_color_success mt-2">
        {ordersFromSockets.status === "created"
          ? "Готовится"
          : ordersFromSockets.status === "done"
          ? "Выполнен"
          : "В работе"}
      </p>
      <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
      <ul className={multiCl(cl.list, "custom-scroll mb-10")}>
        {ingredientsInOrder?.map((ingredient) => (
          <li
            key={`${ordersFromSockets._id}-${ingredient._id}`}
            className={cl.ingredient}
          >
            <ImgIngredient
              style={{ margin: 1 }}
              src={ingredient.image_mobile}
            />
            <p
              className={multiCl(
                cl.title,
                "text text_type_main-default ml-4 mr-4"
              )}
            >
              {ingredient.name}
            </p>
            <p className={cl.priceContainer}>
              <span className="text text_type_digits-default mr-2">
                {ingredient.price}
              </span>{" "}
              <CurrencyIcon type="primary" />
            </p>
          </li>
        ))}
      </ul>
      <div className={cl.info}>
        <span className="text text_type_main-default text_color_inactive">
          {date(ordersFromSockets.createdAt)} i-GMT+3
        </span>
        <div style={{ marginLeft: "auto" }} className={cl.priceContainer}>
          <span className="text text_type_digits-default mr-2">
            {!bunIngredient
              ? ingredientsWithoutBuns
                  .map((item) => (num += item.price), (num = 0))
                  .reverse()[0]
              : ingredientsWithoutBuns.length
              ? bunIngredient.price * 2 +
                ingredientsWithoutBuns
                  .map((item) => (num += item.price), (num = 0))
                  .reverse()[0]
              : bunIngredient.price * 2}
          </span>{" "}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default Details;
