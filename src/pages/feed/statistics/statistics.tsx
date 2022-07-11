import multiCl from "classnames";
import cl from "./statistics.module.css";
import { useMemo } from "react";
import { useTypeSelector } from "../../../types";

interface IStatsProps {
  data: {
    total: number | undefined;
    totalToday: number | undefined;
  };
}

const Statistics = ({ data }: IStatsProps) => {
  const orders = useTypeSelector((state) => state.wsReducer.orders);
  const pending = useMemo(
    () =>
      orders
        ?.filter((order) => order.status === "pending")
        .map((order) => order.number),
    [orders]
  );
  const done = useMemo(
    () =>
      orders
        ?.filter((order) => order.status === "done")
        .map((order) => order.number),
    [orders]
  );
  return (
    <div className={cl.stats}>
      <div className={cl.ordersStats}>
        <div>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <ul className={cl.list}>
            {done?.slice(0, 14).map((order) => (
              <li
                key={order}
                className={multiCl(
                  cl.orderId,
                  cl.orderId_light,
                  "text text_type_digits-default"
                )}
              >
                {order}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <ul className={cl.list}>
            {pending?.slice(0, 14).map((order) => (
              <li
                key={order}
                className={multiCl(cl.orderId, "text text_type_digits-default")}
              >
                {order}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={cl.allStats}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <span
          className={multiCl(cl.statsShadow, "text text_type_digits-large")}
        >
          {data.total === undefined ? "–" : data.total}
        </span>
      </div>
      <div className={cl.allStats}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <span
          className={multiCl(cl.statsShadow, "text text_type_digits-large")}
        >
          {data.totalToday === undefined ? "–" : data.totalToday}
        </span>
      </div>
    </div>
  );
};

export default Statistics;
