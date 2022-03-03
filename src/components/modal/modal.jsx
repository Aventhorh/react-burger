import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cl from './modal.module.css';
import { useEffect } from "react";
import ModalOverlay from '../modal-overlay/modal-overlay';
import ReactDOM from "react-dom";


const Modal = ({ children, visible, setVisible }) => {

    const rootClasses = [cl.modal]

    if (visible) {
        rootClasses.push(cl.modal_active);
    }

    useEffect(() => {
        const onEscKeydown = (evt) => {
            if (evt.key === "Escape") {
                setVisible(false)
            }
        };
        document.addEventListener("keydown", onEscKeydown);

        return () => document.removeEventListener("keydown", onEscKeydown);
    }, []);

    return ReactDOM.createPortal(
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <ModalOverlay />
            <div className={cl.modal__content} onClick={(evt) => evt.stopPropagation()}>
                <button className={cl.modal__close} onClick={() => setVisible(false)}>
                    <CloseIcon type="primary" />
                </button>
                {children}
            </div>
        </div>,
        document.getElementById("modals")
    );
};

export default Modal;