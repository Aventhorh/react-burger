import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useMemo, useEffect } from "react";
import cl from "./change-profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import multiCl from "classnames";
import { apiAuthUserData } from "../../utils/api";
import {
  getAuthUserData,
  patchUserData,
} from "../../services/actions/api-thunk";

const ChangeProfile = () => {
  const user = useSelector((state) => state.authUserData.userData);
  const dispatch = useDispatch();
  const [name, setName] = useState(user.user.name);
  const [email, setEmail] = useState(user.user.email);
  const showButtons = useMemo(
    () => name !== user.user.name || email !== user.user.email,
    [user, name, email]
  );

  useEffect(() => {
    dispatch(getAuthUserData(apiAuthUserData));
  }, [user]);

  useEffect(() => {
    dispatch(getAuthUserData(apiAuthUserData));
  }, [name, email]);

  const handleSubmitData = (evt) => {
    evt.preventDefault();
    dispatch(patchUserData(apiAuthUserData, name, email));
  };

  const handleReset = () => {
    setName(user.user.name);
    setEmail(user.user.email);
  };

  return (
    <form className={cl.form} onSubmit={handleSubmitData}>
      <div className={multiCl(cl.inputContainer, "mb-6")}>
        <Input
          name="name"
          type="text"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
          icon="EditIcon"
          placeholder="Имя"
        />
      </div>

      <div className={multiCl(cl.inputContainer, "mb-6")}>
        <Input
          name="login"
          type="text"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          icon="EditIcon"
          placeholder="Логин"
        />
      </div>

      <div className={multiCl(cl.inputContainer, "mb-6")}>
        <Input
          name="password"
          type="password"
          value="password"
          icon="EditIcon"
          placeholder="Пароль"
          disabled
        />
      </div>

      {showButtons && (
        <div className={cl.buttons}>
          <Button type="secondary" size="medium" onClick={handleReset}>
            Отмена
          </Button>
          <Button>Сохранить</Button>
        </div>
      )}
    </form>
  );
};

export default ChangeProfile;
