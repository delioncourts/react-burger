import { Link } from 'react-router-dom';
import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/actions/auth';
import { passwordForgot } from '../../services/selectors';
import { useEffect } from 'react';

export const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { values, handleChange, setValues } = useForm({});

    //страница только для тех, кто забыл свой пароль 
    //но, к сожалению, постоянно происходит редирект на главную
    /*const userData = useSelector(passwordForgot);
     useEffect(() => {
         !userData && navigate('/');
     }, [])*/


    function handleSubmit(evt) {
        evt.preventDefault();
        dispatch(resetPassword(values.password, values.token));
        navigate('/login');
    }

    return (
        <main className={styles.main}>
            <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
            <form className={styles.form} onSubmit={handleSubmit}>

                <PasswordInput
                    onChange={handleChange}
                    value={values.password}
                    name={"reset-password"}
                    placeholder={"Введите новый пароль"}
                    extraClass="mt-6"
                />

                <Input
                    onChange={handleChange}
                    value={values.token}
                    name={"password"}
                    placeholder={"Введите код из письма"}
                    extraClass="mt-6"
                    error={false}
                    errorText={'Ошибка'}
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