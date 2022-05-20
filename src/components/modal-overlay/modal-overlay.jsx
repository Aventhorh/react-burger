import cl from "./modal-overlay.module.css";
import { useRef } from "react";

const ModalOverlay = ({ onClose }) => {
  const ref = useRef(null);
  return <div className={cl.overlay} onClick={() => onClose()} ref={ref} />;
};

export default ModalOverlay;
