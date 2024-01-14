import React, { ReactNode, PropsWithChildren } from "react";
import ReactDOM from 'react-dom'

import { useEffect } from "react";

import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalsRoot = document.getElementById("modals") as HTMLElement;

interface IModal {
    title: string;
    onCloseModal: () => void;
    children: ReactNode;
}
const Modal: React.FC<PropsWithChildren<IModal>> = ({ title, onCloseModal, children }) => {

    useEffect(() => {
        const closeEsc = (evt: KeyboardEvent) => {
            if (evt.key === 'Escape') {
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
                <article className={styles.content} onClick={(evt) => evt.stopPropagation()}>
                    <div className={styles.heading}>
                        <h2 className="text text_type_main-large pt-10 ml-10">
                            {title}
                        </h2>
                        <div className={styles.close} onClick={onCloseModal} data-cy="modal-close-button">
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

export default Modal;