import React from "react";
import PropTypes from 'prop-types';
import styles from "./modal-overlay.module.css";

const ModalOverlay = ({children, onClose}) => {
    return (
        <div className={styles.overlay} onClick={onClose}>{children}</div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.node,
}

export default ModalOverlay;