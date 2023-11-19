import { Link } from 'react-router-dom';
import { Button, EmailInput, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { register } from '../../services/actions/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export const Register = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeName = (evt) => {
        setName(evt.target.value)
    }

    const onChangeEmail = (evt) => {
        setEmail(evt.target.value)
    }

    const onChangePassword = (evt) => {
        setPassword(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        try {
            dispatch(register(name, email, password));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <main className={styles.main}>
            <h1 className={'text text_type_main-medium'}>Регистрация</h1>
            <form className={styles.form} onSubmit={handleSubmit}>

                <Input
                    onChange={onChangeName}
                    value={name}
                    name={"name"}
                    placeholder={"Имя"}
                    extraClass="mt-6"
                    error={false}
                    errorText="Ошибка"

                />

                <EmailInput
                    onChange={onChangeEmail}
                    value={email}
                    name={"email"}
                    placeholder={"E-mail"}
                    isIcon={false}
                    extraClass="mt-6"
                />
                <PasswordInput
                    onChange={onChangePassword}
                    value={password}
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