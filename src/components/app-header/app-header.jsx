import React from "react";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./app-header.module.css";

const AppHeader = () => {

  return (
    <header>
      <div className={cl.header_container}>
        <div className={cl.header_linksContainer}>
          <a className={cl.header_logo}>
            <Logo />
            </a>
          <a className={cl.header_link, cl.header_link_active}>
            <BurgerIcon type={"primary"} />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </a>
          <a className={cl.header_link}>
            <ListIcon type={"secondary"} />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </a>
          <a className={cl.header_link, cl.header_link_right}>
            <ProfileIcon type={"secondary"}/>
            <p className="text text_type_main-default ml-2">Личный кабинет</p>
          </a>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;