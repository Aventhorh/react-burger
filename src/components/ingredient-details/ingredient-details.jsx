import cl from "./ingredient-details.module.css";
import multiCl from "classnames";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const IngredientDetails = () => {
  const params = useParams();

  const ingredientId = (id) => (state) => {
    return state.ingredientsBurger.ingredients.find((ing) => ing._id === id);
  };
  const ingredient = useSelector(ingredientId(params.id));
  if (!ingredient) {
    return <div>Not found</div>;
  }
  return (
    <div>
      <h1
        className={multiCl(
          "text text_type_main-large pt-3 pb-3",
          cl.detail__title
        )}
      >
        Детали ингредиента
      </h1>
      <div className={cl.detail__section}>
        <img
          className={cl.detail__image}
          src={ingredient.image_large}
          alt={ingredient.name}
        />

        <h2
          className={multiCl(
            "text text_type_main-medium pt-2 pb-8",
            cl.detail__name
          )}
        >
          {ingredient.name}
        </h2>

        <ul className={cl.detail__wrapper}>
          <li
            className={multiCl(
              cl.detail__item,
              "text text_type_main-default text_color_inactive"
            )}
          >
            <h3>Калории, ккал</h3>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient.calories}
            </p>
          </li>
          <li
            className={multiCl(
              cl.detail__item,
              "text text_type_main-default text_color_inactive ml-8"
            )}
          >
            <h3>Белки, г</h3>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient.proteins}
            </p>
          </li>
          <li
            className={multiCl(
              cl.detail__item,
              "text text_type_main-default text_color_inactive ml-8"
            )}
          >
            <h3>Жиры, г</h3>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient.fat}
            </p>
          </li>
          <li
            className={multiCl(
              cl.detail__item,
              "text text_type_main-default text_color_inactive ml-8"
            )}
          >
            <h3>Углеводы, г</h3>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IngredientDetails;
