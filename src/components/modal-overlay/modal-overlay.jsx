import React from "react";
import PropTypes from 'prop-types';
import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ children, closeModal }) => {
    return (
        <div className={styles.overlay} onClick={closeModal}>{children}</div>
    )
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func,
    children: PropTypes.node,
}

export default ModalOverlay;