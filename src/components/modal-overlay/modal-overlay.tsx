import styles from "./modal-overlay.module.css";
import { ReactNode } from "react";

interface ModalOverlay {
    children: ReactNode;
    onOverlay: () => void;
}

const ModalOverlay: React.FC<ModalOverlay> = ({ children, onOverlay }) => {
    return (
        <div className={styles.overlay} onClick={onOverlay}>{children}</div>
    )
}

export default ModalOverlay;