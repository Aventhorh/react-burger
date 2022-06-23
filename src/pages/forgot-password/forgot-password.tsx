import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import multiCl from "classnames";
import cl from "./forgot-password.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../components/form/form";
import { apiPasswordForgot } from "../../utils/api";
import { postForgotPassword } from "../../services/actions/api-thunk";
import { useTypeDispatch, useTypeSelector } from "../../types";

const ForgotPassword = () => {
  const dispatch = useTypeDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState(" ");
  const password = useTypeSelector((state) => state.forgotPass.password);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(postForgotPassword(apiPasswordForgot, email));
    if (password) {
      navigate("/reset-password");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <p className={multiCl(cl.title, "text text_type_main-medium mb-6")}>
        Восстановление пароля
      </p>
      <div className={multiCl(cl.inputContainer, "mb-6")}>
        <Input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Укажите e-mail"
          error={false}
          errorText="Ошибка"
        />
      </div>

      <div className={multiCl(cl.button, "mb-20")}>
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </div>

      <p
        className={multiCl(
          cl.improvedLink,
          "text text_type_main-default text_color_inactive"
        )}
      >
        Вспомнили пароль?{" "}
        <Link
          to={"/login"}
          className={multiCl(
            cl.improvedLinkText,
            "text text_type_main-default"
          )}
        >
          Войти
        </Link>
      </p>
    </Form>
  );
};

export default ForgotPassword;
