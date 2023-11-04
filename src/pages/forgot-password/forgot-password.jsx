import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import styles from "./forgot-password.module.css";

export const ForgotPassword = () => {
    const onChange = (evt) => {
        evt.preventDefault();
    };

    return (
        <main className={styles.main}>
            <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
            <form className={styles.form}>
            <EmailInput
                    onChange={onChange}
                    name={"email"}
                    placeholder={"Укажите e-mail"}
                    isIcon={false}
                    extraClass="mt-6"
                />


            <div className={styles.button}>
                    <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
                    Восстановить
                    </Button>
                </div>
            </form>
            <p className="text text_color_inactive text_type_main-default mt-20">Вспомнили пароль?
                <Link to="/login" className={styles.link}>Войти</Link></p>

        </main>
    );
}; 