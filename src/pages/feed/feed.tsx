import { useEffect } from "react";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/actions";
import { useTypeDispatch, useTypeSelector } from "../../types";

import cl from "./feed.module.css";
import Orders from "./orders/orders";
import Statistics from "./statistics/statistics";

const OrdersFeed = () => {
  const dispatch = useTypeDispatch();
  const orders = useTypeSelector((state) => state.wsReducer.orders);
  const statistic = useTypeSelector((state) => state.wsReducer);
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `wss://norma.nomoreparties.space/orders/all`,
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
