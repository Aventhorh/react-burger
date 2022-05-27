import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./app-header.module.css";
import multiCl from "classnames";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserData } from "../../services/actions/api-thunk";
import { apiAuthUserData } from "../../utils/api";

const AppHeader = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authUserData.userData);

  const thisPathname = useMemo(() => location.pathname, [location]);

  useEffect(() => {
    dispatch(getAuthUserData(apiAuthUserData));
  }, []);
  const pathnameSelectIconFeed = () => {
    if (thisPathname === "/feed") {
      return "primary";
    } else if (thisPathname === "//feed/:id") {
      return "primary";
    } else {
      return "secondary";
    }
  };
  const pathnameSelectTextFeed = () => {
    if (thisPathname === "/feed") {
      return cl.header_link_active;
    } else if (thisPathname === "/feed/:id") {
      return cl.header_link_active;
    } else {
      return "";
    }
  };

  const pathnameSelectIcon = () => {
    if (thisPathname === "/login") {
      return "primary";
    } else if (thisPathname === "/forgot-password") {
      return "primary";
    } else if (thisPathname === "/profile") {
      return "primary";
    } else if (thisPathname === "/register") {
      return "primary";
    } else {
      return "secondary";
    }
  };
  const pathnameSelectText = () => {
    if (thisPathname === "/login") {
      return cl.header_link_active;
    } else if (thisPathname === "/forgot-password") {
      return cl.header_link_active;
    } else if (thisPathname === "/profile") {
      return cl.header_link_active;
    } else if (thisPathname === "/register") {
      return cl.header_link_active;
    } else {
      return "";
    }
  };
  return (
    <header>
      <div className={cl.header_container}>
        <div className={cl.header_linksContainer}>
          <Link to={"/"} className={cl.header_logo}>
            <Logo />
          </Link>

          <Link className={multiCl(cl.header_link)} to="/">
            <BurgerIcon type={thisPathname === "/" ? "primary" : "secondary"} />
            <p
              className={multiCl(
                "text text_type_main-default ml-2",
                thisPathname === "/" ? cl.header_link_active : ""
              )}
            >
              Конструктор
            </p>
          </Link>

          <Link className={multiCl(cl.header_link)} to={"/feed"}>
            <ProfileIcon type={pathnameSelectIconFeed()} />
            <p
              className={multiCl(
                "text text_type_main-default ml-2",
                pathnameSelectTextFeed()
              )}
            >
              Лента заказов
            </p>
          </Link>

          <Link
            className={multiCl(cl.header_link, cl.header_link_right)}
            to={user.success === true ? "/profile" : "/login"}
          >
            <ProfileIcon type={pathnameSelectIcon()} />
            <p
              className={multiCl(
                "text text_type_main-default ml-2",
                pathnameSelectText()
              )}
            >
              Личный кабинет
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
