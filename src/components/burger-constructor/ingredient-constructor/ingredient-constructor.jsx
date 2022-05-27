import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./ingredient-constructor.module.css";
import multiCl from "classnames";
import { ingredientType } from "../../../utils/types";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import PropTypes from "prop-types";

const IngredientConstructor = ({
  bun,
  types,
  positionText,
  props,
  index,
  moveListItem,
}) => {
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: "item",
    item: { index },
  });

  const [, dropRef] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect;

      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;
      if (hoverIndex === undefined) return;

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isDragging: monitor.isOver(),
    }),
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  return (
    <div
      ref={dragDropRef}
      className={multiCl(
        bun === true ? cl.ingredient__listItemLocked : cl.ingredient__listItem
      )}
    >
      <div className={multiCl(cl.ingredient__item, "mb-3")}>
        <button className={cl.ingredient__button}>
          {bun === true ? "" : <DragIcon type="primary" />}
        </button>
        <div className={cl.ingredient__container}>
          <ConstructorElement
            isLocked={bun}
            type={types}
            text={props.name + positionText}
            price={props.price}
            thumbnail={props.image}
            handleClose={(e) => {
              e.stopPropagation();
              dispatch({ type: "REMOVE_INGREDIENT", payload: index });
            }}
          />
        </div>
      </div>
    </div>
  );
};
IngredientConstructor.propTypes = {
  bun: PropTypes.bool,
  types: PropTypes.string,
  positionText: PropTypes.string,
  index: PropTypes.number,
  moveListItem: PropTypes.func,
  props: ingredientType.isRequired,
};

export default IngredientConstructor;
