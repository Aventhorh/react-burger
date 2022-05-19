import cl from "./modal-overlay.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const ModalOverlay = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  return <div className={cl.overlay} onClick={() => navigate("/")} ref={ref} />;
};
// ModalOverlay.propTypes = {
//   props: PropTypes.func.isRequired,
// };

export default ModalOverlay;
