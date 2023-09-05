import React from "react";
import PropTypes from 'prop-types';
import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ children, onOverlay }) => {
    return (
        <div className={styles.overlay} onClick={onOverlay}>{children}</div>
    )
}

ModalOverlay.propTypes = {
    onOverlay: PropTypes.func,
    children: PropTypes.node,
}

export default ModalOverlay;