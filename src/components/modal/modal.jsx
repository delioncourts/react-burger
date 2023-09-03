import React from "react";
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { useEffect } from "react";

import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalsRoot = document.getElementById("modals");

const Modal = ({ title, closeModal, children }) => {

    useEffect(() => {
        const handleEsc = (evt) => {
            if (evt.key === 'Escape') {
                console.log('close by Esc');
                closeModal();
            }
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    return (
        ReactDOM.createPortal(
            <ModalOverlay closeModal={closeModal}>
                <article className={styles.content}>
                    <div className={styles.heading}>
                        <h2 className="text text_type_main-large">
                            {title}
                        </h2>
                        <div className={styles.close} onClick={closeModal}>
                            <CloseIcon type="primary" onClick={onClose} />
                        </div>
                    </div>
                    <div className={styles.wrapper}>
                        {children}
                    </div>
                </article>
            </ModalOverlay>, modalsRoot)
    )
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string,
    closeModal: PropTypes.func.isRequired
}

export default Modal;