import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../../components/form/form";
import multiCl from "classnames";
import cl from "./login.module.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { postAuth } from "../../services/actions/api-thunk";
import { apiAuth } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.authUserData.userData);
  const location = useLocation();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(postAuth(apiAuth, email, password));
    navigate(-1);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <p className={multiCl(cl.title, "text text_type_main-medium mb-6")}>
        Вход
      </p>
      <div className={multiCl(cl.inputContainer, "mb-6")}>
        <Input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="E-mail"
          error={false}
          errorText="Ошибка"
        />
      </div>
      <div className={multiCl(cl.inputContainer, "mb-6")}>
        <PasswordInput
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={multiCl(cl.button, "mb-20")}>
        <Button type="primary" size="medium">
          Войти
        </Button>
      </div>

      <p
        className={multiCl(
          cl.improvedLink,
          "text text_type_main-default text_color_inactive"
        )}
      >
        Вы - новый пользователь?{" "}
        <Link
          to={"/register"}
          className={multiCl(
            cl.improvedLinkText,
            "text text_type_main-default"
          )}
        >
          Зарегистрироваться
        </Link>
      </p>

      <p
        className={multiCl(
          cl.improvedLink,
          "text text_type_main-default text_color_inactive"
        )}
      >
        Забыли пароль?{" "}
        <Link
          to={"/forgot-password"}
          className={multiCl(
            cl.improvedLinkText,
            "text text_type_main-default"
          )}
        >
          Восстановить пароль
        </Link>
      </p>
    </Form>
  );
};

export default Login;
