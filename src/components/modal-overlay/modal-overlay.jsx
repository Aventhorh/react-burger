import cl from "./modal-overlay.module.css";
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
  return <div className={cl.overlay} onClick={props.onClick}/>;
};
ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default ModalOverlay;