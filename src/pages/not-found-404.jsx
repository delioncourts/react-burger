import AppHeader from "../components/app-header/app-header";
import { Link } from 'react-router-dom';

import styles from "./not-found-404.module.css";


export const NotFound404 = () => {
    return (
        <>
            <AppHeader />
            <div className={styles.container}>
                <h2 className={`${styles.glow} text text_type_digits-large`}>404</h2>
                <p>К сожалению, страница не найдена</p>
                <Link to='/'>Вернуться на главную</Link>
            </div>
        </>
    );
}; 
