import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cl from './modal.module.css';
import { useEffect } from "react";
import ModalOverlay from '../modal-overlay/modal-overlay';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

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
        <div className={rootClasses.join(' ')} >
            <ModalOverlay onClick={() => setVisible(false)}/>
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
Modal.propTypes = {
    children: PropTypes.element.isRequired,
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired
}

export default Modal;