import cl from "./orders.module.css";
import multiCl from "classnames";
import FeedCard from "../../../components/feed-card/feed-card";
import { TOrder } from "../../../types";

interface IOrdersProps {
  data: TOrder[];
}

const Orders = ({ data }: IOrdersProps) => {
  return (
    <div className={cl.orders}>
      <ul className={multiCl(cl.list, "custom-scroll")}>
        {data.map((order) => (
          <FeedCard key={order._id} data={order} />
        ))}
      </ul>
    </div>
  );
};

export default Orders;
