import { Link } from 'react-router-dom';
import styles from "./profile.module.css";
import { Button, EmailInput, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

import { userNameData, userPasswordData, userEmailData } from '../../services/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';

import { signout } from '../../services/actions/auth';
import { updateUserInfo } from '../../services/actions/auth';

export const Profile = () => {
    const dispatch = useDispatch();

    const userNameInfo = useSelector(userNameData);
    const userEmailInfo = useSelector(userEmailData);

    const form = useForm({ name: userNameInfo, email: userEmailInfo, password: '' });

    function handleSignOut() {
        dispatch(signout());
    }

    //сброс данных
    function handleReset() {
        form.setValues({ name: userNameInfo, email: userEmailInfo, password: '' });
    }

    //обновить данные 
    function handleUpdate(evt) {
        evt.preventDefault();
        dispatch(updateUserInfo(form.values.name, form.values.email, form.values.password))
        form.setValues({
            ...form.values,
            password: ''
        })
    }
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <section className={styles.linkpanel}>
                    <NavLink to="/profile" style={({ isActive }) => {
                        return {
                            color: isActive ? "#f2f2f3" : "#8585AD",
                        };
                    }}>
                        <p className={`${styles.link} text text_type_main-medium`}>Профиль</p>
                    </NavLink>

                    <NavLink to="/profile/orders" style={({ isActive }) => {
                        return {
                            color: isActive ? "#f2f2f3" : "#8585AD",
                        };
                    }}>
                        <p className={`${styles.link} text text_type_main-medium`}>История заказов</p>
                    </NavLink>

                    <p onClick={handleSignOut} className={`${styles.link} text text_type_main-medium`}>Выход</p>


                    <p className="text text_type_main-default text_color_inactive pt-20">В этом разделе вы можете изменить свои персональные данные</p>
                </section>

                <section className={styles.inputpanel}>
                    <form onSubmit={handleUpdate}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            icon="EditIcon"
                            name={'name'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            onChange={form.handleChange}
                            value={form.values.name}
                            autoComplete="username"
                        />
                        <EmailInput
                            name={'email'}
                            icon="EditIcon"
                            extraClass="mt-6"
                            placeholder="E-mail"
                            isIcon={true}
                            onChange={form.handleChange}
                            value={form.values.email}
                            autoComplete="email"
                        />
                        <PasswordInput
                            name={'password'}
                            icon="EditIcon"
                            extraClass="mt-6"
                            onChange={form.handleChange}
                            value={form.values.password}
                            autoComplete="current-password"
                        />

                        <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">Сохранить</Button>
                        <Button htmlType="button" type="secondary" size="medium" extraClass="mt-6" onClick={handleReset}>Отмена</Button>

                    </form>
                </section>

            </div>
        </main >
    );
}; 