import { useEffect } from "react";

import cl from "./profile-orders.module.css";
import multiCl from "classnames";
import ProfileNavigation from "../../components/profile-navigation/profile-navigation";
import { getCookie } from "../../utils/getCookie";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/actions";
import Order from "./order/order";
import { useTypeDispatch, useTypeSelector } from "../../types";

const ProfileOrders = () => {
  const dispatch = useTypeDispatch();
  const orders = useTypeSelector((state) => state.wsReducer.orders);
  const accessToken = getCookie("accessToken");
  const user = useTypeSelector((state) => state.authUserData.userData);

  useEffect(() => {
    if (user.success) {
      dispatch({
        type: WS_CONNECTION_START,
        payload: `wss://norma.nomoreparties.space/orders?token=${accessToken}`,
      });
    }

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [user]);

  return (
    <div className={cl.container}>
      <ProfileNavigation />
      <div className={cl.root}>
        {orders && (
          <ul className={multiCl(cl.list)}>
            {orders
              .slice()
              .reverse()
              .map((order) => (
                <Order key={order._id} data={order} />
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfileOrders;
