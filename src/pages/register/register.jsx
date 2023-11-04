import { Link } from 'react-router-dom';
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";

export const Register = () => {
    return (
        <main className={styles.main}>
            <h1 className={'text text_type_main-medium'}>Регистрация</h1>
            <form>
            <div className={styles.button}>
                    <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
                    Зарегистрироваться
                    </Button>
                </div>
            </form>
            <p className="text text_color_inactive text_type_main-default mt-4">Уже зарегистрированы?
                <Link to="/login" className={styles.link}>Войти</Link></p>
        </main>
    );
}; 