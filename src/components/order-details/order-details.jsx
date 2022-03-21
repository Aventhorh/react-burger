import multiCl from "classnames";
import checkMark from "../../images/icon-check-mark.svg";
import cl from "./order-details.module.css";


const OrderDetails = () => (
    <>
        <div className={cl.order}>
            <h1 className={multiCl("text text_type_digits-large pt-15 pb-8")}>034536</h1>
            <p className="text text_type_main-medium pb-15">идентификатор заказа</p>
            <img className="pb-15" src={checkMark} alt="Галочка" />
            <p className="text text_type_main-default pb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive pb-10">Дождитесь готовности на орбитальной станции</p>
        </div>
    </>
);

export default OrderDetails;