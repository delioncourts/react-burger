import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../services/actions/auth";
import { useForm } from "../../hooks/useForm";
import styles from "./forgot-password.module.css";

export const ForgotPassword = () => {
    const dispatch:any = useDispatch();
    const navigate = useNavigate();

    const { values, handleChange, setValues } = useForm({});

    const handleSubmit = (event: FormEvent ) => {
        event.preventDefault();
        dispatch(forgotPassword(values.email));
        navigate('/reset-password');
    }

    return (
        <main className={styles.main}>
            <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <EmailInput
                    onChange={handleChange}
                    name={"email"}
                    placeholder={"Укажите e-mail"}
                    isIcon={false}
                    extraClass="mt-6"
                    value={values.email}
                />


                {values.email && (<div className={styles.button}>
                    <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
                        Восстановить
                    </Button>
                </div>)}
            </form>
            <p className="text text_color_inactive text_type_main-default mt-20">Вспомнили пароль?
                <Link to="/login" className={styles.link}>Войти</Link></p>

        </main>
    );
}; 