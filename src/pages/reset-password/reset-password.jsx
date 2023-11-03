import { Link } from 'react-router-dom';
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";

export const ResetPassword = () => {
    return (
        <main className={styles.main}>
            <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
            <form></form>

            <p className="text text_color_inactive text_type_main-default mt-4">Вспомнили пароль?
                <Link to="/login" className={styles.link}>Войти</Link></p>
        </main>
    );
}; 