import cl from "./modal-overlay.module.css";
import { useRef } from "react";

interface IModalOverlay {
  onClose: () => void;
}

const ModalOverlay = ({ onClose }: IModalOverlay) => {
  const ref = useRef<HTMLDivElement>(null);
  return <div className={cl.overlay} onClick={() => onClose()} ref={ref} />;
};

export default ModalOverlay;
