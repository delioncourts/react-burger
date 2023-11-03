import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import styles from "./forgot-password.module.css";

export const ForgotPassword = () => {
    return (
        <main className={styles.main}>
            <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
            <form></form>
            <p className="text text_color_inactive text_type_main-default mt-4">Вспомнили пароль?
                <Link to="/login" className={styles.link}>Войти</Link></p>

        </main>
    );
}; 