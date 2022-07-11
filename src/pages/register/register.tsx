import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../../components/form/form";
import multiCl from "classnames";
import cl from "./register.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postRegister } from "../../services/actions/api-thunk";
import { apiRegister } from "../../utils/api";
import { useTypeDispatch, useTypeSelector } from "../../types";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useTypeDispatch();
  const navigate = useNavigate();
  const result = useTypeSelector((state) => state.registerUser.user);

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    dispatch(postRegister(apiRegister, email, password, name));
    if (result.success === true) {
      navigate("/login");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <p className={multiCl(cl.title, "text text_type_main-medium mb-6")}>
        Регистрация
      </p>
      <div className={multiCl(cl.inputContainer, "mb-6")}>
        <Input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Имя"
          error={false}
          errorText="Ошибка"
        />
      </div>
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
      <div className={cl.button}>
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </div>
      <p
        className={multiCl(
          cl.improvedLink,
          "text text_type_main-default text_color_inactive"
        )}
      >
        Уже зарегистрированы?{" "}
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

export default Register;
