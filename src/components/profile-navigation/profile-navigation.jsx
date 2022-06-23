import multiCl from "classnames";
import cl from "./profile-navigation.module.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { postLogout } from "../../services/actions/api-thunk";

import { useDispatch } from "react-redux";
import { deleteCookie } from "../../utils/deleteCookie";
import {
  getAuthUserDataAction,
  postAuthAction,
} from "../../services/actions/actions";

const ProfileNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const thisPathname = useMemo(() => location.pathname, [location]);

  const handleLogout = useCallback(() => {
    dispatch(postAuthAction({}));
    dispatch(getAuthUserDataAction({}));
    deleteCookie("accessToken");
    postLogout().then(() => {
      navigate("/login");
    });
  }, [postLogout, navigate]);

  return (
    <div className={cl.contained}>
      <ul className={cl.tabs}>
        <li>
          <Link
            className={multiCl(
              "text text_type_main-medium pt-4 pb-4",
              cl.link,
              thisPathname === "/profile" ? cl.link_active : ""
            )}
            to="/profile"
          >
            Профиль
          </Link>
        </li>
        <li>
          <Link
            className={multiCl(
              cl.link,
              "text text_type_main-medium pt-4 pb-4",
              thisPathname === "/profile/orders" ? cl.link_active : ""
            )}
            to="/profile/orders"
          >
            История заказов
          </Link>
        </li>
        <li>
          <button
            className={multiCl(
              cl.button,
              "text text_type_main-medium text_color_inactive pt-4 pb-4"
            )}
            onClick={handleLogout}
          >
            Выход
          </button>
        </li>
      </ul>
      <p className="text text_type_main-default text_color_inactive mt-20">
        В этом разделе вы можете
        {thisPathname === "/profile"
          ? " изменить свои персональные данные"
          : " просмотреть свою историю заказов"}
      </p>
    </div>
  );
};

export default ProfileNavigation;
