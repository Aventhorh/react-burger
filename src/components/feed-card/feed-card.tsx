import multiCl from "classnames";
import { Link, useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./feed-card.module.css";
import ImgIngredient from "./img-ingredient/img-ingredient";
import { useSelector } from "react-redux";
import { date } from "../../utils/date";
import { TOrder, useTypeSelector } from "../../types";

interface IFeedCardProps {
  data: TOrder;
}

const FeedCard = ({ data }: IFeedCardProps) => {
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
    <li className={cl.cardContainer}>
      <Link
        className={cl.card}
        to={`/feed/${data._id}`}
        state={{ background: location }}
      >
        <p className={multiCl(cl.header, "text text_type_digits-default")}>
          #{data.number}{" "}
          <span className="text text_type_main-default text_color_inactive">
            {date(data.createdAt)} i-GMT+3
          </span>
        </p>
        <h2 className={multiCl(cl.title, "text text_type_main-medium")}>
          {data.name}
        </h2>
        <div className={cl.priceInfo}>
          <ul className={cl.ingredientsList}>
            {ingredientsInOrder
              .slice(0, 7)
              .reverse()
              .map((ing) => (
                <ImgIngredient key={ing._id} src={ing.image_mobile} />
              ))}
          </ul>

          <p className={multiCl(cl.priceContainer)}>
            <span
              className={multiCl(cl.price, "text text_type_digits-default")}
            >
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

export default FeedCard;
