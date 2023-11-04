import { Link } from 'react-router-dom';
import styles from "./profile.module.css";
import { Button, EmailInput, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

export const Profile = () => {
    const onChange = (evt) => {
        evt.preventDefault();
    };

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

                    <NavLink to="/profile/orders/:id" style={({ isActive }) => {
                        return {
                            color: isActive ? "#f2f2f3" : "#8585AD",
                        };
                    }}>
                        <p className={`${styles.link} text text_type_main-medium`}>Выход</p>
                    </NavLink>

                    <p className="text text_type_main-default text_color_inactive pt-20">В этом разделе вы можете изменить свои персональные данные</p>
                </section>

                <section className={styles.inputpanel}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        icon="EditIcon"
                        name={'name'}
                        error={false}
                        size={'default'}
                    />
                    <EmailInput
                        name={'email'}
                        icon="EditIcon"
                        extraClass="mt-6"
                        placeholder="E-mail"
                        isIcon={true}
                    />
                    <PasswordInput
                        name={'password'}
                        icon="EditIcon"
                        extraClass="mt-6"
                    />

                </section>

            </div>
        </main>
    );
}; 