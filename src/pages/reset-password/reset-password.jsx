import { Link } from 'react-router-dom';
import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/actions/auth';

export const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useForm({
        password: '',
        token: '',
    });


    function handleSubmit(evt) {
        evt.preventDefault();
        dispatch(resetPassword(form.values.password, form.values.token));
        navigate('/login');
    }

    return (
        <main className={styles.main}>
            <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
            <form className={styles.form} nSubmit={handleSubmit}>

                <PasswordInput
                    onChange={form.handleChange}
                    value={form.values.password}
                    name={"reset-password"}
                    placeholder={"Введите новый пароль"}
                    extraClass="mt-6"
                />

                <Input
                    onChange={form.handleChange}
                    value={form.values.token}
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