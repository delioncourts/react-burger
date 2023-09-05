import React from "react";
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { useEffect } from "react";

import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalsRoot = document.getElementById("modals");

const Modal = ({ title, onCloseModal, children }) => {

    useEffect(() => {
        const closeEsc = (evt) => {
            if (evt.key === 'Escape') {
                console.log('close by Esc');
                onCloseModal();
            }
        }
        document.addEventListener('keydown', closeEsc);
        return () =>
            document.removeEventListener('keydown', closeEsc);
    }, []);

    return (
        ReactDOM.createPortal(
            <ModalOverlay onOverlay={onCloseModal}>
                <article className={styles.content}>
                    <div className={styles.heading}>
                        <h2 className="text text_type_main-large">
                            {title}
                        </h2>
                        <div className={styles.close} onClick={onCloseModal}>
                            <CloseIcon type="primary" />
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