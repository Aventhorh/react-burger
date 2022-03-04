import cl from "./modal-overlay.module.css";

const ModalOverlay = (props) => {
  return <div className={cl.overlay} onClick={props.onClick}/>;
};

export default ModalOverlay;