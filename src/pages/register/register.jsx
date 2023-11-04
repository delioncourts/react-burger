import { Link } from 'react-router-dom';
import { Button, EmailInput, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";

export const Register = () => {
    const onChange = (evt) => {
        evt.preventDefault();
    };

    return (
        <main className={styles.main}>
            <h1 className={'text text_type_main-medium'}>Регистрация</h1>
            <form className={styles.form}>

                <Input
                    onChange={onChange}
                    name={"name"}
                    placeholder={"Имя"}
                    extraClass="mt-6"
                />

                <EmailInput
                    onChange={onChange}
                    name={"email"}
                    placeholder={"E-mail"}
                    isIcon={false}
                    extraClass="mt-6"
                />
                <PasswordInput
                    onChange={onChange}
                    name={"password"}
                    placeholder={"Пароль"}
                    extraClass="mt-6"
                />

                <div className={styles.button}>
                    <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
                        Зарегистрироваться
                    </Button>
                </div>
            </form>
            <p className="text text_color_inactive text_type_main-default mt-20">Уже зарегистрированы?
                <Link to="/login" className={styles.link}>Войти</Link></p>
        </main>
    );
}; 