import cl from "./ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../../utils/types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Ingredient = ({ props }) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: "checkedIngredient",
    item: props,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const [count, setCount] = useState([]);
  const selectIngredients = useSelector(
    (state) => state.constructorBurger.addedIngredients
  );
  const location = useLocation();

  useEffect(() => {
    setCount(selectIngredients.filter((item) => item._id === props._id));
  }, [setCount, selectIngredients]);

  return (
    !isDrag && (
      <Link
        className={cl.link}
        key={props._id}
        to={`/ingredients/${props._id}`}
        state={{ background: location }}
      >
        <div className={cl.burger__ingredient} ref={dragRef}>
          {count.length > 0 && <Counter count={count.length} size="default" />}
          <img className="pr-4 pl-4 mb-1" src={props.image} alt={props.name} />
          <p>
            <span className="text text_type_digits-default mr-2">
              {props.price}
            </span>
            <CurrencyIcon type="primary" />
          </p>
          <h3 className="text text_type_main-default">{props.name}</h3>
        </div>
      </Link>
    )
  );
};
Ingredient.propTypes = {
  props: ingredientType.isRequired,
};

export default Ingredient;
