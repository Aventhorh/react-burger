import { Link, useLocation } from "react-router-dom";
import multiCl from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./order.module.css";
import { date } from "../../../utils/date";
import ImgIngredient from "../../../components/feed-card/img-ingredient/img-ingredient";
import { TOrder, useTypeSelector } from "../../../types";

interface IOrderProps {
  data: TOrder;
}

const Order = ({ data }: IOrderProps) => {
  const location = useLocation();
  let num: number;
  const ingredients = useTypeSelector(
    (state) => state.ingredientsBurger.ingredients
  );

  const ingredientsInOrder = ingredients.filter((ingredient) => {
    return data.ingredients.find((ingre) => {
      return ingredient._id === ingre;
    });
  });

  const bunIngredient = ingredientsInOrder.find((item) => item.type === "bun");
  const ingredientsWithoutBuns = ingredientsInOrder.filter((ingredient) => {
    return ingredient.type != "bun";
  });

  return (
    <li className={cl.orderContainer}>
      <Link
        className={cl.order}
        to={`/profile/orders/${data._id}`}
        state={{ background: location }}
      >
        <p className={cl.header}>
          <span className="text text_type_digits-default">#{data.number}</span>
          <span className="text text_type_main-default text_color_inactive">
            {date(data.createdAt)} i-GMT+3
          </span>
        </p>
        <p className="text text_type_main-medium mb-2">{data.name}</p>
        <p className="text text_type_main-default text_color_success mb-6 mt-2">
          {data.status === "created"
            ? "Готовится"
            : data.status === "done"
            ? "Выполнен"
            : "В работе"}
        </p>

        <div className={cl.ingredientsContainer}>
          <ul className={cl.ingredientsList}>
            {ingredientsInOrder
              .slice(0, 7)
              .reverse()
              .map((ing) => (
                <ImgIngredient key={ing._id} src={ing.image_mobile} />
              ))}
          </ul>
          <p className={multiCl(cl.priceContainer)}>
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
            </span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </Link>
    </li>
  );
};

export default Order;
