import React, { ChangeEvent, FormEvent } from 'react';
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useState } from "react";
//import { useDispatch } from 'react-redux';
import { useDispatch } from '../../index';

import { Link } from 'react-router-dom';

import styles from "./login.module.css";

import { authorize } from "../../services/actions/auth";

export const Login = () => {
    const dispatch:any = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = (evt: ChangeEvent<HTMLInputElement>) => {
        setEmail(evt.target.value)
    }

    const onChangePassword = (evt: ChangeEvent<HTMLInputElement>) => {
        setPassword(evt.target.value)
    }

    function handleSubmit(evt: FormEvent) {
        evt.preventDefault();
        dispatch(authorize(email, password));
    }

    return (
        <main className={styles.main}>
            <h1 className={'text text_type_main-medium'}>Вход</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
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
                        Войти
                    </Button>
                </div>
            </form>


            <p className="text text_color_inactive text_type_main-default mt-20">Вы — новый пользователь?
                <Link to="/register" className={styles.link}>Зарегистрироваться</Link></p>

            <p className="text text_color_inactive text_type_main-default mt-4">Забыли пароль?
                <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link></p>
        </main>
    );
}; 