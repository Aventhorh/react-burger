import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/actions";

import cl from "./feed.module.css";
import Orders from "./orders/orders";
import Statistics from "./statistics/statistics";

const OrdersFeed = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.wsReducer.orders);
  const statistic = useSelector((state) => state.wsReducer);
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `wss://norma.nomoreparties.space/orders`,
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);
  return (
    <div className={cl.root}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={cl.content}>
        {orders ? (
          <Orders data={orders} />
        ) : (
          <div style={{ width: "100%", minWidth: 604 }} />
        )}
        <Statistics data={statistic} />
      </div>
    </div>
  );
};

export default OrdersFeed;
