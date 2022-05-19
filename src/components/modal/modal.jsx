import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./modal.module.css";
import { useEffect } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Modal = ({ children, visible }) => {
  const rootClasses = [cl.modal];

  if (visible) {
    rootClasses.push(cl.modal_active);
  }
  const navigate = useNavigate();
  useEffect(() => {
    const onEscKeydown = (evt) => {
      if (evt.key === "Escape") {
        navigate("/");
      }
    };
    document.addEventListener("keydown", onEscKeydown);

    return () => document.removeEventListener("keydown", onEscKeydown);
  }, []);

  return ReactDOM.createPortal(
    <div className={rootClasses.join(" ")}>
      <ModalOverlay onClose={() => navigate("/")} />
      <div
        className={cl.modal__content}
        onClick={(evt) => evt.stopPropagation()}
      >
        <button className={cl.modal__close} onClick={() => navigate("/")}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modals")
  );
};
Modal.propTypes = {
  children: PropTypes.element.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Modal;
