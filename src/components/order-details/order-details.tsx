import checkMark from "../../images/icon-check-mark.svg";
import cl from "./order-details.module.css";

interface IOrderDetails {
  props: number;
}

const OrderDetails = (props: IOrderDetails) => {
  return (
    <>
      <div className={cl.order}>
        <h1
          className={
            props
              ? "text text_type_digits-large pt-15 pb-8"
              : "text text_type_main-large mt-20 mb-20"
          }
        >
          {props ? props.props : "Загрузка..."}
        </h1>
        <p className="text text_type_main-medium pb-15">идентификатор заказа</p>
        <img className="pb-15" src={checkMark} alt="Галочка" />
        <p className="text text_type_main-default pb-2">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default text_color_inactive pb-10">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </>
  );
};

export default OrderDetails;
