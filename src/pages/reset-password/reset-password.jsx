import { Link } from 'react-router-dom';
import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";

export const ResetPassword = () => {
    const onChange = (evt) => {
        evt.preventDefault();
    };

    return (
        <main className={styles.main}>
            <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
            <form className={styles.form}>

                <PasswordInput
                    onChange={onChange}
                    name={"reset-password"}
                    placeholder={"Введите новый пароль"}
                    extraClass="mt-6"
                />

                <Input
                    onChange={onChange}
                    name={"password"}
                    placeholder={"Введите код из письма"}
                    extraClass="mt-6"
                />

                <div className={styles.button}>
                    <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
                        Сохранить
                    </Button>
                </div>
            </form>

            <p className="text text_color_inactive text_type_main-default mt-20">Вспомнили пароль?
                <Link to="/login" className={styles.link}>Войти</Link></p>
        </main>
    );
}; 