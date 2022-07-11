import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../../components/form/form";
import multiCl from "classnames";
import cl from "./reset-password.module.css";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { postResetPassword } from "../../services/actions/api-thunk";
import { apiPasswordReset } from "../../utils/api";
import { useTypeDispatch, useTypeSelector } from "../../types";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const dispatch = useTypeDispatch();
  const navigate = useNavigate();
  const forgotPassword = useTypeSelector((state) => state.forgotPass.password);

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    dispatch(postResetPassword(apiPasswordReset, password, token));
    navigate("/login");
  };

  if (!forgotPassword) {
    return <Navigate to={"/forgot-password"} />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <p className={multiCl(cl.title, "text text_type_main-medium mb-6")}>
        Восстановление пароля
      </p>
      <div className={multiCl(cl.inputContainer, "mb-6")}>
        <PasswordInput
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={multiCl(cl.inputContainer, "mb-6")}>
        <Input
          name="code"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          type="text"
          placeholder="Введите код из письма"
          error={false}
          errorText="Ошибка"
        />
      </div>
      <div className={multiCl(cl.button, "mb-20")}>
        <Button type="primary" size="medium">
          Сохранить
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

export default ResetPassword;
