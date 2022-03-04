import cl from "./ingredient-details.module.css";
import multiCl from "classnames"
import PropTypes from 'prop-types';

const IngredientDetails = (props) => {
  return (
    <div>
      <h1 className={multiCl("text text_type_main-large pt-3 pb-3", cl.detail__title)}>
        Детали ингредиента
      </h1>
      <div className={cl.detail__section}>
        <img className={cl.detail__image} src={props.image_large} alt={props.name} />

        <h2 className={multiCl("text text_type_main-medium pt-2 pb-8", cl.detail__name)}>
          {props.name}
        </h2>

        <ul className={cl.detail__wrapper}>
          <li className={multiCl(cl.detail__item, "text text_type_main-default text_color_inactive")}>
            <h3>Калории, ккал</h3>
            <p className="text text_type_digits-default text_color_inactive">{props.calories}</p>
          </li>
          <li className={multiCl(cl.detail__item, "text text_type_main-default text_color_inactive ml-8")}>
            <h3>Белки, г</h3>
            <p className="text text_type_digits-default text_color_inactive">{props.proteins}</p>
          </li>
          <li className={multiCl(cl.detail__item, "text text_type_main-default text_color_inactive ml-8")}>
            <h3>Жиры, г</h3>
            <p className="text text_type_digits-default text_color_inactive">{props.fat}</p>
          </li>
          <li className={multiCl(cl.detail__item, "text text_type_main-default text_color_inactive ml-8")}>
            <h3>Углеводы, г</h3>
            <p className="text text_type_digits-default text_color_inactive">{props.carbohydrates}</p>
          </li>
        </ul>
      </div>

    </div>
  );
};
IngredientDetails.propTypes = {
  props: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    })
  ).isRequired
}

export default IngredientDetails;