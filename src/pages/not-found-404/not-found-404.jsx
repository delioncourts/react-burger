import { Link } from 'react-router-dom';

import styles from "./not-found-404.module.css";

export const NotFound404 = () => {
    return (
            <main className={styles.main}>
                <h2 className={`${styles.glow} text text_type_digits-large pt-20`}>404</h2>
                <p className="text text_type_main-default pt-15">К сожалению, страница не найдена</p>
                <Link to='/' className={`${styles.link} text text_type_main-default pt-5`}>Вернуться на главную</Link>
            </main>
    );
}; 
