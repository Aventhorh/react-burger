import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./modal.module.css";
import { useEffect } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

interface IModal {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ children, visible, onClose }: IModal) => {
  const rootClasses = [cl.modal];

  if (visible) {
    rootClasses.push(cl.modal_active);
  }
  useEffect(() => {
    const onEscKeydown = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", onEscKeydown);

    return () => document.removeEventListener("keydown", onEscKeydown);
  }, []);

  return ReactDOM.createPortal(
    <div className={rootClasses.join(" ")}>
      <ModalOverlay onClose={() => onClose()} />
      <div
        className={cl.modal__content}
        onClick={(evt) => evt.stopPropagation()}
      >
        <button className={cl.modal__close} onClick={() => onClose()}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modals")!
  );
};
Modal.propTypes = {
  children: PropTypes.element.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Modal;
