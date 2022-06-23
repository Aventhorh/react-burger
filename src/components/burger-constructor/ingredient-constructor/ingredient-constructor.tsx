import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./ingredient-constructor.module.css";
import multiCl from "classnames";
import { useDispatch } from "react-redux";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { useRef } from "react";
import { useTypeDispatch } from "../../../types";
import { TIngredient } from "../../../types";
import { XYCoord } from "dnd-core";

interface IIngredient extends TIngredient {
  bun?: boolean;
  position?: string;
  positionText: string;
  index?: number | any;
  types?: "top" | "bottom";
  moveListItem: (a: number, b: number) => void;
  item?: TIngredient;
}

type TDragItem = {
  index: number;
  id: string;
};

const IngredientConstructor = (props: IIngredient) => {
  const dispatch = useTypeDispatch();
  const id = props._id;
  const index = props.index;
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDrag }, dragRef] = useDrag({
    type: "item",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const opacity = isDrag ? 0 : 1;

  const [, dropRef] = useDrop({
    accept: "item",
    hover: (item: TDragItem, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverActualY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;
      if (hoverIndex === undefined) return;

      props.moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isDragging: monitor.isOver(),
    }),
  });

  dragRef(dropRef(ref));

  return (
    <div
      style={{ opacity: opacity }}
      ref={ref}
      className={multiCl(
        props.bun === true
          ? cl.ingredient__listItemLocked
          : cl.ingredient__listItem
      )}
    >
      <div className={multiCl(cl.ingredient__item, "mb-3")}>
        <button className={cl.ingredient__button}>
          {props.bun === true ? "" : <DragIcon type="primary" />}
        </button>
        <div className={cl.ingredient__container}>
          <ConstructorElement
            isLocked={props.bun}
            type={props.types}
            text={props.name + props.positionText}
            price={props.price}
            thumbnail={props.image}
            handleClose={() => {
              dispatch({ type: "REMOVE_INGREDIENT", payload: index });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default IngredientConstructor;
